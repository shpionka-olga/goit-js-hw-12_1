import axios from 'axios';
const API_KEY = '45187829-ea2cd24770d3667653c872a41';
export const PER_PAGE = 15;
export const PAGE_INIT = 1;


export const fetchImages = async (searchRequest, per_page, page = PAGE_INIT) => {
    const configParams = {
        params: {
            key: API_KEY,
            q: encodeURIComponent(searchRequest),
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            lang: "en",
            per_page,
            page
        }
    }
    const response = await axios.get(`https://pixabay.com/api`, configParams);
    return response.data;
};


