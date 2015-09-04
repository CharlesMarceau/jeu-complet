
// on crée notre seul "state", notre seule "scène"
var playState = {
	// ici on ajoute toutes les fonctions qu'on a de besoin pour notre scène


	create: function() {
		// cette fonction est appelée après le "preload function"
		// c'est ici qu'on set up le jeu, affiche les sprites, etc...

		// on assigne le style physique/collisions du jeu
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// on affiche l'image préloadé du joueur
		// var player = game.add.sprite(250, 170, 'player');

		this.player = game.add.sprite(250, 170, 'player');
		// this.player = game.add.sprite( game.world.centerX, game.world.centerY, 'player');

		// Set the anchor point to the top left of the sprite
		this.player.anchor.setTo(0.5, 0.5);



		// ajout de la gravité du joueur
		// on doit dire à Phaser que le joueur utilisera la méthode physique ARCADE
		game.physics.arcade.enable(this.player);

		// ajout de la gravité verticale du joueur
		this.player.body.gravity.y = 500; // génère une vitesse de déplacement (plus le chiffre est élevé)
	
		// ajout du contrôle avec les flèches
		this.cursor = game.input.keyboard.createCursorKeys();


		// activation de createWorld
		this.createWorld();


		// ajout du "coin"
		this.coin = game.add.sprite( 60, 140, 'coin');

		// ajout du mode physique arcade au "coin"
		game.physics.arcade.enable(this.coin);

		// seté le point d'ancrage du "coin"
		this.coin.anchor.setTo( 0.5, 0.5);


		// affichage du texte contenant le score
		this.scoreLabel = game.add.text( 30, 30, 'score: 0', { font: '18px Arial', fill:'#ffffff'});

		// initialisation du score
		game.global.score = 0;


		// création d'un groupe d'enemies
		this.enemies = game.add.group();
		this.enemies.enableBody = true;

		// creation de 10 enemies avec une image "enemi"
		// les enemis sont morts par défaut, alors ils ne sont pas visibles dans le jeu
		this.enemies.createMultiple(10, 'enemy');

		// call 'addEnemy' toutes les 2.2 secondes
		game.time.events.loop(2200, this.addEnemy, this);

	},

	update: function() {
		// cette fonction est appelé 60 fois par seconde
		// il contient la logique du jeu

		// on doit indiquer a Phaser que le joueur et les murs doivent posséder une physique collision
		game.physics.arcade.collide(this.player, this.walls);

		// on call la fonction movePlayer
		this.movePlayer();

		// vérifier si le playeur est mort
		if (!this.player.inWorld) {
			this.playerDie();
		}


		// appel de la fonction takeCoin lorsque le joueur touche au "coin"
		game.physics.arcade.overlap( this.player, this.coin, this.takeCoin, null, this );


		// créer des collisions sur les murs pour les enemis
		game.physics.arcade.collide(this.enemies, this.walls);

		// callé la fonciton 'playerDie' quand le joueur et l'ennemi se touchent
		game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
	},

	movePlayer: function() {

		// flèche de gauche
		if (this.cursor.left.isDown) {

			// on déplace le joueur vers la gauche de tant de pixel
			this.player.body.velocity.x = -200;
		}

		// sinon si flèche de droite
		else if (this.cursor.right.isDown) {

			// on déplace le joueur vers la droite de tant de pixel
			this.player.body.velocity.x = 200;
		}

		// si pas de flèche pesée... 

		else {

			// on immobilise le joueur
			this.player.body.velocity.x = 0;
		}

		// si la flèche de haut est pesée et que le joueur touche le sol

		if (this.cursor.up.isDown && this.player.body.touching.down) {

			// on fait sauter le joueur
			this.player.body.velocity.y = -320;
		}

	},

	createWorld: function() {

		// // création des murs

		// // création du mur de gauche
		// var leftWall = game.add.sprite(0,0, 'wallV');

		// // ajout du physique/collision pour le mur de gauche
		// game.physics.arcade.enable(leftWall);

		// // on set une propriété au mur pour etre sur qu'il soit fixe
		// // on ne veut pas le voir tomber dans le vide
		// leftWall.body.immovable = true;

		// // même  chose pour le mur de droite
		// var rightWall = game.add.sprite(0,0,'wallV');
		// game.physics.arcade.enable(rightWall);
		// rightWall.body.immovable = true;

		// // création d'un nouveau groupe pour faire les murs
		// this.walls = game.add.group();

		// // ajout du physique arcade
		// this.walls.enableBody = true;

		// // ajout de 2 murs dans le groupe
		// game.add.sprite(0, 0, 'wallV', 0, this.walls); // mur de gauche
		// game.add.sprite(480, 0, 'wallV', 0, this.walls); // mur de droite

		// this.walls.setAll('body.immovable', true );

		// création du groupe de murs avec physique/collision arcade
		this.walls = game.add.group();
		this.walls.enableBody = true;

		// création des 10 murs
		game.add.sprite(0, 0, 'wallV', 0, this.walls); // mur de gauche
		game.add.sprite(480, 0, 'wallV', 0, this.walls); // mur de droite

		game.add.sprite(0, 0, 'wallH', 0, this.walls); // mur en haut à gauche
		game.add.sprite(300, 0, 'wallH', 0, this.walls); // mur en haut à droite
		game.add.sprite(0, 320, 'wallH', 0, this.walls); // mur en bas à gauche
		game.add.sprite(300, 320, 'wallH', 0, this.walls); // mur en bas à droite

		game.add.sprite(-100, 160, 'wallH', 0, this.walls); // mur milieu à gauche
		game.add.sprite(400, 160, 'wallH', 0, this.walls); // mur milieu à droite

		var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
		middleTop.scale.setTo(1.5, 1);
		var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1.5, 1);

		// seté les murs pour qu'ils soient tous immobiles
		this.walls.setAll('body.immovable', true);

	},

	playerDie: function() {

		// pour reseté le jeu
		game.state.start('main');
	},

	takeCoin: function() {

		// faire disparaitre le "coin"
		this.coin.kill();

		// on augmente le score de 5
		game.global.score += 5;

		// on met le score à jour
		this.scoreLabel.text = 'score: ' + game.global.score;

		// on change la position du "coin"
		this.updateCoinPosition();
	},

	updateCoinPosition: function() {

		// création de toutes les positions possibles de réapparition du "coin"
		var coinPosition = [
			{x: 140, y:60}, {x:360, y: 60}, // rangé du haut
			{x: 60, y:140}, {x:440, y: 140}, // rangé du milieu
			{x: 130, y:300}, {x:370, y: 300}, // rangé du bas
		];

		// il faut déplacer le "coin"
		// sinon le coin peut apparaitre 2 fois à la même place
		for (var i=0; i < coinPosition.length; i++) {
			if (coinPosition[i].x === this.coin.x) {
				coinPosition.splice(i, 1);
			}
		}

		// on choisi une position au hasard (random)
		var newPosition = coinPosition [
		game.rnd.integerInRange(0, coinPosition.length-1)];

		// set la nouvelle position du coin
		this.coin.reset(newPosition.x, newPosition.y);
	},

	addEnemy: function() {

		// pogner le premier enemi mort du groupe
		var enemy = this.enemies.getFirstDead();

		// si aucun enemi est mort -> ne rien faire
		if(!enemy) {
			return;
		}

		// initialiser un enemi
		enemy.anchor.setTo(0.5, 1);
		enemy.reset(game.world.centerX, 0);
		enemy.body.gravity.y = 500;
		enemy.body.velocity.x = 100 * game.rnd.integerInRange(-1,1);
		enemy.body.bounce.x = 1;
		enemy.checkWorldBounds = true;
		enemy.outOfBoundsKill = true;
	},

	playerDie: function() {

		// quand le joueur mort
		game.state.start('menu');
	}

};