/* globals browser */

const url = browser.runtime.getURL("dependencies.json");

fetch(url)
    .then((res) => res.json())
    .then((out) => {
        console.log("Checkout this JSON! ", out);
        load_dependencies(out);
    })
    .catch((err) => {
        throw err;
    });

function load_dependencies(config) {
    for (const css of config["resources"]) {
        const url = config["cdn"] + "/" + css;
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = url;
        document.head.appendChild(link);
    }
}
