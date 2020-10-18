import "./Phaser/phaser.min.js"
import { Menu_scene } from "./menu_scene.js"
import { Victory_scene } from"./victory_scene.js"

var menu_scene = new Menu_scene();
var victory_scene = new Victory_scene();
// Game scene is created by menu

let config = 
{
    type: Phaser.AUTO,
    width: 576,
    height: 416,
    backgroundColor: "84e37d",
    physics: { default: `arcade` },
    scene: [menu_scene, victory_scene] 
};

new Phaser.Game(config);