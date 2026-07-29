/**
 * 파일업로드
 * @author GOONO
 * @since  2021
 * @version 1.0
 * @see
 * Copyright (C)  All right reserved.
*/
var coreFileUpload = function(id, url, postData, files, successCallBack, failCallBack, fileFormName){
	this.initialize(id, url, postData, files, successCallBack, failCallBack, fileFormName);
};

coreFileUpload.prototype = {
	id: null,	
	startTime: null,
	lastProgressTime: null,
	myXhr: null,
	cbProgress: null, //전송상태 전송
	fileFormName: 'coreFileUpload',
	
	//private
	initialize: function(id, url, postData, files, successCallBack, failCallBack, fileFormName) {
		this.id = id;
		if(!this.isEmpty(fileFormName)) {
		  this.fileFormName = fileFormName;
		}
		this.startUpload(url, postData, files, successCallBack, failCallBack);
	},
	onProgress: function(cbProgress){
		this.cbProgress = cbProgress;
	},
	startUpload: function(url, postData, files, successCallBack, failCallBack) {
		var self = this;
		var data = new FormData();
		
		if(files) {
			//업로드 파일 추가
			if(S2Util.isArray(files)) {
				for(idx in files) {
					var file = files[idx];
					if(!this.isEmpty(file.desc)) {
						var fileName = file.name + '||desc|' + file.desc;
						data.append(self.fileFormName, file, fileName);  
					} else {
						data.append(self.fileFormName, file);
					}
				}
			} else {
				if(files.desc) {
					var fileName = files.name + '||desc|' + files.desc;
					data.append(self.fileFormName, files, fileName);
				} else {
					data.append(self.fileFormName, files);
				}
			}
		}
	    
		//post 데이터 추가
		for(var key in postData) {			  
		  data.append(key, decodeURIComponent(postData[key]));
		}
		
	    this.startTime = (new Date());
	    this.lastProgressTime = (new Date());
	    
	    coreLoading.show('Uploading...', 'circle');
	    var uploadAjaxObj = $.ajax({
			url: url,
			method: 'post',
			data: data,
			beforeSend: function(xhr) {
				xhr.setRequestHeader('AJAX', true);
			},
			dataType: 'json',
			async: true,
			processData: false,
			contentType: false,
			xhr: function() {
				self.myXhr = $.ajaxSettings.xhr();
				if(self.myXhr.upload) {
					self.myXhr.upload.addEventListener('progress', function(e) { 
					if(e.lengthComputable) {
						// Append progress percentage.
						var loaded = e.loaded;
						var total = e.total;
						var percentage = Math.round((loaded / total) * 100);
						
						// 1초에 한번갱신
						var seconds_update = (new Date().getTime() - self.lastProgressTime.getTime()) / 1000;
						// console.debug(seconds_update);
						if(seconds_update < 1 && percentage < 100){
							return;
						}
			       		self.lastProgressTime = (new Date());
						
						// Bytes received.
						var recieved = loaded;
						
						// Time Remaining
						var seconds_elapsed = (new Date().getTime() - self.startTime.getTime()) / 1000;
						
			       		var bytes_per_second = seconds_elapsed ? loaded / seconds_elapsed : 0;
						// var Kbytes_per_second = bytes_per_second / 1000;
						var remaining_bytes = total - loaded;
						var seconds_remaining = seconds_elapsed ? Math.round(remaining_bytes / bytes_per_second) : "calculating" ; // 남은시간
						
						if(bytes_per_second > total) {
							bytes_per_second = total;
						}
						//파일크기,전송크기,진행율,초당전송바이트,남은시간
						//console.debug(total + ":"+recieved+ ":"+percentage+ ":"+bytes_per_second+ ":"+seconds_remaining);	
						
						if(self.cbProgress != null) {
							self.cbProgress({total: total, recieved: recieved, percentage: percentage, bytes_per_second: bytes_per_second, seconds_remaining: seconds_remaining});
						}
					}
				}, false);
				self.myXhr.upload.addEventListener('load', function(e) { 
				}, false);
				self.myXhr.upload.addEventListener('error', function(e) { 
					coreLoading.hide();
					if(typeof failCallBack === 'function') {
						failCallBack('error');
					}
					delete uploadAjaxObj;
				}, false);
				self.myXhr.upload.addEventListener('abort', function(e) { 
					coreLoading.hide();
					if(typeof failCallBack === 'function'){
						failCallBack('abort');
					}
					delete uploadAjaxObj;
					
				}, false);
			}
			return self.myXhr;
	   	},
	    success: function(data) {
	   		coreLoading.hide();
	    	if( coreRequest.isSuccess(data.status.result) ){
				if(typeof successCallBack === 'function'){
					successCallBack(data);
				}
			}
			else{
				if(typeof failCallBack === 'function'){
					failCallBack(data);
				}else{
					coreDialog.alert(data.status.message);
				}
			}
	       	delete uploadAjaxObj;
	      },
	     error : function(request, status, error) {
			  coreLoading.hide();
			  if(self.isEmpty(request.responseText)) {
			      coreDialog.alert(request.statusText);  
			  }else {
				  if(S2Util.isJSON(request.responseText)) {
				      const obj = JSON.parse(request.responseText);
				      coreDialog.alert(obj.msg);
				  } else if(typeof request.responseText == 'string') {
				      coreDialog.alert(request.responseText);
				  }
			  }
			  delete uploadAjaxObj; 
	      }
	    });
	},
	// 빈문자열 검사 true : 빈값
	isEmpty : function(text) {
		if(text == '' ||
				text == null ||
				text == undefined ||
				(text != null && typeof text == 'object' && !Object.keys(text).length)) {
			return true;
		}
		return false;
	}
};