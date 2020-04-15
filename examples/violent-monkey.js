// ==UserScript==
// @name     1_Codemirror-markdown
// @version  1
// @grant    GM_getResourceText
// @grant    GM_addStyle
// @resource CODEMIRROR_CSS https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.css
// @resource MDN_LIKE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/mdn-like.min.css
// @resource MONOKAI https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/monokai.min.css
// @resource ELEGANT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/elegant.min.css
// @resource BASE16_LIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/base16-light.min.css
// @resource MATERIAL_PALENIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/material-palenight.min.css
// @resource BESPIN https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/bespin.min.css
// @resource CODE_STYLE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/mdn-like.min.css
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
// @require  https://cdn.jsdelivr.net/gh/JanSurft/gingko-codemirror@0.1.0/src/gingko-codemirror.js
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

// Styling of the CodeMirror section
const cssTxt = GM_getResourceText("CODEMIRROR_CSS");
GM_addStyle(cssTxt);

let cssTheme = GM_getResourceText("BASE16_LIGHT");
GM_addStyle(cssTheme);

cssTheme = GM_getResourceText("MATERIAL_PALENIGHT");
GM_addStyle(cssTheme);

cssTheme = GM_getResourceText("BESPIN");
GM_addStyle(cssTheme);

cssTheme = GM_getResourceText("ELEGANT");
GM_addStyle(cssTheme);

cssTheme = GM_getResourceText("MDN_LIKE");
GM_addStyle(cssTheme);

cssTheme = GM_getResourceText("MONOKAI");
GM_addStyle(cssTheme);

const cssDialog = GM_getResourceText("DIALOG");
GM_addStyle(cssDialog);

// Make resizing possible and move the save-button
// downwards (only temporarily solution)
GM_addStyle(`
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
  
.card .btn-image.btn-save {
      margin-right: 20px;
}
.CodeMirror-sizer {
  margin-bottom: 0 !important;
}
`);

function vim_init() {
    CodeMirror.Vim.defineEx("q", null, function (_cm) {
    // cm.display.input.blur();
    // cm.toTextArea();
        Backbone.trigger("key:cancel");
    });
    CodeMirror.Vim.defineEx("wq", null, function (_cm) {
    // cm.save();
    // cm.display.input.blur();
    // cm.toTextArea();
        Backbone.trigger("key:save");
    });
    CodeMirror.Vim.defineEx("w", null, function (_cm) {
        Backbone.trigger("key:save");
        Backbone.trigger("key:edit");
    });
    CodeMirror.Vim.map("jk", "<Esc>l", "insert");

    CodeMirror.Vim.map(",s", ":w<CR><Esc>", "insert");
}

// run on document loaded
(function () {
    // window.prompt("Choose your theme", "default");

    run(
        {
            theme: "default",
            keyMap: "vim",
            themes: [
                "default",
                "monokai",
                "base16-light",
                "material-palenight",
                "bespin",
                "elegant",
                "mnd-like",
            ],
            themeIdx: 0,
        },
        vim_init
    );
})();
