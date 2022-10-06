/*imports*/
import '../auth/user.js';
import { createPost } from '../fetch-utils.js';

/* Get DOM Elements */
const redditForm = document.getElementById('reddit-form');
const errorDisplay = document.getElementById('error-display');

/* State */
let error = null;

/* Events */

redditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(redditForm);

    const post = {
        title: formData.get('title'),
        about: formData.get('about'),
    };

    const response = await createPost(post);
    error = response.error;
    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
