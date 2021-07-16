window.addEventListener('mousemove', mousemove,false);


function mousemove (event){
    console.log("hola")
    aceleracion = 0.07;
    ratonX=event.clientX- canvas.offsetLeft;
    ratonY=event.clientY- canvas.offsetTop;
    ratonX = ratonX /escaladoMinimo;
    ratonY = ratonY /escaladoMinimo;


}

