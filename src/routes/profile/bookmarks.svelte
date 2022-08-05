<script>
import Footer from "$components/Footer.svelte";
import BookmarkIcon from "$components/icons/BookmarkIcon.svelte";
import MapIcon from "$components/icons/MapIcon.svelte";
import LinkIcon from "$components/icons/LinkIcon.svelte";
import ProfileIcon from "$components/icons/ProfileIcon.svelte";
import GenericList from "$components/GenericList.svelte";
import bookmarkStore from "$stores/profile/bookmarkStore";
import { goto } from "$app/navigation";
    
const deleteBookmark = async (ev) => {
    const id = await bookmarkStore.delete(ev.detail.id)

    console.log("deleted link of id: ", id)   
}

const visitBookmark = (ev) => {
    const slug = ev.detail.item.slug

    goto(`/lite/${slug}`)
}
</script>

<GenericList
listStore={bookmarkStore}
title="Bookmarks"
filters={['title', 'location']}
searchPlaceholder="Search for a story/location"
let:item={item}
on:visit={visitBookmark}
on:delete={deleteBookmark}
>

  <div class="flex flex-col gap-y-2">
    <h1 class="font-display font-medium text-base">{item.title}</h1>
    <p class="font-text text-sm">{item.location}</p>
    <p class="font-text text-sm">{item.description}</p>
  </div>

</GenericList>

<Footer>
    <a href="/profile/bookmarks" class="stroke-current w-6 h-6">
        <BookmarkIcon open={true} />
    </a>
    <a href="/profile/maps" class="stroke-current w-6 h-6">
        <MapIcon />
    </a>
    <a href="/profile/links" class="stroke-current w-6 h-6">
        <LinkIcon />
    </a>
    <a href="/profile" class="stroke-current w-6 h-6">
        <ProfileIcon />
    </a>
  </Footer>