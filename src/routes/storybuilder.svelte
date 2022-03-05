<script>
  import Header from '../components/Header.svelte'
  import { getSuggestions } from '../services/geocode'
  import { onMount } from "svelte";
  import "../form.css"
  import "leaflet/dist/leaflet.css"
  import { variables } from '../variables'
  
  const API_URL = `${variables.strapi_url}/api`
  let mediaRefs = []
  let form, editor
  let locationInput = ''
  let locationSuggestions = []
  $: {
    getSuggestions(locationInput)
    .then(data => locationSuggestions = data)
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);
    const authorData = {
      data: {
        username: data.get('username')
      }
    }
    const storyData = {
      data: {
        title: data.get('title'),
        location: data.get('location'),
        description: data.get('description')
      }
    }
    editor.save().then(data => {
      storyData.data.submission = data
    }) 
    fetch(`${API_URL}/authors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authorData)
    })
    .then(response => response.json())
    .then(data => storyData.data.author = data.data.id)
    .then(() => {
      fetch(`${API_URL}/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData)
      })
      .then(response => response.json())
      .then(data => {
        // add ref for image uploads 
        const imageData = {
          data: {
            media: mediaRefs
          }
        }
        console.log(data)
        return fetch(`${API_URL}/stories/${data.data.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(imageData)
        })
      
      })
      .then(response => console.log(response.json()))
    })

  }

  onMount(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default;
    const EditorJSImage = (await import('@editorjs/image')).default;
    console.log(EditorJSImage)
    form.addEventListener('submit', handleSubmit);
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
            text-center">
  <Header></Header>
  

  <main>
    

    <form bind:this={form} enctype="multipart/form-data" method="post"
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
      
      <button type="submit"
              class="mt-auto p-2
                      self-center text-white font-display text-xs bg-black">
        Submit
      </button>
  
    </form>
  
  </main>


</div>

