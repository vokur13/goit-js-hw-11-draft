import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29248542-cea93977a5234fa0e2d1b3dfd';
export default class GalleryAPIService {
  constructor() {
    this.queryItem = '';
    this.page = 1;
    this.hitsCount = 0;
  }
  fetchGallery() {
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.queryItem,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
      fields: [
        'webformatURL',
        'largeImageURL',
        'tags',
        'likes',
        'views',
        'comments',
        'downloads',
      ],
    });
    //     const url = `https://pixabay.com/api/?key=29248542-cea93977a5234fa0e2d1b3dfd&q=${this.queryItem}&image_type=photo&orientation=horizontal&per_page=${this.per_page}&page=${this.page}`;
    const url = `${BASE_URL}?${searchParams}`;
    return fetch(url)
      .then(this.onFetchResponse)
      .then(({ hits, totalHits }) => {
        if (hits.length === 0) {
          return Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        let totalCount = this.hitsCount;
        if (totalCount === 0) {
          this.onFoundNotify(totalHits);
        }
        this.onIncrementPage(hits);
        const fetchInfo = { hits, totalCount, totalHits };
        return fetchInfo;
      });
  }
  onFetchResponse(response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }
  onIncrementPage(hits) {
    this.page += 1;
    this.hitsCount += hits.length;
  }
  resetPage() {
    this.page = 1;
  }

  onFoundNotify(totalHits) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  get query() {
    return this.queryItem;
  }
  set query(newQuary) {
    this.queryItem = newQuary;
  }
}
