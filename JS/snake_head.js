import { Snake_part } from "./snake_part.js";

export class Snake_head extends Snake_part
{
    TICK_DELAY = 500; // Time between ticks (milliseconds)
    MOVE = 32; // Distance traveled every move tick

    next_move; // Where we’re going next tick
    keyboard; // Keyboard input
    tick_timer;
    total_length; // Length of the snake
    max_length; // Max length of the snake

    constructor(scene, x, y)
    {
        super(scene, x, y, "head")
        this.keyboard = scene.input.keyboard.createCursorKeys();

        // Calculate max possible length
        this.total_length = 1;
        this.max_length = scene.game_frame.width/32 * scene.game_frame.height/32;
        this.scene.update_score(this.total_length - 1, this.max_length - 1);

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
    }

    grow()
    {
        if (this.next != null)
        {
            this.next.grow();
        }
        else
        {
            this.setTexture("head2");
            this.next = new Snake_part(this.scene, this.x - this.previous_move.x, this.y - this.previous_move.y); 
        }

        this.total_length++;
        this.scene.update_score(this.total_length - 1, this.max_length - 1);
    }

    death()
    {
        this.tick_timer.paused = true;
        this.scene.death_sound.play();
        if (this.next != null)
            this.setTexture("head2_bonk");
        else
            this.setTexture("head_bonk");
    }

    update()
    {
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
                                

        // Check for collisions with the walls
        let next_dest = {x: this.x + this.next_move.x, y: this.y + this.next_move.y};
        let frame = this.scene.game_frame; // I’m just so sick of this.

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
            this.scene.food.destroy();
            this.grow();
            this.scene.score_sound.play();
            if (this.total_length < this.max_length) 
                this.scene.spawn_food();
        }
    }
}