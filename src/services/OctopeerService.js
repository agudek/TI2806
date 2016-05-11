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

