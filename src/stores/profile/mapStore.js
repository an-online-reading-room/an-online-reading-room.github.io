import { get, writable } from "svelte/store";
import qs from 'qs'
import * as api from '$lib/api'
import user from "../user";

let loading = true
let noMoreData = false
let data = []
let page = 1

const mapList = writable({
  loading, 
  data, 
  noMoreData
})

export default {
  subscribe: mapList.subscribe,
  
  async fetchNextPage() {
    if (noMoreData) return

    const query = qs.stringify({
      filters: {
        user: {
          username: { $eq: get(user).username }
        }
      },
      pagination: {
        page: page,
        pageSize: 10,
      },
    }, {
      encodeValuesOnly: true,
    })
  
    loading = false
    let res = await api.get(
      `api/maps?${query}`,
      get(user).jwt
    )
      
    noMoreData = res.length === 0
    data.push(...res)
    page += 1

    mapList.set({loading, data, noMoreData})
  },

  
  async delete(id) {
    
    const delMap = await api.del(
      `api/maps/${id}`,
      get(user).jwt
    )

    mapList.update(list => {
      return {
        ...list,
        data: list.data.filter(item => item.id !== delMap.id)
      }
    })

    return delMap.id

  }
}
