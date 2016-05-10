function OctopeerService() {
	var settings = new Settings();
	//var caller = new OctopeerCaller(settings.host);
	var caller = new DummyCaller(settings.host);

	this.getPullRequestsAmount = function(callback){
		caller.get('/pull-requests/', function (pullrequests) {
			callback(pullrequests.count)
		});
	}

	this.getUserAmount = function(callback){
		caller.get('/users/', function (users) {
			callback(users.count);
		});
	}
}

function GithubService() {
	var caller = new GitHubAPICaller();

	this.getPullRequest = function(owner, repo, number, callback){
		caller.get('repos/' + owner + '/' + repo + '/pulls' + '/' + number, function (pullrequest) {
			callback(pullrequest);
		});
	}
}

var octopeerService = new OctopeerService();
octopeerService.getPullRequestsAmount(function (amount) {
	$('#pullrequests-count').text(amount);
});

var githubService = new GithubService();
githubService.getPullRequest('mboom', 'TI2806', 65, function (pullrequest) {
	console.log(pullrequest);
});

