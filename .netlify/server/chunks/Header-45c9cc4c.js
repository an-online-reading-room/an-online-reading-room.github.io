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
  H: () => Header
});
var import_index_e8b4228d = require("./index-e8b4228d.js");
var import_index_61aa8da2 = require("./index-61aa8da2.js");
const defaultValue = "lite";
const stored = defaultValue;
const version = (0, import_index_61aa8da2.w)(stored);
version.subscribe((value) => {
});
const Header = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  let pathPrefix;
  let $version, $$unsubscribe_version;
  $$unsubscribe_version = (0, import_index_e8b4228d.d)(version, (value) => $version = value);
  let currentVersion = $version;
  version.subscribe((value) => currentVersion = value);
  pathPrefix = currentVersion === "lite" ? "" : "/adventure";
  $$unsubscribe_version();
  return `<header><div><div class="${"flex-initial flex flex-row justify-between gap-x-2 pt-4 px-4"}">
      ${``}
      
      
      <a${(0, import_index_e8b4228d.a)("href", pathPrefix + "/landing", 0)}><h1 class="${"text-2xl"}">The Reading Room</h1></a>
      
      <button class="${"w-8 h-8 focus:outline-none ml-auto"}"><svg viewBox="${"0 0 40 40"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><circle cx="${"20"}" cy="${"20"}" r="${"19.25"}" fill="${"#BC6E4D"}"></circle></svg></button>
      <button class="${"w-8 h-8 focus:outline-none"}"><svg viewBox="${"0 0 40 40"}" fill="${"none"}" xmlns="${"http://www.w3.org/2000/svg"}"><circle cx="${"20"}" cy="${"20"}" r="${"19.25"}" stroke="${"black"}" stroke-width="${"1.5"}"></circle><path d="${"M12 13H28"}" stroke="${"black"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}"></path><path d="${"M12 20H28"}" stroke="${"black"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}"></path><path d="${"M12 27H28"}" stroke="${"black"}" stroke-width="${"1.5"}" stroke-linecap="${"round"}"></path></svg></button></div></div></header>`;
});
module.exports = __toCommonJS(stdin_exports);
