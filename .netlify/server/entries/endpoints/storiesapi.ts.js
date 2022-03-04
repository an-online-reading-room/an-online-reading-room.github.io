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
  get: () => get
});
const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, "");
  str = str.toLowerCase();
  const from = "\xE0\xE1\xE4\xE2\xE8\xE9\xEB\xEA\xEC\xED\xEF\xEE\xF2\xF3\xF6\xF4\xF9\xFA\xFC\xFB\xF1\xE7\xB7/_,:;";
  const to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }
  str = str.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
  return str;
};
async function get() {
  console.log(`${"https://strapi-t300.onrender.com"}/api/stories?populate=author,categories,annotations`);
  const res = await fetch(`${"https://strapi-t300.onrender.com"}/api/stories?populate=author,categories,annotations`);
  let data = await res.json();
  data = data.data.map((story) => {
    const author_name = story.attributes.author.data.attributes.username;
    return {
      id: story.id,
      title: story.attributes.title,
      submission: story.attributes.submission,
      location: story.attributes.location,
      description: story.attributes.description,
      author_name,
      url: slugify(author_name + "-" + story.attributes.title),
      categories: story.attributes.categories.data.map((category) => category.attributes.name),
      annotations: story.attributes.annotations.data.map((annotation) => {
        return {
          content: annotation.attributes.content,
          targetText: annotation.attributes.target,
          startOffset: annotation.attributes.startOffset,
          length: annotation.attributes.length,
          blockID: annotation.attributes.blockID
        };
      })
    };
  });
  return { body: data };
}
module.exports = __toCommonJS(stdin_exports);
