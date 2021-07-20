class Escopeta extends Arma{


    constructor(nMunicion) {
        super(nMunicion);


        this.cadencia = 10;
        this.enfriamiento = 0;

    }


    dispararEnemigo(x, y, grados){
        this.enfriamiento = this.cadencia;
        this.nMunicion = this.nMunicion-1;

        var disparos = [];

        disparos.push(new DisparoEnemigo(x, y, grados));
        disparos.push(new DisparoEnemigo(x, y, grados+5));
        disparos.push(new DisparoEnemigo(x, y, grados-5));


        this.agregarDisparos(disparos);
    }


    dispararJugador(x, y, grados){
        this.enfriamiento = this.cadencia;
        this.nMunicion = this.nMunicion-1;

        var disparos = [];

        disparos.push(new DisparoJugador(x, y, grados));
        disparos.push(new DisparoJugador(x, y, grados+5));
        disparos.push(new DisparoJugador(x, y, grados-5));

        this.agregarDisparos(disparos);
    }






    getLanzarArma(x,y,grados) {
        return new DisparoArma(x,y,grados,imagenes.escopeta_lanzada)
    }





}