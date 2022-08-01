<script>
  import MenuItem from "$components/MenuItem.svelte";
  import { goto, afterNavigate } from "$app/navigation";
import { session } from "$app/stores";
  
  let open = true;
  let back;
  let currSession = $session
  
  afterNavigate((navigation) => {
    back = currSession.menuBack
    console.log(back)
      
  });
</script>

<MenuItem
    name="About"
    {open}
    openMenu={false}
    on:hide={() => history.back()}
    on:hideMenu={() => goto(back)}>
    <p>
        The Reading Room is a collaborative placemaking and location-based
        project that is being developed by contributors from across the world.
        We hope you find meaningful connections through these stories. We hope
        your time is filled with joy and curiosity as you go through the room.
        You can view these stories using our lite version, web version, or AR
        version.
    </p>
    <p class="text-xxs">◆</p>
    <div>
        <h2 class="font-bold text-lg">Lite Version</h2>
        <p>
            This version ensures you can smoothly view stories on a
            low-bandwidth. Unfortunately, some stories may not be accessible or
            will take a few minutes to load based on your internet speed.
        </p>
    </div>
    <p class="text-xxs">◆</p>
    <div>
        <h2 class="font-bold text-lg">Adventure Version</h2>
        <p>
            This version is a Choose Your Own Adventure experience where you
            choose which stories or streets you’d like to walk down in order to
            read more stories. To navigate smoothly, please check our <a
                href="/about/infographic"
                class="underline font-bold">infographic</a
            >.
        </p>
    </div>
    <p class="text-xxs">◆</p>
    <div>
        <h2 class="font-bold text-lg">AR Version</h2>
        <p>
            This version is best experienced while walking around your
            neighbourhood. It is an augmented reality application that allows
            you to view stories through your phone screen. These stories can be
            played at physical locations in your neighbourhood.
        </p>
    </div>
    <p class="text-xxs">◆</p>
    <p>
        While The Reading Room promotes outdoor interaction, please be aware
        that with the ongoing pandemic everyone must be careful while doing so
        or use our web version.
    </p>
    <section
        class="cursor-pointer"
        on:click={() => goto("/about/worldbuilders")}>
        <p class="font-text underline">Worldbuilders</p>
    </section>
    <section class="cursor-pointer" on:click={() => goto("/about/terms-and-conditions")}>
        <p class="font-text underline">Terms and Conditions</p>
    </section>
</MenuItem>
