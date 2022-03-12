import { writable } from 'svelte/store'
import { browser } from '$app/env'

const defaultValue = 'cream'
const stored = browser ? window.localStorage.theme ?? defaultValue : defaultValue

export const theme = writable(stored)

theme.subscribe(value => {
  if(browser) {
    window.localStorage.setItem('theme', value)
  }
})

export { theme as default }