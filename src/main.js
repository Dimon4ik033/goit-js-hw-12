'use strict';

import { fetchImages } from './js/pixabay-api.js';
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

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const search = document.getElementById('search').value.trim();

    if (!search) {
        iziToast.error({ title: "Error", message: "Search field cannot be empty!" });
        return;
    }

    loader.style.display = 'flex';

    fetchImages(search)
        .then(data => {
            loader.style.display = 'none'; 
            if (data.hits.length === 0) {
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
            }
        })
        .catch(error => {
            loader.style.display = 'none';
            iziToast.error({ title: "Error", message: error.message });
        });
});