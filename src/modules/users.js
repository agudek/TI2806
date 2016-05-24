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
        },
        {
            "serviceCall": function() {return octopeerService.getSessions()},
            "onSuccess": function() {console.log("octopeerService.getSessions().onSucces()")},
            "onFailure": function() {console.log("octopeerService.getSessions().onFailure()")},
            "onComplete": function() {console.log("octopeerService.getSessions().onComplete()")},
            "required": false
        }],
        body: function (objects) {
            var w = 720,
                h = 350;

            var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
                .attr("width", '100%')
                .attr("height", '100%')
                .attr("viewBox", "0 0 "+w+" "+h);

            svg.append('text')
                .attr("x",0)
                .attr("y",50)
                .text("Demo module to test data retreival. Users:");

            for (var i = objects[0].count - 1; i >= 0; i--) {
                svg.append("text")
                .attr("x",0)
                .attr("y",90+(280/objects[0].count)*i)
                .text(objects[0].results[i].username);
            }

            return svg[0];
        }
    };
});