function OctopeerCaller(host) {
	this.get = function get(query, callback) {
	    var http = new XMLHttpRequest();
	    http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status >= 200 && http.status < 400) {
		    callback(JSON.parse(http.responseText));
		} else if (http.status >= 400){
		    var error = {
			'http-status': http.status,
			'response-headers': http.getAllResponseHeaders().toString()
		    }
		    console.log(error);
		}
	    };
	    http.open('GET', host + query.replace(host, '') + '?format=json', true);
	    http.send(null);
	 }
}

function GitHubAPICaller(){
	var host = 'https://api.github.com/';

	this.get = function(endpoint, callback){
		var http = new XMLHttpRequest();
		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status >= 200 && http.status < 400) {
				callback(JSON.parse(http.responseText));
			} else if (http.status >= 400) { 
			    var error = {
				'http-status': http.status,
				'response-headers': http.getAllResponseHeaders().toString()
			    }
			    console.log(error);
			}
		    };
		    http.open('GET', host + endpoint.replace(host, ''), true);
		    http.send(null);
	}
}

function BitBucketAPICaller(){
	var host = 'https://api.bitbucket.org/2.0/';

	this.get = function(endpoint, callback){
		var http = new XMLHttpRequest();
		http.onreadystatechange = function () {
			if (http.readyState == 4 && http.status >= 200 && http.status < 400) {
				callback(JSON.parse(http.responseText));
			} else if (http.status >= 400) {
			    var error = {
				'http-status': http.status,
				'response-headers': http.getAllResponseHeaders().toString()
			    }
			    console.log(error);
			}
		    };
		    http.open('GET', host + endpoint.replace(host, ''), true);
		    http.send(null);
	}
}

