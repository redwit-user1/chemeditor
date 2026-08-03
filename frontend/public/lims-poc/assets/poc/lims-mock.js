/*
 * LIMS PoC — 서버 대역(mock)
 *
 * 화면 코드는 한 줄도 바꾸지 않는다. 실서비스와 같은 화면을 보여주는 것이 목적이므로,
 * 템플릿·CSS·JS 를 그대로 두고 그 아래 HTTP 계층만 갈아끼운다.
 * 가로채는 지점은 jQuery $.ajax 하나다 — core.request.js 의 reqAjax/nullToEmpty/
 * isRequest/에러 분기까지 전부 원본 그대로 지나간다.
 *
 * 응답은 실제 컨트롤러와 같은 봉투({status:{result:'SUCCESS'}, ...})로 만든다.
 * 배열을 그대로 돌려주는 것도 의도한 것이다 — nullToEmpty 가 숫자키 객체로 바꾸는
 * 실제 동작까지 재현해야 화면의 Object.keys(...) 분기가 실서비스와 같이 돈다.
 */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     페이지 이동 — 프로토타입은 정적 파일이라 서버 라우트가 없다.
  --------------------------------------------------------------- */
  /*
    라우트 표는 손으로 적지 않는다. mkfixtures.py 가 PAGES 에서 만든 것을
    빌드 때 그대로 심는다(assets/poc/routes.js). 두 벌로 두면 화면을 늘릴 때마다
    한쪽만 고쳐져 "메뉴를 눌러도 아무 데도 안 간다"가 조용히 생긴다.
  */
  var ROUTES = window.LIMS_POC_ROUTES || {};

  function decodeParam(v) {
    if (!v) return '';
    try { return decodeURIComponent(String(v).replace(/\+/g, ' ')); } catch (e) { return String(v); }
  }

  /* 지금 열려 있는 화면의 프로젝트. 프로젝트 상세는 폴더 요소에 그 값을 달고 있다. */
  function currentProjectMno() {
    var el = document.querySelector('[data-project-mno].active, .folder-element[data-project-mno]');
    if (el) return Number(el.getAttribute('data-project-mno'));
    var input = document.querySelector('#schProjectMno, [name=schProjectMno]');
    return input && input.value ? Number(input.value) : null;
  }

  /* 새 창으로 여는 화면 — 노트 전용 레이아웃(GNB·헤더 없음)을 쓰는 것들이다. */
  var NEW_WINDOW_PAGES = ['note_write.html'];

  function toStaticUrl(url) {
    if (!url) return null;
    var path = String(url).split('?')[0];
    return Object.prototype.hasOwnProperty.call(ROUTES, path) ? ROUTES[path] : null;
  }

  /* ---------------------------------------------------------------
     고정 데이터 — 기획서/DDL 의 코드값을 그대로 쓴다.
  --------------------------------------------------------------- */
  /*
    검색 필터.

    지금까지 목은 어떤 조건이 와도 같은 목록을 돌려줬다. 그래서 시연 중에 유형이나
    상태를 골라도 화면이 그대로여서 "필터가 안 먹는다"로 보였다.
    서버가 하는 일을 그대로 흉내내지는 못하지만, 화면에 있는 조건만큼은 실제로
    걸리게 한다 — 눌렀을 때 목록이 바뀌는 것이 시연에서 중요한 사실이다.

    spec: { 파라미터명: 'field' }            → 정확히 일치
           { 파라미터명: ['f1','f2'] }        → 여러 필드 중 하나에 부분 일치(키워드)
  */
  function applyFilter(list, params, spec) {
    return list.filter(function (row) {
      for (var key in spec) {
        var want = params[key];
        if (want === undefined || want === null || want === '') {
          continue;
        }
        var target = spec[key];
        if (Object.prototype.toString.call(target) === '[object Array]') {
          var hit = target.some(function (f) {
            return String(row[f] === undefined || row[f] === null ? '' : row[f])
              .toLowerCase().indexOf(String(want).toLowerCase()) >= 0;
          });
          if (!hit) return false;
        } else if (String(row[target] === undefined || row[target] === null ? '' : row[target])
            !== String(want)) {
          return false;
        }
      }
      return true;
    });
  }

  function page(list, pageNo, unit) {
    var no = Number(pageNo) || 1;
    var per = Number(unit) || 10;
    var last = Math.max(1, Math.ceil(list.length / per));
    return {
      dataList: list.slice((no - 1) * per, no * per),
      totalCount: list.length,
      totalRecordCount: list.length,
      pageNo: no,
      pageUnit: per,
      firstPageNoOnPageList: 1,
      lastPageNoOnPageList: last,
      lastPageNo: last,
      firstIndex: (no - 1) * per
    };
  }

  /* 시연 로그인 사용자. mkfixtures 의 loginUserNm 과 같은 값이어야 화면의
     "승인자 ≠ 입력자" 판단과 목의 판단이 어긋나지 않는다. */
  var POC_ME = '김연구';

  /* 목에는 시계가 없다. 화면에 찍히는 시각이 매번 달라지면 스크린샷 비교가
     흔들리므로, 실제 시각 대신 데모 기준 시각에서 분만 늘린다. */
  var stampSeq = 0;
  function stampNow() {
    stampSeq += 1;
    var mm = 30 + stampSeq;
    return '2026-07-31 10:' + (mm < 10 ? '0' + mm : mm);
  }

  function findReview(resultMno) {
    for (var i = 0; i < REVIEWS.length; i++) {
      if (String(REVIEWS[i].resultMno) === String(resultMno)) { return REVIEWS[i]; }
    }
    return null;
  }

  /* 승인 결과가 들어갈 연구노트. 시료 → 프로젝트 → 그 프로젝트의 작성중 노트. */
  function noteForSample(sampleMno) {
    var sample = SAMPLES.filter(function (s) {
      return String(s.sampleMno) === String(sampleMno);
    })[0];
    if (!sample) { return null; }
    var notes = ELN_NOTES.filter(function (n) {
      return String(n.projectMno) === String(sample.projectMno);
    });
    if (!notes.length) { return null; }

    /* 완료된 노트에 결과를 덧붙이면 안 된다 — 작성중인 것만 후보다. */
    var writing = notes.filter(function (n) { return n.writeStatusCcd === 'WRITING'; });
    if (!writing.length) { return null; }

    /* 같은 화합물을 다루는 노트를 먼저 고른다. 시료명이 'KM00003710 합성 원료'
       라면 'KM00003710 …' 노트로 가야 한다 — 프로젝트가 같다는 이유만으로
       엉뚱한 노트에 결과가 붙으면 기록이 거짓이 된다. */
    var regId = (sample.sampleNm || '').match(/KM\d{8}/);
    if (regId) {
      var same = writing.filter(function (n) {
        return (n.noteNm || '').indexOf(regId[0]) >= 0;
      });
      if (same.length) { return same[0]; }
      /* 같은 화합물의 작성중 노트가 없으면 붙이지 않는다. 프로젝트가 같다는
         이유로 아무 노트에나 넣으면 그 기록은 거짓이 된다. */
      return null;
    }
    return writing[0];
  }

  /* 노트에 붙은 결과 기록. 연구노트 화면이 읽어 간다. */
  var NOTE_RESULT_LOG = [];

  var SAMPLES = [
    { sampleMno: 5001, sampleNo: 'SMP-20260712-001', sampleNm: 'KM00003710 합성 원료 (batch A)',
      sampleTpCcd: 'COMPOUND', sampleSrcCcd: 'INTERNAL', sampleStatusCcd: 'IN_TEST',
      projectMno: 301, projectNm: '표적단백질 저해제 발굴', receiveDt: '2026-07-12',
      aliquotCnt: 4, activeAliquotCnt: 3, depthNo: 1, parentSampleNo: null },
    { sampleMno: 5002, sampleNo: 'SMP-20260712-002', sampleNm: 'KM00003711 정제 분획 F-3',
      sampleTpCcd: 'COMPOUND', sampleSrcCcd: 'DERIVED', sampleStatusCcd: 'STORED',
      projectMno: 301, projectNm: '표적단백질 저해제 발굴', receiveDt: '2026-07-12',
      aliquotCnt: 2, activeAliquotCnt: 2, depthNo: 2, parentSampleNo: 'SMP-20260712-001' },
    { sampleMno: 5003, sampleNo: 'SMP-20260705-014', sampleNm: 'HepG2 세포용해물 (P12)',
      sampleTpCcd: 'BIO', sampleSrcCcd: 'INTERNAL', sampleStatusCcd: 'IN_TEST',
      projectMno: 302, projectNm: '간독성 스크리닝', receiveDt: '2026-07-05',
      aliquotCnt: 6, activeAliquotCnt: 4, depthNo: 1, parentSampleNo: null },
    { sampleMno: 5004, sampleNo: 'SMP-20260628-003', sampleNm: 'KM00003719 표준품',
      sampleTpCcd: 'COMPOUND', sampleSrcCcd: 'PURCHASE', sampleStatusCcd: 'STORED',
      projectMno: 303, projectNm: '시험법 검증 (KM-3719)', receiveDt: '2026-06-28',
      aliquotCnt: 1, activeAliquotCnt: 1, depthNo: 1, parentSampleNo: null },
    { sampleMno: 5005, sampleNo: 'SMP-20260601-009', sampleNm: 'KM00003722 안정성 검체',
      sampleTpCcd: 'COMPOUND', sampleSrcCcd: 'INTERNAL', sampleStatusCcd: 'TESTED',
      projectMno: 304, projectNm: '장기 안정성 시험', receiveDt: '2026-06-01',
      aliquotCnt: 8, activeAliquotCnt: 5, depthNo: 1, parentSampleNo: null },
    { sampleMno: 5006, sampleNo: 'SMP-20260520-002', sampleNm: 'KM00003701 폐기 검체',
      sampleTpCcd: 'COMPOUND', sampleSrcCcd: 'INTERNAL', sampleStatusCcd: 'DISPOSED',
      projectMno: 304, projectNm: '장기 안정성 시험', receiveDt: '2026-05-20',
      aliquotCnt: 2, activeAliquotCnt: 0, depthNo: 1, parentSampleNo: null }
  ];

  var LINEAGE = [
    { sampleMno: 5001, sampleNo: 'SMP-20260712-001', sampleNm: 'KM00003710 합성 원료 (batch A)',
      sampleTpCcd: 'COMPOUND', sampleStatusCcd: 'IN_TEST', depthNo: 1, activeAliquotCnt: 3 },
    { sampleMno: 5002, sampleNo: 'SMP-20260712-002', sampleNm: 'KM00003711 정제 분획 F-3',
      sampleTpCcd: 'COMPOUND', sampleStatusCcd: 'STORED', depthNo: 2, activeAliquotCnt: 2 },
    { sampleMno: 5007, sampleNo: 'SMP-20260713-005', sampleNm: 'KM00003711 재결정',
      sampleTpCcd: 'COMPOUND', sampleStatusCcd: 'STORED', depthNo: 3, activeAliquotCnt: 1 }
  ];

  var ALIQUOTS = [
    { aliquotMno: 61, aliquotNo: 'SMP-20260712-001-A01', aliquotTpCcd: 'ORIGINAL', vesselTpCcd: 'VIAL',
      amount: 250, unitCcd: 'mg', locationNm: '3층 시약실 > 냉동고 B > 1단', aliquotDt: '2026-07-12',
      aliquotStatusCcd: 'IN_USE', parentAliquotNo: null, childSampleNo: null },
    { aliquotMno: 62, aliquotNo: 'SMP-20260712-001-A02', aliquotTpCcd: 'SPLIT', vesselTpCcd: 'VIAL',
      amount: 50, unitCcd: 'mg', locationNm: '3층 시약실 > 냉동고 B > 1단', aliquotDt: '2026-07-13',
      aliquotStatusCcd: 'IN_USE', parentAliquotNo: 'SMP-20260712-001-A01', childSampleNo: null },
    { aliquotMno: 63, aliquotNo: 'SMP-20260712-001-A03', aliquotTpCcd: 'SPLIT', vesselTpCcd: 'TUBE',
      amount: 20, unitCcd: 'mg', locationNm: '2층 분석실 > 상온 선반 1', aliquotDt: '2026-07-14',
      aliquotStatusCcd: 'IN_USE', parentAliquotNo: 'SMP-20260712-001-A01', childSampleNo: null },
    { aliquotMno: 64, aliquotNo: 'SMP-20260712-001-A04', aliquotTpCcd: 'DERIVED', vesselTpCcd: 'VIAL',
      amount: 0, unitCcd: 'mg', locationNm: '3층 시약실 > 냉동고 B > 1단', aliquotDt: '2026-07-14',
      aliquotStatusCcd: 'DEPLETED', parentAliquotNo: 'SMP-20260712-001-A01', childSampleNo: 'SMP-20260712-002' }
  ];

  var WORKLIST = [
    { testItemMno: 8001, testReqstMno: 7001, testReqstNo: 'TR-20260713-02', testItemNm: 'HPLC 순도',
      methodNm: 'M-HPLC-001', methodVerNo: 3, planDe: '20260730', resultCnt: 1,
      sampleMno: 5001, sampleNo: 'SMP-20260712-001', sampleNm: 'KM00003710 합성 원료 (batch A)',
      testItemStatusCcd: 'IN_PROGRESS', testItemStatusCcdNm: '시험중', urgentYn: 'Y' },
    { testItemMno: 8002, testReqstMno: 7001, testReqstNo: 'TR-20260713-02', testItemNm: '수분 (KF)',
      methodNm: 'M-KF-004', methodVerNo: 1, planDe: '20260731', resultCnt: 0,
      sampleMno: 5001, sampleNo: 'SMP-20260712-001', sampleNm: 'KM00003710 합성 원료 (batch A)',
      testItemStatusCcd: 'ASSIGNED', testItemStatusCcdNm: '배정', urgentYn: 'N' },
    { testItemMno: 8003, testReqstMno: 7002, testReqstNo: 'TR-20260710-01', testItemNm: '잔류용매 (GC)',
      methodNm: 'M-GC-002', methodVerNo: 2, planDe: '20260728', resultCnt: 2,
      sampleMno: 5003, sampleNo: 'SMP-20260705-014', sampleNm: 'HepG2 세포용해물 (P12)',
      testItemStatusCcd: 'OOS_HOLD', testItemStatusCcdNm: '기준이탈', urgentYn: 'N' }
  ];

  var REQUESTS = [
    { testReqstMno: 7001, testReqstNo: 'TR-20260713-02', sampleMno: 5001, sampleNo: 'SMP-20260712-001',
      sampleNm: 'KM00003710 합성 원료 (batch A)', testPurposeCcd: 'RELEASE', testPurposeCcdNm: '출하',
      testReqstStatusCcd: 'IN_PROGRESS', testReqstStatusCcdNm: '시험중', hopeDe: '20260731',
      reqstUserNm: '김연구', itemCnt: 3, doneItemCnt: 1, waitingItemCnt: 1, oosItemCnt: 0, urgentYn: 'Y' },
    { testReqstMno: 7002, testReqstNo: 'TR-20260710-01', sampleMno: 5003, sampleNo: 'SMP-20260705-014',
      sampleNm: 'HepG2 세포용해물 (P12)', testPurposeCcd: 'STABILITY', testPurposeCcdNm: '안정성',
      testReqstStatusCcd: 'IN_PROGRESS', testReqstStatusCcdNm: '시험중', hopeDe: '20260728',
      reqstUserNm: '박연구', itemCnt: 2, doneItemCnt: 0, waitingItemCnt: 0, oosItemCnt: 1, urgentYn: 'N' },
    { testReqstMno: 7003, testReqstNo: 'TR-20260702-03', sampleMno: 5004, sampleNo: 'SMP-20260628-003',
      sampleNm: 'KM00003719 표준품', testPurposeCcd: 'VALIDATION', testPurposeCcdNm: '시험법 검증',
      testReqstStatusCcd: 'DONE', testReqstStatusCcdNm: '완료', hopeDe: '20260715',
      reqstUserNm: '김연구', itemCnt: 4, doneItemCnt: 4, waitingItemCnt: 0, oosItemCnt: 0, urgentYn: 'N' },
    { testReqstMno: 7004, testReqstNo: 'TR-20260729-01', sampleMno: 5002, sampleNo: 'SMP-20260712-002',
      sampleNm: 'KM00003711 정제 분획 F-3', testPurposeCcd: 'IPC', testPurposeCcdNm: '공정중',
      testReqstStatusCcd: 'REQUESTED', testReqstStatusCcdNm: '접수대기', hopeDe: '20260805',
      reqstUserNm: '이연구', itemCnt: 2, doneItemCnt: 0, waitingItemCnt: 2, oosItemCnt: 0, urgentYn: 'N' }
  ];

  var TEST_ITEMS = [
    { testItemMno: 8001, sortSn: 1, testItemNm: 'HPLC 순도', methodNm: 'M-HPLC-001', methodVerNo: 3,
      specNm: 'SPEC-3710-순도', specVerNo: 2, chargeUserNm: '김연구', planDe: '20260730',
      testItemStatusCcd: 'IN_PROGRESS', testItemStatusCcdNm: '시험중', resultCnt: 1,
      finalJudgeCcd: null, finalJudgeCcdNm: null },
    { testItemMno: 8002, sortSn: 2, testItemNm: '수분 (KF)', methodNm: 'M-KF-004', methodVerNo: 1,
      specNm: 'SPEC-3710-수분', specVerNo: 1, chargeUserNm: '김연구', planDe: '20260731',
      testItemStatusCcd: 'ASSIGNED', testItemStatusCcdNm: '배정', resultCnt: 0,
      finalJudgeCcd: null, finalJudgeCcdNm: null },
    { testItemMno: 8004, sortSn: 3, testItemNm: '성상', methodNm: null, methodVerNo: null,
      specNm: null, specVerNo: null, chargeUserNm: null, planDe: null,
      testItemStatusCcd: 'WAITING', testItemStatusCcdNm: '대기', resultCnt: 0,
      finalJudgeCcd: null, finalJudgeCcdNm: null }
  ];

  var RESULTS = [
    { resultMno: 91, resultSeqNo: 1, resultVerNo: 1, resultVal: '98.42', unitCcd: '%',
      specJudgeTpCcd: 'RANGE', specLowerVal: 98.0, specUpperVal: 102.0, specExpectVal: null,
      judgeCcd: 'PASS', judgeRsn: null, inputUserNm: '김연구', inputDt: '2026-07-27 14:20' }
  ];

  /*
    결과 검토 · 승인 대기열.

    RESULTS 와 따로 두는 이유 — RESULTS 는 "한 시험 항목의 결과 이력"이고 이쪽은
    "검토자가 처리해야 할 일감"이다. 화면도 다르고 수명도 다르다.

    데모가 보여야 하는 세 가지를 데이터로 심어 둔다.
      · 남이 입력한 적합 결과   → 승인할 수 있다
      · 내가 입력한 적합 결과   → 승인 버튼이 잠긴다 (승인자 ≠ 입력자)
      · 규격을 벗어난 결과      → 승인이 아니라 기준이탈 조사로 간다
  */
  var REVIEWS = [
    { resultMno: 91, testItemMno: 8001, testItemNm: 'HPLC 순도',
      sampleMno: 5001, sampleNo: 'SMP-20260712-001', sampleNm: 'KM00003710 합성 원료 (batch A)',
      resultVal: '98.42', unitCcd: '%',
      specJudgeTpCcd: 'RANGE', specLowerVal: 98.0, specUpperVal: 102.0, specExpectVal: null,
      judgeCcd: 'PASS', inputUserNm: '이연구', inputDt: '2026-07-27 14:20',
      instrumentNm: 'HPLC-01 (Agilent 1260)',
      inputMemo: '표준품 3회 주입 RSD 0.4 %. 크로마토그램 이상 없음.',
      reviewStatusCcd: 'PENDING',
      approveUserNm: null, approveDt: null, noteMno: null, noteNo: null,
      rejectUserNm: null, rejectDt: null, rejectRsn: null },

    { resultMno: 92, testItemMno: 8002, testItemNm: '수분 (KF)',
      sampleMno: 5001, sampleNo: 'SMP-20260712-001', sampleNm: 'KM00003710 합성 원료 (batch A)',
      resultVal: '0.18', unitCcd: '%',
      specJudgeTpCcd: 'RANGE', specLowerVal: 0.0, specUpperVal: 0.5, specExpectVal: null,
      judgeCcd: 'PASS', inputUserNm: '김연구', inputDt: '2026-07-28 09:05',
      instrumentNm: 'KF-02 (Metrohm 899)',
      inputMemo: null,
      reviewStatusCcd: 'PENDING',
      approveUserNm: null, approveDt: null, noteMno: null, noteNo: null,
      rejectUserNm: null, rejectDt: null, rejectRsn: null },

    { resultMno: 93, testItemMno: 8003, testItemNm: '잔류용매 (GC)',
      sampleMno: 5003, sampleNo: 'SMP-20260705-014', sampleNm: 'HepG2 세포용해물 (P12)',
      resultVal: '0.62', unitCcd: '%',
      specJudgeTpCcd: 'RANGE', specLowerVal: 0.0, specUpperVal: 0.5, specExpectVal: null,
      judgeCcd: 'FAIL', inputUserNm: '박연구', inputDt: '2026-07-26 16:40',
      instrumentNm: 'GC-03 (Agilent 8890)',
      inputMemo: 'DCM 피크가 규격 상한을 넘었습니다.',
      reviewStatusCcd: 'PENDING',
      approveUserNm: null, approveDt: null, noteMno: null, noteNo: null,
      rejectUserNm: null, rejectDt: null, rejectRsn: null },

    { resultMno: 94, testItemMno: 8006, testItemNm: '성상',
      sampleMno: 5004, sampleNo: 'SMP-20260628-003', sampleNm: 'KM00003719 표준품',
      resultVal: '백색 결정성 분말', unitCcd: null,
      specJudgeTpCcd: 'TEXT', specLowerVal: null, specUpperVal: null,
      specExpectVal: '백색~미황색 결정성 분말',
      judgeCcd: 'PASS', inputUserNm: '이연구', inputDt: '2026-07-15 11:02',
      instrumentNm: null,
      inputMemo: null,
      reviewStatusCcd: 'APPROVED',
      approveUserNm: '최QA', approveDt: '2026-07-15 15:30',
      noteMno: 9103, noteNo: 'KM00003719 스케일업 검토',
      rejectUserNm: null, rejectDt: null, rejectRsn: null },

    { resultMno: 95, testItemMno: 8007, testItemNm: 'HPLC 순도',
      sampleMno: 5002, sampleNo: 'SMP-20260712-002', sampleNm: 'KM00003711 정제 분획 F-3',
      resultVal: '99.1', unitCcd: '%',
      specJudgeTpCcd: 'RANGE', specLowerVal: 98.0, specUpperVal: 102.0, specExpectVal: null,
      judgeCcd: 'PASS', inputUserNm: '박연구', inputDt: '2026-07-20 10:15',
      instrumentNm: 'HPLC-01 (Agilent 1260)',
      inputMemo: '주입량 10 µL 로 기재. 시험법은 20 µL.',
      reviewStatusCcd: 'REJECTED',
      approveUserNm: null, approveDt: null, noteMno: null, noteNo: null,
      rejectUserNm: '최QA', rejectDt: '2026-07-20 17:40',
      rejectRsn: '주입량이 시험법(M-HPLC-001 v3, 20 µL)과 다릅니다. 재주입 후 다시 입력해 주세요.' }
  ];

  var OOS = [
    { oosMno: 21, oosNo: 'OOS-2026-0007', testItemMno: 8003, testItemNm: '잔류용매 (GC)',
      testReqstMno: 7002, testReqstNo: 'TR-20260710-01', resultVal: '0.62', unitCcd: '%',
      oosStatusCcd: 'INVESTIGATING', detectDt: '2026-07-26', detectUserNm: '박연구',
      causeCcd: null, invstgUserNm: '최QA', judgeCcd: 'FAIL' },
    { oosMno: 22, oosNo: 'OOS-2026-0006', testItemMno: 8005, testItemNm: '수분 (KF)',
      testReqstMno: 7003, testReqstNo: 'TR-20260702-03', resultVal: '0.71', unitCcd: '%',
      oosStatusCcd: 'CLOSED', detectDt: '2026-07-08', detectUserNm: '김연구',
      causeCcd: 'TEST_ERROR', invstgUserNm: '최QA', judgeCcd: 'INVALID' }
  ];

  var METHODS = [
    { methodMno: 401, methodCd: 'M-HPLC-001', methodNm: '유연물질 및 순도 (HPLC)', methodTpCcd: 'HPLC',
      instrumentTpCcd: 'HPLC', methodStatusCcd: 'ACTIVE', effectDe: '20260302',
      verNo: 3, verCnt: 3, inProgressCnt: 2 },
    { methodMno: 402, methodCd: 'M-GC-002', methodNm: '잔류용매 (GC-HS)', methodTpCcd: 'GC',
      instrumentTpCcd: 'GC', methodStatusCcd: 'ACTIVE', effectDe: '20251114',
      verNo: 2, verCnt: 2, inProgressCnt: 1 },
    { methodMno: 403, methodCd: 'M-KF-004', methodNm: '수분 (Karl Fischer)', methodTpCcd: 'TITRATION',
      instrumentTpCcd: 'KF', methodStatusCcd: 'ACTIVE', effectDe: '20260105',
      verNo: 1, verCnt: 1, inProgressCnt: 0 },
    { methodMno: 404, methodCd: 'M-UV-003', methodNm: '함량 (UV)', methodTpCcd: 'UV',
      instrumentTpCcd: 'UV', methodStatusCcd: 'DRAFT', effectDe: null,
      verNo: 1, verCnt: 1, inProgressCnt: 0 },
    { methodMno: 405, methodCd: 'M-HPLC-009', methodNm: '구 순도법 (폐지)', methodTpCcd: 'HPLC',
      instrumentTpCcd: 'HPLC', methodStatusCcd: 'RETIRED', effectDe: '20230401',
      verNo: 4, verCnt: 4, inProgressCnt: 0 }
  ];

  /* 판정기준 마스터의 판정 유형 컬럼명은 judgeTpCcd 다.
     결과 행에 박히는 스냅샷 컬럼(specJudgeTpCcd) 과 이름이 다르므로 섞지 않는다. */
  /* 판정기준 목록 화면은 코드(specCd)와 시험 항목명(testItemNm)을 함께 읽는다.
     specNm 만 채우면 판정기준 코드 칸이 undefined 로 찍힌다. */
  var SPECS = [
    { specMno: 501, specCd: 'SPEC-3710-PURITY', specNm: 'SPEC-3710-순도',
      testItemNm: 'HPLC 순도', verNo: 2, specStatusCcd: 'ACTIVE',
      judgeTpCcd: 'RANGE', lowerVal: 98.0, upperVal: 102.0, unitCcd: '%',
      lowerIncludeYn: 'Y', upperIncludeYn: 'Y', toleranceVal: null, expectVal: null,
      decimalPt: 2, effectDe: '20260302' },
    { specMno: 502, specCd: 'SPEC-3710-WATER', specNm: 'SPEC-3710-수분',
      testItemNm: '수분 (KF)', verNo: 1, specStatusCcd: 'ACTIVE',
      judgeTpCcd: 'MAX', lowerVal: null, upperVal: 0.5, unitCcd: '%',
      lowerIncludeYn: null, upperIncludeYn: 'Y', toleranceVal: null, expectVal: null,
      decimalPt: 2, effectDe: '20260105' }
  ];

  /*
    시험 항목 → 시험법 → 장비 연쇄.

    Figma 설계안은 이 관계를 세 개의 맵(protocols, equipmentByTest)으로 들고 있다.
    우리는 이미 시험법이 methodTpCcd/instrumentTpCcd 를 갖고 있으므로 맵을 하나만
    둔다 — 장비는 고른 시험법의 instrumentTpCcd 로 자동으로 좁혀진다.

    '성상' 처럼 육안으로 보는 항목은 시험법도 장비도 없다. 빈 배열이 그 사실이다.
  */
  var TEST_CATALOG = [
    { testItemNm: 'HPLC 순도',     methodCds: ['M-HPLC-001'] },
    { testItemNm: '잔류용매 (GC)',  methodCds: ['M-GC-002'] },
    { testItemNm: '수분 (KF)',      methodCds: ['M-KF-004'] },
    { testItemNm: '함량 (UV)',      methodCds: ['M-UV-003'] },
    { testItemNm: '성상',           methodCds: [] }
  ];

  var INSTRUMENTS = [
    { instrumentMno: 601, instrumentCd: 'HPLC-01', instrumentNm: 'Agilent 1260 Infinity II',
      instrumentTpCcd: 'HPLC', modelNm: '1260 Infinity II', locationNm: '2층 분석실',
      instrumentStatusCcd: 'ACTIVE', lastCalDe: '20260511', nextCalDe: '20261111', calState: 'VALID' },
    { instrumentMno: 602, instrumentCd: 'GC-02', instrumentNm: 'Agilent 8890 GC-HS',
      instrumentTpCcd: 'GC', modelNm: '8890', locationNm: '2층 분석실',
      instrumentStatusCcd: 'ACTIVE', lastCalDe: '20260120', nextCalDe: '20260812', calState: 'SOON' },
    { instrumentMno: 603, instrumentCd: 'KF-01', instrumentNm: 'Metrohm 851 Titrando',
      instrumentTpCcd: 'KF', modelNm: '851', locationNm: '3층 시약실',
      instrumentStatusCcd: 'ACTIVE', lastCalDe: '20250630', nextCalDe: '20260630', calState: 'EXPIRED' },
    { instrumentMno: 604, instrumentCd: 'UV-01', instrumentNm: 'Shimadzu UV-1900i',
      instrumentTpCcd: 'UV', modelNm: 'UV-1900i', locationNm: '2층 분석실',
      instrumentStatusCcd: 'RETIRED', lastCalDe: '20240902', nextCalDe: null, calState: 'NONE' }
  ];

  var CALS = [
    { calMno: 71, instrumentMno: 601, calDe: '20260511', nextCalDe: '20261111',
      calResultCcd: 'PASS', calResultCcdNm: '적합', calUserNm: '외부기관(KTL)', certNo: 'KTL-2026-8841' },
    { calMno: 72, instrumentMno: 601, calDe: '20251108', nextCalDe: '20260508',
      calResultCcd: 'PASS', calResultCcdNm: '적합', calUserNm: '외부기관(KTL)', certNo: 'KTL-2025-7712' }
  ];

  var LOCATIONS = [
    { locationMno: 1, locationNm: '3층 시약실', fullPathNm: '3층 시약실', locationTpCcd: 'ROOM',
      level: 1, barcodePrefix: 'L3', temperature: null, containerCnt: 0 },
    { locationMno: 2, locationNm: '냉동고 B', fullPathNm: '3층 시약실 > 냉동고 B', locationTpCcd: 'FREEZER',
      level: 2, barcodePrefix: 'L3-FB', temperature: '-20℃', containerCnt: 0 },
    { locationMno: 3, locationNm: '1단', fullPathNm: '3층 시약실 > 냉동고 B > 1단', locationTpCcd: 'SHELF',
      level: 3, barcodePrefix: 'L3-FB-1', temperature: '-20℃', containerCnt: 12 },
    { locationMno: 4, locationNm: '2층 분석실', fullPathNm: '2층 분석실', locationTpCcd: 'ROOM',
      level: 1, barcodePrefix: 'L2', temperature: null, containerCnt: 0 },
    { locationMno: 5, locationNm: '상온 선반 1', fullPathNm: '2층 분석실 > 상온 선반 1', locationTpCcd: 'SHELF',
      level: 2, barcodePrefix: 'L2-S1', temperature: '25℃', containerCnt: 7 }
  ];

  /*
    시약 마스터. CAS·MSDS 는 재단이 직접 지목한 항목이다 —
    "MSDS / CAS 번호 다 외부에 있는데 … 내부망에서 관리할 수 있는 방법을 찾아주었으면".
    외부 출처(공급사·안전보건공단)에서 받아 내부에 보관한다는 것을 화면에서 보이게 하려고
    출처와 동기화 시각을 함께 둔다.
  */
  var REAGENTS = [
    { reagentMno: 201, reagentNm: '아세토니트릴 (HPLC grade)', casNo: '75-05-8', molFormula: 'C2H3N',
      molWt: 41.05, density: 0.786, ghsCcd: 'GHS02', containerCnt: 4, totalAmountDisp: '3.2 L',
      vendorNm: 'Sigma-Aldrich', msdsYn: 'Y', msdsSrc: '공급사', msdsSyncDtStr: '2026-06-30',
      storageCondNm: '상온 · 인화성' },
    { reagentMno: 202, reagentNm: '5-메톡시트립타민', casNo: '608-07-1', molFormula: 'C11H14N2O',
      molWt: 190.24, density: null, ghsCcd: 'GHS07', containerCnt: 2, totalAmountDisp: '4.1 g',
      vendorNm: 'TCI', msdsYn: 'Y', msdsSrc: '안전보건공단', msdsSyncDtStr: '2026-05-18',
      storageCondNm: '냉장 2~8℃' },
    { reagentMno: 203, reagentNm: '트리에틸아민', casNo: '121-44-8', molFormula: 'C6H15N',
      molWt: 101.19, density: 0.726, ghsCcd: 'GHS02', containerCnt: 1, totalAmountDisp: '500 mL',
      vendorNm: 'Alfa Aesar', msdsYn: 'N', msdsSrc: null, msdsSyncDtStr: null,
      storageCondNm: '상온 · 인화성' },
    { reagentMno: 204, reagentNm: '디클로로메탄', casNo: '75-09-2', molFormula: 'CH2Cl2',
      molWt: 84.93, density: 1.326, ghsCcd: 'GHS08', containerCnt: 3, totalAmountDisp: '2.5 L',
      vendorNm: 'Merck', msdsYn: 'Y', msdsSrc: '공급사', msdsSyncDtStr: '2026-07-02',
      storageCondNm: '상온 · 환기' },
    { reagentMno: 205, reagentNm: '탄산칼륨 (무수)', casNo: '584-08-7', molFormula: 'K2CO3',
      molWt: 138.21, density: null, ghsCcd: 'GHS07', containerCnt: 2, totalAmountDisp: '1.8 kg',
      vendorNm: 'Daejung', msdsYn: 'Y', msdsSrc: '공급사', msdsSyncDtStr: '2026-04-11',
      storageCondNm: '건조 · 밀폐' }
  ];

  var CONTAINERS = [
    { containerMno: 301, barcode: 'RGT-000301', lotNo: 'A2026-113', amount: 800, unitCcd: 'mL',
      locationNm: '3층 시약실 > 냉동고 B > 1단', expiryDt: '2027-02-28', expiredYn: 'N', statusCcd: 'IN_USE' },
    { containerMno: 302, barcode: 'RGT-000302', lotNo: 'A2025-908', amount: 120, unitCcd: 'mL',
      locationNm: '2층 분석실 > 상온 선반 1', expiryDt: '2026-06-30', expiredYn: 'Y', statusCcd: 'IN_USE' },
    { containerMno: 303, barcode: 'RGT-000303', lotNo: null, amount: 0, unitCcd: 'g',
      locationNm: '3층 시약실 > 냉동고 B > 1단', expiryDt: null, expiredYn: 'N', statusCcd: 'DEPLETED' }
  ];

  /* 화합물 라이브러리 — mkcompounds.py 가 RDKit 으로 만든 값이다.
     분자식·분자량·구조 그림이 전부 같은 분자에서 나온다(지어낸 값이 아니다). */
  var COMPOUNDS = (window.LIMS_POC_COMPOUNDS || []).map(function (c) {
    return {
      compoundMno: c.compoundMno, regId: c.regId, molFormula: c.molFormula,
      molWt: c.molWt, exactMolWt: c.exactMolWt, noteCnt: c.noteCnt,
      createDtStr: c.createDtStr, molblock: c.molblock
    };
  });

  var DEPICT_BY_MOLBLOCK = {};
  (window.LIMS_POC_COMPOUNDS || []).forEach(function (c) {
    DEPICT_BY_MOLBLOCK[c.molblock] = c.svg;
  });

  /* 구조 문자열 → RDKit 계산값·그림. mkcompounds.py 가 미리 돌려 둔 것이다.
     브라우저에는 RDKit 이 없으므로 여기서 계산할 방법이 없고, 없는 값을 지어내면
     화면에 틀린 화학이 걸린다. 그래서 아는 구조만 답하고 나머지는 모른다고 말한다. */
  var PROP_ENTRIES = window.LIMS_POC_PROP_ENTRIES || [];
  var PROP_KEYS = window.LIMS_POC_PROPS || {};

  /*
    실제 chemeditor 백엔드 호출. 배포본에서만 닿는다(로컬 정적 서버에는 없다).
    닿지 못하면 null 을 돌려주고, 부르는 쪽이 "계산하지 못했다"를 화면에 적는다 —
    값을 지어내지 않는다.
  */
  function chemService(path, body, as) {
    var root = chemEditorRoot();
    if (!root || typeof fetch !== 'function') return Promise.resolve(null);
    return fetch(root + 'api/v1/' + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (!r.ok && as !== 'text') return r.json().catch(function () { return null; });
      return as === 'text' ? (r.ok ? r.text() : null) : r.json();
    }).catch(function () { return null; });
  }

  function lookupStructure(structure) {
    if (!structure) return null;
    var idx = PROP_KEYS[String(structure).trim()];
    return (idx === undefined || idx === null) ? null : PROP_ENTRIES[idx];
  }

  /* ---------------------------------------------------------------
     연구노트 작성 화면 (PoC 메인).

     빈 노트로 열면 화면이 빈 블록 골격만 세운다. 그러면 시연 첫 화면에
     "구조를 넣으면 계산된다"는 이 PoC 의 요점이 보이지 않는다. 그래서
     구조 하나와 반응 시약 표가 이미 들어 있는 노트를 연다 —
     분자식·분자량은 mkcompounds.py 가 RDKit 으로 계산한 값 그대로다.
  --------------------------------------------------------------- */
  /*
    sampleMno/sampleNo/sampleNm 은 아직 서버가 안 주는 값이다. 스키마에는
    반대 방향(PL_LIMS_SAMPLE.NOTE_MNO — 시료를 만들어낸 노트)만 있고,
    노트에서 시료로 가는 칸이 없다. 시연에서 그 왕복을 보여 주려고 여기에만
    넣는다 — 화면은 값이 없으면 줄을 안 그리므로, 서버가 안 줘도 깨지지 않는다.
  */
  var NOTE = {
    noteMno: 9101, noteNm: 'KM00003710 합성 — batch A',
    projectMno: 301, projectNm: '표적단백질 저해제 발굴',
    writerNm: '이연구', writeDtStr: '2026-07-12 17:40', statusCcd: 'WRITING',
    sampleMno: 5001, sampleNo: 'SMP-20260712-001', sampleNm: 'KM00003710 합성 원료 (batch A)'
  };

  var NOTE_SEED = (window.LIMS_POC_COMPOUNDS || [])[0] || {};

  var NOTE_BLOCKS = [
    { blockMno: 1, blockOrd: 1, blockTpCcd: 'TEXT',
      textVal: '인돌 아민(KM00003719)과 4-벤질옥시벤조산을 EDC/HOBt 조건에서 커플링했다.\n'
        + 'DCM 20 mL, 0 °C 에서 30분 교반 후 상온으로 올려 밤새 반응시켰다.' },
    { blockMno: 2, blockOrd: 2, blockTpCcd: 'STRUCTURE',
      molblock: NOTE_SEED.molblock || '',
      molFormula: NOTE_SEED.molFormula || '',
      molWt: NOTE_SEED.molWt === undefined ? null : NOTE_SEED.molWt,
      exactMolWt: NOTE_SEED.exactMolWt === undefined ? null : NOTE_SEED.exactMolWt,
      caption: '목적물 ' + (NOTE_SEED.regId || '') },
    { blockMno: 3, blockOrd: 3, blockTpCcd: 'TABLE', caption: '반응 시약',
      rowList: [
        { reagentMno: 205, reagentNm: '탄산칼륨 (무수)', casNo: '584-08-7', molFormula: 'K2CO3',
          molWt: 138.21, density: null, roleCcd: 'REACTANT', amount: 276, unitCcd: 'MG' },
        { reagentMno: 203, reagentNm: '트리에틸아민', casNo: '121-44-8', molFormula: 'C6H15N',
          molWt: 101.19, density: 0.726, roleCcd: 'REAGENT', amount: 0.42, unitCcd: 'ML' },
        { reagentMno: 204, reagentNm: '디클로로메탄', casNo: '75-09-2', molFormula: 'CH2Cl2',
          molWt: 84.93, density: 1.326, roleCcd: 'SOLVENT', amount: 20, unitCcd: 'ML' }
      ] }
  ];

  var nextBlockMno = 4;

  var NOTE_USAGE = [
    { reagentNm: '디클로로메탄', barcode: 'RGT-000304', deltaAmount: -20, unitCcd: 'mL',
      txnDtStr: '2026-07-12 10:02', txnUserNm: '이연구', noteNm: NOTE.noteNm,
      expiryOverrideYn: 'N', reason: null },
    { reagentNm: '트리에틸아민', barcode: 'RGT-000305', deltaAmount: -0.42, unitCcd: 'mL',
      txnDtStr: '2026-07-12 10:05', txnUserNm: '이연구', noteNm: NOTE.noteNm,
      expiryOverrideYn: 'N', reason: null },
    { reagentNm: '탄산칼륨 (무수)', barcode: 'RGT-000302', deltaAmount: -276, unitCcd: 'mg',
      txnDtStr: '2026-07-12 10:07', txnUserNm: '이연구', noteNm: NOTE.noteNm,
      expiryOverrideYn: 'Y', reason: '유효기한 경과 — 책임자 승인 후 사용' }
  ];

  /* ---------------------------------------------------------------
     구노 ELN 본체 — 프로젝트와 그 안의 연구노트.

     LIMS 는 이 흐름에 얹힌다. 노트는 프로젝트에 귀속되고, 프로젝트 상세에서
     열린다. 그 사실이 화면으로 보여야 "따로 만든 별개 시스템"으로 읽히지 않는다.
  --------------------------------------------------------------- */
  var ELN_PROJECTS = [
    { projectMno: 301, keywords: '저해제,합성,인돌', projectId: 'KM-2026-014', projectNm: '표적단백질 저해제 발굴',
      categoryNm: '신약개발', gnrlUserNm: '김연구', beginDe: '20260302', endDe: '20261231', cmpltnDe: null,
      noteCnt: 3, memberCnt: 4, writingNoteCnt: 1, inspectionNoteCnt: 1, completeNoteCnt: 1,
      crrntProcessNm: '2단계 · 합성', projectPrgrstCcd: 'PROGRESS', projectPrgrstCcdNm: '진행' },
    { projectMno: 302, keywords: '간독성,HepG2,스크리닝', projectId: 'KM-2026-021', projectNm: '간독성 스크리닝',
      categoryNm: '안전성평가', gnrlUserNm: '박연구', beginDe: '20260401', endDe: '20261130', cmpltnDe: null,
      noteCnt: 2, memberCnt: 3, writingNoteCnt: 0, inspectionNoteCnt: 0, completeNoteCnt: 2,
      crrntProcessNm: '1단계 · 스크리닝', projectPrgrstCcd: 'PROGRESS', projectPrgrstCcdNm: '진행' },
    { projectMno: 303, keywords: '밸리데이션,HPLC', projectId: 'KM-2026-030', projectNm: '시험법 검증 (KM-3719)',
      categoryNm: '분석', gnrlUserNm: '김연구', beginDe: '20260511', endDe: '20261031', cmpltnDe: null,
      noteCnt: 1, memberCnt: 2, writingNoteCnt: 0, inspectionNoteCnt: 0, completeNoteCnt: 1,
      crrntProcessNm: '2단계 · 밸리데이션', projectPrgrstCcd: 'PROGRESS', projectPrgrstCcdNm: '진행' },
    { projectMno: 304, keywords: '안정성,장기보관', projectId: 'KM-2025-118', projectNm: '장기 안정성 시험',
      categoryNm: '안정성', gnrlUserNm: '이연구', beginDe: '20250901', endDe: '20260630', cmpltnDe: '20260630',
      noteCnt: 6, memberCnt: 5, writingNoteCnt: 0, inspectionNoteCnt: 0, completeNoteCnt: 6,
      crrntProcessNm: '종료', projectPrgrstCcd: 'COMPLETE', projectPrgrstCcdNm: '완료' }
  ];

  /* 노트는 프로젝트에 매달린다. projectMno 로 걸러 프로젝트 상세에 뿌린다. */
  var ELN_NOTES = [
    { noteMno: 9101, projectMno: 301, projectNm: '표적단백질 저해제 발굴', folderMno: 0,
      noteNm: 'KM00003710 합성 — batch A', ownerNm: '이연구', modifyDtStr: '2026-07-12 17:40',
      writeStatusCcd: 'COMPLETE', writeStatusCcdNm: '작성완료', keywords: '합성,batch', editorTpCcd: 'EDITOR', editorTpCcdNm: '에디터',
      writeModeCcdNm: '온라인', sharedYn: 'N',
      processNm: '2단계 · 합성', projectPrgrstCcdNm: '진행', securityGradeCcdNm: '2등급' },
    { noteMno: 9102, projectMno: 301, projectNm: '표적단백질 저해제 발굴', folderMno: 0,
      noteNm: 'HPLC 순도 분석 (M-HPLC-001 v3)', ownerNm: '김연구', modifyDtStr: '2026-07-27 14:22',
      writeStatusCcd: 'INSPECTION', writeStatusCcdNm: '점검중', keywords: 'HPLC,순도', editorTpCcd: 'EDITOR', editorTpCcdNm: '에디터',
      writeModeCcdNm: '온라인', sharedYn: 'N',
      processNm: '3단계 · 물성 평가', projectPrgrstCcdNm: '진행', securityGradeCcdNm: '2등급' },
    { noteMno: 9105, projectMno: 301, projectNm: '표적단백질 저해제 발굴', folderMno: 0,
      noteNm: 'KM00003710 순도 · 수분 시험 기록', ownerNm: '김연구', modifyDtStr: '2026-07-30 09:12',
      writeStatusCcd: 'WRITING', writeStatusCcdNm: '작성중', keywords: 'HPLC,수분,규격',
      editorTpCcd: 'EDITOR', editorTpCcdNm: '에디터', writeModeCcdNm: '온라인', sharedYn: 'N',
      processNm: '2단계 · 합성', projectPrgrstCcdNm: '진행', securityGradeCcdNm: '2등급' },
    { noteMno: 9103, projectMno: 301, projectNm: '표적단백질 저해제 발굴', folderMno: 0,
      noteNm: 'KM00003719 스케일업 검토', ownerNm: '김연구', modifyDtStr: '2026-07-28 10:03',
      writeStatusCcd: 'WRITING', writeStatusCcdNm: '작성중', keywords: '스케일업', editorTpCcd: 'EDITOR', editorTpCcdNm: '에디터',
      writeModeCcdNm: '온라인', sharedYn: 'N',
      processNm: '2단계 · 합성', projectPrgrstCcdNm: '진행', securityGradeCcdNm: '2등급' },
    { noteMno: 9104, projectMno: 302, projectNm: '간독성 스크리닝', folderMno: 0,
      noteNm: 'HepG2 세포독성 1차', ownerNm: '박연구', modifyDtStr: '2026-07-20 16:11',
      writeStatusCcd: 'COMPLETE', writeStatusCcdNm: '작성완료', keywords: '합성,batch', editorTpCcd: 'FILE', editorTpCcdNm: '파일', writeModeCcdNm: '온라인', sharedYn: 'N',
      processNm: null, projectPrgrstCcdNm: '진행', securityGradeCcdNm: '2등급' },
    { noteMno: 9105, projectMno: 303, projectNm: '시험법 검증 (KM-3719)', folderMno: 0,
      noteNm: '직선성·정밀성 검증', ownerNm: '김연구', modifyDtStr: '2026-07-22 09:48',
      writeStatusCcd: 'DRAFT', writeStatusCcdNm: '임시저장', keywords: '검증', editorTpCcd: 'EDITOR', editorTpCcdNm: '에디터',
      writeModeCcdNm: '온라인', sharedYn: 'N',
      processNm: null, projectPrgrstCcdNm: '진행', securityGradeCcdNm: '2등급' }
  ];

  var nextNoteMno = 9110;

  var SAMPLE_NOTES = [
    { noteMno: 9101, sampleMno: 5001, noteNm: 'KM00003710 합성 — batch A', projectNm: '표적단백질 저해제 발굴',
      createUserNm: '이연구', modifyDtStr: '2026-07-12 17:40', writeStatusCcd: 'COMPLETE' },
    { noteMno: 9102, sampleMno: 5001, noteNm: 'HPLC 순도 분석 (M-HPLC-001 v3)', projectNm: '표적단백질 저해제 발굴',
      createUserNm: '김연구', modifyDtStr: '2026-07-27 14:22', writeStatusCcd: 'INSPECTION' },
    { noteMno: 9104, sampleMno: 5002, noteNm: '분주 A03 이동 기록', projectNm: '표적단백질 저해제 발굴',
      createUserNm: '박연구', modifyDtStr: '2026-07-14 09:05', writeStatusCcd: 'WRITING' }
  ];

  var USERS = [
    { userMno: 1024, userNm: '김연구', orztNm: '분석팀', authGrpNm: '책임자' },
    { userMno: 1025, userNm: '박연구', orztNm: '분석팀', authGrpNm: '연구원' },
    { userMno: 1026, userNm: '이연구', orztNm: '합성팀', authGrpNm: '연구원' },
    { userMno: 1030, userNm: '최QA', orztNm: '품질보증', authGrpNm: '운영관리자' }
  ];

  /* RDKit 이 그린 실제 구조식이 아니라 자리표시용 도형이다.
     구조가 사실인 척하지 않도록 화합물 그림 대신 회색 상자로 둔다. */
  var PLACEHOLDER_SVG =
    "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150' viewBox='0 0 200 150'>" +
    "<rect width='200' height='150' fill='#f4f6f8'/>" +
    "<text x='100' y='70' font-size='12' fill='#98a2b3' text-anchor='middle'>구조식 미리보기</text>" +
    "<text x='100' y='90' font-size='11' fill='#c1c7d0' text-anchor='middle'>(RDKit 렌더 — PoC 미연결)</text></svg>";

  /* ---------------------------------------------------------------
     엔드포인트 → 응답
  --------------------------------------------------------------- */
  var HANDLERS = {
    '/api/lims/sample/sampleList': function (p) {
      var rows = applyFilter(SAMPLES, p, {
        schSampleNo: ['sampleNo'],
        searchKeyword: ['sampleNm', 'sourceDesc'],
        schSampleTpCcd: 'sampleTpCcd',
        schSampleStatusCcd: 'sampleStatusCcd',
        schProjectMno: 'projectMno'
      });
      // 상태를 고르지 않으면 폐기 시료는 빼고 보여준다(화면 기본값이 '폐기 제외').
      if (!p.schSampleStatusCcd) {
        rows = rows.filter(function (s) { return s.sampleStatusCcd !== 'DISPOSED'; });
      }
      return { sampleListInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    '/api/lims/sample/sampleLineage': function () { return { lineageList: LINEAGE }; },
    '/api/lims/sample/aliquotList': function (p) { return { aliquotListInfo: page(ALIQUOTS, p.pageNo, p.pageUnit) }; },
    /*
      연결 연구노트. 서버 API 가 아직 없어 화면이 "아직 연동되지 않았습니다" 만
      띄웠다. 시연에서는 시료와 연구노트가 이어진다는 사실 자체가 보여야 하므로
      샘플을 넣는다. 실제 연동 시 이 핸들러만 지우면 된다.
    */
    '/api/lims/sample/sampleNoteList': function (p) {
      /*
        전에는 인자를 받지도 않고 늘 같은 세 건을 돌려줬다. 시료를 바꿔 열어도
        연결 노트가 그대로라, 이 목록이 "이 시료의" 노트라는 사실 자체가
        화면에서 부정됐다. 시료마다 다르게 준다.
      */
      var mno = Number(p && (p.schSampleMno || p.sampleMno)) || 0;
      if (!mno) { return { noteList: SAMPLE_NOTES }; }
      var byNote = SAMPLE_NOTES.filter(function (n) { return (n.sampleMno || 5001) === mno; });
      return { noteList: byNote };
    },
    '/api/lims/sample/projectOptionList': function () {
      return { optionList: [
        { projectMno: 301, projectNm: '표적단백질 저해제 발굴' },
        { projectMno: 302, projectNm: '간독성 스크리닝' },
        { projectMno: 303, projectNm: '시험법 검증 (KM-3719)' },
        { projectMno: 304, projectNm: '장기 안정성 시험' }
      ] };
    },

    '/api/lims/test/myWorklist': function (p) {
      var rows = applyFilter(WORKLIST, p, {
        searchKeyword: ['testReqstNo', 'sampleNo', 'sampleNm', 'testItemNm'],
        schTestItemStatusCcd: 'testItemStatusCcd',
        schUrgentYn: 'urgentYn'
      });
      return { worklistInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    '/api/lims/test/testRequestList': function (p) {
      var rows = applyFilter(REQUESTS, p, {
        searchKeyword: ['testReqstNo', 'sampleNo', 'sampleNm'],
        schTestReqstStatusCcd: 'testReqstStatusCcd',
        schUrgentYn: 'urgentYn'
      });
      return { testRequestListInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    '/api/lims/test/worklistSummary': function () {
      return { summaryInfo: { assignedCnt: 1, inProgressCnt: 1, oosCnt: 1, overdueCnt: 0, totalCnt: 3 } };
    },
    '/api/lims/test/testRequestInfo': function () {
      return {
        testReqstInfo: {
          testReqstMno: 7001, testReqstNo: 'TR-20260713-02',
          sampleMno: 5001, sampleNo: 'SMP-20260712-001', sampleNm: 'KM00003710 합성 원료 (batch A)',
          testPurposeCcd: 'RELEASE', testPurposeCcdNm: '출하',
          testReqstStatusCcd: 'IN_PROGRESS', testReqstStatusCcdNm: '시험중',
          hopeDe: '20260731', reqstDt: '2026-07-13 09:41', reqstUserNm: '김연구',
          urgentYn: 'Y', purposeDesc: '출하 판정용 전항목 시험', itemCnt: 3,
          reqstUserMno: 1024, projectNm: '표적단백질 저해제 발굴',
          createDtStr: '2026-07-13 09:41', completeDtStr: null,
          receiptUserNm: '김연구', receiptDtStr: '2026-07-13 11:05'
        },
        testItemList: TEST_ITEMS
      };
    },
    '/api/lims/test/sampleTestHistory': function () {
      // 이력 표는 요청번호와 완료일시도 보여준다. 항목 데이터에 그 둘을 얹는다.
      return { testHistoryList: TEST_ITEMS.map(function (i) {
        return Object.assign({ testReqstMno: 7001, testReqstNo: 'TR-20260713-02', completeDt: null }, i);
      }) };
    },
    '/api/lims/test/methodOptionList': function () { return { optionList: METHODS }; },
    '/api/lims/test/specOptionList': function () { return { optionList: SPECS }; },
    '/api/lims/test/sampleOptionList': function () { return { optionList: SAMPLES }; },

    /* ---------------------------------------------------------------
       결과 검토 · 승인

       상태를 실제로 바꾼다. 승인을 누르면 그 행이 "검토 대기"에서 사라지고
       "승인 완료"에 나타나야 한다 — 목록만 보여주고 아무 일도 안 일어나면
       시연에서 "버튼이 안 먹는다"로 읽힌다.
    --------------------------------------------------------------- */
    /* ---------------------------------------------------------------
       워크리스트 일괄 배정

       기존 "시험 요청"은 시료 하나에 항목 여럿이다. 이쪽은 반대로 시료 여럿에
       항목 하나씩 — 아침에 들어온 시료를 한 번에 배정하는 자리다.
    --------------------------------------------------------------- */
    '/api/lims/test/worklistCatalog': function () {
      return {
        /* 배정할 수 있는 시료만 — 폐기된 것은 목록에 없어야 한다. */
        sampleList: SAMPLES.filter(function (x) { return x.sampleStatusCcd !== 'DISPOSED'; }),
        catalogList: TEST_CATALOG,
        methodList: METHODS.filter(function (m) { return m.methodStatusCcd === 'ACTIVE'; }),
        instrumentList: INSTRUMENTS.filter(function (i) { return i.instrumentStatusCcd === 'ACTIVE'; }),
        userList: USERS
      };
    },

    '/api/lims/test/createWorklist': function (p) {
      var rows = [];
      try { rows = typeof p.items === 'string' ? JSON.parse(p.items) : (p.items || []); }
      catch (e) { return { message: '배정 정보를 읽지 못했습니다.' }; }
      if (!rows.length) { return { message: '배정할 시료가 없습니다.' }; }

      var made = 0;
      var blocked = [];
      rows.forEach(function (row) {
        var sample = SAMPLES.filter(function (x) {
          return String(x.sampleMno) === String(row.sampleMno);
        })[0];
        if (!sample) { return; }

        /* 교정 기한이 지난 장비로는 배정하지 않는다. 화면에서도 못 고르게 막고
           있지만 화면만 믿으면 규칙이 아니다 — 결과 승인 규칙과 같은 원칙이다. */
        if (row.instrumentNm) {
          var inst = INSTRUMENTS.filter(function (i) {
            return i.instrumentCd === row.instrumentNm;
          })[0];
          if (inst && inst.calState === 'EXPIRED') {
            blocked.push(sample.sampleNo + ' — ' + inst.instrumentCd + ' 교정 기한 경과');
            return;
          }
        }

        var method = METHODS.filter(function (m) { return m.methodCd === row.methodCd; })[0];
        WORKLIST.unshift({
          testItemMno: 8900 + WORKLIST.length + made,
          testReqstMno: 7900 + made,
          testReqstNo: 'TR-20260731-' + String(made + 1).padStart(2, '0'),
          testItemNm: row.testItemNm,
          methodNm: method ? method.methodCd : null,
          methodVerNo: method ? method.verNo : null,
          planDe: (row.planDe || '20260807').replace(/-/g, ''),
          resultCnt: 0,
          sampleMno: sample.sampleMno, sampleNo: sample.sampleNo, sampleNm: sample.sampleNm,
          testItemStatusCcd: 'ASSIGNED', testItemStatusCcdNm: '배정',
          chargeUserNm: row.chargeUserNm,
          instrumentNm: row.instrumentNm || null,
          urgentYn: row.priorityCcd === 'URGENT' ? 'Y' : 'N'
        });
        made += 1;
      });
      return { createdCnt: made, blockedList: blocked };
    },

    '/api/lims/result/reviewList': function (p) {
      var rows = applyFilter(REVIEWS, p, {
        schReviewStatusCcd: 'reviewStatusCcd',
        searchKeyword: ['testItemNm', 'sampleNo', 'sampleNm', 'inputUserNm']
      });
      var cnt = { PENDING: 0, APPROVED: 0, REJECTED: 0 };
      REVIEWS.forEach(function (r) {
        if (cnt[r.reviewStatusCcd] !== undefined) { cnt[r.reviewStatusCcd] += 1; }
      });
      return { reviewListInfo: page(rows, 1, 50), reviewCount: cnt };
    },

    '/api/lims/result/approveResult': function (p) {
      var row = findReview(p.resultMno);
      if (!row) { return { message: '결과를 찾을 수 없습니다.' }; }

      /* 화면에서 이미 막고 있지만 서버도 막는다 — 화면만 믿으면 규칙이 아니다. */
      if (row.judgeCcd !== 'PASS') {
        return { message: '규격을 벗어난 결과는 승인할 수 없습니다.' };
      }
      if (row.inputUserNm === POC_ME) {
        return { message: '본인이 입력한 결과는 본인이 승인할 수 없습니다.' };
      }

      row.reviewStatusCcd = 'APPROVED';
      row.approveUserNm = POC_ME;
      row.approveDt = stampNow();

      /*
        승인 결과를 연구노트에 기록한다. Figma 설계안에는 없는 연결이다 —
        거기서는 승인 다음이 "고객에게 보고서 발송"이지만, 재단에서 결과의
        종착지는 연구노트다.

        시료가 속한 프로젝트의 노트를 찾아 붙인다. 없으면 기록하지 않고
        그 사실을 그대로 돌려준다(조용히 성공한 척하지 않는다).
      */
      if (p.noteRecordYn === 'Y') {
        var note = noteForSample(row.sampleMno);
        if (note) {
          row.noteMno = note.noteMno;
          row.noteNo = note.noteNm;
          NOTE_RESULT_LOG.push({
            noteMno: note.noteMno, resultMno: row.resultMno,
            testItemNm: row.testItemNm, resultVal: row.resultVal, unitCcd: row.unitCcd,
            judgeCcd: row.judgeCcd, approveUserNm: row.approveUserNm, approveDt: row.approveDt
          });
        }
      }
      return { noteNo: row.noteNo || null };
    },

    '/api/lims/result/rejectResult': function (p) {
      var row = findReview(p.resultMno);
      if (!row) { return { message: '결과를 찾을 수 없습니다.' }; }
      if (!p.rejectRsn || !String(p.rejectRsn).trim()) {
        return { message: '반려 사유가 없습니다.' };
      }
      row.reviewStatusCcd = 'REJECTED';
      row.rejectUserNm = POC_ME;
      row.rejectDt = stampNow();
      row.rejectRsn = String(p.rejectRsn).trim();
      return {};
    },

    '/api/lims/result/resultInfo': function () {
      return {
        testItem: {
          testItemMno: 8001, testItemNm: 'HPLC 순도', testReqstMno: 7001, testReqstNo: 'TR-20260713-02',
          sampleNo: 'SMP-20260712-001', sampleNm: 'KM00003710 합성 원료 (batch A)',
          methodNm: 'M-HPLC-001', methodVerNo: 3, chargeUserNm: '김연구',
          testItemStatusCcd: 'IN_PROGRESS', testItemStatusCcdNm: '시험중'
        },
        spec: SPECS[0],
        resultList: RESULTS,
        chargeYn: 'Y',
        retestCount: 0,
        retestLimit: 3
      };
    },
    '/api/lims/result/resultHistory': function () {
      return { historyList: [
        { resultVerNo: 1, resultVal: '98.42', judgeCcdNm: '적합', inputUserNm: '김연구',
          inputDt: '2026-07-27 14:20', correctRsn: null }
      ] };
    },
    '/api/lims/result/instrumentOptions': function () { return { instrumentList: INSTRUMENTS }; },

    '/api/lims/oos/oosList': function (p) {
      var rows = applyFilter(OOS, p, {
        searchKeyword: ['oosNo', 'testItemNm', 'testReqstNo'],
        schOosStatusCcd: 'oosStatusCcd'
      });
      if (p.schOpenOnlyYn === 'Y') {
        rows = rows.filter(function (o) { return o.oosStatusCcd !== 'CLOSED'; });
      }
      return { oosListInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    '/api/lims/oos/oosInfo': function () {
      return {
        oos: {
          oosMno: 21, oosNo: 'OOS-2026-0007', testItemMno: 8003, testItemNm: '잔류용매 (GC)',
          reqstNo: 'TR-20260710-01', sampleNo: 'SMP-20260705-014',
          resultVal: '0.62', unitCcd: '%', specDisp: '≤ 0.50 %',
          oosStatusCcd: 'INVESTIGATING', oosStatusCcdNm: '조사중',
          detectDt: '2026-07-26', invstgUserMno: 1030, invstgUserNm: '최QA',
          causeCcd: null, causeCcdNm: null, invstgDesc: '주입량 재확인 및 표준품 재조제 후 재분석 예정.'
        },
        retestCount: 1, retestLimit: 3
      };
    },

    '/api/lims/method/methodList': function (p) {
      var rows = applyFilter(METHODS, p, {
        searchKeyword: ['methodCd', 'methodNm'],
        schMethodTpCcd: 'methodTpCcd',
        schMethodStatusCcd: 'methodStatusCcd'
      });
      return { methodListInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    '/api/lims/method/methodVerList': function () {
      return { methodVerList: [
        { methodMno: 401, verNo: 3, methodNm: '유연물질 및 순도 (HPLC)', methodStatusCcd: 'ACTIVE',
          effectDe: '20260302', approveUserNm: '최QA', approveDtStr: '2026-02-27 16:40',
          inProgressCnt: 2, reviseRsn: '컬럼 변경' },
        { methodMno: 401, verNo: 2, methodNm: '유연물질 및 순도 (HPLC)', methodStatusCcd: 'RETIRED',
          effectDe: '20250511', approveUserNm: '최QA', approveDtStr: '2025-05-07 10:12',
          inProgressCnt: 0, reviseRsn: '이동상 비율 조정' },
        { methodMno: 401, verNo: 1, methodNm: '유연물질 및 순도 (HPLC)', methodStatusCcd: 'RETIRED',
          effectDe: '20240201', approveUserNm: '최QA', approveDtStr: '2024-01-25 09:31',
          inProgressCnt: 0, reviseRsn: null }
      ] };
    },
    '/api/lims/method/specList': function () { return { specList: SPECS }; },
    '/api/lims/method/specDetail': function () { return { spec: SPECS[0] }; },
    '/api/lims/method/methodInProgressTestList': function () { return { testItemList: TEST_ITEMS }; },

    '/api/lims/instrument/instrumentList': function (p) {
      var rows = applyFilter(INSTRUMENTS, p, {
        searchKeyword: ['instrumentCd', 'instrumentNm', 'modelNm'],
        schInstrumentTpCcd: 'instrumentTpCcd',
        schInstrumentStatusCcd: 'instrumentStatusCcd',
        schCalState: 'calState'
      });
      return { instrumentListInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    '/api/lims/instrument/instrumentDetail': function () { return { instrument: INSTRUMENTS[0] }; },
    '/api/lims/instrument/calList': function () { return { calList: CALS }; },

    '/api/lims/location/locationList': function (p) {
      return { locationList: applyFilter(LOCATIONS, p, { schLocationTpCcd: 'locationTpCcd' }) };
    },

    '/api/lims/reagent/reagentList': function (p) {
      var rows = applyFilter(REAGENTS, p, {
        searchKeyword: ['reagentNm', 'molFormula'],
        schCasNo: ['casNo']
      });
      return { reagentListInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    '/api/lims/container/containerList': function (p) {
      var rows = applyFilter(CONTAINERS, p, {
        schStatusCcd: 'statusCcd',
        schScanValue: ['barcode']
      });
      return { containerListInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    '/api/lims/container/stockTxnList': function () {
      return { stockTxnList: [
        { txnMno: 1, txnTpCcd: 'RECEIVE', deltaAmount: 1000, unitCcd: 'mL', afterAmount: 1000,
          txnDtStr: '2026-05-02 10:11', txnUserNm: '박연구', reason: '신규 입고', noteNm: null },
        { txnMno: 2, txnTpCcd: 'USE', deltaAmount: -200, unitCcd: 'mL', afterAmount: 800,
          txnDtStr: '2026-07-14 16:02', txnUserNm: '김연구', reason: null, noteNm: 'HPLC 순도 분석' }
      ] };
    },

    '/api/lims/compound/compoundList': function (p) {
      var rows = applyFilter(COMPOUNDS, p, {
        schRegId: ['regId'],
        searchKeyword: ['regId', 'molFormula']
      });
      return { compoundListInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    '/api/lims/compound/searchByStructure': function () { return { compoundList: COMPOUNDS.slice(0, 2) }; },
    '/api/lims/compound/compoundDetail': function () { return { compound: COMPOUNDS[0], noteList: [] }; },
    '/api/lims/chem/depict': function (p) {
      var hit = lookupStructure(p.structure);
      var known = DEPICT_BY_MOLBLOCK[p.structure] || (hit && hit.svg);
      if (known) return { depict: known };
      return chemService('depict', { text: p.structure, w: Number(p.w) || 260, h: Number(p.h) || 200 }, 'text')
        .then(function (svg) { return { depict: svg || PLACEHOLDER_SVG }; });
    },
    /*
      이 PoC 의 메인 기능이 지나는 길이다 — 구조가 들어오면 분자식·분자량이 나온다.
      실서비스는 여기서 RDKit(FastAPI)을 부른다. 프로토타입은 그 계산을 빌드 때
      미리 돌려 둔 표에서 찾는다.

      모르는 구조에는 빈 properties 를 돌려준다. 화면은 그걸 "해석 실패"로 적는데,
      실제로는 데모 데이터에 없을 뿐이라 사실과 다르게 읽힌다. 그래서 토스트로
      진짜 사유를 함께 말한다.
    */
    '/api/lims/chem/properties': function (p) {
      var hit = lookupStructure(p.structure);
      if (hit) return { properties: hit.properties };
      /*
        표에 없는 구조는 실제 chemeditor 백엔드(RDKit)에 물어본다. 배포본에서는
        같은 사이트 루트에 그 API 가 함께 올라가 있으므로, 시연 중 아무 구조나
        붙여넣어도 진짜로 계산된다. 응답 키(mol_weight/exact_mass)는 화면이
        이미 별칭으로 읽는다.
      */
      return chemService('chem/properties', { text: p.structure }).then(function (res) {
        if (!res || res.ok === false) {
          toast(res && res.error ? '구조를 읽지 못했습니다 — ' + res.error
                                 : '화학 계산 서비스에 연결하지 못했습니다.');
          return { properties: {} };
        }
        return { properties: res };
      });
    },

    '/api/lims/project/projectReagentUsage': function () {
      return { usageList: [
        { reagentNm: '아세토니트릴 (HPLC grade)', barcode: 'RGT-000301', deltaAmount: -200,
          unitCcd: 'mL', txnDtStr: '2026-07-14 16:02', txnUserNm: '김연구',
          noteNm: 'HPLC 순도 분석', expiryOverrideYn: 'N', reason: null }
      ] };
    },
    /* 연구노트 작성 화면의 오른쪽 패널. 노트 ↔ 재고 이력이 이어져 있다는 사실이
       이 목록으로 보인다(시약을 쓰면 그 기록이 노트에 남는다). */
    '/api/lims/project/noteReagentUsage': function () {
      return { usageList: NOTE_USAGE };
    },
    '/api/lims/project/projectCompoundList': function () { return { compoundList: COMPOUNDS.slice(0, 2) }; },

    '/api/lims/stoich/projectStoich': function () { return { stoich: { usageList: [] } }; },
    '/api/lims/stoich/noteStoich': function () { return { stoich: { usageList: [] } }; },

    /* ---- 구노 ELN 본체 ---- */
    /* 대시보드의 공지/자료실. 목록 자체가 이번 범위는 아니지만, 응답이 없으면
       화면이 res.postsListInfo.dataList 에서 그대로 터진다. */
    '/api/system/posts/postsList': function (p) {
      var notice = String(p.schPostsSeCcd || '').indexOf('RESEARCH') < 0;
      var rows = notice ? [
        { rn: 1, postsMno: 1, subject: 'KMEDIhub ELN 시스템 점검 안내', writerUserNm: '운영팀',
          modifyDe: '2026-07-24', hitCnt: 41, fileId: null, newPostsYn: 'Y' },
        { rn: 2, postsMno: 2, subject: '연구노트 작성 가이드 개정(v2.1)', writerUserNm: '운영팀',
          modifyDe: '2026-07-11', hitCnt: 128, fileId: null, newPostsYn: 'N' }
      ] : [
        { rn: 1, postsMno: 11, subject: '전자연구노트 표준 양식.hwp', writerUserNm: '운영팀',
          modifyDe: '2026-06-30', hitCnt: 87, fileId: 'F-1', newPostsYn: 'N' }
      ];
      return { postsListInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    '/api/eln/project/myProjectList': function (p) {
      var rows = applyFilter(ELN_PROJECTS, p, {
        searchKeyword: ['projectNm', 'projectId', 'gnrlUserNm'],
        schProjectPrgrstCcd: 'projectPrgrstCcd'
      });
      rows = rows.map(function (r) {
        // 화면이 그대로 찍는 표시용 문자열. 서버가 만들어 내려주는 값이다.
        return Object.assign({}, r, {
          noteCntStr: String(r.noteCnt), memberCntStr: String(r.memberCnt)
        });
      });
      return { projectListInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    '/api/eln/project/projectList': function (p) {
      return HANDLERS['/api/eln/project/myProjectList'](p);
    },
    '/api/eln/note/projectNoteList': function (p) {
      var mno = Number(p.schProjectMno || p.projectMno || 301);
      var rows = applyFilter(
        ELN_NOTES.filter(function (n) { return n.projectMno === mno; }),
        p, { searchKeyword: ['noteNm', 'ownerNm'], schWriteStatusCcd: 'writeStatusCcd' }
      );
      return {
        noteListInfo: page(rows, p.pageNo, p.pageUnit),
        elnProjectProcessUseYn: 'Y',
        schElnNoteVO: { schProjectMno: mno, schFolderMno: Number(p.schFolderMno) || 0 }
      };
    },
    /*
      내 연구노트 / 프로젝트 상세의 목록 보기가 같이 쓰는 경로다.
      schProjectMno 가 실리면 그 프로젝트로 좁힌다 — 안 좁히면 프로젝트 상세에
      남의 프로젝트 노트까지 뜨고, 그러면 "노트가 프로젝트에 귀속된다"는 사실
      자체가 화면에서 부정된다.
    */
    '/api/eln/note/myNoteList': function (p) {
      var rows = ELN_NOTES;
      if (p.schProjectMno) {
        var mno = Number(p.schProjectMno);
        rows = rows.filter(function (n) { return n.projectMno === mno; });
      }
      rows = applyFilter(rows, p, {
        searchKeyword: ['noteNm', 'projectNm'], schWriteStatusCcd: 'writeStatusCcd'
      });
      return {
        noteListInfo: page(rows, p.pageNo, p.pageUnit),
        elnProjectProcessUseYn: p.schProjectMno ? 'Y' : 'N',
        schElnNoteVO: { schProjectMno: p.schProjectMno || null, schFolderMno: Number(p.schFolderMno) || 0 }
      };
    },
    '/api/eln/note/noteList': function (p) { return HANDLERS['/api/eln/note/myNoteList'](p); },
    '/api/eln/folder/projectFolderList': function () { return { folderList: [] }; },
    '/api/eln/folder/myFolderList': function () { return { folderList: [] }; },
    '/api/eln/project/projectFolderProcessList': function () { return { folderList: [], processList: [] }; },
    /*
      참여자는 프로젝트마다 다르다. 여기서 USERS 를 통째로 돌려주면 팝오버의
      인원수가 카드 배지(ELN_PROJECTS[].memberCnt)와 어긋난다 — 같은 화면에서
      같은 값이 둘로 갈리는 것이라, 보는 사람은 어느 쪽을 믿어야 할지 모른다.
      배지가 곧 이 목록의 길이가 되게 프로젝트별로 잘라 준다.
    */
    '/api/eln/member/projectMemberList': function (p) {
      var mno = Number(p.schProjectMno || p.projectMno) || 301;
      var rows = projectMembers(mno);
      return { memberListInfo: page(rows, p.pageNo, p.pageUnit) };
    },
    /*
      에디터로 연구노트 만들기. 여기서 실제로 목록에 넣어야 "만들었는데 없다"가
      되지 않는다. 노트는 고른 프로젝트에 귀속된다 — 그것이 구노 ELN 의 흐름이다.
    */
    '/api/eln/note/createNote': function (p) {
      /*
        사이드바의 생성 모달에는 프로젝트 칸이 없다. 실서비스에서도 그렇고,
        노트는 열려 있는 프로젝트 화면의 문맥으로 귀속된다.
        문맥이 없으면(참여 프로젝트 목록 등) 첫 프로젝트로 넣는다 — 시연에서
        "만들었는데 어디에도 없다"가 되지 않게 하기 위한 선택이다.
      */
      var mno = Number(p.projectMno || p.schProjectMno || currentProjectMno() || 301);
      var project = findBy(ELN_PROJECTS, 'projectMno', mno) || ELN_PROJECTS[0];
      var note = {
        noteMno: nextNoteMno++, projectMno: project.projectMno, projectNm: project.projectNm,
        // 생성 모달은 form.serialize() 결과를 그대로 싣는다 — 값이 퍼센트 인코딩돼 있다.
        folderMno: 0, noteNm: decodeParam(p.noteNm) || '제목 없는 연구노트', ownerNm: '김연구',
        modifyDtStr: '2026-07-30 09:00', writeStatusCcd: 'DRAFT', writeStatusCcdNm: '임시저장', keywords: '검증',
        editorTpCcd: 'EDITOR', editorTpCcdNm: '에디터', writeModeCcdNm: '온라인',
        sharedYn: 'N', keywords: '', processNm: null, projectPrgrstCcdNm: '진행',
        securityGradeCcdNm: '2등급'
      };
      ELN_NOTES.unshift(note);
      project.noteCnt += 1;
      return { newNoteMno: note.noteMno, noteMno: note.noteMno };
    },

    '/api/lims/note/noteDetail': function () {
      return { note: NOTE, blockList: NOTE_BLOCKS };
    },
    /*
      블록 저장. 화면은 블록 수만큼 이 경로를 순서대로 부르고, 새 블록에는
      blockMno 가 없어 채번 결과를 되돌려받는다. 여기서 상태를 실제로 갱신해야
      "저장했다고 나오는데 다시 열면 없다"가 되지 않는다.
    */
    '/api/lims/note/saveBlock': function (p) {
      var ord = Number(p.blockOrd) || (NOTE_BLOCKS.length + 1);
      var rows = [];
      if (p.rowsJson) {
        try { rows = JSON.parse(p.rowsJson) || []; } catch (e) { rows = []; }
      }
      var block = {
        blockMno: Number(p.blockMno) || nextBlockMno++,
        blockOrd: ord,
        blockTpCcd: p.blockTpCcd || 'TEXT',
        textVal: p.textVal || '',
        molblock: p.molblock || '',
        molFormula: p.molFormula || '',
        molWt: p.molWt === '' || p.molWt === undefined ? null : Number(p.molWt),
        exactMolWt: p.exactMolWt === '' || p.exactMolWt === undefined ? null : Number(p.exactMolWt),
        caption: p.caption || '',
        rowList: rows
      };
      var at = NOTE_BLOCKS.findIndex(function (b) { return b.blockMno === block.blockMno; });
      if (at < 0) { NOTE_BLOCKS.push(block); } else { NOTE_BLOCKS[at] = block; }
      NOTE_BLOCKS.sort(function (a, b) { return a.blockOrd - b.blockOrd; });
      return { blockMno: block.blockMno, noteMno: NOTE.noteMno };
    }
  };

  /* 사용자 선택 팝업 — 여러 화면이 같은 응답 키를 쓴다. */
  function userListResponse(p) {
    return { userListInfo: page(USERS, p.pageNo, p.pageUnit) };
  }

  /*
    프로젝트 참여자. 카드가 보여 주는 memberCnt 만큼을 USERS 에서 돌려 뽑아
    쓴다 — 두 숫자가 같은 곳에서 나와야 어긋나지 않는다.
    첫 사람이 책임자(role1), 나머지는 연구원(role0)이다. 화면의
    template_project_card_member 가 쓰는 필드를 그대로 채운다.
  */
  function projectMembers(projectMno) {
    var project = null;
    for (var i = 0; i < ELN_PROJECTS.length; i++) {
      if (ELN_PROJECTS[i].projectMno === Number(projectMno)) { project = ELN_PROJECTS[i]; break; }
    }
    var n = project ? project.memberCnt : USERS.length;
    var out = [];
    for (var k = 0; k < n; k++) {
      var u = USERS[k % USERS.length];
      var lead = k === 0;
      out.push({
        userMno: u.userMno, userNm: u.userNm, orztNm: u.orztNm,
        email: u.userNm === '김연구' ? 'kim@kmedihub.re.kr'
          : u.userNm === '박연구' ? 'park@kmedihub.re.kr'
          : u.userNm === '이연구' ? 'lee@kmedihub.re.kr' : 'qa@kmedihub.re.kr',
        fileId: '',
        projectMemberRoleCcd: lead ? '1' : '0',
        projectMemberRoleCcdNm: lead ? '책임자' : '연구원',
        authGrpNm: u.authGrpNm
      });
    }
    return out;
  }

  /* 쓰기 계열은 성공만 돌려준다. 화면은 곧바로 목록을 다시 읽고, 값은 고정 데이터라 그대로다.
     PoC 에서 "저장되는 것처럼 보이지만 사라지는" 동작을 만들지 않기 위한 선택이다. */
  var WRITE_DEFAULT = {
    newSampleNo: 'SMP-20260729-004', newAliquotNo: 'SMP-20260712-001-A05',
    newChildSampleMno: 5008, newTestReqstMno: 7001, newTestReqstNo: 'TR-20260713-02',
    resultSeqNo: 2, resultVerNo: 1, judgeCcd: 'PASS', retestTestItemMno: 8006,
    afterAmount: 600, nextCalDe: '20270511', regId: 'KM00003723',
    verNo: 4, barcode: 'RGT-000304', chargeYn: 'Y', indexSyncYn: 'Y',
    molFormula: 'C29H32N2O2', molWt: 440.587
  };

  /* ---------------------------------------------------------------
     쓰기 — 저장한 것이 화면에 남아야 한다.

     이전에는 성공만 돌려주고 데이터를 바꾸지 않았다. 그래서 시연 중에 시료를
     등록하면 "저장됐습니다"가 뜬 뒤 목록이 그대로여서, 보는 사람은 저장이
     실패한 것으로 읽는다. 메모리 배열에 실제로 반영한다.
     (새로고침하면 초기값으로 돌아간다 — 서버가 없으므로 그 이상은 하지 않는다)
  --------------------------------------------------------------- */
  var seq = { sample: 5100, aliquot: 90, reqst: 7100, item: 8100, result: 100,
              method: 450, spec: 550, instrument: 650, location: 50,
              reagent: 250, container: 350, compound: 10, cal: 80 };

  function nextNo(prefix, n) {
    return prefix + '-20260729-' + String(n % 1000).padStart(3, '0');
  }

  var WRITERS = {
    '/api/lims/sample/createSample': function (p) {
      var mno = ++seq.sample;
      var no = nextNo('SMP', mno);
      SAMPLES.unshift({
        sampleMno: mno, sampleNo: no, sampleNm: p.sampleNm || '(이름 없음)',
        sampleTpCcd: p.sampleTpCcd || 'COMPOUND', sampleSrcCcd: p.sampleSrcCcd || 'INTERNAL',
        sampleStatusCcd: 'STORED', projectMno: p.projectMno ? Number(p.projectMno) : null,
        projectNm: projectNmOf(p.projectMno), receiveDt: '2026-07-29',
        sourceDesc: p.sourceDesc || '', aliquotCnt: 1, activeAliquotCnt: 1,
        depthNo: 1, parentSampleNo: null
      });
      return { newSampleNo: no, newSampleMno: mno };
    },
    '/api/lims/sample/createAliquot': function (p) {
      var n = ++seq.aliquot;
      var no = 'SMP-20260712-001-A' + String(n).padStart(2, '0');
      ALIQUOTS.push({
        aliquotMno: n, aliquotNo: no, aliquotTpCcd: p.aliquotTpCcd || 'SPLIT',
        vesselTpCcd: p.vesselTpCcd || 'VIAL', amount: Number(p.amount) || 0,
        unitCcd: p.unitCcd || 'mg', locationNm: locationNmOf(p.locationMno),
        aliquotDt: '2026-07-29', aliquotStatusCcd: 'IN_USE',
        parentAliquotNo: 'SMP-20260712-001-A01', childSampleNo: null
      });
      return { newAliquotNo: no };
    },
    '/api/lims/test/createTestRequest': function (p) {
      var mno = ++seq.reqst;
      var no = nextNo('TR', mno);
      var s = findBy(SAMPLES, 'sampleMno', p.sampleMno) || SAMPLES[0];
      REQUESTS.unshift({
        testReqstMno: mno, testReqstNo: no, sampleMno: s.sampleMno, sampleNo: s.sampleNo,
        sampleNm: s.sampleNm, testPurposeCcd: p.testPurposeCcd || 'RELEASE',
        testPurposeCcdNm: '출하', testReqstStatusCcd: 'REQUESTED', testReqstStatusCcdNm: '접수대기',
        hopeDe: (p.hopeDe || '20260810').replace(/-/g, ''), reqstUserNm: '김연구',
        itemCnt: 1, doneItemCnt: 0, waitingItemCnt: 1, oosItemCnt: 0,
        urgentYn: p.urgentYn === 'Y' ? 'Y' : 'N'
      });
      return { newTestReqstMno: mno, newTestReqstNo: no };
    },
    '/api/lims/result/createResult': function (p) {
      var seqNo = RESULTS.length + 1;
      var val = p.resultVal;
      var judge = judgeAgainstSpec(val, SPECS[0]);
      RESULTS.push({
        resultMno: ++seq.result, resultSeqNo: seqNo, resultVerNo: 1, resultVal: val,
        unitCcd: SPECS[0].unitCcd, specJudgeTpCcd: SPECS[0].judgeTpCcd,
        specLowerVal: SPECS[0].lowerVal, specUpperVal: SPECS[0].upperVal, specExpectVal: null,
        judgeCcd: judge, judgeRsn: null, inputUserNm: '김연구', inputDt: '2026-07-29 10:20'
      });
      return { resultSeqNo: seqNo, resultVerNo: 1, judgeCcd: judge };
    },
    '/api/lims/method/createMethod': function (p) {
      var mno = ++seq.method;
      METHODS.unshift({
        methodMno: mno, methodCd: p.methodCd || ('M-NEW-' + mno),
        methodNm: p.methodNm || '(이름 없음)', methodTpCcd: p.methodTpCcd || 'HPLC',
        instrumentTpCcd: p.instrumentTpCcd || 'HPLC', methodStatusCcd: 'DRAFT',
        effectDe: null, verNo: 1, verCnt: 1, inProgressCnt: 0
      });
      return { methodMno: mno };
    },
    '/api/lims/instrument/createInstrument': function (p) {
      var mno = ++seq.instrument;
      INSTRUMENTS.unshift({
        instrumentMno: mno, instrumentCd: p.instrumentCd || ('EQ-' + mno),
        instrumentNm: p.instrumentNm || '(이름 없음)', instrumentTpCcd: p.instrumentTpCcd || 'HPLC',
        modelNm: p.modelNm || null, locationNm: locationNmOf(p.locationMno),
        instrumentStatusCcd: 'ACTIVE', lastCalDe: null, nextCalDe: null, calState: 'NONE'
      });
      return { instrumentMno: mno };
    },
    '/api/lims/location/createLocation': function (p) {
      var mno = ++seq.location;
      LOCATIONS.push({
        locationMno: mno, locationNm: p.locationNm || '(이름 없음)',
        fullPathNm: p.locationNm || '(이름 없음)', locationTpCcd: p.locationTpCcd || 'SHELF',
        level: p.upperLocationMno ? 2 : 1, barcodePrefix: p.barcodePrefix || null,
        temperature: p.temperature || null, containerCnt: 0
      });
      return { locationMno: mno };
    },
    '/api/lims/reagent/createReagent': function (p) {
      var mno = ++seq.reagent;
      REAGENTS.unshift({
        reagentMno: mno, reagentNm: p.reagentNm || '(이름 없음)', casNo: p.casNo || null,
        molFormula: p.molFormula || null, molWt: p.molWt ? Number(p.molWt) : null,
        density: p.density ? Number(p.density) : null, ghsCcd: p.ghsCcd || null,
        containerCnt: 0, totalAmountDisp: null
      });
      return { reagentMno: mno };
    }
  };

  function findBy(list, key, val) {
    for (var i = 0; i < list.length; i++) {
      if (String(list[i][key]) === String(val)) return list[i];
    }
    return null;
  }

  function projectNmOf(mno) {
    var hit = findBy([
      { projectMno: 301, projectNm: '표적단백질 저해제 발굴' },
      { projectMno: 302, projectNm: '간독성 스크리닝' },
      { projectMno: 303, projectNm: '시험법 검증 (KM-3719)' },
      { projectMno: 304, projectNm: '장기 안정성 시험' }
    ], 'projectMno', mno);
    return hit ? hit.projectNm : null;
  }

  function locationNmOf(mno) {
    var hit = findBy(LOCATIONS, 'locationMno', mno);
    return hit ? hit.fullPathNm : LOCATIONS[2].fullPathNm;
  }

  /* 판정 — 화면이 보여주는 규칙(경계값 포함, 소수 자리 반올림)과 같게 계산한다. */
  function judgeAgainstSpec(rawVal, spec) {
    var v = parseFloat(rawVal);
    if (isNaN(v) || !spec) return 'NA';
    if (spec.decimalPt !== null && spec.decimalPt !== undefined) {
      var f = Math.pow(10, spec.decimalPt);
      v = Math.round(v * f) / f;
    }
    if (spec.lowerVal !== null && spec.lowerVal !== undefined && v < spec.lowerVal) return 'FAIL';
    if (spec.upperVal !== null && spec.upperVal !== undefined && v > spec.upperVal) return 'FAIL';
    return 'PASS';
  }

  function respond(path, params) {
    /*
      이 지름길이 /api/eln/member/projectMemberList 를 통째로 가로채고 있었다.
      결과가 둘이었다.
        1) userListResponse 는 봉투(envelope)를 안 거쳐서 status 가 없다 —
           화면은 data.status.result 를 읽으므로 콜백이 터진다. 그래서
           프로젝트 카드의 참여자 팝오버가 열려도 목록이 채워지지 않고
           "전체 참여자 (0)" 로 남았다(카드 배지는 4 인데).
        2) 밑에 있던 전용 핸들러는 한 번도 불리지 않는 죽은 코드였다.
      전용 핸들러가 있으면 그쪽이 먼저다. 지름길은 못 찾았을 때만.
    */
    var handler = HANDLERS[path];
    if (!handler && /userList|userOption|memberList/i.test(path)) {
      return envelope(userListResponse(params));
    }
    var body;
    if (handler) {
      body = handler(params);
      // 핸들러가 실제 서비스에 물어보는 경우가 있다(구조 계산). 그때는 Promise 다.
      if (body && typeof body.then === 'function') {
        return body.then(envelope);
      }
    } else if (WRITERS[path]) {
      body = Object.assign(JSON.parse(JSON.stringify(WRITE_DEFAULT)), WRITERS[path](params));
    } else {
      body = JSON.parse(JSON.stringify(WRITE_DEFAULT));
    }
    return envelope(body);
  }

  /* 실제 컨트롤러가 씌우는 봉투. 화면의 성공 분기가 이 두 값을 본다. */
  function envelope(body) {
    body = body || {};
    body.status = { result: 'SUCCESS', message: '', code: '200' };
    body.s2ResultCode = 1;   /* 컨트롤러가 Constants.RESULT_CODE 로 넣는 값과 같은 숫자 1 이다 */
    return body;
  }

  function parseParams(data) {
    if (!data) return {};
    if (typeof data !== 'string') return data;
    var out = {};
    data.split('&').forEach(function (pair) {
      if (!pair) return;
      var i = pair.indexOf('=');
      var k = decodeURIComponent((i < 0 ? pair : pair.slice(0, i)).replace(/\+/g, ' '));
      var v = i < 0 ? '' : decodeURIComponent(pair.slice(i + 1).replace(/\+/g, ' '));
      out[k] = v;
    });
    return out;
  }

  /* ---------------------------------------------------------------
     설치 — jQuery 와 core 스크립트가 모두 올라온 뒤에 끼워넣는다.
  --------------------------------------------------------------- */
  function install() {
    var origAjax = $.ajax;

    $.ajax = function (options) {
      var opts = options || {};
      var url = String(opts.url || '');
      var path = url.split('?')[0];

      if (path.indexOf('/api/') !== 0) {
        return origAjax.apply(this, arguments);
      }

      /*
        응답이 Promise 일 수 있다 — 구조 계산은 실제 백엔드로 나간다.
        아직 안 온 값을 기다렸다가 같은 순서로 콜백을 부른다.
      */
      var pending = Promise.resolve(respond(path, parseParams(opts.data)));
      var body = null;
      var aborted = false;

      pending.then(function (res) {
        body = res;
        if (aborted) return;
        // 즉답이면 40ms 를 얹어 실제 왕복처럼 보이게 한다(화면이 로딩 상태를 그린다).
        setTimeout(function () {
          if (aborted) return;
          if (typeof opts.success === 'function') opts.success(body, 'success', fakeXhr);
          if (typeof opts.complete === 'function') opts.complete(fakeXhr, 'success');
        }, 40);
      });

      function later(fn) { pending.then(function (res) { setTimeout(function () { fn(res); }, 40); }); }

      var fakeXhr = {
        status: 200,
        get responseText() { return JSON.stringify(body); },
        abort: function () { aborted = true; },
        done: function (fn) { later(fn); return fakeXhr; },
        fail: function () { return fakeXhr; },
        always: function (fn) { later(fn); return fakeXhr; }
      };
      return fakeXhr;
    };

    // 페이지 이동을 정적 파일로 돌린다. 그대로 두면 서버 경로로 나가 404 가 뜬다.
    if (typeof coreCommon !== 'undefined' && coreCommon) {
      coreCommon.href = function (url) {
        var target = toStaticUrl(url);
        window.location.href = target || '#';
      };
      if (typeof coreCommon.getUrl === 'function') {
        var origGetUrl = coreCommon.getUrl;
        coreCommon.getUrl = function (url) {
          return String(url).indexOf('/api/') === 0 ? url : origGetUrl.apply(this, arguments);
        };
      }
    }
    /*
      s2.util.js 는 `const S2Util = (function(){…})()` 로 선언한다. const 는 window 에
      속성을 만들지 않으므로 window.S2Util 로 찾으면 없다고 나오고, 이 덮어쓰기가
      통째로 건너뛰어져 화면 이동이 서버 경로로 나가 404 가 됐다.
      전역 어휘 스코프의 이름을 직접 본다.
    */
    /*
      window.open 으로 여는 구조 입력기 팝업.
      서버 경로를 정적 파일로 바꾸되 창은 진짜로 연다. 같은 창으로 보내면
      window.opener 가 없어져, 편집기가 구조를 되돌려주는 경로
      (applyStructureToOpener → opener.limsApplyStructureQuery)가 성립하지 않는다.
    */
    var origOpen = window.open;
    window.open = function (url, name, features) {
      var target = toStaticUrl(url);
      if (target) {
        return origOpen.call(window, target, name || '_blank', features);
      }
      return origOpen.apply(window, arguments);
    };

    /*
      연구노트 생성(에디터 작성). 공통 layout 의 모달은 coreFileUpload 로 보내는데
      그건 XHR 직접 호출이라 $.ajax 대역을 지나지 않는다. 같은 계약으로 대신 답한다.
      — 여기서 노트가 실제로 생기고, 고른 프로젝트에 귀속된다.
    */
    if (typeof window.coreFileUpload !== 'undefined') {
      window.coreFileUpload = function (id, url, postData, files, onSuccess) {
        var path = String(url || '').split('?')[0].replace(/^https?:\/\/[^/]+/, '');
        var body = respond(path, postData || {});
        setTimeout(function () {
          if (typeof onSuccess === 'function') onSuccess(body);
        }, 60);
        return { abort: function () {} };
      };
    }

    if (typeof S2Util !== 'undefined' && S2Util) {
      S2Util.goPage = function (url) {
        var target = toStaticUrl(url);
        if (!target) { window.location.href = '#'; return; }
        /*
          연구노트 작성·상세는 새 창으로 연다. 그 화면에는 GNB·헤더가 없고
          (노트 전용 레이아웃) 본문에 집중하는 자리이므로, 목록 화면을 덮어쓰지
          않고 따로 띄우는 것이 구노의 기존 동작이다.
        */
        if (NEW_WINDOW_PAGES.indexOf(target) >= 0) {
          window.open(target, 'goonoNote_' + Date.now(),
            'width=1440,height=960,scrollbars=yes,resizable=yes');
          return;
        }
        window.location.href = target;
      };
    }

    /*
      PoC 배너와 업무 흐름 바를 붙이던 자리다. 둘 다 뗐다 —
      화면 맨 위 두 줄을 차지하면서 정작 화면이 무엇인지는 아래에서 다시 말한다.
      시연에서 설명할 것은 말로 하고, 화면은 화면만 보여준다.
      (흐름 바 코드는 남겨 두었다. 필요하면 installFlowBar() 한 줄만 되살리면 된다.)
    */
    installChemEditorStub();
    installInlineEditorSwap();
    installOutOfScopeNotice();
  }

  /* ---------------------------------------------------------------
     범위 밖 메뉴.

     GNB 에는 구노 ELN 기본 메뉴(대시보드·연구노트 등)도 함께 뜬다. 실제 서비스의
     사이드바를 그대로 쓰기 때문이고, 그게 맞다. 다만 프로토타입에는 그 화면이 없어
     눌러도 아무 일이 없다 — 시연에서는 "고장난 것"으로 읽힌다.
     범위 밖이라는 사실을 눌렀을 때 말해 준다.
  --------------------------------------------------------------- */
  function installOutOfScopeNotice() {
    document.querySelectorAll('.nav-menu a.menuCd').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && href !== '#') return;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        toast('이 메뉴는 구노 ELN 기본 기능으로, 이번 LIMS PoC 범위 밖입니다.');
      });
    });
  }

  var toastTimer = null;
  function toast(message) {
    var el = document.getElementById('limsPocToast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'limsPocToast';
      el.className = 'lims-poc-toast';
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('on'); }, 2600);
  }

  /* ---------------------------------------------------------------
     구조 입력기 — 실서비스는 Ketcher 를 iframe 으로 띄운다.
     프로토타입에는 그 서버가 없어 빈 프레임만 남았다. 재단이 "메인 기능"으로
     지목한 것이 바로 이 화면(구조를 넣으면 분자식·분자량이 즉시 나온다)이므로,
     빈 채로 두지 않고 RDKit 이 미리 그려 둔 구조와 계산값으로 대신 보여준다.
  --------------------------------------------------------------- */
  /*
    배포본에서는 chemeditor SPA(오픈소스 Ketcher 기반, ChemDraw/PerkinElmer 호환)가
    사이트 루트에 함께 올라가고 프로토타입은 그 아래 한 칸(/lims-poc/)에 있다.
    그래서 "상위 디렉터리가 있으면 거기에 편집기가 있다"로 판단한다.
    로컬 정적 서버에서는 프로토타입 자체가 루트라 상위가 없고, 그때는 RDKit 대역을 쓴다.
    호스트 이름으로 가르지 않는 이유: 도메인이 바뀌면 조용히 틀리기 때문이다.

    편집기 주소는 루트(`/`)가 아니라 `/editor` 다. 루트에는 "첫 화면을 LIMS 로"
    보내는 리다이렉트가 걸려 있어서, iframe 에 `/` 를 넣으면 편집기가 아니라
    LIMS 프로토타입이 자기 자신 안에 다시 뜬다. vercel.json 이 `/editor` 를
    SPA 로 rewrite 한다(리다이렉트가 아니라 rewrite 라 주소가 바뀌지 않는다).
  */
  var CHEM_EDITOR_PATH = 'editor';

  function chemEditorRoot() {
    var dir = window.location.pathname.replace(/[^/]*$/, '');
    if (dir === '/' || dir === '') return null;
    return dir.replace(/[^/]+\/$/, '');
  }

  /* 편집기 임베드 URL. 없으면 null — 부르는 쪽이 RDKit 대역으로 넘어간다. */
  function chemEditorUrl() {
    var root = chemEditorRoot();
    if (!root) return null;
    return root + CHEM_EDITOR_PATH
      + '?embed=1&parentOrigin=' + encodeURIComponent(window.location.origin);
  }

  function installChemEditorStub() {
    var frame = document.getElementById('chem-frame');
    if (!frame) return;

    var url = chemEditorUrl();
    if (url) {
      /*
        실제 편집기를 붙인다. 화면(chem_popup)의 postMessage 리스너는 이미 붙어
        있고 같은 오리진이라 origin 검사도 통과한다 — src 만 실물로 바꾸면 된다.

        화면의 initPage() 가 $(document).ready 에서 src 를 서버 경로로 넣는다.
        우리 스크립트가 그보다 뒤에 실리므로 ready 큐 맨 끝에 붙여 마지막에 덮는다.
        (지금 바로 넣으면 잠시 뒤 initPage 가 다시 서버 경로로 되돌려 놓는다.)

        편집기가 8초 안에 아무 말도 하지 않으면 붙지 않은 것이다. 빈 사각형만
        남겨 두지 않고 RDKit 대역으로 내려간다 — 시연 중 "화면이 비었다"가
        제일 나쁜 결과다.
      */
      $(function () {
        frame.src = url;
        var status = document.getElementById('chem-status');
        if (status) status.textContent = '편집기 불러오는 중';
        var alive = false;
        window.addEventListener('message', function (ev) {
          if (ev.data && typeof ev.data.type === 'string'
              && ev.data.type.indexOf('chemeditor:') === 0) alive = true;
        });
        setTimeout(function () {
          if (alive || !document.getElementById('chem-frame')) return;
          if (status) status.textContent = '편집기에 연결하지 못해 RDKit 구조로 대신 표시합니다';
          installRdkitFallback();
        }, 8000);
      });
      return;
    }
    installRdkitFallback();
  }

  /*
    연구노트의 인라인 구조 입력기.

    화면은 서버 설정값(lims.chem.embed.url)으로 iframe 을 만든다. 프로토타입에는
    그 설정이 없으므로 iframe 이 생기는 순간 실제 편집기 주소로 바꿔치기한다.
    편집기가 없는 로컬에서는 iframe 을 걷어내고 RDKit 이 그려 둔 구조를 고르는
    대역을 그 자리에 넣는다 — 빈 사각형을 남기지 않는다.
  */
  function installInlineEditorSwap() {
    if (!document.getElementById('noteBlocks')) return;
    var url = chemEditorUrl();

    new MutationObserver(function (recs) {
      recs.forEach(function (r) {
        Array.prototype.forEach.call(r.addedNodes, function (n) {
          if (!n.querySelectorAll) return;
          var frames = n.matches && n.matches('iframe.lims-note-struct-frame')
            ? [n] : n.querySelectorAll('iframe.lims-note-struct-frame');
          Array.prototype.forEach.call(frames, function (f) {
            if (url) { f.src = url; return; }
            f.parentNode.replaceChild(inlinePicker(f), f);
          });
        });
      });
    }).observe(document.getElementById('noteBlocks'), { childList: true, subtree: true });
  }

  /* 편집기가 없을 때 쓰는 구조 선택 대역. 고르면 화면의 붙여넣기 경로로 들어간다. */
  function inlinePicker(frame) {
    var lib = window.LIMS_POC_COMPOUNDS || [];
    var wrap = document.createElement('div');
    wrap.className = 'lims-note-struct-picker';
    wrap.innerHTML = '<p class="lims-note-struct-picker-note">'
      + '이 환경에는 구조 입력기 서버가 없습니다. 배포본에서는 이 자리에 Ketcher 가 열립니다.<br>'
      + '아래에서 구조를 고르면 편집기에서 확정한 것과 같은 경로로 들어갑니다.</p>';
    lib.forEach(function (c) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'button-gray-line-sty01';
      btn.innerHTML = '<span>' + c.regId + '</span>';
      btn.onclick = function () {
        if (typeof window.limsApplyStructureQuery === 'function') {
          window.limsApplyStructureQuery(c.molblock);
        }
      };
      wrap.appendChild(btn);
    });
    return wrap;
  }

  /* 편집기가 없을 때 그 자리를 채우는 RDKit 대역. */
  function installRdkitFallback() {
    var frame = document.getElementById('chem-frame');
    if (!frame) return;

    var lib = window.LIMS_POC_COMPOUNDS || [];
    if (!lib.length) return;

    var wrap = document.createElement('div');
    wrap.className = 'lims-chem-stub';
    wrap.innerHTML =
      '<div class="lims-chem-stub-canvas" id="chemStubCanvas"></div>' +
      '<div class="lims-chem-stub-side">' +
      '  <div class="lims-chem-stub-title">구조 불러오기</div>' +
      '  <div class="lims-chem-stub-note">실제 화면에서는 이 자리에 Ketcher 편집기가 열립니다. ' +
      '구조를 그리거나 ChemDraw 에서 복사해 붙여넣으면 아래 물성이 즉시 갱신됩니다.</div>' +
      '  <div class="lims-chem-stub-list" id="chemStubList"></div>' +
      '</div>';
    frame.parentNode.replaceChild(wrap, frame);

    var list = document.getElementById('chemStubList');
    lib.forEach(function (c, i) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lims-chem-stub-item' + (i === 0 ? ' on' : '');
      btn.textContent = c.regId;
      btn.onclick = function () {
        Array.prototype.forEach.call(list.children, function (el) { el.classList.remove('on'); });
        btn.classList.add('on');
        showStructure(c);
      };
      list.appendChild(btn);
    });
    showStructure(lib[0]);
  }

  function showStructure(c) {
    var canvas = document.getElementById('chemStubCanvas');
    if (canvas) canvas.innerHTML = c.svg;

    setProp('prop-formula', c.molFormula);
    setProp('prop-molwt', Number(c.molWt).toFixed(3));
    setProp('prop-exact', Number(c.exactMolWt).toFixed(4));

    var status = document.getElementById('chem-status');
    if (status) {
      status.textContent = 'RDKit 계산 완료 · ' + c.regId;
    }
  }

  function setProp(id, value) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = value;
    el.classList.remove('empty');
  }

  /* ---------------------------------------------------------------
     업무 흐름 안내 — 화면 하나만 보면 순서를 알 수 없다.
     지금 보는 화면이 전체 흐름의 몇 번째인지, 다음이 무엇인지 같이 보여준다.
  --------------------------------------------------------------- */
  /*
    업무 흐름 바.

    이전에는 시료→시험요청→판정→기준이탈→시험법→장비 일곱 단계를 늘어놓았다.
    그런데 2026-07-09 재단 미팅에서 요구된 것은 그 워크플로가 아니다. 결론은 셋이었다.
      · 분자구조를 붙여넣으면 그 자리에서 분자식·분자량이 계산된다 ("메인기능")
      · 화합물 라이브러리 연계 및 관리
      · 시약 관리 데이터 연계 및 관리
    흐름 바가 요구되지 않은 것을 먼저 보여주면 시연의 초점이 어긋난다.
    핵심 세 축을 앞세우고, QC 워크플로는 '확장 검토'로 내려 둘을 구분한다.
  */
  var FLOW = [
    { file: 'participation_project.html', label: '① 프로젝트 · 연구노트' },
    { file: 'compound_list.html',         label: '② 화합물 라이브러리' },
    { file: 'reagent_list.html',          label: '③ 시약 · 재고' }
  ];

  /*
    바코드 스캔은 ③ 시약·재고 안의 수단이라 메뉴에서 내렸다. 그렇다고 화면까지
    닿을 수 없게 두면 구현해 둔 기능(기한 경과 용기 사용 통제)을 시연할 방법이
    없어진다. 번호 없는 곁가지로 붙여 둔다.
  */
  var FLOW_SUB = [
    { file: 'scan.html', label: '바코드 스캔' }
  ];

  var FLOW_EXT = [
    { file: 'test_list.html',    label: '시험 요청' },
    { file: 'result_entry.html', label: '결과 · 판정' },
    { file: 'oos_list.html',     label: '기준이탈' }
  ];

  function stepHtml(step, here) {
    return step.file === here
      ? '<span class="lims-poc-step on">' + step.label + '</span>'
      : '<a class="lims-poc-step" href="' + step.file + '">' + step.label + '</a>';
  }

  function installFlowBar() {
    var here = (window.location.pathname.split('/').pop() || 'participation_project.html');
    /*
      본문(#main) 안에 넣으면 화면마다 다른 자리에 끼어든다 — 프로젝트 상세에서는
      탭과 목록 사이에 들어가 화면을 두 동강 낸다. 문서 맨 위, PoC 배너 바로 아래에
      고정한다. 어느 화면에서든 같은 자리다.
    */
    var host = document.body;
    if (!host) return;

    var html = '<div class="lims-poc-flow-label">핵심 기능</div>';
    FLOW.forEach(function (step, i) {
      if (i) html += '<span class="lims-poc-arrow">▶</span>';
      html += stepHtml(step, here);
    });

    FLOW_SUB.forEach(function (step) {
      html += '<span class="lims-poc-sub">' + stepHtml(step, here) + '</span>';
    });

    // 확장 검토 묶음은 한 단 낮춰 둔다 — 요구된 것과 덧붙인 것이 같은 줄에 있으면 구분이 안 된다.
    html += '<div class="lims-poc-flow-ext">';
    html += '<span class="lims-poc-flow-label">확장 검토</span>';
    FLOW_EXT.forEach(function (step, i) {
      if (i) html += '<span class="lims-poc-arrow">▶</span>';
      html += stepHtml(step, here);
    });
    html += '</div>';

    var bar = document.createElement('div');
    bar.className = 'lims-poc-flow';
    bar.innerHTML = html;
    var banner = document.querySelector('.lims-poc-banner');
    host.insertBefore(bar, banner ? banner.nextSibling : host.firstChild);
  }

  if (window.jQuery) {
    install();
  } else {
    document.addEventListener('DOMContentLoaded', install);
  }
  /*
    검수용 창구. 목이 들고 있는 데이터를 밖에서 읽을 수 있게 한다 —
    "이 목록에 그 프로젝트 것만 나오는가" 같은 것을 개수로 못 박지 않고
    실제 데이터와 대조해 확인하기 위해서다. 프로토타입 전용 파일이다.
  */
  window.LIMS_POC_NOTES = ELN_NOTES;
  window.LIMS_POC_REVIEWS = REVIEWS;

})();
