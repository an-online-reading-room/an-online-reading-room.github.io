import type { EndpointOutput } from "@sveltejs/kit";
import { variables } from "../variables";

export async function get(): Promise<EndpointOutput> {
  const res = await fetch(`${variables.strapi_url}/api/categories`)
  let data = await res.json()
  data = data.data.map(category => {
    return {
      id: category.id,
      name: category.attributes.name
    }
  })
  

  return { body: data }
}