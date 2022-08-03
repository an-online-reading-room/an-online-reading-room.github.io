<script>
  import { afterUpdate, onMount } from 'svelte';
  import ShareCard from '$components/ShareCard.svelte'
  import Footer from '$components/Footer.svelte';
import ShareIcon from '$components/icons/ShareIcon.svelte';
import { getVisitedStories, saveMap } from '$lib/api/lite'  
import LiteMap from '$components/LiteMap.svelte';
import Modal from '$components/Modal.svelte';
import AddIcon from '$components/icons/AddIcon.svelte';
import mapStore from '$stores/mapStore';
import { variables } from '$lib/variables';
import user from '$stores/user';


  let travelledDistance = 0
  let openShareCard = false
  let openInfoModal = false, openTitleModal = true, openNewMapModal = false
  let mapForm 

  let stories = []
  
  onMount(async () => {
    setTimeout(() => {
      // make info modal hidden 
      openInfoModal = false
      openTitleModal = true
    }, 5000)
    
    stories = await getVisitedStories()
    console.log("mounting map page")
    console.log(stories)
  })


  const saveMapToShare = async (event) => {
    const title = mapForm.elements['title'].value

    const newMap = await saveMap(true, title)
    console.log("updated ", newMap)

    const shareText = `${$user.username} has shared with you a map they created at The Reading Room. Click the link to view and follow their trail: ${variables.site_url}/map/${newMap.slug}?shared`
    const shareLink = `${variables.site_url}/map/${newMap.slug}?shared`
    return {
      text: shareText,
      link: shareLink
    }
  }

  const checkMapFormValidity = () => {
    const valid = mapForm.reportValidity()
    if(!valid) return
    
    openShareCard = !openShareCard
  } 

  const saveCurrentMap = async () => {
    const savedMap = await saveMap(false)

    openNewMapModal = false

    mapStore.update(value => {
      return {
        id: value.id,
        visits: [],
        stories: []
      }
    })

    history.go(0)
  }

</script>

{#if stories.length >= 0}
<LiteMap {stories} on:distcalcend={(ev) => travelledDistance = ev.detail.value} />
{/if}

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
      <form bind:this={mapForm} id="map-form" class="flex justify-between">
        <input 
          required
          class="w-full placeholder-black font-bold focus:outline-none" 
          type="text" name="title" id="title" placeholder="Enter a map title">

        <button class="w-4 h-4" on:click|preventDefault={() => openNewMapModal = true}>
          <AddIcon />
        </button>
      </form>
    </div>
  </div>


</section>

<Footer>
  <p>You have travelled {travelledDistance}km on your journey</p>
  <div class="h-6 w-6 ml-auto cursor-pointer stroke-primary" on:click={checkMapFormValidity}>
    <ShareIcon open={openShareCard} />
  </div>
</Footer>

<ShareCard 
  open={openShareCard} 
  title="Share this story map"
  getShareInfo={saveMapToShare}
  on:shareend={() => openShareCard = false}
/>

<Modal 
  name="Make a new map" 
  isOpenModal={openNewMapModal}
  on:closeModal={(e) => openNewMapModal = e.detail.isOpenModal}>
  <div class="px-4">
    <p>Your current map will be saved to your reading list if you are logged in.</p>
    <p>A new map will contain no read stories - tread carefully this time!</p>
    <div class="flex justify-evenly">
      <button
        class="bg-primary text-black py-2 px-4"
        on:click={saveCurrentMap}>
        Yes
      </button>
      <button class="bg-primary text-black py-2 px-4">No</button>
    </div>
  </div>
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