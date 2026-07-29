/**
 * 업로드 진행상태 화면UI
 * @author GOONO
 * @since  2021
 * @version 1.0
 * @see
 * Copyright (C)  All right reserved.
*/
var coreUploaderView = {
		notify : null,
		uploading : false,
		msgViewDetail : 'View Details',
		msgCancelAll : 'Cancel all',
		msgDeleteCompletedList : 'Delete completed list',
		msgUploading : 'uploading...',
		hideTimer : null,
	
		//Public
		show : function(){
			
			if(this.hideTimer != null ){
				clearTimeout(this.hideTimer );
			}
			
			if(this.uploading == false){			
				this.uploading = true;
				
			    this.notify = $.notify({
					// options
					icon: 'fas fa-upload',
					title: '0 / 0 ' + coreUploaderView.msgUploading,
					message: coreUploaderView.msgViewDetail
				},{
					// settings
					element: 'body',
					position: null,
					type: "info",
					allow_dismiss: true,
					newest_on_top: false,
					showProgressbar: false,
					placement: {
						from: "bottom",
						align: "right"
					},
					offset: 0,
					spacing: 10,
					z_index: 1031,
					delay: 0,
					timer: 0,
					url_target: '',
					mouse_over: null,
					animate: {
						enter: 'animated fadeInDown',
						exit: 'animated fadeOutUp'
					},
					onShow: null,
					onShown: null,
					onClose: null,
					onClosed: function(){ coreUploaderView.uploading = false; coreUploaderView.notify = null; },
					icon_type: 'class',					
					template: '<div data-notify="container" class="col-sm-3 alert alert-{0} core-upload-view-content" role="alert" >' +
					//'<a href="javascript:coreUploaderView.doUploadModal();" data-notify="url"><span class="upload-message pull-right" data-notify="message">{2}</span></a>' +	
					'<button type="button" aria-hidden="true" class="close d-none" data-notify="dismiss" >×</button>' +
					//'<span data-notify="icon"></span>' +
			                    '<p class="text-center">' +
			                      '<strong data-notify="title" class="upload-title">{1}</strong>' +
			                    '</p>' +
			                   
			                   '<div class="upload-contents text-right">' +
			                     '<div class="upload-action text-right mb-2">' +	
			                     
			                     '<button type="button" class="btn btn-danger btn-xs btn-upload-cancel mr-2" onclick="javascript:coreUploaderView.uploadCancelAll();">' +  coreUploaderView.msgCancelAll + '</button>' +
			                     '<button type="button" class="btn btn-primary btn-xs btn-uploaded-clear" onclick="javascript:coreUploaderView.uploadDoneClear();">' +  coreUploaderView.msgDeleteCompletedList + '</button>' +
			                     
			                    // '<button type="button" class="btn btn-default btn-xs btn-upload-cancel" onclick="javascript:coreUploaderView.uploadCancelAll();">' +  coreUploaderView.msgCancelAll + '</button>' +
								//  '<button type="button" class="btn btn-primary btn-xs btn-uploaded-clear" onclick="javascript:coreUploaderView.uploadDoneClear();">' +  coreUploaderView.msgDeleteCompletedList + '</button>' +		
			                     '</div>' +
			                    '<div id="coreUploadViewContentFiles" class="upload-files"></div>' +
			                   '</div>' +		
			                    
			        '</div>'
				});	
			}
		},	
		//전체취소
		uploadCancelAll : function(){
			this.notify.$ele.find(".upload-files").find("i").each(function(index) {
				 if($(this).hasClass("fa-stop")){
					 $(this).trigger("click");
				 }
			});
			coreUploaderView.hide();
		},
		//완료목록 지우기
		uploadDoneClear : function(){			
			this.notify.$ele.find(".upload-files").find('.progress-group').each(function(index) { 
				if( $(this).hasClass("upload-view-complete") ){
					$(this).remove();
				}	
				coreUploaderView.updateView();		 
			});
			
			//업로드 파일정보 설정			
			var complateSize = this.notify.$ele.find(".upload-view-complete").length;
			var totalSize = this.notify.$ele.find(".progress-group").length;			
			if( complateSize == totalSize ){		
				coreUploaderView.hide();
			}
		},
		//업로드 상태화면
		/*doUploadModal : function(){
			var view = this.notify.$ele.find(".upload-files");
			if(view.hasClass("d-none")){
				view.removeClass("d-none");
				this.notify.update("message",'Close View Details');
			}
			else{
				view.addClass("d-none");
				this.notify.update("message",'View Details');
			}			
		},	*/
		addItem : function(uploader){
			if(this.hideTimer != null ){
				clearTimeout(this.hideTimer );
			}
			
			coreUploaderView.show();
			//업로드 UI추가
			var progress = '<div class="progress-group" id="' + uploader.id  + '">';	
			progress += '<div class="row">';	                     
            progress += '<span class="col-sm-7 text-left" style="text-overflow: ellipsis;overflow: hidden;" title="' + coreCommon.escapeHtml(uploader.file.name) + '">' + uploader.file.name + '</span>';
            progress += '<span class="col-sm-4 text-right" style="text-overflow: ellipsis;overflow: hidden;"><b class="uploading-size">0</b>/'+ uploader.byteCalculation(uploader.file.size) +'</span>';
            progress += '<span class="col-sm-1 text-right" style="text-overflow: ellipsis;overflow: hidden;"></span>';
            progress += '</div>';			                      
            progress += '<div class="row">';
            progress += '<div class="progress progress-sm col-sm-11" style="padding-left: 0;padding-right: 0;">';
            progress += '<div class="progress-bar bg-primary" style="width: 0%"></div>';
            progress += '</div>';
            progress += '<i class="fas fa-stop col-sm-1" style="cursor: pointer;""></i>';
            progress += '</div>';
            progress += '</div>';		
            this.notify.$ele.find(".upload-files").append(progress);	
		
			//업로드 시작 및 취소 이벤트 연결
			this.notify.$ele.find("#" + uploader.id).find("i").on("click",function(event){				
	      		 if($(this).hasClass("fa-stop")){
	      			uploader.cancel(); 
	      			$(this).removeClass("fa-stop").addClass("fa-play");
	      		 }
	      		 else{
	      			$(this).removeClass("fa-play").addClass("fa-stop");
	      			coreUploaderProgress.reStartUpload(uploader);      			
	      		 }	      	
	  	 	});
	  	 	
	  	 	var div = document.getElementById('coreUploadViewContentFiles');
   			div.scrollTop = div.scrollHeight - div.clientHeight;
   			 
			this.updateView();			
		},
		updateView : function(){
			//업로드 파일정보 설정			
			var complateSize = this.notify.$ele.find(".upload-view-complete").length;
			var totalSize = this.notify.$ele.find(".progress-group").length;
			
			this.notify.update("title",complateSize  + ' / ' + totalSize  + ' ' + coreUploaderView.msgUploading );
			
			if( complateSize == totalSize ){		
				coreUploaderView.hide();
			}
		},		
		updateItem : function(uploader,Percentage,current,max,speed){
			var tr = this.notify.$ele.find("#" + uploader.id);
			
			tr.find(".progress-bar").css("width",Percentage+"%").html("<span>" + speed + "</span>");
			if(Percentage >= 100){
				tr.find(".progress-bar").css("width","100%")
		    }
			
			tr.find(".uploading-size").html(current);
			//tr.find("td:eq(3)").html(max);	
		},
		successItem : function(uploader){
			var tr = this.notify.$ele.find("#" + uploader.id);
			
			tr.addClass("upload-view-complete");
			tr.find("i").remove();
	
			this.updateView();			
		},
		failItem : function(uploader){
			var tr = this.notify.$ele.find("#" + uploader.id);
			tr.find("i").removeClass("fa-stop").addClass("fa-play");
			tr.find(".progress-bar").css("width","0%");
			tr.find(".uploading-size").html('0');
			this.updateView();			
		},
		cancelItem : function(uploader){
			this.updateView();
		},
		//Public
		hide : function(){
			if(this.hideTimer != null ){
				clearTimeout(this.hideTimer );
			}
			this.hideTimer = setTimeout(function() {
				$.notifyClose("all");
			}, 5000);
		}	
};

