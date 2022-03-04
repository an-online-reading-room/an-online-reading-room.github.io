var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Story,
  load: () => load
});
var import_index_e8b4228d = require("../../../../chunks/index-e8b4228d.js");
var import_visited_c48f6d51 = require("../../../../chunks/visited-c48f6d51.js");
var import_index_61aa8da2 = require("../../../../chunks/index-61aa8da2.js");
var popup = "";
const Popup = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  let { popupElement } = $$props;
  let { storyName } = $$props;
  let { storyUrl } = $$props;
  if ($$props.popupElement === void 0 && $$bindings.popupElement && popupElement !== void 0)
    $$bindings.popupElement(popupElement);
  if ($$props.storyName === void 0 && $$bindings.storyName && storyName !== void 0)
    $$bindings.storyName(storyName);
  if ($$props.storyUrl === void 0 && $$bindings.storyUrl && storyUrl !== void 0)
    $$bindings.storyUrl(storyUrl);
  return `<section class="${"text-center font-text text-sm leading-4 bg-accent text-primary relative"}"${(0, import_index_e8b4228d.a)("this", popupElement, 0)}><a${(0, import_index_e8b4228d.a)("href", storyUrl, 0)}><p class="${"underline text-primary"}">${(0, import_index_e8b4228d.e)(storyName)}</p></a>

  <p>You have already viewed this story</p>

  <a${(0, import_index_e8b4228d.a)("href", storyUrl, 0)}><button class="${"px-3 py-2 bg-black text-white font-display"}">Visit the story again!
    </button></a></section>`;
});
const load = async ({ params, fetch, session, stuff }) => {
  const stories = await fetch("/storiesapi");
  let storiesData = await stories.json();
  return { props: { stories: storiesData } };
};
const Story = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_visited;
  $$unsubscribe_visited = (0, import_index_e8b4228d.d)(import_visited_c48f6d51.v, (value) => value);
  let { stories } = $$props;
  let travelledDistance = 0;
  if ($$props.stories === void 0 && $$bindings.stories && stories !== void 0)
    $$bindings.stories(stories);
  $$unsubscribe_visited();
  return `<div class="${"hidden"}">${stories.length ? (0, import_index_e8b4228d.b)(stories, (story) => {
    return `<div id="${(0, import_index_e8b4228d.e)(story.url) + "-popup-visited"}">${(0, import_index_e8b4228d.v)(Popup, "Popup").$$render($$result, {
      storyUrl: "/stories/" + story.url,
      storyName: story.title,
      popupElement: globalThis
    }, {}, {})}
    </div>`;
  }) : `<p class="${"font-display text-xs text-left"}">sorry, we could&#39;nt find what you were looking for
    </p>`}

  <div id="${"popup-unvisited"}" class="${"font-text text-sm text-primary text-center leading-4"}"><p>You have not viewed this story</p>
    <p>We hope you find it soon!</p></div></div>

<section id="${"map"}" class="${"h-full z-10"}"></section>

<section class="${"absolute inset-x-0 bottom-0 z-50 p-2 bg-accent text-primary font-text text-sm"}"><p>You have travelled ${(0, import_index_e8b4228d.e)(travelledDistance)}km on your journey</p></section>`;
});
module.exports = __toCommonJS(stdin_exports);
