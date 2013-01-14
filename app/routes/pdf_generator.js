'use strict';

var PDFDocument =  require('pdfkit'),
  http = require('http'),
  path = require('path');


function getPart(id,callback){
	var opts = {
		host: 'api.curtmfg.com',
		path: '/v2/GetPart?dataType=json&partID=' + id
	};


	http.get(opts,function(resp){
		var body = '';
		resp.setEncoding('utf8');
		resp.on('data',function(chunk){
			body += chunk;
		});

		resp.on('end',function(){
			callback(JSON.parse(body),undefined);
		});

		resp.on('error',function(){
			callback({},'There was an error while processing request for Part #' + id);
		});
	});
}



function generate(part,callback){
	var doc = new PDFDocument();
	doc.image(path.join(process.cwd(),'/public/img/benson.png'),10,40, {width: 175},{height:150});

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
	var attr = {};
	for (var i = 0; i < part.attributes.length; i++) {
		attr = part.attributes[i];
		if(attr.key === 'UPC'){
			upc = attr.value;
		}
	}
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
	for (i = 0; i < part.content.length; i++) {
		var con = part.content[i];
		if(con.key !== 'installationSheet'){
			desc += con.value + '\n';
		}
	  }

	desc += '\r\n';
	for (i = 0; i < part.attributes.length; i++) {
		attr = part.attributes[i];
		if(attr.key !== 'UPC'){
			desc += attr.key + ': ' + attr.value + '\n';
		}
	}
	doc.text(desc,145,305,{width:440,height:200});

	doc.fontSize(10);

	doc.rect(25,500,110,40).fillAndStroke('#eaeaea','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('MAIN PRODUCT IMAGE',30,510,{width:110,height:40});

	doc.rect(135,500,440,40).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');

	var img = {};
	for (i = 0; i < part.images.length; i++) {
		img = part.images[i];
		if(img.width === 300 && img.sort === 'a'){
			doc.text(img.path,145,510,{width:440,height:40});
		}
	}

	doc.rect(25,540,110,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('VIDEO LINK',30,550,{width:110,height:25});

	doc.rect(135,540,440,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	if(part.videos.length > 1){
		for (i = 0; i < part.videos.length; i++) {
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
	for (i = 0; i < part.content.length; i++) {
		attr = part.content[i];
		if(attr.key === 'installationSheet'){
			doc.text(attr.value,145,570,{width:440,height:25});
		}
	}

	doc.rect(25,590,110,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('ADDITIONAL IMAGES',30,600,{width:110,height:25});

	doc.rect(135,590,440,25).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	for (i = 0; i < part.images.length; i++) {
		img = part.images[i];
		if(img.width === 300 && img.sort === 'b'){
			doc.text(img.path,145,600,{width:440,height:25});
		}
	}

	doc.rect(25,615,110,125).fillAndStroke('#eaeaea','#ccc');
	doc.fillAndStroke('black','black');
	doc.text('OTHER / NOTES: Anything in this box will not be displayed in the Trade Show.',30,625,{width:110,height:125});

	doc.rect(135,615,440,125).fillAndStroke('#fff','#ccc');
	doc.fillAndStroke('black','black');
	var add_imgs = '';
	for (i = 0; i < part.images.length; i++) {
		img = part.images[i];
		if(img.width === 300 && img.sort !== 'a' && img.sort !== 'b'){
			add_imgs += img.path + '\n';
		}
	}
	if(add_imgs.length > 0){
		doc.text(add_imgs,145,625,{width:440,height:125});
	}
	doc.text('Please email this form to ebergeron@bensonorg.com when complete.',25,750,{width:550,height:25,align:'center'});
	doc.text('One email per product please.',25,770,{width:550,height:25,align:'center'});

	callback(doc);

}


/*
 * GET users listing.
 */

exports.pdf = function(req, res){
	getPart(req.params.id,function(part,err){
		if(!err && part){
			generate(part,function(doc){
				doc.output(function(out){
					res.set('Content-Type','application/pdf');
					res.write(out,'binary');
					res.end();
				});
			});
		}else{
                  res.end();
                }
	});
};

exports.download = function(req, res){
	getPart(req.params.id,function(part,err){
              if(!err && part.shortDesc){
			generate(part,function(doc){
				doc.output(function(out){
					res.set({
						'Content-Type':'application/pdf',
						'Content-Disposition':'attachment; filename=' + part.partID +'.pdf'
					});
					res.write(out,'binary');
					res.end();
				});
			});
		}else{
                  res.end();
                }
	});
};
