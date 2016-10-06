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
     vm.tamanoCubosOcantidadOperaciones = function (buscado){
         // esta funcion obtiene el tamaño de los cubos
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
                     console.log(vm.textoSeparado[i]);
                     aux=vm.textoSeparado[i].split(" ");
                     if(aux[buscado]<100)
                     {
                         tamanoCuboOcantidadOperaciones[j] = aux[buscado];
                         j++;                         
                     }
                     else
                     {
                         alert("El tamano del cubo no es válido");
                     }
                 }
             }
         }         
         return tamanoCuboOcantidadOperaciones;         
     }
     vm.inicializarCubo = function (tamano){
        var i,j,k;
        var matriz = new Array();
        
        for(i=0;i<tamano;i++)
        {
            matriz[i] = new Array();
            for(j=0;j<tamano;j++)
            {
                matriz[i].push(new Array());
            }
        }         
        for(i=0;i<tamano;i++)
        {
            for(j=0;j<tamano;j++)
            {
                for(k=0;k<tamano;k++)
                {
                    matriz[i][j][k]=0;
                }
            }
        }
         return matriz;
     }
     vm.obtenerOperacionesPorCubo = function (){
         
     }
     vm.realizarOperaciones = function (cubo,operaciones){
         
     }
});