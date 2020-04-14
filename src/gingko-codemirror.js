let editor_cursors = new Map();

const mytheme = "base16-light";

function until(conditionFunction) {
    const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
    };

    return new Promise(poll);
}

function addCodemirror(card_id, textarea, fullscreen) {
    let original_textarea = document
        .querySelector(card_id)
        .querySelector(".mousetrap");

    // if there is already a codemirror instance wrapping return immediately
    if ($(textarea).siblings(".CodeMirror").length > 0) {
        console.log("there is already a codemirror");

        let cm = $(textarea).siblings(".CodeMirror").get(0).CodeMirror;
        let cursor = cm.getCursor();
        cm.setValue(original_textarea.value);
        cm.setCursor(cursor);
        cm.focus();
        return;
    }

    // if there is a textarea without a CodeMirror wrapped around
    // add the codemirror wrapper and style it accordingly
    if (textarea) {
        let codeMirrorWrapper = CodeMirror.fromTextArea(textarea, {
            mode: "markdown",
            lineWrapping: true,
            matchBrackets: true,
            scrollbarStyle: "null",
            theme: mytheme,
            fullScreen: fullscreen,
            keyMap: "vim",
            autofocus: true,
            extraKeys: {
                F11: function (cm) {
                    cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                },
                Esc: function (cm) {
                    if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                },
                // "Ctrl-Enter": cm =>
            },
        });
        codeMirrorWrapper.setSize(null, null);

        // reflect changes in the codemirror instance in the
        // wrapped textarea, so that changes get for
        codeMirrorWrapper.on("change", function (cm, change) {
            // console.log(cm.getTextArea());
            // console.log(original_textarea);
            cm.save();
            document
                .querySelector(card_id)
                .querySelector(".mousetrap").value = cm.getValue();

            // cm.getTextArea().value = cm.getValue();
            // original_textarea.value = cm.getValue();
        });
    }
}

let isFullscreen = false;

async function onEdit(id) {
    let editing_container = null;
    let original_container = null;

    if (isFullscreen) {
        console.log("do fullscreen");
        editing_container = document.querySelector(".fullscreen-container");
    } else {
        console.log("no fullscreen");
        editing_container = document.querySelector("#card" + id);
    }

    original_container = document.querySelector("#card" + id);

    await until(() => editing_container.querySelector("textarea"));
    await until(() => original_container.querySelector("textarea"));

    let editing_textarea = editing_container.querySelector("textarea");
    let original_textarea = original_container.querySelector("textarea");

    addCodemirror("#card" + id, editing_textarea, isFullscreen);
}

async function waitForBackbone() {
    await until(() => typeof Backbone !== "undefined");

    Backbone.on("card:edit", (id) => {
        onEdit(id);
    });

    Backbone.on("key:editFullscreen", (id) => {
        isFullscreen = true;
    });

    Backbone.on("key:fullscreen", (id) => {
        console.log("toggle fullscreen to " + !isFullscreen);
        isFullscreen = !isFullscreen;
    });

    Backbone.on("card:save", (id) => {
        console.log("saved");
    // isFullscreen = false;
    });
}

function run() {
    waitForBackbone();

    CodeMirror.Vim.defineEx("q", null, function (cm) {
        cm.display.input.blur();
        /* cm.toTextArea(); */ Backbone.trigger("key:cancel");
    });
    CodeMirror.Vim.defineEx("wq", null, function (cm) {
        cm.save();
        cm.display.input.blur();
        /* cm.toTextArea(); */ Backbone.trigger("key:save");
    });
    CodeMirror.Vim.defineEx("w", null, function (cm) {
        cm.save();
        // let cursor = cm.getCursor();
        // let fullscreen = isFullscreen;
        Backbone.trigger("key:save");
        Backbone.trigger("key:edit");

        if (isFullscreen) {
            isFullscreen = false;
            Backbone.trigger("key:fullscreen");
        }
        // isFullscreen = fullscreen;
        cm.focus();
    });
    CodeMirror.Vim.map("jk", "<Esc>l", "insert");

    CodeMirror.Vim.map(",s", ":w<CR><Esc>", "insert");

    /*
  CodeMirror.Vim.map(',s', '', 'insert');
  CodeMirror.Vim.map(',s', ':', 'normal');
  CodeMirror.Vim.map('<Space>q', ':q<CR>', 'normal');
  CodeMirror.Vim.map('\,q', ':q<CR>', 'normal');
  CodeMirror.Vim.map(',q', ':q<CR>', 'insert');
  CodeMirror.Vim.map('\,q', ':q<CR>', 'visual');
  */

    unsafeWindow.codemirror = CodeMirror;
    // CodeMirror.Vim.noremap('jk', '<Esc>', 'insert');
}
