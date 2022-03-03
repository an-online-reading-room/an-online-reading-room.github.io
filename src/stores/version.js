import { writable } from 'svelte/store'
import { browser } from '$app/env'

const defaultValue = 'lite'
const stored = browser ? window.localStorage.version ?? defaultValue : defaultValue

export const version = writable(stored)

version.subscribe(value => {
  if(browser) {
    window.localStorage.setItem('version', value)
  }
})

export { version as default }