<script>
import { goto } from "$app/navigation";
import { page } from "$app/stores"
import { onMount } from "svelte";
import qs from 'qs'
import * as api from '$lib/api'
import user from "$stores/user";
import LiteMap from "$components/LiteMap.svelte";
import Footer from "$components/Footer.svelte";

const slug = $page.params.slug
let map 
let stories 
let username 
let openInfoModal = true
let distanceTravelled 

onMount(async () => {
  const mapQuery = qs.stringify({
    filters: {
      slug: { $eq: slug }
    },  
    populate: {
      visits: {
        populate: {
          story: {
            populate: {
              user: {
                fields: ['username']
              }
            },
          }
        }
      },
      user: {
        fields: ['username']
      }
    },

  }, {
    encodeValuesOnly: true
  })

  const res = await api.get(
    `api/maps?${mapQuery}`,
    $user.jwt
  )
  console.log(res)

  username = res[0].user.username
  map = res[0]
  stories = res[0].visits.map(visit => {
    let story = visit.story
    console.log(story)
    console.log(story.user)

    return {
      title: story.title,
      slug: story.slug, 
      location: story.location,
      user: {
        username: story.user.username
      }
    }
  })

  console.log(stories)
  
})
 
  
</script>


{#if stories}
<LiteMap {stories} on:distcalcend={(event) => distanceTravelled = event.detail.value} />
{/if}

{#if username}
<section 
  class="absolute top-20 left-0
  py-4 px-8 z-20">

  <div 
    id="info-modal"
    class={openInfoModal ? "" : "hidden"}>
    <div 
      class="py-6 px-4 bg-white rounded font-text font-bold text-black text-base leading-4 text-left">
      <p>{username} has shared with you their trail of stories. Click on the pins to explore them.</p>
    </div>
  </div>
</section>
{/if}

<Footer>
  <p>Travel {distanceTravelled} kms on your journey!</p>
</Footer>