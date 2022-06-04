import { writable } from 'svelte/store';

export const context = writable('/');

export { context as default }