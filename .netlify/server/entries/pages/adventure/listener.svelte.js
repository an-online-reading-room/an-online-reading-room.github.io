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
  default: () => Listener
});
var import_index_e8b4228d = require("../../../chunks/index-e8b4228d.js");
var import_Icon_79100828 = require("../../../chunks/Icon-79100828.js");
const Listener = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"h-36 w-36 py-2 self-center"}">${(0, import_index_e8b4228d.v)(import_Icon_79100828.I, "Icon").$$render($$result, {
    src: "/icons/Home Illustration.svg",
    alt: "home illustration"
  }, {}, {})}</div>

<section class="${"py-6 px-10 flex flex-col gap-y-3 font-text text-sm leading-4"}"><div class="${"flex flex-col gap-y-2"}"><div><p>Welcome to</p>
      <p>The Reading Room!</p></div>
    <p>where we save kings, fight demons, and find treasures\u2026</p>
    <p>not those kind of treasures</p></div>
  <div class="${"flex flex-col gap-y-2"}"><p>The real treasure is connecting with people</p>
    <p>When was the last time you explored your outdoors?</p></div></section>

<section class="${"py-2 px-4 flex flex-col items-center items-center font-text text-sm leading-4"}"><ul class="${"underline list-disc text-left flex flex-col gap-y-3"}"><li><a href="${"/adventure/map"}">just yesterday</a></li>
    <li><a href="${"/adventure/map"}">last month</a></li>
    <li><a href="${"/adventure/map"}">it&#39;s been years</a></li></ul></section>`;
});
module.exports = __toCommonJS(stdin_exports);
