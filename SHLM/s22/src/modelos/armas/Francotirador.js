class Francotirador extends Arma {



    constructor(nMunicion) {
        super(nMunicion);


        this.cadencia = 16;
        this.enfriamiento = 0;
    }

    dispararEnemigo(x, y, grados){
        this.enfriamiento = this.cadencia;

        var disparo = new DisparoEnemigo(x, y, grados);
        disparo.v = 25;

        this.agregarDisparos([disparo]);
    }


    dispararJugador(x, y, grados){
        this.enfriamiento = this.cadencia;
        this.nMunicion = this.nMunicion-1;

        var disparo = new DisparoJugador(x, y, grados);
        disparo.v = 25;

        this.agregarDisparos([disparo]);
    }

    getLanzarArma(x,y,grados) {
        return new DisparoArma(x,y,grados,imagenes.francotirador_lanzada)
    }




}