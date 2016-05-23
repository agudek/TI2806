/*globals OctopeerService, GithubService, BitBucketService, RSVP, console, hasOwnProperty*/
function DataAggregator() {
    "use strict";
    var opService, ghService, bbService;
    
    opService = new OctopeerService();
    ghService = new GithubService();
    bbService = new BitBucketService();
    
    function setSemanticEvents(sessions) {
        var promises;
            
        promises = [];
        sessions.forEach(function (session) {
            promises.push(new RSVP.Promise(function (fulfill, reject) {
                opService.getSemanticEventsBySession(session.id).then(function (semanticEvents) {
                    session.events = semanticEvents.results;
                    fulfill(session);
                });
            }));
        });
            
        return RSVP.all(promises);
    }
    
    function filterSessionsForComments(sessions) {
        sessions.forEach(function (session) {
            session.events = session.events.filter(function (event) {
                return event.event_type === "http://146.185.128.124/api/event-types/4/"; //Should be checked
            });
        });

        return sessions;
    }
    
    function pullRequestCommentObject(sessions) {
        var i, pullRequests = [], pr;
        
        sessions.forEach(function (session) {
            var found = false;
            for (i = 0; i < pullRequests.length; i += 1) {
                pr = pullRequests[i];
                if (pr.repository.url === session.pull_request.repository.url &&
                        pr.pull_request_number === session.pull_request.pull_request_number) {
                    pullRequests[i].commentCount += session.events.length;
                    found = true;
                }
            }
            if (!found) {
                session.pull_request.commentCount = session.events.length;
                pullRequests.push(session.pull_request);
            }
        });
        return pullRequests;
    }
    
    this.graphCommentAmountPerPullRequests = function (userName) {
        var promise;
        
        promise = new RSVP.Promise(function (fulfill, reject) {
            opService.getSessions()
            //opService.getSessionsFromUser(userName)
                .then(setSemanticEvents)
                .then(filterSessionsForComments)
                .then(pullRequestCommentObject)
                .then(function (pullRequests) {
                    fulfill(pullRequests);
                });
        });
        
        return promise;
    };
}