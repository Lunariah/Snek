import "./phaser.min.js"
//import { Snake_part } from "./snake_part.js"
import { Snake_head } from "./snake_head.js"

let config = 
{
    type: Phaser.AUTO,
    width: 6 * 32,
    height: 6 * 32, // At least one side must have an even number of squares for the game to be always winnable
    physics: { default: `arcade` },
    scene: { 
            preload: preload,
            create: create,
            update: update }
};

var head;
var rand;

new Phaser.Game(config);



function preload()
{
    this.load.image("body", "./Assets/Body.png");
    this.load.image("head", "./Assets/Head.png");
    this.load.image("food", "./Assets/Food.png");
}

function create()
{
    this.rand = new Phaser.Math.RandomDataGenerator();
    head = new Snake_head(this, 144, 144);
    this.food = this.add.sprite(16,16, "food");
}

function update()
{
    head.update();
}

