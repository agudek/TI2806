/*exported OctopeerCaller, GitHubAPICaller, BitBucketAPICaller, get, getJSON */
/*globals console, cache, $*/
function get(url, callback) {
    "use strict";
    
    if (cache.hasOwnProperty(url)) {
        callback(cache[url]);
    }
    
    $.ajax({
        url: url,
        type: "GET",
        context: document.body,
        success: function (result) {
            cache[url] = result;
            callback(result);
        },
        error: function (error) {
            console.log(error);
        }
    });
}

function getJSON(url, callback, errorCallback) {
    "use strict";
    
    if (cache.hasOwnProperty(url)) {
        callback(cache[url]);
    }
    
    $.getJSON({
        url: url,
        type: "GET",
        context: document.body,
        success: function (result) {
            cache[url] = result;
            callback(result);
        },
        error: function (error) {
            errorCallback(error);
        }
    });
}

