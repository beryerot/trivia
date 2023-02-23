const jsonUrl = './catalog_extendido.json'; // ruta local del archivo JSON

let puntaje = 0;
let cantRespuestas = 0;

function cargarLibros(){
fetch(jsonUrl) // hace una petición GET al archivo JSON
  .then(response => response.json()) // parsear la respuesta a formato JSON
  .then(data => {
    const libros = data.filter(filtro => filtro.formato == "Físico"); // guardar los datos en una variable
    let aleatorio = Math.floor(Math.random() *    libros.length)
    let libro = libros[aleatorio]
    let sello = libro.zzsellotxt
    let listadoAlternativas = libros.filter(filtroSello => filtroSello.zzsellotxt == sello)
    console.log(listadoAlternativas)
    let aleatorioSello = Math.floor(Math.random() *    listadoAlternativas.length);
    let aleatorioSello2
    do {
        aleatorioSello2 = Math.floor(Math.random() *    listadoAlternativas.length);
      } while (aleatorioSello2 === aleatorioSello);
    let libro2 = listadoAlternativas[aleatorioSello].titulo
    let libro3 = listadoAlternativas[aleatorioSello2].titulo
    let autor = libro.autor
    let autor2 = listadoAlternativas[aleatorioSello].autor
    let autor3 = listadoAlternativas[aleatorioSello2].autor
    let arrayAutores = [autor, autor2, autor3]
    let arrayAutoresAlfa = arrayAutores.sort()  
    let arrayRespuestas = [libro.titulo, libro2, libro3]
    console.log(arrayAutoresAlfa);
    let arrayRespuestasAlfa = arrayRespuestas.sort()
    console.log("------------");
    console.log(arrayRespuestasAlfa);
    $("#pelicula1").append('<div id="op1" class="col-auto"><img src="' + libro.portada + '" class="card-img-top" style="filter: blur(9px); padding: 5px"></div>');
    
    for (const [index, respuestas] of arrayRespuestasAlfa.entries()) {
        $("#respuestas").append("<button id='boton" + (index) + "' class='btn btn-secondary m-3' value='" + (respuestas) + "'>"+ (respuestas) +"</button>");
    }

/*     for (const [idx, respuestasAutores] of arrayAutoresAlfa.entries()) {
        $("#respuestasAutores").append("<button id='botonAutor" + (idx) + "' class='btn btn-secondary m-3' value='" + (respuestasAutores) + "'>"+ (respuestasAutores) +"</button>");
    } */

    $("#boton0").on("click", respuesta1)
    $("#boton1").on("click", respuesta2)
    $("#boton2").on("click", respuesta3)

/*     $("#botonAutor0").on("click", respuestaAutor1)
    $("#botonAutor1").on("click", respuestaAutor2)
    $("#botonAutor2").on("click", respuestaAutor3)
 */
    function respuesta1(){
        let respuestaFinal = $('#boton0').val();
        if(respuestaFinal == libro.titulo){
            correcto()
        }else {incorrecto()}}
    function respuesta2(){
        let respuestaFinal = $('#boton1').val();
        if(respuestaFinal == libro.titulo){
            correcto()
        }else {incorrecto()}}
    function respuesta3(){
        let respuestaFinal = $('#boton2').val();
        if(respuestaFinal == libro.titulo){
            correcto()
        }else {incorrecto()}}

        function respuestaAutor1(){
            let respuestaFinalAutor = $('#botonAutor0').val();
            if(respuestaFinalAutor == autor){
                correcto()
            }else {incorrecto()}}
        function respuestaAutor2(){
            let respuestaFinalAutor = $('#botonAutor1').val();
            if(respuestaFinalAutor == autor){
                correcto()
            }else {incorrecto()}}
        function respuestaAutor3(){
            let respuestaFinalAutor = $('#botonAutor2').val();
            if(respuestaFinalAutor == autor){
                correcto()
            }else {incorrecto()}}
    }

    

        
)
  .catch(error => console.error(error)); // manejar cualquier error
}
  cargarLibros()

  function correcto(){
        $(".pantalla").append("<div class='correcto alignt-items-center' style='display: none; position: absolute; top:0; padding: 10px'><p class='textoCorrecto'>¡Correcto!<br>+10 puntos</p></div>");
        $(".correcto").fadeIn(300)
                      .delay(600)                
                      .fadeOut(100);
        $("#cajaPista #ayudas").remove()
        $("#cajaPista #pista").remove()
        setTimeout(function (){ 
        $(".correcto").fadeOut();
        puntaje = puntaje + 10;
        cantRespuestas = cantRespuestas + 1;
        borrarLibros();
        cargarLibros()
        console.log(puntaje)
    }, 700)
  }

  function borrarLibros(){
    $("#pelicula1 #op1").remove()
    $("#respuestas #boton0").remove()
    $("#respuestas #boton1").remove()
    $("#respuestas #boton2").remove()
    $("#respuestasAutores #botonAutor0").remove()
    $("#respuestasAutores #botonAutor1").remove()
    $("#respuestasAutores #botonAutor2").remove()
}

function incorrecto(){
    $(".pantalla").append("<div class='incorrecto alignt-items-center' style='display: none; position: absolute; top:0; padding: 10px'><p class='textoIncorrecto'>¡Incorrecto!</p></div>");
    $(".incorrecto").fadeIn(300)
                    .delay(600)                
                    .fadeOut(100);
    setTimeout(function (){ 
    $(".incorrecto").fadeOut();
    borrarLibros();
    finaldeJuego();
}, 700);
}

function finaldeJuego(){
    $("#header").fadeOut();
    $("#principal").append("<div class='gameOver'><div class='bg-danger mb-2 rounded w-100 p-3 mb-3 mt-3'><h2>Juego terminado</h2></div><div class='bg-secondary rounded w-100 p-3 text-white'><h5> Tu puntuación final es " + puntaje + " puntos. </h5></div><button value='action' onclick='window.location.reload()' class='btn btn-dark m-5' style='width: 40%'>JUGAR DE NUEVO</button></div>");
    $(".gameOver").fadeIn(3000)
}