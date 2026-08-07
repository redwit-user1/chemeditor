/**
 * 공통 다이얼로그 메시지
 * @author GOONO
 * @since  2021
 * @version 1.0
 * @see
 * Copyright (C)  All right reserved.
 */

var coreDialog = {
    alertTitle: 'Warning',
    alertOkTitle: 'Done',
    alertOK: 'OK',
    confirmTitle: 'Confirm',
    confirmOK: 'OK',
    confirmCancel: 'Cancel',

    /*
        알림 상자의 머리 아이콘.

        예전에는 무조건 빨간 경고 삼각형이었다. "정상 처리되었습니다." 에도
        경고가 붙어, 성공했는데 뭔가 잘못된 것처럼 읽혔다. 뜻이 반대인 아이콘은
        문구보다 먼저 눈에 들어오므로 그냥 잘못 읽힌다.

        말뭉치를 뒤져 짐작하지 않는다 — 화면이 실제로 쓰는 성공 메시지
        (i18n.common.success 등)와 글자 그대로 비교한다. 그래야 언어가 바뀌어도
        같이 맞고, 비슷한 낱말이 든 실패 문구를 성공으로 오인하지 않는다.
        options.type 으로 부르는 쪽이 직접 정할 수도 있다.
    */
    okMessageKeys: ['i18n.common.success', 'i18n.common.save.ok', 'i18n.common.download.ok'],

    alertTone: function (msg, type) {
        if (type === 'ok' || type === 'warn') return type;
        var dict = (typeof window !== 'undefined' && window.i18n) || {};
        var text = String(msg == null ? '' : msg).trim();
        for (var i = 0; i < coreDialog.okMessageKeys.length; i++) {
            var known = dict[coreDialog.okMessageKeys[i]];
            if (known && String(known).trim() === text) return 'ok';
        }
        return 'warn';
    },

    alert: function (msg, callback, options) {
        var defaults = {title: coreDialog.alertTitle, ok: coreDialog.alertOK, size: 'small'};
        var settings = $.extend({}, defaults, options);
        var tone = coreDialog.alertTone(msg, settings.type);
        var toneIcon = tone === 'ok' ? 'fa-circle-check' : 'fa-exclamation-triangle';
        var toneTitle = tone === 'ok' ? (settings.okTitle || coreDialog.alertOkTitle) : settings.title;
        bootbox
            .alert({
                size: settings.size,
                title: '<span class="icon fas ' + toneIcon + ' is-' + tone + '"></span> ' + toneTitle,
                message: msg
                    ? msg
                          .replace(/S2Exception:/, '')
                          .replace(/S2RuntimeException:/, '')
                          .replace(/\n/g, '<br/>')
                    : msg,
                onEscape: false,
                className: 'core-dialog core-dialog-' + tone + ' ',
                centerVertical: true,
                buttons: {
                    ok: {
                        label: '<i class="fa fa-check"></i> ' + settings.ok,
                        className: 'btn-xs btn-outline-primary '
                    }
                },
                callback: callback
            })
            .init(function () {
                $('.bootbox').find('.btn.btn-outline-primary').text(settings.ok).addClass('btn-xs');
                $('.bootbox').find('.bootbox-close-button').addClass('btn-xs');
            });

        $('.core-dialog').draggable({handle: '.modal-header'});
    },
    confirm: function (msg, callback, options) {
        var defaults = {title: coreDialog.confirmTitle, cancel: coreDialog.confirmCancel, ok: coreDialog.confirmOK, okClass: 'btn-outline-primary'};
        var settings = $.extend({}, defaults, options);

        if (options) {
            msg = options.subTitle ? '<div class="ma-b10"><b>' + options.subTitle + '\n' + '</b></div>' + msg : msg;
        }

        bootbox.confirm({
            size: 'small',
            title: settings.title,
            message: msg
                ? msg
                      .replace(/S2Exception:/, '')
                      .replace(/S2RuntimeException:/, '')
                      .replace(/\n/g, '<br/>')
                : msg,
            swapButtonOrder: true,
            className: 'core-dialog core-dialog-confirm',
            centerVertical: true,
            buttons: {
                cancel: {
                    //label: '<i class="fa fa-times"></i> ' + settings.cancel,
                    //className: 'btn-xs btn-outline-secondary '
                    label: settings.cancel,
                    className: 'btn-xs button-sty02-gray '
                },
                confirm: {
                    //label: '<i class="fa fa-check"></i> ' + settings.ok,
                    label: settings.ok,
                    className: 'btn-xs ' + settings.okClass
                }
            },
            callback: function (result) {
                callback(result);
            }
        });

        $('.core-dialog').draggable({handle: '.modal-header'});
    }
};
