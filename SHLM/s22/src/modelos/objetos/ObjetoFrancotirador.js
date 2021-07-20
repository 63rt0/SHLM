class ObjetoFrancotirador extends Modelo {

    constructor(x, y) {
        super(imagenes.francotirador, x, y);
    }


    getArma() {
        return new Francotirador(2);
    }

}
