class Game {

    constructor() {
        // Pega o canvas do HTML
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 1000;
        this.canvas.height = 600;

        // Cria o player
        this.player = new Player(this.ctx, 30, 300, 255 / 3, 180 / 3 );

        // Cria o vetor de pipes
        this.pipes = [
            new Pipe(this.ctx, 850, 0, 150 / 1.5, 350, 'assets/topPipe.png'),
            new Pipe(this.ctx, 850, 350, 150 / 1.5, 350, 'assets/lowPipe.png')
        ];

        // Cria as variáveis responsáveis por calcular o tempo que passou entre um frame e outro
        this.previousTime = 0;
        this.deltaTime = 0;
        
        // Cria um degradê de azul pra branco
        this.gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        this.gradient.addColorStop(0, '#00a8ff');
        this.gradient.addColorStop(1, '#ecf0f1');
    }

    update(currentTime) {
        // Calcula o deltaTime (intervalo entre o último frame)
        this.deltaTime = (currentTime - this.previousTime) / 1000;
        this.previousTime = currentTime;
        
        // Limpar o canvas com o gradiente
        this.ctx.fillStyle = this.gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Atualiza e desenha o player
        this.player.update(this.deltaTime);
        this.player.draw();

        // Atualizar e desenhar cada pipe
        for (let i = 0; i < this.pipes.length; i++) {
            this.pipes[i].update(this.deltaTime);
            this.pipes[i].draw();
        }

        // Chamar a função update no próximo frame
        requestAnimationFrame(this.update.bind(this));
    }

    setup() {
        // Iniciar a atualização do jogo
        requestAnimationFrame(this.update.bind(this));

        this.canvas.addEventListener("click", this.onCanvasClick.bind(this));
    }

    onCanvasClick() {
        this.player.jump();
    }

}