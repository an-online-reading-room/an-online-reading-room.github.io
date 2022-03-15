import { writable } from "svelte/store";
import { variables } from '../variables' 
import qs from 'qs'

const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}

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
      populate: ['author', 'categories'],
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
      const author_name = story.attributes.author.data.attributes.username
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
        author_name: author_name,
        url: slugify(author_name + '-' + story.attributes.title),
        categories: story.attributes.categories.data.map(category => category.attributes.name),
      }
    }) 
    console.log(list)
    data.push(...list)
    page += 1

    storyList.set({loading, data, noMoreData})
  }
}
