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
    name="Worldbuilders"
    {open}
    openMenu={false}
    on:hide={() => history.back()}
    on:hideMenu={() => goto(back)}>
    <section>
        <p>
            The Reading Room is a team of diverse individuals who can’t wait to
            deep dive into your stories.
        </p>
    </section>
    <section>
        <p>
            You can contact us at
            <a href="mailto:anonlinereadingroom@gmail.com" class="font-bold"
                >anonlinereadingroom@gmail.com</a>
        </p>
    </section>
    <section>
        <h2 class="font-bold text-lg">Core Team</h2>
        <ul>
            <a href="/team/neeti-sivakumar">
                <li class="underline">Neeti Sivakumar</li>
            </a>
            <a href="/team/anushka-trivedi">
                <li class="underline">Anushka Trivedi</li>
            </a>
            <a href="/team/george-panicker">
                <li class="underline">George Panicker</li>
            </a>
            <a href="/team/ishwari-arambam">
                <li class="underline">Ishwari Arambam</li>
            </a>
            <a href="/team/shreya-pidikiti">
                <li class="underline">Shreya Pidikiti</li>
            </a>
            <a href="/team/oshin-padhye">
                <li class="underline">Oshin Padhye</li>
            </a>
            <a href="/team/himanshu-erande">
                <li class="underline">Himanshu Erande</li>
            </a>
        </ul>
    </section>
    <section class="flex flex-col gap-y-3">
        <h2 class="font-bold text-lg">Grants</h2>
        <a
            target="_blank"
            href="https://www.goethe.de/ins/in/en/sta/mum/ueb/c3.html">
            <img
                src="/img/menu/C3.png"
                alt="C3 : Codes, Creativity, Communities" />
        </a>
    </section>
    <section class="flex flex-col gap-y-3">
        <h2 class="font-bold text-lg">Supported by</h2>
        <ul class="flex flex-col gap-y-4">
            <li>
                <a
                    target="_blank"
                    href="https://www.goethe.de/ins/in/en/index.html">
                    <img
                        src="/img/menu/Goethe.png"
                        alt="C3: Codes, Creativity, Communities is a year-long program with participants from the fields of culture and  technology expanding their imagination and creativity through collaborative engagements, toward cultural production and civil society concerns within the realm of open source." />
                </a>
            </li>
            <li>
                <a target="_blank" href="https://befantastic.in/">
                    <img
                        src="/img/menu/BeFantastic.png"
                        alt="BeFantastic is a techart platform that originated in Bangalore, India in 2017. It envisions a positive, sustainable future leveraging creative tech." />
                </a>
            </li>
            <li>
                <a target="_blank" href="https://zkm.de/en">
                    <img
                        src="/img/menu/ZKM.png"
                        alt="The ZKM | Center for Art and Media Karlsruhe is a unique cultural institution worldwide, because it is a place that expands the original tasks of the museum." />
                </a>
            </li>
        </ul>
    </section>
</MenuItem>
