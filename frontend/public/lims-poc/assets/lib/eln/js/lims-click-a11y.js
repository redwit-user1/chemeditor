/*
 * onclick 을 단 div·span·li 를 키보드로도 누를 수 있게 한다.
 *
 * 실측(24화면): 눌리는데 Tab 이 못 가는 것 80개.
 *   프로젝트 이름 · 노트 제목 · 화합물 카드 · 공지 목록 줄 · 요약 카드 ·
 *   좌측 목록의 접기 머리 · 폴더 이름.
 *
 * 전부 마우스로만 쓸 수 있었다. 목록에서 노트를 여는 것이 이 제품의 주된
 * 동작인데 키보드로는 도달할 방법이 없다 — 화면 낭독기에는 아예 존재하지
 * 않는 것으로 읽힌다(role 도 없다).
 *
 * 마크업 80곳을 고치지 않고 여기서 채우는 이유는 모달 때(lims-modal-a11y.js)
 * 와 같다: 카드·표의 줄들은 대부분 검색 결과로 나중에 그려진다. 마크업만
 * 고치면 그때 그려지는 것들은 다시 빠진다.
 *
 * 하는 일은 셋뿐이다.
 *   1) tabindex="0" — Tab 이 닿게
 *   2) role — 눌러서 다른 화면으로 가면 link, 그 자리에서 무언가 하면 button.
 *      onclick 안에 이동 함수가 있는지로 가른다. 둘을 뭉뚱그리면 낭독기가
 *      "버튼"이라 읽고 사용자는 화면이 바뀔 줄 모른다.
 *   3) Enter/Space 로 click 을 부른다. 마우스와 같은 경로를 타야 동작이
 *      갈라지지 않으므로 onclick 을 직접 부르지 않고 click 을 일으킨다.
 *
 * 이미 초점을 받을 수 있는 것(a[href]·button·input…)과 스스로 tabindex 를
 * 가진 것은 건드리지 않는다. 서드파티 위젯 안도 손대지 않는다.
 */
(function () {
  'use strict';

  var NATIVE = { A: 1, BUTTON: 1, INPUT: 1, SELECT: 1, TEXTAREA: 1 };
  /* 화면을 옮기는 호출들. 프로젝트 안에서 실제로 쓰는 이름만 적는다. */
  var NAV = /coreCommon\.href|location\.href|window\.open|goPage|\bgo[A-Z]\w*\(/;
  var SKIP = '.ck, .ketcher, #ketcher-root, .katex, .rw-editor-ai';

  function fix(el) {
    if (!el || el.nodeType !== 1) { return; }
    if (NATIVE[el.tagName]) { return; }
    if (el.hasAttribute('tabindex')) { return; }
    if (el.closest && el.closest(SKIP)) { return; }
    /* 부모가 이미 같은 동작을 갖고 있으면 초점 자리가 둘로 늘어난다 */
    if (el.parentElement && el.parentElement.closest('[onclick]')) { return; }
    if (el.getAttribute('aria-hidden') === 'true') { return; }

    el.setAttribute('tabindex', '0');
    if (!el.getAttribute('role')) {
      el.setAttribute('role', NAV.test(el.getAttribute('onclick') || '') ? 'link' : 'button');
    }
  }

  function scan(root) {
    var list = (root || document).querySelectorAll('[onclick]');
    for (var i = 0; i < list.length; i++) { fix(list[i]); }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') { return; }
    var el = e.target;
    if (!el || NATIVE[el.tagName]) { return; }          /* 기본 동작이 이미 있다 */
    if (!el.hasAttribute('onclick')) { return; }
    if (el.getAttribute('tabindex') !== '0') { return; }
    /* Space 는 눌린 상태에서 화면이 스크롤된다 — 누른 것을 실행할 참이면 막는다 */
    e.preventDefault();
    el.click();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { scan(document); });
  } else {
    scan(document);
  }

  /* 검색 결과·카드 목록은 나중에 붙는다 */
  if (window.MutationObserver) {
    new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          var n = added[j];
          if (n.nodeType !== 1) { continue; }
          if (n.hasAttribute && n.hasAttribute('onclick')) { fix(n); }
          if (n.querySelectorAll) { scan(n); }
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