//화면 UI추가
var coreUploaderProgress = {
	
	uploaderQueue : [],
	//업로드 진행여부
	isUploading : false,
	
   	addItem : function(uploader){
   		this.addQueue(uploader);
   		
   		coreUploaderView.addItem(uploader);  		
   		
   		this.startUpload();
   	},
   	addQueue : function(uploader){
   		this.uploaderQueue.push(uploader);
   		//console.debug("coreUploaderProgress Queue => " + this.uploaderQueue.length);
   	},
   	getQueue : function(){
   		return this.uploaderQueue.shift();
   	},
   	clearQueue : function(){
   		this.uploaderQueue = [];
   	},
   	//취소 및 중지후 재전송
   	reStartUpload : function(uploader){
   		uploader.isFailed = false;
   		uploader.isCanceled = false;
   		coreUploaderProgress.addQueue(uploader);
   		coreUploaderProgress.startUpload();
   	},
   	startUpload : function(){
   		if(this.isUploading)
   			return;
   		
   	   this.isUploading = true;
   	   setTimeout(this.doUploading,500);
   		
   	},
   	doUploading : function(){
   		
		var uploader =  coreUploaderProgress.getQueue();
		if( uploader == undefined ){
			coreUploaderProgress.isUploading = false;
			return;
		}
		
		if( uploader.isFailed == true || uploader.isCanceled == true ){
			
		}else{
			uploader.start(function(res){
				coreUploaderView.successItem(uploader);
		    	
		    	if(typeof uploader.cbUploadDone === "function" ){ 		    				
		    		 uploader.cbUploadDone(res);
			    }
			    
			    setTimeout(function(){
					coreUploaderProgress.doUploading();
				}, 1000);
		    	
		  	},function(res){
		  		coreUploaderView.failItem(uploader);
		  		if(typeof uploader.cbFail === "function" ){ 		    				
		    		 uploader.cbFail(res);
			    }
			    //실패시
		  		setTimeout(function(){
					coreUploaderProgress.doUploading();
				}, 1000);
		  	},function(){
		  		coreUploaderView.cancelItem(uploader);
		  		if(typeof uploader.cbFail === "function" ){ 		    				
		    		 uploader.cbFail(res);
			    }
			   	//취소시
		  		 setTimeout(function(){
					coreUploaderProgress.doUploading();
				}, 1000);
		  	});
		}
   	},
   	updateItem : function(uploader,Percentage,current,max,speed){
   		coreUploaderView.updateItem(uploader,Percentage,current,max,speed);  			
   	}
};

