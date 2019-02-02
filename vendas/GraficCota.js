window.onload = function() {

var dataPoints = [];


function addData(data) {
var nomes = '';
 dt = '';
 var dt = data.porcentagem*100;
 var nomes = data.nome;
		dataPoints.push({
			label: nomes,
			x: data.venda_dia,
			y: dt
			
		});

	
	chart.render();
}
$.getJSON("urlaqui", addData);
$.getJSON("urlaqui", addData);
$.getJSON("urlaqui", addData);
$.getJSON("urlaqui", addData);
$.getJSON("urlaqui", addData);
$.getJSON("urlaqui", addData);
$.getJSON("urlaqui", addData);

var chart = new CanvasJS.Chart("chartContainer1", {
	animationEnabled: true,
	theme: "light2",
	exportEnabled: true,
	animationEnabled: true,
	title: {
		text: "Grafico Cota Fornecedor"
	},
	axisY: {
		title: "Vendas",
		titleFontSize: 24
	},
	data: [{
		type: "pie",
		startAngle: 25,
		toolTipContent: "<b>{label}</b>: {y}%",
		showInLegend: "true",
		legendText: "{label}",
		indexLabelFontSize: 16,
		indexLabel: "{label} - {y}%",
		dataPoints: dataPoints
	}]
});


}

