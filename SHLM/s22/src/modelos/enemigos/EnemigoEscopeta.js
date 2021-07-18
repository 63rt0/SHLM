class EnemigoEscopeta extends EnemigoArmado {

    constructor(x, y, grados) {
        super(imagenes.enemigo_escopeta, x, y, grados);


        this.quieto = new Animacion(imagenes.enemigo_escopeta, this.ancho, this.alto, 0,1);
        this.muriendo = new Animacion(imagenes.enemigo_muriendo_cabeza, 60, 60, 10 ,8,this.finAnimacionMorir.bind(this));
        this.animacion = this.quieto;

        this.arma=new Escopeta(100);

        this.rectanguloVision = new RectanguloVision(this.x,this.y,this.grados);


    }


    disparar(){
        if ( this.arma.puedeDispararEnemigo()) {

            this.estado = estados.disparando;


            var disparo = new DisparoEnemigo(this.x, this.y, this.grados);
            var disparo2 = new DisparoEnemigo(this.x, this.y, this.grados+5);
            var disparo3 = new DisparoEnemigo(this.x, this.y, this.grados-5);

            this.arma.disparar([disparo,disparo2,disparo3]);
        }
    }

    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
            var pistola = new ObjetoPistola((this.x+10), (this.y-5));
            gameLayer.armas.push(pistola);
        }
    }




}