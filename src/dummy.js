function get(query, callback) {
    switch (query) {
        case "/":
            callback(constructRoot());
            break;
        default:
            break;
    }
}

function constructRoot() {
    var res = {
        "users": "",
        "pull-requests": "",
        "sessions": "",
        "events": "",
        "event-positions": "",
        "event-types": ""
    };
    return res;
}

function constructUsers() {

}

function constructPullRequests() {

}

function constructSessions() {

}

function constructEvents() {

}

function constructEventPositions() {

}

function constructEventTypes() {

}