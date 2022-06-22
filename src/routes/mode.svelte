<script>
  import Header from "$components/Header.svelte";  
</script>


<Header></Header>
<section class="flex flex-col justify-center items-center 
            w-screen h-full bg-cover bg-center
            text-center">


  <div class="h-2/5 w-full flex flex-col items-center justify-start">
    <div class="bg-white w-3/4
      rounded-lg flex flex-col items-center">
      <div class="w-full py-5
                  flex flex-col justify-around gap-y-6
                  font-display text-contrast text-xs">
        <p class="font-text text-base">Are you a storyteller or a listener?</p>
        <div class="flex flex-col justify-between gap-y-4">
          <a href="/storyteller">
            <button class="font-display text-sm px-4 py-2 bg-accent text-white w-1/2">
              Storyteller
            </button>
          </a>
          <a href="/lite">
            <button class="font-display text-sm px-4 py-2 bg-accent text-white w-1/2">
              Listener
            </button>
          </a>
          
        </div>
      </div>
    </div>
  </div>

 <!-- <Modal {isOpenModal} showCloseButton={true} on:close={closeModal}>
    <p class="font-bold mb-2">Tell us your story!</p>
    <p>
        Please <a class="font-bold underline" href="/auth/login"
            >log in</a> to use this feature.
    </p>
    <p>Worried about what story to share? Check out our prompts.</p>
  </Modal>
  -->
</section>

<style>
  section {
    background-image: url("/img/Full Size_Landing Page Illustration_Choose Version.png");  
  }
</style>