/* globals define, dataAggregator */
define(function () {
    var w = 720,
    h = 350,
    pad = 50,
    padTop = 10,
    padBottom = 50,
    sizeData = [],
    domain = ['0-2', '3-5', '5-10', '>10'],
    buckets = [],
    maxValue = 0,
    xSizeScale = d3.scale.linear()
        .domain([0, domain.length])
        .range([pad, w - 30]),
    ySizeScale = d3.scale.linear()
        .domain([0, maxValue])
        .range([padTop, h - padBottom]).nice();

    function devide(x) {
        switch (true) {
            case (x > 10): return 3; // > 10
            case (x >= 6 && x <= 10): return 2; // 6 - 10
            case (x >= 3 && x <= 5): return 1; // 3 - 5
            case (x >= 0 && x <= 2): return 0; //0 - 2
            default: return 0;
        }
    }

    function updateData(data) {
        buckets = [];
        sizeData = data;
        for (var i = 0; i < domain.length; ++i) {
            buckets.push(0);
        }
        for (i = 0; i < sizeData.length; ++i) {
            var item = sizeData[i];
            buckets[devide(item.x)] += item.y;
        }
        sizeData = [];
        for (i = 0; i < buckets.length; ++i) {
            sizeData.push({ 'x': i, 'y': buckets[i] });
        }
        maxValue = Math.max.apply(Math, sizeData.map(function (o) { return o.y; }));
        xSizeScale = d3.scale.linear()
            .domain([0, domain.length])
            .range([pad, w - 30]);
        ySizeScale = d3.scale.linear()
            .domain([0, maxValue])
            .range([padTop, h - padBottom]);
    }

    return {
        name: 'graph1',
        title: 'Number of pull-request per number of comments',
        size: 1,
        parentSelector: '#project-modules',
        xAxisLabel: "Number of comments",
        yAxisLabel: "Number of pull-requests",
        yRightAxisLabel: "",
        xAxisLine: true,
        yAxisLine: true,
        xAxisTicks: false,
        yAxisTicks: false,
        xAxisLabelRotation: 65,
        yAxisScale: function() { return "fit"; },
        xAxisScale: function() { 
            return d3.svg.axis().scale(d3.scale.ordinal()
                .domain(domain)
                .rangePoints(
                    [0.5 * (720 / domain.length - 40), 720 - 2 * 50 - 0.5 * (720 / domain.length - 40)]
                ));
        },
        yAxisFitFunction: function() {
            return d3.svg.axis().scale(d3.scale.linear().domain([0,maxValue]));
        },
        xAxis: true,
        yAxis: true,
        yRightAxis: false,
        legend: [
            {
                "type":"rect",
                "style":"fill:rgb(77, 136, 255);",
                "text":"Number of pull requests with x number of comments"
            }
        ],
        data: [{
            "serviceCall": function () { return dataAggregator.graphCommentAmountPerPullRequests(''); },
            "required": true
        }],
        body: function(res) {
            updateData(res[0]);
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, "g"));
            g.selectAll("rect").data(sizeData).enter()
                .append("rect")
                .attr("x", function (d) { return xSizeScale(d.x); })
                .attr("y", h - padBottom)
                .attr("width", function () { return (w / (domain.length)) - 40; })
                .attr("height", function (d) { return ySizeScale(d.y); })
                .attr("style", "stroke: rgba(51, 125, 212, 1.00); fill: rgba(51, 125, 212, 0.5)")
                .transition()
                .attr("y", function (d) { return h - padBottom - ySizeScale(d.y); });
            return g;
        }
    };
});