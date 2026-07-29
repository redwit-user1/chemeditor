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
    '/lims/container/scan': 'scan.html'
  };

  function toStaticUrl(url) {
    if (!url) return null;
    var path = String(url).split('?')[0];
    return Object.prototype.hasOwnProperty.call(ROUTES, path) ? ROUTES[path] : null;
  }

  /* ---------------------------------------------------------------
     고정 데이터 — 기획서/DDL 의 코드값을 그대로 쓴다.
  --------------------------------------------------------------- */
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
      projectMno: 303, projectNm: '분석법 검증 (KM-3719)', receiveDt: '2026-06-28',
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
      sampleNo: 'SMP-20260712-001', sampleNm: 'KM00003710 합성 원료 (batch A)',
      testItemStatusCcd: 'IN_PROGRESS', testItemStatusCcdNm: '시험중', urgentYn: 'Y' },
    { testItemMno: 8002, testReqstMno: 7001, testReqstNo: 'TR-20260713-02', testItemNm: '수분 (KF)',
      methodNm: 'M-KF-004', methodVerNo: 1, planDe: '20260731', resultCnt: 0,
      sampleNo: 'SMP-20260712-001', sampleNm: 'KM00003710 합성 원료 (batch A)',
      testItemStatusCcd: 'ASSIGNED', testItemStatusCcdNm: '배정', urgentYn: 'N' },
    { testItemMno: 8003, testReqstMno: 7002, testReqstNo: 'TR-20260710-01', testItemNm: '잔류용매 (GC)',
      methodNm: 'M-GC-002', methodVerNo: 2, planDe: '20260728', resultCnt: 2,
      sampleNo: 'SMP-20260705-014', sampleNm: 'HepG2 세포용해물 (P12)',
      testItemStatusCcd: 'OOS', testItemStatusCcdNm: '규격이탈', urgentYn: 'N' }
  ];

  var REQUESTS = [
    { testReqstMno: 7001, testReqstNo: 'TR-20260713-02', sampleNo: 'SMP-20260712-001',
      sampleNm: 'KM00003710 합성 원료 (batch A)', testPurposeCcd: 'RELEASE', testPurposeCcdNm: '출하',
      testReqstStatusCcd: 'IN_PROGRESS', testReqstStatusCcdNm: '시험중', hopeDe: '20260731',
      reqstUserNm: '김연구', itemCnt: 3, doneItemCnt: 1, waitingItemCnt: 1, oosItemCnt: 0, urgentYn: 'Y' },
    { testReqstMno: 7002, testReqstNo: 'TR-20260710-01', sampleNo: 'SMP-20260705-014',
      sampleNm: 'HepG2 세포용해물 (P12)', testPurposeCcd: 'STABILITY', testPurposeCcdNm: '안정성',
      testReqstStatusCcd: 'IN_PROGRESS', testReqstStatusCcdNm: '시험중', hopeDe: '20260728',
      reqstUserNm: '박연구', itemCnt: 2, doneItemCnt: 0, waitingItemCnt: 0, oosItemCnt: 1, urgentYn: 'N' },
    { testReqstMno: 7003, testReqstNo: 'TR-20260702-03', sampleNo: 'SMP-20260628-003',
      sampleNm: 'KM00003719 표준품', testPurposeCcd: 'VALIDATION', testPurposeCcdNm: '분석법검증',
      testReqstStatusCcd: 'DONE', testReqstStatusCcdNm: '완료', hopeDe: '20260715',
      reqstUserNm: '김연구', itemCnt: 4, doneItemCnt: 4, waitingItemCnt: 0, oosItemCnt: 0, urgentYn: 'N' },
    { testReqstMno: 7004, testReqstNo: 'TR-20260729-01', sampleNo: 'SMP-20260712-002',
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
      testReqstNo: 'TR-20260710-01', resultVal: '0.62', unitCcd: '%',
      oosStatusCcd: 'INVESTIGATING', detectDt: '2026-07-26', detectUserNm: '박연구',
      causeCcd: null, invstgUserNm: '최QA', judgeCcd: 'FAIL' },
    { oosMno: 22, oosNo: 'OOS-2026-0006', testItemMno: 8005, testItemNm: '수분 (KF)',
      testReqstNo: 'TR-20260702-03', resultVal: '0.71', unitCcd: '%',
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

  /* 규격 마스터의 판정 유형 컬럼명은 judgeTpCcd 다.
     결과 행에 박히는 스냅샷 컬럼(specJudgeTpCcd) 과 이름이 다르므로 섞지 않는다. */
  /* 규격 목록 화면은 코드(specCd)와 시험 항목명(testItemNm)을 함께 읽는다.
     specNm 만 채우면 규격 코드 칸이 undefined 로 찍힌다. */
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

  var REAGENTS = [
    { reagentMno: 201, reagentNm: '아세토니트릴 (HPLC grade)', casNo: '75-05-8', molFormula: 'C2H3N',
      molWt: 41.05, density: 0.786, ghsCcd: 'GHS02', containerCnt: 4, totalAmountDisp: '3.2 L' },
    { reagentMno: 202, reagentNm: '5-메톡시트립타민', casNo: '608-07-1', molFormula: 'C11H14N2O',
      molWt: 190.24, density: null, ghsCcd: 'GHS07', containerCnt: 2, totalAmountDisp: '4.1 g' },
    { reagentMno: 203, reagentNm: '트리에틸아민', casNo: '121-44-8', molFormula: 'C6H15N',
      molWt: 101.19, density: 0.726, ghsCcd: 'GHS02', containerCnt: 1, totalAmountDisp: '500 mL' }
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
    '/api/lims/sample/sampleList': function (p) { return { sampleListInfo: page(SAMPLES, p.pageNo, p.pageUnit) }; },
    '/api/lims/sample/sampleLineage': function () { return { lineageList: LINEAGE }; },
    '/api/lims/sample/aliquotList': function (p) { return { aliquotListInfo: page(ALIQUOTS, p.pageNo, p.pageUnit) }; },
    '/api/lims/sample/sampleNoteList': function () { return { noteListInfo: page([], 1, 10) }; },
    '/api/lims/sample/projectOptionList': function () {
      return { optionList: [
        { projectMno: 301, projectNm: '표적단백질 저해제 발굴' },
        { projectMno: 302, projectNm: '간독성 스크리닝' },
        { projectMno: 303, projectNm: '분석법 검증 (KM-3719)' },
        { projectMno: 304, projectNm: '장기 안정성 시험' }
      ] };
    },

    '/api/lims/test/myWorklist': function (p) { return { worklistInfo: page(WORKLIST, p.pageNo, p.pageUnit) }; },
    '/api/lims/test/testRequestList': function (p) { return { testRequestListInfo: page(REQUESTS, p.pageNo, p.pageUnit) }; },
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
      // 이력 표는 의뢰번호와 완료일시도 보여준다. 항목 데이터에 그 둘을 얹는다.
      return { testHistoryList: TEST_ITEMS.map(function (i) {
        return Object.assign({ testReqstNo: 'TR-20260713-02', completeDt: null }, i);
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

    '/api/lims/oos/oosList': function (p) { return { oosListInfo: page(OOS, p.pageNo, p.pageUnit) }; },
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

    '/api/lims/method/methodList': function (p) { return { methodListInfo: page(METHODS, p.pageNo, p.pageUnit) }; },
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

    '/api/lims/instrument/instrumentList': function (p) { return { instrumentListInfo: page(INSTRUMENTS, p.pageNo, p.pageUnit) }; },
    '/api/lims/instrument/instrumentDetail': function () { return { instrument: INSTRUMENTS[0] }; },
    '/api/lims/instrument/calList': function () { return { calList: CALS }; },

    '/api/lims/location/locationList': function () { return { locationList: LOCATIONS }; },

    '/api/lims/reagent/reagentList': function (p) { return { reagentListInfo: page(REAGENTS, p.pageNo, p.pageUnit) }; },
    '/api/lims/container/containerList': function (p) { return { containerListInfo: page(CONTAINERS, p.pageNo, p.pageUnit) }; },
    '/api/lims/container/stockTxnList': function () {
      return { stockTxnList: [
        { txnMno: 1, txnTpCcd: 'RECEIVE', deltaAmount: 1000, unitCcd: 'mL', afterAmount: 1000,
          txnDtStr: '2026-05-02 10:11', txnUserNm: '박연구', reason: '신규 입고', noteNm: null },
        { txnMno: 2, txnTpCcd: 'USE', deltaAmount: -200, unitCcd: 'mL', afterAmount: 800,
          txnDtStr: '2026-07-14 16:02', txnUserNm: '김연구', reason: null, noteNm: 'HPLC 순도 분석' }
      ] };
    },

    '/api/lims/compound/compoundList': function (p) { return { compoundListInfo: page(COMPOUNDS, p.pageNo, p.pageUnit) }; },
    '/api/lims/compound/searchByStructure': function () { return { compoundList: COMPOUNDS.slice(0, 2) }; },
    '/api/lims/compound/compoundDetail': function () { return { compound: COMPOUNDS[0], noteList: [] }; },
    '/api/lims/chem/depict': function (p) {
      return { depict: DEPICT_BY_MOLBLOCK[p.structure] || PLACEHOLDER_SVG };
    },

    '/api/lims/project/projectReagentUsage': function () {
      return { usageList: [
        { reagentNm: '아세토니트릴 (HPLC grade)', barcode: 'RGT-000301', deltaAmount: -200,
          unitCcd: 'mL', txnDtStr: '2026-07-14 16:02', txnUserNm: '김연구',
          noteNm: 'HPLC 순도 분석', expiryOverrideYn: 'N', reason: null }
      ] };
    },
    '/api/lims/project/projectCompoundList': function () { return { compoundList: COMPOUNDS.slice(0, 2) }; },

    '/api/lims/stoich/projectStoich': function () { return { stoich: { usageList: [] } }; },
    '/api/lims/stoich/noteStoich': function () { return { stoich: { usageList: [] } }; }
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

  function respond(path, params) {
    if (/userList|userOption|memberList/i.test(path)) {
      return userListResponse(params);
    }
    var handler = HANDLERS[path];
    var body = handler ? handler(params) : JSON.parse(JSON.stringify(WRITE_DEFAULT));
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
    if (window.coreCommon) {
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
    if (window.S2Util) {
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
  }

  /* ---------------------------------------------------------------
     업무 흐름 안내 — 화면 하나만 보면 순서를 알 수 없다.
     지금 보는 화면이 전체 흐름의 몇 번째인지, 다음이 무엇인지 같이 보여준다.
  --------------------------------------------------------------- */
  var FLOW = [
    { file: 'sample_list.html',     label: '① 시료 등록·분주' },
    { file: 'test_list.html',       label: '② 시험 의뢰' },
    { file: 'test_detail.html',     label: '③ 접수·담당자 배정' },
    { file: 'result_entry.html',    label: '④ 결과 입력·규격 판정' },
    { file: 'oos_list.html',        label: '⑤ 규격 이탈(OOS) 조사' },
    { file: 'method_list.html',     label: '⑥ 분석법·규격 기준' },
    { file: 'instrument_list.html', label: '⑦ 장비 교정' }
  ];

  var FLOW_NOTE = {
    'sample_list.html': '시료를 접수하면 시료번호가 SMP-YYYYMMDD-NNN 으로 자동 발번되고, 등록과 동시에 원본 분주 1건이 보관위치에 생성됩니다.',
    'sample_detail.html': '분주는 물리적 분할, 새 시료는 화학적 변화입니다. 계통(lineage)은 이 구분을 그대로 따라갑니다.',
    'test_list.html': '왼쪽 탭은 내가 맡은 시험(워크리스트), 오른쪽은 의뢰 목록입니다. 접수 대기 건을 열어 담당자를 배정합니다.',
    'test_detail.html': '항목마다 분석법·규격 버전을 고정합니다. 착수한 시험은 분석법이 개정돼도 착수 시점 버전을 계속 씁니다.',
    'result_entry.html': '값을 저장하면 그 시점 규격으로 즉시 판정하고, 판정에 쓴 규격값을 결과에 함께 박아둡니다(스냅샷). 결과는 append-only 이며 정정은 새 버전으로 쌓입니다.',
    'oos_list.html': '부적합이 나오면 OOS 가 자동 생성됩니다. 조사자 배정 → 원인 규명 → 재시험 또는 종결 순으로 진행합니다.',
    'method_list.html': '분석법과 규격은 버전으로 관리합니다. 개정 시 진행 중인 시험 건수를 먼저 알려줍니다.',
    'instrument_list.html': '교정 만료 장비로는 결과를 입력할 수 없습니다. 강행하려면 QA 승인이 필요합니다.',
    'reagent_list.html': '시약 재고는 용기(container) 단위로 관리하고, 입출고는 append-only 트랜잭션으로 기록합니다.',
    'location_list.html': '보관위치는 계층 구조입니다. 바코드 접두사와 온도 조건을 위치에 매답니다.',
    'compound_list.html': '구조를 그리거나 붙여넣어 부분구조·유사도로 검색합니다. 분자식·분자량은 RDKit 이 계산합니다.',
    'scan.html': '바코드를 찍어 용기를 조회하고 사용량을 기록합니다. 기한 경과 용기는 사유 없이는 사용할 수 없습니다.',
    'method_detail.html': '개정 이력과 규격 목록입니다. 폐지된 버전도 지우지 않고 남깁니다 — 과거 판정을 재현해야 하기 때문입니다.'
  };

  function installFlowBar() {
    var here = (window.location.pathname.split('/').pop() || 'sample_list.html');
    var host = document.querySelector('.content-wrapper #main') || document.querySelector('.content-wrapper');
    if (!host) return;

    var html = '<div class="lims-poc-label lims-poc-flow-label">업무 흐름</div>';
    FLOW.forEach(function (step, i) {
      if (i) html += '<span class="lims-poc-arrow">▶</span>';
      html += step.file === here
        ? '<span class="lims-poc-step on">' + step.label + '</span>'
        : '<a class="lims-poc-step" href="' + step.file + '">' + step.label + '</a>';
    });
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
