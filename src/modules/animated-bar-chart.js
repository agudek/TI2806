define(function () {
    return {
    	name: "animated-bar-chart",
    	size: 1,
        parentSelector: "#modules",
        body: function () {
            var w = 720,
                h = 350,
                data = [2, 98, 54, 4, 8, 150, 15, 16, 23, 42,132,185];

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
                .attr("style", "stroke:rgb(124, 124, 124);");
                currheight+=20;
            }

            svg.selectAll("rect").data(data).enter()
                .append("rect")
                .attr("x",function (d,i) {return (w/(data.length-1)*i)+3})
                .attr("y",h)
                .attr("width",function (d,i) {return (w/(data.length-1))-6})
                .attr("height",function (d) {return d})
                .attr("style", "stroke:rgb(57, 126, 235);fill:rgb(77, 136, 255)")
                .attr("filter","url(#f3)")
                    .transition()
                    .attr("y",function (d) {return h-d});

            return svg[0];
        }
    };
});