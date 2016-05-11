var octopeerService = new OctopeerService();
octopeerService.getPullRequestsAmount(function (amount) {
	$('#pullrequests-count').text(amount);
});

var githubService = new GithubService();
githubService.getPullRequest('mboom', 'TI2806', 67, function (pullrequest) {
	console.log(pullrequest);
});

var bitbucketService = new BitBucketService();
bitbucketService.getPullRequests('jespern','django-piston', function (pullrequests){
	console.log(pullrequests);
});

