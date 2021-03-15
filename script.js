var images = [];
function preload(list) {
	for (var i = 0; i < list.length; i++) {
		var img = new Image();
		img.src = list[i];
		images.push(img);
	}
}

function sound(id) {
	var audio = document.getElementById('snd_' + id);
	if (audio.paused !== true) {
		audio.play();
	}
}

function attachAnimations() {
	var $el        = $(this);
	var seq        = $el.data('src');
	var frameLimit = $el.data('fr');
	var frameRate  = $el.data('rate');
	var loop       = $el.data('loop');

	if (typeof(frameRate) == undefined || !frameRate) {
		frameRate = 5;
	}

	//preload all frames
	var images = [];
	var i;
	for (i = 1; i <= frameLimit; i++) {
		images.push('res/' + seq + '.' + i + '.png');
	}

	preload(images);

	$el.on('ani', function () {
		var i           = 1;
		var tmpInterval = window.setInterval(function () {
			$el.css({'background-image': 'url("res/' + seq + '.' + i + '.png")'});
			i++;
			if (i > frameLimit) {
				if (loop == '0') {
					$el.trigger('animated');
					window.clearInterval(tmpInterval);
					return;
				}

				i = 1; //in case of loop, repeat
			}
		}, (1000 / frameRate));
	});
}

function rmpx($el, pos) {
	return $el.css(pos).replace('px', '') * 1;
}

