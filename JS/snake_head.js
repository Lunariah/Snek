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

    constructor(scene, x, y)
    {
        super(scene, x, y, "head")
        this.keyboard = scene.input.keyboard.createCursorKeys();

        // Calculate max possible length
        this.total_length = 1;
        this.max_length = Math.floor(scene.game.config.width / this.MOVE) * Math.floor(scene.game.config.length / this.MOVE);

        // Create game tick timer
        this.tick_timer = scene.time.addEvent({
            delay: this.TICK_DELAY,
            callback: this.move_tick,
            loop: true,
            callbackScope: this
        })

        // Set initial direction
        this.next_move = {x:0, y: -this.MOVE};
        this.previous_move = {x:0, y: -this.MOVE};
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
                                // I could also put this in update()

        // Check for collisions with the walls
        let next_dest = {x: this.x + this.next_move.x, y: this.y + this.next_move.y};
        if (next_dest.x < 0 || next_dest.x > this.scene.game.config.width || next_dest.y < 0 || next_dest.y > this.scene.game.config.height)
        {    
            this.tick_timer.paused = true;
            return;
        }

        // Ask every body part to check for collision with the head
        if (this.next)
            if (this.next.check_collisions(this.x + this.next_move.x, this.y + this.next_move.y))
            {
                this.tick_timer.paused = true;
                return;
            }

        // Move
        this.move(this.next_move);

        // Check for collision with the food
        if (this.x == this.scene.food.x && this.y == this.scene.food.y)
        {
            this.grow();
            this.total_length++;

            if (this.total_length == this.max_length)
            {
                alert("Yay we won");
            }
            else
            {
                // Spawn another piece of food
                this.scene.food.destroy();
                var new_food = {x:0, y:0};
                do{
                    new_food.x = Math.floor(this.scene.rand.between(0, this.scene.game.config.width - this.MOVE) / this.MOVE) * this.MOVE + this.MOVE/2;
                    new_food.y = Math.floor(this.scene.rand.between(0, this.scene.game.config.height - this.MOVE) / this.MOVE) * this.MOVE + this.MOVE/2;
                } while (this.check_collisions(new_food.x, new_food.y));
                this.scene.food = this.scene.add.sprite(new_food.x, new_food.y, "food");
                console.log("Spawning food at x:" + new_food.x + " y:" + new_food.y);
            }
        }
    }
}