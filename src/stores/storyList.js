import { get, writable } from "svelte/store";
import { variables } from '$lib/variables' 
import qs from 'qs'
import * as api from '$lib/api'
import user from "./user";

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
      populate: ['user'],
      pagination: {
        page: page,
        pageSize: 10,
      },
    }, {
      encodeValuesOnly: true,
    })
  
    loading = false
    let res = await api.get(
      `api/stories?${query}`,
      get(user).jwt
      )
      
    noMoreData = res.length === 0
    data.push(...res)
    page += 1

    storyList.set({loading, data, noMoreData})
  }
}
