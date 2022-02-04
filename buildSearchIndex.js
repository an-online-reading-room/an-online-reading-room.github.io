const createSearchIndex = require('@aha-app/netlify-flexsearch/createSearchIndex');
const stories = require('./src/_data/stories')()

const searchData = {}
stories
.then(data => {
  data.forEach(story => {
    searchData[story.id] = {
      text: story.submission,
      response: {
        id: story.id
      }
    }
  })
})

// console.log(searchData)

createSearchIndex({
  index: 'story',
  data: searchData,
  functionsPath: 'src/functions'
});