/* globals define, octopeerHelper */
define(function () {
    return {
    	name: "pr-size",
        title: "Size of pr",
    	size: 1,
        parentSelector: "#bodyrow",
        body: function () {
            var w = 720,
                h = 350,
                pad = 50,
                padTop = 10,
                padBottom = 50,
                sizeData = [
                    {"x":0, "y":461},
                    {"x":1, "y":3},
                    {"x":2, "y":43},
                    {"x":3, "y":342},
                    {"x":4, "y":6452},
                    {"x":5, "y":5},
                    {"x":6, "y":64},
                    {"x":7, "y":412},
                    {"x":8, "y":762},
                    {"x":9, "y":342},
                    {"x":10, "y":1521},
                    {"x":11, "y":312},
                    {"x":12, "y":454},
                    {"x":13, "y":642},
                    {"x":14, "y":1542},
                    {"x":15, "y":1752},
                    {"x":16, "y":242},
                    {"x":17, "y":142},
                    {"x":18, "y":717},
                    {"x":19, "y":4772}
                ];

            var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
                .attr("width", '100%')
                .attr("height", '100%')
                .attr("viewBox", "0 0 "+w+" "+h);

            var xSizeScale = d3.scale.linear()
                .domain([0,sizeData.length])
                .range([pad,w-pad]),
            ySizeScale = d3.scale.linear()
                .domain([Math.max.apply(Math,sizeData.map(function(o){return o.y;})),0])
                .range([padTop, h-padBottom]).nice();

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
                .attr("class","noAxis").call(xAxis)
                .selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(65)")
                    .style("text-anchor", "start");

            var yScale = d3.scale.linear()
                .domain([0,Math.max.apply(Math,sizeData.map(function(o){return o.y;}))])
                .range([h-padBottom-padTop,0]).nice();

            var yAxis = d3.svg.axis()
                .scale(yScale)
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

            var tempSizeData = [{"x":-0.5, "y":0}]
                .concat(sizeData)
                .concat([{"x":sizeData.length-0.5, "y":0}]);

            svg.append("path")
                .attr("d",
                    octopeerHelper.line(
                        tempSizeData,"cardinal-open",function(x){return xSizeScale(x+0.5);},ySizeScale
                        )
                    )
                .attr("style","stroke:rgb(212, 51, 51);fill:none;stroke-width: 3px;");

            svg.selectAll("circle").data(sizeData).enter()
                .append("circle")
                .attr("cx",function (d) {return xSizeScale(d.x+0.5);})
                .attr("cy",function (d) {return ySizeScale(d.y);})
                .attr("r",3)
                .attr("style","fill:rgb(212, 51, 51);stroke-width: 3px;");

            return svg[0];
        }
    };
});