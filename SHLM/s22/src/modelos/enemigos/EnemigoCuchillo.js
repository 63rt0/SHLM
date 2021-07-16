class EnemigoCuchillo extends Enemigo {

    constructor(x, y, grados) {
        super(imagenes.enemigo_cuchillo, x, y)



        this.vx = 0;
        this.vy = 0;
        this.velocidad = 8;

        this.cadenciaDisparo = 24;
        this.tiempoDisparo = 0;


        this.quieto = new Animacion(imagenes.enemigo_cuchillo, this.ancho, this.alto, 0,1);
        this.caminando = new Animacion(imagenes.enemigo_caminando_cuchillo, this.ancho, this.alto, 6, 8);
        this.atacando = new Animacion(imagenes.enemigo_atacando_cuchillo, this.ancho, this.alto, 6, 8);
        this.muriendo = new Animacion(imagenes.enemigo_muriendo_cabeza, 60, 60, 10 ,8,this.finAnimacionMorir.bind(this));
        this.animacion = this.quieto;

        //Rotacion
        this.grados = grados;
        this.radianes = grados/180*Math.PI;

        this.miraX = 1 * Math.cos(this.radianes);
        this.miraY = 1 * Math.sin(this.radianes);

        this.estado = estados.quieto;
        this.rectanguloVision = new RectanguloVision(this.x,this.y,this.grados);



    }



    actualizar (){
        this.animacion.actualizar();

        switch (this.estado) {

            case estados.quieto :
                this.animacion=this.quieto;
                if(this.rectanguloVision.colisiona(gameLayer.jugador)){
                    this.estado=estados.moviendo;
                }
                break;

            case estados.moviendo:
                this.animacion=this.caminando;

                this.miraX=gameLayer.jugador.x;
                this.miraY=gameLayer.jugador.y;
                var cat1 =  this.miraX - this.x;
                var cat2 = this.y - this.miraY;
                var hip = Math.sqrt(cat1*cat1 + cat2*cat2);
                var seno = cat2/hip;
                this.radianes = Math.asin(seno);
                var alfa = this.radianes*180/Math.PI;
                if(cat1<0){
                    this.grados = 180 + alfa;
                    this.radianes = this.grados/180*Math.PI;
                } else {
                    this.grados = 360 - alfa;
                    this.radianes = this.grados/180*Math.PI;
                }
                this.vx = this.velocidad * Math.cos(this.radianes);
                this.vy = this.velocidad * Math.sin(this.radianes);
                break;

            case estados.muriendo:
                this.vx=0;
                this.vy=0;
                this.animacion=this.muriendo;
                break;
        }

        this.vx = this.vx * aceleracion;
        this.vy = this.vy * aceleracion;
    }



    finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
        }
    }




}
