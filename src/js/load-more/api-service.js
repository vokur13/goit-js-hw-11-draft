export default class GalleryAPIService {
  constructor() {
    this.queryItem = '';
    this.page = 1;
    this.per_page = 7;
  }
  fetchGallery() {
    console.log(this);
    const url = `https://pixabay.com/api/?key=29248542-cea93977a5234fa0e2d1b3dfd&q=${this.queryItem}&image_type=photo&per_page=${this.per_page}&page=${this.page}`;
    return fetch(url)
      .then(this.onFetchResponse)
      .then(data => {
        this.onIncrementPage();
        return data.hits;
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
