class Pipe extends Entity {

    /**
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Number} x 
    * @param {Number} y 
    * @param {Number} largura 
    * @param {Number} altura 
    */
    constructor(ctx, x, y, largura, altura, src) {
        super(ctx, x, y, largura, altura, src);
        this.scored = false;
    }

    reset() {
        // Reiniciar o pipe no lado direito
        this.x = 1000;
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
        this.ctx.drawImage(this.imageElement, this.x, this.y, this.largura, this.altura);
    }

}
