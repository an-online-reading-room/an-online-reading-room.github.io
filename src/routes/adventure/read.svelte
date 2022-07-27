<script context="module">


  export async function load({ url, session }) {

    let data = null
    let pointA = null

    if(url.searchParams.has('story')) {
      const query = qs.stringify({
        filters: {
            slug: { $eq: url.searchParams.get('story') }
        },
        populate: {
            user: {
                fields: ['username']
            }
        }
    }, {
        encodeValuesOnly: true
    })  

    const story = await api.get(
        `api/stories?${query}`,
        get(user).jwt
    )
    data = story[0]
    pointA = {
        slug: url.searchParams.get('story'),
        location: data.location
    }

    } else {
      
        const randomSlug = (await api.get(
            'api/stories/random',
            get(user).jwt
        )).slug

        const query = qs.stringify({
            filters: {
                slug: { $eq: randomSlug }
            },
            populate: {
                user: {
                    fields: ['username']
                }
            }
        }, {
            encodeValuesOnly: true
        })
      
      const story = await api.get(
        `api/stories?${query}`,
        get(user).jwt
      )
      data = story[0]

      pointA = {
        slug: story.slug,
        location: story.location
      }

    }

    session.pointA = pointA
    console.log(data)

    return {
      status: 200,
      props: { story: data }
    }

  }

</script>

<script>
import Story from "$components/Story.svelte";
import Linker from "$components/Linker.svelte";
import Footer from "$components/Footer.svelte";
import LinkIcon from "$components/icons/LinkIcon.svelte";
import ShareIcon from "$components/icons/ShareIcon.svelte";
import Modal from "$components/Modal.svelte";
import ShareCard from "$components/ShareCard.svelte";
import user from "$stores/user";
import modalStore from '$stores/modal';

import { insertVisit } from '$lib/api/lite'
import mapStore from '$stores/mapStore';

import { afterNavigate } from '$app/navigation';
import { get } from "svelte/store";
import * as api from '$lib/api'
import qs from 'qs'
import InfoIcon from "$components/icons/InfoIcon.svelte";
import InfoCard from "$components/InfoCard.svelte";

export let story
let linkingMode = false
let openShareCard = false
let openInfoCard = false
let infoModal = $modalStore.adventure

let linkingModal = false
let loginModal = false

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

const toggleLinkingMode = () => {
    if($user.jwt) {
        linkingMode = !linkingMode
        if($modalStore.linkingModal === false) {
            linkingModal = true
            modalStore.set('linkingModal')
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

const currentMap = $mapStore.id
const addVisit = async (story) => {
    const newVisit = await insertVisit(currentMap, story)
    
    // add visit to mapStore 
    mapStore.update(value => {  
        const updatedVisits = value.visits.includes(newVisit.id)
            ? value.visits
            : [...value.visits, newVisit.id] 
        const updatedStories = value.stories.includes(story) 
            ? value.stories
            : [...value.stories, story]

        return {
            id: value.id,
            visits: updatedVisits,
            stories: updatedStories
        }
    })
    console.log(`you just visited story ${story} with visit id ${newVisit.id}`)
}

afterNavigate((navigation) => {
    addVisit(story.id)
})


</script>

<div class="px-8 overflow-y-scroll pb-20">
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
        <Story {story} isLite={false}>

        </Story>
        {/if}

    </article>
</div>


<Footer>
    <button class="stroke-current w-6 h-6" on:click={() => {openInfoCard = !openInfoCard; openShareCard = false}}>
        <InfoIcon open={openInfoCard}/>
    </button>
    
    <button class="stroke-current w-6 h-6" on:click={toggleLinkingMode}>
        <LinkIcon open={linkingMode}/>
    </button>
    <button class="stroke-current w-6 h-6" on:click={() => {openShareCard = !openShareCard; openInfoCard = false}}>
        <ShareIcon open={openShareCard}/>
    </button>
</Footer>

<Modal isOpenModal={infoModal} on:closeModal={() => infoModal = false} name="Welcome to the adventure version">
    <div class="px-4">
        <p class="font-bold">Welcome to the adventure version!</p>
        <p>Explore places through stories, navigate through hyperlinks, and create maps of your own. Read more about the version in the <a class="underline" href="/about/faq"><span class="font-bold">FAQ</span></a>.</p>
    </div>
</Modal>

<Modal isOpenModal={linkingModal} name="linkingModal" on:closeModal={() => linkingModal = false}>
    <div class="px-4">
        <p class="font-bold">Link a story</p>
        <p><span class="font-bold">Long press</span> to <span class="font-bold">highlight</span> and hyperlink text to another story. They are saved in your reading list (menu > reading list > hyperlinks).</p>
    </div>
</Modal>

<Modal isOpenModal={loginModal} name="loginModal" on:closeModal={() => loginModal = false}>
    <div class="px-4">
        <p class="font-bold mb-2">Link a story</p>
        <p>
            Please <a class="font-bold underline" href="/auth/login"
                >log in</a> to use this feature.
        </p>
    </div>
</Modal>

<ShareCard title="Share this story" open={openShareCard} getShareInfo={() => {
    return {
        text: `${$user.username} has shared with you a story on The Reading Room. Click to read more: ${window.location.href}`,
        link: `${window.location.href}`
    }
}} />
<InfoCard info={story} open={openInfoCard}/>
