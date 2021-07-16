class RectanguloVision extends Modelo{

    constructor(x, y,grados) {
        super(imagenes.vision,x,y);
        if(grados==0) {
            this.x = x+this.ancho/2;
            this.y = y-this.alto/2;
        } else if(grados == 90) {
            this.y = y+this.alto*3;
            var aux = this.ancho;
            this.ancho = this.alto;
            this.alto = aux;
        } else if(grados == 180) {
            this.x = x-this.ancho/2;
            this.y = y-this.alto/2;
        } else if(grados == 270) {
            this.y = y-this.alto*3;
            var aux = this.ancho;
            this.ancho = this.alto;
            this.alto = aux;
        }



    }


}