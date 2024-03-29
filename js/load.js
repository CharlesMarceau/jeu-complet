
var loadState = {

	preload: function() {

		// add a 'téléchargement...' à l'écran
		var loadingLabel = game.add.text(game.world.centerX, 150, 'Téléchargement...', 
			{ font: '30px Arial', fill:'#ffffff'});
		loadingLabel.anchor.setTo (0.5, 0.5);


		// affichage de la bar de progression
		var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
		progressBar.anchor.setTo(0.5, 0.5);
		game.load.setPreloadSprite(progressBar);

		// load des autres assets
		game.load.image('player', 'assets/player.png');
		game.load.image('enemy', 'assets/enemy.png');
		game.load.image('coin', 'assets/coin.png');
		game.load.image('wallV', 'assets/wallVertical.png');
		game.load.image('wallH', 'assets/wallHorizontal.png');

		// load d'un nouvel asset qu'on utilise dans le 'menu state'
		game.load.image('background', 'assets/background.png');

	},

	create: function() {

		// une fois le loading terminé, on se dirige vers le 'menu'
		game.state.start('menu');
	}
}