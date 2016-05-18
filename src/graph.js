/* globals GithubService, GitHubAPICaller */

// Display the pull requests reviewed by the user during the last 30 days
// Allow the user to hover over PRs to display additional information
// Plot time spent reviewing on the y-axis and the date on the x-axis

var REPO_NAME = "TI2806";
var OWNER = "mboom";

function drawPullRequests() {
    var bottomPad = 40;
    var leftPad = 50;
    var w = 1000;
    var h = 500;
    var data2 = [];
    var today = new Date();
    var month = today.getMonth();
    data2.push(new Date().setMonth((month + 11) % 12)); // Because months are 0-11 this will get the previous month.
    data2.push(today);


    var format = d3.time.format("%d/%m");
    var xScale = d3.time.scale().domain(data2).range([0, w - 10]);
    var xAxis = d3.svg.axis().scale(xScale).tickFormat(format).ticks(30).orient("bottom");
    var svgContainer = d3.select(".scatter").append("svg")
    .attr("width", w + 100)
    .attr("height", h + 40);
    var yScale = d3.scale.linear().domain([300, 0]).range([15, h - 35]);
    var yAxis = d3.svg.axis().scale(yScale).orient("left");
    svgContainer.append("g")
        .attr("transform", "translate(" + leftPad + "," + (h - bottomPad) + ")")
        .call(xAxis).selectAll("text")
    // from http://www.d3noob.org/2013/01/how-to-rotate-text-labels-for-x-axis-of.html
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");
    svgContainer.append("g").attr("transform", "translate(" + leftPad + "," + 0 + ")").call(yAxis);
    var parser = d3.time.format("%Y-%m-%dT%H:%M:%SZ");
    var arr = [];

    function processPRs(prs) {
        for (var i = 0; i < prs.length; i++) {
            arr.push(prs[i]);
        }
        var raw = [];
        new GitHubAPICaller().get('repos/' + OWNER + '/' + REPO_NAME + '/pulls?state=all', function (pr) {
            pr.forEach(function (current, index, array) { raw.push(current); });
        });
        svgContainer.selectAll("circle")
        .data(arr)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return xScale(parser.parse(d.created_at)); })
        .attr("cy", function (d) { return yScale(Math.random() * 300); })
        .style("fill", function (d) { return d.merged ? "green" : (d.state === "closed" ? "red" : "orange"); })
        .style("cursor", "pointer")
        .attr("r", 5)
        .on("click", function (d) {
            window.open("https://www.github.com/" + OWNER + "/" + REPO_NAME + "/pull/" + d.number);
        })
    }

    new GithubService().getPullRequests("mboom", "TI2806", processPRs);


}
$.ready(drawPullRequests());
