<script>
    import { onMount } from "svelte";
    import { dev } from "$app/env";
    import { getSuggestions } from "$lib/services/geocode";
    import { user } from "$stores/user.js";
    import { Clear, Discard, Republish, AddTitle } from "./_modals/modals.js";
    import { goto, beforeNavigate } from "$app/navigation";

    import TopNav from "$components/navigation/TopNav.svelte";
    import BottomNav from "$components/navigation/BottomNav.svelte";
    import Modal from "$components/utils/Modal.svelte";

    import Time from "./_components/Time.svelte";
    import AutosaveTime from "./_components/AutosaveTime.svelte";

    import * as api from "$lib/api.js";
    import "leaflet/dist/leaflet.css";
    import { variables } from "$lib/variables";

    export let prevStoryData, form, isNew;

    let isOpenModal = false;
    let openedModal;

    let autosave_newStoryCreated = false;
    let autosave_newStoryId;
    let currTime = null;

    let editor;
    let locationInput = form.location;
    let locationSuggestions = [];
    let timer;

    $: {
        getSuggestions(locationInput).then(
            (data) => (locationSuggestions = data)
        );
    }

    $: form && debouncedAutosave();

    function debouncedAutosave() {
        if (!isNew) {
            clearTimeout(timer);
            timer = setTimeout(autosaveDraft, 500);
        }
    }
    async function submitStory() {
        const storyData = getStoryData();

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
            } else if (autosave_newStoryId) {
                res = api.put(
                    `api/stories/${autosave_newStoryId}`,
                    storyData,
                    $user.jwt
                );
            } else {
                res = api.post("api/stories", storyData, $user.jwt);
            }

            //Catch errors here if story not submitted
            res.then((data) => {
                goto("/storyteller");
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
                storyData.data.hasDraft = true;
                console.log("Autosaving previously existing");
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
                    console.log("Autosaving newly created story");
                    currTime = Date.now();
                    autosave_newStoryId = res.data.id;
                } else {
                    console.log("Autosaving and updating newly created story");

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

    function openModal(comp) {
        isOpenModal = true;
        openedModal = comp;
    }

    function closeModal() {
        isOpenModal = false;
    }

    async function clearStory() {
        editor.clear();
        form.title = "";
        form.location = "";
        form.description = "";
        closeModal();
    }

    async function discardDraft() {
        editor.render(prevStoryData.attributes.submission);
        form.title = prevStoryData.attributes.title;
        form.location = prevStoryData.attributes.location;
        form.description = prevStoryData.attributes.description;
        let storyData = {
            data: {
                hasDraft: false,
            },
        };

        //  Discarding draft after timeout because editor.render above triggers another autosave which sets
        //  hasDraft to true again. Waiting for the unintentional autosave to finish before updating hasDraft.
        setTimeout(async () => {
            const r = await api.put(
                `api/stories/${prevStoryData.id}`,
                storyData,
                $user.jwt
            );
            console.log(r);
        }, 1000);
        closeModal();
    }

    onMount(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const ImageTool = (await import("@editorjs/image")).default;

        editor = new EditorJS({
            holder: "editor",
            minHeight: 120,
            placeholder: "Add your story",
            data: prevStoryData
                ? prevStoryData.attributes.draft ??
                  prevStoryData.attributes.submission
                : {},
            onChange: (api, event) => {
                //console.log("Now I know that Editor's content changed!", event);
                autosaveDraft();
            },
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
                                        console.log(data);
                                        return {
                                            success: 1,
                                            file: {
                                                url: dev
                                                    ? `http://localhost:1337${data[0].url}`
                                                    : `${variables.strapi_url}${data[0].url}`,
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

    onMount(() => {
        const ta = document.getElementsByTagName("textarea")[0];
        ta.style.height = "";
        ta.style.height = ta.scrollHeight + "px";
    });

    beforeNavigate(({ from, to, cancel }) => {

        if (!form.title && autosave_newStoryCreated) {
            cancel();
            openModal(AddTitle);
        }
        //}
    });
    function resizeTextarea({ target }) {
        target.style.height = "";
        target.style.height = target.scrollHeight + "px";
    }
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
                maxlength="160"
                required
                class="focus:outline-none font-bold placeholder:font-bold placeholder:text-contrast resize-none"
                on:input={resizeTextarea} />
        </form>
        <section class="placeholder:text-contrast" id="editor" />

        <BottomNav>
            <svelte:fragment slot="editor-extras">
                {#if currTime}
                    <p class="self-center text-xs font-light italic">
                        Autosaved at <AutosaveTime {currTime} />
                    </p>
                {/if}
                <p class="self-center  font-text text-contrast text-xs">
                    Read our
                    <a class="underline" href="/about/code-of-conduct">
                        code of conduct</a>. In short, be kind!
                    </p>
            </svelte:fragment>
            <svelte:fragment slot="bottom-bar">
                {#if prevStoryData?.attributes.publishedAt}
                    <button class="w-1/2" type="submit" form="story">
                        Republish
                    </button>
                    <button class="w-1/2" on:click={() => openModal(Discard)}>
                        Discard draft
                    </button>
                {:else}
                    <button class="w-1/2" type="submit" form="story">
                        Publish
                    </button>
                    <button class="w-1/2" on:click={() => openModal(Clear)}>
                        Clear
                    </button>
                {/if}
            </svelte:fragment>
        </BottomNav>
    </main>
</div>

<Modal {isOpenModal} showCloseButton={false} on:close={closeModal}>
    <svelte:component
        this={openedModal}
        on:close={closeModal}
        on:clear={clearStory}
        on:republish={submitStory}
        on:discard={discardDraft} />
</Modal>

<style lang="postcss">
    #story input {
        @apply w-full bg-primary text-contrast cursor-text;
    }
    textarea {
        @apply w-full h-auto bg-primary text-contrast cursor-text;
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
    :global(.ce-toolbar) {
        @apply bg-primary shadow-none border border-contrast;
    }
</style>
