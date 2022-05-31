<script>
	import storyList from "$stores/storyList";
	import List from "$components/List.svelte";
	import Modal from "$components/Modal.svelte";
	import { popup } from "$stores/popup";

	const checkVisited = () => {
		return !JSON.parse($popup).lite 
	}
	const markVisited = () => {
		const update = JSON.parse($popup)
		update.lite = true
		popup.set(JSON.stringify(update))
	}
	let isOpenModal = checkVisited()
	

</script>

<List listStore={storyList}></List>


<Modal {isOpenModal} on:closeModal={() => {isOpenModal = false; markVisited()}}>
	<p class="font-bold text-base mb-4">Welcome to the lite version!</p>
	<p class="text-base leading-[18px]">Find stories in your location, and travel across states and countries. Find your map in the top right corner</p>
</Modal>
