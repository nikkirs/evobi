import React from "react";
import Phaser from "phaser";
import { connect } from "react-redux";
var running = new Audio("../../running.mp3");
var jumping = new Audio("../../jumping.mp3");
var explosion = new Audio("../../explosion.mp3");
// import UIfx from "uifx";
//main functions preload->to load all images
//create() to create all sort of objects
//update() which is called in a loop in milliseconds
//config to define properties  about the canvas

class Player extends React.Component {
  constructor(props) {
    var obj = JSON.parse(localStorage.getItem("obj"));
    console.log(obj, "paridhi");
    var cam = JSON.parse(localStorage.getItem("cam"));
    super(props);
    var shoot = 0; //flag for shooting enable
    var down = 0; //flag for move condition in update
    var first = 0;
    var flag = 0;
    var cursor1 = 0; //flag for keyboard interaction

    var seq1 = []; //sequence of moves in a array
    var current_position; //used in move in update func

    var ar = obj; //obj contains all objects in array;

    var stars, bombs, any, dudes;
    var bomb_sound = false;
    var i = 0;
    this.state = {
      config: {
        type: Phaser.AUTO,
        width: 450,
        height: 300,
        scale: {
          mode: Phaser.Scale.FIT,
          parent: "phaser-example",
          autoCenter: Phaser.Scale.CENTER_BOTH
        },
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 300 },
            debug: false,
            setBounds: {
              x: 0,
              y: 0,
              width: 3200,
              height: 600,
              thickness: 32
            }
          }
        },
        scene: new Phaser.Class({
          Extends: Phaser.Scene,

          initialize: function GameScene() {
            Phaser.Scene.call(this, { key: "gameScene", active: true });

            this.player = null;
            this.cursors = null;
            this.score = 0;
            this.scoreText = null;
            this.scoreText1 = null;
            this.platforms;
          },

          preload: function() {
            this.load.image("ground", "../../platform.png");
            this.load.image("sun", "../../sun.png");
            this.load.image("log", "../../log.png");
            this.load.image("grass", "../../grass.png");
            this.load.image("star", "../../star.png");
            this.load.image("bomb", "../../bomb.png");
            this.load.image("sky", "../../sky.png");

            this.load.spritesheet("dude", "../../dude.png", {
              frameWidth: 32,
              frameHeight: 48
            });
            this.load.spritesheet("ninja", "../../ninja.jpg", {
              frameWidth: 32,
              frameHeight: 48
            });
          },

          create: function() {
            const rememberMe = localStorage.getItem("name");

            this.add.image(400, 300, "sky").setScale(2);
            this.cameras.main.setBounds(cam.x + 60, cam.y, 1090 * 2, 1000);
            // this.cameras.main.width = 450;
            // this.cameras.main.height = 600;
            var player;
            var platforms = this.platforms;
            platforms = this.physics.add.staticGroup();
            platforms
              .create(450, 608, "ground")
              .setScale(2)
              .refreshBody();

            for (var i = 0; i < ar.length; i++) {
              if (!ar[i].prop.seq.length && !ar[i].prop.cursor) {
                if (ar[i].prop.overlap == true) {
                  if (ar[i].name == "star") {
                    stars = this.physics.add.sprite(
                      ar[i].x - 150,
                      ar[i].y + 150,
                      ar[i].name
                    );
                    this.physics.add.collider(stars, platforms);
                  } else if (ar[i].name == "bomb") {
                    bombs = this.physics.add.sprite(
                      ar[i].x - 150,
                      ar[i].y + 150,
                      ar[i].name
                    );
                    if (ar[i].prop.sound == true) {
                      bomb_sound = true;
                    } else bomb_sound = false;
                    this.physics.add.collider(bombs, platforms);
                  } else if (ar[i].name == "dude" || ar[i].name == "ninja") {
                    dudes = this.physics.add.sprite(
                      ar[i].x - 150,
                      ar[i].y + 150,
                      ar[i].name
                    );
                    this.physics.add.collider(dudes, platforms);
                  } else {
                    any = this.physics.add.staticGroup();
                    any
                      .create(ar[i].x - 150, ar[i].y + 150, ar[i].name)
                      .setDisplaySize(ar[i].w, ar[i].h)
                      .refreshBody();
                  }
                } else {
                  platforms
                    .create(ar[i].x - 150, ar[i].y + 150, ar[i].name)
                    .setDisplaySize(ar[i].w, ar[i].h)
                    .refreshBody();
                }
              } else {
                if (ar[i].prop.cursor == true) cursor1 = 1;
                if (ar[i].name == "dude") {
                  player = this.physics.add.sprite(
                    ar[i].x - 185,
                    ar[i].y,
                    "dude"
                  );
                  current_position = ar[i].x - 185;
                  seq1 = ar[i].prop.seq;
                  if (ar[i].prop.shoot == true) shoot = 1;
                } else {
                  player = this.physics.add.sprite(
                    ar[i].x - 185,
                    ar[i].y,
                    "ninja"
                  );
                  current_position = ar[i].x - 185;
                  seq1 = ar[i].prop.seq;
                  if (ar[i].prop.shoot == true) shoot = 1;
                }
                player.setDisplaySize(ar[i].w, ar[i].h);
                this.physics.add.collider(player, platforms);
              }
            }
            for (var i = 0; i < ar.length; i++) {
              if (ar[i].name == "star") {
                this.physics.add.overlap(
                  player,
                  stars,
                  this.collectStar,
                  null,
                  this
                );
              }
              if (ar[i].name == "bomb") {
                this.physics.add.overlap(
                  player,
                  bombs,
                  this.bombexplosion,
                  null,
                  this
                );
              } else {
                this.physics.add.overlap(player, any, null, null, this);
              }
            }
            this.cursors = this.input.keyboard.createCursorKeys();

            //for animation of the image frames
            this.cameras.main.startFollow(player, true, 0.05, 0.05);

            this.anims.create({
              key: "left", //left needs to be true to execute this
              frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3
              }),
              frameRate: 10,
              repeat: -1
            });

            this.anims.create({
              key: "turn",
              frames: [{ key: "dude", frame: 4 }],
              frameRate: 20
            });

            this.anims.create({
              key: "right",
              frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8
              }),
              frameRate: 10,
              repeat: -1
            });

            //this.cursors = this.input.keyboard.createCursorKeys();

            this.scoreText = this.add.text(16, 16, "score: 0", {
              fontSize: "32px",
              fill: "#fff"
            });

            // this.physics.add.collider(stars, platforms);

            this.player = player;
          },

          update: function() {
            // var cursors = this.cursors;
            var player = this.player;
            var cursors = this.cursors;
            var bullet;
            if (cursor1 == 0) {
              if (i < seq1.length && first == 1 && flag == 0) {
                if (seq1[i].name == "move") {
                  running.play();
                  player.anims.play("right", true); //animation

                  if (
                    player.x < current_position + parseInt(seq1[i].value) &&
                    down == 1
                  ) {
                    player.setVelocityX(160); //current_position gives the initial position(if move is the first option selected)
                  } else if (down == 1) {
                    player.setVelocityX(0);
                    i++; //to go to next move
                    current_position = player.x; //assigns the position of the move to give to the next move
                    down = 0;
                    player.anims.play("turn");
                  } else if (player.body.touching.down) {
                    down = 1;
                  } else {
                    player.setVelocityX(0);
                  }
                } else if (seq1[i].name == "jump") {
                  jumping.play();
                  player.anims.play("right", true);

                  if (player.y > 568 - parseInt(seq1[i].value) && down == 0) {
                    player.setVelocityY(-150);
                    player.setVelocityX(110);
                  } else if (player.body.touching.down) {
                    player.anims.play("turn");
                    i++;
                    current_position = player.x;
                    player.setVelocityX(0);
                    down = 0;
                  } else {
                    down = 1;
                  }
                }
              } else {
                if (player.body.touching.down) {
                  player.setVelocityX(0);
                  first = 1;
                }
              }
            } else {
              if (cursors.left.isDown) {
                player.setVelocityX(-160);
                running.play();
                player.anims.play("left", true);
              } else if (cursors.right.isDown) {
                player.setVelocityX(160);

                player.anims.play("right", true);
              } else {
                player.setVelocityX(0);

                player.anims.play("turn");
              }

              if (cursors.up.isDown && player.body.touching.down) {
                player.setVelocityY(-330);
              }
            }
            if (cursors.shift.isDown && shoot == 1) {
              bullet = this.physics.add.sprite(player.x, player.y, "bomb");
              if (cursors.left.isDown) bullet.setVelocityX(-5000);
              else bullet.setVelocityX(5000);
              bullet.setVelocityY(0);
              this.physics.add.collider(bullet, this.platforms);
              this.physics.add.overlap(
                bullet,
                dudes,
                this.enemykill,
                null,
                this
              );
            }
          },
          collectStar: function(player, star) {
            star.disableBody(true, true);

            this.score += 10;
            this.scoreText.setText("Score: " + this.score);
          },
          enemykill: function(bullet, dudes) {
            dudes.disableBody(true, true);
          },
          bombexplosion: function(player, bomb) {
            player.disableBody(true, true);
            if (bomb_sound == true) {
              flag = 1;
              explosion.play();
              this.cameras.main.shake(500);
            }

            this.scoreText1 = this.add.text(250, 300, "Game Over", {
              fontSize: "60px",
              fill: "#fff"
            });
          }
        })
      }
    };
  }

  render() {
    return new Phaser.Game(this.state.config);
  }
}
//no dispatch because nothing is being sent from this file to reducer
function mapStateToProps(state) {
  return {
    obj: state.objectselect
  };
}
export default connect(
  mapStateToProps,
  null
)(Player);
