/* global CodeMirror Backbone */

let editors = new Map();
let fullscreen_editors = new Map();

const STORED_CONTENT = new Map();
const STORED_HISTORY = new Map();

let focus_fullscreen = false;
let active_card = null;

class Editor {
    constructor(id, cm, cm_full) {
        console.log("create new editor");
        this.id = id;

        this.editor = cm;
        this.fullscreen_editor = cm_full;
    }

    close() {
        const content = this.load_content();
        const history = this.load_history();
        const editor = this.editor();

        editor.getDoc().setValue(content);
        editor.setHistory(history);

        const fullscreen_editor = this.fullscreen_editor;

        if (fullscreen_editor) {
            fullscreen_editor.toTextArea();
            remove_fullscreen_editor(this.id);
            this.fullscreen_editor = null;
        }
    }

    save() {
        this.editor.save();
        this.save_history();
        this.save_content();
    }

    save_content() {
        this.content = this.editor.getDoc().getValue();
    }

    save_history() {
        this.history = this.editiro.getDoc().getHistory();
    }
}

class EditorManager {
    constructor(config) {
        console.log("create editor manager");
        this.config = config;
        this.editors = new Map();
        this.fullscreen_editors = new Map();

        this.STORED_CONTENT = new Map();
        this.STORED_HISTORY = new Map();

        this.focus_fullscreen = false;
        this.active_id = null;
    }

    async instanciate(id) {
        const card = document.querySelector("#card" + id);
        await until(() => card.querySelector("textarea"));

        const textarea = card.querySelector("textarea");
        let codemirror = create_codemirror(textarea, this.config);
        return codemirror;
    }

    async istanciate_fullscreen(editor) {
        console.log("create new fullscreen editor");
        const fullscreen_container = document.querySelector(
            ".fullscreen-container"
        );

        await until(() => fullscreen_container.querySelector("textarea"));
        let fullscreen_textarea = fullscreen_container.querySelector("textarea");

        return create_fullscreen_codemirror(
            editor,
            fullscreen_textarea,
            this.config
        );
    }

    async create_editor(id) {
        console.log(this.editors);

        if (!this.editors.has(id)) {
            const cm = await this.instanciate(id);
            let cm_full = null;

            if (this.is_fullscreen()) {
                cm_full = await this.instanciate_fullscreen(cm);
            }

            const instance = new Editor(id, cm, cm_full);
            instance.save();
            this.editors.set(id, instance);
        }

        this.active_id = id;

        console.log(this.editors);

        return this.editors.get(id);
    }

    save_editor(id) {
        this.editors.get(id).save();
    }

    close_editor(id) {
        this.editors.get(id).close();
        this.disable_fullscreen();
    }

    toggle_fullscreen(id) {
        this.editors.get(id).make_fullscreen();
    }

    is_fullscreen() {
        return this.focus_fullscreen;
    }

    get(id) {
        return this.editors.get(id);
    }

    get_active() {
        return this.get(this.active_id);
    }

    enable_fullscreen() {
        this.focus_fullscreen = true;
    }

    disable_fullscreen() {
        this.focus_fullscreen = false;
    }
}

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
        extraKeys: {
            "Shift-F8": function (cm) {
                let new_theme = window.prompt("Current theme", cm.getOption("theme"));

                cm.setOption("theme", new_theme);
            },

            F9: function (cm) {
                const theme = config.themes[config.themeIdx];
                cm.setOption("theme", theme);
                config.themeIdx = (config.themeIdx + 1) % config.themes.length;
            },
        },
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
        theme: config.themes[config.themeIdx],
        fullScreen: true,
        keyMap: config.keyMap,
        autofocus: true,
        extraKeys: {
            "Shift-F8": function (cm) {
                let new_theme = window.prompt("Current theme", cm.getOption("theme"));

                cm.setOption("theme", new_theme);
            },
            F8: function (cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            F9: function (cm) {
                const theme = config.themes[config.themeIdx];
                cm.setOption("theme", theme);
                config.themeIdx = (config.themeIdx + 1) % config.themes.length;
            },

            // Esc: function (cm) {
            //     if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            // },
            // "Ctrl-Enter": cm =>
        },
    });

    codeMirror.swapDoc(linked_doc);

    return codeMirror;
}

