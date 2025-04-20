class Entity {

    /**
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} largura 
     * @param {Number} altura 
     */
    constructor(ctx, x, y, largura, altura) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.altura = altura;
        this.largura = largura;
    }

    draw() { }

    /**
     * @param {Number} deltaTime Tempo que passou entre um frame e outro (Em segundos)
     */
    update(deltaTime) { }

}
