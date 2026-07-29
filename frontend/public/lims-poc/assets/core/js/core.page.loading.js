/**
 * 페이지 로딩 프로그레스 바
 * @author GOONO
 * @since  2021
 * @version 1.0
 * @see
 * Copyright (C)  All right reserved.
*/
document.onreadystatechange = function(e)
{
  if(document.readyState=="interactive")
  {
    var all = document.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) 
    {
      setPageElelment(all[i]);
    }
  }
}

function checkPageElement(ele)
{
  var all = document.getElementsByTagName("*");
  var totalele=all.length;
  var per_inc=100/all.length;
 // console.debug(totalele);
  if($(ele).on())
  {
    var prog_width=per_inc+Number(document.getElementById("page_progress_width").value);
   // console.debug(prog_width);
    document.getElementById("page_progress_width").value=prog_width;
    $("#page_progress_bar").animate({width:prog_width+"%"},0,function(){
      //console.debug(Math.round(prog_width));
      //if(document.getElementById("page_progress_bar").style.width=="100%" || Math.round(prog_width) == 100 )
      if( Math.round(prog_width) == 100 )
      {
        $(".page-progress").fadeOut("slow");
      }			
    });
  }

  else	
  {
    setPageElelment(ele);
  }
}

function setPageElelment(set_element)
{
  checkPageElement(set_element);
}