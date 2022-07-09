<script>
import MenuItem from "$components/MenuItem.svelte";
import { goto, afterNavigate } from "$app/navigation";

let open = true;
let back;

afterNavigate((navigation) => {
    if(navigation.from != null && back != null) {
        back = navigation.from.pathname;
    }
});
</script>

<MenuItem
    name="FAQ"
    {open}
    openMenu={false}
    inHeader={false}
    on:hide={() => goto(back)}
    on:hideMenu={() => goto(back)}>
    <section>
        <h2 class="font-bold text-base">
            How can I be a part of The Reading Room?
        </h2>
        <p>
            We welcome all to contribute as storytellers. We look specifically
            for stories that are rooted in a place. Every story is important as
            they add on to how your neighbourhood is seen and experienced by
            others. It is important to remember to be kind and responsible while
            sharing, and receive permission if sharing stories that are not your
            own. If you aren’t sure of what to say, here are our <a href="/prompts" class="underline">prompts</a> to get
            you started.
        </p>
    </section>
    <p class="text-xxs">◆</p>
    <section>
        <h2 class="font-bold text-base">
            What is a Choose Your Own Adventure experience?
        </h2>
        <p>
            As a listener, we have recreated the experience of navigating a new
            neighbourhood yourself. After you view a story, you can choose any
            hyperlink to read a new story. Thereafter, each story leads to a new
            set of stories. You know what they say, if you don't know where
            you're going, any road will get you there. Here is an <a
                href="/"
                class="underline font-bold">infographic</a> on how to use it.
        </p>
    </section>
    <p class="text-xxs">◆</p>
    <section>
        <h2 class="font-bold text-base">How do I create hyperlinks?</h2>
        <p>
            On highlighting text, you can look for an existing story to
            hyperlink the same text. Please choose your hyperlinked text with
            care so other listeners can
        </p>
    </section>
    <p class="text-xxs">◆</p>
    <section>
        <h2 class="font-bold text-base">How do I upload stories?</h2>
        Our<a href="/" class="underline">story form</a> will ask you to share a story
        title, summary, username(s), and location, along with your story. Please
        email us at anonlinereadingroom@gmail.com if you have any trouble.
    </section>
    <p class="text-xxs">◆</p>
    <section>
        <h2 class="font-bold text-base">Can I share these stories?</h2>
        <p>
            Yes, please do! We hope sharing will gather more storytellers to
            share with us. Please ensure you credit the authors appropriately.
            Go through our terms and conditions for a further grasp on what can
            be shared.
        </p>
    </section>
    <p class="text-xxs">◆</p>
    <section>
        <h2 class="font-bold text-base">How do I use the AR version?</h2>
        <p>
            We are currently developing our AR version. We’ll let you know when
            we’re ready on our instagram page! Follow us for more updates. <a
                href="https://www.instagram.com/thereadingroom.online/"
                class="underline font-bold">@thereadingroom.online</a>
        </p>
        <p>
            Our AR version is available only on mobile devices with internet
            connections.
        </p>
    </section>
    <p class="text-xxs">◆</p>
    <section>
        <h2 class="font-bold text-base">How can I support The Reading Room?</h2>
        <p>
            We are dependent on grants and crowdfunding for support. Please
            email us at <a href="mailto:anonlinereadingroom@gmail.com"
                >anonlinereadingroom@gmail.com</a> if you would like to become a
            patron.
        </p>
    </section>
</MenuItem>
