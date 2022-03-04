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
  default: () => _layout
});
var import_index_e8b4228d = require("../../chunks/index-e8b4228d.js");
var app = "";
var extra = "";
const _layout = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>
    The Reading Room
  </title>`, ""}<meta charset="${"UTF-8"}" data-svelte="svelte-xxxolw"><meta name="${"description"}" content="${""}" data-svelte="svelte-xxxolw"><meta http-equiv="${"x-ua-compatible"}" content="${"ie=edge"}" data-svelte="svelte-xxxolw"><meta name="${"viewport"}" content="${"width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"}" data-svelte="svelte-xxxolw"><link rel="${"preconnect"}" href="${"https://fonts.googleapis.com"}" data-svelte="svelte-xxxolw"><link rel="${"preconnect"}" href="${"https://fonts.gstatic.com"}" crossorigin data-svelte="svelte-xxxolw"><link href="${"https://fonts.googleapis.com/css2?family=Courier+Prime&family=Karla:wght@400;500;700&display=swap"}" rel="${"stylesheet"}" data-svelte="svelte-xxxolw">`, ""}


<main class="${"h-screen font-display bg-primary"}">${slots.default ? slots.default({}) : ``}</main>`;
});
module.exports = __toCommonJS(stdin_exports);
