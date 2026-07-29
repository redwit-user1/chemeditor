/**
 * @Class Name : EgovUnitTop.jsp
 * @Description : 상단 헤더 영역 ( 세션 만료기간 )
 * @Modification Information
 *
 * @수정일               수정자            수정내용
 *  ----------   --------   ---------------------------
 *  2020.06.23   신용호            세션만료시간 보여주기
 *  2022.12.01   Goono          jsp -> js 변경
 *  @author 공통서비스 개발팀 신용호
 *  @since 2009.03.03
 *  @version 1.0
 *  @see
 *
 *  Copyright (C) 2009 by MOPAS  All right reserved.
 */

var eGovUnitTop = {
    objLeftTime: null,
    latestTime: null,
    expireTime: null,
    timeInterval: 1000, // 1초 간격 호출
    firstLocalTime: 0,
    elapsedLocalTime: 0,
    stateExpiredTime: false,
    timer: null,

    getCookie: function (cname) {
        var name = cname + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },

    pad: function (n, width) {
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
    },

    init: function () {
        eGovUnitTop.objLeftTime = document.getElementById('leftTimeInfoEgovUnitTop');

        if (eGovUnitTop.objLeftTime == null) {
            coreDialog.alert("'leftTimeInfoEgovUnitTop' ID is not exist!");
            return;
        }

        eGovUnitTop.latestTime = eGovUnitTop.cleanupValue(eGovUnitTop.getCookie('egovLatestServerTime'));
        eGovUnitTop.expireTime = eGovUnitTop.cleanupValue(eGovUnitTop.getCookie('egovExpireSessionTime'));

        eGovUnitTop.elapsedTime = 0;
        eGovUnitTop.firstLocalTime = new Date().getTime();
        eGovUnitTop.showRemaining();

        eGovUnitTop.timer = setInterval(eGovUnitTop.showRemaining, eGovUnitTop.timeInterval); // 1초 간격 호출
    },

    showRemaining: function () {
        //console.debug('showRemaining');
        eGovUnitTop.elapsedLocalTime = new Date().getTime() - eGovUnitTop.firstLocalTime;

        var timeRemaining = eGovUnitTop.expireTime - eGovUnitTop.latestTime - eGovUnitTop.elapsedLocalTime;

        if (timeRemaining < eGovUnitTop.timeInterval) {
            clearInterval(eGovUnitTop.timer);
            eGovUnitTop.objLeftTime.innerHTML = '00:00:00';
            eGovUnitTop.stateExpiredTime = true;
            //로그아웃 처리
            var postUrl = '/api/system/login/logout?fail=stimeout';
            coreCommon.href(postUrl);
            return;
        }
        var timeHour = Math.floor(timeRemaining / 1000 / 60 / 60);
        var timeMin = Math.floor((timeRemaining / 1000 / 60) % 60);
        var timeSec = Math.floor((timeRemaining / 1000) % 60);
        //objLeftTime.textContent = pad(timeHour,2) +":"+ pad(timeMin,2) +":"+ pad(timeSec,2);
        //objLeftTime.outerText = pad(timeHour,2) +":"+ pad(timeMin,2) +":"+ pad(timeSec,2);
        eGovUnitTop.objLeftTime.innerHTML = eGovUnitTop.pad(timeHour, 2) + ':' + eGovUnitTop.pad(timeMin, 2) + ':' + eGovUnitTop.pad(timeSec, 2);
        //console.debug("call showRemaining() = "+objLeftTime.innerHTML);
    },
    reqTimeAjax: function () {
        if (eGovUnitTop.stateExpiredTime == true) {
            //coreDialog.alert('시간을 연장할수 없습니다.');
            coreDialog.alert('Time cannot be extended.');
            return;
        }

        var postUrl = '/api/egov/uat/uia/refreshSessionTimeout';
        var postData = {};
        //var postMsg  = '데이터요청중입니다.잠시만 기다려주세요.';
        var postMsg = 'Requesting data. Please wait.';
        ajaxPostSingleton(postUrl, postData, postMsg, function (res) {
            //서버로부터 정상적으로 응답이 왔을 때 실행
            eGovUnitTop.latestTime = eGovUnitTop.cleanupValue(eGovUnitTop.getCookie('egovLatestServerTime'));
            eGovUnitTop.expireTime = eGovUnitTop.cleanupValue(eGovUnitTop.getCookie('egovExpireSessionTime'));
            eGovUnitTop.init();
        });

        return false;
    },
    cleanupValue: function (value) {
        if (value && isNaN(value) && value.indexOf('==#)') !== -1) {
            return value.split('==#)').pop();
        } else {
            return value;
        }
    },
};
