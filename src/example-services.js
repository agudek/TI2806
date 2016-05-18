/* globals OctopeerService, GithubService, BitBucketService */

var octopeerService = new OctopeerService();
octopeerService.getPullRequestsAmount(function (amount) {
	octopeerService.getPullRequestsAndTime(function(asdf){
		console.log('asdf');
	});
});

var githubService = new GithubService();
githubService.getPullRequests('mboom', 'TI2806', function (pullrequest) {
//	console.log(pullrequest);
});

var bitbucketService = new BitBucketService();
bitbucketService.getPullRequests('jespern','django-piston', function (pullrequests){
//	console.log(pullrequests);
});

