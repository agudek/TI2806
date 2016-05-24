/* globals define, area */
define(function () {
    return {
    	name: "average-comment-size-compared",
        title: "Average comment sizes",
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
                ],
                sizeData2 = [
                    {"x":0, "y":4.61},
                    {"x":1, "y":3},
                    {"x":2, "y":4.3},
                    {"x":3, "y":3.42},
                    {"x":4, "y":64.52},
                    {"x":5, "y":5},
                    {"x":6, "y":6.4},
                    {"x":7, "y":41.2},
                    {"x":8, "y":7.62},
                    {"x":9, "y":34.2},
                    {"x":10, "y":15.21},
                    {"x":11, "y":3.12},
                    {"x":12, "y":45.4},
                    {"x":13, "y":6.42},
                    {"x":14, "y":15.42},
                    {"x":15, "y":17.52},
                    {"x":16, "y":24.2},
                    {"x":17, "y":14.2},
                    {"x":18, "y":7.17},
                    {"x":19, "y":47.72}
                ];

            //var svg = createSvgContainer(); 

            var maxValue = Math.max ( 
                Math.max.apply(Math,sizeData.map(function(o){return o.y;})),
                 Math.max.apply(Math,sizeData2.map(function(o){return o.y;})));

            var xSizeScale = d3.scale.linear().domain([0,sizeData.length]).range([pad,w-17]),
            ySizeScale = d3.scale.linear().domain([maxValue,0]).range([padTop, h-padBottom]).nice();
/*
            var xAxisScale = d3.scale.ordinal()
                .domain([
                    "pr0", "pr1", "pr2", "pr3",
                    "pr4", "pr5", "pr6", "pr7",
                    "pr8", "pr9", "pr10", "pr11",
                    "pr12", "pr13", "pr14", "pr15",
                    "pr16", "pr17", "pr18", "pr19"
                ])
                .rangePoints([0, w-2*pad]);

            addAxis(svg, xAxisScale, "bottom", -h+padBottom+padTop, 65, pad, h-padBottom);

            var yScale = d3.scale.linear().domain([0,maxValue]).range([h-padBottom-padTop,0]).nice();


            addAxis(svg, yScale, "left", -w+2*pad, 0, pad, padTop);

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

            svg.append("path")
                .attr("d",area(sizeData,h-padBottom,"linear",function(x){return xSizeScale(x);},ySizeScale))
                .attr("style","stroke:rgb(212, 51, 51);fill:rgba(212, 51, 51,0.5);stroke-width: 2px;");

            svg.append("path")
                .attr("d",area(sizeData2,h-padBottom,"linear",function(x){return xSizeScale(x);},ySizeScale))
                .attr("style","stroke: rgb(51, 125, 212);fill: rgba(51, 125, 212,0.5);stroke-width: 2px;");    

            return svg[0];*/

            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"))

            g.append("path")
                .attr("d",area(sizeData,h-padBottom,"linear",function(x){return xSizeScale(x);},ySizeScale))
                .attr("style","stroke:rgb(212, 51, 51);fill:rgba(212, 51, 51,0.5);stroke-width: 2px;");

            g.append("path")
                .attr("d",area(sizeData2,h-padBottom,"linear",function(x){return xSizeScale(x);},ySizeScale))
                .attr("style","stroke: rgb(51, 125, 212);fill: rgba(51, 125, 212,0.5);stroke-width: 2px;");    

            return g;
        }
    };
});