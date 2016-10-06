app.service('servicio', function(){
    var vm = this;    
     vm.obtenerCasos = function (texto){
         // esta funcion obtiene cuantos cubos deben ser inicializados
        try
        {
            if(texto.match(/\n/g))
            {                
                // entra cuando tiene saltos de linea
                //contiene toda la cadena de texto separada en un array por pocisiones
                 vm.textoSeparado = texto.split(/\n/g);
                var limite = vm.textoSeparado.length;
                for(i=0;i<limite;i++)
                {
                    if(texto[i]=="")
                    {
                        texto.splice(i,1);
                    }
                }
                var numeroCasos = parseInt(vm.textoSeparado[0]);
                if(!isNaN(numeroCasos))
                {
                    if(numeroCasos>=1 && numeroCasos<=50)
                    {                        
                        return numeroCasos;
                    }
                    else
                    {
                        throw "El número de casos no es válido";
                        return 0;
                    }
                }
            }
            else
            {
                // no hay saltos de linea
                alert("La texto ingresada no es válida");            
                console.log($scope.casosPrueba.split(/\n/g).length);
            }
        }
        catch(e)
        {
            alert("Algo paso!! "+e);
        }         
     }
     vm.tamanoCubosOcantidadOperaciones = function (buscado,maximo){
         // esta funcion obtiene el tamaño de los cubos o la cantidad de transacciones que se realizaran en el cubo según el parametro enviado
         var i=1;
         var j=0;
         var aux;
         var tamanoCuboOcantidadOperaciones = new Array();
         for(i=1;i<vm.textoSeparado.length;i++)
         {
             if(vm.textoSeparado[i].indexOf("UPDATE") == -1)
             {
                 if(vm.textoSeparado[i].indexOf("QUERY") == -1)
                 {
                     //tiene que ser menor a 100 el tamaño del cubo
                     aux=vm.textoSeparado[i].split(" ");
                     if(aux[buscado]<maximo)
                     {
                         tamanoCuboOcantidadOperaciones[j] = aux[buscado];
                         j++;                         
                     }
                     else
                     {
                         alert("El tamano del cubo no es válido o la cantidad de operaciones no son válidas");
                         return 0;
                     }
                 }
             }
         }         
         return tamanoCuboOcantidadOperaciones;         
     }
     vm.inicializarCubo = function (tamano){
        var i,j,k;
        var matriz = new Array();         
        
        for(i=0;i<=tamano;i++)
        {
            matriz[i] = new Array();
            for(j=0;j<=tamano;j++)
            {
                matriz[i].push(new Array());
            }
        }         
        for(i=0;i<=tamano;i++)
        {
            for(j=0;j<=tamano;j++)
            {
                for(k=0;k<=tamano;k++)
                {
                    matriz[i][j][k]=0;
                }
            }
        }
         return matriz;
     }
     vm.obtenerOperacionesPorCubo = function (posicionesIniciales){
         //la funcion divide las operaciones que deben ir en cada cubo
         var todasLasOperaciones = new Array(new Array(),new Array()); 
         var j=0;
         var k=0;
         var i=0;
         
         for(i=1;i<vm.textoSeparado.length;i++)
         {
             if(vm.textoSeparado[i].indexOf("UPDATE") == 0 || vm.textoSeparado[i].indexOf("QUERY") == 0)
             {
                 if(j<posicionesIniciales[k] && k<posicionesIniciales.length)
                 {                     
                     todasLasOperaciones[k][j] =vm.textoSeparado[i];
                     j++;
                 }
                 else
                 {                    
                    j=0;
                    k++;
                    todasLasOperaciones[k][j] =vm.textoSeparado[i];
                    j++;
                 }
             }
         }
         return todasLasOperaciones;
     }
     vm.realizarOperaciones = function (cubo,operaciones,tamano){
         var i=0,j=0;
         var x,y,z;
         var coordenadas;
         var resultados = new Array();
         for(i=0;i<operaciones.length;i++)
         {
            resultados[i]=0;
         }
         tamano = parseInt(tamano);
         for(i=0;i<operaciones.length;i++)
         {
             if(operaciones[i].indexOf("UPDATE") == 0)
             {
                 //UPDATE x y z W
                 //1 <= x,y,z <= N 
                 coordenadas = operaciones[i].split(" ");
                 if(coordenadas[1]<tamano+1 && coordenadas[2]<tamano+1 && coordenadas[3]<tamano+1)
                 {
                     cubo[coordenadas[1]][coordenadas[2]][coordenadas[3]] = coordenadas[4];                  
                 }
                 else
                 {
                    alert("Coordenadas no válidas");
                 }
                 resultados[i] =0;
             }
             else if(operaciones[i].indexOf("QUERY") == 0)
             {
                 //QUERY x1 y1 z1 x2 y2 z2
                 //QUERY 1 1 1 3 3 3
/*               1 <= x1 <= x2 <= N 
                 1 <= y1 <= y2 <= N 
                 1 <= z1 <= z2 <= N */
                 coordenadas = operaciones[i].split(" ");
                 
                 //validacion de restricciones
                 if(coordenadas[1]<=coordenadas[4] && coordenadas[2]<=coordenadas[5] && coordenadas[3]<=coordenadas[6])
                 {
                     for(x=coordenadas[1];x<=coordenadas[4];x++)
                     {
                         for(y=coordenadas[2];y<=coordenadas[5];y++)
                         {
                             for(z=coordenadas[3];z<=coordenadas[6];z++)
                             {
                                 resultados[j] =resultados[j]+parseInt(cubo[x][y][z]);
                             }                             
                         }
                     }
                     j++;
                 }
                 else
                 {
                     alert("Operacion query mal definida");
                 }
                 
             }
             else
             {
                 alert("Operaciones no válidas");
             }
         }
         for(j=resultados.length-1;j>=0;j--)
         {
             if(resultados[j]==0)
             {
                 resultados.splice(j,1);
             }
             else
             {
                 break;
             }
         }
         return resultados;
     }
});