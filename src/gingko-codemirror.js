/* global CodeMirror Backbone */

let editor_states = new Map();
let editors = new Map();
let focus_fullscreen = false;
let active_card = null;

function until(conditionFunction) {
    const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
    };

    return new Promise(poll);
}

function create_codemirror(textarea, config) {
    const codeMirrorWrapper = CodeMirror.fromTextArea(textarea, {
        mode: "markdown",
        lineWrapping: true,
        matchBrackets: true,
        scrollbarStyle: "null",
        theme: config.theme,
        fullScreen: false,
        keyMap: config.keyMap,
        autofocus: true,
    });
    codeMirrorWrapper.setSize(null, null);

    // reflect changes in the codemirror instance in the
    // wrapped textarea, so that changes get for
    codeMirrorWrapper.on("change", function (cm, _change) {
        cm.save();
    });

    return codeMirrorWrapper;
}

function create_fullscreen_codemirror(cm, textarea, config) {
    const linked_doc = cm.getDoc().linkedDoc({ sharedHist: true });

    const codeMirror = CodeMirror.fromTextArea(textarea, {
        mode: "markdown",
        lineWrapping: true,
        matchBrackets: true,
        scrollbarStyle: "null",
        theme: config.theme,
        fullScreen: true,
        keyMap: config.keyMap,
        autofocus: true,
        extraKeys: {
            F11: function (cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            // Esc: function (cm) {
            //     if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            // },
            // "Ctrl-Enter": cm =>
        },
    });

    codeMirror.swapDoc(linked_doc);
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

    const cm = editors.get(get_active());
    cm.setOption("fullScreen", !cm.getOption("fullScreen"));
}

function is_fullscreen() {
    return focus_fullscreen;
}

async function create_editor(id, config) {
    const card = document.querySelector("#card" + id);
    await until(() => card.querySelector("textarea"));

    const textarea = card.querySelector("textarea");
    const codemirror = create_codemirror(textarea, config);

    if (is_fullscreen()) {
        const fullscreen_container = document.querySelector(
            ".fullscreen-container"
        );

        await until(() => fullscreen_container.querySelector("textarea"));
        let fullscreen_textarea = fullscreen_container.querySelector("textarea");

        create_fullscreen_codemirror(codemirror, fullscreen_textarea, config);
    }
    editors.set(id, codemirror);
}

function close_editor(id) {
    // let editor = editors.get(id);
    // editor.toTextArea();
}

function save_editor(id) {
    const editor = editors.get(id);
    editor.save();
}

function set_active(id) {
    active_card = id;
}

function get_active() {
    return active_card;
}

async function waitForAndRun(condition, run) {
    await until(condition);
    run();
}

function backboneEvents(config) {
    Backbone.on("card:edit", (id) => {
        create_editor(id, config);
        set_active(id);
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
