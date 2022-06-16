import * as api from '$lib/api.js';
import qs from 'qs';
import { variables } from '$lib/variables';
import { flattenStrapiResponse } from '$lib/utils/api';

export async function get({ url }) {
    let form ={ 
        title : "",
        location : "",
        description : ""
    };
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

        // const res = await api.get(`api/stories/${url.searchParams.get("story")}`);
        const res = await (await fetch(`${variables.strapi_url}/api/stories?${query}`)).json()
        const story = flattenStrapiResponse(res)
        console.log(story)
        const draft = res.draft
  
        //console.log(res.data)
        if(draft) {
            form = draft.form
        } else  {
            form.title = story.title
            form.location = story.location
            form.description = story.description
        }

        return {
            body: { story, draft, form }
        };
    } else {
        return {
            status:200,
            body: { form }
        };
    }

}