import { flattenStrapiResponse } from "$lib/utils/api"
import { variables } from "$lib/variables"
import qs from 'qs'
import { derived, readable, writable } from "svelte/store"
import storyList from "./storyList"

const query = qs.stringify({
  fields: ['title', 'slug']
}, {
  encodeValuesOnly: true
})


export const createLinksStore = () => {
  const links = writable(JSON.stringify([]))

  return {
    subscribe: links.subscribe,

    init: async () => {
      const res = await fetch(`${variables.strapi_url}/api/stories?${query}`)
      
      if(res.ok) {
        const json_response = await res.json()
        links.set(flattenStrapiResponse(json_response))
        return json_response
      }

      throw Error(res.statusText)
    }
  }
}

export const links = createLinksStore()