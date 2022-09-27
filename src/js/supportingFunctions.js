import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  position: 'center-center',
  backOverlay: true,
  clickToClose: true,
  closeButton: true,
};

const clearGallery = function (currentGallery) {
  currentGallery.innerHTML = '';
};

const onFetchError = function (error) {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    options
  );
};

const finishSearchPictures = function (viewedPictures) {
  Notify.info(
    `We're sorry, but you've reached the end of search results. You downloaded: ${viewedPictures}.`,
    options
  );
};

const totalFoundElements = function (total, viewedPictures) {
  Notify.info(
    `Hooray! We found ${total} images. You downloaded: ${viewedPictures}.`
  );
};

export { clearGallery, onFetchError, finishSearchPictures, totalFoundElements };
