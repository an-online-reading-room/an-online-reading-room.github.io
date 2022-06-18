<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit';
    import { variables } from '$lib/variables';
    import { flattenStrapiResponse } from '$lib/utils/api'
    import qs from 'qs'
  
    export const load: Load = async ({ params, fetch, session, stuff }) => {
        const query = qs.stringify({
        filters: {
            slug: {
            $eq: params.slug,
            },
        },
        }, {
        encodeValuesOnly: true,
        });

      const strapiRes = await (await fetch(`${variables.strapi_url}/api/stories?${query}`)).json()
      console.log(strapiRes)

      const data = flattenStrapiResponse(strapiRes)[0]
    //   console.log(data)
      return { props: { story: data } }
        
    };
</script>

<script>
import TopNav from '$components/navigation/TopNav.svelte';
import Linker from '$components/Linker.svelte';
import Modal from '$components/Modal.svelte';
import Story from '$components/Story.svelte';
import ShareCard from '$components/ShareCard.svelte';
import Footer from '$components/Footer.svelte';
import user from '$stores/user';
import modal from '$stores/modal';
import { onDestroy, onMount } from 'svelte';
import * as api from "$lib/api"

    export let story
    let editor
    let linkingMode = false
    let openShareCard = false

    let modalStore 
    const modalStoreUnsubscribe = modal.subscribe(value => modalStore = value)
   
    let linkingModal = false
	let loginModal = false

    onDestroy(() => modalStoreUnsubscribe)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate()
        const suffix = (day >= 4 &&  day <= 20) || (day >= 24 && day <= 30)
        ? "th"
        : ["st", "nd", "rd"][day % 10 - 1];
        const month = date.toLocaleDateString('en-US', {month: "long"})
        const year = date.getFullYear()
        return `${day}${suffix} ${month} ${year}`
    }

    const enableLinkingMode = () => {
        if($user.jwt) {
            linkingMode = true
            if(modalStore.linkingModal === false) {
                linkingModal = true
                modal.set('linkingModal')
            }
        } else {
            loginModal = true
        }
    }

    const saveLink = async (event) => {
        
        const data = {
            data: event.detail
        }
        const res = await api.post(`api/links`, data, $user.jwt)
        
        linkingMode = false
    }

    onMount(async () => {
    })
</script>


    
<TopNav back="/lite" next="/lite"></TopNav>

