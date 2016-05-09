//http://stackoverflow.com/questions/17446844/dynamic-require-in-requirejs-getting-module-name-has-not-been-loaded-yet-for-c
define(['modules/moduleList'], function (dynModules) {
    require(dynModules, function(){
    	modules = arguments;

    	function SortBySize(a, b){
		  return ((a.size < b.size) ? 1 : ((a.size > b.size) ? -1 : 0));
		}
		arguments = Array.prototype.slice.call(modules);
		arguments.sort(SortBySize);

		//https://learn.jquery.com/ajax/jquery-ajax-methods/
    	//http://zurb.com/forrst/posts/jQuery_ajax_for_loop_problem-v4c
    	function doAjax(i, m){
    	    $.ajax({
		 
			    // The URL for the request
			    url: m.ajax,
			 
			    // The data to send (will be converted to a query string)
			    data: {
			        id: m.ajaxdata
			    },
			 
			    // Whether this is a POST or GET request
			    type: "GET",
			 
			    // The type of data we expect back
			    dataType : "json",
			})
			  // Code to run if the request succeeds (is done);
			  // The response is passed to the function
			  .done(function( json ) {
				$(m.body(json)).appendTo(outerdiv);
			  })
			  // Code to run if the request fails; the raw request and
			  // status codes are passed to the function
			  .fail(function( xhr, status, errorThrown ) {
			    console.log( "Sorry, there was a problem with the ajax request!" );
			    console.log( "Error: " + errorThrown );
			    console.log( "Status: " + status );
			    console.dir( xhr );
				//$(modules[i].body(json)).appendTo(outerdiv);
			  })
		}

        // use arguments since you don't know how many modules you're getting in the callback
        var div = $('#modules');
        for (var i = 0; i < arguments.length; i++){
        	var outerdiv = $(document.createElement('div'));
        	outerdiv.addClass('module').addClass('size'+arguments[i].size).attr('id',arguments[i].name).appendTo(div);
        	if(!arguments[i].noAjax)
	        	doAjax(i,arguments[i]);
	        else
	        	$(arguments[i].body()).appendTo(outerdiv);
	    	
        }
    });

});