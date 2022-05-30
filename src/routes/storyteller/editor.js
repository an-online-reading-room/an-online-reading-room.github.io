import * as api from '$lib/api.js';

export async function get({ url }) {
    if (url.searchParams.has("story")) {
        const res = await api.get(`api/stories/${url.searchParams.get("story")}`);
        const prevStoryData = res.data
        return {
            body: { prevStoryData }
        };
    } else {
        return {
            status:200,
            body: {}
        };
    }

}