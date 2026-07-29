/**
 * 자동글방지
 * @author GOONO
 * @since  2021
 * @version 1.0
 * @see
 * Copyright (C)  All right reserved.
*/
/*<body onload="createCaptcha()">
  <form onsubmit="validateCaptcha()">
    <div id="captcha">
    </div>
    <input type="text" placeholder="Captcha" id="cpatchaTextBox"/>
    <button type="submit">Submit</button>
  </form>
</body>*/

var coreCaptcha = function(id,len){
	this.initialize(id,len);
};

coreCaptcha.prototype = {
	id : null,
	len : 8,
	code : null,
	
	//private
	initialize: function(id,len) {
		this.id = id;
		if(!this.isEmpty(len)){
			this.len = len;	
		}		
		this.createCaptcha();
	},
	//생성
	createCaptcha : function() {
		//clear the contents of captcha div first 
		var container = document.getElementById(this.id);
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
		var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
		var lengthOtp = this.len;
		var captcha = [];
		for (var i = 0; i < lengthOtp; i++) {
			//below code will not allow Repetition of Characters
			var index;
			// 보안 강화된 랜덤 인덱스 생성
			if (window.crypto && window.crypto.getRandomValues) {
				var array = new Uint32Array(1);
				window.crypto.getRandomValues(array);
				index = Math.floor((array[0] / (0xffffffff + 1)) * charsArray.length);
			// } else {
			// 	// Fallback
			// 	index = Math.floor(Math.random() * charsArray.length + 1);
			}
			if (captcha.indexOf(charsArray[index]) === -1)
				captcha.push(charsArray[index]);
			else i--;
		}
		var canv = document.createElement("canvas");
		canv.id = this.id;
		canv.width = 200;
		canv.height = 50;
		var ctx = canv.getContext("2d");
		ctx.font = "25px Georgia";
		ctx.strokeText(captcha.join(""), 0, 30);
		//storing captcha so that can validate you can save it somewhere else according to your specific requirements
		this.code = captcha.join("");
		container.appendChild(canv); // adds the canvas to the body element
	},
	//검증
	validateCaptcha : function(data) {
	  if (data == this.code) {
	    //console.debug("Valid Captcha");
	    return true;
	  }
	  //console.debug("Invalid Captcha. try Again");
	  this.createCaptcha();
	  return false;
	},
	isEmpty : function(text) {
		if (text == ""
				|| text == null
				|| text == undefined
				|| (text != null && typeof text == "object" && !Object
						.keys(text).length)) {
			return true;
		}
		return false;
	}
};