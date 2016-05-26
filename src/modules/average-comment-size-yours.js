/* globals define, octopeerHelper */
define(function () {
    return {
    	name: "average-comment-size-yours",
        title: "Your average comment size",
    	size: 1,
        parentSelector: "#bodyrow",
        xAxisLabel: "Average comment size (size/count)",
        yAxisLabel: "Pull request",
        xAxisLine: true,
        yAxisLine: true,
        xAxisTicks: true,
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
                sizeData = [
                    {"x":0, "y":6.34},
                    {"x":1, "y":13},
                    {"x":2, "y":6.43},
                    {"x":3, "y":34.2},
                    {"x":4, "y":45.2},
                    {"x":5, "y":25},
                    {"x":6, "y":8.64},
                    {"x":7, "y":4.12},
                    {"x":8, "y":17.62},
                    {"x":9, "y":23.42},
                    {"x":10, "y":19.21},
                    {"x":11, "y":9.12},
                    {"x":12, "y":14.54},
                    {"x":13, "y":36.42},
                    {"x":14, "y":12.542},
                    {"x":15, "y":19.52},
                    {"x":16, "y":21.42},
                    {"x":17, "y":24.2},
                    {"x":18, "y":17.7},
                    {"x":19, "y":14.72}
                ];

            var maxValue = Math.max.apply(Math,sizeData.map(function(o){return o.y;}));

            var xSizeScale = d3.scale.linear().domain([0,sizeData.length]).range([pad,w-17]),
            ySizeScale = d3.scale.linear().domain([maxValue,0]).range([padTop, h-padBottom]).nice();
/*
            var yScale = d3.scale.linear().domain([0,maxValue]).range([h-padBottom-padTop,0]).nice();

            var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(6).tickSize(-w+2*pad);

            svg.append("g")
                .attr("transform", "translate("+pad+","+padTop+")")
                .attr("class","noAxis visibleTicks").call(yAxis);
*/
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));

            g.append("path")
                .attr("d",
                    octopeerHelper.area(
                        sizeData,h-padBottom,"linear",function(x){return xSizeScale(x);},ySizeScale
                        )
                    )
                .attr("style","stroke:rgb(212, 51, 51);fill:rgba(212, 51, 51,0.5);stroke-width: 2px;");   

            return g;
        }
    };
});