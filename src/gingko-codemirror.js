/* global CodeMirror Backbone */

const DEFAULT_APP_CONF = {
    theme: "default",
    themes: ["default"],
    themeIdx: 0,
    keyMap: "default",
};

const DEFAULT_EDITOR_CONF = {
    mode: "markdown",
    lineWrapping: true,
    matchBrackets: true,
    scrollbarStyle: "null",
    theme: "default",
    fullScreen: false,
    keyMap: "default",
    autofocus: true,
};

function mod(n, m) {
    return ((n % m) + m) % m;
}

function themeChange(operator, cm, config) {
    config.themeIdx = mod((operator(config.themeIdx, 1)), config.themes.length);
    const theme = config.themes[config.themeIdx];
    cm.setOption("theme", theme);
    config.theme = theme;
}

function selectTheme(current_theme, themes) {

    const idx = themes.indexOf(current_theme);
    const themeCopy = [...themes].map(theme => "   " + theme);

    themeCopy[idx] = "🠖  " + current_theme;

    const theme_string = themeCopy.join("\n");

    let new_theme = window.prompt("Themes: \n\n" + theme_string + "\n\nChoose:", current_theme);
  
    new_theme = new_theme === null? current_theme: new_theme;
  
    if (themes.indexOf(new_theme) === -1) {
      
        window.alert("no valid theme: \"" + new_theme + "\", falling back to \"" + current_theme + "\"");
        return current_theme;
    }
  
    return new_theme;}

class CodeMirrorManager {

    static configure_codemirror(editor, config) {
        editor.setOption("theme", config.theme);
        editor.setOption("keyMap", config.keyMap);
      
        const extraKeysMap = {
          
            "Ctrl-Shift-F8": function (cm) {
                let new_theme = selectTheme(cm.getOption("theme"), config.themes);
                cm.setOption("theme", new_theme);
                config.theme = new_theme;
                config.themeIdx = Math.max(0, config.themes.indexOf(new_theme));
            },
            "Shift-F8": function (cm) {
                themeChange((a,b) => a-b, cm, config);
            },
            F8: function (cm) {
                themeChange((a,b) => a+b, cm, config);
            },
            Tab: function (cm) {
                var spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
                cm.replaceSelection(spaces);
            }
        };

        editor.setOption("extraKeys", CodeMirror.normalizeKeyMap(extraKeysMap));
    }    

    static create_codemirror(textarea, config) {
        const codeMirrorWrapper = CodeMirror.fromTextArea(textarea, DEFAULT_EDITOR_CONF);
        this.configure_codemirror(codeMirrorWrapper, config);

        codeMirrorWrapper.setSize(null, null);

        unsafeWindow.editor = codeMirrorWrapper;

        // reflect changes in the codemirror instance in the
        // wrapped textarea, so that changes get for
        codeMirrorWrapper.on("change", function (cm, _change) {
            cm.save();
        });

        return codeMirrorWrapper;
    }

    static create_fullscreen_codemirror(cm, textarea, config) {
        const linked_doc = cm.getDoc().linkedDoc({ sharedHist: true });
        linked_doc.setCursor(cm.getDoc().getCursor());

        const codeMirror = CodeMirror.fromTextArea(textarea, DEFAULT_EDITOR_CONF);
        this.configure_codemirror(codeMirror, config);

        codeMirror.setOption("fullScreen", true);
        codeMirror.addKeyMap({
            F9: function (cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
        });
        codeMirror.swapDoc(linked_doc);

        return codeMirror;
    }
}

class EditorManager {
    constructor() {}

    static init(config = null) {
        this.active_card = null;
        this.editors = new Map();
        this.fullscreen_editors = new Map();
        this.stored_history = new Map();
        this.stored_content = new Map();
        this.stored_cursor = new Map();
        this.codemirror_manager = CodeMirrorManager;
        this.focus_fullscreen = false;
        this.config = config;
    }
    static get active_card() {
        return this._active_card;
    }
    static set active_card(val) {
        this._active_card = val;
    }

    static get fullscreen_editors() {
        return this._fullscreen_editors;
    }
    static set fullscreen_editors(val) {
        this._fullscreen_editors = val;
    }

    static get stored_content() {
        return this._stored_content;
    }
    static set stored_content(val) {
        this._stored_content = val;
    }
    static get stored_cursor() {
        return this._stored_cursor;
    }
    static set stored_cursor(val) {
        this._stored_cursor = val;
    }
    static get codemirror_manager() {
        return this._codemirror_manager;
    }
    static set codemirror_manager(val) {
        this._codemirror_manager = val;
    }
    static get focus_fullscreen() {
        return this._focus_fullscreen;
    }
    static set focus_fullscreen(val) {
        this._focus_fullscreen = val;
    }
    static get config() {
        return this._config;
    }
    static set config(val) {
        this._config = val;
    }

    static get_codemirror_manager() {
        return this.codemirror_manager;
    }

