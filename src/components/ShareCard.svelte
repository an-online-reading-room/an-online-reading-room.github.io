<script>
import WhatsAppIcon from "./icons/WhatsAppIcon.svelte"; 
import InstagramIcon from "./icons/InstagramIcon.svelte";
import MailIcon from "./icons/MailIcon.svelte";
import SmsIcon from "./icons/SmsIcon.svelte";
import CopyLinkIcon from "./icons/CopyLinkIcon.svelte";
import { createEventDispatcher } from "svelte";

export let open
export let title

const dispatch = createEventDispatcher()

const share = (type) => {
    open = false
    console.log("sharing through ", type)
    dispatch('share', {
        type
    })
}


</script>

{#if open}
<div
    class="z-10 absolute inset-x-0 bottom-12
                bg-accent text-primary text-base
                p-4 px-10">
    <div class="flex flex-col gap-y-3">
        <div
            class="text-left font-text text-sm p-1 ">
            {title}
        </div>
        <div
            class="p-1">
            <div class="flex flex-row flex-nowrap justify-between">
                <button
                    on:click={() => share('whatsapp')}
                    data-action="share/whatsapp/share"
                    class="stroke-primary fill-primary">
                    <WhatsAppIcon />
                </button>
                <button
                    on:click={() => share('instagram')}
                    class="stroke-primary fill-primary">
                    <InstagramIcon />
                </button>
                <button
                    on:click={() => share('email')}
                    class="stroke-primary fill-primary">
                    <MailIcon />
                </button>
                <button
                    on:click={() => share('sms')}
                    class="stroke-primary fill-primary">
                    <SmsIcon />
                </button>
                <button
                    on:click={() => share('copy-link')}
                    class="stroke-primary fill-primary">
                    <CopyLinkIcon />
                </button>
            </div>
        </div>
    </div>
</div>
{/if}