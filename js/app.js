var app=angular.module("cubo",[]);


app.controller("campoOperaciones",function($scope,servicio){    
    
    $scope.obtenerCasos = function(){
        try
        {
            var cubos = 0,maximocubos=100, operaciones = 1,maximoOperaciones=1000;
            var numeroCasos;
            var tamanoCubo = new Array();
            var numeroOperaciones = new Array();
            var cuboInicializado;
            var operacionesPorCubo = new Array(new Array(),new Array());

            //almacena los resultados de cada cubo
            var resultados = new Array();            
            $scope.resutaldos="";
            numeroCasos = servicio.obtenerCasos($scope.casosPrueba);
            tamanoCubo = servicio.tamanoCubosOcantidadOperaciones(cubos,maximocubos);
            numeroOperaciones = servicio.tamanoCubosOcantidadOperaciones(operaciones,maximoOperaciones);
            operacionesPorCubo = servicio.obtenerOperacionesPorCubo(numeroOperaciones);

            // inicializar cubos y realiza operaciones sobre ellos
            for(var i=0; i<numeroCasos;i++)
            {
                cuboInicializado = servicio.inicializarCubo(tamanoCubo[i]);
                resultados[i] = servicio.realizarOperaciones(cuboInicializado,operacionesPorCubo[i],tamanoCubo[i]);            
            }
            $scope.resutaldos = resultados;            
        }
        catch(err)
        {
            alert("Verifique las condiciones del texto ingresado");
        }
    }
    
});