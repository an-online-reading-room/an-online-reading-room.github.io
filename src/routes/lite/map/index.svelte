<script>
  import { getCoordinates } from '$lib/services/geocode';
  import { onDestroy, onMount } from 'svelte';
  import "leaflet/dist/leaflet.css"
  import Popup from '$components/Popup.svelte';
  import { visited } from '$stores/visited'
  import storyList from '$stores/storyList';
  import ShareCard from '$components/ShareCard.svelte'
  import Footer from '$components/Footer.svelte';
  
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
  <div class="h-6 w-6 ml-auto cursor-pointer" on:click={() => openShareCard = !openShareCard}>
    <svg class="stroke-primary fill-accent" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9.4" transform="rotate(-180 10 10)" stroke-width="1.2"/>
    <path d="M12.3333 5.00001C11.4167 5.00001 10.6666 5.72591 10.6666 6.61294C10.6666 6.79408 10.6976 6.96925 10.7552 7.13204L7.90112 8.92646C7.59546 8.59825 7.15626 8.38708 6.66668 8.38708C5.75009 8.38708 5 9.11298 5 10C5 10.887 5.75009 11.6129 6.66668 11.6129C7.15823 11.6129 7.60046 11.4041 7.90621 11.0736L10.7552 12.868C10.6966 13.0321 10.6666 13.2044 10.6666 13.3871C10.6666 14.2741 11.4167 15 12.3333 15C13.2499 15 14 14.2741 14 13.3871C14 12.5001 13.2499 11.7741 12.3333 11.7741C11.8438 11.7741 11.4047 11.9853 11.0989 12.3135L8.24476 10.5191C8.30231 10.3562 8.33335 10.181 8.33335 10C8.33335 9.81729 8.30336 9.64505 8.24476 9.4809L11.0938 7.68649C11.3995 8.01705 11.8418 8.22587 12.3333 8.22587C13.2499 8.22587 14 7.49996 14 6.61294C14 5.72591 13.2499 5.00001 12.3333 5.00001Z" />
    </svg>
  </div>
</Footer>

<ShareCard open={openShareCard} title="Share this story map"></ShareCard>