
var nextkey =0;
var nextkeyTarefa = 0;
var nomes;
var id_user;
var btn_Logout = document.getElementById('btn-logout');
  // Initialize Firebase
  var config = {
    apiKey: "###########################################",
    authDomain: "###########################################",
    databaseURL: "###########################################",
    projectId: "###########################################",
    storageBucket: "###########################################",
    messagingSenderId: "###########################################"
  };
  firebase.initializeApp(config);

 firebase.auth().onAuthStateChanged(function(user){
//var nome;
    if (user == null) {
     window.location.replace("index.html");
    }


      var userr = firebase.auth().currentUser;
      email = userr.uid;
    
         if (user) {
           
      var star = database.ref().child('usuario').child(email);
      
      star.on("value", function(data) {
            //console.log('=> '+data.val().files);
            //console.log(vend);
           var nome = data.val().nome;
           var emai = data.val().email;
           var funcao = data.val().funcao;
           nomes = nome;

      });
   
    }

  });


  var data = new Date();
  var envio = data.getHours()+":"+data.getMinutes()+":"+data.getSeconds();
 var ur= null;
 var progress = document.getElementById('uploadProgress');
 document.getElementById("txtName").disabled = true; // Habilitar
    document.getElementById("txtEmail").disabled = true; // Ha
 var database = firebase.database();
 function previewFile(){
  var storage = firebase.storage();

  var file = document.getElementById("files").files[0];
    console.log(file);
  
  var storageRef = firebase.storage().ref();
  
  //dynamically set reference to the file name
  var thisRef = storageRef.child(file.name);

  //put request upload file to firebase storage
  thisRef.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
    document.getElementById("txtName").disabled = false; // Habilitar
    document.getElementById("txtEmail").disabled = false; // Habilitar
});
  
  //get request to get URL for uploaded file
  thisRef.getDownloadURL().then(function(url) {
  console.log(url);

  ur = url;
  })

  var uploadTask = thisRef.put(file);

  uploadTask.on('state_changed', loadUpload);

  function loadUpload(data){
    var percent = (data.bytesTransferred/data.totalBytes) * 100;
    progress.value = percent;
    $("#teste").html(''+percent.toFixed(0)+'%');
  }
  }


 database.ref('Aulas').on('child_added', function(data) {
 add_data_table(data.val().titulo,data.val().files,data.val().descricao,data.key);
 var lastkey = data.key;
 nextkey = parseInt(lastkey)+1;
 });
 database.ref('Aulas').on('child_changed', function(data) {
 update_data_table(data.val().titulo,data.val().files,data.val().descricao,data.key)
 });
 database.ref('Aulas').on('child_removed', function(data) {
 remove_data_table(data.key)
 });
 
 function add_data_table(name,pic,email,key){
  window.open.location = key;
 $("#card-list").append('<div class="card  mb-5" id="'+key+'"><a href="aula.html?aulas='+window.open.location+'" id="btnaulas" data-key="Deu Certo"><figure class="card-img-top"><video  src="'+pic+'"></video></figure></a><div class="card-body"><button id="btnQUESTION" data-key="'+key+'" class="button float-right"><i class="fa fa-plus mr-2"></i>Questionário</button><h5 class="card-title text-truncate">'+name+'</h5><p class="card-text text-truncate">'+email+'</p></div><footer class="card-footer"><a href="#" data-key="'+key+'" class="w-50 p-2 mr-4 btn btn-outline-primary btnEdit">Editar</a><a href="#" class="w-50 p-2 btn btn-outline-danger btnRemove"  data-key="'+key+'">Excluir</a></footer></div>');
 }
 function update_data_table(name,pic,email,key){
 $("#card-list #"+key).html('<div class="card  mb-5" id="'+key+'"><a href="aula.html?aulas='+window.open.location+'" id="btnaulas"  data-key="Deu Certo"><figure class="card-img-top"><video  src="'+pic+'"></video></figure></a><div class="card-body"><button id="btnQUESTION" data-key="'+key+'" class="button float-right"><i class="fa fa-plus mr-2"></i>Questionário</button><h5 class="card-title text-truncate">'+name+'</h5><p class="card-text text-truncate">'+email+'</p></div><footer class="card-footer"><a href="#" data-key="'+key+'" class="w-50 p-2 mr-4 btn btn-outline-primary btnEdit">Editar</a><a href="#" class="w-50 p-2 btn btn-outline-danger btnRemove"  data-key="'+key+'">Excluir</a></footer></div>');
 }
 function remove_data_table(key){
 $("#card-list #"+key).remove();
 }

   function new_data(name,email,pic,key){
   database.ref('Aulas/' + key).set({
   titulo: name,
   data_envio:envio,
   nome:nomes,
   id_user:id_user,
   descricao: email,
   files : ur
   });
   }

     function update_data(name,email,pic,key){
     database.ref('Aulas/' + key).update({
     titulo: name,
     data_envio:envio,
     nome:nomes,
     id_user:id_user,
      descricao: email,
     files : ur
     });
     }

 $( "#btnAdd" ).click(function() {
 $("#txtName").val("");
 $("#txtEmail").val("");
 $("#txtPic").val("");
 $("#txtType").val("N");
 $("#txtKey").val("0");
 $( "#modal" ).addClass( "is-active" );

 });
 $("#btnSave" ).click(function() {
 if($("#txtType").val() == 'N'){
 database.ref('Aulas').once("value").then(function(snapshot) {
 if(snapshot.numChildren()==0){
 nextkey = 1;
 }
  
 new_data($("#txtName").val(),$("#txtEmail").val(),$("#txtPic").val(),nextkey);
 });
 }else{
 update_data($("#txtName").val(),$("#txtEmail").val(),$("#txtPic").val(),$("#txtKey").val());
 }
 $("#btnClose").click();
 });
 $(document).on("click",".btnEdit",function(event){
   document.getElementById("txtName").disabled = false; // Habilitar
    document.getElementById("txtEmail").disabled = false; // Habilitar
 event.preventDefault();

 key = $(this).attr("data-key");

 database.ref('Aulas/'+key).once("value").then(function(snapshot){
 $("#txtName").val(snapshot.val().titulo);
 $("#txtEmail").val(snapshot.val().descricao);
 $(ur).val(snapshot.val().files); 
 $("#txtType").val("E"); 
 $("#txtKey").val(key); 
  console.log("url: "+ur);
 });

 $( "#modal" ).addClass( "is-active" );
 });
 $(document).on("click",".btnRemove",function(event){
 event.preventDefault();
 key = $(this).attr("data-key");
 database.ref('Aulas/' + key).remove();
 })
 
 $( "#btnClose,.btnClose" ).click(function() {
 $( "#modal" ).removeClass( "is-active" );
 });

