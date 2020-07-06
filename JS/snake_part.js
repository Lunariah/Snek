export class Snake_part extends Phaser.GameObjects.Sprite
{
    previous_move;  // Direction of the last movement
    next;   // Next body part in line

    constructor(scene, x, y, sprite="body")
    {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //console.log("Growing at x:" + this.x + " y:" + this.y);   DEBUG

    }

    move(next_move)
    {
        // Move according to next_move
        this.x += next_move.x;
        this.y += next_move.y;

        /*
        if (this.next)
        {
            
            this.scene.time.addEvent({
                delay: 200,
                callback: function() {this.next.move(this.previous_move); this.previous_move = next_move;}
                    ,
                callbackScope: this
            });
            
        }
        else   
            this.previous_move = next_move;
        */
       // Yeah that was a bad idea

       if(this.next)
       {
           this.next.move(this.previous_move);
       }
       this.previous_move = next_move;
    }

    grow()
    {
        if (!this.next)
        {
            this.next = new Snake_part(this.scene, this.x - this.previous_move.x, this.y - this.previous_move.y);
        }
        else { this.next.grow(); }
    }

    check_collisions(x, y)  // Why use the physics engine when this is so much lighter
    {
        if ((this.x == x && this.y == y))
        {
            return true;
        }

        if (this.next)
        {
            return this.next.check_collisions(x, y);
        }
        else
            return false;
    }
}