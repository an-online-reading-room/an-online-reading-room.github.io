<script>
import { afterNavigate, goto } from '$app/navigation'

export let back;
export let next;

afterNavigate((navigation) => {
    if(navigation.from != null && back === '') {
        console.log("navigating")
        back = navigation.from.pathname
    }
})
</script>

<div class="flex h-9 border-y border-contrast text-contrast px-6 justify-between">
    {#if back != null}
    <button on:click={() => goto(back)} class="navBtn">
        <svg
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.14762 0.608459L1.41016 5.34534L6.14762 10.0828"
                stroke="black" />
        </svg>
        Back
    </button>
    {/if}
    {#if next}
    <button on:click={() => goto(next)} class="navBtn">
        Next
        <svg
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.00081 10.0825L5.73828 5.34563L1.00081 0.608165"
                stroke="black" />
        </svg>
    </button>
    {/if}
</div>

<style lang="postcss">
    .navBtn {
        @apply flex gap-x-1 items-center font-text text-sm underline;
    }
</style>
