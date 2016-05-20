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
	    'example-services'
	    ],
	    [// Array of visualisation modules
    	'modules/scatter',
    	'modules/filled-graph',
    	'modules/animated-bar-chart',
    	'modules/pull-requests'
    	]
    ]; 
});
