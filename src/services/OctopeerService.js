/*exported OctopeerService*/
/*globals RSVP, Settings, OctopeerAPI, ObjectResolver, getJSON*/
/**
 * This object will create a service object. This object contains useful calls to the octopeer
 * server. Every function will return promises.
 *
 * @constructor
 * @this {OctopeerService}
 */
function OctopeerService() {
    "use strict";
    var settings, api;
    settings = new Settings();
    api = new OctopeerAPI();
    //var caller = new DummyCaller(settings.host);

    this.getUsers = function () {
        var url, promise;
        url = api.urlBuilder(api.endpoints.users, {});

        promise = new RSVP.Promise(function (fulfill) {
            getJSON(url, function (users) {
                fulfill(users);
            });
        });
        return promise;
    };

    this.getPullRequests = function () {
        var url, objectResolver, promise;
        objectResolver = new ObjectResolver(["session"]);
        url = api.urlBuilder(api.endpoints.pullRequests, {});

        promise = new RSVP.Promise(function (fulfill) {
            getJSON(url, function (pullRequests) {
                fulfill(objectResolver.resolveArray(pullRequests));
            });
        });
        return promise;
    };

    this.getSemanticEvents = function () {
        var url, objectResolver, promise;
        objectResolver = new ObjectResolver(["element_type", "event_type", "session"]);
        url = api.urlBuilder(api.endpoints.semanticEvents, {});

        promise = new RSVP.Promise(function (fulfill, reject) {
            getJSON(url, function (events) {
                fulfill(objectResolver.resolveArray(events.results));
            }, function (error) {
                reject(error);
            });
        });
        return promise;
    };

    this.getRepositories = function () {
        var url, promise;
        url = api.urlBuilder(api.endpoints.repositories, {});

        promise = new RSVP.Promise(function (fulfill) {
            getJSON(url, function (users) {
                fulfill(users);
            });
        });
        return promise;
    };
}
