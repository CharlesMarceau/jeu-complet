
var bootState = {

	preload: function() {

		// load les images
		game.load.image('progressBar', 'assets/progressBar.png');
	},

	create: function() {

		// set les settings
		game.stage.backgroundColor = '#3498db';
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// démarrer le load state
		game.state.start('load');
	}

}