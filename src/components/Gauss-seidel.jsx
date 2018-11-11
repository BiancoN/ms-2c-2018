function gaussSeiden (matrizCoef, matrizIndep, dimI, dimJ, vectorInicial, cotaError, cantDecimales) {
    
    var k = 0;
    var i;
    var j;
    var suma;
    var matrizRes = [vectorInicial];
    var vector;
    for(j = 0; j < dimJ; j++){
        vector[j] = "-";
    }
    var matrizNorma = [vector];
    do{    
        k++;
        suma = 0;
        for(i = 0; i < dimI; i++){    
            for(j = 0; j < dimJ; j++){        
                if(j < i){
                    suma += matrizCoef[i][j] * matrizRes[k][j];
                }
                if( j > i){
                    suma += matrizCoef[i][j] * matrizRes[k - 1][j];
                }
            }
            matrizRes[k][i] = Math.round((( suma + matrizIndep[i] ) / matrizCoef[i][i]) + "e+" + cantDecimales) + "e-" + cantDecimales;
        }
        for(j = 0; j < dimJ; j++){
            matrizNorma[k][j] = Math.abs(matrizRes[k][j] - matrizRes[k - 1][j]);    
        }
    }while(Math.max.apply(null, matrizNorma[k]) < cotaError);
    return {matrizRes, matrizNorma};
}