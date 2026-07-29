/**
 * 공통 ajax request
 * @author GOONO
 * @since  2021
 * @version 1.0
 * @see
 * Copyright (C)  All right reserved.
 */
function getAjaxUrl(url) {
  if (url.indexOf('http://') != -1 || url.indexOf('https://') != -1) {
    return url;
  }
  return coreCommon.getUrl(url);
}
function getPostFileDownload(downUrl, data, cbFunc, cbFail) {
  coreAjaxLoading.show(data.postMsg);
  // XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open('POST', getAjaxUrl(downUrl), true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    if (this.status === 200) {
      var filename = '';
      var disposition = xhr.getResponseHeader('Content-Disposition');
      if (disposition && disposition.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = disposition.match(filenameRegex);
        if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
      }
      var type = xhr.getResponseHeader('Content-Type');

      var blob = new Blob([this.response], { type: type });
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
      } else {
        var URL = window.URL || window.webkitURL;
        var downloadUrl = URL.createObjectURL(blob);
        setTimeout(function () {
          coreAjaxLoading.hide();
          cbFunc(downloadUrl);
        }, 500);
      }
    } else {
      setTimeout(function () {
        coreAjaxLoading.hide();
        cbFail();
      }, 500);
    }
  };
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
  xhr.send($.param(data));
}

//POST 요청
function ajaxPost(url, data, loadingMsg, callback, failCallBack, errorCallBack) {
  coreRequest.postDataAjax(getAjaxUrl(url), data, loadingMsg, callback, failCallBack, errorCallBack);
}
//POST 단독실행
function ajaxPostSingleton(url, data, loadingMsg, callback, failCallBack, errorCallBack) {
  coreRequest.postDataAjaxSingleton(getAjaxUrl(url), data, loadingMsg, callback, failCallBack, errorCallBack);
}

//GET 요청
function ajaxGet(url, data, loadingMsg, callback, failCallBack, errorCallBack) {
  coreRequest.getDataAjax(getAjaxUrl(url), data, loadingMsg, callback, failCallBack, errorCallBack);
}

