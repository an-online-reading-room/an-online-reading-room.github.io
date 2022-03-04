const { init } = require('../handler.js');

exports.handler = init({
	appDir: "_app",
	assets: new Set(["favicon.png","icons/Annotation Close Icon - Green.svg","icons/Back Icon - Black.svg","icons/Back Icon - White.svg","icons/Close Button - Black.svg","icons/Close Icon - Black.svg","icons/Close Icon - White.svg","icons/Comment - Delete Icon.svg","icons/Comment - Draw Icon.svg","icons/Comment - Highlight Icon.svg","icons/Comment - Link Icon.svg","icons/Comment - Save Icon.svg","icons/Comment - Text Icon.svg","icons/Comment Button - White on Black.svg","icons/Comment Icon - Black.svg","icons/Comments - Close Icon.svg","icons/Highlight - Send Icon.svg","icons/Home Icon - Black.svg","icons/Home Icon - White.svg","icons/Home Illustration.svg","icons/Info Icon - Black.svg","icons/Info Icon - White.svg","icons/Large Share Icon -  White.svg","icons/Large Share Icon - Black.svg","icons/Large Share Icon - White.svg","icons/Menu Hamburger Icon - Black.svg","icons/Next Icon - Black.svg","icons/Search Icon - Black.svg","icons/Search Icon - White.svg","icons/Share - Email Icon.svg","icons/Share - Instagram Icon.svg","icons/Share - Message Icon.svg","icons/Share - URL Icon.svg","icons/Share - WhatsApp Icon.svg","icons/Share Icon - Black.svg","icons/Small Back Icon - White.svg","icons/Small Next Icon - Black.svg","icons/Small Next Icon - White.svg","icons/Small Share Icon -  White.svg","icons/Small Share Icon - Black.svg","img/map-intro.png","img/story-unvisited.png","img/story-visited.png","libs/annotator/annotator-full.min.js","libs/annotator/annotator.min.css","libs/annotator/annotator.touch.css","libs/annotator/annotator.touch.js","libs/annotator/annotator.touch.min.js","libs/recogito.min.js"]),
	_: {
		mime: {".png":"image/png",".svg":"image/svg+xml",".js":"application/javascript",".css":"text/css"},
		entry: {"file":"start-c63c1c3d.js","js":["start-c63c1c3d.js","chunks/vendor-acc2b058.js","chunks/preload-helper-ec9aa979.js"],"css":[]},
		nodes: [
			() => Promise.resolve().then(() => require('../server/nodes/0.js')),
			() => Promise.resolve().then(() => require('../server/nodes/1.js')),
			() => Promise.resolve().then(() => require('../server/nodes/2.js')),
			() => Promise.resolve().then(() => require('../server/nodes/3.js')),
			() => Promise.resolve().then(() => require('../server/nodes/4.js')),
			() => Promise.resolve().then(() => require('../server/nodes/5.js')),
			() => Promise.resolve().then(() => require('../server/nodes/6.js')),
			() => Promise.resolve().then(() => require('../server/nodes/7.js')),
			() => Promise.resolve().then(() => require('../server/nodes/8.js')),
			() => Promise.resolve().then(() => require('../server/nodes/9.js')),
			() => Promise.resolve().then(() => require('../server/nodes/10.js')),
			() => Promise.resolve().then(() => require('../server/nodes/11.js')),
			() => Promise.resolve().then(() => require('../server/nodes/12.js')),
			() => Promise.resolve().then(() => require('../server/nodes/13.js')),
			() => Promise.resolve().then(() => require('../server/nodes/14.js')),
			() => Promise.resolve().then(() => require('../server/nodes/15.js'))
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/$/,
				params: null,
				path: "/",
				shadow: null,
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/storybuilder\/?$/,
				params: null,
				path: "/storybuilder",
				shadow: null,
				a: [0,3],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/storyteller\/?$/,
				params: null,
				path: "/storyteller",
				shadow: null,
				a: [0,4],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/storiesapi\/?$/,
				params: null,
				load: () => Promise.resolve().then(() => require('../server/entries/endpoints/storiesapi.ts.js'))
			},
			{
				type: 'page',
				pattern: /^\/adventure\/?$/,
				params: null,
				path: "/adventure",
				shadow: null,
				a: [0,5,6],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/adventure\/listener\/?$/,
				params: null,
				path: "/adventure/listener",
				shadow: null,
				a: [0,5,7],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/adventure\/landing\/?$/,
				params: null,
				path: "/adventure/landing",
				shadow: null,
				a: [0,5,8],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/adventure\/map\/?$/,
				params: null,
				path: "/adventure/map",
				shadow: null,
				a: [0,5,9],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/adventure\/map\/story\/?$/,
				params: null,
				path: "/adventure/map/story",
				shadow: null,
				a: [0,5,10],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/landing\/?$/,
				params: null,
				path: "/landing",
				shadow: null,
				a: [0,11],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/prompts\/?$/,
				params: null,
				path: "/prompts",
				shadow: null,
				a: [0,12],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/stories\/?$/,
				params: null,
				path: "/stories",
				shadow: null,
				a: [0,13,14],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^\/stories\/([^/]+?)\/?$/,
				params: (m) => ({ slug: m[1]}),
				path: null,
				shadow: null,
				a: [0,13,15],
				b: [1]
			},
			{
				type: 'endpoint',
				pattern: /^\/tagsapi\/?$/,
				params: null,
				load: () => Promise.resolve().then(() => require('../server/entries/endpoints/tagsapi.ts.js'))
			}
		]
	}
});
