import { writable } from 'svelte/store';
import { browser } from '$app/env';

const defaultValue = JSON.stringify({});
const stored = browser ? window.localStorage.user ?? defaultValue : defaultValue;

export const user = writable(JSON.parse(stored));

user.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('user', JSON.stringify(value));
    }
});

export { user as default };
