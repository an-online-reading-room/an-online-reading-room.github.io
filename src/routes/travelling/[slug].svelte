<script context="module">

export async function load({ params, session, url }) {

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
  const data = res[0]

  return {
    status: 200,
    props: {
      pointA: session.pointA,
      pointB: {
        slug: params.slug,
        location: data.location
      },
      username: url.searchParams.get("username")
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

const target = $page.params.slug
export let pointA
export let pointB 
export let username

let pointer

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


  const pointerRotating = [
    { transform: 'rotate(0)' },
    { transform: `rotate(${Math.atan2(dirNorm.y, dirNorm.x)}rad)` }
  ]

  pointer.animate(pointerRotating, {
    duration: 1000,
    iterations: 1,
    fill: 'forwards'
  })

  setTimeout(() => {
    goto(`/adventure/read?story=${target}`)
  }, 3000)
})

</script>

<div class="absolute inset-0 flex flex-col justify-center items-center">
  <img src="/img/compass.png" alt="a small compass">
</div>

<main class="bg-accent text-primary text-sm font-display
h-full w-full py-20
flex flex-col justify-between items-center">
  <section class="text-3xl 
  w-full py-4 px-6
  border-t border-b border-primary">
    <p class="hidden">You are now travelling to {target}!</p>
    <p>You are travelling north.</p>
  </section>

  <section class="
  w-full py-4 px-6
  border-b border-primary">
    <div class="absolute inset-0 flex flex-col justify-center items-center">
      <img bind:this={pointer} src="/img/pointer.png" alt="a compass pointer">
    </div>

    <p class="text-sm">{username} is taking you over waters, through hills to the next story...</p>
  </section>

</main>
