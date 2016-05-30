/* globals define */
define(function () {
    return {
        name: 'graph2',
        title: 'Session durations per pull-request',
        size: 1,
        parentSelector: '#bodyrow',
        body: function () {
            var w = 720,
            h = 350,
            pad = 50,
            padTop = 10,
            padBottom = 50;

            // create canvas
            var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'g'))
            .attr("class", "chart"),

            x = d3.scale.ordinal().rangeRoundBands([pad, w - pad]),
            y = d3.scale.linear().range([0, h - padBottom - padTop]),
            z = d3.scale.ordinal().range(["darkblue", "blue", "lightblue"]);

            console.log("RAW MATRIX---------------------------");
            // 4 columns: ID,c1,c2,c3
            var matrix = [
                [1, 5871, 8916, 2868],
                [2, 10048, 2060, 6171],
                [3, 16145, 8090, 8045],
                [4, 990, 940, 6907],
                [5, 450, 430, 5000]
            ];
            console.log(matrix);

            console.log("REMAP---------------------------");
            var remapped = ["c1", "c2", "c3"].map(function (dat, i) {
                return matrix.map(function (d, ii) {
                    return { x: ii, y: d[i + 1] };
                });
            });
            console.log(remapped);

            console.log("LAYOUT---------------------------");
            var stacked = d3.layout.stack()(remapped);
            console.log(stacked);

            x.domain(stacked[0].map(function (d) { return d.x; }));
            y.domain([0, d3.max(stacked[stacked.length - 1], function (d) { return d.y0 + d.y; })]);

            // show the domains of the scales
            console.log("x.domain(): " + x.domain());
            console.log("y.domain(): " + y.domain());
            console.log("------------------------------------------------------------------");

            // Add a group for each column.
            var valgroup = svg.selectAll(".valgroup")
            .data(stacked)
            .enter().append("svg:g")
            .attr("class", "valgroup")
            .style("fill", function (d, i) { return z(i); })
            .style("stroke", function (d, i) { return d3.rgb(z(i)).darker(); });

            // Add a rect for each date.
            var rect = valgroup.selectAll("rect")
            .data(function (d) { return d; })
            .enter().append("svg:rect")
            .attr("x", function (d) { return x(d.x); })
            .attr("y", function (d) { return -y(d.y0) - y(d.y) +300; })
            .attr("height", function (d) { return y(d.y); })
            .attr("width", x.rangeBand());


            return svg;
        }
    };
});