/*

TODO:

Victory screen

*/

import "./Phaser/phaser.min.js"
import { Menu_scene } from "./menu_scene.js"

var menu_scene = new Menu_scene();

let config = 
{
    type: Phaser.AUTO,
    width: 576,
    height: 416,
    backgroundColor: "84e37d",
    physics: { default: `arcade` },
    scene: [menu_scene] 
};

new Phaser.Game(config);