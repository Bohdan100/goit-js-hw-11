const axios = require('axios').default;

export default function fetchByAxiosPictures(name, page) {
  axios
    .get('https://pixabay.com/api', {
      params: {
        key: '29959892-dbc4da226a3c63fb0b6c6ac05',
        q: `${name}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: `${page}`,
        per_page: '40',
      },
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    })
    .then(response => {
      console.log('AXIOS - response.data', response.data);
    })
    .catch(error => {
      console.log(error.toJSON());
    });
}

// export default function fetchByAxiosPictures(name, page) {
//   // GET-запрос удаленного изображения в node.js
//   // Переменные базовый URL-адрес - BASE_URL и фильтр запроса - filterFields
//   const BASE_URL = 'https://pixabay.com/api';
//   const API_key = '29959892-dbc4da226a3c63fb0b6c6ac05';
//   const image_type = 'image_type=photo';
//   // изображение шире, чем в высоту
//   const orientation = 'orientation=horizontal';
//   // возвращать изображения, подходящие для всех возрастов
//   const safesearch = 'safesearch=true';

//   axios
//     .get(
//       `${BASE_URL}/?key=${API_key}&q=${name}&${image_type}&${orientation}&${safesearch}&page=${page}&per_page=40`,
//       { headers: { 'Content-Type': 'application/json' } }
//     )
//     .then(response => {
//       console.log('response.data', response.data);
//       console.log('response.data.hits', response.data.hits);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

// transformResponse: [function (data) {return data;}]
