/* globals Settings, OctopeerCaller */
/* exported OctopeerService */

function OctopeerService() {
	var settings = new Settings();
	var api = new OctopeerAPI();
	var caller = new OctopeerCaller(settings.host);
	//var caller = new DummyCaller(settings.host);

    this.getPullRequestsAmount = function (callback) {
        caller.get('/pull-requests/', function (pullrequests) {
            callback(pullrequests.count);
        });
    };

	this.getUserAmount = function(callback){
		caller.get('/users/', function (users) {
			callback(users.count);
		});
	}

	this.getPullRequestsFor = function(from, to, callback) {
		let url = api.urlBuilder(api.endpoints.pullRequests, { 
			"from": from,
			"to": to,
		});
		var promise = new RSVP.Promise(function(fulfill, reject) {
			get(url, function(pullrequests){
				fulfill(pullrequests);
			});
		})
		promise.then(pullRequestsResolver).then(function(prs){
			console.log(prs);
		});
			
	}

	this.getSemanticEventsFor = function(callback) {
		let url = api.urlBuilder(api.endpoints.semanticEvents, {});
		var promise = new RSVP.Promise(function(fulfill, reject) {
			get(url, function(semanticEvents){
				fulfill({ 
					"results": semanticEvents.results,
					"attribute": "event_type"
				});
			});
		})
		promise.then(urlResolver).then(function(events){
			console.log(events);
		})
	}

	var cache = {};

	function urlResolver(resolve){
		var attributeName = resolve.attribute;
		var promises = resolve.results.map(function (object) {
			return new RSVP.Promise(function(fulfill, reject){
				if(cache.hasOwnProperty(object[attributeName])){
					object[attributeName] = cache[object[attributeName]];
					fulfill(object);
				} else {
					get(object[attributeName], function(attribute){
						cache[object[attributeName]] = attribute;
						object[attributeName] = attribute;
						fulfill(object);
					});
				}
			});
		});
		return RSVP.all(promises);
	}
}

