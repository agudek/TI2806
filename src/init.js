var scriptfiles = [
    'https://code.jquery.com/jquery-2.2.3.js',
    'settings.js',
    'functions.js'
];

loadScripts(scriptfiles);
function loadScripts(scripts) {
    for (var i = 0; i < scripts.length; ++i) {
        var script = document.createElement('script');
        script.src = scripts[i];
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
}