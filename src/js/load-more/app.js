import cardMarkupTpl from '../../templates/cardMarkupTpl.hbs';
import '../../css/_common.css';
import '../../css/_app.css';
import GalleryAPIService from './api-service';
import Button from './load-more-btn';
// import Notiflix from 'notiflix';
// import axios from 'axios';

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
  //   loadMoreBtn: document.querySelector('.load-more'),
};

const loadMoreBtn = new Button({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const submitBtn = new Button({ selector: '[type="submit"]' });
const galleryAPIService = new GalleryAPIService();

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

submitBtn.show();

function onSearch(e) {
  e.preventDefault();

  galleryAPIService.query = e.currentTarget.elements.searchQuery.value;
  if (galleryAPIService.query === '') {
    return alert('Please let us know the query subject');
  }

  galleryAPIService.resetPage();
  resetGalleryContainer();
  loadMoreBtn.show();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  galleryAPIService.fetchGallery().then(hits => {
    appendGalleryMarkup(hits);
    loadMoreBtn.enable();
  });
}

function appendGalleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', cardMarkupTpl(hits));
}

function resetGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
