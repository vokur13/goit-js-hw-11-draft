import Notiflix from 'notiflix';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29248542-cea93977a5234fa0e2d1b3dfd';
export default class GalleryAPIService {
  constructor() {
    this.queryItem = '';
    this.page = 1;
    this.hitsCount = 0;
  }
  async fetchGallery() {
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
    const url = `${BASE_URL}?${searchParams}`;
    try {
      const response = await axios.get(url);
      const { hits, totalHits } = await response.data;
      const fetchInfo = await this.afterFetchProcessing(hits, totalHits);
      return fetchInfo;
    } catch (error) {
      console.log(error);
    }
  }
  afterFetchProcessing(hits, totalHits) {
    if (hits.length === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    let totalCount = this.hitsCount;
    if (totalCount === 0) {
      this.onFoundNotifyInfScr(totalHits);
    }
    this.onIncrementPage(hits);
  }
  onIncrementPage(hits) {
    this.page += 1;
    this.hitsCount += hits.length;
  }
  resetPage() {
    this.page = 1;
  }

  onFoundNotifyInfScr(totalHits) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  get query() {
    return this.queryItem;
  }
  set query(newQuary) {
    this.queryItem = newQuary;
  }
}
