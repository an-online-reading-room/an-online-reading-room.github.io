<script>
  import MenuItem from "$components/MenuItem.svelte";
  import { goto, afterNavigate } from '$app/navigation'
import { session } from "$app/stores";
  
  let open = true
  let back
  let currSession = $session
  
  afterNavigate((navigation) => {
    back = currSession.menuBack 
    console.log(back)
  })
  
  </script>
  
  <MenuItem
      name="Code of Conduct"
      {open}
      openMenu={false}
      inHeader={true}
      on:hide={() => history.back()}
      on:hideMenu={() => goto(back)}>
      <section class="flex flex-col gap-y-2">
          <ol class="list-decimal list-inside">
            <li>Respect others.</li>
            <li>You are responsible for the stories you post. </li>
            <li>Do not promote bullying, harassment, and discrimination.</li>
            <li>Do not post personal information without prior permission.</li>
            <li>Do not share stories without proper credit.</li>
            <li>Be kind. Go outside. Smell the roses.</li>
          </ol>
      </section>

      <section>
        <p>Please read our <a class="underline" href="/about/terms-and-conditions">terms and conditions</a> for further details. </p>
      </section>

      <section>
        <p>Write to us at <a href="mailto:anonlinereadingroom@gmail.com" class="underline">anonlinereadingroom@gmail.com</a> in case of any problems.</p>
      </section>
     
  </MenuItem>
  