class GUI {

    /**
      * @param {Game} game
      * @param {CanvasRenderingContext2D} ctx 
      */
    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;

        this.button1 = new Button(game, ctx, this.game.canvas.width / 2.0, this.game.canvas.height / 2.0, "Teste 01", () => { console.log("Teste 01 True"); });
        this.button2 = new Button(game, ctx, this.game.canvas.width / 2.0, this.game.canvas.height / 2.0 + 100, "Teste 02", () => { console.log(" Teste 02 True "); });
    }

    draw() {
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Score: ${this.game.score}`, this.game.canvas.width / 2.0, 20);

        this.button1.draw();
        this.button2.draw();
    }

    update(deltaTime) {
        this.button1.update(deltaTime);
        this.button2.update(deltaTime);
    }

    onClick() {
        this.button1.onClick();
        this.button2.onClick();
    }

}