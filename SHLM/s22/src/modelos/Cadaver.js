class Cadaver extends Modelo {

    constructor(x, y, grados) {
        super(imagenes.enemigo_muerto, x, y);
        this.animacion = new Animacion(imagenes.enemigo_muerto,this.ancho,this.alto,1,1);
        this.grados=grados;
    }

    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.animacion.dibujar(this.x - scrollX, this.y - scrollY,this.grados);
    }

}
