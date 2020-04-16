/* global CodeMirror Backbone */

class CodeMirrorManager {
    static create_codemirror(textarea, config) {
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
                    config.theme = new_theme;
                },

                F8: function (cm) {
                    const theme = config.themes[config.themeIdx];
                    cm.setOption("theme", theme);

                    config.theme = theme;
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

    static create_fullscreen_codemirror(cm, textarea, config) {
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
                "Shift-F8": function (cm) {
                    let new_theme = window.prompt("Current theme", cm.getOption("theme"));
                    cm.setOption("theme", new_theme);

                    config.theme = new_theme;
                },

                F8: function (cm) {
                    const theme = config.themes[config.themeIdx];
                    cm.setOption("theme", theme);

                    config.theme = theme;
                    config.themeIdx = (config.themeIdx + 1) % config.themes.length;
                },
                F9: function (cm) {
                    cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                },
            },
        });

        codeMirror.swapDoc(linked_doc);

        return codeMirror;
    }
}

EditorManager.editors = new Map();
EditorManager.fullscreen_editors = new Map();
EditorManager.stored_history = new Map();
EditorManager.stored_content = new Map();
EditorManager.stored_cursor = new Map();
EditorManager.codemirror_manager = CodeMirrorManager;
EditorManager.focus_fullscreen = false;
class EditorManager {
    constructor() {}

    static get_codemirror_manager() {
        return this.codemirror_manager;
    }

    static toggle_fullscreen(id, config) {
        this.focus_fullscreen = !this.focus_fullscreen;

        console.log("set fullscreen to " + this.focus_fullscreen);
        if (this.is_fullscreen()) {
            this.create_fullscreen_editor(id, config);
        }
    }

    static async create_editor(id, config) {
        const card = document.querySelector("#card" + id);
        await until(() => card.querySelector("textarea"));

        const textarea = card.querySelector("textarea");
        let codemirror = null;

        if (typeof this.get_editor(id) !== "undefined") {
            codemirror = this.get_editor(id);
            codemirror.setOption("theme", config.theme);
            codemirror.focus();
        } else {
            codemirror = this.get_codemirror_manager().create_codemirror(
                textarea,
                config
            );
            this.set_editor(id, codemirror);
        }

        if (this.is_fullscreen()) {
            this.create_fullscreen_editor(id, config);
        }

        this.save_editor(id);

    // this.save_history(id);
    // this.save_content(id);
    // this.save_cursor(id);
    }

    static activate_editor(id, config) {
        this.create_editor(id, config);
        this.set_active(id);
    }

    static set_editor(id, instance) {
        this.editors.set(id, instance);
    }

    static async create_fullscreen_editor(id, config) {
        const codemirror = this.get_editor(id);

        if (typeof codemirror === "undefined") {
            throw "reference editor must be defined";
        }

        codemirror.setOption("theme", config.theme);
        let fullscreen_editor = this.get_fullscreen_editor(id);

        if (typeof fullscreen_editor !== "undefined") {
            console.log("focus existing fullscreen editor");
            fullscreen_editor.setOption("theme", config.theme);
            fullscreen_editor.focus();
        } else {
            console.log("create new fullscreen editor");
            const fullscreen_container = document.querySelector(
                ".fullscreen-container"
            );

            await until(() => fullscreen_container.querySelector("textarea"));
            let fullscreen_textarea = fullscreen_container.querySelector("textarea");

            fullscreen_editor = this.create_fullscreen_codemirror(
                codemirror,
                fullscreen_textarea,
                config
            );
            this.set_fullscreen_editor(id, fullscreen_editor);
        }
    }

    static enable_fullscreen() {
        this.focus_fullscreen = true;

        console.log("set fullscreen to " + this.focus_fullscreen);
    }

    static disable_fullscreen() {
        this.focus_fullscreen = false;

        console.log("set fullscreen to " + this.focus_fullscreen);
    }

    static is_fullscreen() {
        return this.focus_fullscreen;
    }

    static get_editor(id) {
        return this.editors.get(id);
    }

    static get_fullscreen_editor(id) {
        return this.fullscreen_editors.get(id);
    }

    static set_fullscreen_editor(id, cm) {
        this.fullscreen_editors.set(id, cm);
    }

    static remove_fullscreen_editor(id) {
        this.fullscreen_editors.delete(id);
    }

    static load_content(id) {
        return this.stored_content.get(id);
    }

    static load_history(id) {
        return this.stored_history.get(id);
    }

    static load_cursor(id) {
        return this.stored_cursor.get(id);
    }

    static save_content(id) {
        const content = this.get_editor(id).getDoc().getValue();
        this.stored_content.set(id, content);
    }

    static save_history(id) {
        const history = this.get_editor(id).getDoc().getHistory();
        this.stored_history.set(id, history);
    }

    static save_cursor(id) {
        const cursor = this.get_editor(id).getDoc().getCursor();
        this.stored_cursor.set(id, cursor);
    }

    static close_editor(id) {
        this.restore_editor(id);

        const fullscreen_editor = this.get_fullscreen_editor(id);

        if (typeof fullscreen_editor !== "undefined") {
            fullscreen_editor.toTextArea();
            this.remove_fullscreen_editor(id);
        }
        this.disable_fullscreen();
    }

    static restore_editor(id) {
        const editor = this.get_editor(id);

        const content = this.load_content(id);
        const history = this.load_history(id);
        const cursor = editor.getDoc().getCursor();

        editor.getDoc().setValue(content);
        editor.setHistory(history);
        editor.setCursor(cursor);
    }

    static save_editor(id) {
        const editor = this.get_editor(id);
        editor.save();

        this.save_history(id);
        this.save_content(id);
        this.save_cursor(id);
    }

    static set_active(id) {
        this.active_card = id;
    }

    static get_active() {
        return this.active_card;
    }
}

function until(conditionFunction) {
    const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
    };

    return new Promise(poll);
}

async function waitForAndRun(condition, run) {
    await until(condition);
    run();
}

function backboneEvents(config) {
    EditorManager.config = config;

    Backbone.on("card:edit", (id) => {
        EditorManager.activate_editor(id, config);
    });

    Backbone.on("card:save", (id) => {
        EditorManager.save_editor(id);
        EditorManager.close_editor(id);
    });

    Backbone.on("card:cancel", (id) => {
        EditorManager.close_editor(id);
    });

    Backbone.on("key:editFullscreen", (_) => {
        EditorManager.enable_fullscreen();
    });

    Backbone.on("key:fullscreen", (_) => {
        EditorManager.toggle_fullscreen(EditorManager.get_active(), config);
    });
}

function run(config, init) {
    waitForAndRun(
        () => typeof Backbone !== "undefined",
        () => {
            backboneEvents(config);
        }
    );

    init();
}

window.run = run;
