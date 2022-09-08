import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29248542-cea93977a5234fa0e2d1b3dfd';
// const q = 'yellow+flowers';
const q = 'mars';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  submitBtn: document.querySelector('[type="submit"]'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

console.log(refs.form);

refs.submitBtn.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  //   console.log(e.currentTarget.elements.query.value);
}

function fetchGallery(query) {
  const url = `${BASE_URL}?key=${API_KEY}`;
  return fetch(`${url}&q=${query}&image_type=photo`).then(fetchResponse);
}

function fetchResponse(response) {
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
}

fetchGallery(q)
  .then(console.log)
  .catch(error => console.log(error))
  .finally();
