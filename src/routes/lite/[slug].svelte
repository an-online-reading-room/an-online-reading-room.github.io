<script lang="ts" context="module">
    import type { Load } from "@sveltejs/kit";
    import qs from "qs";

    export const load: Load = async ({ params, fetch, session, stuff }) => {
        const query = qs.stringify(
            {
                filters: {
                    slug: { $eq: params.slug },
                },
                populate: ["targetLinks"],
            },
            {
                encodeValuesOnly: true,
            }
        );

        let res = await api.get(`api/stories?${query}`, get(user).jwt);
        const story = res[0];

        const randomSlugQuery = qs.stringify(
            {
                fields: ["slug"],
            },
            {
                encodeValuesOnly: true,
            }
        );
        let res2 = await api.get(
            `api/stories?${randomSlugQuery}`,
            get(user).jwt
        );
        let nextData = res2;

        let next = nextData[Math.floor(Math.random() * nextData.length)];
        // console.log(nextData)
        // console.log(story)
        while (next.id === story.id) {
            next = nextData[Math.floor(Math.random() * nextData.length)];
            console.log(next);
        }

        return {
            props: {
                story: story,
                next: next,
            },
        };
    };
</script>

<script>
import TopNav from '$components/navigation/TopNav.svelte';
import Story from '$components/Story.svelte';
import ShareCard from '$components/ShareCard.svelte';
import Footer from '$components/Footer.svelte';
import user from '$stores/user';
import * as api from "$lib/api"
import ShareIcon from '$components/icons/ShareIcon.svelte';
import BookmarkIcon from '$components/icons/BookmarkIcon.svelte';
import { get } from 'svelte/store';
import { insertVisit } from '$lib/api/lite'
import mapStore from '$stores/mapStore';
import { afterNavigate } from '$app/navigation';

    export let story
    export let next

    let openShareCard = false
    let isBookmarked = false;

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

    const getBookmarks = async () => {
        const res = await api.get(`api/users/bookmarks?id=${story.id}`,$user.jwt)
        if (res.bookmarked)
            isBookmarked = true;
    }

    const bookmarkstory = async () => {
        if ($user.jwt) {
            if (isBookmarked) {
                const res = await api.put(`api/users/bookmarks`,
                { 
                    operation : "remove",
                    data : { 
                            "id" : story.id
                    }
                },$user.jwt)
            } else {
                const res = await api.put(`api/users/bookmarks`,
                { 
                    operation : "add",
                    data : { 
                            "id" : story.id
                    }
                },$user.jwt)

            }
            isBookmarked = !isBookmarked;
        } else {

        }
    }
    afterNavigate((navigation) => {
        addVisit(story.id)
    })

    if($user.jwt) {
        getBookmarks()
    }
</script>

<TopNav back="/lite" next="/lite/{next.slug}" />

<div class="px-8 overflow-y-scroll">
    <article class="flex flex-col gap-y-3 py-2 text-left">
        <hgroup class="flex flex-col gap-y-1">
            <h3 class="font-display font-bold text-xxs uppercase text-accent">
                {formatDate(story.publishedAt)}
            </h3>
            <h1 class="font-display font-bold text-4xl">{story.title}</h1>
            <h2 class="font-display font-normal text-xs">{story.location}</h2>
        </hgroup>

        <Story {story} isLite={true} />
    </article>
</div>

<Footer>
    <button on:click={bookmarkstory} class="stroke-current w-6 h-6">
        <BookmarkIcon filled={isBookmarked} />
    </button>
    
    <button class="stroke-current w-6 h-6" on:click={() => openShareCard = !openShareCard}>
        <ShareIcon open={openShareCard}/>
    </button>
</Footer>

<ShareCard 
title="Share this story" 
open={openShareCard} 
on:shareend={() => openShareCard = false}
getShareInfo={() => {
    return {
        text: `${$user.username} has shared with you a story on The Reading Room. Click to read more: ${window.location.href}`,
        link: `${window.location.href}`
    }
}} />
