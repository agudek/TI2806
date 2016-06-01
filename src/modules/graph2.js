/* globals define, dataAggregator */
define(function () {
    var w = 720,
    h = 350,
    pad = 50,
    padTop = 10,
    padBottom = 50,
    maxNumberOfSessions = 0,

    matrix = [],
    remapped = [[]].map(function (dat, i) {
        return matrix.map(function (d, ii) {
            return { x: ii, y: d[i + 1] };
        });
    }),
    stacked = d3.layout.stack()(remapped),
    x = d3.scale.ordinal()
        .domain(stacked[0].map(function (d) { return d.x; }))
        .rangeRoundBands([pad, w - pad]),
    y = d3.scale.linear()
        .domain([0, d3.max(stacked[stacked.length - 1], function (d) { return d.y0 + d.y; })])
        .range([0, h - padBottom - padTop]),
    yAxisRange = d3.scale.linear()
        .domain([d3.max(stacked[stacked.length - 1], function (d) { return d.y0 + d.y; }), 0])
        .range([0, h - padBottom - padTop]),
    z = d3.scale.ordinal().range([
        "rgba(0, 0, 255, 1.00)",
        "rgba(255, 255, 255, 1.00)",
        "rgba(255, 0, 0, 1.00)"
    ]);

    function updateData(data) {
        matrix = data;
        var mapping = [];
        for (var i = 0; i < matrix.length; ++i) {
            if (matrix[i].length - 1 > maxNumberOfSessions - 1) {
                maxNumberOfSessions = matrix[i].length - 1;
            }
        }
        for (i = 1; i <= maxNumberOfSessions; ++i) {
            mapping.push("c" + i);
        }
        remapped = mapping.map(function (dat, i) {
            return matrix.map(function (d, ii) {
                return { x: ii, y: d[i + 1] };
            });
        });
        stacked = d3.layout.stack()(remapped);
        x = d3.scale.ordinal()
            .domain(stacked[0].map(function (d) { return d.x; }))
            .rangeRoundBands([pad, w - pad]);
        y = d3.scale.linear()
            .domain([0, d3.max(stacked[stacked.length - 1], function (d) { return d.y0 + d.y; })])
            .range([0, h - padBottom - padTop]);
        yAxisRange = d3.scale.linear()
            .domain([d3.max(stacked[stacked.length - 1], function (d) { return d.y0 + d.y; }), 0])
            .range([0, h - padBottom - padTop]);
    }

    return {
        name: 'graph2',
        title: 'Session durations per pull-request',
        xAxisLabel: 'Pull-requests',
        yAxisLabel: 'Sessions and session duration',
        size: 1,
        parentSelector: '#project-modules',
        data: [{
            "serviceCall": function () { return dataAggregator.graphPrDividedInSessions('', 10); },
            "required": true
        }],
        xAxisFitFunction: function () {
            return x;
        },
        yAxisFitFunction: function () {
            return yAxisRange;
        },
        body: function (res) {
            updateData(res[0]);

            // create canvas
            var g = d3.select(document.createElementNS(d3.ns.prefix.svg, 'g'))
            .attr("class", "chart");

            // Add a group for each column.
            var valgroup = g.selectAll(".valgroup")
            .data(stacked)
            .enter().append("svg:g")
            .attr("class", "valgroup")
            .style("fill", function (d, i) { return z(i); })
            .style("stroke", function (d, i) { return d3.rgb(z(i)).darker(); });

            // Add a rect for each date.
            valgroup.selectAll("rect")
            .data(function (d) { return d; })
            .enter().append("svg:rect")
            .attr("x", function (d) { return x(d.x); })
            .attr("y", function (d) { return -y(d.y0) - y(d.y) + 300; })
            .attr("height", function (d) { return y(d.y); })
            .attr("width", x.rangeBand())
            .attr("style", "stroke: none;");

            return g;
        }
    };
});