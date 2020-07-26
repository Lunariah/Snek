import { Game_scene } from "./game_scene.js";

export class Menu_scene extends Phaser.Scene
{
    button; button2; button3;
    
    constructor()
    {
        super({key:"Menu"});

        this.button1 = {minX: 88, minY: 28, maxX: 488, maxY: 128};
        this.button2 = {minX: 88, minY: 158, maxX: 488, maxY: 258};
        this.button3 = {minX: 88, minY: 288, maxX: 488, maxY: 388};
    }

    preload()
    {
        this.load.image("menu", "./Assets/Menu.png");
    }

    create()
    {
        this.add.sprite(288, 208, "menu");

        this.input.on("pointerdown", function(pointer){this.on_click(pointer)}, this);
    }

    on_click(pointer)
    {
        if(pointer.x > this.button1.minX && pointer.x < this.button1.maxX && pointer.y > this.button1.minY && pointer.y < this.button1.maxY)
            this.scene.add("Game", new Game_scene(1));
        
        else if(pointer.x > this.button2.minX && pointer.x < this.button2.maxX && pointer.y > this.button2.minY && pointer.y < this.button2.maxY)
            this.scene.add("Game", new Game_scene(2));

        else if(pointer.x > this.button3.minX && pointer.x < this.button3.maxX && pointer.y > this.button3.minY && pointer.y < this.button3.maxY)
            this.scene.add("Game", new Game_scene(3));
        else
            return;

        this.scene.start("Game");
    }
}