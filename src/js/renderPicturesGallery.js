// ФУНКЦИЯ РЕНДЕРИНГА РАЗМЕТКИ В ГАЛЕРЕЮ
export function renderPicturesGallery(pictures, currentGallery) {
  // console.log('pictures', pictures);
  // console.log(currentGallery);

  const markup = pictures
    .map(picture => {
      return `<div class="gallery__card"><a href="${picture.largeImageURL}">
  <img class='gallery__image' src="${picture.webformatURL}" alt="${picture.tags}" title="" loading="lazy" />
    </a>
   <div class="info">
   <p class="info-item">
     <b>Likes: ${picture.likes}</b>
   </p>
   <p class="info-item">
     <b>Views: ${picture.views}</b>
   </p>
   <p class="info-item">
     <b>Comments: ${picture.comments}</b>
   </p>
   <p class="info-item">
     <b>Downloads: ${picture.downloads}</b>
   </p>
 </div>
 </div>
`;
    })
    .join('');
  // console.log(markup);

  return currentGallery.insertAdjacentHTML('beforeend', markup);
}
