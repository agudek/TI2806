function get(query, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            callback(JSON.parse(http.responseText));
        }
    };
    http.open('GET', host + query + '?format=json', true);
    http.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with');
    http.send(null);
}