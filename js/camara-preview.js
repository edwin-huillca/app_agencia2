/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

 var app;

$(document).ready(function () {
	app = {
		// Application Constructor
		initialize: function() {
			this.bindEvents();
		},
		// Bind Event Listeners
		//
		// Bind any events that are required on startup. Common events are:
		// 'load', 'deviceready', 'offline', and 'online'.
		bindEvents: function() {
			//document.getElementById('startCameraButton').addEventListener('mousedown', this.onStartCamera, false);
			//document.getElementById('startCameraAnotherPosButton').addEventListener('mousedown', this.onStartCameraAnotherPos, false);
			
			//document.getElementById('stopCameraButton').addEventListener('mousedown', this.onStopCamera, false);
			//document.getElementById('takePictureButton').addEventListener('mousedown', this.onTakePicture, false);
			//document.getElementById('switchCameraButton').addEventListener('mousedown', this.onSwitchCamera, false);
			//document.getElementById('showButton').addEventListener('mousedown', this.onShow, false);
			//document.getElementById('hideButton').addEventListener('mousedown', this.onHide, false);
			//document.getElementById('showButton2').addEventListener('mousedown', this.onAprobarFoto, false);
			
			//document.getElementById('colorEffectCombo').addEventListener('change', this.onColorEffectChanged, false);
			//window.addEventListener('orientationchange', this.onStopCamera, false);


			//document.addEventListener('deviceready', this.onDeviceReady, false);
		},
		onStartCamera: function() {
			//alert("iniciando camara");
			//adaptWidth = 280;
			//adaptHeight = 280;
			//ww= $( window ).width();
			//wh= $( window ).height();
			//adaptX= ww - (adaptWidth/2);
			//adaptY= wh - (adaptHeight/2);
			adaptWidth = $( window ).width();
			adaptHeight = $( window ).height();
			//alert(adaptWidth);
			//alert(adaptHeight);

			//var x = $(".mask-circle").offset();
			//adaptX = parseInt(x.left,10);
			//adaptY = parseInt(x.top,10);
			//console.log("x:" + adaptX + ", y:" + adaptY);

			var tapEnabled = true;
			var dragEnabled = true;
	        var toBack = true;
			cordova.plugins.camerapreview.startCamera({x: 0, y: 0, width: adaptWidth, height:adaptHeight}, "front", tapEnabled, dragEnabled, toBack);
		},
		onStartCameraAnotherPos: function() {
			//alert("iniciando camara");
			adaptWidth = $( window ).width();
			adaptHeight = $( window ).height();

			//var x = $(".mask-circle").offset();
			//adaptX = parseInt(x.left,10);
			//adaptY = parseInt(x.top,10);

			var tapEnabled = true;
			var dragEnabled = true;
	        var toBack = false;
			cordova.plugins.camerapreview.startCamera({x: 0, y: 0, width: adaptWidth, height:adaptHeight}, "front", tapEnabled, dragEnabled, toBack);
		},
		onStopCamera: function() {
			cordova.plugins.camerapreview.stopCamera();
		},
		onTakePicture: function() {
			//alert("Tomando foto");
	        cordova.plugins.camerapreview.takePicture({maxWidth:640, maxHeight:640});
		},
		onSwitchCamera: function() {
			cordova.plugins.camerapreview.switchCamera();
		},
		onShow: function() {
			cordova.plugins.camerapreview.show();
		},
	    onHide: function() {
	        cordova.plugins.camerapreview.hide();
	    },
		onColorEffectChanged: function() {
			var effect = document.getElementById('colorEffectCombo').value;
			cordova.plugins.camerapreview.setColorEffect(effect);
		},
		onAprobarFoto: function(){
		       	
	       	insertRecordFoto($("#txt_path").html());
	       	cordova.plugins.camerapreview.stopCamera();
		},
		
		// deviceready Event Handler   
		onDeviceReady: function() {	
			//on picture
			cordova.plugins.camerapreview.setOnPictureTakenHandler(function(result){
				//document.getElementById('originalPicture').src = result[0];//originalPicturePath;
				//document.getElementById('previewPicture').src = foto;//previewPicturePath;
				var foto  = result[1];
				
	            cordova.plugins.camerapreview.show();
	            cordova.plugins.camerapreview.hide();
	            //alert("Procesando imagen...");
	            

	            window.plugins.Base64.encodeFile(foto, function(base64){
		          	//document.getElementById('previewPicture').src = base64;
		          	//$('#previewPicture').css("background", "url(" + base64 + ") no-repeat");

					$('#previewPicture').attr("style", "background: url(" + base64 + ") no-repeat center center;background-size:contain;");

		          	//$("#txt_path").html(btoa(base64));
		          	$("#txt_path").html(base64);
		          	$("#takePictureButtonP").show();
    				$(".backStep2").show();
		          	
	            });
				
	           
			});
		}
	};



   	//app.onStopCamera();
   	
    $( ".goStep2" ).on( "click", 
		function(){
			$('.previsualizador').show();
			console.log("going");
            $(".step3").removeClass("active");
            $(".step1").removeClass("active");
    		$(".step2").addClass("active");
    		$("body").addClass("no");
    		app.onStartCamera();
    		app.onShow();
		}
     );
    $( ".goStep2p" ).on( "click", 
		function(){
			$('.previsualizador').show();
			console.log("going");
            $(".step3").removeClass("active");
            $(".step1").removeClass("active");
    		$(".step2").addClass("active");
    		$("body").addClass("no");
    		app.onStartCameraAnotherPos();
    		app.onShow();
		}
     );
    $( ".goStep3" ).on( "click", 
		function(){
			console.log("going");
            $(".step2").removeClass("active");
            $(".step1").removeClass("active");
    		$(".step3").addClass("active");
    		$("body").removeClass("no");
    		$("#takePictureButtonP").hide();
    		$(".backStep2").hide();
    		$('#previewPicture').attr("style", "background: url('images/loading.gif') no-repeat center center;background-size:contain;");

			app.onTakePicture();
		}
     );
    $( ".backStep2" ).on( "click", 
		function(){
			console.log("goingback");
            $(".step1").removeClass("active");
    		$(".step3").removeClass("active");
    		$(".step2").addClass("active");
    		$("body").addClass("no");

    		$("#takePictureButtonP").hide();
    		$(".backStep2").hide();
    		app.onStopCamera();
    		app.onStartCamera();
    		app.onShow();
		}
     );

    $("#takePictureButtonP" ).on( "click", 
		function(){
    		$("body").removeClass("no");
			app.onAprobarFoto();
		}
     );

	$("#btnCamaraSwitch").on( "click", 
		function(){
			app.onSwitchCamera();
		}
     );

	$("#btnFlashSwitch").on( "click", 
		function(){
			window.plugins.flashlight.toggle();
		}
     );
    


    window.isphone = false;
    if (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1) {
        window.isphone = true;
    }

    if (window.isphone) {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    } else {
        app.onDeviceReady();
    }
	
	//app.onStopCamera();
	//app.onStartCamera();
	
});
