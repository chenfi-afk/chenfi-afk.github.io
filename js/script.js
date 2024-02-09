/* global monogatari */

// Define the messages used in the game.
monogatari.action ('message').messages ({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	}
});

// Define the notifications used in the game
monogatari.action ('notification').notifications ({
	'Welcome': {
		title: 'Welcome',
		body: 'This is the Monogatari VN Engine',
		icon: ''
	}
});

// Define the Particles JS Configurations used in the game
monogatari.action ('particles').particles ({

});

// Define the canvas objects used in the game
monogatari.action ('canvas').objects ({

});

// Credits of the people involved in the creation of this awesome game
monogatari.configuration ('credits', {

});


// Define the images that will be available on your game's image gallery
monogatari.assets ('gallery', {

});

// Define the music used in the game.
monogatari.assets ('music', {
	'dungeon_synth' : 'beyond the edge of the world - lookfar (dungeon synth EP).mp3'
});

// Define the voice files used in the game.
monogatari.assets ('voices', {

});

// Define the sounds used in the game.
monogatari.assets ('sounds', {

});

// Define the videos used in the game.
monogatari.assets ('videos', {

});

// Define the images used in the game.
monogatari.assets ('images', {

});

// Define the backgrounds for each scene.
monogatari.assets ('scenes', {
	'eagle': 'bald_eagle.png',
	'gonb': 'gonb-parrot-bird-cowboy.png'

});


// Define the Characters
monogatari.characters ({
	'creature': {
		name: 'The Creature',
		color: '#5bcaff',
		sprites: {
			normal: 'spesmin.png',
			angry: 'spesmin_angry.png',
			demonmode: 'spesmin_demon-mode.png'
		}
	},
});

monogatari.script ({
	// The game starts here.
	'Start': [
		'show scene eagle',
		'play music dungeon_synth',
		'This is a statement',
		{
			'Choice': {
				'Dialog': 'You notice a pizza slice on the ground.',
				'Get the slice': {
					'Text': 'Get the slice',
					'Do': 'You quickly pick up the pizza slice. Can\'t be leaving that out on the streets.',
					//update pizza value by 1
					"onChosen": function() { modifyPizzaSliceCount(1) },
				},
				'Leave the slice': {
					'Text': 'Leave the slice',
					'Do': 'You leave the pizza slice. Awfully suspicious for that to be lying around.'
				}
			}
		},
		'creature now there\'s a person saying this sentence omg',

		'show character creature normal',
		'creature omg i just appeared in front of your eyes',
		
		//check if pizza is present - conditional
		{'Conditional': {
			'Condition': function () {
				return getPizzaSliceCount() > 0;
			},
			'True': 'jump PizzaEnding',
			'False': 'jump label-1'
		}}
	],

	'label-1': [
		'show character creature angry',
		'creature im so angry right now',
		
		'show character creature demonmode',
		'creature now youve really done it',
		
		'show scene gonb',
		'show character creature demonmode',
		'The creature shifts intimidatingly in your direction. You feel your palms begin to sweat.',
		{
			'Choice': {
				'Dialog': 'creature now i am going to devour your soul',
				'drop your laptop and run': {
					'Text': 'you drop your laptop and run away from the creature',
					'Do': 'jump droplaptop'
				},
				'stay and fight': {
					'Text': 'this dog can\'t beat me',
					'Do': 'jump stayfight'
				}
			}
		},

		'end'
	],

	'droplaptop': [
		'you drop your laptop and run.',
		'show background gonb with fadeOut',

		'unfortunately, you haven\'t exercised since you graduated high school. you trip and fall and die',

		'end'
	],

	'stayfight': [
		'you stay and fight.',
		'...',
		'show character creature normal',
		'oh...',
		'it\'s just hungry...',

		'end'
	],

	'PizzaEnding': [
		'show scene gonb',
		'show character creature normal',
		'The creature perks up. It smells the pizza on you.',
		'You feed it a pizza. The creature becomes your best friend forever',

		'end'
	]
});

////////////////
// FUNCTIONS //
//////////////

function modifyPizzaSliceCount(i) {
    monogatari.storage().player.pizza += i;
};

function getPizzaSliceCount() {
    return monogatari.storage().player.pizza;
};