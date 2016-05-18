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
    	'modules/time-and-pr-size',
    	'modules/time',
    	'modules/pr-size',
    	'modules/pull-requests'
    	]
    ]; 
});