/* globals define */
define([], function () {
    "use strict";
    
    return [
	    [// Array of non-visualisation modules
         // Keep in mind that there should be a corresponding module_test.js in the /test folder
	    'settings',
        'cache',
	    'apicallers',
	    'pullrequestTransformer',
        'resolvers/objectResolver',
	    'services/OctopeerAPI',
	    'services/OctopeerService',
        'services/GithubAPI',
	    'services/GithubService',
        'services/BitbucketAPI',
	    'services/BitBucketService',
        'services/DataAggregator',
	    'example-services',
        'script.TI2806.js'
	    ],
	    [// Array of visualisation modules
    	'modules/scatter',
    	'modules/pull-requests',
    	'modules/time-and-pr-size',
    	'modules/time',
    	'modules/pr-size',
    	'modules/average-comment-size-compared',
    	'modules/average-comment-size-yours',
    	'modules/average-comment-size-total',
        'modules/users'
    	]
    ]; 
});
