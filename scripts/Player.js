class Player extends Entity {

    /**
      * @param {Game} game
      * @param {CanvasRenderingContext2D} ctx 
      * @param {Number} x 
      * @param {Number} y 
      * @param {Number} largura 
      * @param {Number} altura 
      */
    constructor(game, ctx, x, y) {
        super(ctx, x, y,68,48);
        this.game = game;

        // Cria a variavel timer na classe Player
        this.timer = 0;
        this.frameSpritesheet = 0;
        this.velocity = 0;
    }

    jump() {
        const impulsoDoPulo = -400; // Força do impuslo do pulo 400px²
        this.velocity = impulsoDoPulo;
    }

    draw() {

        // const quantidadeFrames = 3;
        // const larguraFrame = this.imageElement.width / quantidadeFrames;
        // const alturaFrame = this.imageElement.height;
        Spritesheet.instance.draw(this.ctx, `yellow${this.frameSpritesheet}.png`, this.x, this.y, this.largura, this.altura)
        // this.ctx.drawImage(
        //     this.x, this.y,
        //     this.largura, this.altura
        // );
    }

    /**
     * @param {Number} deltaTime Tempo que passou entre um frame e outro (Em segundos)
     */
    update(deltaTime) {
        const intervaloEntreFramesDaSprite = 0.07

        // Não deixa o player bater no chão
        if (this.y + this.altura >= this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.altura;
            // this.game.currentState = GameState.GameOver;
        }

        if (this.velocity < 0) {
            this.timer += deltaTime
        } else {
            this.frameSpritesheet = 1
        }

        if (this.timer >= intervaloEntreFramesDaSprite) {
            this.frameSpritesheet++;
            if (this.frameSpritesheet >= 3) {
                this.frameSpritesheet = 0;
            }
            this.timer = 0;
        }

        const gravity = 16;// Aceleração de 12px² por segundo
        this.velocity += gravity;
        this.y += this.velocity * deltaTime;
    }

    checkCollision(pipe) {

        this.mensagem = document.getElementById('mensagem');
        // Verifica colisão AABB
        if (this.x < pipe.x + pipe.largura &&
            this.x + this.largura > pipe.x &&
            this.y < pipe.y + pipe.altura &&
            this.y + this.altura > pipe.y) {
            // Colisão detectada
            console.log("Colisão detectada!");

            this.game.currentState = GameState.GameOver;
        } else if (this.x > pipe.x + pipe.largura && !pipe.scored) {
            pipe.scored = true;
            this.game.score++;
            console.log(this.game.score);
        }
    }
}
