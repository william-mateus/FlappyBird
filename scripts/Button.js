class Button {

    /**
     * @param {Game} game
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Number} x 
     * @param {Number} y 
     * @param {String} text
     * @param {Function} callback
     */
    constructor(game, ctx, x, y, text, callback) {
        this.game = game;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.text = text;
        this.callback = callback;
        this.isHovered = false;

        // Measure text
        const textMetrics = this.ctx.measureText(text);
        this.width = textMetrics.width + 20;
        this.height = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent + 10;
    }

    draw() {
       /* this.ctx.fillStyle = this.isHovered ? "white" : "black";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        
        this.ctx.fillStyle = this.isHovered ? "black" : "white";
        this.ctx.textBaseline = "top";
        this.ctx.textAlign = "start";
        this.ctx.fillText(this.text, this.x + 10, this.y + 5); */
    }

    update(deltaTime) {
        this.isHovered = this.game.mouseX >= this.x && this.game.mouseY >= this.y && this.game.mouseX <= this.x + this.width && this.game.mouseY <= this.y + this.height;
    }

    onClick() {
        if (this.isHovered) {
            this.callback();
        }
    }

}