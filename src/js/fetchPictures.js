// Функция fetchCountries - возвращает ответ на http-запрос
// и ответ response переводит в формат json - return response.json

// Переменные базовый URL-адрес - BASE_URL и фильтр запроса - filterFields
const BASE_URL = 'https://pixabay.com/api';
const API_key = '29959892-dbc4da226a3c63fb0b6c6ac05';
const image_type = 'image_type=photo';
// изображение шире, чем в высоту
const orientation = 'orientation=horizontal';
// возвращать изображения, подходящие для всех возрастов
const safesearch = 'safesearch=true';

// export default - дефолтный экспорт

// 1 ВАРИАНТ - с asyns и await - АСИНХРОННОЙ ФУНКЦИЕЙ
export default async function fetchPictures(name, page) {
  // Шаблонная строка с переменными
  const response = await fetch(
    `${BASE_URL}/?key=${API_key}&q=${name}&${image_type}&${orientation}&${safesearch}&page=${page}&per_page=40`
  );
  const pictures = await response.json();
  console.log('http-response', pictures);
  return pictures;
}

// 2 ВАРИАНТ - ЧЕРЕЗ return fetch - обычный http-запрос get
// export default function fetchPictures(name, page) {
//   return fetch(
//     `${BASE_URL}/?key=${API_key}&q=${name}&${image_type}&${orientation}&${safesearch}&page=${page}&per_page=40`
//   ).then(response => {
//     return response.json();
//   });
// }
