/* globals define, RSVP, modules : true, ajax */
/* exported ajax */

//http://stackoverflow.com/questions/17446844/dynamic-require-in-requirejs-getting-module-name-has-not-been-loaded-yet-for-c
define(['modules/moduleList'], function (dynModules) {

    require(dynModules[0], function () {

        require(dynModules[1], function(module) {
            octopeerHelper.defaultModule = module;
        });

        require(dynModules[2], function () {
        // Set global modules variable to a list of all imported modules after converting pseudo-array to array
        modules = Array.prototype.slice.call(arguments);

        function performDataRequests(data, module, outerdiv) {
            var promises = [];
            for(var i = 0 ; i < data.length ; i++){
                var promise = data[i].serviceCall();
                promise.onSuccess = data[i].onSuccess;
                promises.push(promise);
            }
            RSVP.all(promises).then(function (objects) {
                $(module.body(objects)).appendTo(outerdiv);
                /* TODO if (singleFail(objects) && module.failBody) {
                    $(module.failBody()).appendTo(outerdiv);
                }
                else {
                    $(module.body(objects)).appendTo(outerdiv);
                }*/
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
                outerdiv.addClass('col s12 m6');
                outerdiv = $(document.createElement('div'))
	        		.addClass('card')
                    .addClass("hoverable")
                    //The 'relative' class allow us to place absolute elements inside the card
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
            arguments[i].svg = createSVG(arguments[i])[0][0];
            $(arguments[i].svg).appendTo(outerdiv);
            if(arguments[i].data) {
                performDataRequests(arguments[i].data, arguments[i], outerdiv);
            } else {
                //Expects the modules to return a d3 encapsulated element
                $(arguments[i].body()[0][0]).appendTo(arguments[i].svg);
            }
        }

    });

    });

});
