/*globals DataAggregator, console, $*/

var data = new DataAggregator();
data.graphCommentAmountPerPullRequests("borek2").then(function (result) {
    console.log(result);
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

