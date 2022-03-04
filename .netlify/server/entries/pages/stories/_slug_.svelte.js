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
  default: () => U5Bslugu5D,
  load: () => load
});
var import_index_e8b4228d = require("../../../chunks/index-e8b4228d.js");
var import_Icon_79100828 = require("../../../chunks/Icon-79100828.js");
var import_index_61aa8da2 = require("../../../chunks/index-61aa8da2.js");
const selection = (0, import_index_61aa8da2.w)({});
const TextSelection = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  let { readerID } = $$props;
  let { storyID } = $$props;
  let selectionControls, annotationTextControl;
  selection.subscribe((value) => value);
  if ($$props.readerID === void 0 && $$bindings.readerID && readerID !== void 0)
    $$bindings.readerID(readerID);
  if ($$props.storyID === void 0 && $$bindings.storyID && storyID !== void 0)
    $$bindings.storyID(storyID);
  return `<section class="${"hidden"}"><span id="${"selection-controls"}"${(0, import_index_e8b4228d.a)("this", selectionControls, 0)}><section class="${"arrow-up"}"></section>
    <main class="${"flex flex-col p-2 text-primary bg-accent underline"}"><section><textarea class="${"bg-accent text-primary placeholder:text-primary focus:outline-none overflow-hidden w-full"}" name="${"annotation"}" id="${"annotation"}" placeholder="${"Leave a comment"}" rows="${"2"}" cols="${"30"}" wrap="${"soft"}">${""}</textarea></section>
      <section class="${"flex flex-row-reverse items-center"}"><button>${(0, import_index_e8b4228d.v)(import_Icon_79100828.I, "Icon").$$render($$result, {
    src: "/icons/Highlight - Send Icon.svg",
    alt: "send icon"
  }, {}, {})}</button></section></main></span>

  <div id="${"selection-text-annotation"}"${(0, import_index_e8b4228d.a)("this", annotationTextControl, 0)}><main style="${"background-color: red"}"><input type="${"text"}" name="${"annotation"}" id="${"annotation"}">
      <button>annotate</button></main></div></section>`;
});
const load = async ({ params, fetch, session, stuff }) => {
  const { slug } = params;
  const res = await fetch("/storiesapi");
  if (res.status === 404) {
    const error = new Error(`The post with ID ${slug} was not found`);
    return { status: 404, error };
  } else {
    let data = await res.json();
    data = data.find((story) => story.url === slug);
    return { props: { story: data } };
  }
};
const U5Bslugu5D = (0, import_index_e8b4228d.c)(($$result, $$props, $$bindings, slots) => {
  let { story } = $$props;
  let reader, scrollWindow;
  let cnv;
  if ($$props.story === void 0 && $$bindings.story && story !== void 0)
    $$bindings.story(story);
  return `<div class="${"flex flex-col align-items-center gap-y-4 w-screen h-full bg-primary text-center relative"}"><div class="${"overflow-y-scroll flex-1 flex flex-col align-items-center gap-y-2 font-display text-left mx-4 relative"}"${(0, import_index_e8b4228d.a)("this", scrollWindow, 0)}><div class="${"px-1 text-base border"}">${(0, import_index_e8b4228d.e)(story.title)}</div>

    <div class="${"flex-1 text-sm border flex flex-col relative"}"><div id="${"reader"}"${(0, import_index_e8b4228d.a)("class", "p-2", 0)}${(0, import_index_e8b4228d.a)("this", reader, 0)}>${(0, import_index_e8b4228d.b)(story.submission.blocks, (block) => {
    return `<section${(0, import_index_e8b4228d.a)("id", "target-" + block.id, 0)}>${(0, import_index_e8b4228d.e)(block.data.text)}</section>`;
  })}</div>

      <div class="${"ml-auto mt-auto"}">${`${`${`<button>${(0, import_index_e8b4228d.v)(import_Icon_79100828.I, "Icon").$$render($$result, {
    src: "/icons/Comment Button - White on Black.svg",
    alt: "show comments"
  }, {}, {})}</button>`}`}`}</div>

      
      <section id="${"drawing-board"}" class="${"hidden absolute left-0 top-0"}"><button class="${"absolute right-0 top-0 w-4 h-4 m-1"}">${(0, import_index_e8b4228d.v)(import_Icon_79100828.I, "Icon").$$render($$result, {
    src: "/icons/Close Button - Black.svg",
    alt: "comment - close"
  }, {}, {})}</button>
        <canvas${(0, import_index_e8b4228d.a)("this", cnv, 0)}>your browser does not support the canvas
        </canvas></section></div></div>

  
  <section id="${"comment-board"}" class="${"hidden"}">${(0, import_index_e8b4228d.b)(story.annotations, (annotation) => {
    return `<section${(0, import_index_e8b4228d.a)("class", `absolute bg-accent text-primary p-2`, 0)}${(0, import_index_e8b4228d.a)("id", "anno-" + annotation.blockID, 0)}><p>${(0, import_index_e8b4228d.e)(annotation.content)}</p>
    </section>`;
  })}</section>
  

  

  ${``}

  ${``}


  <div${(0, import_index_e8b4228d.a)("class", "flex-initial flex flex-row justify-around py-2 px-4 bg-primary", 0)} style="${"border-top: black 1.5px solid;"}"><a href="${"/stories"}">${`<div class="${"w-4 h-4"}">${(0, import_index_e8b4228d.v)(import_Icon_79100828.I, "Icon").$$render($$result, {
    src: "/icons/Back Icon - Black.svg",
    alt: "back icon"
  }, {}, {})}</div>`}</a>

    <div>${`<div class="${"w-4 h-4"}">${(0, import_index_e8b4228d.v)(import_Icon_79100828.I, "Icon").$$render($$result, {
    src: "/icons/Info Icon - Black.svg",
    alt: "info icon"
  }, {}, {})}</div>`}</div>

    <div>${`<div class="${"w-4 h-4"}">${(0, import_index_e8b4228d.v)(import_Icon_79100828.I, "Icon").$$render($$result, {
    src: "/icons/Large Share Icon - Black.svg",
    alt: "share icon"
  }, {}, {})}</div>`}</div></div></div>

${(0, import_index_e8b4228d.v)(TextSelection, "TextSelection").$$render($$result, { readerID: "reader", storyID: story.id }, {}, {})}`;
});
module.exports = __toCommonJS(stdin_exports);
