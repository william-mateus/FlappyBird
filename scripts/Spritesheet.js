class Spritesheet {

    constructor() {
        this.image = null;
        this.pack = null;
    }

    async load() {
        
        this.image = new Image();
        this.image.src = `../assets/texture.png`;
        await this.image.decode();


        const request = await fetch(`../assets/texture.json`);
        this.pack = await request.json();
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
     * @param {number} [largura]
     * @param {number} [altura]
     */
    draw(ctx, imageName, x, y, largura = undefined, altura = undefined) {
        const coordenadas = this.getCoordinates(imageName);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(
            this.image,
            coordenadas.x, coordenadas.y,
            coordenadas.w, coordenadas.h,
            x, y,
            largura ?? coordenadas.w, altura ?? coordenadas.h
        );
    }

}

Spritesheet.instance = new Spritesheet();