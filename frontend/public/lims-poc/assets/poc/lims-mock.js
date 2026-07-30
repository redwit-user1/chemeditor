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
  var ROUTES = {
    '/lims/sample/sampleList': 'sample_list.html',
    '/lims/sample/sampleDetails': 'sample_detail.html',
    '/lims/test/testRequestList': 'test_list.html',
    '/lims/test/testRequestDetails': 'test_detail.html',
    '/lims/result/resultEntry': 'result_entry.html',
    '/lims/oos/oosList': 'oos_list.html',
    '/lims/method/methodList': 'method_list.html',
    '/lims/method/methodDetail': 'method_detail.html',
    '/lims/spec/specList': 'method_list.html',
    '/lims/instrument/instrumentList': 'instrument_list.html',
    '/lims/reagent/reagentList': 'reagent_list.html',
    '/lims/location/locationList': 'location_list.html',
    '/lims/compound/compoundList': 'compound_list.html',
    '/lims/container/scan': 'scan.html',
    '/lims/chem/chemPopup': 'chem_editor.html',
    '/lims/note/noteWrite': 'note_write.html'
  };

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
  var NOTE = {
    noteMno: 9101, noteNm: 'KM00003710 합성 — batch A',
    projectMno: 301, projectNm: '표적단백질 저해제 발굴',
    writerNm: '이연구', writeDtStr: '2026-07-12 17:40', statusCcd: 'WRITING'
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

  var SAMPLE_NOTES = [
    { noteMno: 9101, noteNm: 'KM00003710 합성 — batch A', projectNm: '표적단백질 저해제 발굴',
      createUserNm: '이연구', modifyDtStr: '2026-07-12 17:40', writeStatusCcd: 'COMPLETE' },
    { noteMno: 9102, noteNm: 'HPLC 순도 분석 (M-HPLC-001 v3)', projectNm: '표적단백질 저해제 발굴',
      createUserNm: '김연구', modifyDtStr: '2026-07-27 14:22', writeStatusCcd: 'INSPECTION' },
    { noteMno: 9104, noteNm: '분주 A03 이동 기록', projectNm: '표적단백질 저해제 발굴',
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
    '/api/lims/sample/sampleNoteList': function () {
      return { noteList: SAMPLE_NOTES };
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
      return { depict: DEPICT_BY_MOLBLOCK[p.structure] || (hit && hit.svg) || PLACEHOLDER_SVG };
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
      if (!hit) {
        toast('데모 데이터에 없는 구조입니다. 실서버에서는 RDKit 이 그 자리에서 계산합니다.');
        return { properties: {} };
      }
      return { properties: hit.properties };
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
    if (/userList|userOption|memberList/i.test(path)) {
      return userListResponse(params);
    }
    var handler = HANDLERS[path];
    var body;
    if (handler) {
      body = handler(params);
    } else if (WRITERS[path]) {
      body = Object.assign(JSON.parse(JSON.stringify(WRITE_DEFAULT)), WRITERS[path](params));
    } else {
      body = JSON.parse(JSON.stringify(WRITE_DEFAULT));
    }
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

      var body = respond(path, parseParams(opts.data));
      var timer = setTimeout(function () {
        if (typeof opts.success === 'function') {
          opts.success(body, 'success', fakeXhr);
        }
        if (typeof opts.complete === 'function') {
          opts.complete(fakeXhr, 'success');
        }
      }, 40);

      var fakeXhr = {
        status: 200,
        responseText: JSON.stringify(body),
        abort: function () { clearTimeout(timer); },
        done: function (fn) { setTimeout(function () { fn(body); }, 40); return fakeXhr; },
        fail: function () { return fakeXhr; },
        always: function (fn) { setTimeout(function () { fn(body); }, 40); return fakeXhr; }
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
      프로토타입에는 서버 라우트가 없어 팝업이 빈 창으로 뜬다. 같은 창에서
      구조 입력기 화면으로 보내 시연 흐름이 끊기지 않게 한다.
    */
    var origOpen = window.open;
    window.open = function (url) {
      var target = toStaticUrl(url);
      if (target) {
        window.location.href = target;
        return null;
      }
      return origOpen.apply(window, arguments);
    };

    if (typeof S2Util !== 'undefined' && S2Util) {
      S2Util.goPage = function (url) {
        var target = toStaticUrl(url);
        window.location.href = target || '#';
      };
    }

    // 시연 중임을 화면에 명시한다. 데이터가 진짜라고 오해할 여지를 남기지 않는다.
    var banner = document.createElement('div');
    banner.className = 'lims-poc-banner';
    banner.innerHTML = '<b>PoC 프로토타입</b>' +
      '<span>Goono ELN 실제 화면·CSS 그대로입니다. 데이터는 고정 예시이고 서버·DB 는 연결돼 있지 않습니다.</span>';
    document.body.insertBefore(banner, document.body.firstChild);

    installFlowBar();
    installChemEditorStub();
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
  function installChemEditorStub() {
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
    { file: 'note_write.html',    label: '① 연구노트 · 구조 입력' },
    { file: 'compound_list.html', label: '② 화합물 라이브러리' },
    { file: 'reagent_list.html',  label: '③ 시약 · 재고' }
  ];

  var FLOW_EXT = [
    { file: 'test_list.html',    label: '시험 요청' },
    { file: 'result_entry.html', label: '결과 · 판정' },
    { file: 'oos_list.html',     label: '기준이탈' }
  ];

  /* 화면마다 "여기서 무슨 일이 일어나는가"를 한 문장으로. 용어는 docs/lims/glossary.md 기준. */
  var FLOW_NOTE = {
    'note_write.html': '이 PoC 의 메인 기능입니다. 구조를 그리거나 ChemDraw 에서 복사해 붙여넣으면 그 자리에서 분자식·분자량·Exact Mass 가 계산됩니다.',
    'compound_list.html': '등록된 화합물 저장소입니다. 등록번호·분자식으로 찾거나, 구조를 그려 부분구조·유사도로 찾습니다.',
    'chem_editor.html': '구조를 그리거나 붙여넣는 도구입니다. 확정하면 연구노트나 화합물 라이브러리로 넘어갑니다.',
    'reagent_list.html': '시약은 품목, 용기는 실물 한 병입니다. 재고는 입고·사용·폐기 이력의 합계이며 이력은 지워지지 않습니다.',
    'scan.html': '바코드를 찍어 용기를 조회하고 사용량을 기록합니다. 기한이 지난 용기는 사유 없이 사용할 수 없습니다.',
    'location_list.html': '보관위치 계층입니다. 바코드 접두사와 온도 조건을 위치에 매답니다.',
    'sample_list.html': '시험 대상 검체입니다. 시약(실험에 쓰는 물질)과 반대 개념입니다.',
    'sample_detail.html': '분주는 물리적 분할이라 같은 시료로 남고, 화학적으로 달라지면 새 시료가 됩니다.',
    'test_list.html': '시료에 대한 시험 요청입니다. 접수 대기 건을 열어 담당자를 배정하면 접수됩니다.',
    'test_detail.html': '항목마다 시험법·판정기준 버전을 고정합니다. 착수한 시험은 시험법이 개정돼도 착수 시점 버전을 계속 씁니다.',
    'result_entry.html': '값을 저장하면 그 시점 판정기준으로 즉시 판정하고, 판정에 쓴 기준값을 결과에 함께 남깁니다. 결과는 지울 수 없고 정정은 새 버전으로 쌓입니다.',
    'oos_list.html': '판정이 부적합·판정불가일 때 자동으로 열리는 조사 건입니다. 사람이 직접 등록하지 않습니다.',
    'method_list.html': '시험법은 "어떻게 측정하는가", 판정기준은 "얼마면 적합인가" 입니다. 둘 다 버전으로 관리합니다.',
    'method_detail.html': '개정 이력과 판정기준 목록입니다. 폐지된 버전도 지우지 않습니다 — 과거 판정을 재현해야 하기 때문입니다.',
    'instrument_list.html': '교정이 만료된 장비로는 결과를 입력할 수 없습니다.'
  };

  function stepHtml(step, here) {
    return step.file === here
      ? '<span class="lims-poc-step on">' + step.label + '</span>'
      : '<a class="lims-poc-step" href="' + step.file + '">' + step.label + '</a>';
  }

  function installFlowBar() {
    var here = (window.location.pathname.split('/').pop() || 'note_write.html');
    var host = document.querySelector('.content-wrapper #main') || document.querySelector('.content-wrapper');
    if (!host) return;

    var html = '<div class="lims-poc-flow-label">핵심 기능</div>';
    FLOW.forEach(function (step, i) {
      if (i) html += '<span class="lims-poc-arrow">▶</span>';
      html += stepHtml(step, here);
    });

    // 확장 검토 묶음은 한 단 낮춰 둔다 — 요구된 것과 덧붙인 것이 같은 줄에 있으면 구분이 안 된다.
    html += '<div class="lims-poc-flow-ext">';
    html += '<span class="lims-poc-flow-label">확장 검토</span>';
    FLOW_EXT.forEach(function (step, i) {
      if (i) html += '<span class="lims-poc-arrow">▶</span>';
      html += stepHtml(step, here);
    });
    html += '</div>';

    if (FLOW_NOTE[here]) {
      html += '<div class="lims-poc-note">' + FLOW_NOTE[here] + '</div>';
    }

    var bar = document.createElement('div');
    bar.className = 'lims-poc-flow';
    bar.innerHTML = html;
    host.insertBefore(bar, host.firstChild);
  }

  if (window.jQuery) {
    install();
  } else {
    document.addEventListener('DOMContentLoaded', install);
  }
})();
