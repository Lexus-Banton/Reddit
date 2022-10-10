export function renderPost(post) {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = `/reddit/?id=${post.id}`;

    const h2 = document.createElement('h2');
    h2.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.about;

    const img = document.createElement('img');
    img.src = post.image_url;

    li.append(h2, p, img);
    a.append(li);

    return a;
}

export function renderComment(comment) {
    const li = document.createElement('li');

    li.textContent = comment.text;
    return li;
}
