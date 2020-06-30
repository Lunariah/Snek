import "./phaser.min.js"
//import { Snake_part } from "./snake_part.js"
import { Snake_head } from "./snake_head.js"

let config = 
{
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    physics: { default: `arcade` },
    scene: { 
            preload: preload,
            create: create,
            update: update }
};

var head;

new Phaser.Game(config);



function preload()
{
    this.load.image("body", "./Assets/Body.png");
    this.load.image("head", "./Assets/Head.png");
}

function create()
{
    head = new Snake_head(this, 240, 240);
}

function update()
{
    head.update();
}