<script context="module">

  export async function load({ params }) {
    const query = qs.stringify({
      filters: {
        slug: { $eq: params.slug }
      },
      populate: ['profile', 'contacts']
    }, {
      encodeValuesOnly: true
    })

    const res = await api.get(
      `api/collaborators?${query}`,
      get(user).jwt
    )

    return {
      status: 200,
      props: { member: res[0] }
    }
    
  }

</script>

<script>
import { goto, afterNavigate } from "$app/navigation";

import MenuItem from "$components/MenuItem.svelte";
import { onMount } from "svelte";
import * as api from '$lib/api'
import user from "$stores/user";
import qs from 'qs'
import { get } from "svelte/store";
import { variables } from "$lib/variables";
import InstagramIcon from "$components/icons/InstagramIcon.svelte";
import MailIcon from "$components/icons/MailIcon.svelte";

export let member 
let open = true
let back = '/mode'

afterNavigate((navigation) => {
  if(navigation.from != null && back != null) {
      back = navigation.from.pathname;
  }
})

onMount(async () => {
  console.log(member)
  console.log(member.bio.replace("&nbsp;", "<br />"))
})

</script>


<MenuItem
  name={member.name}
  {open}
  openMenu={false}
  inHeader={true}
  on:hide={() => goto(back)}
  on:hideMenu={() => goto(back)}>

  <section>
    <img src={`${variables.strapi_url}${member.profile.url}`} alt={member.profile.alternativeText}>
  </section>

  <section class="font-display font-primary text-sm">
    {@html member.bio}
  </section>

  <section>
    <ul class="flex flex-row">
      {#each member.contacts as contact}
      <a href={contact.value} target="_blank">
        <li>
          {#if contact.name === 'instagram'}
          <InstagramIcon />
          {:else if contact.name === 'email'}
          <MailIcon />
          {/if}

        </li>
      </a>

      {/each}
    </ul>
  </section>

</MenuItem>
