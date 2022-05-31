<script>
    import { onMount } from "svelte";
    import { dev } from "$app/env";
    import { getSuggestions } from "$lib/services/geocode";
    import { theme } from "$stores/theme";
    import { user } from "$stores/user.js";
    import TopNav from "$components/TopNav.svelte";
    import Time from "$components/Time.svelte";

    import * as api from "$lib/api.js";
    import "leaflet/dist/leaflet.css";

    //const API_URL = `${variables.strapi_url}/api`;
    //let mediaRefs = [];
    export let prevStoryData;
    console.log(prevStoryData);
    let form, editor;
    let locationInput = prevStoryData ? prevStoryData.attributes.location : "";
    let locationSuggestions = [];
    let uploading = false,
        done = false;
    let preview = false,
        termsCheckbox;

    let story;

    $: {
        getSuggestions(locationInput).then(
            (data) => (locationSuggestions = data)
        );
    }

    async function submitStory() {
        //preview = false;
        uploading = true;

        const formData = new FormData(form);

        const storyData = {
            data: {
                title: formData.get("title"),
                location: formData.get("location"),
                description: formData.get("description"),
                users_permissions_user: $user.id,
            },
        };
        editor.save().then((data) => {
            storyData.data.submission = data;
            let res;
            if (prevStoryData) {
                res = api.put(
                    `api/stories/${prevStoryData.id}`,
                    storyData,
                    $user.jwt
                );
            } else {
                res = api.post("api/stories", storyData, $user.jwt);
            }
            res.then((data) => {
                console.log(data);
                uploading = false;
                done = true;
            });
        });
    }

    async function deleteStory() {
        console.log("deleting ", prevStoryData?.id);
        const res = await api.del(`api/stories/${prevStoryData.id}`, $user.jwt);
        console.log(res);
    }
    onMount(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const ImageTool = (await import("@editorjs/image")).default;
        editor = new EditorJS({
            holder: "editor",
            minHeight: 50,
            placeholder: "Add your story",
            logLevel: "ERROR",
            data: prevStoryData ? prevStoryData.attributes.submission : {},
            tools: {
                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            uploadByFile(file) {
                                const uploadData = new FormData();
                                uploadData.append("files", file, file.name);
                                return api
                                    .post("api/upload", uploadData)
                                    .then((data) => {
                                        return {
                                            success: 1,
                                            file: {
                                                url: dev
                                                    ? "http://0.0.0.0:1337" +
                                                      data[0].url
                                                    : data[0].url,
                                                // any other image data you want to store, such as width, height, color, extension, etc
                                            },
                                        };
                                    });
                            },
                        },
                    },
                },
            },
        });
    });
</script>

<TopNav back="/storyteller" next={null} />

<div class="py-3.5 px-8">
    <Time />

    <form
        bind:this={form}
        on:submit|preventDefault={submitStory}
        enctype="multipart/form-data"
        id="story"
        class="space-y-3">
        <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={prevStoryData ? prevStoryData.attributes.title : ""}
            required
            class="text-3xl font-bold focus:outline-none placeholder:text-contrast" />
        <input
            bind:value={locationInput}
            type="text"
            name="location"
            id="location"
            placeholder="Add Location"
            required
            list="location-suggestions"
            class="text-sm focus:outline-none placeholder:text-contrast" />
        <datalist id="location-suggestions">
            {#each locationSuggestions as suggestion}
                <option value={suggestion}> {suggestion} </option>
            {/each}
        </datalist>

        <textarea
            name="description"
            id="desciption"
            placeholder="Add Summary"
            value={prevStoryData ? prevStoryData.attributes.description : ""}
            maxlength="400"
            required
            class="focus:outline-none placeholder:font-bold placeholder:text-contrast" />
    </form>
    <section class="placeholder:text-contrast" id="editor" />
    <div class="flex flex-col fixed inset-x-0 bottom-0 z-10 bg-primary">
        <label class="self-center my-1 font-text text-contrast text-xs">
            <input
                class="accent-accent w-2.5 h-2.5"
                type="checkbox"
                name="accept"
                form="story"
                required />
            I accept the
            <a class="underline" href="/terms-and-conditions">
                terms and conditions</a>
        </label>
        <div class="flex h-11 bg-accent text-primary">
            <button class="w-1/2" type="submit" form="story">Publish</button>
            <button class="w-1/2" on:click={deleteStory}>Delete</button>
        </div>
    </div>
    {#if uploading}
        <div class="flex-1 flex flex-col justify-center">
            <video src="/img/loading-{$theme}.webm" autoplay loop muted />
        </div>
    {/if}

    {#if done}
        <section
            class="flex-1 flex flex-col justify-center gap-y-6 font-text text-sm text-contrast">
            <p>Thanks for submitting!</p>
            <!--<a href="/stories/{story.url}" class="underline"
                >View your story here</a>-->
        </section>
    {/if}
</div>

<style lang="postcss">
    #story input {
        @apply w-full bg-primary text-contrast cursor-text;
    }
    textarea {
        @apply w-full h-auto bg-primary text-contrast cursor-text;
    }
    :global(.ce-toolbar__plus) {
        @apply rounded-full bg-primary border border-contrast shadow-sm;
    }
    :global(.ce-toolbar__settings-btn) {
        @apply rounded-full bg-primary border border-contrast shadow-sm;
    }
    :global(.ce-paragraph[data-placeholder]:empty::before) {
        @apply text-contrast;
    }
    :global(.cdx-block) {
        @apply text-contrast;
    }
    :global(.cdx-input) {
        @apply text-left text-xs p-0;
    }
</style>
