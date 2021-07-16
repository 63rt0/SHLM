class DisparoJugador extends Disparo {

    constructor(x, y, grados) {
        super(imagenes.bala, x, y);

        this.movimiento = new Animacion(imagenes.bala, this.ancho, this.alto, 0,1);
        this.animacion = this.movimiento;


        this.v = 16;

        this.grados = grados;
        this.radianes = this.grados*Math.PI/180;
        this.vx = this.v * Math.cos(this.radianes) * aceleracion;
        this.vy = this.v * Math.sin(this.radianes) * aceleracion;

    }



    actualizar (){

        this.vx = this.v * Math.cos(this.radianes) * aceleracion;
        this.vy = this.v * Math.sin(this.radianes) * aceleracion;

    }


}
