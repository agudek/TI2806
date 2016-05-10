function OctopeerCaller(host) {
	this.get = function get(query, callback) {
	    var http = new XMLHttpRequest();
	    http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
		    callback(JSON.parse(http.responseText));
		} else {
		    var error = {
			'http-status': http.status,
			'response-headers': http.getAllResponseHeaders().toString()
		    }
		    callback(error);
		}
	    };
	    http.open('GET', host + query.replace(host, '') + '?format=json', true);
	    http.send(null);
	 }
}

