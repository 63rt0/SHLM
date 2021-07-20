class Pistola extends Arma {



    constructor(nMunicion) {
        super(nMunicion);

        this.cadencia = 5;
        this.enfriamiento = 0;
    }


    dispararEnemigo(x, y, grados){
        this.enfriamiento = this.cadencia;

        var disparo = new DisparoEnemigo(x, y, grados);

        this.agregarDisparos([disparo]);
    }


    dispararJugador(x, y, grados){
        this.enfriamiento = this.cadencia;
        this.nMunicion = this.nMunicion-1;

        var disparo = new DisparoJugador(x, y, grados);

        this.agregarDisparos([disparo]);
    }


    getLanzarArma(x,y,grados) {
        return new DisparoArma(x,y,grados,imagenes.pistola_lanzada)
    }


}