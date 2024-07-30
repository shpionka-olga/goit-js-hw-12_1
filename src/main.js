import { fetchImages } from './js/pixabay-api.js';
import { iziToastOptions, renderImages, toggleLoader } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchForm = document.querySelector(".search-form");


searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchRequest = searchForm.search.value.trim();
    if (!searchRequest) {
        iziToastOptions.message = `Fill search field`;
        iziToast.error(iziToastOptions);
    } else {
        toggleLoader();
        fetchImages(searchRequest)
            .then((json) => renderImages(json))
            .catch((error) => console.log("Error " + error));
    }
});

