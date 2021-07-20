class Golpe extends Arma {



    constructor(nMunicion) {
        super(nMunicion);

        this.cadencia = 5;
        this.enfriamiento = 0;
    }


    dispararJugador(x, y, grados){
        this.enfriamiento = this.cadencia;

        var disparo = new DisparoGolpe(x+5, y, grados);

        this.agregarDisparos([disparo]);
    }



}