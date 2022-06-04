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
