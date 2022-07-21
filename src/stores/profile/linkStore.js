import { get, writable } from "svelte/store";
import qs from 'qs'
import * as api from '$lib/api'
import user from "../user";

let loading = true
let noMoreData = false
let data = []
let page = 1

const linkList = writable({
  loading, 
  data, 
  noMoreData
})

export default {
  subscribe: linkList.subscribe,
  
  async fetchNextPage() {
    if (noMoreData) return

    const query = qs.stringify({
      filters: {
        user: {
          username: { $eq: get(user).username }
        }
      },
      populate: ['source', 'target'],
      pagination: {
        page: page,
        pageSize: 10,
      },
    }, {
      encodeValuesOnly: true,
    })
  
    loading = false
    let res = await api.get(
      `api/links?${query}`,
      get(user).jwt
    )
      
    noMoreData = res.length === 0
    data.push(...res)
    page += 1

    linkList.set({loading, data, noMoreData})
  },

  async delete(id) {
    
    const delLink = await api.del(
      `api/links/${id}`,
      get(user).jwt
    )

    linkList.update(list => {
      return {
        ...list,
        data: list.data.filter(item => item.id !== delLink.id)
      }
    })

    return delLink.id
  }
}
