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
  default: () => Storybuilder
});
var import_index_e8b4228d = require("../../chunks/index-e8b4228d.js");
var import_Header_45c9cc4c = require("../../chunks/Header-45c9cc4c.js");
var import_index_61aa8da2 = require("../../chunks/index-61aa8da2.js");
const BASE_URL = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/`;
const getSuggestions = async (text) => {
  if (text === "")
    return new Promise((resolve) => resolve([]));
  const url = BASE_URL + `suggest?f=json&maxSuggestions=10&text=${text}`;
  const res = await (await fetch(url)).json();
  const places = await res.suggestions.map((place) => place.text);
  return places;
};
var form = "";
const Storybuilder = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  let form2;
  let locationInput = "";
  let locationSuggestions = [];
  {
    {
      getSuggestions(locationInput).then((data) => locationSuggestions = data);
    }
  }
  return `<div class="${"flex flex-col align-items-center gap-y-4 w-screen bg-primary text-center"}">${(0, import_index_e8b4228d.v)(import_Header_45c9cc4c.H, "Header").$$render($$result, {}, {}, {})}
  

  <main><form enctype="${"multipart/form-data"}" method="${"post"}" class="${"flex flex-col gap-4 px-4 py-8 font-text text-sm leading-4"}"${(0, import_index_e8b4228d.a)("this", form2, 0)}><fieldset><legend class="${"hidden"}">Title</legend>
        <input type="${"text"}" name="${"title"}" id="${"title"}" placeholder="${"Title"}" required class="${"w-full px-2 py-2 border placeholder:text-black"}"></fieldset>
  
      <fieldset><legend class="${"hidden"}">Author&#39;s Username</legend>
        <input type="${"text"}" name="${"username"}" id="${"username"}" placeholder="${"Author's Username"}" required class="${"w-full px-2 py-2 border placeholder:text-black"}"></fieldset>
  
      <fieldset><legend class="${"hidden"}">Location</legend>
        <input type="${"text"}" name="${"location"}" id="${"location"}" placeholder="${"Add Location"}" required class="${"w-full px-2 py-2 border placeholder:text-black"}" list="${"location-suggestions"}"${(0, import_index_e8b4228d.a)("value", locationInput, 0)}>
        <datalist id="${"location-suggestions"}">${(0, import_index_e8b4228d.b)(locationSuggestions, (suggestion) => {
    return `<option${(0, import_index_e8b4228d.a)("value", suggestion, 0)}>${(0, import_index_e8b4228d.e)(suggestion)} </option>`;
  })}</datalist></fieldset>

      <fieldset><legend class="${"hidden"}">Description</legend>
        <input type="${"text"}" name="${"description"}" id="${"desciption"}" placeholder="${"Brief description"}" maxlength="${"400"}" required class="${"w-full px-2 py-2 border placeholder:text-black"}"></fieldset>
  
      <section class="${"w-full placeholder:text-black"}" id="${"editor"}"></section>
      
      <button type="${"submit"}" class="${"mt-auto p-2 self-center text-white font-display text-xs bg-black"}">Submit
      </button></form></main></div>`;
});
module.exports = __toCommonJS(stdin_exports);
