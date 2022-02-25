import type { EndpointOutput } from "@sveltejs/kit";

export async function get(): Promise<EndpointOutput> {
  const res = await fetch('https://reading-room-backend.herokuapp.com/api/categories')
  let data = await res.json()
  data = data.data.map(category => {
    return {
      id: category.id,
      name: category.attributes.name
    }
  })
  

  return { body: data }
}