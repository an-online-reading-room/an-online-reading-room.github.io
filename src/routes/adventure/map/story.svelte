<script lang="ts" context="module">
	
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ params, fetch, session, stuff }) => {
		const stories = await fetch('/storiesapi')
		let storiesData = await stories.json()
		return { props: { stories: storiesData }}
	}

	
</script>


<script>
  import { getCoordinates } from '../../../services/geocode';
  import { onMount } from 'svelte';
  import "leaflet/dist/leaflet.css"
  import Popup from '../../../components/Popup.svelte';
  import { visited } from '../../../stores/visited'
  
  export let stories 
  let travelledDistance = 0
  onMount(async () => {
    const L = (await import('leaflet')).default
    const geocoder = (await import('pelias-leaflet-plugin')).default

    
    let map = L.map('map').setView([20.5937, 78.9629], 4);
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

    fetch('/storiesapi')
    .then(response => response.json())
    .then(stories => {
      

      let visitedLatLngs = stories.map(story => {
        return getCoordinates(story.location)
        .then(coords => {
          if(coords != null) {
            let popupId, markerIcon
            if($visited.includes(story.id)) {
              popupId = `#${story.url}-popup-visited`
              markerIcon = iconVisited
              let popup = L.popup().setLatLng([coords.y, coords.x])
              .setContent(document.querySelector(popupId))
              let marker = L.marker({lat: coords.y, lon: coords.x}, {icon: markerIcon}).addTo(map)
              marker.bindPopup(popup.getContent())
              return [coords.y, coords.x]
            }
            else {
              popupId = `#popup-unvisited`
              markerIcon = iconUnvisited 
              let popup = L.popup().setLatLng([coords.y, coords.x])
              .setContent(document.querySelector(popupId))
              let marker = L.marker({lat: coords.y, lon: coords.x}, {icon: markerIcon}).addTo(map)
              marker.bindPopup(popup.getContent())
            }

            
            
          }
        })
      })
      
      return Promise.all(visitedLatLngs)
        
    })
    .then(visitedLatLngs => {
      visitedLatLngs = visitedLatLngs.filter(e => e != null)
      let travelledPath = L.polyline(visitedLatLngs, {color: 'black'}).addTo(map)
      let travelledDistInMtrs = 0
      for(let i = 0; i < visitedLatLngs.length-1; i++) {
        let from = visitedLatLngs[i]
        let to = visitedLatLngs[i+1]
        travelledDistInMtrs += map.distance(from, to)
      }
      travelledDistance = Math.round(travelledDistInMtrs/1000.0)
    })
   
  })
</script>

<div class="hidden">
  {#each stories as story} 
    <div id="{story.url}-popup-visited">
      <Popup storyUrl="/stories/{story.url}" storyName={story.title} popupElement={this} />
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

<section id="map" class="h-full z-10">
</section>

<section class="absolute inset-x-0 bottom-0 z-50 p-2
                bg-accent text-menu-accent font-text text-sm">
  <p>You have travelled {travelledDistance}km on your journey</p>
</section>
