// TODO: relation fields do not get flattened
const flattenStrapiResponse = (res) => {
    const result = res.data.map(entity => {
        return {
            id: entity.id,
            ...entity.attributes   
        }
    })
    
    return result
}

export { flattenStrapiResponse }