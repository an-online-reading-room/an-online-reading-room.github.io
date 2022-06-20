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
import ShareIcon from '$components/icons/ShareIcon.svelte';
import LinkIcon from '$components/icons/LinkIcon.svelte';
import BookmarkIcon from '$components/icons/BookmarkIcon.svelte';

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
        <BookmarkIcon />
    </button>
    
    <button class="stroke-current w-6 h-6" on:click={enableLinkingMode}>
        <LinkIcon />
    </button>
    <button class="stroke-current w-6 h-6" on:click={() => openShareCard = !openShareCard}>
        <ShareIcon />
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