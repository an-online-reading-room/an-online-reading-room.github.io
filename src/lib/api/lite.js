import qs from 'qs'
import * as api from '$lib/api'
import user from '$stores/user';
import { get } from 'svelte/store'
import { flattenStrapiResponse } from '$lib/utils/api';
import mapStore from '$stores/mapStore';
import { adjectives, colors, uniqueNamesGenerator } from 'unique-names-generator';

const getMap = async () => {
  const res = await api.get(`api/users/me`, get(user).jwt);
  let defaultMap = res.maps[0] // NOTE: make sure only one default map 

  console.log("default map id: ", defaultMap.id)
  return defaultMap
}

const saveMap = async (isShared, title) => {
  if(!title) {
    title = uniqueNamesGenerator({
      dictionaries: [adjectives, colors],
      length: 2,
      separator: '-'
    })
  }

  // clone default map as new map and post
  const res = await api.post(
    `api/maps`,
    {
      data: {
        title: title,
        type: "lite",
        shared: isShared,
        user: get(user).id,
        visits: get(mapStore).visits
      }
    },
    get(user).jwt
  )

  console.log("saved map with id: ", res.id)
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
  let newVisit  
  let prevVisit = await api.get(
    `api/visits?${prevVisitQuery}`, 
    get(user).jwt
  )
  
  if(prevVisit.data.length > 0) {
    prevVisit = prevVisit.data[0]
    // update visit

    const res = await api.put(
      `api/visits/${prevVisit.id}`,
      {
        data: {
          visitedAt: new Date()
        }
      }
    )

    newVisit = res.data

  } else {
    // create visit

    const res = await api.post(
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

    newVisit = res.data
  }

  return newVisit

}

const getVisitedStories = async () => {
  if(get(mapStore).stories.length === 0) {
    console.log("got no stories in mapstore")
    return []
  }

  const visitedStoriesQuery = qs.stringify({
    fields: ['title', 'location', 'slug'],
    populate: {
      users_permissions_user: {
        fields: ['username']
      }
    },
    filters: {
      id: { $in: get(mapStore).stories } 
    }
  }, {
    encodeValuesOnly: true,
  })

  let res = await api.get(
    `api/stories?${visitedStoriesQuery}`,
    get(user).jwt
  )
  res = flattenStrapiResponse(res)
  console.log("visited stories: ")
  console.log(res)

  return res  
}

export { 
  getMap, 
  saveMap,
  insertVisit,
  getVisitedStories
}