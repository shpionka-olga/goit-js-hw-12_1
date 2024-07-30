const formData = {
    email: "",
    message: ""
};
const localStorageKey = "feedback-form-state";

const feedbackForm = document.querySelector(".feedback-form");
feedbackForm.addEventListener("input", (event) => {
    formData.email = feedbackForm.email.value;
    formData.message = feedbackForm.message.value;
    if (formData.message || formData.email) {
        localStorage.setItem(localStorageKey, JSON.stringify(formData));
    } else {
        localStorage.removeItem(localStorageKey);
        console.log("localStorage.removeItem" + localStorageKey);
    }
});


feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!feedbackForm.email.value.trim() ||
        !feedbackForm.message.value.trim()) {
        alert("Fill please all fields");
    } else {
        console.log("formData = " + JSON.stringify(formData));
        localStorage.removeItem(localStorageKey);
        formData.email = "";
        formData.message = "";
        feedbackForm.reset();
    }
});

window.addEventListener('load', function (event) {
    fillFormDataFromLocalStorage(formData);
    feedbackForm.email.value = formData.email;
    feedbackForm.message.value = formData.message;

});


function fillFormDataFromLocalStorage(formData) {
    const formDataFromLocalStorage = localStorage.getItem(localStorageKey);
    if (formDataFromLocalStorage != null) {
        const localStorageFeedbackState = JSON.parse(formDataFromLocalStorage);
        formData.email = localStorageFeedbackState.email;
        formData.message = localStorageFeedbackState.message;
    }
}