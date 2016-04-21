var scriptfiles = [
    "settings.js",
    "functions.js"
];

loadScripts(scriptfiles);
function loadScripts(scripts) {
    for (var i = 0; i < scripts.length; ++i) {
        var script = document.createElement("script");
        script.src = scripts[i];
        script.type = "text/javascript";
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}

function init() {
    req(host + "docs", (function (res) {
        document.getElementsByTagName("body")[0].innerHTML += res;
    })());
}