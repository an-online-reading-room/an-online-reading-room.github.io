import type { EndpointOutput } from "@sveltejs/kit";
import { variables } from "../variables";

const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length ; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export async function get(): Promise<EndpointOutput> {
  const res = await fetch(`${variables.strapi_url}/api/stories?populate=author,categories,annotations`)
  let data = await res.json()
  data = data.data.map(story => {
    const author_name = story.attributes.author.data.attributes.username
    return {
      id: story.id,
      title: story.attributes.title,
      submission: story.attributes.submission,
      location: story.attributes.location,
      description: story.attributes.description,
      author_name: author_name,
      url: slugify(author_name + '-' + story.attributes.title),
      categories: story.attributes.categories.data.map(category => category.attributes.name),
      annotations: story.attributes.annotations.data.map(annotation => {
        return {
          content: annotation.attributes.content,
          targetText: annotation.attributes.targetText,
          startOffset: annotation.attributes.startOffset,
          length: annotation.attributes.length,
          blockID: annotation.attributes.blockID,
        }
      })
    }
  })
  

  return { body: data }
}