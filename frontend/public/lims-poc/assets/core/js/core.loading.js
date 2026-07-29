/**
 * 페이지 로딩
 * @author GOONO
 * @since  2021
 * @version 1.0
 * @see
 * Copyright (C)  All right reserved.
*/

var coreLoading = {
    show : function(msg,animation) {
    	if(animation != null)
    	    $('.wrapper').loadingModal({ text: msg }).loadingModal('animation', animation);
    	else
    	    $('.wrapper').loadingModal({ text: msg }).loadingModal('animation', 'wanderingCubes');
    },		
    hide : function() {
		$('.wrapper').loadingModal('destroy') ;
    },			
};
var coreAjaxLoading = {
     show : function(msg,animation) {
    	if(animation != null)
    	    $('body').loadingModal({ text: msg }).loadingModal('animation', animation);
    	else
    	    $('body').loadingModal({ text: msg }).loadingModal('animation', 'wanderingCubes');
    },		
    hide : function() {
		$('body').loadingModal('destroy') ;
    },			 		
};