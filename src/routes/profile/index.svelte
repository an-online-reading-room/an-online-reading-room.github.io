<script>
    import Footer from "$components/Footer.svelte";
    import ShareIcon from "$components/icons/ShareIcon.svelte";
    import LinkIcon from "$components/icons/LinkIcon.svelte";
    import BookmarkIcon from "$components/icons/BookmarkIcon.svelte";
</script>

<div class="flex-column gap-y-2 px-8 py-3.5 pb-12 border-t border-contrast">
    <p class="font-display font-bold text-4xl">Profile</p>
    <button>
        <div class="btn">Edit username</div>
    </button>
    <button>
        <div class="btn">Update Email ID</div>
    </button>
    <button>
        <div class="btn">Logout</div>
    </button>
</div>
<Footer>
    <button class="stroke-current w-6 h-6">
        <BookmarkIcon />
    </button>

    <button class="stroke-current w-6 h-6">
        <LinkIcon />
    </button>
    <button class="stroke-current w-6 h-6">
        <ShareIcon />
    </button>
</Footer>

<style lang="postcss">
    .btn {
        @apply bg-accent text-primary text-sm px-4 py-3 text-left;
    }
</style>
