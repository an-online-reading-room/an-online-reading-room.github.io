<script>
	import storyList from "$stores/storyList";
	import List from "$components/List.svelte";
	import Modal from "$components/Modal.svelte";
	import modal from "$stores/modal";
import { onDestroy } from "svelte";

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
	

</script>

<List listStore={storyList}></List>


<Modal isOpenModal={!isOpenModal} name="lite" on:closeModal={() => {isOpenModal = false; markVisited()}}>
	<p class="font-bold text-base mb-4">Welcome to the lite version!</p>
	<p class="text-base leading-[18px]">Find stories in your location, and travel across states and countries. Find your map in the top right corner</p>
</Modal>
