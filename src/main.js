import { fetchImages, PER_PAGE, PAGE_INIT } from './js/pixabay-api.js';
import { iziToastOptions, renderImages, toggleVisibility, scrollDownGallery } from './js/render-functions.js';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let page_number;

const searchForm = document.querySelector(".search-form");
const galleryEl = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more-btn");
let prevSearchRequest = null;

const checkPagination = ({ totalHits }, page_number) => {
    const totalPages = Math.ceil(totalHits / PER_PAGE);

    //visible when pictures exist and page number less then totalPages
    const visible = totalHits > 0 && page_number < totalPages;
    toggleVisibility(".load-more-btn", visible);

    //Show this message only when all pages have been viewed.
    if (page_number >= totalPages && totalHits !== 0) {
        return iziToast.info({
            message: "We're sorry, there are no more posts to load"
        });
    }
};

const showError = (error) => {
    console.error(error);
    iziToastOptions.message = error.message;
    iziToast.error(iziToastOptions);
}

searchForm.addEventListener("submit", (event) => {
    // init/reset actions
    page_number = PAGE_INIT;
    event.preventDefault();
    galleryEl.innerHTML = "";
    toggleVisibility(".load-more-btn", false);

    // get input words
    const searchRequest = searchForm.search.value.trim();
    if (!searchRequest) {
        prevSearchRequest = null;
        iziToastOptions.message = `Fill search field`;
        iziToast.error(iziToastOptions);
    } else {
        prevSearchRequest = searchRequest;
        toggleVisibility(".loader", true);
        fetchImages(searchRequest, PER_PAGE)
            .then(response => renderImages(response))
            .then(data => checkPagination(data, page_number))
            .catch(error => {
                showError(error);
            });
    }
});

loadMoreBtn.addEventListener("click", (event) => {
    page_number++;
    toggleVisibility(".loader", true);
    toggleVisibility(".load-more-btn", false);
    fetchImages(prevSearchRequest, PER_PAGE, page_number)
        .then(response => renderImages(response))
        .then(data => checkPagination(data, page_number))
        .then(() => scrollDownGallery())
        .catch(error => {
            showError(error);
        });
});




