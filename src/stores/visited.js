import { writable } from 'svelte/store'
import { browser } from '$app/env'

const defaultValue = JSON.stringify([])
const stored = browser ? window.localStorage.visited ?? defaultValue : defaultValue

export const visited = writable(JSON.parse(stored))

visited.subscribe(value => {
  if(browser) {
    window.localStorage.setItem('visited', JSON.stringify(value))
  }
})

export { visited as default }