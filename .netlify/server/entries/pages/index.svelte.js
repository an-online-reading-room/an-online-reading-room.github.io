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
  default: () => Routes
});
var import_index_e8b4228d = require("../../chunks/index-e8b4228d.js");
var import_Icon_79100828 = require("../../chunks/Icon-79100828.js");
const Routes = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex flex-col items-center w-screen h-screen bg-primary px-6 text-center"}"><div class="${"h-20 flex flex-col justify-center font-display"}"><h1 class="${"text-2xl"}">The Reading Room</h1></div>

  <div class="${"h-36 w-36"}">${(0, import_index_e8b4228d.v)(import_Icon_79100828.I, "Icon").$$render($$result, {
    src: "/icons/Home Illustration.svg",
    alt: "home illustration"
  }, {}, {})}</div>

  <div class="${"h-1/5 px-10 py-6 font-text text-xs leading-4 flex flex-col gap-y-3"}"><p class="${"pt-2"}">We suggest you choose the</p>
    <a href="${"/landing"}"><button class="${"font-display px-4 py-2 bg-black text-white"}">Lite Version
      </button></a>
    <p class="${"pt-2"}">if you have low bandwidth for a smoother experience.</p></div>

  <div class="${"py-8 font-display text-xxs"}"><p>For best experience use the adventure version</p></div>

  <div class="${"mt-auto pb-6 font-display text-xs"}"><p>Turn on sound for a more immersive experience</p></div></div>`;
});
module.exports = __toCommonJS(stdin_exports);
