/**
 * 암호화 기능
 * @author GOONO
 * @since  2021
 * @version 1.0
 * @see
 * Copyright (C)  All right reserved.
*/
var coreCrypto = {
	
	KEY_LENGTH : 16,
	key : '1q2w3e4r5t',
	iv : CryptoJS.enc.Utf8.parse('1234567812345678'),
		
	//public
	encJson : function(message, key) {
		if(coreCrypto.isEmpty(message)){
			return "";
		}
		return coreCrypto.encAES(JSON.stringify(message),key);
	},
	decJson : function(message, key) {
		if(coreCrypto.isEmpty(message)){
			return "";
		}
		var decString = coreCrypto.decAES(message,key);
		return JSON.parse( decString );
	},
	decString : function(message, key) {
		if(coreCrypto.isEmpty(message)){
			return "";
		}
		var decString = coreCrypto.decAES(message,key);
		return decString;
	},
	encString : function(message, key) {
		if(coreCrypto.isEmpty(message)){
			return "";
		}
		var decString = coreCrypto.encAES(message,key);	
		return decString;
	},
	//url encode 처리
	encURIString : function(message, key) {
		if(coreCrypto.isEmpty(message)){
			return "";
		}
		var decString = coreCrypto.encAES(message,key);	
		return encodeURIComponent(decString);
	},
		
	getKey : function(key) {
		// key length 는 16, 32, 64 이어야 함.		
		if( key.length > coreCrypto.KEY_LENGTH ){
		  key = key.substring(0, coreCrypto.KEY_LENGTH);
		}
		else if (  key.length  < coreCrypto.KEY_LENGTH ) {
		    var tempStr = "A";
		    for (var i = key.length ; i < coreCrypto.KEY_LENGTH; i++) {
		    	key += tempStr;
		    }
		}
		return key;
	},	 
	//암호화
	encAES: function(message,key){
	   if(coreCrypto.isEmpty(key)){
		   key = coreCrypto.key;
	   }
	   key = coreCrypto.getKey(key);
	   var keyUTF8 = CryptoJS.enc.Utf8.parse(key);
	   var encrypted = CryptoJS.AES.encrypt(message, keyUTF8, { iv: coreCrypto.iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.ZeroPadding});
	   return encrypted.toString();
	 },
	 
	//복호화
	decAES : function(message,key){
		if(coreCrypto.isEmpty(key)){
		   key = coreCrypto.key;
	    }
	    key = coreCrypto.getKey(key);
	    var keyUTF8 = CryptoJS.enc.Utf8.parse(key);
	    var decrypted = CryptoJS.AES.decrypt(message,keyUTF8 ,{iv:coreCrypto.iv,padding:CryptoJS.pad.ZeroPadding});
		try {
	        return decrypted.toString(CryptoJS.enc.Utf8);
	   } catch (e) {	
	        return '';
	   }	   
	},
	encBase64 : function(message) {
		var wordArray = CryptoJS.enc.Utf8.parse(message);
		var base64 = CryptoJS.enc.Base64.stringify(wordArray);
		return base64;
	},
	decBase64 : function(message) {
		var parsedWordArray = CryptoJS.enc.Base64.parse(message);
		var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
		return parsedStr;
	},
	getMD5 : function(message){
		var md5msg = CryptoJS.MD5(message);
		return md5msg.toString();
	},
	// 빈문자열 검사 true : 빈값
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