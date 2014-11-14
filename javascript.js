/* VARIABLES A USAR */
var palabras = new Array("patata","zanahoria","pato","palabra","caballo","estado","hora","penique","cartero","mes","ordenador","guitarra","raton");
var pal;
var comprobar = new Array();
var vidas=7;
var acierto;


/* CREACIÓN DE UNA PARTIDA AL INICIO DE LA PÁGINA */
nuevaPartida();


/* FUNCIONES DEL AHORCADO*/
//Función para generar una nueva partida, con una nueva palabra y las vidas correspondientes
function nuevaPartida(){
    pal=palabras[Math.floor(Math.random()*palabras.length)];
    document.getElementById("perdido").style.visibility = "hidden";
    vidas=7;
}

//Función para rellenar los botones del HTML. Genera el contenido de la tabla.
function rellenaBotones(){
                var letras = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","ñ","o","p","q","r","s","t","u","v","w","x","y","z");
                var contador=0;
                document.write("<table>");
                for (var fila=0; fila<6; fila++)
                {
                    document.write("<tr>");
                    
                    for (var elemento=0; elemento<5; elemento++)
                    {
                        if (letras[contador]===undefined)
                        {
                            document.write('<td></td>');
                        }
                        else
                        {
                        document.write('<td class="letra" id="'+letras[contador]+'"  onclick="pulsaBoton(\''+letras[contador]+'\')">'+letras[contador]+"</td>");
                        contador++;
                        }
                    }
                    document.write("</tr>");
                }
                document.write("</table>");
            }

//Función para rellenar el contenido inicial de la palabra. Genera espacios por cada una de las letras de la palabra.
function rellenaPalabra(){
    for (var x=0;x<pal.length;x++)
    {
        document.write(" _ ");
        comprobar[x]=false;
    }
}

//Función para comprobar que el botón pulsado es correcto
function comprobarPalabra(boton) {
    acierto=false;
    for (var x=0;x<pal.length;x++)
    {
        if (pal.charAt(x) === boton){
            comprobar[x]=true;
            acierto=true;
        }
    }
    if (pal.search(boton)==-1){
        acierto=false;
    }
    else {
        acierto=true;
    }
}

//Función para mostrar la palabra cambiada según se pulsan los botones
function pulsaBoton(boton){
    comprobarPalabra(boton);

    var palabraIntermedia="";
        
    for (var x=0;x<pal.length;x++)
    {
        if (comprobar[x]){
            palabraIntermedia=palabraIntermedia.concat(" "+pal.charAt(x)+" ");
        }
        if (!comprobar[x]) {
            palabraIntermedia=palabraIntermedia.concat(" _ ");
        }
    }
    document.getElementById("palabra").innerHTML = palabraIntermedia;
    
    if (acierto) {
        document.getElementById(boton).style.background = "#00FF00";
    }
    else {
        vidas--;
        document.getElementById(boton).style.background = "#FF0000";
    }
    
    imprimeVidas();
    finDelJuego();
}

//Función para imprimir las vidas actuales
function imprimeVidas(){
    document.getElementById("vidas").innerHTML = vidas;
}

function finDelJuego(){
    if (vidas<=0){
        document.getElementById("perdido").style.visibility = "visible"
        document.getElementById("perdido").innerHTML = '<h1>HAS PERDIDO</h1><button onclick="location.reload(false);">Nueva partida</button>';
    }
    if (document.getElementById("palabra").innerHTML.search("_")==-1){
        document.getElementById("perdido").style.visibility = "visible";
        document.getElementById("perdido").innerHTML = '<h1>HAS GANADO</h1><button onclick="location.reload(false);">Nueva partida</button>';
    }
}
