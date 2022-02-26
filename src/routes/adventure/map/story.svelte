
<script>
  import Header from '../../../components/Header.svelte';
  import { onMount } from 'svelte';
  import "leaflet/dist/leaflet.css"
  
  onMount(async () => {
    const L = (await import('leaflet')).default
    const geocoder = (await import('pelias-leaflet-plugin')).default
    

    
    let map = L.map('map').setView([20.5937, 78.9629], 4);
    L.tileLayer('https://api.mapbox.com/styles/v1/thereadingroom/ckz5ecvwu000c14pi4cc6z3kr/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlcmVhZGluZ3Jvb20iLCJhIjoiY2t6NWNicmxlMHAyZzJucW9ydTNrenA0eiJ9.zQ2AECdzKcl5TrQXrGqPeA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidGhlcmVhZGluZ3Jvb20iLCJhIjoiY2t6NWNicmxlMHAyZzJucW9ydTNrenA0eiJ9.zQ2AECdzKcl5TrQXrGqPeA'
    }).addTo(map);
  })
</script>

<section id="map" class="h-full">
</section>