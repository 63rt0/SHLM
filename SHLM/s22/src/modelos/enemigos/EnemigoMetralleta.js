class EnemigoMetralleta extends EnemigoArmado {

    constructor(x, y, grados) {
        super(imagenes.enemigo_metralleta, x, y, grados);


        this.quieto = new Animacion(imagenes.enemigo_metralleta, this.ancho, this.alto, 0,1);
        this.muriendo = new Animacion(imagenes.enemigo_muriendo_cabeza, 60, 60, 10 ,8,this.finAnimacionMorir.bind(this));
        this.animacion = this.quieto;

        this.arma=new Metralleta(100);

        this.rectanguloVision = new RectanguloVision(this.x,this.y,this.grados);


    }



    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
            var pistola = new ObjetoMetralleta((this.x+10), (this.y-5));
            gameLayer.armas.push(pistola);
        }
    }




}