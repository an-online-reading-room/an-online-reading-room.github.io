<script>
import storyList from "$stores/storyList";
import List from "$components/List.svelte";
import Modal from "$components/Modal.svelte";
import modal from "$stores/modal";
import { insertVisit } from '$lib/api/lite'
import mapStore from "$stores/mapStore";

const checkVisited = () => {
	return $modal.lite
}
const markVisited = () => {
	modal.set('lite')
}
let isOpenModal = checkVisited()

let currentMap = $mapStore.id

const addVisit = async (event) => {
	const story = event.detail.story 
	const newVisit = await insertVisit(currentMap, story)
	
	// add visit to mapStore 
	mapStore.update(value => {
		console.log(value)
		const updatedVisits = [...value.visits, newVisit.id]
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

</script>

<List listStore={storyList} on:visit={addVisit}></List>


<Modal isOpenModal={!isOpenModal} name="lite" on:closeModal={() => {isOpenModal = false; markVisited()}}>
	<p class="font-bold text-base mb-4">Welcome to the lite version!</p>
	<p class="text-base leading-[18px]">Find stories in your location, and travel across states and countries. Find your map in the top right corner</p>
</Modal>
