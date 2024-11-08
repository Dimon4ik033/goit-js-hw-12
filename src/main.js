'use strict';

import { fetchImages, resetPage, perPage } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250
});

const form = document.querySelector('.form');
const loader = document.getElementById('loader');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');


let currentSearch = '';
let totalHits = 0;

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const search = document.getElementById('search').value.trim();
    
    if (!search) {
        iziToast.error({ title: "Error", message: "Search failed cannot be empty!" });
        return;
    }

    loader.style.display = 'block';
    loadMoreBtn.style.display = 'none';

    resetPage();
    currentSearch = search;
    gallery.innerHTML = '';

    try {
        const data = await fetchImages(currentSearch);
        totalHits = data.totalHits;

        if (totalHits === 0) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again!",
                backgroundColor: "#ff4d4f",
                iconColor: "white",
                titleColor: "white",
                messageColor: "white",
                titleSize: "16px",
                position: "topRight",
                timeout: 5000,
                maxWidth: 432,
            });
        } else {
            renderImages(data.hits);
            lightbox.refresh();
            if (totalHits > perPage) loadMoreBtn.style.display = 'block';
        }
    } catch (error) {
        iziToast.error({ title: "Error", message: error.message });
    } finally {
        loader.style.display = 'none';
    }
});


loadMoreBtn.addEventListener('click', async () => {
    loader.style.display = 'block';

    try {
        const data = await fetchImages(currentSearch);
        renderImages(data.hits);
        lightbox.refresh();

        if (gallery.children.length >= totalHits) {
            loadMoreBtn.style.display = 'none';
            iziToast.info({
                title: "End",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight"
            });
        } else {
            const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
            window.scrollBy({ top: cardHeight * 4, behavior: "smooth" });
        }
    } catch (error) {
        iziToast.error({ title: "Error", message: error.message });
    } finally {
        loader.style.display = 'none';
    }
});