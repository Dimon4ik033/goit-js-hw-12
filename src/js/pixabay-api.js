'use strict';

import axios from "axios";

const apiKey = '46889840-15974bab23e9bef03dd03027e';
const baseUrl = 'https://pixabay.com/api/';
export const perPage = 15;

let page = 1;

export async function fetchImages(search) {
    const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(search)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        const responce = await axios.get(url);
        page += 1;
        return responce.data;
    } catch (error) {
        throw new Error('Feiled to fetch images');
    }
}

export function resetPage() {
    page = 1;
}