import { writable } from 'svelte/store'
import { browser } from '$app/env'

const defaultValue = JSON.stringify({
    lite: false,
    adventure: false,
    linkingModal: false
})
const stored = browser ? window.localStorage.modal ?? defaultValue : defaultValue

const modal = writable(JSON.parse(stored))

modal.subscribe(value => {
  if(browser) {
    window.localStorage.setItem('modal', JSON.stringify(value))
  }
})

const set = (name) => {
  modal.update((value) => {
    const entries = Object.entries(value)
    const updatedValue = {}
    for (const [key, value] of entries) {
      console.log(key, value)
      if(key === name) updatedValue[key] = true
      else updatedValue[key] = value
    }
    console.log(updatedValue)
    return updatedValue
  })
  
  
}

export default {
  subscribe: modal.subscribe,
  set: set
}