<script>
import storyList from "$stores/storyList";
import List from "$components/List.svelte";
import Modal from "$components/Modal.svelte";
import modal from "$stores/modal";
import { onMount, onDestroy } from "svelte";
import { getMap, insertVisit } from '$lib/api/lite'
import mapStore from '$stores/map'

let modalStore
const modalStoreUnsubscribe = modal.subscribe(value => modalStore = value)
onDestroy(() => modalStoreUnsubscribe)

const checkVisited = () => {
	return modalStore.lite
}
const markVisited = () => {
	modal.set('lite')
}
let isOpenModal = checkVisited()

let currentMap 
onMount(async () => {
	currentMap = await getMap()
	
	// set current map in store
	mapStore.set(currentMap.id)
})
	
const addVisit = async (event) => {
	const story = event.detail.story 
	console.log(currentMap)
	const visit = await insertVisit(currentMap.id, story)
	console.log(visit)
}

</script>

<List listStore={storyList} on:visit={addVisit}></List>


<Modal isOpenModal={!isOpenModal} name="lite" on:closeModal={() => {isOpenModal = false; markVisited()}}>
	<p class="font-bold text-base mb-4">Welcome to the lite version!</p>
	<p class="text-base leading-[18px]">Find stories in your location, and travel across states and countries. Find your map in the top right corner</p>
</Modal>
