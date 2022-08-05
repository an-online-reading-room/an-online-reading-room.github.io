import { get, writable } from "svelte/store";
import qs from 'qs'
import * as api from '$lib/api'
import user from "../user";

let loading = true
let noMoreData = false
let data = []
let page = 1

const bookmarkList = writable({
  loading, 
  data, 
  noMoreData
})

export default {
  subscribe: bookmarkList.subscribe,
  
  async fetchNextPage() {
    if (noMoreData) return

    loading = false
    let res = await api.get("api/users/bookmarks", get(user).jwt);
    res = res.bookmarks.reverse()

    noMoreData = res.length === 0
    const newData = data.concat(res)
    page += 1

    bookmarkList.set({loading, data: newData, noMoreData})
  },

  async delete(id) {
    
    const delBookmark = await api.put(
      `api/users/bookmarks`,
      {
          operation: "remove",
          data: {
              id: id,
          },
      },
      get(user).jwt
    );

    bookmarkList.update(list => {
      return {
        ...list,
        data: list.data.filter(item => item.id !== delBookmark.id)
      }
    })

    return delBookmark.id
  }
}
