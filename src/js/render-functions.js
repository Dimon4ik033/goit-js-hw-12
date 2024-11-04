'use strict';

export function renderImages(images) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    images.forEach(image => {
        const imgCard = document.createElement('div');
        imgCard.classList.add('gallery-item');
        imgCard.innerHTML = `
            <a href="${image.largeImageURL}" class="gallery-link">
                <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="img">
            </a>
            <div class="info">
                <p class="text">Likes: <span class="numbers">${image.likes}</span></p>
                <p class="text">Views: <span class="numbers">${image.views}</span></p>
                <p class="text">Comments: <span class="numbers">${image.comments}</span></p>
                <p class="text">Downloads: <span class="numbers">${image.downloads}</span></p>
            </div>
        `;
        gallery.appendChild(imgCard);
    });
}

