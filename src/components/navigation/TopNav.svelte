<script>
    export let back;
    export let next;
</script>

<div class="flex h-9 border-b border-contrast text-contrast px-6 justify-between">
    <a href={back} class="navBtn">
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
    </a>
    <a href={next} class="navBtn">
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
    </a>
</div>

<style lang="postcss">
    .navBtn {
        @apply flex gap-x-1 items-center font-text text-sm underline;
    }
</style>
