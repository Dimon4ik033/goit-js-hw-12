'use strict';

export function fetchImages(search) {
    const apiKey = '46889840-15974bab23e9bef03dd03027e';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(search)}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP помилка! Статус: ${response.status}`);
            }
            return response.json();
        });
}
