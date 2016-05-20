/*exported BitbucketAPI*/
/**
* This will try to easily create an url to call for the Bitbucket api
*
* @constructor
* @this {BitbucketAPI}
*/
function BitBucketAPI() {
    "use strict";

    this.apiUrl = "http://api.bitbucket.org/2.0/";
    this.endpoints = {
    };

    /**
    * This is a function which will create the url for you. First you give an 
    * endpoint (which is defined above in GithubAPI.endpoints),
    * and parameters is an object with url parameters
    *
    * @param {String} endpoint the endpoint on which to call, preferable one 
    *                 from the endpoints above
    * @param {Object} parameters an object with parameters, attribute name 
    *                 is the parameter name, the value is the parameter value
    */
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
