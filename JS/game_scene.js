import { Snake_part } from "./snake_part.js"
import { Snake_head } from "./snake_head.js"

export class Game_scene extends Phaser.Scene
{
    rand; // Random number generator
    difficulty; // Chosen game difficulty
    head; // Snake_head
    food; // Current objective
    game_frame;

    constructor(difficulty) // I probably can’t use an argument for that
    {
        var config = {
            key: "Game",
            //active: false
        } 
        super(config);

        this.difficulty = difficulty;
    }
    
    preload()
    {
        this.load.image("body", "./Assets/Body.png");
        this.load.image("head", "./Assets/Head.png");
        this.load.image("head2", "./Assets/Head2.png");
        this.load.image("head_bonk", "./Assets/Head_bonk.png");
        this.load.image("head2_bonk", "./Assets/Head2_bonk.png");
        this.load.image("food", "./Assets/Food.png");
        this.load.image("frame", "./Assets/Background/Frame.png");

        switch (this.difficulty)
        {
            case 1:
                
                this.load.image("background", "./Assets/Background/6x6.png");
                break;
            case 2:

                this.load.image("background", "./Assets/Background/9x8.png");
                break;
            case 3:
                this.game_frame = {x: 32, y:32, width: 352, height: 352};
                this.load.image("background", "./Assets/Background/11x11.png");
                break;
        }      
    }

    create()
    {
        this.rand = new Phaser.Math.RandomDataGenerator();
        
        this.add.sprite(this.game.config.width/2, this.game.config.height/2, "frame");
        this.add.sprite(this.game_frame.x + this.game_frame.width/2, this.game_frame.y + this.game_frame.height/2, "background");
        this.head = new Snake_head(this, 144, 144);
        this.food = this.add.sprite(80, 80, "food");
    }

    update()
    {
        /*
        if (this.head.just_ate)
        {
            // change score

            // OR, I could send the score sprite object to Head and have it be updated there
            // but it’s probably uglier 
        }*/
        
        this.head.update();

        /*
        var food = this.food;
        this.input.on("pointermove", function (pointer) { food.setPosition(pointer.x, pointer.y); })
        */
    }
}