/* globals define */

define([], function () {
    return [
	    [// Array of non-visualisation modules
         // Keep in mind that there should be a corresponding module_test.js in the /test folder
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