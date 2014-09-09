//Author: Ing. Edsel Serrano Montiel
//Require BlockUI.js

function messageSuccess(message, tiempo){
	 $.blockUI({ 
            message: message, 
            fadeIn: 700, 
            fadeOut: 700, 
            timeout: tiempo, 
            showOverlay: false, 
            centerY: false, 
            css: { 
            	size: '50px', 
                top: '90px', 
                left: '', 
                right: '70px', 
                border: 'none', 
                padding: '5px', 
                backgroundColor: 'rgb(31, 178, 48)', 
                '-webkit-border-radius': '5px', 
                '-moz-border-radius': '5px', 
                opacity: .9, 
                color: '#fff'
            } 
        });
}


function messageFail(message, tiempo){
     $.blockUI({ 
            message: message, 
            fadeIn: 700, 
            fadeOut: 700, 
            timeout: tiempo, 
            showOverlay: false, 
            centerY: false, 
            css: { 
                size: '50px', 
                top: '90px', 
                left: '', 
                right: '70px', 
                border: 'none', 
                padding: '5px', 
                backgroundColor: 'rgb(255, 48, 48)', 
                '-webkit-border-radius': '5px', 
                '-moz-border-radius': '5px', 
                opacity: .9, 
                color: '#fff'
            } 
        });
}