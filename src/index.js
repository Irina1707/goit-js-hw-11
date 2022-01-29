import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getRefs from './js/getRefs.js';
import photoSearchTpl from './templates/photoCard.hbs';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25444369-ba6b8c690cc86ce1f63d356ab';

let page = 1;



const refs = getRefs();

refs.searchForm.addEventListener('submit', onSeachPhoto);

function onSeachPhoto(event) {
    event.preventDefault();

    clearPhotos();

    const form = event.currentTarget;
    const search = form.elements.searchQuery.value;
    const searchQuery = search.trim();
    
    function getImages() {
        
        
    }

    axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
        .then(function (response) {
            renderPhotoMarkup();
   
        })
    .catch(function (error) {
    onFetchError()
    console.log(error);
  })
  .then(function () {
    // always executed
  });
}

function renderPhotoMarkup(images) {
    const markupCard = photoSearchTpl(images);
    refs.gallery.innerHTML = markupCard;
    console.log(refs.gallery.innerHTML);
}

function clearPhotos() {
    refs.gallery.innerHTML = '';
}

function onFetchError(error) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}