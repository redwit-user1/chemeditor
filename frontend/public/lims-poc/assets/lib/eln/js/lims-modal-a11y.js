/*
 * 모달을 키보드로 쓸 수 있게 한다.
 *
 * 실측(모달 36개): 36개 전부 키보드로 쓸 수 없었다.
 *   - 열어도 초점이 모달 안으로 들어오지 않는다
 *   - Tab 을 누르면 초점이 모달 밖 화면으로 새어 나간다
 *   - Esc 로 닫히지 않는다
 *   - 화면 낭독기에 창 이름이 안 읽힌다(aria-labelledby 없음)
 *
 * 원인은 하나였다. 마크업의 모달 루트 116개 중 tabindex="-1" 을 가진 것이
 * 0개다. 부트스트랩은 모달을 열 때 루트 요소에 .focus() 를 부르는데,
 * tabindex 가 없으면 그 요소는 초점을 받을 수 없어 호출이 조용히 실패한다.
 * 그러면 이어지는 것이 전부 무너진다 —
 *   초점이 안 들어감 → 부트스트랩의 초점 가둠(FocusTrap)이 되돌릴 기준을
 *   못 잡음 → Tab 이 샘. Esc 처리기는 모달 요소에 걸려 있는데 초점이 밖에
 *   있으니 keydown 이 거기 닿지 않음 → Esc 무반응.
 * 속성 하나가 빠져서 네 가지가 한꺼번에 죽어 있었다.
 *
 * 마크업 116곳을 고치는 대신 여기서 한 번에 채운다. 나중에 붙는 모달
 * (검색 결과로 그려지는 것들)까지 같은 규칙을 받게 하려면 이쪽이 맞다.
 *
 * Esc 에 대해: 마크업 109곳이 data-bs-keyboard="false" 다. backdrop:static
 * 과 짝으로 복사돼 온 값이고, 모달마다 따로 판단한 흔적이 없다. 이 모달들은
 * 전부 눈에 보이는 취소/닫기 버튼을 갖고 있으니 Esc 는 그 버튼의 키보드
 * 짝이다. 기본으로 닫히게 하되, 정말 막아야 하는 창은
 * data-lims-keyboard="false" 로 개별 표시한다.
 */
