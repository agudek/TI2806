function OctopeerAPI() {
	"use strict";
    
    this.apiUrl = "http://146.185.128.124/api";
	this.endpoints = {
		'repositories' : "/repositories",
		'users' : "/users/",
		'pullRequests' : "/pull-requests",
		'sessions' : "/sessions",
		'eventTypes' : "/event-types",
		'elementTypes' : "/element-types",
		'semanticEvents' : "/semantic-events",
		'eventPositions' : "/event-positions",
		'keyStrokeEvents' : "/keystroke-events",
		'mousePositionEvents' : "/mouse-position-events",
		'mouseClickEvents' : "/mouse-click-events",
		'mouseScrollEvents' : "/mouse-scroll-events",
		'windowResolutionEvents' : "/window-resolution-events"
	};
    
	this.urlBuilder = function (endpoint, parameters) {
        var url, firstParameter, attribute;
        url = this.apiUrl + endpoint;
		firstParameter = true;
        
		for (attribute in parameters) {
            if (parameters[attribute] !== undefined) {
                if (firstParameter) {
                    firstParameter = false;
                    url += "?" + attribute + "=" + encodeURIComponent(parameters[attribute]);
                } else {
                    url += "&" + attribute + "=" + encodeURIComponent(parameters[attribute]);
                }
            }
		}
		
		return url;
	};
}

