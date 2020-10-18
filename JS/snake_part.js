export class Snake_part extends Phaser.GameObjects.Sprite
{
    next;   // Next Snake_part down the line. Used to cascade methods from the head along the body.
    previous_move; 

    constructor(scene, x, y, sprite="body")
    {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    move(move)
    {
        this.x += move.x;
        this.y += move.y;

       if(this.next != null)
           this.next.move(this.previous_move);

       this.previous_move = move;
    }

    grow()
    {
        if (this.next != null)
            this.next.grow();
        else
            this.next = new Snake_part(this.scene, this.x - this.previous_move.x, this.y - this.previous_move.y);  
    }

    check_collisions(x, y)
    {
        if ((this.x == x && this.y == y))
            return true;
        else if (this.next != null)
            return this.next.check_collisions(x, y);
        else
            return false;
    }
}