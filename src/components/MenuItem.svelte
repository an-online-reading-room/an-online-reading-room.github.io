<script>
import { createEventDispatcher } from "svelte";



export let open
export let openMenu
export let name

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
        <button
            class="w-10 h-10 focus:outline-none stroke-menu-accent ml-auto"
            on:click={closeMe}>
            <svg
                class="stroke-current"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19.25" stroke-width="1.5" />
                <path
                    d="M15 20L24.9485 12"
                    stroke-width="1.5"
                    stroke-linecap="round" />
                <path
                    d="M15.0518 20L25.0002 28"
                    stroke-width="1.5"
                    stroke-linecap="round" />
            </svg>
        </button>

        <button
            class="w-10 h-10 focus:outline-none stroke-menu-accent"
            on:click={closeMenu}>
            <svg
                class="stroke-current"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19.25" stroke-width="1.5" />
                <path
                    d="M14 25.3137L25.3137 14"
                    stroke-width="1.5"
                    stroke-linecap="round" />
                <path
                    d="M14.3433 14.3431L25.657 25.6568"
                    stroke-width="1.5"
                    stroke-linecap="round" />
                <path
                    d="M14 25.3137L25.3137 14"
                    stroke-width="1.5"
                    stroke-linecap="round" />
            </svg>
        </button>
    </div>

    <div
        class="flex flex-col gap-y-6
                      font-display text-sm leading-4">
        <main class="flex flex-col gap-y-4">
            <slot></slot>
        </main>
    </div>
</div>
