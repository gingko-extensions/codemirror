/* global CodeMirror Backbone */

let editor_states = new Map();
let editors = new Map();
let focus_fullscreen = false;

const mytheme = "base16-light";

function until(conditionFunction) {
    const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
    };

    return new Promise(poll);
}

function addCodemirror(card_id, textarea, fullscreen, config) {
    // let original_textarea = document
    //     .querySelector(card_id)
    //     .querySelector(".mousetrap");

    // // if there is already a codemirror instance wrapping return immediately
    // if ($(textarea).siblings(".CodeMirror").length > 0) {
    //     console.log("there is already a codemirror");

    //     let cm = $(textarea).siblings(".CodeMirror").get(0).CodeMirror;
    //     let cursor = cm.getCursor();
    //     cm.setValue(original_textarea.value);
    //     cm.setCursor(cursor);
    //     cm.focus();
    //     return;
    // }

    // console.log("new codemirror instance");

    // if there is a textarea without a CodeMirror wrapped around
    // add the codemirror wrapper and style it accordingly
    let codeMirrorWrapper = CodeMirror.fromTextArea(textarea, {
        mode: "markdown",
        lineWrapping: true,
        matchBrackets: true,
        scrollbarStyle: "null",
        theme: config.theme,
        fullScreen: fullscreen,
        keyMap: config.keyMap,
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
    codeMirrorWrapper.on("change", function (cm, _change) {
    // console.log(cm.getTextArea());
    // console.log(original_textarea);
        cm.save();
        document
            .querySelector(card_id)
            .querySelector(".mousetrap").value = cm.getValue();

    // cm.getTextArea().value = cm.getValue();
    // original_textarea.value = cm.getValue();
    });

    return codeMirrorWrapper;
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

function set_editing(id, val) {
    if (!editor_states.has(id)) {
        editor_states.set(id, { editing: false, fullscreen: false });
    }
    editor_states.get(id).editing = val;

    console.log("editing: " + val);
}

function enable_fullscreen() {
    focus_fullscreen = true;
    console.log("fullscreen: " + true);
}

function toggle_fullscreen() {
    focus_fullscreen = !focus_fullscreen;
    console.log("fullscreen: " + focus_fullscreen);
}

async function create_editor(id, config) {
    let card = document.querySelector("#card" + id);

    await until(() => card.querySelector("textarea"));

    let textarea = card.querySelector("textarea");

    let codemirror = addCodemirror("#card" + id, textarea, false, config);

    editors.set(id, codemirror);
}

function close_editor(id) {
    // let editor = editors.get(id);
    // editor.toTextArea();
}

function save_editor(id) {
    let editor = editors.get(id);
    editor.save();
}

async function waitForAndRun(condition, run) {
    await until();
    run();
}

function backboneEvents(config) {
    Backbone.on("card:edit", (id) => {
        create_editor(id, config);
    });

    Backbone.on("card:save", (id) => {
        save_editor(id);
        close_editor(id);
    });

    Backbone.on("card:cancel", (id) => {
        close_editor(id);
    });

    Backbone.on("key:editFullscreen", (_) => {
        enable_fullscreen();
    });

    Backbone.on("key:fullscreen", (_) => {
        toggle_fullscreen();
    });
}

function _run(config, init) {
    waitForAndRun(
        () => typeof Backbone !== "undefined",
        () => {
            backboneEvents(config);
        }
    );

    init();
}
