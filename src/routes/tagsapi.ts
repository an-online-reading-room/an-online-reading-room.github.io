import type { EndpointOutput } from "@sveltejs/kit";

export async function get(): Promise<EndpointOutput> {
  const res = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/categories`)
  let data = await res.json()
  data = data.data.map(category => {
    return {
      id: category.id,
      name: category.attributes.name
    }
  })
  

  return { body: data }
}