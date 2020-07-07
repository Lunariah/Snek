import "./phaser.min.js"
//import { Snake_part } from "./snake_part.js"
import { Snake_head } from "./snake_head.js"

let config = 
{
    type: Phaser.AUTO,
    width: 9 * 32,
    height: 8 * 32, // At least one side must have an even number of squares for the game to be always winnable
    // Normal:      6x6
    // Hard:        9x8
    // Impossible:  11x11
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
    this.load.image("head2", "./Assets/Head2.png");
    this.load.image("head_bonk", "./Assets/Head_bonk.png");
    this.load.image("head2_bonk", "./Assets/Head2_bonk.png");
    this.load.image("food", "./Assets/Food.png");
    this.load.image("background", "./Assets/Background.png");
}

function create()
{
    this.rand = new Phaser.Math.RandomDataGenerator();
    this.add.sprite(this.game.config.width/2, this.game.config.height/2, "background");
    head = new Snake_head(this, 144, 144);
    this.food = this.add.sprite(16,16, "food");
}

function update()
{
    head.update();

    /*
    var food = this.food;
    this.input.on("pointermove", function (pointer) { food.setPosition(pointer.x, pointer.y); })
    */
}

