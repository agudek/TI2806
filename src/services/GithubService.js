function GithubService() {
	var caller = new GitHubAPICaller();

	this.getPullRequests = function(owner, repo, callback){
		caller.get('repos/' + owner + '/' + repo + '/pulls?state=all', function (pullrequests){
			var transformer = new PullRequestTransformer();
			var transformed = pullrequests.map(function (pr) {
				return transformer.transform(pr, "GITHUB");
			});
			callback(transformed);
		})
	}

	this.getPullRequest = function(owner, repo, number, callback){
		caller.get('repos/' + owner + '/' + repo + '/pulls' + '/' + number, function (pullrequest) {
			var transformer = new PullRequestTransformer();
			var transformed = transformer.transform(pullrequest, "GITHUB");
			getFilesChanged(owner, repo, number, function(files){
				transformed.files = files;
				callback(transformed);
			});
		});
	}

	function getFilesChanged(owner, repo, number, callback) {
		caller.get('repos/' + owner + '/' + repo + '/pulls' + '/' + number + '/files', function (files){
			var transformer = new PullRequestTransformer();
			var transformed = transformer.transformGithubFiles(files);
			callback(transformed);
		});
	}
}

