import * as api from '$lib/api.js';

export async function get({ url }) {
    let form = {
        title: "",
        location: "",
        description: ""
    };
    if (url.searchParams.has("story")) {
        const res = await api.get(`api/stories/${url.searchParams.get("story")}`);
        //console.log(res)
        const prevStoryData = res
        const draft = res.draft

        //console.log(res.data)
        if (draft) {
            form = draft.form
        } else {
            form.title = res.title
            form.location = res.location
            form.description = res.description
        }

        return {
            body: { isNew: false, prevStoryData, form }
        };
    } else {
        return {
            status: 200,
            body: { isNew: true, form }
        };
    }
}