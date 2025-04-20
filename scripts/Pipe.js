class Pipe extends Entity {

    /**
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Number} x  
    */
    constructor(ctx, x) {
        super(ctx, x, 0, Pipe.width, 320*1.25);
        this.scored = false;
        this.gap = this.randomRange(150,250)
        this.offset = this.randomRange(-100, 100)
    }

    randomRange(min, max){
        return Math.random() * (max - min) + min;
    }

    reset() {
        // Reiniciar o pipe no lado direito
        this.x = this.ctx.canvas.width+ 250 - Pipe.width;
        this.gap = this.randomRange(150, 250)
        this.offset = this.randomRange(-100, 100)
        this.scored = false;
    }

    /**
     * @param {Number} deltaTime Tempo que passou entre um frame e outro (Em segundos)
     */
    update(deltaTime) {
        this.x -= 200 * deltaTime; // Mover o pipe para a esquerda a 200 pixels por segundo
        if (this.x + this.largura < 0) {
            this.reset();
        }
    }

    draw() {
        this.y = this.ctx.canvas.height/2 + this.gap/2 - this.offset

        Spritesheet.instance.draw(this.ctx, "green.png", this.x, this.y, this.largura,this.altura);

        this.y = this.ctx.canvas.height / 2 - this.gap / 2 -this.offset

        this.ctx.save();
        this.ctx.translate(this.x,this.y);
        this.ctx.scale(1, -1)

        Spritesheet.instance.draw(this.ctx, "green.png", 0, 0, this.largura, this.altura);

        this.ctx.restore();
    }

    //TODO: CHECKCOLISION se o player colidiu com o de cima ou com o de baixo 

}

Pipe.width = 52 * 1.25;
