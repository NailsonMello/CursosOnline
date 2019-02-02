var tempt = [], hum = [], light = [], motion = [];

var Geral = firebase.database().ref().child("vendas");
Geral.orderByChild("nome").on("child_added", function(snapshot) {

        var nomes = snapshot.val().nome;
        var porcentagem = snapshot.val().porcentagem
        var po = porcentagem*100;
        var porc = parseFloat(po.toFixed(2));
    var temp = [], pp = [];
    temp.push(nomes);
    pp.push(porc);
   
        if (nomes != 'Yuri' && nomes != 'Claudia') {
            for(var i = 0; i < temp.length; i++){
             for(var j = 0; j < pp.length; j++){
            
          console.log(temp[i] + " -- "+ pp[j]);  

   
   
   var c = temp[i];
   var p = pp[j];

 var data = [{
  values: [pp[j]],
  labels: [c],
  type: 'pie'
           }];

Plotly.newPlot('myDiv', data);
} 
}
}

});
