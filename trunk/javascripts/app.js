/* Foundation v2.2 http://foundation.zurb.com */
jQuery(document).ready(function ($) {

	/* Use this js doc for all application specific JS */

	/* TABS --------------------------------- */
	/* Remove if you don't need :) */

	function activateTab($tab) {
		var $activeTab = $tab.closest('dl').find('a.active'),
				contentLocation = $tab.attr("href") + 'Tab';

		//Make Tab Active
		$activeTab.removeClass('active');
		$tab.addClass('active');

    	//Show Tab Content
		$(contentLocation).closest('.tabs-content').children('li').hide();
		$(contentLocation).css('display', 'block');
	}

	$('dl.tabs').each(function () {
		//Get all tabs
		var tabs = $(this).children('dd').children('a');
		tabs.click(function (e) {
			activateTab($(this));
		});
	});

	if (window.location.hash) {
		activateTab($('a[href="' + window.location.hash + '"]'));
	}

	/* ALERT BOXES ------------ */
	$(".alert-box").delegate("a.close", "click", function(event) {
    event.preventDefault();
	  $(this).closest(".alert-box").fadeOut(function(event){
	    $(this).remove();
	  });
	});


	/* PLACEHOLDER FOR FORMS ------------- */
	/* Remove this and jquery.placeholder.min.js if you don't need :) */

	//$('input, textarea').placeholder();

	/* TOOLTIPS ------------ */
	//$(this).tooltips();



	/* UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE6/7/8 SUPPORT AND ARE USING .block-grids */
//	$('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'left'});
//	$('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'left'});
//	$('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'left'});
//	$('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'left'});



	/* DROPDOWN NAV ------------- */

	var lockNavBar = false;
	$('.nav-bar a.flyout-toggle').live('click', function(e) {
		e.preventDefault();
		var flyout = $(this).siblings('.flyout');
		if (lockNavBar === false) {
			$('.nav-bar .flyout').not(flyout).slideUp(500);
			flyout.slideToggle(500, function(){
				lockNavBar = false;
			});
		}
		lockNavBar = true;
	});
  if (Modernizr.touch) {
    $('.nav-bar>li.has-flyout>a.main').css({
      'padding-right' : '75px'
    });
    $('.nav-bar>li.has-flyout>a.flyout-toggle').css({
      'border-left' : '1px dashed #eee'
    });
  } else {
    $('.nav-bar>li.has-flyout').hover(function() {
      $(this).children('.flyout').show();
    }, function() {
      $(this).children('.flyout').hide();
    })
  }

	/* Kinetic Canvas ------------- */

	function writeMessage(messageLayer, message) {
		var context = messageLayer.getContext();
		messageLayer.clear();
		context.font = "18pt Calibri";
		context.fillStyle = "black";
		context.fillText(message, 10, 25);
	}
	
	function loadImages(sources, callback) {
		var images = {};
		var loadedImages = 0;
		var numImages = 0;
		for(var src in sources) {
			numImages++;
		}
		for(var src in sources) {
			images[src] = new Image();
			images[src].onload = function() {
				if(++loadedImages >= numImages) {
					callback(images);
				}
			};
			images[src].src = sources[src];
		}
	}
	
	function drawBackground(background, backgroundImg, text) {
		var canvas = background.getCanvas();
		var context = background.getContext();

		context.drawImage(backgroundImg, 0, 0);
//		context.font = "20pt Calibri";
//		context.textAlign = "center";
//		context.fillStyle = "white";
//		context.fillText(text, canvas.width / 2, 40);
	}
	
	function initStage(images) {

		var background = new Kinetic.Layer();
		var animationLayer = new Kinetic.Layer();
		
		// image positions
		var image_positions = {
			tanhuar: {
				x: 10,
				y: 70
			},
		};
		
		// create draggable animals
		for(var key in image_positions) {
			// anonymous function to induce scope
			(function() {
				var privKey = key;
				var image_position = image_positions[key];

				var image = new Kinetic.Image({
					image: images[key],
					x: image_position.x,
					y: image_position.y,
					draggable: true,
				});

				image.on("dragstart", function() {
					image.moveToTop();
					animationLayer.draw();
				});

				// make object glow on mouseover
				image.on("mouseover", function() {
					image.setImage(images[privKey + "_glow"]);
					animationLayer.draw();
					document.body.style.cursor = "pointer";
				});
				// return animal on mouseout
				image.on("mouseout", function() {
					image.setImage(images[privKey]);
					animationLayer.draw();
					document.body.style.cursor = "default";
				});

				image.on("dragmove", function() {
					document.body.style.cursor = "pointer";
				});
				
				image.on("dragend", function() {
					document.getElementById('coordinates').innerHTML = image.x + '/' + image.y;
				});

				animationLayer.add(image);
			})();
		}		

		stage.add(background);
		stage.add(animationLayer);

		drawBackground(background, images.background, "");
	}	

	var sources = {
		background: "images/background.png",
		tanhuar: "images/tanhuar.png",
		tanhuar_glow: "images/tanhuar_glow.png",		
	};
	
	var stage = new Kinetic.Stage({
		container: "kinetic",
		width: 600,
		height: 400
	});	

	loadImages(sources, initStage);
	
	$('#reset-canvas').click(function(event){
		document.getElementById('coordinates').innerHTML = '';		
		loadImages(sources, initStage);
	});
	
});