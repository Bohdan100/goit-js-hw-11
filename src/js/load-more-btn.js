// Класс class LoadMoreBtn - вешается на все элементы кнопки
export default class LoadMoreBtn {
  // selector - селектор, hidden - селектор спрятан - true, не спрятан - false
  // по умолчанию не спрятан - false
  constructor({ selector, hidden = false }) {
    // в refs - ссылка на каждый элемент кнопки - button, spinner и label - text
    this.refs = this.getRefs(selector);

    // если hidden - true, ТО ВЫЗЫВАЕТСЯ this.hide - скрытие кнопки, ФУНКЦИЯ ВНИЗУ
    //  при клике на кнопку вешается клас is-hidden - loadMoreBtn.refs.button.addEventListener('click')
    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    // ссылка на кнопку button
    refs.button = document.querySelector(selector);
    // ссылка на тест внутри кнопка
    refs.label = refs.button.querySelector('.load-more-text');
    // ссылка на span внутри button - где отобразится кружочек
    refs.spinner = refs.button.querySelector('.spinner');

    // вернуть переменные в код
    return refs;
  }

  // 4  ФУНКЦИИ для кнопки - 1. ВИДИМАЯ АКТИВНАЯ, 2. ВИДИМАЯ НЕАКТИВНАЯ,
  // 3. ВИДИМАЯ, 4. НЕВИДИМАЯ

  // 1. Включить кнопку - активная кнопка
  // если hidden false, то кнопка активна
  enable() {
    // делает кнопку активной убирая с кнопки is-hidden - клас false,
    this.refs.button.disabled = false;
    // добавляет на кнопку надпись - Показать ещё - Load more
    this.refs.label.textContent = 'Load more';
    // добавляет is-hidden - скрыто на кружочек spinner,
    // то есть прячет спинер
    this.refs.spinner.classList.add('is-hidden');
  }

  // 2. Выключить кнопку и показать на кнопке крутящийся кружочек Loading...
  disable() {
    // делает кнопку неактивной, добавляя на кнопку is-hidden
    // скрыто - клас true,
    this.refs.button.disabled = true;
    // добавляет на кнопке надпись- Загружается... - Loading...
    this.refs.label.textContent = 'Loading...';
    // убирает is-hidden - скрыто с кружочка spinner,
    // то есть открывает спинер - кружочек spinner появляется и крутится
    this.refs.spinner.classList.remove('is-hidden');
  }

  // 3. Показать кнопку - делает кнопку видимой
  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  // 4. Скрыть кнопку - делает кнопку невидимой
  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}

// loadMoreBtn.show();
// loadMoreBtn.hide();
// loadMoreBtn.enable();
// loadMoreBtn.disable();
