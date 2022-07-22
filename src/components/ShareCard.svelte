<script>
import WhatsAppIcon from "./icons/WhatsAppIcon.svelte"; 
import InstagramIcon from "./icons/InstagramIcon.svelte";
import MailIcon from "./icons/MailIcon.svelte";
import SmsIcon from "./icons/SmsIcon.svelte";
import CopyLinkIcon from "./icons/CopyLinkIcon.svelte";
import { createEventDispatcher } from "svelte";
import { goto } from "$app/navigation";
import InfoBubble from "./InfoBubble.svelte";

export let open
export let title
export let shareInfo = {
    text: "username has shared with you a map they created at The Reading Room. Click the link to view and follow their trail: https://thereadingroom.online/",
    link: "thereadingroom.online" 
}

export let getShareInfo 
const intro = "When was the last time you left your house to explore? The Reading Room is a collaborative placemaking platform to experience your neighbourhood or a stranger’s through other’s eyes."

let openInfoBubble = false

const share = async (type) => {
    open = false
    console.log("sharing through ", type)
    
    shareInfo = await getShareInfo()
    console.log(shareInfo.text)
    console.log(shareInfo.link)

    switch(type) {
        case 'whatsapp':
            shareWhatsApp()
            break
        case 'instagram':
            shareInstagram()
            break
        case 'email':
            shareEmail()
            break
        case 'sms':
            shareSms()
            break
        case 'copy-link':
            shareCopyLink()
            break
        default:
            break
    }
}

const shareWhatsApp = () => {

    const urlEncodedText = encodeURIComponent([shareInfo.text, intro].join('\n\n'))
    const a = document.createElement('a')
    a.href = `https://api.whatsapp.com/send?text=${urlEncodedText}`
    a.target = '_blank'
    a.click()
}

const shareInstagram = () => {

}

const shareEmail = () => {
 
    const urlEncodedText = encodeURIComponent([shareInfo.text, intro].join('\n\n'))
    const emailSubject = "You've got a story!"

    const a = document.createElement('a')
    a.href = `mailto:?subject=${emailSubject}&body=${urlEncodedText}`
    a.target = '_blank'
    a.click()

}

const shareSms = () => {
    
    const urlEncodedText = encodeURIComponent([shareInfo.text, intro].join('\n\n'))

    const a = document.createElement('a')
    a.href = `sms:?body=${urlEncodedText}`
    a.target = '_blank'
    a.click()

}

const shareCopyLink = () => {
    if(!navigator.clipboard) {
        const tempInput = document.createElement('input')
        document.body.appendChild(tempInput)
      
        tempInput.value = shareInfo.link
        tempInput.focus()
        tempInput.select()

        try {
            document.execCommand('copy')
        } catch(err) {
            console.log(err)
        }
        document.body.removeChild(tempInput)
        return
    } 
    
    navigator.clipboard.writeText(shareInfo.link)
    .then(() => {
        openInfoBubble = true
        setTimeout(() => openInfoBubble = false, 500)

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
                <!-- <button
                    on:click={() => share('instagram')}
                    class="stroke-primary fill-primary">
                    <InstagramIcon />
                </button> -->
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

<InfoBubble open={openInfoBubble}/>