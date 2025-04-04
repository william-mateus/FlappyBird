const GameState = {
    Loading: -1,
    MainMenu: 0,
    Playing: 1,
    GameOver: 2
};

class Game {

    constructor() {
        // Pega o canvas do HTML
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.mouseX = 0;
        this.mouseY = 0;

        // Cria a GUI
        this.gui = new GUI(this, this.ctx);

        // Cria o player
        this.player = new Player(this, this.ctx, 150, 300, 255 / 3, 180 / 3 );

        // Espaço fixo entre os canos
        const gap = 200;
        
        // Cria o vetor de pipes
        this.pipes = [
            new Pipe(this.ctx, 850, -95, 150 / 1.5, 350, 'assets/topPipe.png'),
            new Pipe(this.ctx, 850, -95 + 350 + gap, 150 / 1.5, 350, 'assets/lowPipe.png'),

            new Pipe(this.ctx, 850 + 250, 70 - 95, 150 / 1.5, 350, 'assets/topPipe.png'),
            new Pipe(this.ctx, 850 + 250, 70 - 95 + 350 + gap, 150 / 1.5, 350, 'assets/lowPipe.png'),

            new Pipe(this.ctx, 850 + 500, -20 - 95, 150 / 1.5, 350, 'assets/topPipe.png'),
            new Pipe(this.ctx, 850 + 500, -20 - 95 + 350 + gap, 150 / 1.5, 350, 'assets/lowPipe.png'),

            new Pipe(this.ctx, 850 + 800, -100 - 95, 150 / 1.5, 350, 'assets/topPipe.png'),
            new Pipe(this.ctx, 850 + 800, -100 - 95 + 350 + gap, 150 / 1.5, 350, 'assets/lowPipe.png')
        ];

        // Cria as variáveis responsáveis por calcular o tempo que passou entre um frame e outro
        this.previousTime = 0;
        this.deltaTime = 0;

        // Inicializa a pontuação do jogador
        this.score = 0;

        this.currentState = GameState.Loading;

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

        switch (this.currentState) {
            case GameState.Loading:
                this.ctx.fillStyle = "white";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Carregando...", this.canvas.width / 2, this.canvas.height / 2);
                break;

            case GameState.MainMenu:
                break;
            
            case GameState.Playing:
                // Atualiza e desenha o player
                this.player.update(this.deltaTime);
                this.player.draw();

                // Atualizar e desenhar cada pipe
                for (let i = 0; i < this.pipes.length; i++) {
                    this.pipes[i].update(this.deltaTime);
                    this.player.checkCollision(this.pipes[i]); // Verificar colisão para cada pipe
                    this.pipes[i].draw();

                }
                break;

            case GameState.GameOver:
                this.player.draw();

                for (let i = 0; i < this.pipes.length; i++) {
                    this.pipes[i].draw();
                }
                break;
        }

        // Desenha o placar
        this.gui.update(this.deltaTime);
        this.gui.draw();

        // Chamar a função update no próximo frame
        requestAnimationFrame(this.update.bind(this));
    }

    setup() {
        // Carrega os assets
        Spritesheet.instance.load()
            .then(x => {// Then -> Depois de carregado executa o código abaixo
                this.currentState = GameState.Playing;
            });

        // Registra eventos do mouse
        this.canvas.addEventListener("mousemove", this.onCanvasMouseMove.bind(this));
        this.canvas.addEventListener("click", this.onCanvasClick.bind(this));

        // Registra eventos de teclado
        window.addEventListener("keydown", this.onKeydown.bind(this));

        // Iniciar a atualização do jogo
        requestAnimationFrame(this.update.bind(this));
    }

    onCanvasClick() {
        switch (this.currentState) {
            case GameState.MainMenu:
                this.gui.onClick();
                break;
            
            case GameState.Playing:
                this.player.jump();
                break;

            case GameState.GameOver:
                this.gui.onClick();
                break;
        }
    }

    /**
     * @param {MouseEvent} e
     */
    onCanvasMouseMove(e) {
        this.mouseX = e.clientX - this.canvas.offsetLeft;
        this.mouseY = e.clientY - this.canvas.offsetTop;
    }

    onKeydown(tecla) {
        if (tecla.key === ' ') {// Muda pra code
            this.player.jump();
        }
    }
    
}