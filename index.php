<html>
<head>
	<link rel="stylesheet" type="text/css" href="style.css"/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	<meta name="HandheldFriendly" content="True"/>

	<link rel="image_src" href="http://gratheon.com/monster/preview.png" />
	<meta name="description" content="Monsters to clowns" />

	<meta property="og:image" content="http://gratheon.com/monster/preview.png" />
	<meta property="og:title" content="Monsters to clowns" />
	<meta property="og:description" content="..." />

</head>
<body>

<div style="width: 1024px;height: 768px;margin: 0 auto;position: relative;">
	<div id="scene0"
	     class="scene">
		<audio id="snd_intro" loop>
			<source src="res/scene0/intro.mp3" type="audio/mpeg">
		</audio>

		<audio id="snd_button">
			<source src="res/scene0/button.mp3" type="audio/mpeg">
		</audio>

		<div
			id="menu_rain"
			class="ani"
			data-src="scene0/rain"
			data-fr="3"
			data-rate="9"></div>

		<div id="logo"></div>
		<div id="skip" class="clicky"></div>
		<div id="start" class="clicky"></div>
	</div>

	<div id="scene1"
	     class="scene ani"
	     data-src="scene1/wake"
	     data-loop="0"
	     data-fr="14"
	     data-rate="3"></div>

	<div id="scene2" class="scene">
		<div id="closet" class="clicky openable">
			<audio class="open_sound">
				<source src="res/scene2/sound/closet_open.mp3" type="audio/mpeg">
			</audio>
			<audio class="close_sound">
				<source src="res/scene2/sound/closet_close.mp3" type="audio/mpeg">
			</audio>
		</div>

		<div id="shelf" class="clicky openable">
			<audio class="close_sound">
				<source src="res/scene2/sound/shelf_close.mp3" type="audio/mpeg">
			</audio>
			<audio class="open_sound">
				<source src="res/scene2/sound/shelf_open.mp3" type="audio/mpeg">
			</audio>
		</div>

		<div id="chest" class="clicky openable">
			<audio class="open_sound">
				<source src="res/scene2/sound/chest_open.mp3" type="audio/mpeg">
			</audio>
			<audio class="close_sound">
				<source src="res/scene2/sound/chest_close.mp3" type="audio/mpeg">
			</audio>
		</div>

		<div id="sky">
			<audio id="snd_rain" loop>
				<source src="res/scene2/sound/rain.mp3" type="audio/mpeg">
			</audio>
		</div>

		<div id="girl" class="ani"
		     data-src="scene2/girl"
		     data-fr="2"
		     data-rate="2"></div>

		<div id="curtains" class="clicky">
			<audio class="open_sound">
				<source src="res/scene2/sound/curtains_open.mp3" type="audio/mpeg">
			</audio>
		</div>

		<div id="monster" class="clicky"></div>
		<div id="rain" class="ani"
		     data-src="scene2/rain"
		     data-fr="3"
		     data-rate="5"></div>
	</div>

	<div id="scene3"
	     class="scene ani"
	     data-src="scene3/monster"
	     data-loop="0"
	     data-fr="11"
	     data-rate="1">
		<audio id="thunder">
			<source src="res/scene3/thunder.mp3" type="audio/mpeg">
		</audio>

	</div>

	<div id="scene4" class="scene">
		<div id="girl4"></div>
		<div id="fearbar_bg">
			<div id="fearbar"></div>
		</div>
		<div id="fearbar_level"></div>

		<audio id="snd_flying">
			<source src="res/scene4/sound/flying.mp3" type="audio/mpeg">
		</audio>
		<audio id="snd_star">
			<source src="res/scene4/sound/star.wav" type="audio/mpeg">
		</audio>
	</div>

	<video id="landing" height="100%" width="100%">
		<source src="res/scene4/landing.mp4" type="audio/mpeg">
	</video>

	<div id="scene5" class="scene">
		<div id="bag" class="clicky openable"></div>
		<div id="book" class="clicky openable"></div>
		<div id="tv" class="clicky openable"></div>
		<div id="plant" class="clicky openable"></div>
		<div id="parent" class="clicky openable"></div>

		<div id="girl2" class="ani"
		     data-src="scene5/girl"
		     data-fr="2"
		     data-rate="0.9"></div>
	</div>


	<video id="video_tv" height="100%" width="100%">
		<source src="res/scene5/tv.mp4" type="audio/mpeg">
	</video>
	<video id="video_monster" height="100%" width="100%">
		<source src="res/scene5/monster_creator.mov" type="audio/mpeg">
	</video>
</div>
<script src="jquery-2.1.4.min.js"></script>
<script src="script.js"></script>
</body>
</html>