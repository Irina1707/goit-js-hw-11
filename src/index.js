import './css/styles.css'
import axios from "axios";
import Notiflix from 'notiflix';
import NewsApiService from './js/news-service.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getRefs from './js/getRefs.js';
import photoSearchTpl from './templates/photoCard.hbs';
import LoadMoreBtn from './js/load-more-btn';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25444369-ba6b8c690cc86ce1f63d356ab';


const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more',
    hidden: true,
});

const newsApiServise = new NewsApiService();
console.log(loadMoreBtn);

const refs = getRefs();

refs.searchForm.addEventListener('submit', onSeachPhoto);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);


let page = 1;

function onSeachPhoto(event) {
    event.preventDefault();

    const form = event.currentTarget;
    newsApiServise.query = form.elements.searchQuery.value;
 
    loadMoreBtn.show(); 
    newsApiServise.resetPage();
    clearPhotos();
    fetchImages();
//onFetchError(data.hits)})
  //.then(function () {
    // always executed
  //});
}


//function onLoadPhoto(event) {
//    if (newsApiServise.query === '') {
//        return;
//    }
//    loadMoreBtn.disabled();
//    newsApiServise.fetchPhotos().then(hits => {
//        renderPhotoMarkup(hits);
//        loadMoreBtn.enable();
//    });
// }

function fetchImages() {
    loadMoreBtn.disabled();
    if (newsApiServise.query === '') {
        return;
    }

    newsApiServise.fetchPhotos().then(( hits, totalHits ) => {
        
        if (hits.length === 0) {  
            onFetchError();
    
        }
            renderPhotoMarkup(hits);
            loadMoreBtn.enable();
            console.log(hits)
        
        if(hits.length === totalHits) {
            loadMoreBtn.disabled();
       Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
       } 
    })
}

function renderPhotoMarkup(hits) {
    refs.gallery.insertAdjacentHTML("beforeend", photoSearchTpl(hits));
    
}

function clearPhotos() {
    refs.gallery.innerHTML = '';
}

function onFetchError(error) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

