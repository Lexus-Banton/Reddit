/* Imports */

import '../auth/user.js';

import { getPost, createComment } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';

/* Get Dom Elements */
const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postAbout = document.getElementById('post-about');
const commentList = document.getElementById('comment-list');
const commentForm = document.getElementById('comment-form');

/*state*/
let error = null;
let post = {};
let comments = [];

/*Events*/
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (!id) {
        location.replace('/');
        return;
    }

    const response = await getPost(id);
    error = response.error;
    post = response.data;
    comments = post.comments;

    if (error) {
        displayError();
    }

    if (!post) {
        location.replace('/');
    } else {
        displayPost();
    }

    displayComments();
});

commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(commentForm);
    const insertComment = {
        text: formData.get('text'),
        post_id: post.id,
    };

    const response = await createComment(insertComment);
    error = response.error;

    if (error) {
        displayError();
    } else {
        const comment = response.data;
        comments.unshift(comment);
        displayComments();

        commentForm.reset();
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

function displayPost() {
    postTitle.textContent = post.title;
    postAbout.textContent = post.about;
    postImage.src = post.image_url;
}

function displayComments() {
    commentList.innerHTML = '';

    for (const comment of comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}
