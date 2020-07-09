/*     TODO
    
Print the score in the canvas (but use a just_ate boolean to avoid changing it every frame. Something that’s set to false every head update)
                                (OR just create a function in the game scene and call it from tick_update)

Use the built-in random number generator

*/


import "./phaser.min.js"
import { Menu_scene } from "./menu_scene.js"

var menu_scene = new Menu_scene();

let config = 
{
    type: Phaser.AUTO,
    width: 416,
    height: 416, // At least one side must have an even number of squares for the game to be always winnable
    // Normal:      6x6
    // Hard:        9x8
    // Impossible:  11x11
    backgroundColor: "2dc122",
    physics: { default: `arcade` },
    scene: [menu_scene] 
};

new Phaser.Game(config);