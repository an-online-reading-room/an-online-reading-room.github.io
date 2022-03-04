var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
var stdin_exports = {};
__export(stdin_exports, {
  manifest: () => manifest
});
const manifest = {
  appDir: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.png", "icons/Annotation Close Icon - Green.svg", "icons/Back Icon - Black.svg", "icons/Back Icon - White.svg", "icons/Close Button - Black.svg", "icons/Close Icon - Black.svg", "icons/Close Icon - White.svg", "icons/Comment - Delete Icon.svg", "icons/Comment - Draw Icon.svg", "icons/Comment - Highlight Icon.svg", "icons/Comment - Link Icon.svg", "icons/Comment - Save Icon.svg", "icons/Comment - Text Icon.svg", "icons/Comment Button - White on Black.svg", "icons/Comment Icon - Black.svg", "icons/Comments - Close Icon.svg", "icons/Highlight - Send Icon.svg", "icons/Home Icon - Black.svg", "icons/Home Icon - White.svg", "icons/Home Illustration.svg", "icons/Info Icon - Black.svg", "icons/Info Icon - White.svg", "icons/Large Share Icon -  White.svg", "icons/Large Share Icon - Black.svg", "icons/Large Share Icon - White.svg", "icons/Menu Hamburger Icon - Black.svg", "icons/Next Icon - Black.svg", "icons/Search Icon - Black.svg", "icons/Search Icon - White.svg", "icons/Share - Email Icon.svg", "icons/Share - Instagram Icon.svg", "icons/Share - Message Icon.svg", "icons/Share - URL Icon.svg", "icons/Share - WhatsApp Icon.svg", "icons/Share Icon - Black.svg", "icons/Small Back Icon - White.svg", "icons/Small Next Icon - Black.svg", "icons/Small Next Icon - White.svg", "icons/Small Share Icon -  White.svg", "icons/Small Share Icon - Black.svg", "img/map-intro.png", "img/story-unvisited.png", "img/story-visited.png", "libs/annotator/annotator-full.min.js", "libs/annotator/annotator.min.css", "libs/annotator/annotator.touch.css", "libs/annotator/annotator.touch.js", "libs/annotator/annotator.touch.min.js", "libs/recogito.min.js"]),
  _: {
    mime: { ".png": "image/png", ".svg": "image/svg+xml", ".js": "application/javascript", ".css": "text/css" },
    entry: { "file": "start-49fe1920.js", "js": ["start-49fe1920.js", "chunks/vendor-acc2b058.js", "chunks/preload-helper-ec9aa979.js"], "css": [] },
    nodes: [
      () => Promise.resolve().then(() => __toESM(require("./nodes/0.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/1.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/2.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/3.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/4.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/5.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/6.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/7.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/8.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/9.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/10.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/11.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/12.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/13.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/14.js"))),
      () => Promise.resolve().then(() => __toESM(require("./nodes/15.js")))
    ],
    routes: [
      {
        type: "page",
        pattern: /^\/$/,
        params: null,
        path: "/",
        shadow: null,
        a: [0, 2],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/storybuilder\/?$/,
        params: null,
        path: "/storybuilder",
        shadow: null,
        a: [0, 3],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/storyteller\/?$/,
        params: null,
        path: "/storyteller",
        shadow: null,
        a: [0, 4],
        b: [1]
      },
      {
        type: "endpoint",
        pattern: /^\/storiesapi\/?$/,
        params: null,
        load: () => Promise.resolve().then(() => __toESM(require("./entries/endpoints/storiesapi.ts.js")))
      },
      {
        type: "page",
        pattern: /^\/adventure\/?$/,
        params: null,
        path: "/adventure",
        shadow: null,
        a: [0, 5, 6],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/adventure\/listener\/?$/,
        params: null,
        path: "/adventure/listener",
        shadow: null,
        a: [0, 5, 7],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/adventure\/landing\/?$/,
        params: null,
        path: "/adventure/landing",
        shadow: null,
        a: [0, 5, 8],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/adventure\/map\/?$/,
        params: null,
        path: "/adventure/map",
        shadow: null,
        a: [0, 5, 9],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/adventure\/map\/story\/?$/,
        params: null,
        path: "/adventure/map/story",
        shadow: null,
        a: [0, 5, 10],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/landing\/?$/,
        params: null,
        path: "/landing",
        shadow: null,
        a: [0, 11],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/prompts\/?$/,
        params: null,
        path: "/prompts",
        shadow: null,
        a: [0, 12],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/stories\/?$/,
        params: null,
        path: "/stories",
        shadow: null,
        a: [0, 13, 14],
        b: [1]
      },
      {
        type: "page",
        pattern: /^\/stories\/([^/]+?)\/?$/,
        params: (m) => ({ slug: m[1] }),
        path: null,
        shadow: null,
        a: [0, 13, 15],
        b: [1]
      },
      {
        type: "endpoint",
        pattern: /^\/tagsapi\/?$/,
        params: null,
        load: () => Promise.resolve().then(() => __toESM(require("./entries/endpoints/tagsapi.ts.js")))
      }
    ]
  }
};
module.exports = __toCommonJS(stdin_exports);
