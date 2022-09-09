import cardMarkupTpl from '../../templates/cardMarkupTpl.hbs';
import '../../css/_app.css';
import GalleryAPIService from './api-service';
// import Notiflix from 'notiflix';
// import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '29248542-cea93977a5234fa0e2d1b3dfd';
// const q = 'yellow+flowers';

// const searchParams = new URLSearchParams({
//   key: API_KEY,
//   q: 'cat',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
//   per_page: 7,
//   page: 1,
//   fields: [
//     'webformatURL',
//     'largeImageURL',
//     'tags',
//     'likes',
//     'views',
//     'comments',
//     'downloads',
//   ],
// });

// const searchParams = new URLSearchParams({
//   fields: [
//     'webformatURL',
//     'largeImageURL',
//     'tags',
//     'likes',
//     'views',
//     'comments',
//     'downloads',
//   ],
// });

// const refs = {
//   form: document.querySelector('#search-form'),
//   input: document.querySelector('[name="searchQuery"]'),
//   submitBtn: document.querySelector('[type="submit"]'),
//   galleryContainer: document.querySelector('.gallery'),
//   loadMoreBtn: document.querySelector('.load-more'),
// };

const refs = {
  form: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const galleryAPIService = new GalleryAPIService();
console.log(galleryAPIService);

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  galleryAPIService.query = e.currentTarget.elements.searchQuery.value;
  galleryAPIService.resetPage();
  galleryAPIService.fetchGallery().then(hits => {
    console.log(hits);
  });
}

function onLoadMore() {
  galleryAPIService.fetchGallery().then(hits => {
    console.log(hits);
  });
}

// function fetchGallery(query) {
//   const URL = `${BASE_URL}?key=${API_KEY}`;
//   return fetch(`${URL}&q=${query}&image_type=photo&per_page=8&page=1`).then(
//     fetchResponse
//   );
//     const URL = `${BASE_URL}?${query}`;
//     console.log('URL', URL);
//     return fetch(URL).then(fetchResponse);
// }

//  fetchCountries(country)
//       .then(renderCountryCard)
//       .catch(onFetchError)
//       .finally(() => {});

// function renderGallery(gallery) {
//   const markupGallery = gallery.map(item => {
//     return cardMarkupTpl(item);
//   });
//   refs.galleryContainer.innerHTML = markupGallery;
// }
