'use strict';

require.config({
  shim: {
  },

  paths: {
	hm: 'vendor/hm',
	esprima: 'vendor/esprima',
	jquery: 'vendor/jquery.min'
  }
});
 
require(['app'], function(app) {


	$(document).on('click','.btn-success',function(e){
		if(e.preventDefault){
			e.preventDefault();
		}

		if(!app.Generator.addPart(e.currentTarget.previousSibling.value)){
			window.alert('That number is already listed.');
		}

	});

});