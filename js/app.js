var app=angular.module("cubo",[]);


app.controller("campoOperaciones",function($scope,servicio){
    var cubos = 0, operaciones = 1;
    var numeroCasos;
    var tamanoCubo = new Array();
    var numeroOperaciones = new Array();
    var cuboInicializado;
    var operacionesPorCubo = new Array();
    
    $scope.obtenerCasos = function(){     
        numeroCasos = servicio.obtenerCasos($scope.casosPrueba);
        tamanoCubo = servicio.tamanoCubosOcantidadOperaciones(cubos);
        numeroOperaciones = servicio.tamanoCubosOcantidadOperaciones(operaciones);
        
        // quede obteniedo las operaciones por cubo
        operacionesPorCubo = servicio.obtenerOperacionesPorCubo(numeroOperaciones);
        
/*        // inicializar cubos y realiza operaciones sobre ellos
        for(var i=0; i<numeroCasos;i++)
        {
            cuboInicializado = servicio.inicializarCubo(tamanoCubo[i]);
            resultados = servicio.realizarOperaciones(cuboInicializado);
        }*/
    }
    //$scope.impNumeroCasos = servicio.imprimirCasos(numeroCasos);
    //$scope.tamanoYoperaciones = servicio.obtenertamanoYoperaciones();
});