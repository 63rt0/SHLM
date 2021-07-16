class Animacion {

    constructor(imagenSrc, modeloAncho, modeloAlto, velocidadRefresco, framesTotales, callback) {
        // Nuevo para animaciones finitas
        this.callback = callback;


        this.imagen = new Image();
        this.imagen.src = imagenSrc;

        this.modeloAncho = modeloAncho;
        this.modeloAlto = modeloAlto;
        this.velocidadRefresco = velocidadRefresco;
        this.framesTotales = framesTotales;

        this.frameActual = 0;
        this.frameAncho = this.imagen.width / this.framesTotales;
        this.frameAlto = this.imagen.height;

        this.rectanguloDibujo = {};
        this.rectanguloDibujo.x = 0;
        this.rectanguloDibujo.y = 0;
        this.rectanguloDibujo.ancho = this.frameAncho;
        this.rectanguloDibujo.alto = this.frameAlto;

        this.ultimaActualizacion = 0;
    }

    actualizar (){
        this.ultimaActualizacion++;

        if (this.ultimaActualizacion > this.velocidadRefresco) {
            this.ultimaActualizacion = 0;
            // actualizar el frame
            this.frameActual++;
            // Si llega al último frame evuelve al primero
            if (this.frameActual >= this.framesTotales) {
                // reiniciar, es infinita
                if ( this.callback != null){
                    // avisar de que acabo
                    this.frameActual = 0;
                    this.callback();
                } else {
                    // reiniciar, es infinita
                    this.frameActual = 0;
                }

            }
        }
        // actualizar el rectangulo (siguiente frame)
        this.rectanguloDibujo.x = this.frameActual * this.frameAncho;
    }

    dibujar (x, y, grados=0){

        contexto.translate(x,y);
        contexto.rotate(grados*Math.PI/180);
        contexto.translate(-x,-y);

        contexto.drawImage( this.imagen,
            this.rectanguloDibujo.x,
            this.rectanguloDibujo.y,
            this.rectanguloDibujo.ancho,
            this.rectanguloDibujo.alto,
            x - this.modeloAncho/2 ,
            y - this.modeloAlto/2,
            this.modeloAncho,
            this.modeloAlto);

        contexto.translate(x, y);
        contexto.rotate(-grados*Math.PI/180);
        contexto.translate(-x,-y);
    }

}