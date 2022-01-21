const htmlmin = require('html-minifier')
const svgContents = require("eleventy-plugin-svg-contents")

const now = String(Date.now())

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter("str", function(value) {
    return JSON.stringify(value)
  })

  eleventyConfig.addWatchTarget('./src/styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./src/styles/tailwind.css')
  eleventyConfig.addWatchTarget('./src/styles/extra.css')

  eleventyConfig.addPassthroughCopy({
    './src/assets/js/*': './assets/js/',
    './src/assets/img/*': './assets/img/',
    './node_modules/alpinejs/dist/cdn.js': './assets/js/alpine.js',
    './node_modules/lunr/lunr.js': './assets/js/lunr.js',
    './node_modules/@aha-app/netlify-flexsearch/index.js': './assets/js/flexsearch.js',
    './src/styles/extra.css': './extra.css'
  })

  eleventyConfig.addShortcode('version', function () {
    return now
  })

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith('.html')
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }

    return content
  })
  
  eleventyConfig.addPlugin(svgContents)

  return {
    // pathPrefix: '/reading-room-platform',
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: `_site`
    }
  }
}
