<script>
import { goto, afterNavigate } from "$app/navigation";
import { session } from "$app/stores";
import CloseIcon from "$components/icons/CloseIcon.svelte";
import HomeIcon from "$components/icons/HomeIcon.svelte";
import ThemeSwitcherIcon from "$components/icons/ThemeSwitcherIcon.svelte";
import theme from "$stores/theme";

let back;
let pathPrefix;
let currSession = $session

afterNavigate((navigation) => {
    console.log("navigated ")
    if (navigation.from != null && 
    navigation.from.pathname.includes('about') === false && 
    navigation.from.pathname.includes('menu') === false) {
        back = navigation.from.pathname;
        session.update(session => {
            return {
                ...session,
                menuBack: back
            }
        }) 
        console.log("main page ", back)
    }
});

const changeTheme = () => {
    const themes = ["cream", "green", "red", "teal", "grey"].filter(
        (value) => value != $theme
    );
    const newTheme = themes[Math.floor(Math.random() * themes.length)];
    theme.set(newTheme);
};
</script>

<div
    class="absolute inset-0 w-screen h-full
                  bg-menu-primary text-menu-accent
                  pt-6 px-6 z-40">
    <div class="flex flex-row justify-end gap-x-2">
        <button
            class="w-10 h-10 focus:outline-none stroke-menu-accent"
            on:click={() => goto(back)}>
            <CloseIcon />
        </button>
    </div>

    <div
        class="flex flex-col justify-center
                    h-3/4
                    divide-y divide-current
                    text-display text-base text-center">
        <a
            href={pathPrefix === "/" ? "/adventure/read" : "/"}
            on:click={() => goto(back)}>
            <div class="w-full h-16 pb-6 pt-4">
                <div class="w-10 h-10 mx-auto stroke-menu-accent">
                    <HomeIcon />
                </div>
            </div>
        </a>

        <nav class="flex flex-col divide-y divide-current">
            <a class="cursor-pointer text-center w-full py-4" href="/about">
                About
            </a>
            <a class="cursor-pointer text-center w-full py-4" href="/about/faq">
                FAQ
            </a>
            <a class="cursor-pointer text-center w-full py-4" href="/lite">
                Lite Version
            </a>
            <a
                class="cursor-pointer text-center w-full py-4"
                href="/adventure/read">
                Adventure Version
            </a>
            <a
                class="cursor-pointer text-center w-full py-4"
                href="/storyteller">
                Storyteller
            </a>
            <a class="cursor-pointer text-center w-full py-4" href="/profile/bookmarks">
                Reading List
            </a>
        </nav>

        <div class="w-full h-16 pb-6 pt-4">
            <button
                class="w-10 h-10 mx-auto stroke-menu-accent">
                <ThemeSwitcherIcon />
            </button>
        </div>
    </div>
</div>
