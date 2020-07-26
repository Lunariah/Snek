import { Snake_head } from "./snake_head.js"

export class Game_scene extends Phaser.Scene
{
    difficulty; // Chosen game difficulty
    game_frame;
    head; // Snake_head
    food; // Current objective
    score; // Text object displaying the score

    constructor(difficulty)
    {
        super({key: "Game"});

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
        

        switch (this.difficulty)
        {
            case 1:
                this.game_frame = {x: 112, y: 112, width: 192, height: 192};  // Width and Height must always be multiples of 32 or spawn_food() will bug
                this.load.image("background", "./Assets/Background/6x6.png");
                this.load.image("score_frame", "./Assets/Background/Score_frame_128x64.png");
                break;
            case 2:
                this.game_frame = {x: 64, y:80, width: 288, height: 256};
                this.load.image("background", "./Assets/Background/9x8.png");
                this.load.image("score_frame", "./Assets/Background/Score_frame_128x64.png");
                break;
            case 3:
                this.game_frame = {x: 32, y:32, width: 352, height: 352};
                this.load.image("background", "./Assets/Background/11x11.png");
                this.load.image("score_frame", "./Assets/Background/Score_frame_160x64.png");
                break;
        }      
    }

    create()
    {        
        // Background
        this.add.sprite(this.game_frame.x + this.game_frame.width/2, this.game_frame.y + this.game_frame.height/2, "background");

        // Score
        if (this.difficulty < 3)
            var font_size = "40px";
        else
            var font_size = "36px";
        
        this.add.sprite(480, 132, "score_frame");
        this.score = this.add.text(480,132, "", { fontFamily: "Arial", fontSize: font_size, fontStyle: "Bold", color:"#2dc122", align: "center" });
        this.score.setOrigin(0.5, 0.5);

        // Start game
        this.head = new Snake_head(this, this.game_frame.x + 160 + 16, this.game_frame.y + 16);
        this.head.spawn_food();
    }

    update()
    {        
        this.head.update();
    }

    update_score(score, max_score)
    {
        this.score.setText(score + "/" + max_score);
    }
}