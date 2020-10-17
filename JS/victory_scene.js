export class Victory_scene extends Phaser.Scene
{
    constructor()
    {
        super({key: "Victory"});
    }

    preload()
    {
        this.load.image("victory", "./Assets/Background/victory.png");
    }

    create()
    {
        this.add.sprite(288, 208, "victory");

        this.reset = this.add.sprite(288, 297, "reset")
        .setInteractive()
        .on("pointerdown", function(){this.scene.start("Menu")}, this);
    }
}

