function PullRequestTransformer() {
	this.transform = function(pullrequest, type){
		switch (type) {
			case "GITHUB":
				return transformGithubPullrequest(pullrequest);
			case "BITBUCKET":
				return transformBitbucketPullrequest(pullrequest);
			default:
				console.log("Unaccepted type");
		}
	}
	this.transformGithubFiles = function(files) {
		return files.map(function(file) {
			return {
				"filename": file.filename,
				"additions": file.additions,
				"deletions": file.deletions,
				"status": file.status
			}
		});
	}
	
	function transformGithubPullrequest(pullrequest) {
		var merged = (pullrequest.merged_at !== null);
		return {
			"title": pullrequest.title,
			"author": pullrequest.user.login,
			"created_at": pullrequest.created_at,
			"updated_at": pullrequest.updated_at,
			"description": pullrequest.body,
			"state": pullrequest.state,
			"merged": merged
		}
	}

	function transformBitbucketPullrequest(pullrequest) {
		var merged = (pullrequest.merge_commit !== null);
		return {
			"title": pullrequest.title,
			"author": pullrequest.author.username,
			"created_at": pullrequest.created_on,
			"updated_at": pullrequest.updated_on,
			"description": pullrequest.description,
			"state": pullrequest.state,
			"merged": merged
		}
	}


}

