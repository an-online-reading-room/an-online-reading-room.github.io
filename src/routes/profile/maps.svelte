<script>
import Footer from "$components/Footer.svelte";
import GenericList from "$components/GenericList.svelte";
import BookmarkIcon from "$components/icons/BookmarkIcon.svelte";
import LinkIcon from "$components/icons/LinkIcon.svelte";
import MapIcon from "$components/icons/MapIcon.svelte";
import ProfileIcon from "$components/icons/ProfileIcon.svelte";
import mapStore from "$stores/profile/mapStore";


const deleteMap = async (e) => {
  const id = await mapStore.delete(e.detail.id)

  console.log(`deleted map with id: ${id}`)
  console.log(id)

  console.log($mapStore.data)
}


</script>


<GenericList 
listStore={mapStore} 
title="Maps"
filters={['title']}
searchPlaceholder="Search for a map name"
let:item={item}
on:delete={deleteMap}
>
  <div class="flex flex-col gap-y-2">
    <h1 class="text-base font-medium font-display">{item.title}</h1>
    <p class="text-sm">{item.type} version</p>
  </div>
</GenericList>

<Footer>
  <a href="/profile/bookmarks" class="stroke-current w-6 h-6">
      <BookmarkIcon />
  </a>
  <a href="/profile/maps" class="stroke-current w-6 h-6">
      <MapIcon open={true} />
  </a>
  <a href="/profile/links" class="stroke-current w-6 h-6">
      <LinkIcon />
  </a>
  <a href="/profile" class="stroke-current w-6 h-6">
      <ProfileIcon />
  </a>
</Footer>
