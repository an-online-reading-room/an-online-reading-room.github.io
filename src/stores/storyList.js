import { writable } from "svelte/store";
import { variables } from '$lib/variables' 
import qs from 'qs'

let loading = true
let noMoreData = false
let data = []
let page = 1

const storyList = writable({
  loading, 
  data, 
  noMoreData
})

export default {
  subscribe: storyList.subscribe,
  
  async fetchNextPage() {
    if (noMoreData) return

    const query = qs.stringify({
      populate: ['users_permissions_user'],
      pagination: {
        page: page,
        pageSize: 10,
      },
    }, {
      encodeValuesOnly: true,
    })
    // loading = true
    // storyList.set({loading, data, noMoreData})
    
    const response = await fetch(`${variables.strapi_url}/api/stories?${query}`)
    loading = false
    let list = (await response.json()).data
    noMoreData = list.length === 0
    list = list.map(story => {
      const username = story.attributes.users_permissions_user.data.attributes.username
      const regexLocation = /([A-Za-z\s]+,*)/g;
      let location = story.attributes.location.trim()
      const match = location.match(regexLocation)
      if(match != null) {
        const len = match.length
        if(len === 1) location = `${match[0]}`
        else location = `${match[len-2]} ${match[len-1]}`
      } 
      return {
        id: story.id,
        title: story.attributes.title,
        location: location,
        description: story.attributes.description,
        author_name: username,
        submission: story.attributes.submission,
        slug: story.attributes.slug,
      }
    }) 
    
    data.push(...list)
    page += 1

    storyList.set({loading, data, noMoreData})
  }
}
