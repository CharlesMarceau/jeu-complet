
// initialisation du jeu
var game = new Phaser.Game (500, 340, Phaser.AUTO, 'gameDiv');

// définir notre variable global
game.global = {
	score:0
};

// ajout de tous les 'state'
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);

// démarrer avec le 'boot' state
game.state.start('boot');