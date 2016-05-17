define([], function () {
    return [
	    [// Array of non-visualisation modules
	    'settings',
	    'apicallers',
	    'pullrequestTransformer',
	    'services/OctopeerService',
	    'services/GithubService',
	    'services/BitBucketService'
	    ],
	    [// Array of visualisation modules
    	'modules/scatter',
    	'modules/filled-graph',
    	'modules/animated-bar-chart',
    	'modules/pull-requests'
    	]
    ]; 
});