function enable_fullscreen() {
    focus_fullscreen = true;

    console.log("set fullscreen to " + focus_fullscreen);
}

function disable_fullscreen() {
    focus_fullscreen = false;

    console.log("set fullscreen to " + focus_fullscreen);
}

function toggle_fullscreen(id, config) {
    focus_fullscreen = !focus_fullscreen;

    console.log("set fullscreen to " + focus_fullscreen);
    if (is_fullscreen()) {
        create_fullscreen_editor(id, config);
    }
}

function is_fullscreen() {
    return focus_fullscreen;
}

function get_editor(id) {
    return editors.get(id);
}

function get_fullscreen_editor(id) {
    return fullscreen_editors.get(id);
}

function set_fullscreen_editor(id, cm) {
    fullscreen_editors.set(id, cm);
}

function remove_fullscreen_editor(id) {
    fullscreen_editors.delete(id);
}

async function create_fullscreen_editor(id, config) {
    const codemirror = get_editor(id);

    if (typeof codemirror === "undefined") {
        throw "reference editor must be defined";
    }
    let fullscreen_editor = get_fullscreen_editor(id);

    if (typeof fullscreen_editor !== "undefined") {
        console.log("focus existing fullscreen editor");
        fullscreen_editor.focus();
    } else {
        console.log("create new fullscreen editor");
        const fullscreen_container = document.querySelector(
            ".fullscreen-container"
        );

        await until(() => fullscreen_container.querySelector("textarea"));
        let fullscreen_textarea = fullscreen_container.querySelector("textarea");

        fullscreen_editor = create_fullscreen_codemirror(
            codemirror,
            fullscreen_textarea,
            config
        );
        set_fullscreen_editor(id, fullscreen_editor);
    }
}

async function create_editor(id, config) {
    const card = document.querySelector("#card" + id);
    await until(() => card.querySelector("textarea"));

    const textarea = card.querySelector("textarea");
    let codemirror = null;

    if (typeof editors.get(id) !== "undefined") {
        codemirror = editors.get(id);
        codemirror.focus();
    } else {
        codemirror = create_codemirror(textarea, config);
        editors.set(id, codemirror);
    }

    if (is_fullscreen()) {
        create_fullscreen_editor(id, config);
    }

    save_history(id);
    save_content(id);
}

function load_content(id) {
    return STORED_CONTENT.get(id);
}

function load_history(id) {
    return STORED_HISTORY.get(id);
}

function save_content(id) {
    const content = get_editor(id).getDoc().getValue();
    STORED_CONTENT.set(id, content);
}

function save_history(id) {
    const history = get_editor(id).getDoc().getHistory();
    STORED_HISTORY.set(id, history);
}

function close_editor(id) {
    const content = load_content(id);
    const history = load_history(id);
    const editor = get_editor(id);

    editor.getDoc().setValue(content);
    editor.setHistory(history);

    const fullscreen_editor = get_fullscreen_editor(id);

    if (typeof fullscreen_editor !== "undefined") {
        fullscreen_editor.toTextArea();
        remove_fullscreen_editor(id);
    }
    disable_fullscreen();
    // let editor = editors.get(id);
    // editor.toTextArea();
}

function save_editor(id) {
    const editor = editors.get(id);
    editor.save();

    save_history(id);
    save_content(id);
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

function setupBackboneEvents(editor_manager) {
    Backbone.on("card:edit", (id) => {
        editor_manager.create_editor(id);
        editor_manager.set_active(id);
    });

    Backbone.on("card:save", (id) => {
        editor_manager.save_editor(id);
        editor_manager.close_editor(id);
    });

    Backbone.on("card:cancel", (id) => {
        editor_manager.close_editor(id);
    });

    Backbone.on("key:editFullscreen", (_) => {
        editor_manager.enable_fullscreen();
    });

    Backbone.on("key:fullscreen", (_) => {
        editor_manager.get_active().toggle_fullscreen();
    });
}

function run(config, init) {
    const editor_manager = new EditorManager(config);

    waitForAndRun(
        () => typeof Backbone !== "undefined",
        () => {
            setupBackboneEvents(editor_manager);
        }
    );

    init();
}

window.run = run;
