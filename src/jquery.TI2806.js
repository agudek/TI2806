/*
 * TI2806
 * https://github.com/mboom/TI2806
 *
 * Copyright (c) 2016 BorekBeker
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.TI2806 = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.TI2806 = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.TI2806.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.TI2806.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].TI2806 = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
