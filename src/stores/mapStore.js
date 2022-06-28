import { writable } from 'svelte/store';
import { browser } from '$app/env';

const defaultValue = JSON.stringify({
    stories: [],
    visits: []
});
const stored = browser ? window.localStorage.mapStore ?? defaultValue : defaultValue;

export const mapStore = writable(JSON.parse(stored));

mapStore.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('mapStore', JSON.stringify(value));
    }
});

export { mapStore as default };