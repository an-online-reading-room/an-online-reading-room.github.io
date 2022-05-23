<script>
  import Header from '$components/Header.svelte'
  import { getSuggestions } from '$lib/services/geocode'
  import { onMount } from "svelte";
  import "leaflet/dist/leaflet.css"
  import { variables } from '$lib/variables'
  import { theme } from '$stores/theme'
  
  const API_URL = `${variables.strapi_url}/api`
  let mediaRefs = []
  let form, editor
  let locationInput = ''
  let locationSuggestions = []
  let uploading = false, done = false
  let preview = false, termsCheckbox
  
  let story
  
  $: {
    getSuggestions(locationInput)
    .then(data => locationSuggestions = data)
  }

  async function handleSubmit() {
    preview = false
    uploading = true
    
    const formData = new FormData(form);
    const authorData = {
      data: {
        username: formData.get('username')
      }
    }
    const storyData = {
      data: {
        title: formData.get('title'),
        location: formData.get('location'),
        description: formData.get('description')
      }
    }
    editor.save().then(data => {
      storyData.data.submission = data
    }) 

    const authors = await (await fetch(`${API_URL}/authors`)).json()
    const curr = authors.data.filter(author => author.attributes.username === authorData.data.username)
    
    if(curr.length > 0) {
      storyData.data.author = curr[0].id
      const story = await (await fetch(`${API_URL}/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData)
      })).json()
      uploading = false
      done = true
    } else {
      const newAuthor = await (await fetch(`${API_URL}/authors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authorData)
      })).json()
      storyData.data.author = newAuthor.data.id
      const story = await (await fetch(`${API_URL}/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData)
      })).json()
      const imageData = {
        data: {
          media: mediaRefs
        }
      }
      const media = await (await fetch(`${API_URL}/stories/${story.data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData)
      })).json()
      console.log(media)
      uploading = false
      done = true
    }
    

  }

  async function handlePreview() {
    form.classList.add('hidden')
    editor.save().then(data => {
      const formData = new FormData(form);
      story = {
        title: formData.get('title'),
        submission: data,
        url: slugify(formData.get('username') + '-' + formData.get('title'))
      }
      preview = true
    }) 
  }

  const slugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaeeeeiiiioooouuuunc------";
    for (let i = 0, l = from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  onMount(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const EditorJSImage = (await import('@editorjs/image')).default;
    editor = new EditorJS({
      holder: 'editor',
      placeholder: 'Add Storyblock',
      tools: {
        image: {
          class: EditorJSImage,
          config: {
            endpoints: {
              byFile: `${API_URL}/upload`,
            },
            uploader: {
              uploadByFile(file) {
                const uploadData = new FormData()
                uploadData.append('files', file , file.name)

                return fetch(`${API_URL}/upload`, {
                  method: 'POST',
                  body: uploadData
                }).then(response => response.json())
                .then(data => {
                  mediaRefs.push(data[0].id)
                  return {
                    success: 1,
                    file: {
                      url: data[0].url
                    }
                  }
                })
              }
            }
          }
        }
      }
    })

    
  })
</script>

<div class="flex flex-col align-items-center gap-y-4
            w-screen bg-primary
            text-center h-full overflow-y-scroll">
  <Header></Header>
  
  <form bind:this={form} enctype="multipart/form-data" method="post" on:submit|preventDefault={handlePreview}
        class="flex flex-col gap-4 px-4 py-8
                font-text text-sm leading-4">
    <fieldset>
      <legend class="hidden">Title</legend>
      <input type="text" name="title" id="title" placeholder="Title" required
              class="w-full px-2 py-2 border placeholder:text-black">
    </fieldset>
    <fieldset>
      <legend class="hidden">Author's Username</legend>
      <input type="text" name="username" id="username" placeholder="Author's Username" required
              class="w-full px-2 py-2 border placeholder:text-black">
    </fieldset>
    <fieldset>
      <legend class="hidden">Location</legend>
      <input bind:value={locationInput} type="text" name="location" id="location" placeholder="Add Location" required
              class="w-full px-2 py-2 border placeholder:text-black"
              list="location-suggestions">
      <datalist id="location-suggestions">
        {#each locationSuggestions as suggestion}
          <option value={suggestion}> {suggestion} </option>
        {/each}
      </datalist>
    </fieldset>
    <fieldset>
      <legend class="hidden">Description</legend>
      <input type="text" name="description" id="desciption" placeholder="Brief description" maxlength="400" required
              class="w-full px-2 py-2 border placeholder:text-black">
    </fieldset>
    <section class="w-full placeholder:text-black"
              id="editor"></section>
  
    <button type="submit" class="mt-auto p-2 self-center text-white font-display text-xs bg-black">
      Preview
    </button>
  </form>

  {#if uploading}
  <div class="flex-1 flex flex-col justify-center">
    <video src="/img/loading-{$theme}.webm" autoplay loop muted></video>
  </div>
  {/if}

  {#if done}
  <section class="flex-1 flex flex-col justify-center gap-y-6 font-text text-sm text-contrast">
    <p>Thanks for submitting!</p>
    <a href="/stories/{story.url}"
      class="underline">View your story here</a>
  </section>
  {/if}

  {#if preview}
  <div class="px-4 py-8 flex flex-col gap-y-2 
              text-contrast text-left">
    <div class="px-1 border">
      {story.title}
    </div>
    <div class="relative flex-1 overflow-hidden overflow-y-scroll text-sm border flex flex-col select-text">
      <div id="reader" class="flex flex-col pb-12 p-2">
          {#each story.submission.blocks as block}
            <div class="flex flex-row gap-x-2">
        
              <div class="relative mb-1 w-full">
                {#if block.data.text}
                <section data-content={block.data.text} id="{"target_"+block.id}">
                  {block.data.text}
                </section>
                {/if}
                {#if block.data.file}
                <div class="self-center flex-initial object-contain">
                  <img  id="{"target_"+block.id}" src={block.data.file.url} alt={block.data.caption} />
                </div>
                {/if}
              </div>
            </div>
            
          {/each}
      </div>
    </div>
    <div class="text-xxs self-center">
      <input bind:checked={termsCheckbox} type="checkbox" name="terms" id="terms">
      <label for="terms">I have read the terms and conditions.</label>
    </div>
    <button class="mt-auto p-2 self-center text-white font-display text-xs bg-black
                disabled:opacity-50"
          disabled={!termsCheckbox}
          on:click|preventDefault={handleSubmit}>
      Submit
    </button>
  </div>
  {/if}
 
</div>