$(document).ready(function () {

		$('.openable').click(function () {
			$(this).toggleClass('open');

			if ($(this).hasClass('open')) {
				if ($('.open_sound', this).length) {
					$('.open_sound', this)[0].play();
				}
			}
			else {
				if ($('.close_sound', this).length) {
					$('.close_sound', this)[0].play();
				}
			}
		});

		//scene 0, menu
		function gotoScene1() {
			$('#snd_button')[0].play();

			$('#scene1').each(attachAnimations);
			$('#scene1')
				.addClass('active')
				.trigger('ani')
				.click(gotoScene2)
				.on('animated', gotoScene2);

			$('#scene0').removeClass('active');
			$('#snd_intro')[0].pause();

			window.setTimeout(function () {
				$('#snd_rain')[0].play();
				$('#thunder')[0].play();
				//$('#snd_rain')[0].volume = 0.2;
			}, 1000);
		}

		$('#snd_intro')[0].play();
		//$('#snd_intro')[0].volume = 0.2;

		$('#scene0').addClass('active').trigger('ani');
		$('#scene0 #start').click(gotoScene1).on('animated', gotoScene1);
		$('#scene0 #skip').click(function () {
			$('#scene0').removeClass('active');
			prepareScene5();
			$('#snd_intro')[0].pause();
			$('#snd_button')[0].play();
		});

		$('#scene0 .ani').each(attachAnimations).trigger('ani');

		//scene 1, waking up
		function gotoScene2() {
			$('#scene1').removeClass('active');
			$('#scene2').addClass('active');
			$('#scene2 .ani').each(attachAnimations).trigger('ani');

			$('#snd_rain')[0].play();
			$('#snd_rain')[0].volume = 0.2;
		}

		function prepareScene3() {
			window.setTimeout(function () {
				$('#thunder')[0].play();
			}, 4000);

			var skippedScene3 = false;
			$('#scene3')
				.each(attachAnimations)
				.trigger('ani')
				.click(function () {
					$('#scene3').removeClass('active');
					prepareScene4();
					skippedScene3 = true;
				})
				.on('animated', function () {
					if (!skippedScene3) {
						$('#scene3').removeClass('active');
						prepareScene4();
					}
				});
		}

		//scene2, first room
		$('#scene2 #curtains').click(function () {
			if ($(this).hasClass('open')) {
				$('#scene2').removeClass('active');
				$('#scene3').addClass('active');

				prepareScene3();

			}
			else {
				$('.open_sound', this)[0].play();
			}

			$(this).toggleClass('open');
		});

		//scene 3, meeting

		//SCENE 4, flying game
		var flyingScroll;

		function prepareScene5() {
			$('#scene5').addClass('active');
			$('#scene5 .ani').each(attachAnimations).trigger('ani');
		}

		function onScene4Click(e) {
			$('#girl4').css({
				'top': e.screenY - ($('#girl4').height() / 2)
			});
		}

		function scene4GirlMoveUp() {
			$('#girl4').css({
				'top': rmpx($('#girl4'), 'top') - 30
			});
		}

		function scene4GirlMoveDown() {
			$('#girl4').css({
				'top': rmpx($('#girl4'), 'top') + 30
			});
		}

		$('#scene4').click(onScene4Click).on('touchstart', onScene4Click);

		$(document).on("keyup", function (e) {
			var code = e.which;
			if (code == 40) {
				scene4GirlMoveDown();
			}
			else if (code == 38) {
				scene4GirlMoveUp();
			}
		});

		function removeScene4() {
			$('#scene4').removeClass('active');
			window.clearInterval(flyingScroll);
		}

		function prepareScene4() {
			$('#snd_rain')[0].pause();
			$('#snd_flying')[0].play();

			//fearBar
			var fearLevel = 50;

			function offsetFearBar(v) {
				fearLevel += v;
				$('#fearbar_level').css('left', 710 + fearLevel);
			}

			$('#scene4').addClass('active');
			$('#girl4').css({
				'top':  0,
				'left': 0
			});

			var step    = 1;
			var current = 0;
			var bgWidth = 4800;

			flyingScroll = setInterval(function () {
				current -= step;
				if (current == -bgWidth) {
					current = 0;
				}

				$('#scene4').css("background-position", current + "px 0");
				$('.star1').each(function () {
					var $star    = $(this);
					var starLeft = rmpx($star, 'left');
					var starTop  = rmpx($star, 'top');
					$star.css("left", starLeft - 1);

					//clear stars that left the building
					if (starLeft < -$star.width()) {
						$star.remove();
					}

					//star collision
					if (starLeft <= $('#girl4').width() &&
						starTop > rmpx($('#girl4'), 'top') &&
						starTop < rmpx($('#girl4'), 'top') + $('#girl4').height()
					) {
						$star.remove();
						offsetFearBar(-80);
						$('#snd_star')[0].play();
					}
				});

				//reaching min should move to next scene
				if (fearLevel < -90) {
					$('#scene2').removeClass('active');
					removeScene4();
					$('#landing').show();
					$('#landing')[0].play();

					window.setTimeout(function () {
						$('#landing')[0].pause();
						$('#landing').hide();
						prepareScene5();
					}, 4000);
				}

				//star cleanip
				if ($('.star1').length < 1 && Math.random() * 1000 <= 3.5) {
					$star = $("<div class='star1'></div>");
					$star.css({
						'left': 1000,
						'top':  Math.random() * $('#scene4').height()
					});
					$('#scene4').append($star);
				}

			}, 1);
		}

		function hideScene5() {
			$('#scene5').removeClass('active');
		}

		//scene 5, tree house
		function showVideo() {

			window.setTimeout(function () {
				$('#video_tv').show();
				$('#video_tv')[0].play();
				hideScene5();
			}, 1000);

			var skip5Timeout = window.setTimeout(function () {
				prepareScene5();
				$('#video_tv').hide();
			}, 116 * 1000);

			//$('#video_tv').click(function(){
			//	window.clearTimeout(skip5Timeout);
			//	prepareScene5();
			//
			//	//$('#video_tv').hide();
			//	$('#video_tv')[0].pause();
			//});
		}

		$('#tv').click(showVideo).on('touchend', showVideo);

		//scene 5, tree house
		function showVideo2() {

			window.setTimeout(function () {
				$('#video_monster').show();
				$('#video_monster')[0].play();
				hideScene5();
			}, 1000);

			var skip6Timeout = window.setTimeout(function () {
				prepareScene5();
				$('#video_monster').hide();
			}, 24 * 1000);

			//$('#video_tv').click(function(){
			//	window.clearTimeout(skip5Timeout);
			//	prepareScene5();
			//
			//	//$('#video_tv').hide();
			//	$('#video_tv')[0].pause();
			//});
		}

		$('#bag').click(showVideo2).on('touchend', showVideo2);
	}
);