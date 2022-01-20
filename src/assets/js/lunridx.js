async function getStories() {
  let stories = await fetch('/index.json')
  return await stories.json()
}

async function indexStories() {
  const stories = await getStories()

  console.log('indexing stories...')
  let idx = lunr(function() {
    this.ref('id')
    this.field('title')
    this.field('description')
  
    stories.forEach(story => {
      this.add(story)
    }, this)
  
    console.log('finished indexing')  
  })
  console.log(idx)
  return await idx
}

document.addEventListener('alpine:init', () => {

  Alpine.data("searchData", () => ({

    init() {
      fetch('/index.json')
      .then(response => response.json())
      .then(stories => {
        console.log('indexing stories...')
        let idx = lunr(function() {
          this.ref('id')
          this.field('title')
          this.field('description')
        
          stories.forEach(story => {
            this.add(story)
          }, this)
        
          console.log('finished indexing')  
        })
        console.log(idx.tokenList.toArray())
        let searchFn = (query) => {
          console.log('searching..')
          let result = this.idx.search(query).map(r => stories.find(s => s.id == r.ref))
          console.log(result)
          return result
        }

        return {
          lunrData: {
            idx: idx,
            searchFn: searchFn,
            get filteredItems() {
              return this.searchFn(this.query)
            }
          }
        }
      })
    },

    query: '',
    lunrData: {
      idx: null,
      searchFn: null,
      get filteredItems() {
        return []
      }
    },
     
  }))
  
})
