
const API_KEY = '45187829-ea2cd24770d3667653c872a41';

export const fetchImages = (searchRequest) => {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: encodeURIComponent(searchRequest),
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        lang: "en",
        per_page: 18

    });
    const url = "https://pixabay.com/api/?" + searchParams;
    return fetch(url).then((response) => {
        if (!response.ok) {
            console.error("error fetchImages");
            throw new Error(response.status);
        }
        return response.json();
    });
};


