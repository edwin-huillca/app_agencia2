var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // devicePush.register({
        //     idUser: 'USER_ID', // Tu ID de usuario en Device Push
        //     idApplication: 'APPLICATION_ID', // El ID de aplicación en Device Push
        //     position: true, // Activa o desactiva la lectura de gps. El valor por defecto es false 
        //     additionalData: {} // Actualmente en desarrollo
        // });
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    takePicture: function() {

      //navigator.camera.cleanup();
      navigator.camera.getPicture( function( fotoURI ) {

        if (fotoURI !="") {
            var id_usuario = _getUrlVars()["id"];
            var lado = _getUrlVars()["lado"];
            var parte = _getUrlVars()["parte"];
            var extra =_getUrlVars()["extra"];
            var foto = fotoURI;
            alert("Cargando imagen...");

            location.href="camarazoom.html?id=" + id_usuario + "&lado=" + lado +"&parte=" + parte + "&extra=" + extra + "&foto=" + foto;
            
        };
      },
      function(message) {
        alert("ERROR: Cancel\xD3 toma de foto!");
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
      });
     
    },
    takePictureInterna: function(lado, parte, extra, id) {

      //navigator.camera.cleanup();
      navigator.camera.getPicture( function(fotoURI) {

        if (fotoURI !="") {
            var id_usuario = _getUrlVars()["id"];
            var foto = fotoURI;

            location.href="camarazoom.html?id=" + id_usuario + "&lado=" + lado +"&parte=" + parte + "&extra=" + extra + "&id_registro=" + id + "&foto=" + foto;
            return false;
        };
      },
      function(message) {
        alert("ERROR: Cancel\xD3 toma de foto!");
      },
      {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI
        // targetWidth: 200,
        // targetHeight: 200
      });
     
    }
};

// function successDeviceRegistered(evt){
//     alert("Device Id" + evt.devicePushId);
//     var id = evt.devicePushId;
//     alert("Device Token" + evt.devicePushToken);
//     var tokenDevice = evt.devicePushToken;
// }