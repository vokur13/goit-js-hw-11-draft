import cardMarkupTpl from '../../templates/cardMarkupTpl.hbs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import GalleryAPIService from './api-service';
import Button from './class-button';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new Button({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const submitBtn = new Button({ selector: '[type="submit"]', hidden: false });
const galleryAPIService = new GalleryAPIService();

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

submitBtn.show();

function onSearch(e) {
  e.preventDefault();

  galleryAPIService.query = e.currentTarget.elements.searchQuery.value;
  if (galleryAPIService.query === '') {
    return Notiflix.Notify.warning('Please let us know the query subject');
  }

  galleryAPIService.resetPage();
  resetGalleryContainer();
  loadMoreBtn.show();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  galleryAPIService.fetchGallery().then(({ hits, totalCount, totalHits }) => {
    appendGalleryMarkup(hits);
    if (totalCount > totalHits) {
      loadMoreBtn.hide();
      return Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
    loadMoreBtn.enable();
  });
}

function appendGalleryMarkup(hits) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', cardMarkupTpl(hits));
  gallerySlider();
  smoothScroll();
}

function resetGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}

function gallerySlider() {
  var lightbox = new SimpleLightbox('.gallery a', {
    /* options */
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}
