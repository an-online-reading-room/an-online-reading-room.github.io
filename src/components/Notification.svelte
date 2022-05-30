<script>
    export let show;
    export let close;
    export let title;
</script>

{#if show}
    <dialog open on:click={close}>
        <section>
            <header>
                <strong>
                    {title}
                </strong>
                <button on:click={close}> Close </button>
            </header>

            <div>
                <slot />
            </div>
        </section>
    </dialog>
{/if}
