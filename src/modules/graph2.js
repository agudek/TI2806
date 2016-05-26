/* globals define, area */
define(function () {
    return {
        name: 'graph1',
        title: 'Number of pull-request per number of comments',
        size: 1,
        parentSelector: '#bodyrow',
        body: function () {
            var w = 720,
                h = 350,
                pad = 50,
                padTop = 10,
                padBottom = 50,
                sizeData = [
                    { 'x': 1, 'y': 6 },
                    { 'x': 2, 'y': 5 },
                    { 'x': 4, 'y': 5 }
                ],
                domain = ['0-2', '3-5', '5-10', '<10'],
                buckets = [];
            for (var i = 0; i < domain.length; ++i) {
                buckets.push(0);
            }

            function map(x) {
                switch (true) {
                    case (x > 10): return 3; break; // > 10
                    case (x >= 6 && x <= 10): return 2; break; // 6 - 10
                    case (x >= 3 && x <= 5): return 1; break; // 3 - 5
                    case (x >= 0 && x <= 2): return 0; break; //0 - 2
                    default: return 0; break;
                }
            }
            for (var i = 0; i < sizeData.length; ++i) {
                var item = sizeData[i];
                buckets[map(item.x)] += item.y;
                console.log("x: " + map(item.x));
                console.log("b: " + buckets[map(item.x)]);
            }
            sizeData = [];
            for (var i = 0; i < buckets.length; ++i) {
                sizeData.push({ 'x': i, 'y': buckets[i] });
            }
            console.log(sizeData);

            var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
                .attr("width", '100%')
                .attr("height", '100%')
                .attr("viewBox", "0 0 " + w + " " + h);

            var maxValue = Math.max.apply(Math, sizeData.map(function (o) { return o.y; }));

            var xSizeScale = d3.scale.linear()
                    .domain([0, domain.length])
                    .range([pad, w - 30]),
            ySizeScale = d3.scale.linear()
                    .domain([0, maxValue])
                    .range([padTop, h - padBottom]).nice();

            var xAxisScale = d3.scale.ordinal()
                .domain(domain)
                .rangePoints([0.5 * (w / domain.length - 40), w - 2 * pad - 0.5 * (w / domain.length - 40)]);

            //http://stackoverflow.com/questions/11189284/d3-axis-labeling
            var xAxis = d3.svg.axis()
                .scale(xAxisScale)
                .orient("bottom");

            svg.append("g")
                .attr("transform", "translate(" + pad + "," + (h - padBottom) + ")")
                .attr("class", "noAxis visibleTicks").call(xAxis)
                .selectAll("text")
                    .attr("y", 0)
                    .attr("x", 9)
                    .attr("dy", ".35em")
                    .attr("transform", "rotate(65)")
                    .style("text-anchor", "start");

            var yScale = d3.scale.linear()
                .domain([0, maxValue])
                .range([h - padBottom - padTop, 0]).nice();

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left")
                .ticks(6);

            svg.append("g")
                .attr("transform", "translate(" + pad + "," + padTop + ")")
                .attr("class", "noAxis visibleTicks").call(yAxis);

            svg.append("line")
                .attr("x1", pad)
                .attr("x2", w - pad)
                .attr("y1", h - padBottom)
                .attr("y2", h - padBottom)
                .attr("style", "stroke-width:1px;stroke:black");

            svg.append("line")
                .attr("x1", pad)
                .attr("x2", pad)
                .attr("y1", h - padBottom)
                .attr("y2", 0)
                .attr("style", "stroke-width:1px;stroke:black");

            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", (w + 2 * pad) / 2).attr("y", h).text("Number of comments");
            svg.append("text")
                .attr("text-anchor", "begin")
                .attr("x", -(h + padBottom + padTop) / 2).attr("y", 0)
                .attr("transform", "rotate(270)")
                .text("Number of pull-requests");

            console.log(w / domain.length);
            svg.selectAll("rect").data(sizeData).enter()
                .append("rect")
                .attr("x", function (d) { return xSizeScale(d.x); })
                .attr("y", h - padBottom)
                .attr("width", function () { return (w / (domain.length)) - 40; })
                .attr("height", function (d) { return ySizeScale(d.y); })
                .attr("style", "fill:rgb(77, 136, 255);")
                .transition()
                .attr("y", function (d) { return h - padBottom - ySizeScale(d.y); });

            return svg[0];
        }
    };
});