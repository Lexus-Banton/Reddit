/*imports*/
import '../auth/user.js';
import { createPost, uploadImage } from '../fetch-utils.js';

/* Get DOM Elements */
const redditForm = document.getElementById('reddit-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');

/* State */
let error = null;

/* Events */
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/placeholder.png';
    }
});

redditForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(redditForm);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `posts/${randomFolder}/${imageFile.name} `;
    const url = await uploadImage('post-images', imagePath, imageFile);

    const post = {
        title: formData.get('title'),
        about: formData.get('about'),
        image_url: url,
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
