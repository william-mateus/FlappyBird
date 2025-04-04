class Spritesheet {

    constructor() {
        this.image = null;
        this.pack = null;
    }

    async load() {
        // TODO: Como fazer pra carregar os dois ao mesmo tempo

        // 1- Carregar a spritesheet
        this.image = new Image();
        this.image.src = `/assets/texture.png`;
        await this.image.decode();

        // 2- Carregar o .json
        const request = await fetch(`/assets/texture.json`);
        this.pack = await request.json();

        // 3- Criar um método pra pegar as coordenadas com base no nome da imagem
        const coordenadas = this.getCoordinates("0.png")
        
        // 4- Desenhar uma sprite com base no nome
    }

    /**
     * @returns {{x: Number, y: Number, w: Number, h: Number}} coordinates 
     */
    getCoordinates(imageName) {
        return this.pack["frames"][imageName]["frame"];
    }

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {string} imageName
     * @param {number} x
     * @param {number} y
     * @param {number} largura
     * @param {number} altura
     */
    draw(ctx, imageName, x, y, largura, altura) {
        const coordenadas = this.getCoordinates(imageName);
        ctx.drawImage(
            this.image,
            coordenadas.x, coordenadas.y,
            coordenadas.w, coordenadas.h,
            x, y,
            largura, altura
        );
    }

}

// TODO: estudar sobre Singleton
Spritesheet.instance = new Spritesheet();