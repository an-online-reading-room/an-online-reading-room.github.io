
const flattenStrapiResponse = (res) => {
    const result = {
        id: res.data[0].id,
        ...res.data[0].attributes
    }
    
    return result
}

export { flattenStrapiResponse }