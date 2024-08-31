import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export let iziToastOptions = {
    message: `Sorry, there are no images matching your search query. Please try again!`,
    backgroundColor: '#ef4040',
    iconUrl: "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.81 0.219C6.95056 0.0787966 7.14097 4.21785e-05 7.3395 0L16.6605 0C16.859 4.21785e-05 17.0494 0.0787966 17.19 0.219L23.781 6.81C23.9212 6.95056 24 7.14097 24 7.3395V16.6605C24 16.859 23.9212 17.0494 23.781 17.19L17.19 23.781C17.0494 23.9212 16.859 24 16.6605 24H7.3395C7.14097 24 6.95056 23.9212 6.81 23.781L0.219 17.19C0.0787966 17.0494 4.21785e-05 16.859 0 16.6605L0 7.3395C4.21785e-05 7.14097 0.0787966 6.95056 0.219 6.81L6.81 0.219ZM7.65 1.5L1.5 7.65V16.35L7.65 22.5H16.35L22.5 16.35V7.65L16.35 1.5H7.65Z' fill='%23FAFAFB'/%3E%3Cpath d='M6.969 6.969C7.03867 6.89915 7.12143 6.84374 7.21255 6.80593C7.30366 6.76812 7.40135 6.74866 7.5 6.74866C7.59865 6.74866 7.69633 6.76812 7.78745 6.80593C7.87857 6.84374 7.96133 6.89915 8.031 6.969L12 10.9395L15.969 6.969C16.0387 6.89927 16.1215 6.84395 16.2126 6.80621C16.3037 6.76847 16.4014 6.74905 16.5 6.74905C16.5986 6.74905 16.6963 6.76847 16.7874 6.80621C16.8785 6.84395 16.9613 6.89927 17.031 6.969C17.1007 7.03873 17.156 7.12151 17.1938 7.21262C17.2315 7.30373 17.2509 7.40138 17.2509 7.5C17.2509 7.59861 17.2315 7.69626 17.1938 7.78737C17.156 7.87848 17.1007 7.96127 17.031 8.031L13.0605 12L17.031 15.969C17.1007 16.0387 17.156 16.1215 17.1938 16.2126C17.2315 16.3037 17.2509 16.4014 17.2509 16.5C17.2509 16.5986 17.2315 16.6963 17.1938 16.7874C17.156 16.8785 17.1007 16.9613 17.031 17.031C16.9613 17.1007 16.8785 17.156 16.7874 17.1938C16.6963 17.2315 16.5986 17.2509 16.5 17.2509C16.4014 17.2509 16.3037 17.2315 16.2126 17.1938C16.1215 17.156 16.0387 17.1007 15.969 17.031L12 13.0605L8.031 17.031C7.96127 17.1007 7.87848 17.156 7.78737 17.1938C7.69626 17.2315 7.59861 17.2509 7.5 17.2509C7.40138 17.2509 7.30373 17.2315 7.21262 17.1938C7.12151 17.156 7.03873 17.1007 6.969 17.031C6.89927 16.9613 6.84395 16.8785 6.80621 16.7874C6.76847 16.6963 6.74905 16.5986 6.74905 16.5C6.74905 16.4014 6.76847 16.3037 6.80621 16.2126C6.84395 16.1215 6.89927 16.0387 6.969 15.969L10.9395 12L6.969 8.031C6.89915 7.96133 6.84374 7.87857 6.80593 7.78745C6.76812 7.69633 6.74866 7.59865 6.74866 7.5C6.74866 7.40135 6.76812 7.30366 6.80593 7.21255C6.84374 7.12143 6.89915 7.03867 6.969 6.969Z' fill='%23FAFAFB'/%3E%3C/svg%3E",
    titleLineHeight: '1.5',
    titleSize: '16px',
    theme: 'dark',
    messageLineHeight: '1.5',
    messageSize: '16px',
};
const initSimpleLightbox = () => {
    // Initialize SimpleLightbox
    let gallery = new SimpleLightbox('.gallery-link', {
        captions: 1, // Enable captions
        captionSelector: 'img', // Use the img element to get the caption
        captionType: 'attr', // Use attribute to get the caption
        captionsData: 'alt', // Get the caption from the 'alt' attribute
        captionPosition: 'bottom', // Position of the caption
        captionDelay: 250, // Delay before showing the caption
        overlay: 1,
        overlayOpacity: 0.8
    });
    gallery.refresh();
};

const galleryEl = document.querySelector(".gallery");

const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    const [first, ...rest] = string;
    return `${first.toUpperCase()}${rest.join('')}`;
};

export const toggleVisibility = (elementClassName, isVisible) => {
    const element = document.querySelector(elementClassName);
    if (element) {
        element.classList.toggle("is-visible", isVisible);
    }
};

const generateDescriptionItems = ({ likes, views, comments, downloads }) =>
    Object.entries({ likes, views, comments, downloads })
        .map(([key, value]) => `
            <li class="description-item">
                <h2 class="property-title">${capitalizeFirstLetter(key)}</h2>
                <p class="property-value">${value}</p>
            </li>
        `).join("");

export const renderImages = (data) => {
    if (data.totalHits == 0) {
        toggleVisibility(".loader", false);
        iziToast.error(iziToastOptions);
        return data;
    }
    const markup = data.hits
        .map((hit) => {
            return `<li class="gallery-item">
        <a class="gallery-link" href="${hit.largeImageURL}">
            <img class="gallery-image"
                src="${hit.webformatURL}"
                alt="${hit.tags}"
                data-source="${hit.largeImageURL}"
            />
            <ul class="description-list">
             ${generateDescriptionItems(hit)}
             </ul> 
        </a>
    </li>`
        })
        .join("");
    toggleVisibility(".loader", false);
    galleryEl.insertAdjacentHTML("beforeend", markup);
    initSimpleLightbox();
    return data;
};

export const scrollDownGallery = () => {
    const img = document.querySelector(".gallery-image");
    let height = img.getBoundingClientRect().height;
    window.scrollBy({
        top: 2 * (height),
        behavior: "smooth",
    });
};



