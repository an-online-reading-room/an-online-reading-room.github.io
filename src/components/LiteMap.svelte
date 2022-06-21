<script>
import { createEventDispatcher, onDestroy, onMount } from "svelte";
import { getCoordinates } from "$lib/services/geocode";
import Popup from "./Popup.svelte";
import "leaflet/dist/leaflet.css"

const dispatch = createEventDispatcher()

export let stories 
let map = null
let travelledDistance

onMount(async () => {

  const L = (await import('leaflet')).default
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

  let iconUnvisited = L.icon({
    iconUrl: '/img/story-unvisited.png',
    shadowUrl: '/img/story-unvisited.png',
    iconSize:     [20, 20], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    // iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
    // shadowAnchor: [0, 0],  // the same for the shadow
    // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  })
  let iconVisited = L.icon({
    iconUrl: '/img/story-visited.png',
    shadowUrl: '/img/story-visited.png',
    iconSize:     [20, 20], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    
  })


  let visitedLatLngs = await Promise.all(stories.map(async story => {
    const coords = await getCoordinates(story.location)
    if(coords != null) {
      let popupId = `#${story.slug}-popup-visited` 
      let markerIcon = iconVisited
    
      L.marker({lat: coords.y, lon: coords.x}, {icon: markerIcon})
      .bindPopup(document.querySelector(popupId), {className: 'map-popup', closeButton: false})
      .addTo(map)
    
      return [coords.y, coords.x]
      
        // popupId = `#popup-unvisited`
        // markerIcon = iconUnvisited 
        
        // L.marker({lat: coords.y, lon: coords.x}, {icon: markerIcon})
        // .bindPopup(document.querySelector(popupId), {className: 'map-popup', closeButton: false})
        // .addTo(map)
    }
  }))
  visitedLatLngs = visitedLatLngs.filter(e => e != null)

  let travelledPath = L.polyline(visitedLatLngs, {color: 'black'}).addTo(map)
  let travelledDistInMtrs = 0
  for(let i = 0; i < visitedLatLngs.length-1; i++) {
    let from = visitedLatLngs[i]
    let to = visitedLatLngs[i+1]
    travelledDistInMtrs += map.distance(from, to)
  }
  travelledDistance = Math.round(travelledDistInMtrs/1000.0)
  dispatch('distcalcend', { value: travelledDistance })
})

onDestroy(() => {
  map = null
})

</script>

<div class="hidden">
  {#each stories as story} 
    <div id="{story.slug}-popup-visited">
      <Popup url="/lite/{story.slug}" story={story} popupElement={this} />
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
</div>

<section 
  id="map" 
  class="h-full z-10"
  >
</section>
