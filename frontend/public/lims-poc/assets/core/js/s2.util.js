const S2Util = (function () {
  // 템플릿 리터럴에서 들여쓰기를 제거
  String.prototype.dedent = function () {
    const lines = this.split('\n');
    const minIndent = Math.min(...lines.filter((line) => line.trim()).map((line) => line.match(/^(\s*)/)[0].length));
    return lines
      .map((line) => line.slice(minIndent))
      .join('\n')
      .trim();
  };

  {
    /* 목록 테이블 헤더 정렬 */
    $('[sort-nm]')
      .each(function () {
        if ($(this).find('> .fas.fa-sort').length === 0) {
          $(this).html($(this).html() + '<i class="fas fa-sort"></i>');
        }
      })
      .on('click', function () {
        if ($(this).parents('table:first').find('tbody tr').length <= 1) {
          return;
        }

        const thisSortNm = $(this).attr('sort-nm');
        const thisSortFnNm = $(this).attr('sort-fn-nm');
        let $target = $(this).find('.fas.fa-sort');

        if (!$target.hasClass('fa-sort-up')) {
          $target.addClass('fa-sort-up').removeClass('fa-sort-down');
        } else {
          $target.addClass('fa-sort-down').removeClass('fa-sort-up');
        }

        $(this)
          .parents('thead')
          .find('[sort-nm]')
          .each(function () {
            // 다른 sort 는 초기화 한다.
            if ($(this).attr('sort-nm') !== thisSortNm) {
              $(this).find('.fas.fa-sort').removeClass('fa-sort-up').removeClass('fa-sort-down');
            }
          });

        if (thisSortFnNm && window[thisSortFnNm] && typeof window[thisSortFnNm] === 'function') {
          window[thisSortFnNm](this);
        }
      });
  }

  {
    // jQuery 확장 함수

    $.fn.setDropdownCategory = function (clickNode, dataset) {
      let targetId = $(this).attr('id');
      $(this).attr('data-bs-toggle', 'dropdown').attr('data-bs-auto-close', 'outside').attr('aria-haspopup', 'true').attr('aria-expanded', 'false');

      let datasetStr = '';
      if (dataset && S2Util.isJSON(dataset)) {
        for (const key in dataset) {
          if (datasetStr) {
            datasetStr += ' ';
          }
          datasetStr += `data-${key}="${dataset[key]}"`;
        }
      }

      if ($(`[aria-labelledby=${targetId}]`).length === 0) {
        $(this).after(`
					<div class="dropdown-menu dropdown-category category" aria-labelledby="${targetId}" ${datasetStr}>
						<section>
							<div class="box-tree">
								<div class="category-box card-body p-1">
									<ul id="dropdown_${targetId}" class="nav nav-pills flex-column">
										<li class="core-tree category"></li>
									</ul>
								</div>
							</div>
						</section>
					</div>
				`);
      }

      let objTree = null;
      /*
      if (objTree != null) {
        objTree.destory();
        delete objTree;
        objTree = null;
      }
      */

      objTree = $('[aria-labelledby=' + targetId + '] .core-tree.category').coreTree();

      ajaxPostSingleton('/api/eln/category/categoryTreeList', '', '[[#{i18n.common.loading}]]', function (res) {
        for (const idx in res.data) {
          const data = res.data[idx];
          objTree.addCoreNode(`${data.upperCd};${data.categoryCd}`, data.upperCd, data.categoryCd, data.categoryNm, data.useYn === 'Y' ? 'fa fa-use-tree' : 'fa fa-unuse-tree category', false, false, false, data);
        }
        objTree.renderCoreNode(function () {
          objTree.deSelectAll();
          objTree.openAll();
        });

        objTree.onSelectNodeHandler(function () {
          $(`#${targetId}`).dropdown('hide');
          const node = objTree.selectedNode();
          if (!coreCommon.isEmpty(node)) {
            if (clickNode && typeof clickNode == 'function') {
              clickNode(node);
            }
          }
        });
      });
    };
  }

  {
    // jQuery 확장 함수 - 부서 트리 드롭다운
    $.fn.setDropdownOrzt = function (clickNode, dataset) {
      let targetId = $(this).attr('id');
      $(this).attr('data-bs-toggle', 'dropdown').attr('data-bs-auto-close', 'outside').attr('aria-haspopup', 'true').attr('aria-expanded', 'false');

      // 데이터 속성 추가
      let datasetStr = '';
      if (dataset && S2Util.isJSON(dataset)) {
        for (const key in dataset) {
          if (datasetStr) datasetStr += ' ';
          datasetStr += `data-${key}="${dataset[key]}"`;
        }
      }

      // 드롭다운 메뉴 생성
      if ($(`[aria-labelledby=${targetId}]`).length === 0) {
        $(this).after(`
                <div class="dropdown-menu dropdown-category category" aria-labelledby="${targetId}" ${datasetStr}>
                    <section>
                        <div class="box-tree">
                            <div class="orzt-box card-body p-1">
                                <ul id="dropdown_${targetId}" class="nav nav-pills flex-column">
                                    <li class="core-tree category"></li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            `);
      }

      let objTree = null;

      // CoreTree 초기화 : orzt
      objTree = $('[aria-labelledby=' + targetId + '] .core-tree.category').coreTree();

      // 부서 트리 데이터 조회 API
      ajaxPostSingleton('/api/eln/project/orztTreeList', '', '[[#{i18n.common.loading}]]', function (res) {
        // 데이터 매핑 수정 (category → orzt 필드명 변경)
        for (const idx in res.data) {
          const data = res.data[idx];
          objTree.addCoreNode(`${data.upperCd};${data.orztCd}`, data.upperCd, data.orztCd, data.orztNm, data.useYn === 'Y' ? 'fa fa-use-tree' : 'fa fa-unuse-tree orzt', false, false, false, data);
        }

        // 트리 렌더링
        objTree.renderCoreNode(function () {
          objTree.deSelectAll();
          objTree.openAll();
        });

        // 노드 선택 핸들러
        objTree.onSelectNodeHandler(function () {
          $(`#${targetId}`).dropdown('hide');
          const node = objTree.selectedNode();
          if (!coreCommon.isEmpty(node)) {
            if (clickNode && typeof clickNode == 'function') {
              clickNode(node);
            }
          }
        });
      });
    };
  }

  return {
    fetch: function (url, param, success, fail) {
      const option = {
        headers: {
          'X-S2-Request': 's2-fetch'
        }
      };

      let paramType = '';
      let method = 'GET';
      let methodChecker = '';
      let dataType = '';
      let dataTypeChecker = '';
      let responseType = 'JSON';
      let responseTypeChecker = '';
      let timeout;

      if (S2Util.isFormData(param)) {
        paramType = 'FormData';
        methodChecker = param.get('method');
        dataTypeChecker = param.get('dataType');
        responseTypeChecker = param.get('responseType');
        timeout = param.get('timeout');

        param.delete('method');
        param.delete('dataType');
        param.delete('responseType');
        param.delete('timeout');
      } else if (S2Util.isJSON(param)) {
        paramType = 'JSON';
        methodChecker = param.method;
        dataTypeChecker = param.dataType;
        responseTypeChecker = param.responseType;
        timeout = param.timeout;

        delete param.method;
        delete param.dataType;
        delete param.responseType;
        delete param.timeout;
      } else if (S2Util.isQueryString(param)) {
        paramType = 'QueryString';
        methodChecker = S2Util.getQueryStringParameter(param, 'method');
        dataTypeChecker = S2Util.getQueryStringParameter(param, 'dataType');
        responseTypeChecker = S2Util.getQueryStringParameter(param, 'responseType');
        timeout = S2Util.getQueryStringParameter(param, 'timeout');

        param = S2Util.removeQueryStringParameter(param, 'method');
        param = S2Util.removeQueryStringParameter(param, 'dataType');
        param = S2Util.removeQueryStringParameter(param, 'responseType');
        param = S2Util.removeQueryStringParameter(param, 'timeout');
        param = param.trim();
      }

      if (typeof methodChecker === 'string' && methodChecker.trim()) {
        method = methodChecker.toUpperCase();
      }
      if (typeof dataTypeChecker === 'string' && dataTypeChecker.trim()) {
        dataType = dataTypeChecker.toUpperCase();
      }
      if (typeof responseTypeChecker === 'string' && responseTypeChecker.trim()) {
        responseType = responseTypeChecker.toUpperCase();
      }

      // 타임아웃 설정 (param.timeout 이 없다면 기본 10분)
      const controller = new AbortController();
      option.signal = controller.signal;
      const timeoutId = setTimeout(() => controller.abort(), timeout && !isNaN(timeout) ? timeout : 600000);

      switch (method) {
        case 'POST':
        case 'PUT':
          if (dataType === 'JSON') {
            // JSON 데이터를 전달하는 경우
            // 서버 Controller 에서 @RequestBody 로 처리
            option['headers']['Content-Type'] = 'application/json';
          } else {
            // 파일 업로드(multipart/form-data)를 포함한 그 외의 경우
            // 서버 Controller 에서 @RequestParam / @RequestPart / @ModelAttribute / MultipartHttpServletRequest 로 처리
          }

          switch (paramType) {
            case 'FormData':
              if (!param.keys().next().done) {
                option['body'] = dataType === 'JSON' ? JSON.stringify(S2Util.formDataToJson(param)) : param;
              }
              break;
            case 'JSON':
              if (Object.keys(param).length > 0) {
                option['body'] = dataType === 'JSON' ? JSON.stringify(param) : S2Util.jsonToFormData(param);
              }
              break;
            case 'QueryString':
              if (param) {
                option['body'] = param;
              }
              break;
          }
          break;
        default:
          switch (paramType) {
            case 'FormData':
              if (!param.keys().next().done) {
                url = S2Util.jsonToQueryString(S2Util.formDataToJson(param), url);
              }
              break;
            case 'JSON':
              if (Object.keys(param).length > 0) {
                url = S2Util.jsonToQueryString(param, url);
              }
              break;
            case 'QueryString':
              if (param) {
                if (url.indexOf('?') !== -1) {
                  url += param.startsWith('&') ? param : `&${param}`;
                } else {
                  url += param.startsWith('?') ? param : `?${param}`;
                }
              }
              break;
          }
          break;
      }

      option['method'] = method;

      // 로딩 표시
      coreAjaxLoading.show(responseType === 'BLOB' ? 'File Downloading...' : 'Loading...');

      fetch(url, option)
        .then((response) => {
          if (!response.ok) {
            // HTTP 상태 코드가 2xx 범위가 아닌 경우 오류
            return response.text().then((errorData) => {
              // 서버에서 전송한 오류 메시지 포함
              const error = new Error(`HTTP error! status: ${response.status}`);
              error.message = errorData;
              throw error;
            });
          }

          const result = {
            type: responseType
          };

          switch (result.type) {
            case 'BLOB': {
              let filename = '';

              const contentDisposition = response.headers.get('Content-Disposition');
              if (contentDisposition && contentDisposition.includes('attachment')) {
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) {
                  filename = matches[1].replace(/['"]/g, '');
                }
              }

              result['data'] = response.blob();
              result['filename'] = decodeURIComponent(filename);
              break;
            }
            case 'HTML':
              result['data'] = response.text();
              break;
            default:
              result['data'] = response.json();
              break;
          }

          return result;
        })
        .then((result) => {
          if (result.type === 'BLOB') {
            result.data.then((data) => {
              const url = window.URL.createObjectURL(data);
              const link = document.createElement('a');
              link.href = url;
              link.download = result.filename || 'downloadFile';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);

              if (success && typeof success === 'function') {
                success();
              }
            });
          } else {
            result.data.then((data) => {
              if (S2Util.isJSON(data)) {
                if (!data.status) {
                  const error = new Error('Result error!');
                  error.message = data.message;
                  throw error;
                } else if (data.status !== 'SUCCESS' && data.status.result !== 'SUCCESS') {
                  const error = new Error('Result error!');
                  error.status = data.status;
                  error.message = data.status.message ? data.status.message : data.message;
                  throw error;
                }
              }

              if (success && typeof success === 'function') {
                success(data);
              }
            });
          }
        })
        .catch((error) => {
          if (fail && typeof fail === 'function') {
            fail(error);
          } else if (typeof error.message === 'string' && error.message.startsWith('S2Message:')) {
            coreDialog.alert(error.message.replace('S2Message:', ''));
          } else {
            coreDialog.alert('오류가 발생했습니다.');
          }
        })
        .finally(() => {
          // 로딩 숨김
          coreAjaxLoading.hide();
          clearTimeout(timeoutId); // 완료 시 타임아웃 해제
        });
    },
    /**
     * JavaScript s2 Template
     *
     * ex1: S2Util.s2Template('template_id', {key: value, key2: value, ...});
     * ex2: S2Util.s2Template('template_id', [{key: value, key2: value}, {key: value2, key2: value2}, ...]); // 데이터 배열 수 만큼 반복
     * <script id="template_id" type="text/template">
     *     <div if="isKey">{{=key}}</div>
     *     <div else="isKey">{{=key2}}</div>
     * </script>
     *
     * ex3: S2Util.s2Template('You Are So {{=key}}.', {key: 'Beautiful'}); => 'You Are So Beautiful.'
     * ex4: S2Util.s2Template('You Are So {{=key}}.', [{key: 'Beautiful'}, {key: 'Sweet'}]); => 'You Are So Beautiful.You Are So Sweet.'
     * ex5: S2Util.s2Template('You Are So {{=key}}.', {}); => 'You Are So'
     * ex6: S2Util.s2Template('You Are So {{=key}}.', null); => ''
     * ex7: S2Util.s2Template('You Are So <span if="isLove">{{=key}}</span><span else="isLove">{{=key2}}</span>.', {isLove: true: true, key: 'Beautiful', key2: 'Ordinary'});
     *      => 'You Are So <span>Beautiful</span>.'
     * ex8: S2Util.s2Template('You Are So <span if="isLove1 isLove2">{{=key}}</span><span else="isLove1 isLove2">{{=key2}}</span>.', {isLove1: false, isLove2: false, key: 'Beautiful', key2: 'Ordinary'});
     *      => 'You Are So <span>Ordinary</span>.'
     */
    s2Template: function (targetTemplate, data) {
      let resultHtml = '';
      let template = document.getElementById(targetTemplate) ? document.getElementById(targetTemplate).innerHTML : targetTemplate;
      const propsArr = data && Array.isArray(data) ? data : [data];

      if (template) {
        template = template.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''); // trim
        if (propsArr && Array.isArray(propsArr) && propsArr.length > 0) {
          propsArr.forEach((props) => {
            if (props && props instanceof Object) {
              let replacedHtml = template;

              // 템플릿 변수 치환
              for (const key in props) {
                const value = props[key];
                replacedHtml = replacedHtml.replace(new RegExp(`{{=${key}}}`, 'g'), value || value === 0 ? value : '');
              }

              /**
               * document.createElement 를 사용하는 경우 비표준 태그를 보정한다.
               * - innerHtml 이 tr 태그로 시작될때 tbody 외 다른 태그를 사용하면 해당 태그가 삭제 되어 아래와 같이 수정했었으나
               * - 반대로 tbody 태그 안에 form 태그 등을 넣어도 해당 태그가 삭제됨
               * ※ 그외의 상황이 있는지 확인 필요
               */
              const trimmedHtml = replacedHtml.trim();
              /* <th> 로 시작하는 조각도 행(tr) 안에 들어가야 살아남는다.
                 <td> 와 같은 자리다 — 빠져 있어서 표 머리행 템플릿이 태그를
                 잃고 글자만 남았다. */
              const resultContainer = document.createElement(
                trimmedHtml.startsWith('<tr') ? 'tbody'
                  : (trimmedHtml.startsWith('<td') || trimmedHtml.startsWith('<th')) ? 'tr'
                    : 'div');

              /**
               * XSS 방지를 위해 innerHTML 대신 DOMParser 사용
               * (innerHTML 사용할 때 기존 코드 "tempDiv.innerHTML = innerHtml;"를 변경 함)
               */
              {
                // DOMParser 사용을 위해 비표준 태그를 보정한다.
                let normalizedHtml, normalizedParentTag;
                if (trimmedHtml.startsWith('<tbody')) {
                  normalizedHtml = `<table>${replacedHtml}</table>`;
                  normalizedParentTag = 'table';
                } else if (trimmedHtml.startsWith('<tr')) {
                  normalizedHtml = `<table><tbody>${replacedHtml}</tbody></table>`;
                  normalizedParentTag = 'tbody';
                } else if (trimmedHtml.startsWith('<td') || trimmedHtml.startsWith('<th')) {
                  normalizedHtml = `<table><tbody><tr>${replacedHtml}</tr></tbody></table>`;
                  normalizedParentTag = 'tr';
                } else {
                  normalizedHtml = replacedHtml;
                }

                // htmlParentTag에 따라 파싱된 DOM에서 원하는 노드를 선택
                const parser = new DOMParser();
                const parsedDocument = parser.parseFromString(normalizedHtml, 'text/html');
                let targetElement;
                switch (normalizedParentTag) {
                  case 'table':
                    // <tbody>로 시작한 경우 <table> 에서 추출
                    targetElement = parsedDocument.body.firstChild.querySelector('table');
                    break;
                  case 'tbody':
                    // <tr>로 시작한 경우 <table><tbody> 에서 추출
                    targetElement = parsedDocument.body.firstChild.querySelector('table > tbody');
                    break;
                  case 'tr':
                    // <td>로 시작한 경우 <table><tbody><tr> 에서 추출
                    targetElement = parsedDocument.body.firstChild.querySelector('table > tbody > tr');
                    break;
                  default:
                    targetElement = parsedDocument.body;
                    break;
                }

                // DOMParser를 사용하여 HTML 문자열을 파싱한다.
                while (targetElement.firstChild) {
                  resultContainer.appendChild(targetElement.firstChild);
                }
              }

              const elements = resultContainer.querySelectorAll('[if], [else]');
              elements.forEach((element) => {
                if (element.hasAttribute('if')) {
                  // if 속성에 공백으로 2개 이상의 속성을 줄수도 있음
                  const conditionAttributes = element.getAttribute('if').split(/\s+/);
                  let validCount = 0;

                  for (const conditionAttribute of conditionAttributes) {
                    validCount += props[conditionAttribute] ? 1 : 0;
                  }

                  if (conditionAttributes.length > 0 && conditionAttributes.length === validCount) {
                    element.removeAttribute('if');
                  } else {
                    element.remove();
                  }
                }

                if (element.hasAttribute('else')) {
                  // else 속성에 공백으로 2개 이상의 속성을 줄수도 있음
                  const conditionAttributes = element.getAttribute('else').split(/\s+/);
                  let validCount = 0;

                  for (const conditionAttribute of conditionAttributes) {
                    validCount += !props[conditionAttribute] ? 1 : 0;
                  }

                  if (conditionAttributes.length > 0 && conditionAttributes.length === validCount) {
                    element.removeAttribute('else');
                  } else {
                    element.remove();
                  }
                }
              });

              resultHtml += resultContainer.innerHTML;
            }
          });
        }
      }
      return resultHtml.replace(/({{=([^}}]+)}})/g, '');
    },
    /**
     * select option 생성
     *
     * option: {
     *     target: jQuery selector or jQuery (required),
     *     items: array or object (required),
     *     itemValue: fieldNm or '{{=fieldNm1}}.{{=fieldNm2}}' (required),
     *     itemLabel: fieldNm or '{{=fieldNm1}}.{{=fieldNm2}}',
     *     initVal: value,
     *     clear: null -> all remove, not null -> jQuery selector remove
     * }
     */
    s2Options: function (option) {
      if (!option) {
        return;
      }
      const $target = typeof option.target == 'string' ? $(option.target) : option.target;
      if ($target.length > 0) {
        if (!option.clear) {
          $target.empty();
        } else if (typeof option.clear == 'string') {
          $target.find(option.clear).remove();
        }

        if (option.items && option.itemValue) {
          if (!Array.isArray(option.items)) {
            option.items = [option.items];
          }

          for (const idx in option.items) {
            let item = option.items[idx];
            let itemValue = String(option.itemValue);
            let itemLabel = String(option['itemLabel']);
            let value = itemValue.match(/({{=([^}}]+)}})/) ? S2Util.s2Template(itemValue, item) : item[itemValue];
            let label = itemLabel && itemLabel.match(/({{=([^}}]+)}})/) ? S2Util.s2Template(itemLabel, item) : item[itemLabel];

            $('<option>', { value: value ? value : '' })
              .text(label ? label : value)
              .appendTo($target);
          }

          if (option['initVal']) {
            $target.val(option['initVal']);
          }
        }
      }
    },
    /**
     * JSON 객체 여부 확인 (JSON String 포함)
     */
    isJSON: function (data) {
      if (!data || Object.prototype.toString.call(data) === '[object HTMLFormElement]') {
        return false;
      } else {
        try {
          if (typeof data != 'string') {
            data = JSON.stringify(data);
          }
          JSON.parse(data);
          return true;
        } catch {
          return false;
        }
      }
    },
    isArray: function (data) {
      return data && Array.isArray(data);
    },
    comma: function (number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    /**
     * pagination 을 작성한다.
     *
     * paginationInfo {
     *     firstPageNoOnPageList: 페이지 목록의 첫번째 페이지,
     *     lastPageNoOnPageList: 페이지 목록의 마지막 페이지,
     *     lastPageNo: 마지막 페이지 (전체),
     *     pageNm: 현재 페이지
     * }
     * jsFunction: 페이지 처리 함수명
     * jsParams: 페이지 처리 함수 매개변수 (생략가능)
     */
    pagination: function (paginationInfo, jsFunction, jsParams) {
      let pagination = '';
      let functionParamStr = '';

      if (jsParams || jsParams === 0) {
        if (!Array.isArray(jsParams)) {
          jsParams = [jsParams];
        }
        for (const idx in jsParams) {
          const param = jsParams[idx];
          if (typeof param === 'string') {
            functionParamStr += `'${param}', `;
          } else {
            functionParamStr += `${param}, `;
          }
        }
      }

      const firstPageNoOnPageList = paginationInfo['firstPageNoOnPageList'];
      const lastPageNoOnPageList = paginationInfo['lastPageNoOnPageList'];

      if (firstPageNoOnPageList > 1) {
        pagination += `<li class="paginate_button prev"><a href="#" onclick="${jsFunction}(${functionParamStr + (firstPageNoOnPageList - 1)}); return false;"><i class="fa fa-chevron-left"></i></a></li>`;
      }
      for (let pageNo = firstPageNoOnPageList; pageNo <= lastPageNoOnPageList; pageNo++) {
        if (pageNo === paginationInfo.pageNo) {
          pagination += `<li class="paginate_button active"><a href="#">${pageNo}</a></li>`;
        } else {
          pagination += `<li class="paginate_button"><a href="#" onclick="${jsFunction}(${functionParamStr + pageNo}); return false;">${pageNo}</a></li>`;
        }
      }
      if (lastPageNoOnPageList < paginationInfo['lastPageNo']) {
        pagination += `<li class="paginate_button next"><a href="#" onclick="${jsFunction}(${functionParamStr + (lastPageNoOnPageList + 1)}); return false;"><i class="fa fa-chevron-right"></i></a></li>`;
      }

      return `<ul class="pagination pagination-xs">${pagination}</ul>`;
    },
    /**
     * Pagination 의 Record 번호를 계산한다.
     *
     * paginationInfo
     * recordNoPerPage 현재 페이지에서의 Record 번호 (1, 2, 3...)
     * order 정렬(ASC|DESC)
     */
    paginationRecordNo: function (paginationInfo, recordNoPerPage, order) {
      let resultRecordNo = 0;
      if (paginationInfo) {
        const totalRecordCount = paginationInfo['totalRecordCount'];
        const pageUnit = paginationInfo.pageUnit;
        const pageNo = paginationInfo.pageNo;
        let vOrder = (order || '').toUpperCase();

        if (vOrder !== 'ASC' && vOrder !== 'DESC') {
          vOrder = 'ASC';
        }

        if (vOrder === 'DESC') {
          resultRecordNo = totalRecordCount + 1 - ((pageNo - 1) * pageUnit + recordNoPerPage);
        } else {
          resultRecordNo = (pageNo - 1) * pageUnit + recordNoPerPage;
        }
      }
      return resultRecordNo;
    },
    /**
     * 테이블의 헤더에서 정렬 조건을 가져온다.
     */
    getThOrderBy: function (selector, defaultOrderBy) {
      let orderBy = '';

      $(selector)
        .find('[sort-nm]')
        .each(function () {
          const sortNm = $(this).attr('sort-nm');
          const $sort = $(this).find('.fas.fa-sort');

          if ($sort.length > 0) {
            let direction = '';

            if ($sort.hasClass('fa-sort-up')) {
              direction = 'ASC';
            } else if ($sort.hasClass('fa-sort-down')) {
              direction = 'DESC';
            }

            if (sortNm && direction) {
              if (orderBy) {
                orderBy += ', ';
              }
              orderBy += sortNm + ' ' + direction;
            }
          }
        });

      if (!orderBy && defaultOrderBy) {
        orderBy = defaultOrderBy;
      }

      return orderBy;
    },
    validateDate: function (dateStr) {
      let errMsg = '';

      try {
        if (dateStr) {
          dateStr = String(dateStr).replace(/[^0-9]/g, '');
          let year;
          let month;
          let day;

          switch (dateStr.length) {
            case 8:
              year = parseInt(dateStr.substring(0, 4));
              month = parseInt(dateStr.substring(4, 6));
              day = parseInt(dateStr.substring(6, 8));

              if (year < dayjs().subtract(100, 'years').format('YYYY') || month < 1 || month > 12) {
                errMsg = '날짜형식이 올바르지 않습니다.';
              } else {
                const date = new Date(year, month, 0); // 다음달의 0일 (이달의 마지막일);
                const lastDay = date.getDate();

                if (day < 1 || day > lastDay) {
                  errMsg = '잘못된 날짜입니다.';
                }
              }
              break;
            case 6:
              year = parseInt(dateStr.substring(0, 4));
              month = parseInt(dateStr.substring(4, 6));

              if (year < dayjs().subtract(100, 'years').format('YYYY') || month < 1 || month > 12) {
                errMsg = '날짜형식이 올바르지 않습니다.';
              }
              break;
            default:
              errMsg = '날짜형식이 올바르지 않습니다.';
              break;
          }
        }
      } catch {
        errMsg = '날짜형식이 올바르지 않습니다.';
      }

      return errMsg;
    },
    dateFormat: function (dateStr, pDelimiter) {
      if (dateStr) {
        dateStr = String(dateStr).replace(/[^0-9]/g, '');
        const delimiter = pDelimiter ? pDelimiter : '-';

        if (dateStr.length >= 8) {
          dateStr = dateStr.substring(0, 8);
          const errMsg = S2Util.validateDate(dateStr);

          if (!errMsg) {
            dateStr = dateStr.replace(/(\d{4})(\d{2})(\d{2})/, `$1${delimiter}$2${delimiter}$3`);
          } else {
            dateStr = '';
            if ($('#dialog-confirm').length === 0) {
              try {
                coreDialog.alert(errMsg);
              } catch {
                alert(errMsg);
              }
            }
          }
        } else if (dateStr.length > 6) {
          dateStr = dateStr.substring(0, 6).replace(/(\d{4})(\d{2})/, `$1${delimiter}$2`);
        } else if (dateStr.length > 4) {
          dateStr = dateStr.substring(0, 4);
        }
      }
      return dateStr;
    },
    setLocalStorage: function (key, value) {
      const d = new Date();
      d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
      const expires = `expires=${d.toUTCString()}`;

      document.cookie = `${key}=${encodeURIComponent(value)};${expires};path=/;`;
    },
    getLocalStorage: function (key) {
      let value = '';
      const cookie = `; ${document.cookie}`;
      const parts = cookie.split(`; ${key}=`);
      if (parts.length === 2) value = parts.pop().split(';').shift();
      return value;
    },
    removeLocalStorage: function (key) {
      const d = new Date();
      d.setTime(d.getTime() - 1);
      const expires = `expires=${d.toUTCString()}`;

      document.cookie = `${key}=;${expires};path=/;`;
    },
    setS2ActForm: function (target, param) {
      if (target['s2ActForm']) {
        // 기존에 폼이 존재한다면 삭제
        const delForm = target.getElementsByName('s2ActForm')[0];
        delForm.parentNode.removeChild(delForm);
      }

      // 새로운 폼 생성
      const s2Form = target.createElement('form');
      s2Form.setAttribute('method', param && param.method ? param.method : 'post');
      s2Form.setAttribute('name', 's2ActForm');
      target.body.appendChild(s2Form);

      // 매개변수 설정
      if (param && typeof param === 'object') {
        for (const paramKey in param) {
          const paramVal = param[paramKey];

          if (paramVal) {
            if (!target['s2ActForm'][paramKey]) {
              const s2Field = target.createElement('input');
              s2Field.setAttribute('type', 'hidden');
              s2Field.setAttribute('name', paramKey);
              target['s2ActForm'].appendChild(s2Field);
            }

            target['s2ActForm'][paramKey].value = paramVal;
          }
        }
      }

      {
        // CSRF TOKEN 설정
        const csrfKey = S2Util.getLocalStorage('s2CsrfTokenKey');
        const csrfValue = S2Util.getLocalStorage('s2CsrfTokenValue');

        if (csrfKey && csrfValue) {
          if (!target['s2ActForm'][csrfKey]) {
            const s2Field = target.createElement('input');
            s2Field.setAttribute('type', 'hidden');
            s2Field.setAttribute('name', csrfKey);
            target['s2ActForm'].appendChild(s2Field);
          }

          target['s2ActForm'][csrfKey].value = csrfValue;
        }
      }
    },
    goPage: function (url, param, pTarget) {
      // CSRF 토큰 적용 페이지 이동
      const target = pTarget ? pTarget.document : document;

      if (url) {
        if (!param) {
          param = {};
        }
        if (!param.method) {
          param.method = 'GET';
        }

        S2Util.setS2ActForm(target, param);

        target['s2ActForm'].action = url.replace(/!q/g, '?').replace(/!n/g, '&').replace(/!e/g, '=');
        target['s2ActForm'].submit();
        try {
          if (target.tabIndex >= -1 && !target.disabled) {
            // TODO 불필요한 error 발생을 없애기 위해 작성했으나 제대로된 테스트 필요
            target.focus();
          }
        } catch (e) {
          if (window.console) {
            console.error(e);
          }
        }
      }
    },
    s2validate: function (form) {
      const $form = typeof form == 'string' ? $(form) : form;
      let valid = true;
      let message = '';

      if ($form.length) {
        const errMsaSuf1 = g_errMsaSuf1 ? g_errMsaSuf1 : '은(는) 필수 항목 입니다.';
        const errMsaSuf2 = g_errMsaSuf2 ? g_errMsaSuf2 : '은(는) 유효하지 않은 값입니다.';

        $form.find('input, select, textarea').each(function () {
          if ($(this).parents('[no-validate="true"]:first').length > 0) {
            // no-validate="true" 하위 항목은 검증에서 제외한다.
            return true;
          }

          const checkList = [];

          if ($(this).is('[required]')) {
            checkList.push('required');
          }
          if ($(this).is('[length]')) {
            checkList.push('length');
          }
          if ($(this).is('[maxlength]')) {
            checkList.push('maxlength');
          }
          if ($(this).is('[minlength]')) {
            checkList.push('minlength');
          }
          if ($(this).is('[minValue]')) {
            checkList.push('minValue');
          }
          if ($(this).is('[mask]')) {
            checkList.push('mask');
          }
          if ($(this).is('[dataType]')) {
            checkList.push('dataType');
          }
          if ($(this).is('[group]')) {
            checkList.push('group');
          }

          if (checkList.length > 0) {
            for (const idx in checkList) {
              const check = checkList[idx];
              const tagName = $(this).prop('tagName').toLowerCase();

              let type = '';
              if (tagName === 'input' && $(this).attr('type') === 'checkbox') {
                type = 'checkbox';
              } else if (tagName === 'input' && $(this).attr('type') === 'radio') {
                type = 'radio';
              }

              let title = $(this).attr('title');
              if (!title) {
                // datepicker 에 의해 생성된 hidden 객체일 때
                title = $form.find(`.datepicker[name="${$(this).attr('name')}_text"]`).attr('title');
              }

              switch (check) {
                case 'required':
                  switch (type) {
                    case 'checkbox':
                      if (!$form.find(`[type=checkbox][name="${$(this).attr('name')}"]:checked`).length) {
                        valid = false;
                        message += `${message ? '\n' : ''}[${title}]${errMsaSuf1}`;
                      }
                      break;
                    case 'radio':
                      if (!$form.find(`[type=radio][name="${$(this).attr('name')}"]:checked`).length) {
                        valid = false;
                        message += `${message ? '\n' : ''}[${title}]${errMsaSuf1}`;
                      }
                      break;
                    default:
                      if (!$.trim($(this).val())) {
                        valid = false;
                        message += `${message ? '\n' : ''}[${title}]${errMsaSuf1}`;
                      }
                      break;
                  }
                  break;
                case 'length':
                case 'maxlength':
                case 'minlength': {
                  const length = Number(
                    $(this)
                      .attr(check)
                      .replace(/[^0-9]/g, '')
                  );
                  if (length) {
                    switch (type) {
                      case 'checkbox':
                        if (!$(this).is(':checked')) {
                          const cnt = $form.find(`[type=checkbox][name="${$(this).attr('name')}"]:checked`).length;
                          if (check === 'length' && length !== cnt) {
                            valid = false;
                            message += `${message ? '\n' : ''}[${title}]은(는) ${length}개를 선택해야 합니다.`;
                          } else if (check === 'maxlength' && length < cnt) {
                            valid = false;
                            message += `${message ? '\n' : ''}[${title}]은(는) ${length}개를 초과할 수 없습니다.`;
                          } else if (check === 'minlength' && length > cnt) {
                            valid = false;
                            message += `${message ? '\n' : ''}[${title}]은(는) ${length}개 미만일 수 없습니다.`;
                          }
                        }
                        break;
                      case 'radio':
                        break;
                      default: {
                        const cnt = $.trim($(this).val()).length;
                        if (check === 'length' && length !== cnt) {
                          valid = false;
                          message += `${message ? '\n' : ''}[${title}]은(는) ${length}자리를 입력해야 합니다.`;
                        } else if (check === 'maxlength' && length < cnt) {
                          valid = false;
                          message += `${message ? '\n' : ''}[${title}]은(는) ${length}자리를 초과할 수 없습니다.`;
                        } else if (check === 'minlength' && length > cnt) {
                          valid = false;
                          message += `${message ? '\n' : ''}[${title}]은(는) ${length}자리 미만일 수 없습니다.`;
                        }
                        break;
                      }
                    }
                  }
                  break;
                }
                case 'minValue': {
                  const minValue = Number(
                    $(this)
                      .attr(check)
                      .replace(/[^0-9]/g, '')
                  );
                  if (minValue) {
                    let value = '$undefined';

                    switch (type) {
                      case 'checkbox':
                        break;
                      case 'radio':
                        value = $form.find(`[type=radio][name="${$(this).attr('name')}"]:checked`).val();
                        break;
                      default:
                        value = $(this).val();
                        break;
                    }

                    if (value !== '$undefined' && minValue > value) {
                      valid = false;
                      message += `${message ? '\n' : ''}[${title}]은(는) ${minValue}보다 적을수 없습니다.`;
                    }
                  }
                  break;
                }
                case 'mask': {
                  const value = $(this).val();
                  let mask = $(this).attr(check);

                  switch (mask) {
                    case 'CHK_NUMBER':
                      mask = /^[0-9]*$/;
                      break;
                    case 'CHK_TEXT_INTACT':
                      // 텍스트(숫자/특문 제외)
                      mask = /^[가-힣a-zA-Z]*$/;
                      break;
                    case 'CHK_TEXT_COMBINE':
                      // 특수문자 제외 텍스트
                      // eslint-disable-next-line no-useless-escape
                      mask = /^[가-힣a-zA-Z0-9\s\-\(\)\,\.]*$/;
                      break;
                    case 'CHK_MPHONE_NO':
                      // 휴대전화번호
                      mask = /^01([0|1|6|7|8|9]?)[-]([0-9]{3,4})[-]([0-9]{4})$/;
                      break;
                    case 'CHK_TEL_NO':
                      // 전화번호
                      mask = /^([0-9]{2,4})[-]([0-9]{3,4})[-]([0-9]{3,4})$/;
                      break;
                    case 'CHK_FAX_NO':
                      // 팩스번호
                      mask = /^([0-9])*[-]([0-9])*[-]([0-9])*$/;
                      break;
                    case 'CHK_LOGIN_ID':
                      // 로그인 ID
                      mask = /^[a-zA-Z0-9]*$/;
                      break;
                    case 'CHK_PASSWORD':
                      // 비밀번호
                      mask = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{9,16}$/;
                      break;
                    case 'CHK_PASSWORD_ANSWR':
                      // 비밀번호 찾기 질문 답변
                      mask = /^[가-힣a-zA-Z0-9\s]*$/;
                      break;
                    case 'CHK_EMAIL':
                      // 이메일
                      // eslint-disable-next-line no-useless-escape
                      mask = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                      break;
                  }

                  if (mask) {
                    if (!mask.test(value)) {
                      valid = false;
                      message += `${message ? '\n' : ''}[${title}]${errMsaSuf2}`;
                    }
                  }
                  break;
                }
                case 'dataType': {
                  const dataTypeInfo = String($(this).attr(check)).split(':');
                  const dataType = dataTypeInfo[0];

                  switch (dataType) {
                    case 'date':
                      switch (type) {
                        case 'checkbox':
                          break;
                        case 'radio':
                          break;
                        default: {
                          const startDate = $(this).val();
                          const errMsg = S2Util.validateDate(startDate);
                          if (errMsg) {
                            valid = false;
                            message += `${message ? '\n' : ''}[${title}]은(는) ${errMsg}`;
                          } else {
                            if (dataTypeInfo[1] && dataTypeInfo[1].indexOf('start') === 0) {
                              const $endDateForm = $form.find(`[dataType="date:end${dataTypeInfo[1].replace('start', '')}"]`);
                              if ($endDateForm.length > 0) {
                                const endDate = $endDateForm.val();
                                if (startDate && endDate && S2Util.validateDate(endDate) && startDate > endDate) {
                                  valid = false;
                                  message += `${message ? '\n' : ''}[${$endDateForm.attr('title')}]은(는) [${title}]보다 빠를수 없습니다.`;
                                }
                              }
                            }
                          }
                          break;
                        }
                      }
                      break;
                  }
                  break;
                }
                case 'group': {
                  let chkVal = $(this).val();
                  let chkFlag = true;
                  const groupNmList = String($(this).attr(check)).split(',');
                  let emptyGroupNm = '';

                  if (!chkVal) {
                    chkFlag = false;
                    emptyGroupNm = $(this).attr('name');
                  }

                  for (const in_idx in groupNmList) {
                    const groupNm = groupNmList[in_idx];
                    const groupVal = $form.find(`[name="${groupNm}"]`).val();
                    if (groupVal) {
                      chkVal += groupVal;
                    } else if (!emptyGroupNm) {
                      chkFlag = false;
                      emptyGroupNm = groupNm;
                    }
                  }

                  if (chkVal && !chkFlag) {
                    valid = false;
                    message += `${message ? '\n' : ''}[${$form.find(`[name="${emptyGroupNm}"]`).attr('title')}] 항목을 입력해주세요.`;
                  }
                  break;
                }
              }
            }
          }
        });
      }

      if (!valid) {
        coreDialog.alert(message, null, { size: 'default' });
      }

      return valid;
    },
    /**
     * 데이터의 유형을 가져온다.
     * return {
     *     type: 데이터 유형,
     *     detailType: 데이터 상세 유형
     * }
     */
    s2DataType: function (data) {
      let type = '';
      let detailType = '';

      if (data != null) {
        try {
          // Object.prototype.toString.call 로 클래스명을 확인할 때 [object Function]으로 구분하므로 먼저 확인한다.
          if (data instanceof jQuery) {
            type = 'jquery';
          }
        } catch {
          // jQuery 객체가 없다면 오류가 발생하여 확인할 수 없음
          type = '';
        }

        if (!type) {
          try {
            const className = Object.prototype.toString.call(data);
            switch (className) {
              case '[object Undefined]':
                type = 'undefined';
                break;
              case '[object Null]':
                type = 'null';
                break;
              case '[object Window]':
                type = 'window';
                break;
              case '[object HTMLDocument]':
                type = 'document';
                break;
              case '[object HTMLFormElement]':
                type = 'form';
                break;
              case '[object FormData]':
                type = 'formData';
                break;
              case '[object Function]':
                type = 'function';
                break;
              case '[object Array]':
                type = 'array';
                break;
              case '[object Boolean]':
                type = 'boolean';
                break;
              case '[object Number]':
                type = 'number';
                break;
              case '[object Object]':
              case '[object String]':
                detailType = typeof data;

                try {
                  let chkData = null;

                  if (detailType === 'object') {
                    // JSON 객체로 추정하며 JSON.parse 까지 성공하면 JSON 객체로 확정 {type: 'json', detailType: 'object'}
                    chkData = JSON.stringify(data);
                  } else if (detailType === 'string') {
                    // JSON 문자열로 추정하며 JSON.parse 까지 성공하면 JSON 문자열로 확정 {type: 'json', detailType: 'string'}
                    chkData = data;
                  }

                  if (chkData) {
                    // JSON.parse 가 성공하면 JSON 타입이다.
                    JSON.parse(chkData);
                    type = 'json';
                  }
                } catch {
                  // JSON.parse 가 실패하면 detailType 이(typeof 값) type 이 되고 detailType 은 초기화 한다.
                  type = detailType;
                  detailType = '';
                }
                break;
            }
          } catch {
            type = '';
          }
        }
      }

      return {
        type: type ? type : typeof data,
        detailType: type ? detailType : ''
      };
    },
    /**
     * 폼 데이터 인지 확인한다.
     * @param param
     * @returns {boolean}
     */
    isFormData(param) {
      return param instanceof FormData;
    },
    /**
     * form 을 JSON 으로 변환한다.
     * @param form
     * @returns {{}}
     */
    serializeFormToJson: function (form) {
      if (form && form.nodeName === 'FORM') {
        return S2Util.formDataToJson(new FormData(form));
      }
      return {};
    },
    /**
     * 폼 데이터를 JSON 으로 변환한다.
     * @param formData
     * @returns {{}}
     */
    formDataToJson: function (formData) {
      const json = {};
      if (S2Util.isFormData(formData)) {
        formData.forEach((value, key) => {
          if (json[key]) {
            if (!Array.isArray(json[key])) json[key] = [json[key]];
            json[key].push(value);
          } else {
            json[key] = value;
          }
        });
      }
      return json;
    },
    /**
     * JSON 을 폼 데이터로 변환한다.
     * @param json
     * @returns {FormData}
     */
    jsonToFormData: function (json) {
      const formData = new FormData();
      let parsedJson = json;
      if (S2Util.isJSON(json)) {
        if (typeof json === 'string') {
          parsedJson = JSON.parse(json);
        }

        for (const [key, value] of Object.entries(parsedJson)) {
          if (Array.isArray(value)) {
            value.forEach((item) => formData.append(key, item));
          } else {
            formData.append(key, value);
          }
        }
      }
      return formData;
    },
    /**
     * 쿼리 문자열인지 확인한다.
     * @param param
     * @returns {boolean}
     */
    isQueryString(param) {
      try {
        const query = param.startsWith('?') ? param : `?${param}`;
        const params = new URLSearchParams(query);
        return params.toString().length > 0;
      } catch {
        return false;
      }
    },
    /**
     * 쿼리문자열에서 해당 키의 값을 가져온다.
     */
    getQueryStringParameter: function (queryString, key) {
      if (!queryString || !key) {
        return queryString;
      }

      const cleanQuery = queryString.startsWith('?') ? queryString.slice(1) : queryString;
      const params = new URLSearchParams(cleanQuery);
      const values = params.getAll(key); // 모든 값 배열로 가져오기

      if (values.length === 0) return ''; // 값 없으면 빈 문자열
      if (values.length === 1) return values[0]; // 값이 하나면 문자열 반환
      return values; // 값이 두 개 이상이면 배열 반환
    },
    /**
     * 쿼리문자열에서 해당 키의 값을 제거한다.
     * @param queryString
     * @param key
     * @returns {string}
     */
    removeQueryStringParameter: function (queryString, key) {
      if (!queryString) {
        return queryString;
      }

      const params = new URLSearchParams(queryString.startsWith('?') ? queryString.slice(1) : queryString);
      params.delete(key);
      return params.toString();
    },
    /**
     * JSON 을 쿼리문자열로 변경한다.
     * (쿼리문자열 앞에 url 이 있다면 기존 url 은 유지하고 이후에 추가한다.)
     * (기존 쿼리문자열에 동일 키값이 있으면 덮어쓴다.)
     *
     * paramJSON: JSON 객체
     * paramQueryString: 기존 쿼리문자열(기존 쿼리문자열이 있다면 JSON 을 쿼리문자열로 변경하고 기존 문자열 뒤에 추가한다.)
     *
     * ex1) S2Util.jsonToQueryString({a: 1, b: 2}) => 'a=1&b=2'
     * ex2) S2Util.jsonToQueryString({a: 1, b: 2}, 'test.do') => 'test.do?a=1&b=2'
     * ex3) S2Util.jsonToQueryString({a: 1, b: 2}, 'test.do?wrong') => 'test.do?wrong=&a=1&b=2'
     * ex4) S2Util.jsonToQueryString({a: 1, b: 2, x: 'z'}, 'wrong&x=y') => 'wrong=&x=z&a=1&b=2'
     * ex5) S2Util.jsonToQueryString('', 'wrong') => 'wrong
     */
    jsonToQueryString: function (paramJSON, paramQueryString) {
      let vUrl = '';
      let vQueryString = '';
      let vJSONObject = {};

      if (paramQueryString) {
        const qIdx = paramQueryString.indexOf('?');
        if (qIdx > -1) {
          // 기존 문자열에 ?가 포함되어 있다면 ?를 포함한 앞부분을 url 로 처리한다.
          vUrl = paramQueryString.substring(0, qIdx);

          const vCheckString = paramQueryString.substring(qIdx + 1);
          if (vCheckString) {
            if (vCheckString.indexOf('=') > -1) {
              // 기존 문자열이 쿼리문자열이라면 새로 추가할 매개변수와 중복 키값을 확인하기 위한 변수에 담는다.
              vQueryString = vCheckString;
            } else {
              // url 뒷부분의 문자열이 키와 값 쌍으로 되어 있지 않더라도 키와 값 쌍으로 처리하기 위해 JSON 객체에 추가한다.
              vJSONObject[vCheckString] = '';
            }
          }
        } else if (paramQueryString.indexOf('=') > -1) {
          // 기존 문자열이 쿼리문자열이라면 새로 추가할 매개변수와 중복 키값을 확인하기 위한 변수에 담는다.
          vQueryString = paramQueryString;
        } else {
          // 기존 문자열이 쿼리문자열이 아니고 앞서 url 이 없었다면 url 로 처리한다.
          vUrl = paramQueryString;
        }
      }

      if (vQueryString) {
        // 기존 문자열에 쿼리문자열이 있다면 중복된 키값이 있을때 덮어쓰기 위해 JSON 객체로 변환한다.(이후 이때 생성한 JSON 객체에 새로 추가할 키와 값을 추가한다.)
        const params = vQueryString.split('&');
        if (params && Array.isArray(params)) {
          for (const idx in params) {
            const param = params[idx].split('=');
            const paramKey = param[0];
            const paramValue = param.length === 2 ? param[1] : '';
            const prevValue = vJSONObject[paramKey];
            if (prevValue) {
              if (!Array.isArray(prevValue)) {
                vJSONObject[paramKey] = [prevValue];
              }
              vJSONObject[paramKey].push(paramValue);
            } else {
              vJSONObject[paramKey] = paramValue;
            }
          }
        }
      }

      const paramJSONType = S2Util.s2DataType(paramJSON);
      if (paramJSONType.type === 'json') {
        const paramJSONObject = paramJSONType.detailType === 'string' ? JSON.parse(paramJSON) : paramJSON;

        if (Object.keys(vJSONObject).length > 0) {
          // 기존 쿼리문자열로 생성한 JSON 객체가 있다면 변환할 JSON 을 추가하여 둘사이에 중복된 키값을 제거한다.
          for (const key in paramJSONObject) {
            const value = paramJSONObject[key];
            if (value) {
              vJSONObject[key] = value;
            }
          }
        } else {
          vJSONObject = paramJSONObject;
        }
      }

      let resultQueryString = '';
      for (const key in vJSONObject) {
        const valueArr = Array.isArray(vJSONObject[key]) ? vJSONObject[key] : [vJSONObject[key]];
        for (const idx in valueArr) {
          const value = valueArr[idx];
          if (value) {
            if (resultQueryString) {
              resultQueryString += '&';
            }
            resultQueryString += `${key}=${value}`;
          }
        }
      }
      return vUrl + (vUrl && resultQueryString ? '?' : '') + resultQueryString;
    },
    /**
     * 쿼리문자열을 JSON 으로 변경한다.
     */
    queryStringToJson: function (paramQueryString) {
      const result = {};
      if (paramQueryString && typeof paramQueryString == 'string') {
        const params = paramQueryString.split('&');
        for (const idx in params) {
          const param = params[idx].split('=');
          if (param && param.length > 0) {
            result[param[0]] = param.length > 1 ? param[1] : null;
          }
        }
      }
      return result;
    },
    /**
     * null 치환: value 가 null 이라면 defaultValue 로 치환해준다
     */
    cast(value, defaultValue = '') {
      return value ? value : defaultValue;
    },
    downloadFile: function (url, param) {
      const frames = document.getElementsByName('hiddenIframe');

      if (frames != null && frames.length > 0) {
        for (let i = 0; i < frames.length; i++) {
          frames[i].parentElement.removeChild(frames[i]);
        }
      }

      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', S2Util.jsonToQueryString(param, url));
      iframe.setAttribute('name', 'hiddenIframe');
      iframe.setAttribute('width', '0px');
      iframe.setAttribute('height', '0px');

      document.body.appendChild(iframe);
    },
    base64ToArrayBuffer: function (base64) {
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      return bytes.buffer;
    },
    base64ToFile: function (base64, fileName, fileType) {
      return new File([S2Util.base64ToArrayBuffer(base64)], fileName, { type: fileType });
    },
    base64ToBlob: function (base64, fileName, fileType) {
      const file = S2Util.base64ToFile(base64, fileName, fileType);
      return {
        name: file.name,
        blob: new Blob([file], { type: file.type })
      };
    },
    utf8ToBase64: function (str) {
      const utf8Bytes = new TextEncoder().encode(str); // UTF-8로 문자열 변환
      let binary = '';
      utf8Bytes.forEach((byte) => {
        binary += String.fromCharCode(byte); // 바이너리 문자열로 변환
      });
      return btoa(binary); // Base64 인코딩
    },
    toasts: function (message, option) {
      const opt = {
        /*
          여기 있던 '[[#{i18n.common.save.ok}]]' 는 화면에 그대로 찍혔다.
          이 파일은 static/ 아래 순수 js 라 Thymeleaf 를 거치지 않는다 —
          표현식이 치환될 기회가 없다. 그래서 모든 토스트의 제목이
          "[[#{i18n.common.save.ok}]]" 였다.

          메시지를 쓰려면 서버가 window 에 실어 줘야 한다. 있으면 쓰고,
          없으면 기본 문구로 간다.
        */
        title:
          '<i class="fa fa-check-circle mr-1" style="color: #28a745;"></i>' +
          (window.i18nMessages && window.i18nMessages['i18n.common.save.ok']
            ? window.i18nMessages['i18n.common.save.ok']
            : '알림'),
        autohide: true,
        delay: 2000,
        close: false,
        class: 'Toast-bottom-web',
        body: message,
        position: 'bottomRight'
      };

      if (option) {
        if (option.title) {
          opt.title = option.title;
        }
        if (option.delay) {
          opt.delay = option.delay;
        }
        if (option.class) {
          opt.class = option.class;
        }
        if (option.position) {
          opt.position = option.position;
        }
      }

      $(document).Toasts('create', opt);
    },
    urlBase64ToUint8Array: function (base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },
    // 서비스 워커 구독
    subscribeServiceWorker: async function (publicKey) {
      if ('PushManager' in window && 'serviceWorker' in navigator) {
        const lastSubscriptionsDate = S2Util.getLocalStorage('goonoSubscriptionsDate');
        const today = dayjs().format('YYYYMMDD');

        // 알림 컨펌 사용 여부 ("구노에서 알림 받기를 수락하시겠습니까?")
        const isOpenNotificationConfirm = false;

        if (!publicKey) {
          //console.error('Public key 가 없습니다.');
          return;
        } else if (today === lastSubscriptionsDate) {
          //console.error('금일 구독 완료');
          return;
        }

        // 금일 구독을 안했다면 구독을 신청(갱신)한다.
        try {
          let confirmResult = !!lastSubscriptionsDate;

          const registration = await navigator.serviceWorker.register('/core/js/service-worker.goono.js', { scope: '/core/js/' }).then((reg) => {
            reg.update();
            return reg;
          });

          if (!confirmResult) {
            // 기존 구독 정보가 전혀 없다면 구독 여부를 확인한다.
            confirmResult = await new Promise((resolve) => {
              if (isOpenNotificationConfirm) {
                coreDialog.confirm('구노에서 알림 받기를 수락하시겠습니까?', function (result) {
                  resolve(result);
                });
              } else {
                resolve(true);
              }
            });
          }

          if (confirmResult) {
            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: S2Util.urlBase64ToUint8Array(publicKey)
            });

            // 서버에 구독 정보 전송
            const response = await fetch('/api/system/serviceworker/subscribe', {
              method: 'POST',
              body: JSON.stringify(subscription),
              headers: {
                'content-type': 'application/json'
              }
            });
            if (response.ok) {
              S2Util.setLocalStorage('goonoSubscriptionsDate', today);
              console.log('Push 구독 정보 서버 전송 성공');
            }
          }
        } catch (error) {
          console.error('Service Worker 등록 또는 구독 과정에서 오류 발생:', error);
        }
      }
    },
    // 서비스 워커 푸시 이벤트 수신
    receiveServiceWorkerEvents: function () {
      if (navigator.serviceWorker) {
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data.type === 'S2_SHOW_TOAST') {
            // S2Util.showToast(event.data.message);
            S2Util.toasts(event.data.message);
          }
        });
      }
    }
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (event) => {
    const element = event.target;
    // 기본 동작을 막는 조건 설정(클릭시 상단으로 스크롤 되는 동작 방지)
    const shouldPreventDefault = element.tagName.toLowerCase() === 'a' || (element.tagName.toLowerCase() === 'input' && element.type === 'submit') || element.tagName.toLowerCase() === 'button';

    if (shouldPreventDefault) {
      // onClick 이벤트를 큐에 넣어 나중에 실행되도록 함
      setTimeout(() => {
        event.preventDefault(); // 기본 동작 방지
        // event.stopPropagation(); // 이벤트 버블링 방지
      }, 0); // 0ms 딜레이를 주어 after the current call stack runs
    }
  });

  {
    document.addEventListener('ajaxStart', () => {
      // const spinner = document.createElement('div');
      // spinner.id = 'ui-gSpinner';
      // spinner.innerHTML = '<img src="./images/spinner-big.gif"/>';
      // document.body.appendChild(spinner);
    });

    document.addEventListener('ajaxStop', () => {
      // const spinner = document.getElementById('ui-gSpinner');
      // if (spinner) {
      //     spinner.remove();
      // }

      if (window.eGovUnitTop) {
        // 세션만료 남은시간을 초기화한다.
        window.eGovUnitTop.latestTime = window.eGovUnitTop.getCookie('egovLatestServerTime');
        window.eGovUnitTop.expireTime = window.eGovUnitTop.getCookie('egovExpireSessionTime');
        window.eGovUnitTop.init();
      }
    });

    // 기존 XMLHttpRequest 오픈 메서드를 저장
    const originalOpen = XMLHttpRequest.prototype.open;

    // AJAX 이벤트를 트리거하는 함수
    const triggerAjaxEvent = (eventType) => {
      const event = new Event(eventType);
      document.dispatchEvent(event);
    };

    // XMLHttpRequest 오픈 메서드 재정의
    XMLHttpRequest.prototype.open = function (...args) {
      this.addEventListener('loadstart', () => triggerAjaxEvent('ajaxStart'));
      this.addEventListener('loadend', () => triggerAjaxEvent('ajaxStop'));
      originalOpen.apply(this, args);
    };

    S2Util.receiveServiceWorkerEvents();
  }

  // input:text[alphabetNumber] 요소 입력 정규화
  document.querySelectorAll('input[type="text"][alphabetNumber]').forEach((element) => {
    element.addEventListener('keyup', () => {
      element.value = element.value.replace(/[^a-zA-Z0-9:_\\.\\-]/gi, '');
    });
  });

  // input:text[alphabetOnly] 요소 입력 정규화
  document.querySelectorAll('input[type="text"][alphabetOnly]').forEach((element) => {
    element.addEventListener('keyup', () => {
      element.value = element.value.replace(/[^a-zA-Z:_]/gi, '');
    });
  });

  // input:text[toLowerCase] 요소 소문자로 변환
  document.querySelectorAll('input[type="text"][toLowerCase]').forEach((element) => {
    element.addEventListener('keyup', () => {
      element.value = element.value.toLowerCase();
    });
  });

  // input:text[toUpperCase] 요소 대문자로 변환
  document.querySelectorAll('input[type="text"][toUpperCase]').forEach((element) => {
    element.addEventListener('keyup', () => {
      element.value = element.value.toUpperCase();
    });
  });

  // input:text[numberOnly] 요소 숫자로만 변환
  document.querySelectorAll('input[type="text"][numberOnly]').forEach((element) => {
    element.addEventListener('keyup', () => {
      if (element.getAttribute('numberOnly') === 'comma') {
        element.value = S2Util.comma(element.value.replace(/[^0-9]/gi, ''));
      } else {
        element.value = element.value.replace(/[^0-9]/gi, '');
      }
    });
  });

  // input:text[engOnly] 요소 입력 정규화
  document.querySelectorAll('input[type="text"][engOnly]').forEach((element) => {
    element.addEventListener('keyup', () => {
      element.value = element.value.replace(/[^a-zA-Z0-9\\s]/gi, '');
    });
  });

  // input:text[datetime] 요소 입력 정규화
  document.querySelectorAll('input[type="text"][datetime]').forEach((element) => {
    element.addEventListener('keyup', () => {
      element.value = element.value.replace(/[^0-9:\\-]/gi, '');
    });
  });

  // input:text[phoneNumber] 요소 입력 정규화
  document.querySelectorAll('input[type="text"][phoneNumber]').forEach((element) => {
    element.addEventListener('keyup', () => {
      element.value = element.value.replace(/[^0-9\\-]/gi, '');
    });
  });

  // input:text[maxByte] 요소 입력 바이트 수 제한
  document.querySelectorAll('input[type="text"][maxByte]').forEach((element) => {
    element.addEventListener('keyup', () => {
      const maxByte = Number(element.getAttribute('maxByte'));
      if (maxByte && !isNaN(maxByte) && maxByte > 0) {
        const str = element.value;
        let byteLength = 0;
        for (let i = 0; i < str.length; i++) {
          byteLength += str.charCodeAt(i) > 127 ? 2 : 1;
          if (byteLength > maxByte) {
            element.value = str.slice(0, i);
            break;
          }
        }
      }
    });
  });
});

document.addEventListener('keydown', function (e) {
  const target = e.target.closest('[sch-enter]');
  if (target && e.key === 'Enter') {
    e.preventDefault();
  }
});

document.addEventListener('keyup', function (e) {
  const target = e.target.closest('[sch-enter]');
  if (!target || e.key !== 'Enter') return;

  if (target.type !== 'hidden' && target.type !== 'button' && !target.hasAttribute('readonly')) {
    const optionArr = target.getAttribute('sch-enter').split(':');
    const functionName = optionArr[0];

    if (window[functionName] && typeof window[functionName] === 'function') {
      if (optionArr.length > 1) {
        let actionStr = `window["${functionName}"](${optionArr
          .slice(1)
          .map((param) => `"${param}"`)
          .join(', ')});`;
        new Function(actionStr)();
      } else {
        window[functionName]();
      }
    }
    e.preventDefault();
  }
});
