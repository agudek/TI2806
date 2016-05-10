$(document).ready(function () {
	var lastLoadedScriptIndex = 0;
	var scriptfiles = [
	    'settings.js',
	    'functions.js',
	    'dummy.js',
	    'aggregation.js'
	];

	loadScript(scriptfiles[0]);
	function loadScript(scriptName){
		var script = document.createElement('script');
		script.id = "script-" + scriptName;
		script.src = scriptName;
		script.type = 'text/javascript';
		$('head')[0].appendChild(script);
		$('#script-' + scriptName).ready(function () {
			lastLoadedScriptIndex++;
			if(lastLoadedScriptIndex < scriptfiles.length){
				loadScript(scriptfiles[lastLoadedScriptIndex]);
			}
		});

	}
});
