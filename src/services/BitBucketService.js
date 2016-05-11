function BitBucketService(){
	var caller = new BitBucketAPICaller();
	
	this.getPullRequests = function(owner, repo, callback) {
		caller.get('repositories/' + owner + '/' + repo + '/pullrequests', function (pullrequests) {
			var transformer = new PullRequestTransformer();
			var transformed = pullrequests.values.map(function(item){
				return transformer.transform(item, "BITBUCKET");
			});	
			callback(transformed);
		});
	}
}

