/* globals define, octopeerHelper, createSVG, RSVP, modules : true, ajax */
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

        function scaleAxis(module, object, axisname) {
            /*jshint maxcomplexity:7 */
            if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisScale")() === "fit"){
                var Scale = d3.scale.linear()
                    .domain(octopeerHelper.getSafeModuleValue(module,axisname+"AxisFitFunction")())
                    .range([350-50-10,0])
                    .nice();
                var Axis = d3.svg.axis().scale(Scale);
                if(axisname === "x") {
                    Axis.orient("bottom");
                    if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                        Axis.tickSize(-350+50+10);
                    }
                } else if (axisname === "y") {
                    Axis.orient("left");
                    if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                        Axis.tickSize(-720+50+50);
                    }
                } else {
                    Axis.orient("right");
                    if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                        Axis.tickSize(720-50-50);
                    }
                }
                d3.select(module.svg).select("."+axisname+"Axis")
                    .transition()
                    .duration(500)
                    .ease("sin-in-out")
                    .call(Axis);
            }
        }

        function scaleAxes(module, objects) {
            if(octopeerHelper.getSafeModuleValue(module,"xAxis")){
                scaleAxis(module, objects, "x");
            }
            if(octopeerHelper.getSafeModuleValue(module,"yAxis")){
                scaleAxis(module, objects, "y");
            }
            if(octopeerHelper.getSafeModuleValue(module,"yRightAxis")){
                scaleAxis(module, objects, "yRight");
            }
        }

        function performDataRequests(data, module, outerdiv) {
            var promises = [];
            for(var i = 0 ; i < data.length ; i++){
                var promise = data[i].serviceCall();
                promise.onSuccess = data[i].onSuccess;
                promises.push(promise);
            }
            RSVP.all(promises).then(function (objects) {
                $(module.body(objects)).appendTo(outerdiv);
                scaleAxes(module, objects);
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
                scaleAxes(arguments[i], null);
            }
        }

    });

    });

});
