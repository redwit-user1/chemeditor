/*
 * 목록이 못 불러왔을 때 화면에 남는 말.
 *
 * 실측(목록 10화면): 오류 분기 0개. 전부 성공만 그린다.
 * 요청이 실패하면 공통 처리기가 알림창 하나를 띄우고 사라지는데, 그 알림에
 * 들어가는 글은 서버 응답 원문(request.responseText)이다. 스택 트레이스가
 * 그대로 뜨거나, 본문이 비면 빈 창이 뜬다. 창을 닫고 나면 표는 아무 말도
 * 하지 않는 채로 남는다 — 결과가 없는 것인지 못 불러온 것인지 구분할 방법이
 * 화면에 없다. 이 둘은 사용자가 할 일이 정반대다(검색어를 바꾼다 / 다시 시도).
 *
 * 그래서 표 자리에 상태를 남긴다. 빈 상태(tr.emptymessage)와 같은 자리·같은
 * 규격을 쓰되, 왜 비었는지와 무엇을 하면 되는지를 적는다.
 */
(function (w) {
  'use strict';

  /* 표의 열 수 — colspan 을 화면마다 손으로 세면 열이 하나 늘 때마다 틀어진다 */
  function colCount($table) {
    var $th = $table.find('thead tr').first().children();
    return $th.length || $table.find('tbody tr').first().children().length || 1;
  }

  /*
   * limsListError(targetSelector, retryFn)
   *   ajaxPost 의 여섯 번째 인자(errorCallBack)로 그대로 넘긴다.
   *   ajaxPost(url, params, msg, onOk, null, limsListError('.sample-info-list', getSampleList))
   */
  w.limsListError = function (targetSelector, retryFn) {
    return function (detail) {
      /* 기술적인 내용은 개발자 도구로. 사용자에게는 할 일을 적는다. */
      if (w.console && w.console.error) { w.console.error('[목록 조회 실패] ' + targetSelector + '\n' + detail); }

      var $table = w.jQuery(targetSelector).find('table').first();
      if (!$table.length) { return; }
      var $tbody = $table.find('tbody').empty();

      var $td = w.jQuery('<td></td>')
        .addClass('text-center')
        .attr('colspan', colCount($table));

      $td.append(w.jQuery('<span></span>').text('목록을 불러오지 못했습니다.'));

      if (typeof retryFn === 'function') {
        $td.append(
          w.jQuery('<button></button>')
            .addClass('button-gray-line-sty01 ma-l10')
            .attr('type', 'button')
            .on('click', function () { retryFn(1); })
            .append(w.jQuery('<span></span>').text('다시 시도')));
      }

      $tbody.append(w.jQuery('<tr></tr>').addClass('emptymessage is-error').append($td));

      /* 페이지 번호는 남겨 두면 거짓말이 된다 */
      w.jQuery(targetSelector).find('.paging-box').empty();
    };
  };
})(window);
