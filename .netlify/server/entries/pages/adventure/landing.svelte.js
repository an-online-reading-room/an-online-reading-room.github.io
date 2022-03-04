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
  default: () => Landing
});
var import_index_e8b4228d = require("../../../chunks/index-e8b4228d.js");
var import_Icon_79100828 = require("../../../chunks/Icon-79100828.js");
const Landing = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"h-36 w-36 py-2 self-center"}">${(0, import_index_e8b4228d.v)(import_Icon_79100828.I, "Icon").$$render($$result, {
    src: "/icons/Home Illustration.svg",
    alt: "home illustration"
  }, {}, {})}</div>

<section class="${"py-6 px-4 flex flex-col gap-y-2 font-display text-sm leading-4"}"><p>The Reading Room is an online platform for location-based storytelling.</p>
  <p>Our contributors come from across the world.  Join us and tell us your story, or go forth and discover stories that could make you fall in love with where you live. </p></section>

<section class="${"font-text text-xs"}"><p>Click <a class="${"underline"}" href="${"/adventure/listener"}">here</a> to get started.</p></section>

<footer class="${"mt-auto pb-3 font-text text-xs"}"><p>Click <a class="${"underline"}" href="${"/storyteller"}">here</a> if you are a storyteller.</p></footer>`;
});
module.exports = __toCommonJS(stdin_exports);
