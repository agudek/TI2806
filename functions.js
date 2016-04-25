function get(url, callback) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            callback(http.responseText);
        }
    };
    http.open('GET', url, true);
    http.setRequestHeader('Access-Control-Allow-Headers', 'x-requested-with');
    http.send(null);
}