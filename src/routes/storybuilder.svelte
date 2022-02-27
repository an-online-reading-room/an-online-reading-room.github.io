<script>
  import Header from '../components/Header.svelte'
  import { getSuggestions } from '../services/autocomplete'
  import { onMount } from "svelte";
  import "../form.css"
  import "leaflet/dist/leaflet.css"
  
  const API_URL = 'https://reading-room-backend.herokuapp.com/api'
  let form, editor
  let locationInput = ''
  let locationSuggestions = []
  $: {
    getSuggestions(locationInput)
    .then(data => locationSuggestions = data)
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const authorData = {
      data: {
        username: data.get('username')
      }
    }
    const storyData = {
      data: {
        title: data.get('title'),
        location: data.get('location'),
      }
    }
    editor.save().then(data => {
      storyData.data.submission = data
    }) 
    fetch(`${API_URL}/authors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authorData)
    })
    .then(response => response.json())
    .then(data => storyData.data.author = data.data.id)
    .then(() => {
      fetch(`${API_URL}/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData)
      })
      .then(response => window.location.reload())
    })
  }

  onMount(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    form.addEventListener('submit', handleSubmit);
    editor = new EditorJS({
      holder: 'editor',
      placeholder: 'Add Storyblock'
    })

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

    var geocoderOptions = {
      focus: true,
      
    };
  })
</script>

<div class="flex flex-col align-items-center gap-y-4
            w-screen bg-primary
            text-center">
  <Header></Header>
  

  <main>
    <section id="map" class="h-0 w-0"></section>

    <form bind:this={form} enctype="multipart/form-data" method="post"
          class="flex flex-col gap-4 px-4 py-8
                  font-text text-sm leading-4">
  
      <fieldset>
        <legend class="hidden">Title</legend>
        <input type="text" name="title" id="title" placeholder="Title" required
                class="w-full px-2 py-2 border placeholder:text-black">
      </fieldset>
  
      <fieldset>
        <legend class="hidden">Author's Username</legend>
        <input type="text" name="username" id="username" placeholder="Author's Username" required
                class="w-full px-2 py-2 border placeholder:text-black">
      </fieldset>
  
      <fieldset>
        <legend class="hidden">Location</legend>
        <input bind:value={locationInput} type="text" name="location" id="location" placeholder="Add Location" required
                class="w-full px-2 py-2 border placeholder:text-black"
                list="location-suggestions">
        <datalist id="location-suggestions">
          {#each locationSuggestions as suggestion} 
            <option value={suggestion}> {suggestion} </option>
          {/each}
        </datalist>
      </fieldset>
  
      <section class="w-full placeholder:text-black"
               id="editor"></section>
      
      <button type="submit"
              class="mt-auto p-2
                      self-center text-white font-display text-xs bg-black">
        Submit
      </button>
  
    </form>
  
  </main>


</div>

