const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29248542-cea93977a5234fa0e2d1b3dfd';
export default class GalleryAPIService {
  constructor() {
    this.queryItem = '';
    this.page = 1;
  }
  fetchGallery() {
    console.log(this);
    const searchParams = new URLSearchParams({
      key: API_KEY,
      q: this.queryItem,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 4,
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
      .then(({ hits }) => {
        this.onIncrementPage();
        return hits;
      });
  }
  onFetchResponse(response) {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  }
  onIncrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.queryItem;
  }
  set query(newQuary) {
    this.queryItem = newQuary;
  }
}
