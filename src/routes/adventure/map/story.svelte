<script lang="ts" context="module">
	
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ params, fetch, session, stuff }) => {
		const stories = await fetch('/storiesapi')
		let storiesData = await stories.json()
		return { props: { stories: storiesData }}
	}

	
</script>


<script>
  import Header from '../../../components/Header.svelte';
  import { getCoordinates } from '../../../services/geocode';
  import { onMount } from 'svelte';
  import "leaflet/dist/leaflet.css"
  import "../../../popup.css"
  import Popup from '../../../components/Popup.svelte';

  
  export let stories 
  onMount(async () => {
    const L = (await import('leaflet')).default
    const geocoder = (await import('pelias-leaflet-plugin')).default

    
    let map = L.map('map').setView([20.5937, 78.9629], 4);
    L.tileLayer('https://api.mapbox.com/styles/v1/thereadingroom/ckz5ecvwu000c14pi4cc6z3kr/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlcmVhZGluZ3Jvb20iLCJhIjoiY2t6NWNicmxlMHAyZzJucW9ydTNrenA0eiJ9.zQ2AECdzKcl5TrQXrGqPeA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidGhlcmVhZGluZ3Jvb20iLCJhIjoiY2t6NWNicmxlMHAyZzJucW9ydTNrenA0eiJ9.zQ2AECdzKcl5TrQXrGqPeA'
    }).addTo(map);

    let icon = L.icon({
      iconUrl: '/img/story-unvisited.png',
      shadowUrl: '/img/story-unvisited.png',
      iconSize:     [20, 20], // size of the icon
      shadowSize:   [0, 0], // size of the shadow
      // iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
      // shadowAnchor: [0, 0],  // the same for the shadow
      // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    })

    fetch('/storiesapi')
    .then(response => response.json())
    .then(stories => {
      stories.map(story => {
      
        getCoordinates(story.location)
        .then(coords => {
          console.log(Header)
          
          if(coords != null) {
            let popup = L.popup().setLatLng([coords.y, coords.x])
            .setContent(document.querySelector(`#${story.url}-popup`))
            
            let marker = L.marker({lat: coords.y, lon: coords.x}, {icon: icon}).addTo(map)
            marker.bindPopup(popup.getContent())
            
          }
        })
      })
    })

   
  })
</script>

<div class="hidden">
  {#each stories as story} 
    <div id="{story.url}-popup">
      <Popup storyUrl="/stories/{story.url}" storyName={story.title} popupElement={this} />
    </div>
  {:else}
    <p class="font-display text-xs text-left">
      sorry, we could'nt find what you were looking for
    </p>
  {/each}
</div>

<section id="map" class="h-full">
</section>
