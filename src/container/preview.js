import React from "react";
import Phaser from "phaser";
import { connect } from "react-redux";
//main functions preload->to load all images
//create() to create all sort of objects
//update() which is called in a loop in milliseconds
//config to define properties  about the canvas
class Player extends React.Component {
  constructor(props) {
    var obj = JSON.parse(localStorage.getItem("obj")); //to get player properties from local storage

    var path, posx, posy, posw, posh;
    super(props);
    if (obj.name == "dude") path = "../../dude.png"; //path  variable has a path for player chosen by user
    if (obj.name == "ninja") path = "../../ninja.jpg";
    var down = 0; //flag for move condition in update
    var first = 0;
    var flag = 0;
    // first variable for the fist move selected ,its value is one when player touches the ground for the first time
    posx = obj.x; //for player  position x value from user
    posy = obj.y;
    posw = obj.w; //player->size width value
    posh = obj.h;
    var seq1 = obj.prop.seq; //sequence of moves in a array
    var current_position = posx - 185; //used in move in update func

    var i = 0;
    this.state = {
      config: {
        type: Phaser.AUTO,
        width: 400,
        height: 400,
        scale: {
          mode: Phaser.Scale.FIT,
          parent: "div",
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
          },
          preload: function() {
            this.load.image("ground", "../../platform.png");

            this.load.spritesheet("dude", path, {
              frameWidth: 32,
              frameHeight: 48
            });
          },

          create: function() {
            console.log();
            this.cameras.main.setBounds(0, 0, 1090 * 2, 1000);
            // this.cameras.main.width = 450;
            // this.cameras.main.height = 600;
            var player = this.physics.add.sprite(posx - 185, posy, "dude");
            player.setDisplaySize(posw, posh);
            var platforms = this.physics.add.staticGroup();
            platforms
              .create(300, 500, "ground")
              .setDisplaySize(3000, 30)
              .refreshBody();

            // player.setCollideWorldBounds(true);for player collision with the world walls

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

            this.physics.add.collider(player, platforms);
            // this.physics.add.collider(stars, platforms);

            this.player = player;
          },

          update: function() {
            // var cursors = this.cursors;
            var player = this.player;

            if (i < seq1.length && first == 1 && flag == 0) {
              if (seq1[i].name == "move") {
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
    obj: state.objectselect,
    camera_pos: state.camera_pos
  };
}
export default connect(
  mapStateToProps,
  null
)(Player);
