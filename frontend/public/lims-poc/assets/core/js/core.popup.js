/**
 * 공통 form 유효성검사
 * jquery-validation/1.19.2
 * @author GOONO
 * @since  2021
 * @version 1.0
 * @see
 * Copyright (C)  All right reserved.
*/
/**
 * 팝업열기
 * @author GOONO
 * @since  2019
 * @see
 * Copyright (C)  All right reserved.
*/
var corePopupList = [];
var corePopup = {

	height:600, // sets the height in pixels of the window.
	width:600, // sets the width in pixels of the window.
	toolbar:0, // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
	scrollbars:0, // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
	status:0, // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
	resizable:1, // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
	left:0, // left position when the window appears.
	top:0, // top position when the window appears.
	center:0, // should we center the window? {1 (YES) or 0 (NO)}. overrides top and left
	createnew:1, // should we create a new window for each occurance {1 (YES) or 0 (NO)}.
	location:0, // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
	menubar:0, // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
	refresh : true, //이미 출력되었을경우 처리(true : 리프레쉬 , false : 포커스 )

	open : function(url,name,settings,onUnload,postKey,postData){

		//팝업오픈전 초기화
		$("#popup_child_data").val("");

		url = url + "&ptoken=" + postKey;
		
		//팝업 전달데이터 설정
		var postKeyData = JSON.stringify(postData); //문자열변환
		$("#popup_opener_data").attr("data-"+postKey ,postKeyData);
		
		if(!this.isEmpty(settings.height))this.height = settings.height;
		if(!this.isEmpty(settings.width))this.width = settings.width;
		if(!this.isEmpty(settings.toolbar))this.toolbar = settings.toolbar;
		if(!this.isEmpty(settings.scrollbars))this.scrollbars = settings.scrollbars;
		if(!this.isEmpty(settings.status))this.status = settings.status;
		if(!this.isEmpty(settings.resizable))this.resizable = settings.resizable;
		if(!this.isEmpty(settings.left))this.left = settings.left;
		if(!this.isEmpty(settings.top))this.top = settings.top;
		if(!this.isEmpty(settings.center))this.center = settings.center;
		if(!this.isEmpty(settings.createnew))this.createnew = settings.createnew;
		if(!this.isEmpty(settings.location))this.location = settings.location;
		if(!this.isEmpty(settings.menubar))this.menubar = settings.menubar;
		if(settings.refresh !== undefined)this.refresh = settings.refresh;		
		
		//center the window
		if (this.center == 1) {
			this.top = (screen.height-(this.height + 110))/2;
			this.left = (screen.width-this.width)/2;
		}

		parameters = "location=" + this.location + ",menubar=" + this.menubar + ",height=" + this.height + ",width=" + this.width + ",toolbar=" + this.toolbar + ",scrollbars=" + this.scrollbars  + ",status=" + this.status + ",resizable=" + this.resizable + ",left=" + this.left  + ",screenX=" + this.left + ",top=" + this.top  + ",screenY=" + this.top;
		
		//이미 실행중여부 처리
		if( this.refresh != true  && !this.isEmpty(corePopupList[name]) ){
			if(!corePopupList[name].closed){
				corePopupList[name].focus();
				return corePopupList[name];	
			}
		}
		
		var winObj = window.open(url, name, parameters);
		
		//이미 실행중여부 처리
		if( this.refresh != true ){
			corePopupList[name] = winObj;
		} 				

		winObj.focus();

		if (onUnload) {

			// Incremental check for window status
			// Attaching directly to window.onunlaod event causes invoke when document within window is reloaded
			// (i.e. an inner refresh)
			var unloadInterval = setInterval(function() {

				if (!winObj || winObj.closed) {

					clearInterval(unloadInterval);
					//JSPopup.onUnload.apply($(this));
					if(onUnload){
						var data = $("#popup_child_data").val();
						if( corePopup.isEmpty(data) ) {
							onUnload.apply($(this),[ "" ]);
						} else {
							onUnload.apply($(this),[ JSON.parse($("#popup_child_data").val()) ]);
						}
						//팝업창에 전달된 데이터 삭제
						$("#popup_opener_data").removeAttr("data-"+postKey);
					}
				}
			},500);
		}
		if(winObj){
			winObj.focus();
		}
		return winObj;
	},	
	openBlank : function(url,onUnload,postKey,postData){

		//팝업오픈전 초기화
		$("#popup_child_data").val("");

		url = url + "&ptoken=" + postKey;
		
		//팝업 전달데이터 설정
		var postKeyData = JSON.stringify(postData); //문자열변환
		$("#popup_opener_data").attr("data-"+postKey ,postKeyData);
		var winObj = window.open(url, '_balnk');
		
		winObj.focus();

		if (onUnload) {

			// Incremental check for window status
			// Attaching directly to window.onunlaod event causes invoke when document within window is reloaded
			// (i.e. an inner refresh)
			var unloadInterval = setInterval(function() {

				if (!winObj || winObj.closed) {

					clearInterval(unloadInterval);
					//JSPopup.onUnload.apply($(this));
					if(onUnload){
						var data = $("#popup_child_data").val();
						if( corePopup.isEmpty(data) ) {
							onUnload.apply($(this),[ "" ]);
						} else {
							onUnload.apply($(this),[ JSON.parse($("#popup_child_data").val()) ]);
						}
						//팝업창에 전달된 데이터 삭제
						$("#popup_opener_data").removeAttr("data-"+postKey);
					}
				}
			},500);
		}
		if(winObj){
			winObj.focus();
		}
		return winObj;
	},	
	//부모창에서 자식창 데이터 설정값 가져옴
	getOpenerData : function(postKey){
		return JSON.parse($("#popup_opener_data", opener.document).attr("data-"+postKey));
	},	
	//부모창에서 자식창 데이터 설정값 제거
	removeOpenerData : function(postKey){
		return $("#popup_opener_data", opener.document).removeAttr("data-"+postKey);
	},	
	//자식장에서 부모창 데이터 설정
	setChildData : function(data){
		$("#popup_child_data", opener.document).val(JSON.stringify(data));
	},
	//자식창 에서 부모창 데이터 설정값 가져옴
	getChildData : function(data){
		return JSON.parse($("#popup_child_data", opener.document).val());
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