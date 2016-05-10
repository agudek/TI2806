function GithubService() {
	var caller = new GitHubAPICaller();

	this.getPullRequest = function(owner, repo, number, callback){
		caller.get('repos/' + owner + '/' + repo + '/pulls' + '/' + number, function (pullrequest) {
			callback(pullrequest);
		});
	}
}

