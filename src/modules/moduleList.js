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
        'OctopeerHelper',
        'resolvers/objectResolver',
	    'services/OctopeerAPI',
	    'services/OctopeerService',
        'services/GithubAPI',
	    'services/GithubService',
        'services/BitbucketAPI',
	    'services/BitBucketService',
        'svgCreator',
        'services/DataAggregator',
        'globals'
	    ],
        //Module with default values. Needs to be loaded in seperately 
        //so that they can be used in the visualistaion modules without problems
        ['modules/default-module-values'],
	    [// Array of visualisation modules
    	'modules/pull-requests',
    	'modules/time-and-pr-size',
    	'modules/time',
    	'modules/pr-size',
    	'modules/average-comment-size-compared',
    	'modules/average-comment-size-yours',
    	'modules/average-comment-size-total',
        'modules/graph1.js',
        'modules/graph2.js'
    	]
    ]; 
});
