<script context="module">
    import { browser } from "$app/env";
    import { user } from "$stores/user";


    export async function load({ url, fetch }) {
        if (browser) {
            if (url.searchParams.has("loginToken")) {
                const token = url.searchParams.get("loginToken");
                const response = await fetch(
                    `/auth/register?token=${token}`
                ).then((r) => r.json());
                if (response.error) {
                    console.log(response.error.status, response.error.message);
                    return {
                            error: response.error.message,
                            status: response.error.status,
                    };
                } else {
                    console.log(response);
                    user.set({
                        jwt: response.jwt,
                        username: response.user.username,
                        id: response.user.id,
                    });
                    return {
                        status: 302,
                        redirect: "/",
                    };
                }
            }
        }
        return {};
    }
</script>

<div class="loader text-accent text-center" />

<style>
    .loader,
    .loader:before,
    .loader:after {
        border-radius: 50%;
        width: 1.5em;
        height: 1.5em;
        animation-fill-mode: both;
        animation: load 1.8s infinite ease-in-out;
    }
    .loader {
        font-size: 10px;
        margin: auto;
        position: relative;
        transform: translateZ(0);
        animation-delay: -0.16s;
        top: 20%;
    }
    .loader:before,
    .loader:after {
        content: "";
        position: absolute;
        top: 0;
    }
    .loader:before {
        left: -3.5em;
        animation-delay: -0.32s;
    }
    .loader:after {
        left: 3.5em;
    }
    @-webkit-keyframes load {
        0%,
        80%,
        100% {
            box-shadow: 0 2.5em 0 -1.3em;
        }
        40% {
            box-shadow: 0 2.5em 0 0;
        }
    }
    @keyframes load {
        0%,
        80%,
        100% {
            box-shadow: 0 2.5em 0 -1.3em;
        }
        40% {
            box-shadow: 0 2.5em 0 0;
        }
    }
</style>
