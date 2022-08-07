import { browser } from "$app/env";
import { get, writable } from "svelte/store";

const defaultValue = JSON.stringify({});
const stored = browser ? window.localStorage.sharedMapProgress ?? defaultValue : defaultValue;

const sharedMapProgress = writable(JSON.parse(stored))

sharedMapProgress.subscribe((value) => {
  if (browser) {
      window.localStorage.setItem('sharedMapProgress', JSON.stringify(value));
  }
});

export default {
  subscribe: sharedMapProgress.subscribe,

  update(name) {
    sharedMapProgress.update(value => {
      console.log("hereeeeeeeeeeee")
      console.log(get(sharedMapProgress)[name])

      let temp = {}
      temp[name] = get(sharedMapProgress)[name] != null ? get(sharedMapProgress)[name]+1 : 0

      return {
        ...value,
        ...temp
      }
    })
  }
}
