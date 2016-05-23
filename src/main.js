/* globals define, modules : true, ajax */
/* exported ajax */

//http://stackoverflow.com/questions/17446844/dynamic-require-in-requirejs-getting-module-name-has-not-been-loaded-yet-for-c
define(['modules/moduleList'], function (dynModules) {

    require(dynModules[0]);
    require(dynModules[1], function () {
        // Set global modules variable to a list of all imported modules after converting pseudo-array to array
        modules = Array.prototype.slice.call(arguments);


        //http://stackoverflow.com/questions/5627284/pass-in-an-array-of-deferreds-to-when
        //Define function when.all() with which multiple deferreds can be passed to when() in an 
        //array and can be retreived again in then()
        if (jQuery.when.all === undefined) {
            jQuery.when.all = function (deferreds) {
                var deferred = new jQuery.Deferred();
                $.when.apply(jQuery, deferreds).then(
		            function () {
		                deferred.resolve(Array.prototype.slice.call(arguments));
		            },
		            function () {
		                deferred.fail(Array.prototype.slice.call(arguments));
		            });

                return deferred;
            };
        }

        //Make an array of Ajax objects with the parameters retreived from the module 'ajax' field
        function generateAjaxArray(json) {
            if (json === undefined || json === {}) { return []; }
            var ajaxArray = json.ajax;
            var ret = [];
            for (var ajax in ajaxArray) {
                console.log(ajax);
                //TODO  Create Ajax objects (or other deferred objects) from given JSON object
                //		Currently not planning to implement as needs to be implemented in a way 
                //		that supports the data collection engine of Borek. This does mean that 
                //		Ajax calls from inside modules by defining the ajax field will not work.
                //		However, until this is implemented, Ajax calls could be executed from
                //		inside the body in a(n) (a-)synchronous manner.
            }
            return ret;
        }

        //Make an array of the responses of the Ajax requests
        function generateResponseArray(objects) {
            var ret = [];
            for (var ajax in objects) {
                ret.push(ajax.response);
            }
            return ret;
        }

        //Return true if at least one Ajax request has failed.
        function singleFail(objects) {
            for (var ajax in objects) {
                if (ajax.responseText === null && ajax.required) {
                    return true;
                }
            }
            return false;
        }

        //The when() call for the array of deferreds of this module
        function whenAjaxArray(module, ajaxArray, outerdiv) {
            $.when.all(ajaxArray).then(function (objects) {
                if (singleFail(objects) && module.failBody) {
                    $(module.failBody()).appendTo(outerdiv);
                }
                else {
                    $(module.body(generateResponseArray(objects))).appendTo(outerdiv);
                }
            });
        }

        //For each module, read its arguments, set up divs to append to, execute the Ajax calls 
        //if available and append it to the DOM.

        for (var i = 0; i < arguments.length; i++) {
            var parentContainer = $('div#bodyrow');
            if (arguments[i].parentSelector) {
                parentContainer = $(arguments[i].parentSelector);
            }
            var outerdiv = $(document.createElement('div'));
            outerdiv.attr('id', arguments[i].name).appendTo(parentContainer);
            if (!arguments[i].customContainer) {
                outerdiv
                    .addClass('col s12 m6');
                outerdiv = $(document.createElement('div'))
	        		.addClass('card')
                    .addClass("hoverable")
                    //The 'relative' class allow us to place absolute elements inside the card
                    //This will probably be more important in the coming sprints.
                    .addClass("relative")
	        		.appendTo(outerdiv);
                outerdiv = $(document.createElement('div'))
                    .addClass('card-content')
                    .appendTo(outerdiv);
                $(document.createElement('span'))
                    .addClass("card-title")
                    .addClass("truncate")
                    .addClass("flow-text")
                    .html(arguments[i].title)
                    .appendTo(outerdiv);
                $(document.createElement('li'))
                    .addClass("material-icons")
                    .addClass("warningBadge")
                    .html("warning")
                    .appendTo(outerdiv);
                $(document.createElement('li'))
                    .addClass("material-icons")
                    .addClass("errorBadge")
                    .html("error")
                    .appendTo(outerdiv);
            }
            var ajaxArray = generateAjaxArray(arguments[i].ajax);
            if (ajaxArray && ajaxArray !== []) {
                whenAjaxArray(arguments[i], ajaxArray, outerdiv);
            }
            else {
                $(arguments[i].body()).appendTo(outerdiv);
            }
        }

    });

});