<div class="px-8 overflow-y-scroll">
    <article class="flex flex-col gap-y-3 py-2 text-left">
        <hgroup class="flex flex-col gap-y-1">
            <h3 class="font-display font-bold text-xxs uppercase text-accent">{formatDate(story.publishedAt)}</h3>
            <h1 class="font-display font-bold text-4xl">{story.title}</h1>
            <h2 class="font-display font-normal text-xs">{story.location}</h2>
        </hgroup>
    
        {#if linkingMode}
        <Linker {story} on:linkend={saveLink}>
            
        </Linker>
        {:else}
        <Story {story}>

        </Story>
        {/if}

    </article>
</div>


<Footer>
    <button class="stroke-current w-6 h-6">
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9.25" transform="rotate(-180 10 10)" stroke-width="1.5"/>
        <path d="M13.3011 5.13508H6.80695C6.42171 5.13508 6.10938 5.44741 6.10938 5.83265V14.1675C6.10938 14.4324 6.25946 14.6745 6.49684 14.7923C6.73424 14.9103 7.01785 14.8836 7.2289 14.7229L10.0542 12.5777L12.879 14.7231C13.0029 14.8172 13.1515 14.8652 13.301 14.8652C13.4067 14.8652 13.5129 14.8413 13.6111 14.7924C13.8485 14.6746 13.9986 14.4325 13.9986 14.1676V5.83258C13.9988 5.44727 13.6864 5.13508 13.3011 5.13508ZM12.7214 12.8791L10.476 11.2681C10.2265 11.0785 9.88168 11.0785 9.63232 11.2681L7.38592 12.8791V6.41114H12.7214V12.8791Z" fill="#EEE2D2"/>
        </svg>
    </button>
    
    <button class="stroke-current w-6 h-6" on:click={enableLinkingMode}>
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9.25" transform="rotate(-180 10 10)" stroke-width="1.5"/>
        <path d="M11.0423 9.99529C10.823 9.77598 10.4663 9.77598 10.247 9.99529C9.58905 10.6532 8.51681 10.6532 7.85878 9.99529L5.8694 8.00591C5.55039 7.6869 5.37537 7.26376 5.37537 6.81184C5.37537 6.35992 5.55038 5.93678 5.8694 5.61777C6.52735 4.95982 7.59736 4.95982 8.25761 5.61777L9.48048 6.84064C9.6998 7.05996 10.0565 7.05996 10.2758 6.84064C10.4951 6.62132 10.4951 6.26464 10.2758 6.04532L9.05293 4.82245C7.95633 3.72585 6.1707 3.72585 5.07412 4.82245C4.54244 5.35414 4.25 6.05861 4.25 6.81184C4.25 7.56284 4.54244 8.26954 5.07412 8.80122L7.0635 10.7906C7.61291 11.3378 8.3329 11.6125 9.05289 11.6125C9.77288 11.6125 10.4929 11.3378 11.0423 10.7906C11.2616 10.5713 11.2616 10.2146 11.0423 9.99529H11.0423Z" fill="#EEE2D2"/>
        <path d="M14.6835 10.4493L12.6941 8.4599C11.5975 7.3633 9.81185 7.3633 8.71527 8.4599C8.49595 8.67922 8.49595 9.0359 8.71527 9.25522C8.93459 9.47454 9.29127 9.47454 9.51059 9.25522C10.1685 8.59727 11.2385 8.59727 11.8988 9.25522L13.8882 11.2446C14.2072 11.5636 14.3822 11.9868 14.3822 12.4387C14.3822 12.8906 14.2072 13.3137 13.8882 13.6327C13.2502 14.2708 12.1381 14.2708 11.5 13.6327L10.2793 12.4099C10.06 12.1906 9.70331 12.1906 9.48399 12.4099C9.26467 12.6292 9.26467 12.9859 9.48399 13.2052L10.7069 14.4259C11.2385 14.9575 11.9452 15.25 12.6962 15.25C13.4472 15.25 14.154 14.9575 14.6856 14.4259C15.2173 13.8942 15.5098 13.1875 15.5098 12.4365C15.5075 11.6855 15.2151 10.981 14.6834 10.4493L14.6835 10.4493Z" fill="#EEE2D2"/>
        </svg>
    </button>
    <button class="stroke-current w-6 h-6" on:click={() => openShareCard = !openShareCard}>
        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="9.4" transform="rotate(-180 10 10)" stroke-width="1.2"/>
        <path d="M12.0185 5.5C11.2037 5.5 10.537 6.16676 10.537 6.98152C10.537 7.1479 10.5645 7.3088 10.6157 7.45833L8.07867 9.10655C7.80697 8.80508 7.41656 8.61111 6.98137 8.61111C6.16661 8.61111 5.49985 9.27787 5.49985 10.0926C5.49985 10.9074 6.16661 11.5741 6.98137 11.5741C7.41831 11.5741 7.81141 11.3823 8.08319 11.0787L10.6157 12.7269C10.5636 12.8777 10.537 13.0359 10.537 13.2037C10.537 14.0185 11.2037 14.6853 12.0185 14.6853C12.8332 14.6853 13.5 14.0185 13.5 13.2037C13.5 12.389 12.8332 11.7222 12.0185 11.7222C11.5833 11.7222 11.193 11.9162 10.9212 12.2177L8.38414 10.5694C8.43529 10.4198 8.46288 10.2589 8.46288 10.0926C8.46288 9.9248 8.43622 9.76659 8.38414 9.61582L10.9167 7.9676C11.1884 8.27123 11.5816 8.46304 12.0185 8.46304C12.8332 8.46304 13.5 7.79627 13.5 6.98152C13.5 6.16676 12.8332 5.5 12.0185 5.5Z" fill="#EEE2D2"/>
        </svg>
    </button>
</Footer>


<Modal isOpenModal={linkingModal} name="linkingModal" on:closeModal={() => linkingModal = false}>
    <p class="font-bold">Link a story</p>
    <p><span class="font-bold">Long press</span> to <span class="font-bold">highlight</span> and hyperlink text to another story. If the story doesn’t exist yet, head over to our storyteller section so you can add it in.</p>
</Modal>

<Modal isOpenModal={loginModal} name="loginModal">
    <p class="font-bold mb-2">Tell us your story!</p>
    <p>
        Please <a class="font-bold underline" href="/auth/login"
            >log in</a> to use this feature.
    </p>
    <p>Worried about what story to share? Check out our prompts.</p>
</Modal>

<ShareCard title="Share this story" open={openShareCard}></ShareCard>