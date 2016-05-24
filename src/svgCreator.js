function createSVG(module) {
	var svg = createSvgContainer();
	createAxes(svg, module);
	createAxisLabels(svg, module);
	return svg;
}

function createSvgContainer(w = 720, h = 350) {
	var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
        	.attr("width", '100%')
            .attr("height", '100%')
            .attr("viewBox", "0 0 "+w+" "+h);
	return svg;
}

function createAxisLabels(svg, module){

}

//https://groups.google.com/forum/#!topic/d3-js/AsbOTQskipU
function d3append(parent, child) {
	parent.select(function() {
		return this.appendChild(child[0][0])
	});
}

function createAxes(svg, module) {
	if(getSafeModuleValue(module,"xAxis")) {
		d3append(svg,createXAxis(module));
	}
	if(getSafeModuleValue(module,"yAxis")) {
		d3append(svg,createLeftYAxis(module));
	}
	if(getSafeModuleValue(module,"yRightAxis")) {
		d3append(svg,createRightYAxis(module));
	}
}

function createLeftYAxis(module) {
	var scale;
	if ((scale = getSafeModuleValue(module,"yAxisScale")()) === "fit") {
		scale = d3.scale.linear().domain([0,100]).range([350-50-10,0]).nice();
	}

	var axis = d3.svg.axis()
        .scale(scale)
        .orient("left");

    if(getSafeModuleValue(module,"yAxisTicks")) {
        axis.tickSize(-720+50+50);
    }

    var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

    var axisContainer = g.append("g")
        .attr("transform", "translate("+50+"," + 10 + ")")
        .attr("class","noAxis visibleTicks").call(axis);

    var degrees;
    if((degrees = getSafeModuleValue(module,"yAxisLabelRotation")) > 0) {
        axisContainer.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate("+degrees+")")
            .style("text-anchor", "start");
    }

    if(getSafeModuleValue(module,"yAxisLine")) {
    	axisContainer.append("line")
            .attr("y1",350-50-10)
            .attr("y2",0)
            .attr("style","stroke-width:1px;stroke:black");
    }
    return g;
}

function createRightYAxis(module) {
	var scale;
	if ((scale = getSafeModuleValue(module,"yRightAxisScale")()) === "fit") {
		scale = d3.scale.linear().domain([0,100]).range([350-50-10,0]).nice();
	}

	var axis = d3.svg.axis()
        .scale(scale)
        .orient("right");

    if(getSafeModuleValue(module,"yRightAxisTicks")) {
        axis.tickSize(720-50-10);
    }

    var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

    var axisContainer = g.append("g")
        .attr("transform", "translate("+50+"," + 10 + ")")
        .attr("class","noAxis visibleTicks").call(axis);

    var degrees;
    if((degrees = getSafeModuleValue(module,"yRightAxisLabelRotation")) > 0) {
        axisContainer.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate("+degrees+")")
            .style("text-anchor", "start");
    }

    if(getSafeModuleValue(module,"yRightAxisLine")) {
    	axisContainer.append("line")
            .attr("y1",350-50)
            .attr("y2",0)
            .attr("style","stroke-width:1px;stroke:black");
    }
    return g;
}

function createXAxis(module) {
	var scale;
	if ((scale = getSafeModuleValue(module,"xAxisScale")()) === "fit") {
		scale = d3.scale.linear().domain([0,100]).range([0,720-50-50]).nice();
	}
	var axis = d3.svg.axis()
        .scale(scale)
        .orient("bottom");

    if(getSafeModuleValue(module,"xAxisTicks")) {
        axis.tickSize(-350+50+10);
    }

    var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

    var axisContainer = g.append("g")
        .attr("transform", "translate("+50+"," + 300 + ")")
        .attr("class","noAxis visibleTicks").call(axis);

    var degrees;
    if((degrees = getSafeModuleValue(module,"xAxisLabelRotation")) > 0) {
        axisContainer.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate("+degrees+")")
            .style("text-anchor", "start");
    }

    if(getSafeModuleValue(module,"xAxisTicks")) {
    	g.append("line")
    		.attr("x1",50)
            .attr("x2",720-50)
            .attr("y1",350-50)
            .attr("y2",350-50)
            .attr("style","stroke-width:1px;stroke:black");
    }
    return g;
}


/*function addAxis(svg, scale, orientation, tickSize = 0, labelRotation = 0, x = 50, y = 300) {
	var xAxis = d3.svg.axis()
        .scale(scale)
        .orient(orientation);

    if(tickSize != 0) {
        xAxis.tickSize(tickSize);
    }

    var axis = svg.append("g")
        .attr("transform", "translate("+x+"," + y + ")")
        .attr("class","noAxis visibleTicks").call(xAxis);

    if(labelRotation) {
        axis.selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate("+labelRotation+")")
            .style("text-anchor", "start");
    }
}*/