import * as api from '$lib/api.js';

export async function get({ url }) {
    let form ={ 
        title : "",
        location : "",
        description : ""
    };
    if (url.searchParams.has("story")) {
        const res = await api.get(`api/stories/${url.searchParams.get("story")}`);
        const prevStoryData = res.data
        const attr = res.data.attributes
        const draft = attr.draft
  
        //console.log(res.data)
        if(draft) {
            form = draft.form
        } else  {
            form.title = attr.title
            form.location = attr.location
            form.description = attr.description
        }

        return {
            body: { prevStoryData, draft, form }
        };
    } else {
        return {
            status:200,
            body: { form }
        };
    }

}