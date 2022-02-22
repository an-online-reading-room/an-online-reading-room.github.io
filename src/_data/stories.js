const axios = require('axios').default
const qs = require('qs')
const slugify = require('../filters/slugify')
require('dotenv').config()

async function getStories() {
  try {
    const res = await axios.get(`${process.env.API_URL}/stories?`, {
      params: {
        populate: ['author', 'categories']
      },
      paramsSerializer(params) {
        return qs.stringify(params)
      },
    })
    const stories = res.data.data
    const data = stories.map(story => {
      // console.log(story)
      return {
        id: story.id,
        title: story.attributes.title,
        location: story.attributes.location,
        submission: story.attributes.submission,
        author_name: story.attributes.author.data ? 
                      story.attributes.author.data.attributes.username :
                      '',
        url: slugify(story.attributes.title)
      }
    })
    // console.log(data)
    return data
  } catch(err) {
    console.log(err)
  }
}

module.exports = getStories