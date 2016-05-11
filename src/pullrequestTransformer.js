function pullRequestTransformer(pullrequest, type) {
	switch (type) {
		case "GITHUB":
			return transformGithubPullrequest(pullrequest);
		case "BITBUCKET":
			return transformBitbucketPullrequest(pullrequest);
		default:
			console.log("Unaccepted type");
	}
	
	function transformGithubPullrequest(pullrequest) {
		return {
			"title": pullrequest.title,
			"author": pullrequest.user.login,
			"created_on": pullrequest.created_at,
			"updated_on": pullrequest.updated_at,
			"description": pullrequest.body,
			"state": pullrequest.state,
			"merged": pullrequest.merged
		}
	}

	function transformBitbucketPullrequest(pullrequest) {
		var merged = (pullrequest.merge_commit !== null);
		return {
			"title": pullrequest.title,
			"author": pullrequest.author.username,
			"created_on": pullrequest.created_on,
			"updated_on": pullrequest.updated_on,
			"description": pullrequest.description,
			"state": pullrequest.state,
			"merged": merged
		}
	}
}

