/* exported createSVG */
/*globals octopeerHelper*/
/*jshint esnext: true */
/* jshint unused : vars */

function createSvgContainer(w = 720, h = 350) {
	var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
        	.attr("width", '100%')
            .attr("height", '100%')
            .attr("viewBox", "0 0 "+w+" "+h);
	return svg;
}

//https://groups.google.com/forum/#!topic/d3-js/AsbOTQskipU
function d3append(parent, child) {
	parent.select(function() {
		return this.appendChild(child.node());
	});
}

function createLeftYAxis(module) {
	var scale;
	if ((scale = octopeerHelper.getSafeModuleValue(module,"yAxisScale")()) === "fit") {
		scale = d3.scale.linear().domain([0,100]).range([350-50-10,0]).nice();
	}

	var axis = d3.svg.axis()
        .scale(scale)
        .orient("left");

    if(octopeerHelper.getSafeModuleValue(module,"yAxisTicks")) {
        axis.tickSize(-720+50+50);
    }

    var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

    var axisContainer = g.append("g")
        .attr("transform", "translate("+50+"," + 10 + ")")
        .attr("class","yAxis noAxis visibleTicks").call(axis);

    var degrees;
    if((degrees = octopeerHelper.getSafeModuleValue(module,"yAxisLabelRotation")) > 0) {
        axisContainer.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate("+degrees+")")
            .style("text-anchor", "start");
    }

    if(octopeerHelper.getSafeModuleValue(module,"yAxisLine")) {
    	axisContainer.append("line")
            .attr("y1",350-50-10)
            .attr("y2",0)
            .attr("style","stroke-width:1px;stroke:black");
    }
    return g;
}

function createRightYAxis(module) {
	var scale;
	if ((scale = octopeerHelper.getSafeModuleValue(module,"yRightAxisScale")()) === "fit") {
		scale = d3.scale.linear().domain([0,100]).range([350-50-10,0]).nice();
	}

	var axis = d3.svg.axis()
        .scale(scale)
        .orient("right");

    if(octopeerHelper.getSafeModuleValue(module,"yRightAxisTicks")) {
        axis.tickSize(720-50-10);
    }

    var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

    var axisContainer = g.append("g")
        .attr("transform", "translate("+(720-50)+"," + 10 + ")")
        .attr("class","yRightAxis noAxis visibleTicks").call(axis);

    var degrees;
    if((degrees = octopeerHelper.getSafeModuleValue(module,"yRightAxisLabelRotation")) > 0) {
        axisContainer.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate("+degrees+")")
            .style("text-anchor", "start");
    }

    if(octopeerHelper.getSafeModuleValue(module,"yRightAxisLine")) {
    	axisContainer.append("line")
            .attr("y1",350-50-10)
            .attr("y2",0)
            .attr("style","stroke-width:1px;stroke:black");
    }
    return g;
}

function createXAxis(module) {
	var scale;
	if ((scale = octopeerHelper.getSafeModuleValue(module,"xAxisScale")()) === "fit") {
		scale = d3.scale.linear().domain([0,100]).range([0,720-50-50]).nice();
	}
	var axis = d3.svg.axis()
        .scale(scale)
        .orient("bottom");

    if(octopeerHelper.getSafeModuleValue(module,"xAxisTicks")) {
        axis.tickSize(-350+50+10);
    }

    var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

    var axisContainer = g.append("g")
        .attr("transform", "translate("+50+"," + 300 + ")")
        .attr("class","xAxis noAxis visibleTicks").call(axis);

    var degrees;
    if((degrees = octopeerHelper.getSafeModuleValue(module,"xAxisLabelRotation")) > 0) {
        axisContainer.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate("+degrees+")")
            .style("text-anchor", "start");
    }

    if(octopeerHelper.getSafeModuleValue(module,"xAxisLine")) {
    	axisContainer.append("line")
    		.attr("x1",0)
            .attr("x2",720-50-50)
            .attr("style","stroke-width:1px;stroke:black");
    }
    return g;
}

function createXAxisLabel(svg, module) {
    var label = "";
    if((label = octopeerHelper.getSafeModuleValue(module,"xAxisLabel")) !== "") {
    var g = svg.append("g");
        
        //var rect = g.append("rect");

        //var text = 
        g.append("text")
            .attr("x",720/2)
            .attr("y",360)
            .attr("text-anchor", "middle")
            .text(label);
/*
        var bbox = text.node().getBBox();
        console.log(text);
        console.log(text.node());
        console.log(bbox);

        rect.attr("x",(720/2)-(bbox.width/2)-10)
            .attr("y",350-5)
            .attr("height",bbox.height+10)
            .attr("width",bbox.width+20)
            .attr("style", "stroke:none; fill:rgba(255,255,255,0.3)");
            */

    }

}

function createLeftYAxisLabel(svg, module) {
    var label = "";
    if((label = octopeerHelper.getSafeModuleValue(module,"yAxisLabel")) !== "") {
    var g = svg.append("g");
    
        g.append("text")
            .attr("y",0)
            .attr("x",-(350-50)/2)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .text(label);

    }
}

function createRightYAxisLabel(svg, module) {
    var label = "";
    if((label = octopeerHelper.getSafeModuleValue(module,"yRightAxisLabel")) !== "") {
    var g = svg.append("g");

        g.append("text")
            .attr("y",-720)
            .attr("x",(350-50)/2)
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(90)")
            .text(label);
    }
}

function createAxisLabels(svg, module){
    if(octopeerHelper.getSafeModuleValue(module,"xAxis")) {
        createXAxisLabel(svg, module);
    }
    if(octopeerHelper.getSafeModuleValue(module,"yAxis")) {
        createLeftYAxisLabel(svg, module);
    }
    if(octopeerHelper.getSafeModuleValue(module,"yRightAxis")) {
        createRightYAxisLabel(svg, module);
    }
}

function createAxes(svg, module) {
    if(octopeerHelper.getSafeModuleValue(module,"xAxis")) {
        d3append(svg,createXAxis(module));
    }
    if(octopeerHelper.getSafeModuleValue(module,"yAxis")) {
        d3append(svg, createLeftYAxis(module));
    }
    if(octopeerHelper.getSafeModuleValue(module,"yRightAxis")) {
        d3append(svg, createRightYAxis(module));
    }
}

function createSVG(module) {
    var svg = createSvgContainer();
    createAxes(svg, module);
    createAxisLabels(svg, module);
    return svg;
}
