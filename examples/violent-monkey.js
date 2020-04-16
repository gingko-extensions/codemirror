// ==UserScript==
// @name     gingko-codemirror
// @version  0.3.4
// @grant    GM_getResourceText
// @grant    GM_addStyle
// @resource CODEMIRROR_CSS https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.css
// @resource 3024-DAY https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/3024-day.min.css
// @resource 3024-NIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/3024-night.min.css
// @resource ABCDEF https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/abcdef.min.css
// @resource AMBIANCE-MOBILE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/ambiance-mobile.min.css
// @resource AMBIANCE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/ambiance.min.css
// @resource AYU-DARK https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/ayu-dark.min.css
// @resource AYU-MIRAGE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/ayu-mirage.min.css
// @resource BASE16-DARK https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/base16-dark.min.css
// @resource BASE16-LIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/base16-light.min.css
// @resource BESPIN https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/bespin.min.css
// @resource BLACKBOARD https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/blackboard.min.css
// @resource COBALT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/cobalt.min.css
// @resource COLORFORTH https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/colorforth.min.css
// @resource DARCULA https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/darcula.min.css
// @resource DRACULA https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/dracula.min.css
// @resource DUOTONE-DARK https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/duotone-dark.min.css
// @resource DUOTONE-LIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/duotone-light.min.css
// @resource ECLIPSE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/eclipse.min.css
// @resource ELEGANT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/elegant.min.css
// @resource ERLANG-DARK https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/erlang-dark.min.css
// @resource GRUVBOX-DARK https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/gruvbox-dark.min.css
// @resource HOPSCOTCH https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/hopscotch.min.css
// @resource ICECODER https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/icecoder.min.css
// @resource IDEA https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/idea.min.css
// @resource ISOTOPE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/isotope.min.css
// @resource LESSER-DARK https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/lesser-dark.min.css
// @resource LIQUIBYTE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/liquibyte.min.css
// @resource LUCARIO https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/lucario.min.css
// @resource MATERIAL-DARKER https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/material-darker.min.css
// @resource MATERIAL-OCEAN https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/material-ocean.min.css
// @resource MATERIAL-PALENIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/material-palenight.min.css
// @resource MATERIAL https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/material.min.css
// @resource MBO https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/mbo.min.css
// @resource MDN-LIKE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/mdn-like.min.css
// @resource MIDNIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/midnight.min.css
// @resource MONOKAI https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css
// @resource MOXER https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/moxer.min.css
// @resource NEAT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/neat.min.css
// @resource NEO https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/neo.min.css
// @resource NIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/night.min.css
// @resource NORD https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/nord.min.css
// @resource OCEANIC-NEXT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/oceanic-next.min.css
// @resource PANDA-SYNTAX https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/panda-syntax.min.css
// @resource PARAISO-DARK https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/paraiso-dark.min.css
// @resource PARAISO-LIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/paraiso-light.min.css
// @resource PASTEL-ON-DARK https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/pastel-on-dark.min.css
// @resource RAILSCASTS https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/railscasts.min.css
// @resource RUBYBLUE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/rubyblue.min.css
// @resource SETI https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/seti.min.css
// @resource SHADOWFOX https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/shadowfox.min.css
// @resource SOLARIZED https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/solarized.min.css
// @resource SSMS https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/ssms.min.css
// @resource THE-MATRIX https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/the-matrix.min.css
// @resource TOMORROW-NIGHT-BRIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/tomorrow-night-bright.min.css
// @resource TOMORROW-NIGHT-EIGHTIES https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/tomorrow-night-eighties.min.css
// @resource TTCN https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/ttcn.min.css
// @resource TWILIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/twilight.min.css
// @resource VIBRANT-INK https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/vibrant-ink.min.css
// @resource XQ-DARK https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/xq-dark.min.css
// @resource XQ-LIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/xq-light.min.css
// @resource YETI https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/yeti.min.css
// @resource YONCE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/yonce.min.css
// @resource ZENBURN https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/zenburn.min.css
// @resource DIALOG https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/dialog/dialog.min.css
// @resource MATCHESONSCROLLBAR https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/search/matchesonscrollbar.min.css
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/codemirror.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/mode/markdown/markdown.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/display/fullscreen.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/keymap/vim.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/dialog/dialog.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/search/jump-to-line.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/search/match-highlighter.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/search/search.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/search/searchcursor.min.js
// @require  https://cdn.jsdelivr.net/gh/gingko-extensions/codemirror@0.3.4/src/gingko-codemirror.js
// @include  https://gingkoapp.com/*
// @run-at   document-idle
// ==/UserScript==

/*
MIT License

Copyright (c) 2020 Jan Hermes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/* global run CodeMirror Backbone */

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
    "elegant",
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

// Styling of the CodeMirror section
const CSS_BASE = GM_getResourceText("CODEMIRROR_CSS");
GM_addStyle(CSS_BASE);

for (const theme of ALL_THEMES) {
    // console.log(theme);
    const css = GM_getResourceText(theme.toUpperCase());
    GM_addStyle(css);
}

const CSS_DIALOG = GM_getResourceText("DIALOG");
GM_addStyle(CSS_DIALOG);

// Make resizing possible and move the save-button
// downwards (only temporarily solution)
GM_addStyle(
    `
.CodeMirror-fullscreen {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  height: auto;
  z-index: 9;
}

.CodeMirror {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      resize: vertical;
      height: auto;
      /* overflow: auto !important; */
}
/*
.card .btn-image.btn-save {
  margin-top: 20px;
      margin-right: 20px !important;
}
*/
.card.card-active .btn-actions {
    margin-right: 20px !important;
    z-index: 9999;
}
/*
.CodeMirror-sizer {
  margin-bottom: 0 !important;
}
*/

`
);

function until(conditionFunction) {
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
    await until(() => typeof run !== "undefined");

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

// run on document loaded
(function () {
    // window.prompt("Choose your theme", "default");
    waitForRun();
})();
