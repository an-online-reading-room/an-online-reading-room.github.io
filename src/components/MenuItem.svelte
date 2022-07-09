<script>
import { createEventDispatcher } from "svelte";
import BackIcon from "./icons/BackIcon.svelte";
import CloseIcon from "./icons/CloseIcon.svelte";



export let open
export let openMenu
export let name
export let inHeader = true

const dispatch = createEventDispatcher()

const closeMe = () => {
  open = !open
  dispatch('hide')
}

const closeMenu = () => {
  openMenu = !openMenu
  dispatch('hideMenu')
}

</script>

<div
    class="absolute inset-0 w-screen h-full
                  bg-accent text-menu-accent text-left
                  py-6 px-6 z-50 overflow-y-scroll
                  flex flex-col gap-y-6">
    <div class="flex flex-row justify-between gap-x-2">
        <h1 class="font-medium text-2xl self-center">{name}</h1>
        {#if inHeader}
        <button
            class="w-10 h-10 focus:outline-none stroke-menu-accent ml-auto"
            on:click={closeMe}>
            <BackIcon />
        </button>
        {/if}

        {#if inHeader}
        <button
            class="w-10 h-10 focus:outline-none stroke-menu-accent"
            on:click={closeMenu}>
            <CloseIcon />
        </button>
        {/if}
    </div>

    <div
        class="flex flex-col gap-y-6
                      font-display text-sm leading-4">
        <main class="flex flex-col gap-y-4">
            <slot></slot>
        </main>
    </div>
</div>
