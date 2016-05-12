define(function () {
    return {
    	name: "filled-graph",
        size: 1,
        parentSelector: "#modules",
        body: function () {
            var w = 720,
                h = 350,
                data = [2, 98, 54, 4, 8, 150, 15, 16, 23, 42,132,185];

                var connect=[];
                for (var i = 1; i < data.length; i++) {
                    connect.push({"source": data[i-1], "target": data[i]});
                }

            var svg = d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
                .attr("width", w)
                .attr("height", h)
            var defs = svg.append('defs');
            var filter = svg.append('filter')
                .attr('id','f3')
                .attr('x',0)
                .attr('y',0)
                .attr('width','200%')
                .attr('height','200%');

            filter.append('feOffset')
                .attr('result','offOut')
                .attr('in','SourceAlpha')
                .attr('dx',1)
                .attr('dy',-1);

            filter.append('feGaussianBlur')
                .attr('result','blurOut')
                .attr('in','offOut')
                .attr('stdDeviation',2);

            filter.append('feBlend')
                .attr('in','SourceGraphic')
                .attr('in2','blurOut')
                .attr('mode','normal');

            var currheight = 0;
            while(currheight<h){
                svg.append("line")
                .attr("x1", 0)
                .attr("y1", currheight)
                .attr("x2", w)
                .attr("y2", currheight)
                .attr("style", "stroke:rgb(214, 214, 214);");
                currheight+=20;
            }

            svg.append("polygon")
                .attr("points",function() {
                    var ret = "0,"+h+" "; 
                    for (var i = 0; i < data.length; i++) {
                        ret+= (w/(data.length-1)*i)+","+h+" ";
                    }
                    return ret+w+","+h;
                })
                .attr("style","fill:rgb(77, 136, 255)")
                .attr("filter","url(#f3)")
                    .transition()
                    .attr("points",function() {
                    var ret = "0,"+h+" "; 
                    for (var i = 0; i < data.length; i++) {
                        ret+= (w/(data.length-1)*i)+","+(h-data[i])+" ";
                    }
                    return ret+w+","+h;
                });

            svg.selectAll(".line").data(connect).enter()
                .append("line")
                .attr("class","line")
                .attr("x1", function(d,i) { return w/(data.length-1)*i })
                .attr("y1", function() { return h })
                .attr("x2", function(d,i) { return w/(data.length-1)*(i+1) })
                .attr("y2", function() { return h })
                .attr("style", "stroke:rgb(57, 126, 235)")
                    .transition()
                    .attr("y1", function(d) { return h-d.source })
                    .attr("y2", function(d) { return h-d.target });

            svg.selectAll("circle").data(data).enter()
                .append("circle")
                .attr("cx",function (d,i) {return w/(data.length-1)*i})
                .attr("cy",function () {return h})
                .attr("r",3)
                    .transition()
                    .attr("cy",function (d) {return h-d});


            return svg[0];
        }
    };
});