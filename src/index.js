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

let gallery = new SimpleLightbox('.gallery a');

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

async function fetchImages() {
    loadMoreBtn.disabled();
    
    if (newsApiServise.query === '') {
        return;
    }
    try {
        const photos = await newsApiServise.fetchPhotos()
        .then(({ data }) => {
        console.log(data)
            newsApiServise.incrementPage();
            
        if (data.hits.length !== 0) {  
            renderPhotoMarkup(data.hits);
            loadMoreBtn.enable();
        } 
        
        if (data.totalHits === 0) { 
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }

        if (data.hits.length === 0 && data.totalHits !== 0) {
            loadMoreBtn.hide();
       Notiflix.Notify.info(`We're sorry, but you've reached the end of search results.`);
       
        } 
        return data.hits;
    })}
    catch (error) {
        console.log(error)
    }       
}

function renderPhotoMarkup(hits) {
    refs.gallery.insertAdjacentHTML("beforeend", photoSearchTpl(hits));
    let lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

function clearPhotos() {
    refs.gallery.innerHTML = '';
}


