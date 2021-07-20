class ObjetoPistola extends Modelo {

    constructor(x, y) {
        super(imagenes.pistola, x, y);
    }


    getArma() {
        return new Pistola(3);
    }

}
