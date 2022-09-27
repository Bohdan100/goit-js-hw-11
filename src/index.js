// СЛОВА ДЛЯ ПРОВЕРКИ: $ - 0,
// kitchen black -238, children at home - 9

// Библиотека axios - npm install axios
import axios from 'axios';
// const axios = require('axios').default;

// Библиотека notiflix - npm i notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Библиотека simplelightbox - npm install simplelightbox
import SimpleLightbox from 'simplelightbox';
// без файла ниже не работают стили библиотеки
import 'simplelightbox/dist/simple-lightbox.min.css';

// импорт воспомагательных функций, выводящих сообщения
// и очищающих галерею
import {
  clearGallery,
  onFetchError,
  finishSearchPictures,
  totalFoundElements,
} from './js/supportingFunctions';

// импорт результата http-запроса + AXIOS
import fetchPictures from './js/fetchPictures';
import fetchByAxiosPictures from './js/axios';

import LoadMoreBtn from './js/load-more-btn';

// импорт библиотеки simplelightbox - подключение к галерее изображений
import { lightboxGallery } from './js/simpleLightbox';

// импорт функции для рендера (добавления) изображений в галерею
import { renderPicturesGallery } from './js/renderPicturesGallery';

// кнопка - класс из load-more-btn - находим через selector: '[data-action="load-more"]'
// так как в конструкторе selector, поэтому записывается слово selector
const loadMoreBtn = new LoadMoreBtn({
  // слово selector - так ка объект в конструкторе
  selector: '.load-more',
  // изначально прячем кнопку - hidden: true
  hidden: true,
});

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

let searchResult = '';
let page = 0;
// счетчик контроля количества загружаемых изображений
let controlTotalToRender = null;
// количество просмотренных картинок для отображения
let viewedPictures = null;
// шаг загрузки
const controlAmount = 40;

// ОСНОВНОЙ КОД
refs.form.addEventListener('submit', onFormSubmit);

//  при клике на кнопку вешается клас is-hidden
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

async function onFormSubmit(e) {
  e.preventDefault();

  // очистить галерею при следующем поиске
  clearGallery(refs.gallery);

  // задать контрольное число изображений = 40 при следующем поиске
  controlTotalToRender = 40;
  viewedPictures = null;
  page = 1;

  searchResult = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  console.log('Word for http-request:', searchResult);

  // если в поиске не пустая строка
  if (searchResult !== '') {
    try {
      // Показываем доп кнопку Load more
      loadMoreBtn.show();
      // сразу выключаем доп кнопку против случайного
      // нажатия пользователем
      // и показываем на ней крутящийся спинер +
      // надпись Loading... - Загружается...
      loadMoreBtn.disable();

      // http-ответ с бекенда через async - await
      const markupPictures = await fetchPictures(searchResult, page);

      // axios - обработка ответа с бекенда в console.log
      fetchByAxiosPictures(searchResult, page);

      if (markupPictures.hits.length !== 0) {
        // правильно отобразить количество загруженных фото
        if (markupPictures.hits.length < controlAmount) {
          viewedPictures = markupPictures.hits.length;
        } else {
          viewedPictures += controlAmount;
        }

        // Функция успешного рендеринга разметки
        succesRenderedGallery(markupPictures, viewedPictures);
        // вывести количество найденных изображений на экран
        totalFoundElements(markupPictures.total, viewedPictures);

        // если удачно нарисована галерея + количество найденых
        // изображений > 40 - включаем доп кнопу
        // и делаем на ней надпись Показать ещё - Load more
        if (markupPictures.total > controlTotalToRender) {
          // включить доп кнопку Load more - Показать ещё
          loadMoreBtn.enable();
          // добавить к счетчику изображений + 40 на второй круг
          controlTotalToRender += 40;
        } else {
          // скрыть кнопку
          loadMoreBtn.hide();
        }
      }
      // если пустой массив карточек - например искали $;
      else {
        // очистить галерею
        clearGallery(refs.gallery);
        // вывести ошибку
        onFetchError();
        // скрыть кнопку
        loadMoreBtn.hide();
      }
    } catch (error) {
      // отловить ошибку htttp-ответа с бекенд сервера
      onFetchError();
      clearGallery(refs.gallery);
      console.log(error);
    }
  }
  // если в поиск ввели пустую строку
  else {
    console.log('empty string entered');
    clearGallery(refs.gallery);
    onFetchError();
  }
}

async function onLoadMore() {
  loadMoreBtn.disable();
  page += 1;

  const markupPictures = await fetchPictures(searchResult, page);

  if (markupPictures.total > controlTotalToRender) {
    viewedPictures += controlAmount;
    // Функция успешного рендеринга разметки
    succesRenderedGallery(markupPictures, viewedPictures);
    // вывести количество найденных изображений на экран
    totalFoundElements(markupPictures.total, viewedPictures);
    // включить доп кнопку Load more - Показать ещё
    loadMoreBtn.enable();
    // добавить к счетчику изображений + 40 на второй круг
    controlTotalToRender += 40;
  } else {
    viewedPictures += markupPictures.hits.length;
    // Функция успешного рендеринга разметки
    succesRenderedGallery(markupPictures, viewedPictures);
    // вывести сообщение об окончании
    finishSearchPictures(viewedPictures);
    // скрыть кнопку
    loadMoreBtn.hide();
  }
}

// Функция успешного рендеринга разметки
function succesRenderedGallery(markupPictures, viewedPictures) {
  // зарендерить в галерею разметку 40 карточек по http-запросу
  renderPicturesGallery(markupPictures.hits, refs.gallery);

  // Добавить метод refresh() для lightboxGallery -
  // обновляет стили библиотеки для добавленных из бекенд-сайта изображений
  // БЕЗ НЕГО НЕ БУДЕТ СТРЕЛОК ПРОКРУТКИ ФОТОГРАФИЙ, КНОПКИ ВЫХОДА ИЗ ПРОСМОТРА
  lightboxGallery.refresh();

  // ПЛАВНЫЙ СКРОЛ
  // Длина прокрутки скрола по вертикали - высота height
  // первого элемента (фотографии) галереи - firstElementChild
  // деструктуризация, высота height первой фотографии записывается в переменную  cardHeight
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  // параметры плавного скрола
  console.log('height of smooth scroll:' + cardHeight);
  window.scrollBy({
    // top - прокрутка по высоте (по вертикали)
    // cardHeight * 2 - длина прокрутки - на 2 высоты картинки
    top: cardHeight * 2,
    // behavior: 'smooth - поведение прокрутки: плавная прокрутка
    behavior: 'smooth',
  });
}
