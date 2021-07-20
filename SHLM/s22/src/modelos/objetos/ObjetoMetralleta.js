class ObjetoMetralleta extends Modelo {

    constructor(x, y) {
        super(imagenes.metralleta, x, y);
    }


    getArma() {
        return new Metralleta(6);
    }

}
