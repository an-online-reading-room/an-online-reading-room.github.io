const BASE_URL = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?f=json&maxSuggestions=10&`

const getSuggestions = async (text: string) => {
  if(text === '') return new Promise((resolve) => resolve([]))
  const url = BASE_URL + `text=${text}`
  const res = await (await fetch(url)).json()
  const places = await res.suggestions.map(place => place.text)
  return places
  
}

export { getSuggestions }