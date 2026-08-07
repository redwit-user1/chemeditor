/*
  상세검색 패널 안에서 또 열리는 드롭다운들.

  패널(#dropdown_search)에는 카테고리·참여자·부서·기간 네 개의 토글이 2×2 로
  놓이고, 각자의 판이 자기 토글 바로 아래에 절대 위치로 뜬다. 판은 패널보다
  크다 — 그래서 열려 있는 동안 옆 버튼과 아래 [검색] 버튼을 덮는다.

  덮인 버튼은 눌리지 않는다. 실제로 그랬다:
    · 카테고리를 열어 둔 채 [부서정보]를 누르면 카테고리 트리가 클릭을 먹는다.
    · 참여자에서 [선택]을 누른 뒤 패널의 [검색]을 누르면 참여자 판이 가로챈다.
  둘 다 "버튼이 고장났다"로 읽히지만, 원인은 위에 떠 있는 판이다.

  두 가지만 한다.
    1) 패널 안에서 하나가 열리면 나머지는 닫는다. (동시에 둘이 뜰 이유가 없다)
    2) 판 안의 [선택]을 누르면 그 판을 닫는다. 고르는 일이 끝났기 때문이다.

  판을 없애거나 크기를 줄이지 않는다 — 기간의 달력, 참여자의 결과 목록은
  그만한 자리가 필요하고, 그걸 패널 안으로 우겨 넣으면 예전처럼 잘린다.
*/
(function () {
  'use strict';

  var PANEL = '.dropdown-menu[id^="dropdown_search"], #dropdown_search';
  var TOGGLE = '[data-bs-toggle="dropdown"]';

  function panelOf(el) {
    return el && el.closest ? el.closest(PANEL) : null;
  }

  function hideDropdown(toggle) {
    if (!toggle) return;
    if (window.bootstrap && window.bootstrap.Dropdown) {
      var inst = window.bootstrap.Dropdown.getInstance(toggle);
      if (inst) { inst.hide(); return; }
    }
    if (window.jQuery && window.jQuery.fn.dropdown) {
      window.jQuery(toggle).dropdown('hide');
      return;
    }
    /* 마지막 수단 — 부트스트랩이 붙기 전이라도 화면은 닫혀야 한다 */
    toggle.setAttribute('aria-expanded', 'false');
    toggle.classList.remove('show');
    var menu = toggle.nextElementSibling;
    if (menu && menu.classList.contains('dropdown-menu')) menu.classList.remove('show');
  }

  /* 1) 같은 패널 안에서는 하나만 */
  document.addEventListener('show.bs.dropdown', function (ev) {
    var opening = ev.target;
    var panel = panelOf(opening);
    if (!panel) return;
    panel.querySelectorAll(TOGGLE).forEach(function (t) {
      if (t !== opening && t.getAttribute('aria-expanded') === 'true') hideDropdown(t);
    });
  }, true);

  /* 2) 고르기가 끝나면 그 판은 닫는다 */
  document.addEventListener('click', function (ev) {
    var btn = ev.target && ev.target.closest && ev.target.closest('.dropdown-menu .button-search');
    if (!btn) return;
    var menu = btn.closest('.dropdown-menu');
    if (!menu || !panelOf(menu)) return;
    var id = menu.getAttribute('aria-labelledby');
    var toggle = id ? document.getElementById(id) : menu.previousElementSibling;
    /* 화면 쪽 onclick(selectSearchFilter)이 먼저 끝나게 한 박자 뒤에 닫는다 */
    setTimeout(function () { hideDropdown(toggle); }, 0);
  }, false);
})();
