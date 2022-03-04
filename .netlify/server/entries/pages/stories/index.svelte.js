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
  default: () => Stories,
  load: () => load
});
var import_index_e8b4228d = require("../../../chunks/index-e8b4228d.js");
var import_visited_c48f6d51 = require("../../../chunks/visited-c48f6d51.js");
var import_index_61aa8da2 = require("../../../chunks/index-61aa8da2.js");
const load = async ({ params, fetch, session, stuff }) => {
  const stories = await fetch("/storiesapi");
  const tags = await fetch("/tagsapi");
  let storiesData = await stories.json();
  let tagsData = await tags.json();
  return {
    props: {
      listItems: storiesData,
      stories: storiesData,
      tags: tagsData.slice(0, 6)
    }
  };
};
const Stories = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  let $visited, $$unsubscribe_visited;
  $$unsubscribe_visited = (0, import_index_e8b4228d.d)(import_visited_c48f6d51.v, (value) => $visited = value);
  let { listItems, stories, tags } = $$props;
  let query = "";
  if ($$props.listItems === void 0 && $$bindings.listItems && listItems !== void 0)
    $$bindings.listItems(listItems);
  if ($$props.stories === void 0 && $$bindings.stories && stories !== void 0)
    $$bindings.stories(stories);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0)
    $$bindings.tags(tags);
  $$unsubscribe_visited();
  return `
<main class="${"flex flex-col align-items-center gap-y-4 px-4 h-full"}"><div class="${"flex flex-row justify-between w-full gap-x-base divide-x border"}"><input type="${"search"}" name="${"search-query"}" placeholder="${"Search for a story"}" class="${"flex-1 py-1 bg-primary text-sm px-2 focus:outline-none"}"${(0, import_index_e8b4228d.a)("value", query, 0)}>
			<button class="${"w-8 h-8 bg-primary focus:outline-none"}"><svg viewBox="${"0 0 40 40"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><circle cx="${"19"}" cy="${"19"}" r="${"7"}" stroke="${"#000002"}" stroke-width="${"1.5"}"></circle><path d="${"M28 28L25 25"}" stroke="${"#000002"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}"></path></svg></button></div>
		
		<div class="${"list-container flex-1 overflow-y-scroll pb-4 flex flex-col gap-y-4"}">${listItems.length ? (0, import_index_e8b4228d.b)(listItems, (story) => {
    return `<div><a href="${"/stories/" + (0, import_index_e8b4228d.e)(story.url)}"><div class="${"px-3 py-3 w-full border border-black border-1 text-center font-text inline-flex flex-col gap-y-1 " + (0, import_index_e8b4228d.e)($visited.includes(story.id) == true ? "bg-accent text-primary" : "bg-primary")}"><div class="${"text-base font-display"}"><h1>${(0, import_index_e8b4228d.e)(story.title)}</h1></div>
						<div class="${"text-sm"}"><p>${(0, import_index_e8b4228d.e)(story.author_name)}</p></div>
						<div class="${"text-sm"}"><p>${(0, import_index_e8b4228d.e)(story.location)}</p></div>
						<div class="${"text-sm"}"><p>${(0, import_index_e8b4228d.e)(story.description)}</p></div>
						
						
					</div></a>
			</div>`;
  }) : `<p class="${"font-display text-xs text-left"}">sorry, we could&#39;nt find what you were looking for
			</p>`}</div></main>


<div class="${"flex flex-col divide-y"}">${``}

	<button${(0, import_index_e8b4228d.a)("class", "absolute inset-x-0 bottom-0 w-full h-8 focus:outline-none bg-primary border-t", 0)}>Filters
	</button></div>`;
});
module.exports = __toCommonJS(stdin_exports);
