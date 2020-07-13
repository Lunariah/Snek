/*     TODO

Cancel everything I just did because you don’t actually need to show the score in a Snake. The score is the Snake.

Redo the menu

Add sound



*/

// snake: #2dc122
// brown: #bd9853
// light green: #84e37d
// pink: #ffaec9
// tongue: #b70000


import "./phaser.min.js"
import { Menu_scene } from "./menu_scene.js"

var menu_scene = new Menu_scene();

let config = 
{
    type: Phaser.AUTO,
    width: 416, //576
    height: 416,
    backgroundColor: "84e37d",
    physics: { default: `arcade` },
    scene: [menu_scene] 
};

new Phaser.Game(config);