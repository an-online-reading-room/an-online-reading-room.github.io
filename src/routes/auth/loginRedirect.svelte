<script context="module">
    import { browser } from "$app/env";
    import { getMap } from "$lib/api/lite";
    import { user } from "$stores/user";
    import { get } from 'svelte/store'
    import mapStore from "$stores/mapStore";

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

                    const defaultMap = await getMap()
                    mapStore.set({
                        id: defaultMap.id,
                        visits: [],
                        stories: []
                    })
                    console.log("set mapStore :", get(mapStore))
                    return {
                        status: 302,
                        redirect: response.context?.redirectUrl ?? "/",
                    };
                }
            }
        }
        return {};
    }
</script>
