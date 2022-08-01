<script>
import { version } from '$stores/version'
import { theme } from '$stores/theme'
import { mode } from '$stores/mode'
import { onDestroy } from 'svelte';
import MenuItem from '$components/MenuItem.svelte';
import { afterNavigate, goto } from '$app/navigation';
import MapIcon from './icons/MapIcon.svelte';
import MenuIcon from './icons/MenuIcon.svelte';
import { page } from '$app/stores'
import user from '$stores/user';
import Modal from './Modal.svelte';


  let openMap = $page.url.pathname === '/lite/map'
  let pathPrefix
  let loginModal = false

  const versionUnsubscribe = version.subscribe(value => {
    pathPrefix = value === 'lite' ? '/adventure/read' : '/'
  })

  const viewMap = () => {
    if($user.jwt) {
      if($page.url.pathname !== '/lite/map') {
        // toggle
        openMap = !openMap
      } 
      if(openMap === true) goto('/lite/map')
    }
    else {
      loginModal = true
    }
  }

  onDestroy(() => versionUnsubscribe)
</script>

<header>
  <div>
    <div class="flex-initial flex flex-row justify-between gap-x-2
                pt-6 pb-4 px-6">

      <a href="{pathPrefix === '/' ? '/' : '/'}" class="self-center">
        <h1 class="text-2xl text-contrast">The Reading Room</h1>
      </a>
      
      <div class="w-10 h-10 focus:outline-none ml-auto text-black">
          <button 
            on:click={viewMap}>
            <MapIcon openHeader={openMap}/>
          </button>
      </div>
      <button class="w-10 h-10 focus:outline-none text-contrast"
              on:click={() => goto("/menu")}>
        <MenuIcon />
      </button>
      
    </div>
  </div>
</header>

<Modal isOpenModal={loginModal} on:closeModal={(e) => loginModal = e.detail.isOpenModal} name="loginModal">
  <div class="px-4">
    <p>
        Please <a class="font-bold underline" href="/auth/login"
            >log in</a> to use this feature.
    </p>
  </div>
</Modal>