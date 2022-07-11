import { writable } from 'svelte/store'
import { browser } from '$app/env'

const defaultValue = 10
const stored = browser ? window.localStorage.restTimer ?? defaultValue : defaultValue

export const restTimer = writable(stored)

restTimer.subscribe(value => {
  if(browser) {
    window.localStorage.setItem('restTimer', value)
  }
})

export { restTimer as default }