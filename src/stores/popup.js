import { writable } from 'svelte/store'
import { browser } from '$app/env'

const defaultValue = JSON.stringify({
    lite: false,
    adventure: false,
    linkingModal: false
})
const stored = browser ? window.localStorage.popup ?? defaultValue : defaultValue

export const popup = writable(stored)

popup.subscribe(value => {
  if(browser) {
    window.localStorage.setItem('popup', value)
  }
})

export { popup as default }