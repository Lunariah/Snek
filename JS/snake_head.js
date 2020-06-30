import { Snake_part } from "./snake_part.js";

export class Snake_head extends Snake_part
{
    TICK_DELAY = 500; // Time between ticks (milliseconds)
    MOVE = 32; // Distance traveled every move tick                            (Firefox pls implement static)

    next_move; // Where we’re going next tick
    keyboard; // Keyboard input
    tick_timer;

    constructor(scene, x, y)
    {
        super(scene, x, y, "head")
        this.keyboard = scene.input.keyboard.createCursorKeys();
        this.tick_timer = scene.time.addEvent({
            delay: this.TICK_DELAY,
            callback: this.move_tick,
            loop: true,
            callbackScope: this
        })
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
        this.move(this.next_move);

        if (this.x == this.scene.food.x && this.y == this.scene.food.y)
        {
            this.grow();
            // Spawn another piece of food
        }
            

        // Check collisions here ?

        // Check if we’ve eaten something
            // if yes, this.grow();
    }
}