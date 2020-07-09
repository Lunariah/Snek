export class Menu_scene extends Phaser.Scene
{
    button; button2; button3;
    
    constructor()
    {
        var config = {
            key: "Menu",
            active: true
        } 
        super(config);

        this.mouse = {x:0, y:0};
    }

    preload()
    {
        this.load.image("impossible", "./Assets/Buttons/Impossible.png");
    }

    create()
    {
        this.button = {};
        this.button2 = {};
        this.button3 = {minX: 40, minY: 50, maxX: 190, maxY: 100};

        this.add.sprite((this.button3.maxX + this.button3.minX)/2, (this.button3.maxY + this.button3.minY)/2, "impossible");

        this.input.on("pointerdown", function(pointer){this.on_click(pointer)}, this);
    }

    on_click(pointer)
    {
        if(pointer.x > this.button3.minX && pointer.x < this.button3.maxX && pointer.y > this.button3.minY && pointer.y < this.button3.maxY)
                this.scene.start("Game");
    }
}