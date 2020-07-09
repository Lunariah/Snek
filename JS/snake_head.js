import { Snake_part } from "./snake_part.js";

export class Snake_head extends Snake_part
{
    TICK_DELAY = 500; // Time between ticks (milliseconds)
    MOVE = 32; // Distance traveled every move tick                            (Firefox pls implement static)

    next_move; // Where we’re going next tick
    keyboard; // Keyboard input
    tick_timer;
    total_length; // Length of the snake
    max_length; // Max length of the snake
    just_ate; // Used to know when to update the score

    constructor(scene, x, y)
    {
        super(scene, x, y, "head")
        this.keyboard = scene.input.keyboard.createCursorKeys();

        // Calculate max possible length
        this.total_length = 1;
        this.max_length = scene.game_frame.width/32 * scene.game_frame.height/32;
        console.log(this.max_length);

        // Create game tick timer
        this.tick_timer = scene.time.addEvent({
            delay: this.TICK_DELAY,
            callback: this.move_tick,
            loop: true,
            callbackScope: this
        })

        // Set initial direction
        this.next_move = {x:0, y: this.MOVE};
        this.previous_move = {x:0, y: this.MOVE};
        this.setAngle(180);

        this.just_ate = false;
        this.spawn_food();
    }

    grow()
    {
        if (!this.next)
            this.setTexture("head2");
        super.grow();
    }

    death()
    {
        this.tick_timer.paused = true;
        if (!this.next)
            this.setTexture("head_bonk");
        else
            this.setTexture("head2_bonk");
        console.log("Game Over!\nScore: " + (this.total_length-1) + "/"+ (this.max_length-1));

    }

    spawn_food()
    {
        let frame = this.scene.game_frame;
        var new_food = {x:0, y:0};
        do{
            new_food.x = Phaser.Math.RND.between(1, frame.width/32)*32 + frame.x - 16;
            new_food.y = Phaser.Math.RND.between(1, frame.height/32)*32 + frame.y - 16;
        } while (this.check_collisions(new_food.x, new_food.y));
        this.scene.food = this.scene.add.sprite(new_food.x, new_food.y, "food");
        console.log("Spawning food at x:" + new_food.x + " y:" + new_food.y);
    }

    update()
    {
        //this.just_ate = false;

        if(this.keyboard.right.isDown && this.previous_move.x >= 0)
            this.next_move = {x: this.MOVE, y:0};
        else if(this.keyboard.left.isDown && this.previous_move.x <= 0)
            this.next_move = {x: -this.MOVE, y:0};
        else if(this.keyboard.up.isDown && this.previous_move.y <= 0)
            this.next_move = {x:0, y: -this.MOVE};
        else if(this.keyboard.down.isDown && this.previous_move.y >= 0)
            this.next_move = {x:0, y: this.MOVE};
    }

    move_tick()
    {   
        // Change sprite angle
        if (this.next_move.x < 0)
            this.setAngle(270);
        else if (this.next_move.x >0)
            this.setAngle(90);
        else if (this.next_move.y < 0)
            this.setAngle(0);
        else if (this.next_move.y > 0)
            this.setAngle(180);
                                // I could also put this in update()

        // Check for collisions with the walls
        let next_dest = {x: this.x + this.next_move.x, y: this.y + this.next_move.y};
        let frame = this.scene.game_frame; // Yes I’m doing it every update. Because I’m sick of this.

        if (next_dest.x < frame.x || next_dest.x > frame.x + frame.width || next_dest.y < frame.y || next_dest.y > frame.y + frame.height)
        {    
            this.death();
            return;
        }

        // Ask every body part to check for collision with the head
        if (this.next)
            if (this.next.check_collisions(this.x + this.next_move.x, this.y + this.next_move.y))
            {
                this.death();
                return;
            }

        // Move
        this.move(this.next_move);

        // Check for collision with the food
        if (this.x == this.scene.food.x && this.y == this.scene.food.y)
        {
            this.grow();
            this.total_length++;
            this.just_ate = true;

            if (this.total_length == this.max_length)
            {
                alert("Yay we won");
            }
            else
            {
                this.scene.food.destroy();
                this.spawn_food();
            }
        }
    }
}