//비동기호출
var coreRequest = {
  isRequest: false,
  lastPostDateTime: new Date().getTime(),
  isJsonString: function (str) {
    try {
      var json = JSON.parse(str);
      return json && typeof json === 'object';
    } catch (e) {
      return false;
    }
  },
  isEmpty: function (text) {
    if (text == '0') return false;

    if (text == '' || text == null || text == undefined || (text != null && typeof text == 'object' && !Object.keys(text).length)) {
      return true;
    }
    return false;
  },
  // NULL값을 ''로 변경
  nullToEmpty: function (res, retRes) {
    for (var dataKey in res) {
      var dataVaule = res[dataKey];
      if (Array.isArray(dataVaule)) {
        retRes[dataKey] = {};
        coreRequest.nullToEmpty(dataVaule, retRes[dataKey]);
      } else if (dataVaule instanceof Object) {
        for (var objKey in dataVaule) {
          var objValue = dataVaule[objKey];
          if (coreRequest.isEmpty(objValue)) {
            dataVaule[objKey] = '';
          }
        }
        retRes[dataKey] = dataVaule;
      } else {
        retRes[dataKey] = dataVaule;
      }
    }
    return retRes;
  },
  //Public 폼 POST
  postFormAjax: function (actionURL, fromName, loadingMsg, successCallBack, failCallBack, errorCallBack) {
    coreRequest.reqAjax('POST', actionURL, $('#' + fromName).serialize(), loadingMsg, successCallBack, failCallBack, errorCallBack);
  },
  //Public data POST
  postDataAjax: function (actionURL, postData, loadingMsg, successCallBack, failCallBack, errorCallBack) {
    coreRequest.reqAjax('POST', actionURL, postData, loadingMsg, successCallBack, failCallBack, errorCallBack);
  },
  //다중연속호출 가능
  postDataAjaxSingleton: function (actionURL, postData, loadingMsg, successCallBack, failCallBack, errorCallBack) {
    coreRequest.reqAjaxSingleton('POST', actionURL, postData, loadingMsg, successCallBack, failCallBack, errorCallBack);
  },
  //Public 폼 GET
  getFormAjax: function (actionURL, fromName, loadingMsg, successCallBack, failCallBack, errorCallBack) {
    coreRequest.reqAjax('GET', actionURL, $('#' + fromName).serialize(), loadingMsg, successCallBack, failCallBack, errorCallBack);
  },
  //Public data GET
  getDataAjax: function (actionURL, postData, loadingMsg, successCallBack, failCallBack, errorCallBack) {
    coreRequest.reqAjax('GET', actionURL, postData, loadingMsg, successCallBack, failCallBack, errorCallBack);
  },
  //Private 실제  전송함수 - 직접호출해서 쓰지 말자!
  reqAjax: function (method, actionURL, reqData, loadingMsg, successCallBack, failCallBack, errorCallBack) {
    // 데이터 요청시마다 timestamp
    coreRequest.lastPostDateTime = new Date().getTime();

    if (coreRequest.isRequest) return;
    coreRequest.isRequest = true;

    var bLoading = false;
    if (!coreRequest.isEmpty(loadingMsg)) {
      bLoading = true;
      coreAjaxLoading.show(loadingMsg);
    }

    if (coreRequest.postAjaxObj) {
      //TODO 화면에서 응답오기전에 호출할경우 생김
      // this.postAjaxObj.abort();
    }

    //var secToken = $("meta[name='_csrf']").attr("content");
    //var secHeader = $("meta[name='_csrf_header']").attr("content");
    coreRequest.postAjaxObj = $.ajax({
      type: method,
      dataType: 'json',
      url: actionURL,
      data: reqData,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('AJAX', true);
        xhr.setRequestHeader('X-S2-Request', 's2-ajax');
        //xhr.setRequestHeader(secHeader, secToken);
      },
      success: function (data) {
        if (bLoading) {
          coreAjaxLoading.hide();
        }

        coreRequest.isRequest = false;
        if (coreRequest.isSuccess(data.status.result)) {
          if (typeof successCallBack === 'function') {
            successCallBack(coreRequest.nullToEmpty(data, {}));
          }
        } else {
          if (typeof failCallBack === 'function') {
            failCallBack(data);
          } else {
            coreDialog.alert(data.status.message);
          }
        }
        delete this.postAjaxObj;
      },
      error: function (request, status, error) {
        if (bLoading) {
          coreAjaxLoading.hide();
        }

        coreRequest.isRequest = false;
        var msg = 'code:' + request.status + '\n' + 'message:' + request.responseText + '\n' + 'error:' + error;
        // console.debug(msg);
        if (request.status == '401') {
          //HttpServletResponse.SC_UNAUTHORIZED
          coreCommon.href('/system/error/logout');
        } else if (request.status == '403') {
          //HttpServletResponse.SC_FORBIDDEN
          coreCommon.href('/system/error/denied');
        } else if (typeof errorCallBack === 'function') {
          errorCallBack(msg);
        } else {
          if (request.responseText.indexOf('<!DOCTYPE html>') != -1) {
            coreCommon.href('/');
          } else {
            let errMessage = '';
            if (S2Util.isJSON(request.responseText)) {
              const obj = JSON.parse(request.responseText);
              errMessage = obj.msg;
            } else {
              errMessage = request.responseText;
            }
            coreDialog.alert(errMessage && typeof errMessage === 'string' ? errMessage.replace('S2Message:', '') : errMessage);
          }
        }
        delete this.postAjaxObj;
      }
    });
  },
  //통신후 응답 status 성공여부 판단
  isSuccess: function (status) {
    return status == 'SUCCESS';
  },
  //Private 실제  전송함수 - 직접호출해서 쓰지 말자!
  reqAjaxSingleton: function (method, actionURL, reqData, loadingMsg, successCallBack, failCallBack, errorCallBack) {
    //var secToken = $("meta[name='_csrf']").attr("content");
    //var secHeader = $("meta[name='_csrf_header']").attr("content");

    $.ajax({
      type: method,
      dataType: 'json',
      url: actionURL,
      data: reqData,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('AJAX', true);
        xhr.setRequestHeader('X-S2-Request', 's2-ajax');
        //xhr.setRequestHeader(secHeader, secToken);
      },
      success: function (data) {
        if (coreRequest.isSuccess(data.status.result)) {
          if (typeof successCallBack === 'function') {
            successCallBack(coreRequest.nullToEmpty(data, {}));
          }
        } else {
          if (typeof failCallBack === 'function') {
            failCallBack(data);
          } else {
            coreDialog.alert(data.status.message);
          }
        }
      },
      error: function (request, status, error) {
        if (request.status == '401') {
          //HttpServletResponse.SC_UNAUTHORIZED
          coreCommon.href('/system/error/logout');
        } else if (request.status == '403') {
          //HttpServletResponse.SC_FORBIDDEN
          coreCommon.href('/system/error/denied');
        } else if (typeof errorCallBack === 'function') {
          errorCallBack(msg);
        } else {
          if (request.responseText.indexOf('<!DOCTYPE html>') != -1) {
            coreCommon.href('/');
          } else {
            if (S2Util.isJSON(request.responseText)) {
              const obj = JSON.parse(request.responseText);
              coreDialog.alert(obj.msg);
            } else {
              coreDialog.alert(request.responseText);
            }
          }
        }
      }
    });
  }
};
