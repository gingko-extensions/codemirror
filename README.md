# gingko-codemirror
turning the default textarea editor in gingkoapp to a codemirror editor

- [x] Vim keybindings
- [x] Fullscreen support
- [x] Theme switching (F8 and Shift-F8)
- [x] Theme choose (Ctrl-Shift-F8)

![](doc/gingko-codemirror.gif)

## Gif-Script

- Syntax-Formatting
  + nice syntax formatting for markdown
  + theme switching via F8 and Shift-F8
  + theme choosing via Ctrl-Shift-F8

- Vim-Keybindings and Commands
  + std-navigation and interaction with different modes
    * e.g. undo, redo, yank, paste, modes, hjkl-navigation, ...
  + `:w` for saving
  + `:q` for quitting 
  + `:wq` for save and quit

## How to use

Currently I use the `violentmonkey` extension for firefox to load this javascript extension on the gingkoapp website.

### With Violentmonkey

1. Install the `violentmonkey` extension for your browser
2. Create a new script in its dashboard
3. Copy the contents from `examples/violent-monkey.js` into the script
4. Load the gingko-app homepage
5. Enjoy

#### Configuration

Currently the contents of the violent-monkey script can be altered:

##### Change Vim keymaps

At the bottom there is for example a `vim_init` function that is called by the addon for some vim-key functionality:

```javascript

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

    // Here you can add more mappings see the codemirror documentation on how to configure
    // things with the vim-api https://codemirror.net/doc/manual.html#vimapi
}

async function waitForRun() {
    await until(() => typeof run !== "undefined");

    run(
        {
            theme: "default",
            keyMap: "vim",
            themes: GOOD_THEMES,
        },
        vim_init
    );
}

```

##### More  

TODO

#### Stay up to date

Using the violent monkey script you need to stay up to date with the new versions of the addon in `src/gingko-codemirror.js`.
