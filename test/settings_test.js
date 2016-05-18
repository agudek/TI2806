(function($) {
    module('Settings for the connection to the Octopeer server', {
        // Set up this module
        setup: function() {
          this.settings = new Settings();
        }
    });


    test("Check the settings hostname for a valid domain or IP address", function(assert){
        var matchesIP = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        var matchesDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
        ok((this.settings.hostname.match(matchesIP) || this.settings.hostname.match(matchesDomain)), 'is valid');
    })
}(jQuery));