$(document).on("click", "#btnAdd" , function(event){


    
   

      var userr = firebase.auth().currentUser;
      email = userr.uid;

      var star = database.ref().child('usuario').child(email);

      star.on("value", function(data) {
            //console.log('=> '+data.val().files);
            //console.log(vend);
           var nome = data.val().nome;
           var emai = data.val().email;
           var funcao = data.val().funcao;
           nomes=nome;
           id_user = email
      });
   
   
 console.log(nomes +" - "+id_user);
});
 

  //*****Começo tarefas

  var fornecedor = null;
  var lastkeyTarefa = 0;
$(document).on("click","#btnQUESTION",function(event){
 $( "#modal-tarefa" ).addClass( "is-active" );
 keyTarefa = $(this).attr("data-key");
 fornecedor = keyTarefa;
 console.log('Codigo form: '+keyTarefa);

 var starCountRef = database.ref('Questionario/'+fornecedor);
  starCountRef.on('child_added', function(data) {
 //var lastkeyTarefa = data.key;
 //nextkeyTarefa = parseInt(lastkeyTarefa)+parseInt(1);
 
  // console.log('texto: '+ data.val().teste);
 //console.log(parseInt(data.key) + parseInt(1));

 });
  var starCount= database.ref('Questionario/'+fornecedor);
  starCount.once("value").then(function(snapshot) {
 

 nextkeyTarefa = parseInt(snapshot.numChildren()) + parseInt(1);
console.log(nextkeyTarefa);
});
  $("#txtPergunta").val("");
 $("#txtQuestao1").val("");
 $("#txtQuestao2").val("");
 $("#txtQuestao3").val("");
 $("#txtQuestao4").val("");
 $("#txtResposta").val("");
 $("#txtTypet").val("N");
 $("#txtKeyt").val("0");
 
  
})
  

   function new_tarefa(pergunta,questao1,questao2, questao3,questao4,resposta,key){
   var starCountRef = database.ref('Questionario/'+fornecedor+'/' + key);
   starCountRef.set({
   pergunta: pergunta,
   questao1: questao1,
   questao2: questao2,
   questao3: questao3,
   questao4: questao4,
   resposta: resposta
   });
   }



     function update_tarefa(pergunta,questao1,questao2, questao3, questao4,resposta,keyT){
     database.ref('Questionario/'+fornecedor+'/'+ keyT).update({
     pergunta: pergunta,
     questao1: questao1,
     questao2: questao2,
     questao3: questao3,
     questao4: questao4,
     resposta: resposta
     });
     }
   
 $("#btnQUESTION").click(function() {
 $("#txtPergunta").val("");
 $("#txtQuestao1").val("");
 $("#txtQuestao2").val("");
 $("#txtQuestao3").val("");
 $("#txtQuestao4").val("");
 $("#txtResposta").val("");
 $("#txtTypet").val("N");
 $("#txtKeyt").val("0");
 $("#modal-tarefa").addClass( "is-active" );
 
 });

$("#btnSaveTarefa" ).click(function() {
if($("#txtTypet").val() == 'N'){
 var starCountRef = database.ref('Questionario/'+fornecedor);
 starCountRef.once("value").then(function(snapshot) {
 if(snapshot.numChildren()==0){

 }

 new_tarefa($("#txtPergunta").val(),$("#txtQuestao1").val(),$("#txtQuestao2").val(),$("#txtQuestao3").val(),$("#txtQuestao4").val(),$("#txtResposta").val(),nextkeyTarefa);

 });
 
 }else{
 update_tarefa($("#txtPergunta").val(),$("#txtQuestao1").val(),$("#txtQuestao2").val(),$("#txtQuestao3").val(),$("#txtQuestao4").val(),$("#txtResposta").val(),$("#txtKeyt").val());
 }
 $("#btnCloseTarefa").click();
 });


 $( "#btnCloseTarefa,.btnClose" ).click(function() {
 $( "#modal-tarefa" ).removeClass( "is-active" );
 });


btn_Logout.addEventListener('click', e =>{

        firebase.auth().signOut();
        //alert('Seção encerrada...');
        window.location.replace("index.html");

});


//desabilitar teclas

document.oncontextmenu = document.body.oncontextmenu = function() {return false;}
function tecla(){

if (event.keyCode==123){alert("Tecla desativada");
    event.preventDefault();
}

if (event.keyCode==17){
    event.preventDefault();
}
if (event.keyCode==16){
    event.preventDefault();
}
}

document.onkeydown=tecla;
