/* globals OctopeerHelper, OctopeerService, GithubService, BitBucketService, DataAggregator */
/* exported modules, octopeerHelper, octopeerService, githubService, bitbucketService, dataAggregator */

//Global modules list for if the module objects are needed elsewhere.
var modules = [];

//Global helper objects
var octopeerHelper = new OctopeerHelper();
var octopeerService = new OctopeerService();
var githubService = new GithubService();
var bitbucketService = new BitBucketService();
var dataAggregator = new DataAggregator();