var coreUploader = function(url,file,postData,pageObj,cbUploadDone,cbFail){
	this.initialize(url,file,postData,pageObj,cbUploadDone,cbFail);
};

coreUploader.prototype = {
		id : null,
		url : null,
		file : null,
		myXhr : null,
		postData : null,
		pageObj : null,
		startTime : null,
		lastLoadedByte : 0,
		isFailed : false,
		isCanceled : false,
		cbUploadDone : null,
		cbFail : null,
		
		initialize: function(url,file,postData,pageObj,cbUploadDone,cbFail) {	
			this.id   = coreCommon.genUUID();
			this.url  = url;
			this.file = file;
			this.postData = postData;
			this.pageObj  = pageObj;
			this.cbUploadDone = cbUploadDone;
			this.cbFail = cbFail;
			
			coreUploaderProgress.addItem(this);
		},
		start : function(successCallBack,failedCallBack,CanceledCallback){			
			var self = this;	
			self.isFailed = false;
			self.isCanceled = false;
			
			var data = new FormData();
			
            data.append('coreFileUpload', this.file);
                        
    		//post 데이터 추가
			for( var key in self.postData ) {			  
			  data.append(key,self.postData[key]);
			}
	  
            self.startTime = (new Date()).getTime();
            
            var uploadAjaxObj = $.ajax({
               url: this.url,
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
                   if(self.myXhr.upload){
                	   self.myXhr.upload.addEventListener('progress',function(e){ 
							 if(e.lengthComputable){                   	    	
							        var max = e.total;
							        var current = e.loaded;	        
							        var Percentage = (current * 100)/max;
							        //console.debug(max); //byte
							       // console.debug(current); //byte
							       // console.debug(Percentage);
							       // console.debug(current-self.lastLoadedByte);
							        coreUploaderProgress.updateItem(self,Math.floor(Percentage),self.byteCalculation(current),self.byteCalculation(max),self.getSpeed(current - self.lastLoadedByte));
							        self.lastLoadedByte = current;        
						 	   }
 					   	}, false);
                	   self.myXhr.upload.addEventListener("load", function(e)   { 
							//console.debug('onComplete load => '+ self.file.name);
							
					   }, false);
                	   self.myXhr.upload.addEventListener("error", function(e)  { 
								self.isFailed = true;
								if(typeof failedCallBack === "function" ){
									failedCallBack();
								}
								delete uploadAjaxObj;
						}, false);
                	   self.myXhr.upload.addEventListener("abort", function(e)  { 
						    //console.debug('onCanceled => ' + self.file.name );
							self.isCanceled = true;
							if(typeof CanceledCallback === "function" ){
								CanceledCallback();
							}
						   delete uploadAjaxObj;
					 }, false);
                   }
                   return self.myXhr;
           	},
            success: function(data) {
               	  if( coreRequest.isSuccess(data.status.result) ){	
            		if(typeof successCallBack === "function" ){
            			successCallBack(data);            		
			    	}			    	  
               	  }
               	  else{	
               		if(typeof failedCallBack === "function" ){
               			failedCallBack(data);            		
			    	}		
               		coreDialog.alert(data.status.message);
		    	  }   
		    	  delete uploadAjaxObj; 
              },
              error : function(request, status, error) {
				  self.isFailed = true;
				  if(typeof failedCallBack === "function" ){
						failedCallBack();
				  }
				  if(self.isEmpty(request.responseText)) {
				      coreDialog.alert(request.statusText);  
				  }else {
				      coreDialog.alert(request.statusText);
				  }
				  delete uploadAjaxObj; 
		      }
            });
	},
	cancel : function(){
	     this.myXhr.abort();
	},
    byteCalculation : function(bytes) {
        var bytes = parseInt(bytes);
        var s = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var e = Math.floor(Math.log(bytes)/Math.log(1024));
       
        if(e == "-Infinity") return "0 "+s[0]; 
        else 
        return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
   	},
   	getSpeed : function(loaded) {
   		var endTime = (new Date()).getTime();
   	    var duration = ( endTime - this.startTime) / 1000;
   	    var bitsLoaded = loaded * 8;
   	    var speedBps = (bitsLoaded / duration).toFixed(2);
   	    var speedKbps = (speedBps / 1024).toFixed(2);
   	    var speedMbps = (speedKbps / 1024).toFixed(2);
   	    
   	    var speedBytes = this.byteCalculation(speedBps/8);
   	 
   	   /* console.debug("Your connection speed is: \n" +  this.fileSize +" \n" +
   	           speedBps + " bps\n"   + speedBytes + " \n" +
   	           speedKbps + " kbps\n" + 
   	           speedMbps + " Mbps\n" );*/
   	    
   	    return  speedKbps + " Kbps";

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
