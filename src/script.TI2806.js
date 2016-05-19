/* globals OctopeerService, GithubService, BitBucketService */
/* exported modules, line, area, octopeerService, githubService, bitbucketService */
/*jshint esnext: true */
//Global modules list for if the module objects are needed elsewhere.
var modules = [];
var octopeerService = new OctopeerService();
var githubService = new GithubService();
var bitbucketService = new BitBucketService();

/**	svg line creator
* data - The data in JSON with defined x and y fields
* interpolationType - String describing the path shape, defaults to cardinal. 
* 	See https://github.com/d3/d3/wiki/SVG-Shapes#line_interpolate for supported types.
* xFunction - function to be executed on the x data before being added to the element.
* yFunction - function to be executed on the y data before being added to the element.
*
* return - the value for the "d" field of an svg path element
**/
function line(data, interpolationType = "cardinal", xFunction = null, yFunction = null) {
	var lineFunction = d3.svg.line()
		.x(function(d) { 
			if(xFunction===null) {
				return d.x;
			} else {
				return xFunction(d.x); 
			}
		})
		.y(function(d) { if(yFunction===null) {
				return d.y;
			} else {
				return yFunction(d.y); 
			}
		})
		.interpolate(interpolationType);

	return lineFunction(data);
}

/**	svg area creator
* data - The data in JSON with defined x and y fields
* height - The bottom border for the drawn area.
* interpolationType - String describing the path shape, defaults to cardinal. 
*	See https://github.com/d3/d3/wiki/SVG-Shapes#line_interpolate for supported types.
* xFunction - function to be executed on the x data before being added to the element.
* yFunction - function to be executed on the y data before being added to the element.
*
* return : the value for the "d" field of an svg path element
**/
function area(data, height, interpolationType = "cardinal", xFunction = null, yFunction = null) {
	var areaFunction = d3.svg.area()
		.x(function(d) { 
			if(xFunction===null) {
				return d.x;
			} else {
				return xFunction(d.x); 
			}
		})
    	.y0(height)
		.y1(function(d) { if(yFunction===null) {
				return d.y;
			} else {
				return yFunction(d.y); 
			}
		})
		.interpolate(interpolationType);

	return areaFunction(data);
}
