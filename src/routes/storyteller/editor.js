import * as api from '$lib/api.js';
import qs from 'qs';

export async function get({ url }) {
    if (url.searchParams.has("story")) {
        const query = qs.stringify({
            filters: {
              slug: {
                $eq: url.searchParams.get("story"),
              },
            },
        }, {
            encodeValuesOnly: true,
        });

        const res = await api.get(`api/stories?${query}`);
        const prevStoryData = res.data[0]
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