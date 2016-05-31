/* globals OctopeerHelper, OctopeerService, GitHubService, BitBucketService, DataAggregator */
/* exported modules, octopeerHelper, octopeerService, gitHubService, bitbucketService, dataAggregator */

//Global modules list for if the module objects are needed elsewhere.
var modules = [];

//Global helper objects
var octopeerHelper = new OctopeerHelper();
var octopeerService = new OctopeerService();
var gitHubService = new GitHubService();
var bitbucketService = new BitBucketService();
var dataAggregator = new DataAggregator();