class Player extends ImageUse {

     /**
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} largura 
     * @param {Number} altura 
     */
    constructor(ctx, x, y, largura, altura) {
        super(ctx, x, y, largura, altura, 'assets/playerPro.png');
        
        // Cria a variavel timer na classe Player
        this.timer = 0;
        this.frameSpritesheet = 0;

        this.velocity = 0;
    }

    jump() {
        const impulsoDoPulo = -400; // Força do impuslo do pulo 400px²
        this.velocity = impulsoDoPulo;
    }

    draw(){
        const quantidadeFrames = 3;
        const larguraFrame = this.imageElement.width / quantidadeFrames;
        const alturaFrame = this.imageElement.height;
        this.ctx.drawImage(
            this.imageElement,
            this.frameSpritesheet * larguraFrame, 0,
            larguraFrame, alturaFrame,
            this.x, this.y,
            this.largura, this.altura
        );
    }

    /**
     * @param {Number} deltaTime Tempo que passou entre um frame e outro (Em segundos)
     */
    update(deltaTime) {
        const intervaloEntreFramesDaSprite = 0.07
        
        if(this.velocity < 0){
            this.timer += deltaTime
        }
        else{
            this.frameSpritesheet = 1
        }
        if (this.timer >= intervaloEntreFramesDaSprite) {
            this.frameSpritesheet++;
            if (this.frameSpritesheet >= 3) {
                this.frameSpritesheet = 0;
            }
            this.timer = 0;
        }

        const gravity = 12;// Aceleração de 12px² por segundo
        this.velocity += gravity;
        this.y += this.velocity * deltaTime;
    }
}
