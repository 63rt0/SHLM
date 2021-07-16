class Ceferina extends Jugador {

    constructor(x, y) {
        super(imagenes.ceferina, x, y)
        this.estado = estados.moviendo;



        // Disparo
        this.armado = false;
        this.balas = 0;
        this.cadenciaDisparo = 5;
        this.tiempoDisparo = 0;

        //Atributos
        this.vidas=3;
        this.velocidad=2;

        // Animaciones
        this.quieto = new Animacion(imagenes.ceferina, this.ancho, this.alto, 0,1);
        this.caminando = new Animacion(imagenes.ceferina_caminando,
            16, 24, 4, 8);
        this.golpeando = new Animacion(imagenes.ceferina_golpeando, 32, 32, 4 , 4,this.finAnimacionGolpear.bind(this));
        this.quietoP=new Animacion(imagenes.ceferina_pistola,38,15,0,1);
        this.caminandoP=new Animacion(imagenes.ceferina_pistola_caminando,38,15,4,8);

        this.animacion=this.quieto;


    }

}