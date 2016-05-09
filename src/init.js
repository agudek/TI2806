$(document).ready(function () {
	var scriptfiles = [
	    'settings.js',
	    'functions.js',
	    'dummy.js',
	    'aggregation.js'
	];

	loadScripts(scriptfiles);
	function loadScripts(scripts) {
	    for (var i = 0; i < scripts.length; ++i) {
		var script = document.createElement('script');
		script.id = "script-" + scripts[i];
		script.src = scripts[i];
		script.type = 'text/javascript';
		$('head')[0].appendChild(script);
	    }
	}
});
