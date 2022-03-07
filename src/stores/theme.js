import { writable } from 'svelte/store'
import { browser } from '$app/env'

const defaultValue = JSON.stringify({
  primary: '#EEE2D2',
  accent: '#6A735A'
})
const stored = browser ? window.localStorage.theme ?? defaultValue : defaultValue

export const theme = writable(JSON.parse(stored))

theme.subscribe(value => {
  if(browser) {
    window.localStorage.setItem('theme', JSON.stringify(value))
  }
})

export { theme as default }