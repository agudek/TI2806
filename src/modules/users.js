/* globals define */
define(function () {
    return {
    	name: "time",
    	size: 1,
        parentSelector: "#bodyrow",
        data: [{
            "serviceCall": function() {return octopeerService.getUsers()},
            "onSuccess": function() {console.log("octopeerService.getUsers().onSucces()")},
            "onFailure": function() {console.log("octopeerService.getUsers().onFailure()")},
            "onComplete": function() {console.log("octopeerService.getUsers().onComplete()")},
            "required": true
        }],
        body: function () {
            var w = 720,
                h = 350;

            var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
                .attr("width", '100%')
                .attr("height", '100%')
                .attr("viewBox", "0 0 "+w+" "+h);

            svg.append('text')
                .attr("x",0)
                .attr("y",50)
                .text("Demo module to test data retreival. See console!");

            return svg[0];
        }
    };
});