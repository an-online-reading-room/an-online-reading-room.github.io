const createSearchIndex = require('@aha-app/netlify-flexsearch/createSearchIndex');
const stories = require('./src/_data/_stories')

const searchData = {}
stories.forEach(story => {
  searchData[story.id] = {
    text: story.description,
    response: {
      id: story.id
    }
  }
})
// console.log(searchData)

createSearchIndex({
  index: 'story',
  data: searchData,
  functionsPath: 'src/functions'
});