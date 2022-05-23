const BASE_URL = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/`

const getSuggestions = async (text: string) => {
  if(text === '') return new Promise((resolve) => resolve([]))
  const url = BASE_URL + 'suggest?f=json&maxSuggestions=10&' + `text=${text}`
  const res = await (await fetch(url)).json()
  const places = await res.suggestions.map(place => place.text)
  return places
  
}

const getCoordinates = async (location: string) => {
  
  // get magic key 
  const suggestUrl = BASE_URL + `suggest?f=json&maxSuggestions=10&text=${location}`
  let res = await (await fetch(suggestUrl)).json()
  
  if(res.suggestions.length == 0) return
  const magicKey = await res.suggestions[0].magicKey
  
  if(magicKey == null) return
  const coordsUrl = BASE_URL + `findAddressCandidates?f=json&SingleLine=${location}&magicKey=${magicKey}`
  res = await (await fetch(coordsUrl)).json()
  const coords = await res.candidates[0].location
  return coords
   
}

export { getSuggestions, getCoordinates }