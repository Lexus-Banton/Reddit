/* Imports */

import '../auth/user.js';

import { getPost } from '../fetch-utils.js';

/* Get Dom Elements */
const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postAbout = document.getElementById('post-about');

/*state*/
let error = null;
let post = {};

/*Events*/
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (!id) {
        location.replace('/');
    }

    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        displayError();
    }

    if (!post) {
        location.replace('/');
    } else {
        displayPosts();
    }
});

/* Display Functions*/
function displayError() {
    if (error) {
        //eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayPosts() {
    postTitle.textContent = post.title;
    postAbout.textContent = post.about;
    postImage.src = post.image_url;
}
