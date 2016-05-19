/*globals console, get, RSVP, Settings, OctopeerAPI, OctopeerCaller, ObjectResolver*/
function OctopeerService() {
    "use strict";
    var settings, api, caller, cache;
    cache = {};
    settings = new Settings();
    api = new OctopeerAPI();
    caller = new OctopeerCaller(settings.host);
	//var caller = new DummyCaller(settings.host);

	this.getUsers = function (callback) {
        var url, promise;
		url = api.urlBuilder(api.endpoints.users, {});
        
        promise = new RSVP.Promise(function (fulfill, reject) {
            get(url, function (users) {
                fulfill(users);
            });
        });
        return promise;
	};

	this.getPullRequestsFor = function (from, to, callback) {
        var url, objectResolver, promise;
        objectResolver = new ObjectResolver(["session"]);
		url = api.urlBuilder(api.endpoints.pullRequests, {});
        
        promise = new RSVP.Promise(function (fulfill, reject) {
            get(url, function (pullRequests) {
                fulfill(objectResolver.resolveArray(pullRequests));
            });
        });
        return promise;
	};

	this.getSemanticEvents = function (callback) {
        var url, objectResolver, promise;
        objectResolver = new ObjectResolver(["element_type", "event_type", "session"]);
		url = api.urlBuilder(api.endpoints.semanticEvents, {});
        
        promise = new RSVP.Promise(function (fulfill, reject) {
            get(url, function (events) {
                fulfill(objectResolver.resolveArray(events.results));
            });
        });
        return promise;
	};
    
    this.getRepositories = function (callback) {
        var url, promise;
		url = api.urlBuilder(api.endpoints.repositories, {});
        
        promise = new RSVP.Promise(function (fulfill, reject) {
            get(url, function (users) {
                fulfill(users);
            });
        });
        return promise;
    };
}

