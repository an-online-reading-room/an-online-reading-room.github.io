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
  default: () => Storyteller
});
var import_index_e8b4228d = require("../../chunks/index-e8b4228d.js");
var import_Header_45c9cc4c = require("../../chunks/Header-45c9cc4c.js");
var import_Icon_79100828 = require("../../chunks/Icon-79100828.js");
var import_index_61aa8da2 = require("../../chunks/index-61aa8da2.js");
const Storyteller = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex flex-col align-items-center gap-y-6 w-screen bg-primary text-center"}">${(0, import_index_e8b4228d.v)(import_Header_45c9cc4c.H, "Header").$$render($$result, {}, {}, {})}
  
  <div class="${"h-36 w-36 py-2 self-center"}">${(0, import_index_e8b4228d.v)(import_Icon_79100828.I, "Icon").$$render($$result, {
    src: "/icons/Home Illustration.svg",
    alt: "home illustration"
  }, {}, {})}</div>

  <main class="${"font-text text-sm leading-4 px-6"}"><section class="${"flex flex-col gap-y-6"}"><div><p>Welcome to</p>
        <p>The Reading Room!</p></div>
      <div><p>where you have full reign</p>
        <p>over your story\u2026</p>
        <p>and the experience</p>
        <p>you create with it.</p></div>
      <p>Go forth! Take us to your glorious sandbox.</p>
      <a href="${"/prompts"}"><p class="${"underline"}">What do I write about?</p></a>
      <a href="${"/storybuilder"}"><p class="${"underline"}">I have a story to tell</p></a></section></main></div>`;
});
module.exports = __toCommonJS(stdin_exports);
