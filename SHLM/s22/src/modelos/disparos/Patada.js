class Patada extends Disparo {

    constructor(x, y, grados) {
        super(imagenes.patada, x, y);

        this.movimiento = new Animacion(imagenes.patada, this.ancho, this.alto, 0,1);
        this.animacion = this.movimiento;


        this.v = 12;

        this.grados = grados;
        this.radianes = this.grados*Math.PI/180;
        this.vx = this.v * Math.cos(this.radianes) * aceleracion;
        this.vy = this.v * Math.sin(this.radianes) * aceleracion;

    }

    actualizar (){

        this.vx = this.vx*0.5;
        this.vy = this.vy*0.5;

    }



}