/* globals define */
define(function () {
    return {
    	name: "time",
        title: "Time spent on pr",
    	size: 1,
        parentSelector: "#bodyrow",
        xAxisLabel: "Time spent on pr",
        yAxisLabel: "Pull request",
        xAxisLine: true,
        yAxisLine: true,
        xAxisTicks: false,
        yAxisTicks: true,
        xAxisLabelRotation: 65,
        xAxisScale: function() { 
            var axisScale = d3.scale.ordinal()
                .domain([
                    "pr0", "pr1", "pr2", "pr3",
                    "pr4", "pr5", "pr6", "pr7",
                    "pr8", "pr9", "pr10", "pr11",
                    "pr12", "pr13", "pr14", "pr15",
                    "pr16", "pr17", "pr18", "pr19"
                ])
                .rangePoints([0, 720-2*50]);
            return axisScale;
        },
        body: function () {
            var w = 720,
                h = 350,
                pad = 50,
                padTop = 10,
                padBottom = 50,
                timeData = [
                    {"x":0, "y":35},
                    {"x":1, "y":5},
                    {"x":2, "y":17},
                    {"x":3, "y":28},
                    {"x":4, "y":122},
                    {"x":5, "y":2},
                    {"x":6, "y":3},
                    {"x":7, "y":75},
                    {"x":8, "y":40},
                    {"x":9, "y":34},
                    {"x":10, "y":72},
                    {"x":11, "y":24},
                    {"x":12, "y":41},
                    {"x":13, "y":34},
                    {"x":14, "y":72},
                    {"x":15, "y":27},
                    {"x":16, "y":42},
                    {"x":17, "y":137},
                    {"x":18, "y":57},
                    {"x":19, "y":90}
                ];

           /* var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
                .attr("width", '100%')
                .attr("height", '100%')
                .attr("viewBox", "0 0 "+w+" "+h);*/

            var xTimeScale = d3.scale.linear()
                .domain([0,timeData.length])
                .range([pad,w-pad]),
                yTimeScale = d3.scale.linear()
                    .domain([0,Math.max.apply(Math,timeData.map(function(o){return o.y;}))])
                    .range([0, h-padBottom-padTop])
                    .nice();
/*
            var xAxisScale = d3.scale.ordinal()
                .domain([
                    "pr0", "pr1", "pr2", "pr3",
                    "pr4", "pr5", "pr6", "pr7",
                    "pr8", "pr9", "pr10", "pr11",
                    "pr12", "pr13", "pr14", "pr15",
                    "pr16", "pr17", "pr18", "pr19"
                ])
                .rangePoints([0.35*pad, w-2.3*pad]);

            //http://stackoverflow.com/questions/11189284/d3-axis-labeling
            var xAxis = d3.svg.axis()
                .scale(xAxisScale)
                .orient("bottom");

            svg.append("g")
                .attr("transform", "translate("+pad+"," + (h - padBottom) + ")")
                .attr("class","noAxis")
                .call(xAxis)
                .selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(65)")
                    .style("text-anchor", "start");

            var yAxisScale = d3.scale.linear()
                .domain([0,Math.max.apply(Math,timeData.map(function(o){return o.y;}))])
                .range([h-padBottom-padTop,0])
                .nice();

            var yAxis = d3.svg.axis()
                .scale(yAxisScale)
                .orient("left")
                .ticks(6)
                .tickSize(-w+2*pad);

            svg.append("g")
                .attr("transform", "translate("+pad+","+padTop+")")
                .attr("class","noAxis visibleTicks")
                .call(yAxis);

            svg.append("line")
                .attr("x1",pad)
                .attr("x2",w-pad)
                .attr("y1",h-padBottom)
                .attr("y2",h-padBottom)
                .attr("style","stroke-width:1px;stroke:black");

            svg.append("line")
                .attr("x1",pad)
                .attr("x2",pad)
                .attr("y1",h-padBottom)
                .attr("y2",0)
                .attr("style","stroke-width:1px;stroke:black");

            svg.selectAll("rect").data(timeData).enter()
                .append("rect")
                .attr("x",function (d) {return xTimeScale(d.x)+9;})
                .attr("y",h-padBottom)
                .attr("width",function () {return (w/(timeData.length-1))-20;})
                .attr("height",function (d) {return yTimeScale(d.y);})
                .attr("style", "fill:rgb(77, 136, 255);")
                    .transition()
                    .attr("y",function (d) {return h-padBottom-yTimeScale(d.y);});

            return svg[0];*/

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            g.selectAll("rect").data(timeData).enter()
                .append("rect")
                .attr("x",function (d) {return xTimeScale(d.x)+9;})
                .attr("y",h-padBottom)
                .attr("width",function () {return (w/(timeData.length-1))-20;})
                .attr("height",function (d) {return yTimeScale(d.y);})
                .attr("style", "fill:rgb(77, 136, 255);")
                    .transition()
                    .attr("y",function (d) {return h-padBottom-yTimeScale(d.y);});

            return g;
        }
    };
});