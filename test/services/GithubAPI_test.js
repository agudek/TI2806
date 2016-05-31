(function () {
    module('Test GitHubAPI object', {
        // Set up this module
        setup: function () {
            this.ghapi = new GithubAPI();
        }
    });

    test("GitHubAPI builds simple pullrequest URL (1 parameter)", function (assert) {
        var prURL = this.ghapi.urlBuilder('repos/mboom/TI2806/pulls', {state: "all"});
        assert.equal(prURL, "http://api.github.com/repos/mboom/TI2806/pulls?state=all", "matches hardcoded URL");
    });

    test("GitHubAPI builds pullrequest URL (2 parameters)", function (assert) {
        var prURL = this.ghapi.urlBuilder('repos/mboom/TI2806/pulls', {state: "all", sort: "popularity"});
        assert.equal(prURL, "http://api.github.com/repos/mboom/TI2806/pulls?state=all&sort=popularity", "matches hardcoded URL");
    });
}());