import qs from 'qs'
import * as api from '$lib/api'
import user from '$stores/user';
import visited from '$stores/visited';
import { get } from 'svelte/store'
import { flattenStrapiResponse } from '$lib/utils/api';

const getMap = async () => {
  const res = await api.get(`api/users/me`, get(user).jwt);
  let defaultMap = res.maps[0]
  if(defaultMap == null) {
    // make new defaultMap

    const newMap = await api.post(
      'api/maps',
      {
        data: {
          type: "lite",
          user: get(user).id
        }
      },
      get(user).jwt
    )

    defaultMap = newMap.data
  }

  console.log("default map id: ", defaultMap.id)
  return defaultMap
}

const updateMap = async (id, title) => {
  const res = await api.put(
    `api/maps/${id}`,
    {
      data: {
        title: title,
        shared: true
      }
    },
    get(user).jwt
  )

  return res
} 

const insertVisit = async (map, story) => {
  const prevVisitQuery = qs.stringify({
    filters: {
      map: {
        id: { $eq: map }
      },
      story: {
        id: { $eq: story }
      }
    }
  }, {
    encodeValuesOnly: true,
  })

  // TODO: findOne how ?
  let prevVisit = await api.get(
    `api/visits?${prevVisitQuery}`, 
    get(user).jwt
  )
  prevVisit = prevVisit.data[0]
  
  if(prevVisit != null) {
    // update visit

    const updatedVisit = await api.put(
      `api/visits/${prevVisit.id}`,
      {
        data: {
          visitedAt: new Date()
        }
      }
    )

    return updatedVisit.data

  } else {
    // create visit

    const newVisit = await api.post(
      'api/visits',
      {
        data: {
          visitedAt: new Date(),
          map: map,
          story: story
        }
      },
      get(user).jwt
    )

    return newVisit.data
  }

}

const getVisitedStories = async () => {
  const visitedStoriesQuery = qs.stringify({
    fields: ['title', 'location', 'slug'],
    populate: {
      users_permissions_user: {
        fields: ['username']
      }
    },
    filters: {
      id: { $in: get(visited) } 
    }
  }, {
    encodeValuesOnly: true,
  })

  let res = await api.get(
    `api/stories?${visitedStoriesQuery}`,
    get(user).jwt
  )
  res = flattenStrapiResponse(res)

  return res  
}

export { 
  getMap, 
  updateMap,
  insertVisit,
  getVisitedStories
}