import * as api from '$lib/api.js'

export async function post({ request }) {
    const json = await request.json()

    const body = await api.post(`api/passwordless/send-link`, { email: json.email, username: json.username }, null);
    console.log("DBG passwordless response post: ", body)
    return { body };
}

export async function get({ url }) {
    //const json = await request.json()
    //console.log("register get json:")
    //console.log(url)
    const body = await api.get(`api/passwordless/login?loginToken=${url.searchParams.get('token')}`, null);
    console.log("DBG passwordless response get: ", body)
    return { body };
}
