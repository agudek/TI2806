$(document).ready(function () {
	var lastLoadedScriptIndex = 0;
	var scriptfiles = [
	    'settings.js',
	    'apicallers.js',
	    'pullrequestTransformer.js',
	    'services/OctopeerService.js',
	    'services/GithubService.js',
	    'services/BitBucketService.js',
	    'graph.js'
	];

	loadScript(scriptfiles[0]);
	function loadScript(scriptName){
		var script = document.createElement('script');
		script.id = "script-" + scriptName;
		script.src = scriptName;
		script.type = 'text/javascript';
		$('head')[0].appendChild(script);
		$('#script-' + parseName(scriptName)).ready(function () {
			lastLoadedScriptIndex++;
			if(lastLoadedScriptIndex < scriptfiles.length){
				loadScript(scriptfiles[lastLoadedScriptIndex]);
			}
		});

	}

	function parseName(scriptName){
		return scriptName.replace('/','');
	}
});
