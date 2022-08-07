<script>
import { afterUpdate, createEventDispatcher, onDestroy, onMount } from "svelte";
import { afterNavigate, beforeNavigate } from "$app/navigation";
import { getCoordinates } from "$lib/services/geocode";
import Popup from "./Popup.svelte";
import "leaflet/dist/leaflet.css"
import sharedMapProgressStore from "$stores/map/sharedMapProgressStore";

const dispatch = createEventDispatcher()

export let stories 
export let name = null
export let isShared = false
let L 
let map = null
let iconVisited, iconUnvisited
let travelledDistance = 0

const initMap = async () => {
  L = (await import('leaflet')).default
  // const geocoder = (await import('pelias-leaflet-plugin')).default
  
  map = L.map('map').setView([20.5937, 78.9629], 4);
  L.control.scale().addTo(map)
  map.setMinZoom(2)
  map.setMaxZoom(8)
  L.tileLayer('https://api.mapbox.com/styles/v1/thereadingroom/ckz5ecvwu000c14pi4cc6z3kr/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlcmVhZGluZ3Jvb20iLCJhIjoiY2t6NWNicmxlMHAyZzJucW9ydTNrenA0eiJ9.zQ2AECdzKcl5TrQXrGqPeA', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoidGhlcmVhZGluZ3Jvb20iLCJhIjoiY2t6NWNicmxlMHAyZzJucW9ydTNrenA0eiJ9.zQ2AECdzKcl5TrQXrGqPeA'
  }).addTo(map);

  iconUnvisited = L.icon({
    iconUrl: '/img/story-unvisited.png',
    shadowUrl: '/img/story-unvisited.png',
    iconSize:     [20, 20], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    // iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    // shadowAnchor: [0, 0],  // the same for the shadow
    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  })
  iconVisited = L.icon({
    iconUrl: '/img/story-visited.png',
    shadowUrl: '/img/story-visited.png',
    iconSize:     [20, 20], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    
  })
}

const markStories = async () => {
  L = (await import('leaflet')).default
  console.log(stories)
  let leafletObjs = await Promise.all(stories.map(async (story, index) => {
    const coords = await getCoordinates(story.location)
    if(coords != null) {
      let popupId = 
        isShared === false ? `#${story.slug}-popup-visited` :
        index <= $sharedMapProgressStore[name] ? `#${story.slug}-popup-visited` : '#popup-locked'
      let markerIcon = iconVisited
    
      const marker = L.marker({lat: coords.y, lon: coords.x}, {icon: markerIcon})

      marker.bindPopup(document.querySelector(popupId), {className: 'map-popup', closeButton: false})
      .addTo(map)
    
      return {
        marker: marker,
        coords: [coords.y, coords.x]
      }
      
        // popupId = `#popup-unvisited`
        // markerIcon = iconUnvisited 
        
        // L.marker({lat: coords.y, lon: coords.x}, {icon: markerIcon})
        // .bindPopup(document.querySelector(popupId), {className: 'map-popup', closeButton: false})
        // .addTo(map)
    }
  }))
  leafletObjs = leafletObjs.filter((item) => item.coords != null)

  const visitedLatLngs = leafletObjs.map((item) => item.coords)

  console.log("visited lat long: ", visitedLatLngs)

  let travelledPath = L.polyline(visitedLatLngs, {color: 'black'}).addTo(map)
  let travelledDistInMtrs = 0
  for(let i = 0; i < visitedLatLngs.length-1; i++) {
    let from = visitedLatLngs[i]
    let to = visitedLatLngs[i+1]
    travelledDistInMtrs += map.distance(from, to)
  }
  travelledDistance = Math.round(travelledDistInMtrs/1000.0)
  dispatch('distcalcend', { value: travelledDistance })
}

const updateMapProgress = (ev) => {
  if(isShared === false) return 
  sharedMapProgressStore.update(name)
}

afterUpdate(async () => {
  markStories()
})

onMount(async () => {
  if(isShared && $sharedMapProgressStore[name] == null) {
    updateMapProgress(name)
  }
  initMap()
  markStories()
})

onDestroy(() => map = null)

</script>

<div class="hidden">
  {#each stories as story} 
    <div id="{story.slug}-popup-visited">
      <Popup 
        url="/lite/{story.slug}" 
        story={story} 
        popupElement={this}
        on:visited={updateMapProgress} />
    </div>
    
  {:else}
    <p class="font-display text-xs text-left">
      sorry, we could'nt find what you were looking for
    </p>
  {/each}

  <div id="popup-unvisited" class="font-text text-sm text-primary text-center leading-4">
    <p>You have not viewed this story</p>
    <p>We hope you find it soon!</p>
  </div>

  <div id="popup-locked" class="font-text text-sm text-primary text-center leading-4">
    <p>Read the previous story before you move on!</p>
  </div>
</div>

<section 
  id="map" 
  class="h-full z-10"
  >
</section>
