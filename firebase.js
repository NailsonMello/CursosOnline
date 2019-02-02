var nextkeyTarefa = 0;
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
var database = firebase.database();

firebase.auth().onAuthStateChanged(function(user){


    if (user == null) {
     window.location.replace("index.html");
    }
 });

    
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
    });
    return vars;
    
    }
var vend= getUrlVars()["aulas"];
var tit = document.getElementById("titulo");
var descricao = document.getElementById("descricao");
var star = database.ref().child('Aulas').child(vend);

if (vend != null) {
  star.on("value", function(data) {
      //console.log('=> '+data.val().files);
      //console.log(vend);
      var video = data.val().files;
    
      tit.innerText = data.val().titulo;
       descricao.innerText = data.val().descricao;
        $("#videoview").append("<source src="+video+">");
      
});
    
}


///desabilitar teclas

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

function parseTime(seconds)
{
    seconds = !seconds ? 0 : seconds;

    var hours = Math.floor(seconds / 3600);
    var mins = Math.floor((seconds - (hours * 3600)) / 60);
    var secs = Math.floor(seconds % 60);
    var formated = [];

    if (hours > 0) {
        formated.push(hours < 10 ? "0" + hours : hours);
    }

    formated.push(mins < 10 ? "0" + String(mins) : mins);
    formated.push(secs < 10 ? "0" + String(secs) : secs);

    return formated.join(":");
}

(function() {
    var video    = document.getElementById("videoview");
    //var boxTexto = document.getElementById("txt");
	var btn = document.getElementById("btn_quest");
    var isEnded  = false;
btn.disabled = true; // Desabilitar
    video.addEventListener("ended", function() {
        isEnded = true;

       // boxTexto.textContent = "Quer uma pipoquinha a mais, compre novos ingressos.";
    }, true);

    video.addEventListener("timeupdate", function() {
        if (!isEnded) {
            //boxTexto.textContent = "O tempo do video é: " + parseTime(this.currentTime) + " de: " + parseTime(this.duration);
				
        }
		 if(parseTime(this.currentTime) == parseTime(this.duration)){
				
				 btn.disabled = false; // Habilitar
			  }
    }, true);
})();
