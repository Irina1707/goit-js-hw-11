import Notiflix from 'notiflix';
//const axios = require('axios');
import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '25444369-ba6b8c690cc86ce1f63d356ab';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1
}

async fetchPhotos() {
        console.log(this);
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
        const response = await axios.get(url)
            //.then(({ data }) => {
            //    console.log(data);
            //    this.incrementPage();
            //    return data; 
            //})
    return response;
            }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
    incrementPage() {
    this.page += 1;
    }
    resetPage() {
    this.page = 1;
    }
}




//const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`
//$.getJSON(url, function(data){
//if (parseInt(data.totalHits) > 0)
//    $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
//else
//    console.log('No hits');
//});