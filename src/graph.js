// Display the pull requests reviewed by the user during the last 30 days
// Allow the user to hover over PRs to display additional information
// Plot time spent reviewing on the y-axis and the date on the x-axis
function main() {
    var bottomPad = 40;
    var leftPad = 50;
    var w = 1000;
    var h = 500;
    var data2 = []
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
    var xAxisGroup = svgContainer.append("g").attr("transform", "translate(" + leftPad + "," + (h - bottomPad) + ")").call(xAxis).selectAll("text")
    // from http://www.d3noob.org/2013/01/how-to-rotate-text-labels-for-x-axis-of.html
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
    var yAxisGroup = svgContainer.append("g").attr("transform", "translate(" + leftPad + "," + 0 + ")").call(yAxis);
    var parser = d3.time.format("%Y-%m-%dT%H:%M:%SZ");
    var arr = [];
    var data = [];
    new GithubService().getPullRequests("mboom", "TI2806", function (pullrequest) {
        for (var i = 0; i < pullrequest.length; i++) {
            arr.push(pullrequest[i]);
        }
        for (var i = 0; i < arr.length; i++) {
            data.push([parser.parse(arr[i].created_at), Math.random() * 300]);
        }
        svgContainer.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d[0]); })
    .attr("cy", function (d) { return yScale(d[1]); })
    .attr("r", 5);
    })
    
    
}

var processPR = function (pr) {

}
$.ready(main());