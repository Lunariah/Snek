export class Snake_part extends Phaser.GameObjects.Sprite
{
    previous_move;  // Direction of the last movement
    next;   // Next body part in line

    constructor(scene, x, y, sprite="body")
    {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    move(next_move)
    {
        // Move according to next_move
        this.x += next_move.x;
        this.y += next_move.y;

        if (next_move.x < 0)
            this.setAngle(270);
        else if (next_move.x >0)
            this.setAngle(90);
        else if (next_move.y < 0)
            this.setAngle(0);
        else if (next_move.y > 0)
            this.setAngle(180);

        if (this.next != null)
            this.next.move(this.previous_move);
        this.previous_move = next_move;
    }

    grow()
    {
        if (!this.next)
        {
            // create a new body part based on previous_move
        }
        else { this.next.grow(); }
    }
}