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
  default: () => Map
});
var import_index_e8b4228d = require("../../../../chunks/index-e8b4228d.js");
const Map = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  return `<section class="${"px-14 font-display text-sm leading-4"}"><p>Before we take you outdoors, here\u2019s a quick introduction:</p></section>

<section class="${"px-8 font-display text-sm leading-4 flex flex-col items-center"}"><p>Our stories come to you through a choose your own adventure experience. We believe this will mimic how you experience the outdoor, that is, by choice.</p>
  <p>. <br> . <br> .</p>
  <p>This your map.</p>
  <img src="${"/img/map-intro.png"}" alt="${"This is your map!"}">
  <div class="${"flex flex-col gap-y-2"}"><p>It is unique to you.</p>
    <p>It plots all the stories on our website currently. </p>
    <p>Through this Choose Your Own Adventure Experience, you will traverse the map through choices you make.</p></div></section>

<footer class="${"font-display text-sm mt-auto underline pb-3"}"><a href="${"/adventure/map/story"}">Begin your journey.</a></footer>`;
});
module.exports = __toCommonJS(stdin_exports);
