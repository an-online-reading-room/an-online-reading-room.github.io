<script>
import { goto } from "$app/navigation";

import Footer from "$components/Footer.svelte";
import GenericList from "$components/GenericList.svelte";
import BookmarkIcon from "$components/icons/BookmarkIcon.svelte";
import LinkIcon from "$components/icons/LinkIcon.svelte";
import MapIcon from "$components/icons/MapIcon.svelte";
import ProfileIcon from "$components/icons/ProfileIcon.svelte";
import linkStore from "$stores/profile/linkStore";

const visitLink = (ev) => {
  const source = ev.detail.item.source
  
  goto(`/adventure/read?story=${source.slug}`)
}

const deleteLink = async (ev) => {
  const id = await linkStore.delete(ev.detail.id)

  console.log("deleted link of id: ", id)
}

</script>


<GenericList
listStore={linkStore}
title="Hyperlinks"
filters={['content']}
searchPlaceholder="Search for a story/location/username"
let:item={item}
on:visit={visitLink}
on:delete={deleteLink}
>

  <div class="flex flex-col gap-y-2">
    <h1 class="font-display font-medium text-base">{item.content}</h1>
    <p class="font-text text-sm">From: {item.source.title}</p>
    <p class="font-text text-sm">To: {item.target.title}</p>
  </div>

</GenericList>

<Footer>
  <a href="/profile/bookmarks" class="stroke-current w-6 h-6">
      <BookmarkIcon />
  </a>
  <a href="/profile/maps" class="stroke-current w-6 h-6">
      <MapIcon />
  </a>
  <a href="/profile/links" class="stroke-current w-6 h-6">
      <LinkIcon open={true}/>
  </a>
  <a href="/profile" class="stroke-current w-6 h-6">
      <ProfileIcon />
  </a>
</Footer>