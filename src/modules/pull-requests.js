/* globals define, githubService */
/* exported xAxisGroup, yAxisGroup */
/* jshint unused : vars */

define(function () {
    return {
        name: "pull-requests",
        size: 1,
        parentSelector: "#bodyrow",
        body: function () {

            function processPRs(prs) {
                for (var i = 0; i < prs.length; i++) {
                    arr.push(prs[i]);
                }
                svgContainer.selectAll("circle")
                .data(arr)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    return xScale(parser.parse(d.created_at));
                })
                .attr("cy", function (d) {
                    return yScale(Math.random() * 300);
                })
                .style("fill", function (d) {
                    return d.merged ? "green" : (d.state === "closed" ? "red" : "orange");
                })
                .style("cursor", "pointer")
                .attr("r", 5)
                .on("click", function (d) {
                    window.open("https://www.github.com/" + OWNER + "/" + REPO_NAME + "/pull/" + d.number);
                });
            }

            var REPO_NAME = "TI2806";
            var OWNER = "mboom";
            var bottomPad = 40;
            var leftPad = 50;
            var w = 720;
            var h = 350;
            var data2 = [];
            var today = new Date();
            var month = today.getMonth();
            // Because months are 0-11 this will get the previous month.
            data2.push(new Date().setMonth((month + 11) % 12));
            data2.push(today);

            var format = d3.time.format("%d/%m");
            var xScale = d3.time.scale().domain(data2).range([0, w - leftPad]);
            var xAxis = d3.svg.axis().scale(xScale).tickFormat(format).ticks(30).orient("bottom");
            var svgContainer = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("viewBox", "0 0 " + w + " " + h);
            var yScale = d3.scale.linear().domain([300, 0]).range([15, h - 35]);
            var yAxis = d3.svg
                .axis()
                .scale(yScale)
                .orient("left");
            var xAxisGroup = svgContainer // jshint ignore:line
                .append("g")
                .attr("transform", "translate(" + leftPad + "," + (h - bottomPad) + ")")
                .call(xAxis)
                .selectAll("text")
            // from http://www.d3noob.org/2013/01/how-to-rotate-text-labels-for-x-axis-of.html
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");
            var yAxisGroup = svgContainer // jshint ignore:line
                .append("g")
                .attr("transform", "translate(" + leftPad + "," + 0 + ")")
                .call(yAxis);
            var parser = d3.time.format("%Y-%m-%dT%H:%M:%SZ");
            var arr = [];
            githubService.getPullRequests("mboom", "TI2806", processPRs);

            return svgContainer[0];
        }
    };
});