const htmlmin = require('html-minifier')
const svgContents = require("eleventy-plugin-svg-contents")
const svelte = require('./src/shortcodes/svelte')

const now = String(Date.now())

module.exports = function (eleventyConfig) {
  eleventyConfig.addNunjucksFilter("str", function(value) {
    return JSON.stringify(value)
  })
  eleventyConfig.addNunjucksAsyncShortcode('svelte', svelte)

  eleventyConfig.addWatchTarget('./src/styles/tailwind.config.js')
  eleventyConfig.addWatchTarget('./src/styles/tailwind.css')
  eleventyConfig.addWatchTarget('./src/styles/extra.css')
  eleventyConfig.addWatchTarget('./src/svelte/**/*.(js|svelte)')

  eleventyConfig.addPassthroughCopy({
    './src/assets/js/*': './assets/js/',
    './src/assets/img/*': './assets/img/',
    './node_modules/alpinejs/dist/cdn.js': './assets/js/alpine.js',
    './node_modules/lunr/lunr.js': './assets/js/lunr.js',
    './node_modules/@aha-app/netlify-flexsearch/index.js': './assets/js/flexsearch.js',
    './src/styles/extra.css': './extra.css',
    './src/styles/annotator.min.css': './annotator.min.css',
    './src/styles/annotator.touch.css': './annotator.touch.css',
    './src/styles/richText-annotator.css': './richText-annotator.css',
    './src/assets/js/skins/lightgray/content.min.css': './content.min.css',
    './src/assets/js/skins/lightgray/skin.min.css': './skin.min.css',

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
