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
    alertOK: 'OK',
    confirmTitle: 'Confirm',
    confirmOK: 'OK',
    confirmCancel: 'Cancel',

    alert: function (msg, callback, options) {
        var defaults = {title: coreDialog.alertTitle, ok: coreDialog.alertOK, size: 'small'};
        var settings = $.extend({}, defaults, options);
        bootbox
            .alert({
                size: settings.size,
                title: '<span class="icon fas fa-exclamation-triangle"></span> ' + settings.title,
                message: msg
                    ? msg
                          .replace(/S2Exception:/, '')
                          .replace(/S2RuntimeException:/, '')
                          .replace(/\n/g, '<br/>')
                    : msg,
                onEscape: false,
                className: 'core-dialog',
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
            className: 'core-dialog',
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
