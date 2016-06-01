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

        function scaleAxis(module, objects, axisname) {
            /*jshint maxcomplexity:7 */
            if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisScale")() === "fit"){
                var axis = octopeerHelper.getSafeModuleValue(module,axisname+"AxisFitFunction")(objects);
                axis.scale().range([350-50-10,0]).nice();
                if(axisname === "x") {
                    axis.orient("bottom");
                    axis.scale().range([720-50-50,0]);
                    if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                        axis.tickSize(-350+50+10);
                    }
                } else if (axisname === "y") {
                    axis.orient("left");
                    if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                        axis.tickSize(-720+50+50);
                    }
                } else {
                    axis.orient("right");
                    if(octopeerHelper.getSafeModuleValue(module,axisname+"AxisTicks")) {
                        axis.tickSize(720-50-50);
                    }
                }
                d3.select(module.svg).select("."+axisname+"Axis")
                    .transition()
                    .duration(500)
                    .ease("sin-in-out")
                    .call(axis);

                d3.select(module.svg).select("."+axisname+"Axis")
                    .selectAll("text")
                    .attr("transform", 
                        "rotate("+octopeerHelper.getSafeModuleValue(module,axisname+"AxisLabelRotation")+")"
                    );
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

        function performDataRequests(data, module) {
            var promises = [];
            for(var i = 0 ; i < data.length ; i++){
                var promise = data[i].serviceCall();
                promise.onSuccess = data[i].onSuccess;
                promises.push(promise);
            }
            RSVP.all(promises).then(function (objects) {
                $(module.body(objects).node()).appendTo($(module.svg).find('g.content'));
                scaleAxes(module, objects);
                /* TODO if (singleFail(objects) && module.failBody) {
                    $(module.failBody()).appendTo(outerdiv);
                }
                else {
                    $(module.body(objects)).appendTo(outerdiv);
                }*/
            });
        }

        function drawLegend(module) {
            var legendData = octopeerHelper.getSafeModuleValue(module,"legend");
            var legend = d3.select(module.svg).append("g")
                .attr("class","legend");
            for (var i = 0 ; i < legendData.length ; i++) {
                switch(legendData[i].type) {
                    case "linewith" : 
                    case "line" : 
                        legend.append("line")
                            .attr("x1",635)
                            .attr("y1",20+i*25)
                            .attr("x2",665)
                            .attr("y2",20+i*25)
                            .attr("style",legendData[i].style);
                        legend.append("text")
                            .attr("x",630)
                            .attr("y",25+i*25)
                            .attr("text-anchor","end")
                            .text(legendData[i].text);
                        break;
                    case "dot":
                    case "rect" : 
                        legend.append("rect")
                            .attr("x",635)
                            .attr("y",10+i*25)
                            .attr("width",30)
                            .attr("height",20)
                            .attr("style",legendData[i].style);
                        legend.append("text")
                            .attr("x",630)
                            .attr("y",25+i*25)
                            .attr("text-anchor","end")
                            .text(legendData[i].text);
                        break;
                }
            }
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
                var svg = createSVG(arguments[i]);
                svg.append('g')
                    .attr("class","content");
                arguments[i].svg = svg.node();
            }
            $(arguments[i].svg).appendTo(outerdiv);
            drawLegend(arguments[i]);
            if(arguments[i].data) {
                performDataRequests(arguments[i].data, arguments[i]);
            } else {
                //Expects the modules to return a d3 encapsulated element
                $(arguments[i].body().node()).appendTo($(arguments[i].svg).find('g.content'));
                scaleAxes(arguments[i], null);
            }
        }

    });

    });

});
