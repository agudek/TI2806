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
    	'modules/pull-requests',
    	'modules/time-and-pr-size',
    	'modules/time',
    	'modules/pr-size',
    	'modules/average-comment-size-compared',
    	'modules/average-comment-size-yours',
    	'modules/average-comment-size-total'
    	]
    ]; 
});