    static get stored_history() {
        return this._stored_history;
    }
    static set stored_history(val) {
        this._stored_history = val;
    }

    static async toggle_fullscreen() {
        if (!this.active_card) {
            throw "must have an active card to toggle fullscreen";
        }

        const id = this.get_active();

        this.focus_fullscreen = !this.focus_fullscreen;

        // console.log("set fullscreen to " + this.focus_fullscreen);
        if (this.is_fullscreen()) {
            await this.create_fullscreen_editor(id);
        } else {
            const editor = this.get_editor(id);
            editor
                .getDoc()
                .setCursor(this.get_fullscreen_editor(id).getDoc().getCursor());
            this.remove_fullscreen_editor(id);
        }
    }

    static async create_editor(id) {
        const card = document.querySelector("#card" + id);
        await until(() => card.querySelector("textarea"));

        const textarea = card.querySelector("textarea");
        let codemirror = null;

        if (typeof this.get_editor(id) !== "undefined") {
            codemirror = this.get_editor(id);
            codemirror.setOption("theme", this.config.theme);
            codemirror.focus();
        } else {
            codemirror = this.get_codemirror_manager().create_codemirror(
                textarea,
                this.config
            );
            this.set_editor(id, codemirror);
        }

        if (this.is_fullscreen()) {
            await this.create_fullscreen_editor(id);
        }

        this.save_editor(id);

    // this.save_history(id);
    // this.save_content(id);
    // this.save_cursor(id);
    }

    static async activate_editor(id) {
        await this.create_editor(id);
        this.set_active(id);
    }

    static set_editor(id, instance) {
        this.editors.set(id, instance);
    }

    static async create_fullscreen_editor(id) {
        const codemirror = this.get_editor(id);

        if (typeof codemirror === "undefined") {
            throw "reference editor must be defined";
        }

        codemirror.setOption("theme", this.config.theme);
        let fullscreen_editor = this.get_fullscreen_editor(id);

        if (typeof fullscreen_editor !== "undefined") {
            // console.log("focus existing fullscreen editor");
            fullscreen_editor.setOption("theme", this.config.theme);
            fullscreen_editor.focus();
        } else {
            // console.log("create new fullscreen editor");
            const fullscreen_container = document.querySelector(
                ".fullscreen-container"
            );

            await until(() => fullscreen_container.querySelector("textarea"));
            let fullscreen_textarea = fullscreen_container.querySelector("textarea");

            fullscreen_editor = this.codemirror_manager.create_fullscreen_codemirror(
                codemirror,
                fullscreen_textarea,
                this.config
            );
            this.set_fullscreen_editor(id, fullscreen_editor);
        }
    }

    static enable_fullscreen() {
        this.focus_fullscreen = true;

    // console.log("set fullscreen to " + this.focus_fullscreen);
    }

    static disable_fullscreen() {
        this.focus_fullscreen = false;

    // console.log("set fullscreen to " + this.focus_fullscreen);
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
        this.get_fullscreen_editor(id).toTextArea();
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

    static deactivate_editor(id) {
        this.restore_editor(id);

        const fullscreen_editor = this.get_fullscreen_editor(id);

        if (typeof fullscreen_editor !== "undefined") {
            this.remove_fullscreen_editor(id);
        }
        this.active_card = null;
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

function isValidKeyEvent(args) {

    if (args.length > 1) {

        if (args[0] === "key:tab" && args[1] instanceof KeyboardEvent) {
            if (
                args[1].type === "keydown" &&
                args[1].target.nodeName === "TEXTAREA"
            ) {
                return false;
            }
        }
    }
    return true;
}

function fixTabKeyBehaviour() {
    var trigger = Backbone.trigger;
    Backbone.trigger = function (...argse) {
        var args = Array.from(argse);
        if (isValidKeyEvent(args)) {
            trigger.apply(Backbone, args);
        }
    };
}

function backboneEvents(editor_manager) {

    fixTabKeyBehaviour();

    Backbone.on("card:edit", async (id) => {
        await editor_manager.activate_editor(id);
    });

    Backbone.on("card:save", async (id) => {
        await editor_manager.save_editor(id);
        await editor_manager.deactivate_editor(id);
    });

    Backbone.on("card:cancel", async (id) => {
        await editor_manager.deactivate_editor(id);
    });

    Backbone.on("key:editFullscreen", async (_) => {
        await editor_manager.enable_fullscreen();
    });

    Backbone.on("key:fullscreen", async (_) => {
        await editor_manager.toggle_fullscreen();
    });
}

function run(config, init) {

    const app_conf = Object.assign(DEFAULT_APP_CONF, config);
    app_conf.themeIdx = Math.max(0, app_conf.themes.indexOf(app_conf.theme));

    EditorManager.init(app_conf);
    waitForAndRun(
        () => typeof Backbone !== "undefined",
        () => {
            backboneEvents(EditorManager);
        }
    );

    init();
}

window.run_codemirror = run;
