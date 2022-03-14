import { writable } from 'svelte/store'
import { browser } from '$app/env'

const defaultValue = 'listener'
const stored = browser ? window.localStorage.mode ?? defaultValue : defaultValue

export const mode = writable(stored)

mode.subscribe(value => {
  if(browser) {
    window.localStorage.setItem('mode', value)
  }
})

export { mode as default }