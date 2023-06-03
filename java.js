let input = document.getElementById('input');
let textarea = document.getElementById('textarea');
let b = document.getElementById('l');
let text = document.getElementById('t')
let lines, archivo, i, resultado;
let consolaTexto = '';
function redirigirConsola() {
  var log = console.log; 
  console.log = function() {
    for (var i = 0; i < arguments.length; i++) {
      consolaTexto += arguments[i] + '\n'; 
    }
    log.apply(console, arguments); 
  }
}

function mostrarConsolaEnTextarea() {
  document.getElementById('t').value = consolaTexto; 
}

redirigirConsola();

document.getElementById('btn').addEventListener('click', function() {
  mostrarConsolaEnTextarea();
});

      b.addEventListener('click', function() {
        location.reload();
      });
//Arreglo con tokens a validar

    const token = ['Q#', 'Q?','Q@','Q~','>>','QNEL','Q>>','%%','Regalado','Reservado','Tapado','Quieto','Acabado','Qmas','Qopc','Q<','Q>','Q#<','Q#>','Q+','<QC-Declaraciones:', '<QC-salida:','<QC-paso:','<QC-paso-porque-paso>', '<QC-paso-Fin>','<QC-Repite:','<QC-Repite-Fin', '<QC-Variar:','<QC-Variar-Fin','<QC-Chispudo>','<QC-Chispudo-Fin','<QC-camioneta','<QC-camioneta-Fin','QUETZAL','CENTAVO','CHOCA','PISTO','LEN','SinPisto','Qpistudo','tieneCasaca','vosPlatica','coperachaMucha','queChilero']

    const regex = /[a-zA-Z]\>/; // ER para validar el final de una cadena
    const regex2 = /^[a-zA-Z][a-zA-Z0-9]*(\"\>)+$/; //validar cadena de texto intermedia
    let generar = [];


input.addEventListener("change", () => {
    let archivos = input.files;
    if(archivos.length == 0) return;

    let archivo = archivos[0];
    let contenido = new FileReader();
    contenido.onload = (e) => {
        archivo = e.target.result;
        
        lines = archivo.split(/\r\n|\n/);
        textarea.value = lines.join("\n");
        console.log(lines);

        
        //ciclo para recorrer arreglo líneas        
        for(var a = 0; a<lines.length;a++){
            var b=a;
            let nuevoArreglo = lines[a].split(" ");     //Cada posicion del arreglo linea se vuelven un arreglo
            console.log("\n-----------------------Validando linea "+(b+1)+"-----------------------")
            console.log("VALIDANDO LINEA___"+(b+1)+": "+lines[a]);

            //recorrer la posicion del nuevo arreglo
            for(var i=0; i<nuevoArreglo.length;i++){
                //ciclo para recorrer y comparar con includes añadir coincidencias
                console.log("\tPosicion "+i+" de linea:  "+nuevoArreglo[i]);
                for(var j=0;j<token.length;j++){
                    //valida que el token se encuentre el la posicion del arreglo
                    let aa = token[j].includes(nuevoArreglo[i]);
                    if (aa==true)
                    console.log('\t\t Sintaxis correcta ✔️: '+token[j]);    
            }
                        let textoValida = regex.test(nuevoArreglo[i]);
                        let textoValida2 = regex2.test(nuevoArreglo[i]);
                        if(textoValida==true){
                            console.log("\t\tSintaxis correcta ✔️ "+nuevoArreglo[i]);
                            token.push(nuevoArreglo[i]);
                         } else if(textoValida2==true){
                            token.push(nuevoArreglo[i]);
                               console.log("\t\tSintaxis correcta ✔️ "+nuevoArreglo[i]);
                            }                      
            var idx = token.indexOf(nuevoArreglo[i]);
            if(idx < 0){
                     console.log("\t_______________________________________________________________");
                     console.log("\t***ERROR EN EJECUCIÓN ELEMENTO NO VALIDO***");
                     let numero= Math.floor(Math.random()*100)+1 ;
                     console.log("\t" +"❌"+nuevoArreglo[i]+" CODIGO  "+numero + " ERROR DE SINTAXIS ");
                     console.log("\t_______________________________________________________________");
                }
                  }           console.table(nuevoArreglo); 
    }
}
    
    contenido.onerror = (e) => alert(e.target.error.name);
    contenido.readAsText(archivo);
});


//analizador sintactico
let input = document.getElementById('input');
let textarea = document.getElementById('ti');
let lines, archivo, i, resultado;
function redirigirConsola() {
  var log = console.log; 
  console.log = function() {
    for (var i = 0; i < arguments.length; i++) {
      consolaTexto += arguments[i] + '\n'; 
    }
    log.apply(console, arguments); 
  }
}

function mostrarConsolaEnTextarea() {
  document.getElementById('ti').value = consolaTexto; 
}

redirigirConsola();

document.getElementById('btnt').addEventListener('click', function() {
  mostrarConsolaEnTextarea();
});


input.addEventListener("change", () => {
    
    let archivos = input.files;
    if(archivos.length == 0) return;

    let archivo = archivos[0];
    let contenido = new FileReader();
    contenido.onload = (e) => {
        archivo = e.target.result;
        
        lines = archivo.split(/\r\n|\n/)
        textarea.value = lines.join("\n"); 

            const entero = /^\<QC-Declaraciones\:\sQuetzal(\s[a-zA-Z]+([0-9]*[a-zA-Z]*)\>)|([\>\>]\s*?\d*\>)$/
            const decimal = /^\<QC-Declaraciones\:\sCentavo(\s[a-zA-Z]+([0-9]*[a-zA-Z]*)\>)|([\>\>]\s*?\d+.\d+\>)$/
            const flotante = /^<QC-Declaraciones\:\sChoca\s[a-zA-z]+\w*(>|>>\d+.\d+>)$/
            const booleano = /^<QC-Declaraciones: Len [a-zA-Z]+\w*(>>(Simon|Casaca>)|>)$/
            const stringg = /^<QC-Declaraciones: Pisto \w* >>\s*"(.*?)">$/
            const salidaN = /^<QC-salida:\s\w*>$/
            const salidaTexto = /^\<QC-salida\:\s+"(.*?)">$/
            const salidav2 = /^<QC-salida:\s*"(.*?)" (Q\+ [a-zA-Z]\w*\s*)*>$/
            const salidav3 = /^<QC-salida:\s*\d+ Q\+ "(.*?)" (Q\+ [a-zA-Z]\w* )"(.*?)" (Q\+ [a-zA-Z]+\w*)>$/
            const ifI = /^<QC-paso: \[[a-zA-Z]\w* (Qmas|Qopc|Q<|Q>|Q#<|Q#>|Q>>|QNEL) (([a-zA-Z]\w*)|(\d+))\]>$/
            const ifF = /^<QC-paso-Fin>$/
            const ifelse = /^<QC-paso-porque-paso>$/
            const ifelseif = /^<QC-paso-porque-paso>\s*<QC-paso: \[\w+ (Qmas|Qopc|Q<|Q>|Q#<|Q#>|Q>>|QNEL) \w+\]>$/
            const ifelseifv2 = /^<QC-paso-porque-paso> <QC-paso: \[[a-zA-Z]\w* (Q<|Q>|Q#<|Q#>|Q>>|QNEL) (\d+|[a-zA-Z]+\w*)\] (Qmas|Qopc) \[[a-zA-Z]+\w* (Q<|Q>|Q#<|Q#>|Q>>|QNEL) (\d+|[a-zA-Z]+\w*)\]>$/
            const ifelseifv3 = /^<QC-paso-porque-paso> <QC-paso: \[[a-zA-Z]\w* (Q<|Q>|Q#<|Q#>|Q>>|QNEL) (\d+|[a-zA-Z]+\w*)\]$/
            const metodo = /^(Regalado|Reservado|Tapado) (Quieto|Acabado) (Quetzal|Centavo|Choca|Pisto|Len) [a-zA-Z]+\w*\(((Quetzal|Centavo|Choca|Pisto|Len) [a-zA-Z]+\w*(, (Choca|Quetzal|Centavo|Len) [a-zA-Z]+\d*)*)\)\{$/
            const asignacion = /^\s*([a-zA-Z]+\w*>>"(.*?)")|(\w+>>\d+)|(([a-zA-Z]\w*>>\w+ (Q#|Q\?|Q\@|Q\-) [a-zA-Z]\w*))|([a-zA-Z]\w*>>[a-zA-Z]\w*)$/
            const whileI = /^<QC-Repite: hastaQ\[[a-zA-Z]+\w* (Q<|Q>|Q#<|Q#>|Q>>|QNEL) (\d+|[a-zA-Z]\W*)\] >$/
            const whileF = /^<QC-Repite-Fin>$/
            const operacionAsignacion = /^[a-zA-Z]\w* >> ([a-zA-Z]\w*|\d+) (Q#|Q\?|Q\@|Q\-) ((\d+\.\d+|\d+)|[a-zA-Z]+)$/
            const forI = /^<QC-Variar: [a-zA-Z]+ desde: [0-9]+ ((fin: \d+ paso: \d+>)|(fin: Q< [a-zA-Z]\w* paso: \d+)>)$/
            const forF = /^<QC-Variar-Fin>$/
            const llave = /^\}$/
            const espacio = /^\s*$/
            const comentario = /^\s*\-(.)*$/

            let msjERROR="";
            let ERRORcont = 0;
            let CIcont = 0;
            let arreglo = "";
            lines.forEach(function(linea){
          
              if (entero.test(linea) || espacio.test(linea) || decimal.test(linea) || flotante.test(linea) || salidaN.test(linea) || salidaTexto.test(linea) ||
                    comentario.test(linea) || stringg.test(linea) || ifI.test(linea) || ifF.test(linea) || ifelse.test(linea) || ifelseif.test(linea) || metodo.test(linea) || 
                    asignacion.test(linea) || booleano.test(linea) || whileI.test(linea) || salidav2.test(linea) || whileF.test(linea) || operacionAsignacion.test(linea) || 
                    forI.test(linea) || salidav3.test(linea) || forF.test(linea) || llave.test(linea) || ifelseifv2.test(linea) || ifelseifv3.test(linea)) {
              console.log("LINEA CORRECTA: \t " +CIcont + " " + linea);
              }else{
                ERRORcont = ERRORcont+1;
                msjERROR = msjERROR + "ERROR: \t " + linea + " Linea: " +CIcont + "\n";
                console.log("Error: " + linea + " Linea: " +CIcont);
              }
              CIcont = CIcont+1;          
              arreglo = arreglo + linea + " ";
          
            });
               document.getElementById("ti").value = "EJECUCION--\n" + msjERROR+"\n"+"Total errores encontrados: " + ERRORcont +"\n--END--";
              console.log("ERRORES: " + ERRORcont);
          }

    contenido.onerror = (e) => alert(e.target.error.name);
    contenido.readAsText(archivo);
});
