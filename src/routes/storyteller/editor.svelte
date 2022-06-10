<script>
    import { onDestroy, onMount } from "svelte";
    import { dev } from "$app/env";
    import { getSuggestions } from "../../services/geocode";
    import { user } from "$stores/user.js";
    import TopNav from "$components/navigation/TopNav.svelte";
    import Time from "$components/utils/Time.svelte";
    import AutosaveTime from "$components/utils/AutosaveTime.svelte";

    import Modal from "$components/utils/Modal.svelte";

    import * as api from "$lib/api.js";
    import "leaflet/dist/leaflet.css";

    export let prevStoryData;
    export let draft;
    export let form;
    //console.log(prevStoryData);
    console.log(form)
    let isOpenModal = false;
    let autosave_newStoryCreated = false;
    let autosave_newStoryId;
    let currTime;

    let editor;
    let locationInput = form.location;
    let locationSuggestions = [];

    $: {
        getSuggestions(locationInput).then(
            (data) => (locationSuggestions = data)
        );
    }

    async function submitStory() {
        const storyData = getStoryData();

        console.log(storyData)
        editor.save().then((data) => {
            storyData.data.submission = data;
            let res;
            storyData.data.publishedAt = new Date().toISOString();
            if (prevStoryData) {
                res = api.put(
                    `api/stories/${prevStoryData.id}`,
                    storyData,
                    $user.jwt
                );
            } else {
                res = api.post("api/stories", storyData, $user.jwt);
            }

            //Catch errors here if story not submitted
            res.then((data) => {
                console.log(data);
                isOpenModal = true;
            });
        });
    }

    async function autosaveDraft() {
        let storyData = getStoryData();

        editor.save().then(async (data) => {
            if (prevStoryData) {
                storyData.data.draft = data;
                storyData.data.draft.form = {
                    description: form.description,
                    title: form.title,
                    location: locationInput,
                };

                console.log("Autosaving previusly existing");
                currTime = Date.now();
                api.put(
                    `api/stories/${prevStoryData.id}`,
                    storyData,
                    $user.jwt
                );
            } else {
                storyData.data.submission = data;
                storyData.data.publishedAt = null;

                if (!autosave_newStoryCreated) {
                    const res = await api.post(
                        "api/stories",
                        storyData,
                        $user.jwt
                    );
                    autosave_newStoryCreated = true;
                    console.log("Autosaving newly existing");

                    console.log(res);
                    currTime = Date.now();
                    autosave_newStoryId = res.data.id;
                } else {
                    console.log("Autosaving newly existing");

                    const res = await api.put(
                        `api/stories/${autosave_newStoryId}`,
                        storyData,
                        $user.jwt
                    );
                    currTime = Date.now();
                }
            }
        });
    }

    function getStoryData() {
        const storyData = {
            data: {
                title: form.title,
                location: locationInput,
                description: form.description,
                users_permissions_user: $user.id,
            },
        };
        return storyData;
    }

    async function clearStory() {
        editor.clear();
        form.title = "";
        form.location = "";
        form.description = "";
    }

    onMount(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const ImageTool = (await import("@editorjs/image")).default;
        editor = new EditorJS({
            holder: "editor",
            minHeight: 120,
            placeholder: "Add your story",
            logLevel: "ERROR",
            data: prevStoryData
                ? prevStoryData.attributes.draft ??
                  prevStoryData.attributes.submission
                : {},
            tools: {
                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            uploadByFile(file) {
                                const uploadData = new FormData();
                                uploadData.append("files", file, file.name);
                                return api
                                    .post("api/upload", uploadData, $user.jwt)
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

    let autosaveFn;
    onMount(() => {
        autosaveFn = setInterval(autosaveDraft, 5000);
    });

    onDestroy(() => {
        clearInterval(autosaveFn);
    });
</script>

<div class="overflow-y-auto">
    <TopNav back="/storyteller" next="" />
    <main class="py-3.5 px-8">
        <Time />
        <form
            on:submit|preventDefault={submitStory}
            id="story"
            class="space-y-3">
            <input
                type="text"
                name="title"
                placeholder="Title"
                required
                bind:value={form.title}
                class="text-3xl font-bold focus:outline-none placeholder:text-contrast" />
            <input
                bind:value={locationInput}
                type="text"
                name="location"
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
                placeholder="Add Summary"
                bind:value={form.description}
                maxlength="400"
                required
                class="focus:outline-none placeholder:font-bold placeholder:text-contrast" />
        </form>
        <section class="placeholder:text-contrast" id="editor" />
        <div
            class="fixed inset-x-0 bottom-0 z-10 flex flex-col gap-y-2 bg-primary">
            <p
                on:click={autosaveDraft}
                class="self-center text-xs font-light italic">
                Autosaved at <AutosaveTime {currTime} />
            </p>
            <label class="self-center  font-text text-contrast text-xs">
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
                <button class="w-1/2" type="submit" form="story"
                    >Publish</button>
                <button class="w-1/2" on:click={clearStory}>Clear</button>
            </div>
        </div>
    </main>
</div>

<Modal {isOpenModal} showCloseButton={false}>
    Thanks for submitting!
    <a href="/storyteller">
        <p class="underline font-bold">Go back</p>
    </a>
</Modal>

<style lang="postcss">
    #story input {
        @apply w-full bg-primary text-contrast cursor-text;
    }
    textarea {
        @apply w-full h-auto bg-primary text-contrast cursor-text;
    }
    /*:global(.ce-toolbar__plus) {
        @apply rounded-full bg-primary border border-contrast shadow-sm;
    }
    :global(.ce-toolbar__settings-btn) {
        //@apply rounded-full bg-primary border border-contrast shadow-sm;
    }*/
    :global(.ce-paragraph[data-placeholder]:empty::before) {
        @apply text-contrast;
    }
    :global(.cdx-block) {
        @apply text-contrast;
    }
    :global(.cdx-input) {
        @apply text-left text-xs p-0;
    }
    :global(.ce-toolbar) {
        @apply bg-primary shadow-none border border-contrast;
    }
</style>
