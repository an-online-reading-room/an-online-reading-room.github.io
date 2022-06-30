<script context="module">

export async function load({ params, session }) {

  const query = qs.stringify({
    stories: {
      fields: ['location'],
      filters: {
        slug: { $eq: params.slug }
      }
    }
  }, {
    encodeValuesOnly: true
  })
  const res = await api.get(
    `api/stories?${query}`,
    get(user).jwt
  )
  const data = flattenStrapiResponse(res)[0]

  return {
    status: 200,
    props: {
      pointA: session.pointA,
      pointB: {
        slug: params.slug,
        location: data.location
      }
    }
  }

}

</script>

<script>
import { goto } from "$app/navigation";
import { page } from "$app/stores"
import qs from 'qs'
import * as api from '$lib/api'
import { getCoordinates } from "$lib/services/geocode";
import { onMount } from "svelte";
import { get } from "svelte/store";
import user from "$stores/user";
import { flattenStrapiResponse } from "$lib/utils/api";

const target = $page.params.slug
export let pointA
export let pointB 

onMount(async () => {
  pointA.coordinates = await getCoordinates(pointA.location)
  pointB.coordinates = await getCoordinates(pointB.location)
  
  const L = (await import('leaflet')).default
  let lpointA = L.point(pointA.coordinates.x, pointA.coordinates.y)
  let lpointB = L.point(pointB.coordinates.x, pointB.coordinates.y)

  let dir = lpointB.subtract(lpointA)
  let dirLength = Math.sqrt(Math.pow(dir.x, 2) + Math.pow(dir.y, 2)) 
  let dirNorm = L.point(dir.x/dirLength, dir.y/dirLength)
  console.log("direction :", dir)
  console.log("direction normalized: ", dirNorm)

  setTimeout(() => {
    goto(`/adventure/read?story=${target}`)
  }, 2000)
})

</script>

<div class="text-3xl">
  You are now travelling to {target}!
</div>