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
    name="How does it work?"
    {open}
    openMenu={false}
    on:hide={() => history.back()}
    on:hideMenu={() => goto(back)}>
    <section>
        <p>
            The Adventure Version mimics exploring the outdoors. You choose your
            own route by clicking on hyperlinks and find stories along the way.
        </p>
    </section>
    <section class="w-screen mx-[-24px]">
        <img class="w-full" src="/img/infographic.png" alt="infographic" />
    </section>
</MenuItem>
