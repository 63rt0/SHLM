class ObjetoEscopeta extends Modelo {

    constructor(x, y) {
        super(imagenes.escopeta, x, y);
    }


    getArma() {
        return new Escopeta(3);
    }

}