(function () {
	'use strict';

	var FOCUSABLE = [
		'input:not([type=hidden]):not([disabled]):not([readonly])',
		'select:not([disabled])',
		'textarea:not([disabled]):not([readonly])',
		'button:not([disabled])',
		'a[href]',
		'[tabindex]:not([tabindex="-1"])',
	].join(', ');

	var lastFocused = null;
	var seq = 0;

	/* 부트스트랩이 .focus() 를 부를 수 있게 미리 채워 둔다 */
	function prepare(m) {
		if (!m || m.__limsA11y) return;
		m.__limsA11y = true;
		if (!m.hasAttribute('tabindex')) m.setAttribute('tabindex', '-1');
	}

	function prepareAll(root) {
		var list = (root || document).querySelectorAll ? (root || document).querySelectorAll('.modal') : [];
		for (var i = 0; i < list.length; i++) prepare(list[i]);
	}

	function visible(e) {
		return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
	}

	/* 창 이름 — 내용이 나중에 그려지므로 열린 뒤에 붙인다 */
	function label(m) {
		var t = m.querySelector('.modal-title');
		if (!t) return;
		if (!t.id) t.id = 'lims-modal-title-' + ++seq;
		m.setAttribute('aria-labelledby', t.id);
	}

	/*
	 * 처음 초점을 어디에 둘 것인가.
	 * 입력이 있는 창이면 첫 입력칸이다 — 열자마자 타자를 칠 수 있어야 한다.
	 * 읽기만 하는 창이면 창 자신에 둔다. 닫기 버튼에 두면 Enter 한 번에
	 * 창이 닫혀 버린다.
	 */
	function focusFirst(m) {
		var body = m.querySelector('.modal-body') || m;
		var fields = body.querySelectorAll('input:not([type=hidden]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]):not([readonly])');
		for (var i = 0; i < fields.length; i++) {
			if (visible(fields[i])) { fields[i].focus(); return; }
		}
		m.focus();
	}

	function topmostOpen() {
		var open = document.querySelectorAll('.modal.show');
		var best = null, bestZ = -Infinity;
		for (var i = 0; i < open.length; i++) {
			var z = parseInt(window.getComputedStyle(open[i]).zIndex, 10);
			if (!isFinite(z)) z = 0;
			if (z >= bestZ) { bestZ = z; best = open[i]; }
		}
		return best;
	}

	function hide(m) {
		if (window.bootstrap && window.bootstrap.Modal) {
			var inst = window.bootstrap.Modal.getInstance(m);
			if (inst) { inst.hide(); return true; }
		}
		var btn = m.querySelector('[data-bs-dismiss="modal"], .btn-close, .modal-close');
		if (btn) { btn.click(); return true; }
		return false;
	}

	document.addEventListener('show.bs.modal', function (ev) {
		lastFocused = document.activeElement;
		prepare(ev.target);
	});

	/*
	 * 내용이 나중에 오는 창이 있다. 열림(shown)이 먼저 끝나고 ajax 응답이
	 * 그 뒤에 .modal-content 를 채운다. 그 순간에는 제목도 입력칸도 없어서
	 * 이름을 붙일 것도, 초점을 둘 곳도 없다.
	 * 그래서 한 번 더 기다린다 — 내용이 들어오면 그때 붙인다.
	 */
	var pending = null;

	function settle(m) {
		label(m);
		var body = m.querySelector('.modal-body') || m;
		var has = body.querySelector(FOCUSABLE);
		if (has || m.querySelector('.modal-title')) { focusFirst(m); return true; }
		return false;
	}

	function stopPending() {
		if (pending) { pending.disconnect(); pending = null; }
	}

	document.addEventListener('shown.bs.modal', function (ev) {
		var m = ev.target;
		prepare(m);
		m.focus();              // 내용이 비어 있어도 일단 창 안으로 — 초점 가둠의 기준점
		stopPending();
		if (settle(m)) return;

		if (!window.MutationObserver) return;
		pending = new MutationObserver(function () {
			if (settle(m)) stopPending();
		});
		pending.observe(m, { childList: true, subtree: true });
		// 응답이 영영 안 와도 관찰자가 남지 않게 한다
		setTimeout(stopPending, 4000);
	});

	/* 닫으면 열었던 자리로 돌아간다 — 안 돌아가면 목록 처음부터 다시 Tab 해야 한다 */
	document.addEventListener('hidden.bs.modal', function () {
		stopPending();
		if (lastFocused && document.contains(lastFocused) && visible(lastFocused)) {
			try { lastFocused.focus(); } catch (e) { /* 사라진 요소 */ }
		}
		lastFocused = null;
	});

	document.addEventListener('keydown', function (ev) {
		if (ev.key !== 'Escape' && ev.key !== 'Esc') return;
		var m = topmostOpen();
		if (!m) return;
		if (m.getAttribute('data-lims-keyboard') === 'false') return;
		if (hide(m)) ev.preventDefault();
	});

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () { prepareAll(document); });
	} else {
		prepareAll(document);
	}

	/* 나중에 붙는 모달 */
	if (window.MutationObserver) {
		new MutationObserver(function (recs) {
			for (var i = 0; i < recs.length; i++) {
				var added = recs[i].addedNodes;
				for (var j = 0; j < added.length; j++) {
					var n = added[j];
					if (n.nodeType !== 1) continue;
					if (n.classList && n.classList.contains('modal')) prepare(n);
					prepareAll(n);
				}
			}
		}).observe(document.documentElement, { childList: true, subtree: true });
	}
})();
