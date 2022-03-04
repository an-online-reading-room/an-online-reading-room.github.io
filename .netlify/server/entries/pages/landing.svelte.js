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
var import_index_e8b4228d = require("../../chunks/index-e8b4228d.js");
var import_Header_45c9cc4c = require("../../chunks/Header-45c9cc4c.js");
var import_Icon_79100828 = require("../../chunks/Icon-79100828.js");
var import_index_61aa8da2 = require("../../chunks/index-61aa8da2.js");
const Landing = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex flex-col align-items-center gap-y-4 w-screen h-screen bg-base text-center"}">${(0, import_index_e8b4228d.v)(import_Header_45c9cc4c.H, "Header").$$render($$result, {}, {}, {})}

  <div class="${"h-36 w-36 py-2 self-center"}">${(0, import_index_e8b4228d.v)(import_Icon_79100828.I, "Icon").$$render($$result, {
    src: "/icons/Home Illustration.svg",
    alt: "home illustration"
  }, {}, {})}</div>

  <div class="${"h-1/5 py-6 px-4 flex flex-col gap-y-2 font-display text-sm leading-4"}"><p>The Reading Room is an online platform for location-based storytelling.</p>
    <p>Our contributors come from across the world.  Join us and tell us your story, or go forth and discover stories that could make you fall in love with where you live. </p></div>

  <div class="${"py-8 px-4 font-display text-xs"}"><p class="${"font-text"}">Are you a listener or a storyteller?</p>
    <div class="${"flex justify-evenly px-8 py-2"}"><a href="${"/stories"}"><button class="${"font-display text-sm px-4 py-2 bg-black text-white"}">Listener
        </button></a>
      <a href="${"/storyteller"}"><button class="${"font-display text-sm px-4 py-2 bg-black text-white"}">Storyteller
        </button></a></div></div></div>`;
});
module.exports = __toCommonJS(stdin_exports);
