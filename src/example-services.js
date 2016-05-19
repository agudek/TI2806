/*globals OctopeerService, console*/

var octopeerService = new OctopeerService();
octopeerService.getSemanticEvents().then(function (prs) {
    "use strict";
    console.log(prs);
});

//var githubService = new GithubService();
//githubService.getPullRequests('mboom', 'TI2806', function (pullrequest) {
////	console.log(pullrequest);
//});
//
//var bitbucketService = new BitBucketService();
//bitbucketService.getPullRequests('jespern','django-piston', function (pullrequests){
////	console.log(pullrequests);
//});

