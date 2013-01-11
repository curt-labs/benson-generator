var PDFDocument = require('pdfkit'),
	http = require('http');
//var doc = new PDFDocument();


http.createServer(function(req,res){

	// Create a generic list of part numbers
	var parts = '11000,13301,110003,12289';
	var partArr = parts.split(',');

	for (var i = 0; i < partArr.length; i++) {
		var p_id = partArr[i];
		var opts = {
			host: 'api.curtmfg.com',
			path: '/v2/GetPart?dataType=json&partID=' + p_id
		};

		
		http.get(opts,function(resp){
			var body = '';
			res.writeHead(200,{'Content-Type':'text/plain'});
			resp.setEncoding('utf8');
			resp.on('data',function(chunk){
				body += chunk;
			});

			resp.on('end',function(){
				createPage(JSON.parse(body),function(){});
				res.end();
			});
		});
	};
	res.write('Done');

	//doc.write('output2.pdf');
}).listen(3000);


function createPage(part,callback){
	var doc = new PDFDocument();
	doc.image('benson.png',10,40, {width: 175},{height:150});

	// Add another page
	doc.fontSize(18).text('2013 VIRTUAL TRADE SHOW', 300, 70,{width:275, align:'right'});
	doc.moveDown();
	doc.fontSize(14).text('Product / Content Form', 300, 95,{align:'right',width:275});

	doc.moveDown(2);

	doc.fontSize(22).text('PRODUCT', 25, 130).moveDown();
	doc.fontSize(10).text('Each product information form can have text, images, links, PDF or video content included. Please link directly to any outside materials in this document and/or attach them to the email.',25,155,{width:375});

	doc.rect(400,135,175,50).fill('grey');
	doc.fillAndStroke('black','black');
	doc.text('Booth # 1305',410,140,{width:155,height:10,align:'right'});
	doc.moveDown();
	doc.text('CURT MANUFACTURING',{width:155,height:10,align:'right'});

	doc.moveDown(2);

	doc.rect(25,225,550,400).stroke('#ccc');
	doc.rect(25,225,110,25).fillAndStroke('#eaeaea','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('PRODUCT NAME',30,235,{width:110,height:25});

	doc.rect(135,225,440,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	doc.text(part.shortDesc,145,235,{width:440,height:25});


	doc.rect(25,250,110,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('SKU NUMBER',30,260,{width:110,height:25});

	var upc = '';
	for (var i = 0; i < part.attributes.length; i++) {
		var attr = part.attributes[i];
		if(attr.key == 'UPC'){
			upc = attr.value;
		}
	};
	doc.rect(135,250,440,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	doc.text(upc,145,260,{width:440,height:25});

	doc.rect(25,275,110,25).fillAndStroke('#eaeaea','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('LAUNCH DATE',30,285,{width:110,height:25});

	doc.rect(135,275,440,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');


	doc.rect(25,300,110,200).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('DESCRIPTION',30,375,{width:110,height:25});

	doc.rect(135,300,440,200).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');

	var desc = '';
	doc.fontSize(8);
	for (var i = 0; i < part.content.length; i++) {
		var con = part.content[i];
		if(con.key != 'installationSheet'){
			desc += con.value + '\n';
		}
	};
	desc += '\r\n';
	for (var i = 0; i < part.attributes.length; i++) {
		var attr = part.attributes[i];
		if(attr.key != 'UPC'){
			desc += attr.key + ': ' + attr.value + '\n';
		}
	};
	doc.text(desc,145,305,{width:440,height:200});

	doc.fontSize(10);

	doc.rect(25,500,110,40).fillAndStroke('#eaeaea','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('MAIN PRODUCT IMAGE',30,510,{width:110,height:40});

	doc.rect(135,500,440,40).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	for (var i = 0; i < part.images.length; i++) {
		var img = part.images[i];
		if(img.width === 300 && img.sort == 'a'){
			doc.text(img.path,145,510,{width:440,height:40});
		}
	}

	doc.rect(25,540,110,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('VIDEO LINK',30,550,{width:110,height:25});

	doc.rect(135,540,440,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	if(part.videos.length > 1){
		for (var i = 0; i < part.videos.length; i++) {
			var vid = part.videos[i];
			if(vid.isPrimary){
				doc.text('http://www.youtube.com/watch?v=' + vid.youTubeVideoID,145,550,{width:440,height:25});
			}
		}	
	}else if(part.videos.length === 1){
		doc.text('http://www.youtube.com/watch?v=' + part.videos[0].youTubeVideoID,145,550,{width:440,height:25});
	}
	
	doc.rect(25,565,110,25).fillAndStroke('#eaeaea','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('PDF LINK',30,575,{width:110,height:25});

	doc.rect(135,565,440,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	for (var i = 0; i < part.content.length; i++) {
		var attr = part.content[i];
		if(attr.key == 'installationSheet'){
			doc.text(attr.value,145,570,{width:440,height:25});
		}
	}

	doc.rect(25,590,110,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('ADDITIONAL IMAGES',30,600,{width:110,height:25});

	doc.rect(135,590,440,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	for (var i = 0; i < part.images.length; i++) {
		var img = part.images[i];
		if(img.width === 300 && img.sort == 'b'){
			doc.text(img.path,145,600,{width:440,height:25});
		}
	}

	doc.rect(25,615,110,125).fillAndStroke('#eaeaea','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('OTHER / NOTES: Anything in this box will not be displayed in the Trade Show.',30,625,{width:110,height:125});

	doc.rect(135,615,440,125).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	var add_imgs = '';
	for (var i = 0; i < part.images.length; i++) {
		var img = part.images[i];
		if(img.width === 300 && img.sort != 'a' && img.sort != 'b'){
			add_imgs += img.path + '\n';
		}
	}
	if(add_imgs.length > 0){
		doc.text(add_imgs,145,625,{width:440,height:125});
	}
	doc.text('Please email this form to ebergeron@bensonorg.com when complete.',25,750,{width:550,height:25,align:'center'});
	doc.text('One email per product please.',25,770,{width:550,height:25,align:'center'});

	//doc.addPage();

	// Draw a triangle
	//doc.save().moveTo(100, 150).lineTo(100, 250).lineTo(200, 250).fill("#FF3300");

	// Apply some transforms and render an SVG path with the 'even-odd' fill rule
	//doc.scale(0.6).translate(470, -380).path('M 250,75 L 323,301 131,161 369,161 177,301 z').fill('red', 'even-odd').restore();

	// Add some text with annotations
	//doc.addPage().fillColor("blue").text('Here is a link!', 100, 100).underline(100, 100, 160, 27, {color: "#0000FF"}).link(100, 100, 160, 27, 'http://google.com/');

	// Write the PDF file to disk
	doc.write(part.partID + '.pdf');
	
	callback();
}