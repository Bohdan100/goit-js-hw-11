// Библиотека simplelightbox - подключение к галерее изображений
export let lightboxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', // подпись картинки - текст из alt тега img
  captionDelay: 250, // задержка показа подписи - по умолчанию 0
  fadeSpeed: 250, // 300 - по умолчанию
  overlayOpacity: 0.6,
  preloading: false, // убрать постоянную подзагрузку первой фотографии
});
