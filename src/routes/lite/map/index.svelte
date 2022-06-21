<script>
  import { onDestroy, onMount } from 'svelte';
  import ShareCard from '$components/ShareCard.svelte'
  import Footer from '$components/Footer.svelte';
import ShareIcon from '$components/icons/ShareIcon.svelte';
import { getVisitedStories, updateMap } from '$lib/api/lite'  
import LiteMap from '$components/LiteMap.svelte';
import mapStore from '$stores/map'
import { get } from 'svelte/store';
import Modal from '$components/Modal.svelte';

  let stories = []
  let travelledDistance
  let openShareCard = false
  let openInfoModal = false, openTitleModal = true
  let currentMapID = get(mapStore)
  
  let openLinkModal = false
  let shareLink
  
  onMount(async () => {
    stories = await getVisitedStories()
  
    // setTimeout(() => {
    //   // make info modal hidden 
    //   openInfoModal = false
    //   openTitleModal = true
    // }, 5000)

  })

  const shareMap = async (event) => {
    const mapForm = document.querySelector('#map-form')
    const valid = mapForm.reportValidity()
    if(!valid) return

    const title = mapForm.elements['title'].value

    const newMap = await updateMap(currentMapID, title)
    console.log("updated ", newMap)

    shareLink = `http://localhost:3000/map/${newMap.data.attributes.slug}`
    openLinkModal = true
  }
    
</script>


<LiteMap {stories} on:distcalcend={(ev) => travelledDistance = ev.detail.value} />

<section 
  class="absolute top-20 left-0 w-full
  py-4 px-8 z-20">

  <div 
    id="info-modal"
    class={openInfoModal ? "" : "hidden"}>
    <div 
      class="py-6 px-4 bg-white rounded font-text text-black text-base leading-4 text-left">
      <p>Your map plots the stories you’ve read and the distance you’ve travelled to read them.</p>
    </div>
  </div>

  <div 
    id="title-modal"
    class={openTitleModal ? "w-full" : "hidden"}>
    <div
      class="py-4 px-4 bg-white rounded font-text font-bold text-black text-base leading-4 text-left">
      <form id="map-form">
        <input 
          required
          class="placeholder-black font-bold focus:outline-none" 
          type="text" name="title" id="title" placeholder="Enter a map title">
      </form>
    </div>
  </div>


</section>

<Footer>
  <p>You have travelled {travelledDistance}km on your journey</p>
  <div class="h-6 w-6 ml-auto cursor-pointer stroke-primary" on:click={() => openShareCard = !openShareCard}>
    <ShareIcon />
  </div>
</Footer>

<ShareCard 
  open={openShareCard} 
  title="Share this story map" 
  on:share={shareMap}
/>

<!-- temp modal -->
<Modal name="temp share modal" isOpenModal={openLinkModal}>
  <a href={shareLink}>go to the map!</a>
  <p>fine</p>
</Modal>

<style>
  ::-webkit-input-placeholder {
    font-weight: bold;
  }

  ::-moz-placeholder {
    font-weight: bold;
  }

  ::-ms-input-placeholder {
    font-weight: bold;
  } 

  ::-o-input-placeholder {
    font-weight: bold;
  } 
</style>