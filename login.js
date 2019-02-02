
(function(){


 

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


    if (user) {

      var userr = firebase.auth().currentUser;
      email = userr.uid;
      
      var star = database.ref().child('usuario').child(email);

      star.on("value", function(data) {
            //console.log('=> '+data.val().files);
            //console.log(vend);
           var nome = data.val().nome;
           var emai = data.val().email;
           var funcao = data.val().funcao;

          
            if (emai == 'alguem@hotmail.com') {
                window.location.replace("vendas/index.html?usuario="+nome);   
            } else if(funcao == 'vendedor'){
              window.location.replace("areavendedor.html?usuario="+nome);  
            } else if(funcao == 'admin'){
              window.location.replace("inicio.html?usuario="+nome);   
            }


      });
     
    }
  });
  var database = firebase.database();

  var txt_email = document.getElementById('txtEmailLogin');
  var txt_senha = document.getElementById('txtSenhaLogin');
  var btn_Login = document.getElementById('btnLogin');
  //var btn_Logout = document.getElementById('btn-logout');
    var nome = null;
    var emai = null;
    var funcao = null;

  

  btn_Login.addEventListener('click', e =>{

    var email = txt_email.value;
    var senha = txt_senha.value;

    var auth = firebase.auth();

    var promisse = auth.signInWithEmailAndPassword(email,senha)
    .then(function(result){
      firebase.auth().onAuthStateChanged(function(user){


    if (user) {

      var userr = firebase.auth().currentUser;
      email = userr.uid;
      
      var star = database.ref().child('usuario').child(email);

      star.on("value", function(data) {
            //console.log('=> '+data.val().files);
            //console.log(vend);
            nome = data.val().nome;
            emai = data.val().email;
            funcao = data.val().funcao;

          
            if (emai == 'kittyeloi@hotmail.com') {
                window.location.replace("vendas/index.html?usuario="+nome);   
            } else if(funcao == 'vendedor'){
              window.location.replace("areavendedor.html?usuario="+nome);  
            } else if(funcao == 'admin'){
              window.location.replace("inicio.html?usuario="+nome);   
            }


      });
     
    }
  });
    })
    .catch(function(error){

      var erroCode = error.code;

      if (erroCode == 'auth/invalid-email') {
        alert('E-mail invalido...');
      }else if (erroCode == 'auth/wrong-password') {
        alert('Senha invalida...');
      }else{
        alert('Erro: Usuario não existe');
      }

    });

  });

    /*btn_Logout.addEventListener('click', e =>{

        firebase.auth().signOut();
        alert('Seção encerrada...');

    });*/
 

$(document).on("click","#btn-login",function(event){
 $( "#modal-login" ).addClass( "is-active" );
  });

 $( "#btn-login" ).click(function() {
 $("#txtSenhaLogin").val("");
 $("#txtEmailLogin").val("");
 $( "#modal-login" ).addClass( "is-active" );
 
 });
 
 $( "#btnClose,.btnClose" ).click(function() {
 $( "#modal-login" ).removeClass( "is-active" );
 });

}()); 


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
