/*exported DataAggregator*/
/*globals OctopeerService, GithubService, BitBucketService, RSVP, console*/
function DataAggregator() {
    "use strict";
    var opService, ghService, bbService;
    
    opService = new OctopeerService();
    ghService = new GithubService();
    bbService = new BitBucketService();
    
    
    /**
        Helper functions graph 1
    */
    function setSemanticEvents(sessions) {
        var promises;
            
        promises = [];
        sessions.forEach(function (session) {
            promises.push(new RSVP.Promise(function (fulfill) {
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
    
    /**
        Helper functions graph 2
    */
    function resolvePullrequestSessions(sessions) {
        var pullRequests = [], dictionary = {}, counter = 0;
        
        sessions.forEach(function (session) {
            if (!dictionary.hasOwnProperty(session.pull_request.url)) {
                dictionary[session.pull_request.url] = counter;
                pullRequests.push(session.pull_request);
                pullRequests[dictionary[session.pull_request.url]].sessions = [];
                counter += 1;
            }
            pullRequests[dictionary[session.pull_request.url]].sessions.push(session);
        });
        return pullRequests;
    }
    
    function setSemanticEventsForSessionsFromPullRequests(pullRequests) {
        var promises = [];
        pullRequests.forEach(function (pr) {
            promises.push(setSemanticEvents(pr.sessions).then(function (sessions) {
                pr.sessions = sessions;
                return pr;
            }));
        });
        return RSVP.all(promises);
    }
    
    function filterSessionStartFromSessionsFromPullRequests(pullRequests) {
        pullRequests.forEach(function (pr) {
            pr.sessions.forEach(function (session) {
                session.events = session.events.filter(function (se) {
                    return se.event_type === "http://146.185.128.124/api/event-types/4/";
                });
            });
        });
        return pullRequests;
    }
    
    function sumDurationOfSessionsFromPullRequests(pullRequests) {
        pullRequests.forEach(function (pr) {
            var summedDuration = 0;
            pr.sessions.forEach(function (session) {
                session.events.forEach(function (se) {
                    summedDuration += se.duration;
                });
            });
            pr.totalDuration = summedDuration;
            summedDuration = 0;
        });
        return pullRequests;
    }
    
    /**
        public graph 1 function (comment count and pullrequests)
    */
    this.graphCommentAmountPerPullRequests = function (userName) {
        var promise;
        promise = new RSVP.Promise(function (fulfill) {
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
    
    /**
        public graph 2 function (pull requests bar divided in sessions and duration)
    */
    this.graphPrDividedInSessions = function (userName, amountOfPr) {
        var promise;
        promise = new RSVP.Promise(function (fulfill) {
            opService.getSessions()
                .then(resolvePullrequestSessions)
                .then(function (pullRequests) {
                    return pullRequests.splice(0, amountOfPr);
                })
                .then(setSemanticEventsForSessionsFromPullRequests)
                .then(filterSessionStartFromSessionsFromPullRequests)
                .then(sumDurationOfSessionsFromPullRequests)
                .then(fulfill);
        });
        return promise;
    };
}