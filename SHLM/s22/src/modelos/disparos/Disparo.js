class Disparo extends Modelo {

    constructor(rutaImg, x, y) {
        super(rutaImg, x, y);
    }


    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;
        this.animacion.dibujar(this.x - scrollX, this.y - scrollY,this.grados);
    }

}
