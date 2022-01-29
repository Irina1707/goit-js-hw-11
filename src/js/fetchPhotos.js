//const axios = require('axios');
//import axios from "axios";
//const BASE_URL = 'https://pixabay.com/api/';
//const API_KEY = '25444369-ba6b8c690cc86ce1f63d356ab';

//function fetchPhotos() {
//    const url = `${BASE_URL}?key=${API_KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true`
//    return fetch(url).then(response =>response.json())
//    .then(console.log);
//}


//export default { fetchPhotos };

//axios.get(`${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
//    .then(function (response) {
    // handle success
//    console.log(response);
//  })

//const url = `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`
//$.getJSON(url, function(data){
//if (parseInt(data.totalHits) > 0)
//    $.each(data.hits, function(i, hit){ console.log(hit.pageURL); });
//else
//    console.log('No hits');
//});