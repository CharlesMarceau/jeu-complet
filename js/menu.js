
var menuState = {

	create: function() {

		// ajout de la couleur de fond
		game.add.image(0, 0, 'background');

		// affichage du nom du jeu
		var nameLabel = game.add.text(game.world.centerX, 80 ,'La Boîte à monnaie',
			{ font: '50px Arial', fill: '#ffffff'});
		nameLabel.anchor.setTo(0.5, 0.5);


		// explications de comment fonctionne le jeu
		var startLabel = game.add.text(game.world.centerX, game.world.height-80, 'Appuyez sur la flèche du haut pour démarrer',
			{ font: '25px Arial', fill: '#ffffff'});
		startLabel.anchor.setTo(0.5, 0.5);

		// création du bouton de commande pour la flèche du haut
		var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);

		// quand le bouton du haut est appuyé ;
		upKey.onDown.addOnce(this.start, this);

	},

	start: function() {

		// démarrer le jeu
		game.state.start('play');
	}

}