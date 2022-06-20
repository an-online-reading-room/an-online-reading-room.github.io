<script>
  import { getCoordinates } from '$lib/services/geocode';
  import { onDestroy, onMount } from 'svelte';
  import "leaflet/dist/leaflet.css"
  import Popup from '$components/Popup.svelte';
  import { visited } from '$stores/visited'
  import storyList from '$stores/storyList';
  import ShareCard from '$components/ShareCard.svelte'
  import Footer from '$components/Footer.svelte';
import ShareIcon from '$components/icons/ShareIcon.svelte';
  
  let stories = []
  let travelledDistance = 0
  let openShareCard = false
  
  onMount(async () => {
    storyList.fetchNextPage()
    

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


    console.log(stories)
    let visitedLatLngs = await Promise.all(stories.map(story => {
      return getCoordinates(story.location)
      .then(coords => {
        if(coords != null) {
          let popupId, markerIcon
          if($visited.includes(story.id)) {
            popupId = `#${story.url}-popup-visited`
            markerIcon = iconVisited

            L.marker({lat: coords.y, lon: coords.x}, {icon: markerIcon})
            .bindPopup(document.querySelector(popupId), {className: 'map-popup', closeButton: false})
            .addTo(map)
            return [coords.y, coords.x]
          }
          else {
            popupId = `#popup-unvisited`
            markerIcon = iconUnvisited 
            
            L.marker({lat: coords.y, lon: coords.x}, {icon: markerIcon})
            .bindPopup(document.querySelector(popupId), {className: 'map-popup', closeButton: false})
            .addTo(map)
          }

          
          
        }
      })
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
    
  })

  const storyListUnsubscribe = storyList.subscribe(value => {
      stories = value.data
  })
  onDestroy(() => storyListUnsubscribe)
</script>

<div class="hidden">
  {#each stories as story} 
    <div id="{story.url}-popup-visited">
      <Popup url="/stories/{story.url}" story={story} popupElement={this} />
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

<Footer>
  <p>You have travelled {travelledDistance}km on your journey</p>
  <div class="h-6 w-6 ml-auto cursor-pointer stroke-primary fill-accent" on:click={() => openShareCard = !openShareCard}>
    <ShareIcon />
  </div>
</Footer>

<ShareCard open={openShareCard} title="Share this story map"></ShareCard>