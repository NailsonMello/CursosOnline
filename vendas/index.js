var Registro = firebase.database().ref().child("usuario");
var Registro_lojas = firebase.database().ref().child("RegistroPonto");



	Registro.on("child_added", snap =>{

		var nome = snap.child("nome").val();
		var vendedor = snap.child("funcao").val();
		window.open.location = nome;
		if (vendedor == 'vendedor' && nome != 'Yuri' && nome != 'Claudia') {
		
		$("#lista_users").append("<tr><td id='#id'><a href='pontoUsuario.html?vendedor="+window.open.location+"' class='list-group-item list-group-item-action active flex-column align-items-start'><h4>"
			+nome+"</h4></a></td></tr>");
			
		}
		
});
	var Geral = firebase.database().ref().child("vendas");
	Geral.orderByChild("nome").on("child_added", function(snapshot) {

		var nomes = snapshot.val().nome;
		var meta = snapshot.val().meta;
		var venda_dia = snapshot.val().venda_dia;
		var venda_faltante = snapshot.val().venda_faltante;
		var venda_geral = snapshot.val().venda_geral;
		var porcentagem = snapshot.val().porcentagem

		var vd = venda_dia.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
		var mt = meta.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
		var vg = venda_geral.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
		var vf = venda_faltante.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
		var po = porcentagem*100;
		var porc = parseFloat(po.toFixed(2));

		if (nomes != 'Yuri' && nomes != 'Claudia') {
		$("#v_geral").append("<tr><td>"+nomes+"</td><td>"+mt+"</td><td>"+vd+"</td><td>"+vf+"</td><td>"+vg
			+"</td><td>"+porc+"%</td><tr>");
	}
		
		
});

	var CotaFornecedor = firebase.database().ref().child("CotaFornecedor");
	CotaFornecedor.orderByChild("nome").on("child_added", function(snapshot) {

		var nomes = snapshot.val().nome;
		var meta = snapshot.val().meta;
		var venda_dia = snapshot.val().venda_dia;
		var venda_faltante = snapshot.val().venda_faltante;
		var venda_geral = snapshot.val().venda_geral;
		var porcentagem = snapshot.val().porcentagem
		var forne = snapshot.val().fornecedor;

		var vd = venda_dia.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
		var mt = meta.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
		var vg = venda_geral.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
		var vf = venda_faltante.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
		var po = porcentagem*100;
		var porc = parseFloat(po.toFixed(2));


		if (nomes != 'Yuri' && nomes != 'Claudia') {
		$("#v_forne").append("<tr><td>"+nomes+"</td><td>"+mt+"</td><td>"+vd+"</td><td>"+vf+"</td><td>"+vg
			+"</td><td>"+porc+"%</td><td>"+forne+"</td><tr>");
		}
		
});

    var Campanhas = firebase.database().ref().child("Campanhas");
	Campanhas.orderByChild("fornecedor").on("child_added", function(snapshot) {

		var nomes = snapshot.val().nome;
		var meta = snapshot.val().meta;
		var venda_dia = snapshot.val().venda_dia;
		var venda_faltante = snapshot.val().venda_faltante;
		var venda_geral = snapshot.val().venda_geral;
		var porcentagem = snapshot.val().porcentagem
		var forne = snapshot.val().fornecedor;

		if (forne != 'Vitalin' && nomes != 'Yuri' && nomes != 'Claudia') {
		$("#v_campanha").append("<tr><td>"+nomes+"</td><td>"+venda_dia+"</td><td>"+porcentagem+"</td><td>"+venda_geral+"</td><td>"+forne+"</td><tr>");
		}
		
});


	  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
    });
    return vars;
    }
    var vend= getUrlVars()["vendedor"];
	Registro_lojas.orderByChild("funcionario").equalTo(vend).on("child_added", function(snapshot) {
     
    
      var nome = snapshot.val().nomeLoja;
      var data = snapshot.val().data;
      var hora = snapshot.val().hora;
      var localOriginal = snapshot.val().localOriginal;
      var localEditado = snapshot.val().localEditado;
      var pedido = snapshot.val().pedido;
      var motivo = snapshot.val().motivo;
      var status = snapshot.val().status;
		$("#list_lojas").append("<tr><td>"+nome+"</td><td>"+data+"</td><td>"+hora+"</td><td>"+localOriginal+"</td><td>"+localEditado
					+"</td><td>"+pedido+"</td><td>"+motivo+"</td><td>"+status+"</td></tr>");
			
});

