/* global Backbone run CodeMirror */

"use strict";

const ALL_THEMES = [
    "3024-day",
    "3024-night",
    "abcdef",
    "ambiance-mobile",
    "ambiance",
    "ayu-dark",
    "ayu-mirage",
    "base16-dark",
    "base16-light",
    "bespin",
    "blackboard",
    "cobalt",
    "colorforth",
    "darcula",
    "dracula",
    "duotone-dark",
    "duotone-light",
    "eclipse",
    "erlang-dark",
    "gruvbox-dark",
    "hopscotch",
    "icecoder",
    "idea",
    "isotope",
    "lesser-dark",
    "liquibyte",
    "lucario",
    "material-darker",
    "material-ocean",
    "material-palenight",
    "material",
    "mbo",
    "mdn-like",
    "midnight",
    "monokai",
    "moxer",
    "neat",
    "neo",
    "night",
    "nord",
    "oceanic-next",
    "panda-syntax",
    "paraiso-dark",
    "paraiso-light",
    "pastel-on-dark",
    "railscasts",
    "rubyblue",
    "seti",
    "shadowfox",
    "solarized",
    "ssms",
    "the-matrix",
    "tomorrow-night-bright",
    "tomorrow-night-eighties",
    "ttcn",
    "twilight",
    "vibrant-ink",
    "xq-dark",
    "xq-light",
    "yeti",
    "yonce",
    "zenburn",
];

const GOOD_THEMES = [
    "neat",
    "3024-day",
    "abcdef",
    "ambiance",
    "ayu-dark",
    "ayu-mirage",
    "base16-light",
    "blackboard",
    "cobalt",
    "darcula",
    "duotone-dark",
    "duotone-light",
    "idea",
    "isotope",
    "lesser-dark",
    "mbo",
    "mdn-like",
    "midnight",
    "monokai",
    "nord",
    "oceanic-next",
    "panda-syntax",
    "paraiso-light",
    "rubyblue",
    "shadowfox",
    "solarized",
    "the-matrix",
    "tomorrow-night-eighties",
    "ttcn",
    "twilight",
    "vibrant-ink",
    "yonce",
    "zenburn",
];

// Breaks out of the content script context by injecting a specially
// constructed script tag and injecting it into the page.
const runInPageContext = (method, ...args) => {
    console.log("run in page context");
    // The stringified method which will be parsed as a function object.
    const stringifiedMethod =
    method instanceof Function ? method.toString() : `() => { ${method} }`;

    // The stringified arguments for the method as JS code that will reconstruct the array.
    const stringifiedArgs = JSON.stringify(args);

    // The full content of the script tag.
    const scriptContent = `
    // Parse and run the method with its arguments.
    (${stringifiedMethod})(...${stringifiedArgs});

    // Remove the script element to cover our tracks.
    document.currentScript.parentElement
      .removeChild(document.currentScript);
  `;

    // Create a script tag and inject it into the document.
    const scriptElement = document.createElement("script");
    scriptElement.innerHTML = scriptContent;
    document.documentElement.prepend(scriptElement);
};

function _until(conditionFunction) {
    const poll = (resolve) => {
        console.log("waiting ...");
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
    };

    return new Promise(poll);
}

function vim_init() {
    CodeMirror.Vim.defineEx("q", null, function (_cm) {
        Backbone.trigger("key:cancel");
    });
    CodeMirror.Vim.defineEx("wq", null, function (_cm) {
        Backbone.trigger("key:save");
    });
    CodeMirror.Vim.defineEx("w", null, function (_cm) {
        Backbone.trigger("key:save");
        Backbone.trigger("key:edit");
    });
    CodeMirror.Vim.map("jk", "<Esc>l", "insert");
}

async function waitForRun() {
    await _until(() => typeof run !== "undefined");

    run(
        {
            theme: "default",
            keyMap: "vim",
            themes: GOOD_THEMES,
            themeIdx: 0,
        },
        vim_init
    );
}

// window.wrappedJSObject.Backbone.trigger("key:edit");
// window.wrappedJSObject.Backbone.on("card:edit", (id) => {
//     console.log("test edit" + id);
// });

// window.wrappedJSObject.Backbone.on("card:edit", (id) => {
//     console.log(id);
// });

// window.wrappedJSObject.Backbone.trigger("key:edit");
// var unsafeWindow = window.wrappedJSObject;
//
//
//

{
    const s = document.createElement("script");
    const b = new Blob(["console.log(CodeMirror)"], { type: "text/javascript" });
    const u = URL.createObjectURL(b);
    s.src = u;
    document.body.appendChild(s);
    document.body.removeChild(s);
    URL.revokeObjectURL(u);
}

// unsafeWindow.Backbone.on("card:edit", (id) => {
//     console.log(id);
// });

// clonedBackbone = unsafeWindow.cloned_object = cloneInto(Backbone,

// function start() {
//     waitForRun();
// }
//
// runInPageContext(start);
