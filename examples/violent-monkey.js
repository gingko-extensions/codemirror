// ==UserScript==
// @name     gingko-codemirror
// @version  1
// @grant    GM_getResourceText
// @grant    GM_addStyle
// @resource CODEMIRROR_CSS https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.css
// @resource MDN_LIKE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/mdn-like.min.css
// @resource ELEGANT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/elegant.min.css
// @resource BASE16_LIGHT https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/base16-light.min.css
// @resource CODE_STYLE https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/theme/mdn-like.min.css
// @resource DIALOG https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/dialog/dialog.min.css
// @resource MATCHESONSCROLLBAR https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/search/matchesonscrollbar.min.css
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.32.0/codemirror.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/mode/markdown/markdown.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/display/fullscreen.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/keymap/vim.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/dialog/dialog.min.js
// @require  https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/search/jump-to-line.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/search/match-highlighter.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/search/search.min.js
// @require  https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.52.2/addon/search/searchcursor.min.js
// @require  https://gist.githubusercontent.com/JanSurft/290e53180101a929a4433328f7d089d8/raw/d2a14f0b84cdbd5ad10afb6415647a11dcb95a33/gingko-app_codemirror.js
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

'use strict';

// Styling of the CodeMirror section
const cssTxt = GM_getResourceText ("CODEMIRROR_CSS");
GM_addStyle (cssTxt);

const cssTheme = GM_getResourceText ("BASE16_LIGHT");
GM_addStyle (cssTheme);

const cssDialog = GM_getResourceText ("DIALOG");
GM_addStyle (cssDialog);



// Make resizing possible and move the save-button
// downwards (only temporarily solution)
GM_addStyle ( `
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
`
            );

// run on document loaded
(function() {

  run();

})();
