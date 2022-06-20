<script>
import WhatsAppIcon from "./icons/WhatsAppIcon.svelte"; 
import InstagramIcon from "./icons/InstagramIcon.svelte";
import MailIcon from "./icons/MailIcon.svelte";
import SmsIcon from "./icons/SmsIcon.svelte";
import CopyLinkIcon from "./icons/CopyLinkIcon.svelte";

export let open
export let title
let shareTextWhatsapp
let shareTextEmail
let copyPageLink
let captureScreen


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
            class="
                    p-1">
            <div class="flex flex-row flex-nowrap justify-between">
                <a
                    href={"whatsapp://send?text=" + shareTextWhatsapp}
                    data-action="share/whatsapp/share"
                    class="stroke-primary fill-primary">
                    <WhatsAppIcon />
                </a>
                <button
                    on:click={captureScreen}
                    class="stroke-primary fill-primary">
                    <InstagramIcon />
                </button>
                <a
                    href={"mailto:?subject=Read this story on The Reading Room&body=" +
                        shareTextEmail}
                    class="stroke-primary fill-primary">
                    <MailIcon />
                </a>
                <a
                    href={"sms:?body=" + shareTextEmail}
                    class="stroke-primary fill-primary">
                    <SmsIcon />
                </a>
                <a
                    href={window.location.href}
                    on:click={copyPageLink}
                    class="stroke-primary fill-primary">
                    <CopyLinkIcon />
                </a>
            </div>
        </div>
    </div>
</div>
{/if}