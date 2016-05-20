/* globals BitBucketAPI, PullRequestTransformer, getJSON */
/* exported BitBucketService */
function BitBucketService() {
    "use strict";
    var api;
    api = new BitBucketAPI();
    
    this.getPullRequests = function (owner, repo, callback) {
        getJSON(api.urlBuilder('repositories/' +
                               owner + '/' +
                               repo +
                               '/pullrequests', {}), function (pullrequests) {
            var transformer, transformed;
            transformer = new PullRequestTransformer();
            transformed = pullrequests.values.map(function (item) {
                return transformer.transform(item, "BITBUCKET");
            });
            callback(transformed);
        });
    };
}

