<script>
import storyList from "$stores/storyList";
import List from "$components/List.svelte";
import Modal from "$components/Modal.svelte";
import modal from "$stores/modal";
import { insertVisit } from '$lib/api/lite'
import mapStore from "$stores/mapStore";
import GenericList from "$components/GenericList.svelte";

const checkVisited = () => {
	return $modal.lite
}
const markVisited = () => {
	modal.set('lite')
}
let isOpenModal = checkVisited()

</script>

<List listStore={storyList}></List>


<Modal isOpenModal={!isOpenModal} name="lite" on:closeModal={() => {isOpenModal = false; markVisited()}}>
	<div class="px-4">
		<p class="font-bold text-base mb-4">Welcome to the lite version!</p>
		<p class="text-base leading-[18px]">Find stories in your location, and travel across states and countries. Find your map in the top right corner</p>
	</div>
</Modal>
