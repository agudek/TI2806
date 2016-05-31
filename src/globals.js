/* globals OctopeerHelper, OctopeerService, GitHubService, BitbucketService, DataAggregator */
/* exported modules, octopeerHelper, octopeerService, gitHubService, bitbucketService, dataAggregator */

//Global modules list for if the module objects are needed elsewhere.
var modules = [];

//Global helper objects
var octopeerHelper = new OctopeerHelper();
var octopeerService = new OctopeerService();
var gitHubService = new GitHubService();
var bitbucketService = new BitbucketService();
var dataAggregator = new DataAggregator();