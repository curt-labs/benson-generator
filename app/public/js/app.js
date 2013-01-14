define([jQuery], function() {

	var app = function(){},
		Generator = function(){};

	Generator.prototype = {
		part_numbers:[],
		generate: function(part_num){
			return part_num;
		},
		addPart:function(num){
			if(num.length > 0 && this.part_numbers.indexOf(num) === -1){
				this.part_numbers.push(num);
				this.generateTab(num,function(){ });
				return true;
			}else{
				return false;
			}
			
		},
		generateTab:function(num,callback){
			var tab = '<li><a href="#' + num +'" data-toggle="tab">' + num + '</a></li>';
			var tab_content = '<div id="' + num + '" class="tab-pane">';

			tab_content += '<div>';
			tab_content += '<a href="/download/'+ num +'" class="pull-right btn btn-info btn-large">Download</a>';
			tab_content += '</div>';

			tab_content += '<iframe src="/pdf/'+ num +'" />';
			
			tab_content += '</div>';

			$('.nav-tabs').append(tab);
			$('.tab-content').append(tab_content);

			$('.tabbable').show();
			$('.nav-tabs a[href=#' + num + ']').tab('show');

			callback();
		}
	};

	app.Generator = new Generator();

	return app;
});