import { writable } from "svelte/store";
import { variables } from '../variables' 
import qs from 'qs'

const tagList = writable([])
async function fetchNextPage() {
  const query = qs.stringify({
    pagination: {
      page: 1,
      pageSize: 6,
    },
  }, {
    encodeValuesOnly: true,
  })

  const response = await fetch(`${variables.strapi_url}/api/categories?${query}`)
  let list = (await response.json()).data
  list = list.map(tag => {
    return {
      name: tag.attributes.name
    }
  }) 
  tagList.set(list)
}
fetchNextPage()

export { tagList as default }
