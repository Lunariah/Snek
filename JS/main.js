/*     TODO

In snake_head:

    Determine max_length and an offset variable for wall collisions based on scene.game_frame
    
Print the score in the canvas (but use a just_ate boolean to avoid changing it every frame. Something that’s set to false every head update)

Use the built-in random number generator

*/


import "./phaser.min.js"
//import { Snake_part } from "./snake_part.js"
//import { Snake_head } from "./snake_head.js"
import { Game_scene } from "./game_scene.js"
import { Menu_scene } from "./menu_scene.js"

var menu_scene = new Menu_scene();
var game_scene = new Game_scene(3);

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
    scene: [game_scene] 
};

new Phaser.Game(config);