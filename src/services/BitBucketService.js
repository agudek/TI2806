function BitBucketService(){
	var caller = new BitBucketAPICaller();
	
	this.getPullRequests = function(owner, repo, callback) {
		caller.get('repositories/' + owner + '/' + repo + '/pullrequests', function (pullrequests) {
			var transformed = pullrequests.values.map(function(item){
				return pullRequestTransformer(item, "BITBUCKET");
			});	
			callback(transformed);
		});
	}
}

