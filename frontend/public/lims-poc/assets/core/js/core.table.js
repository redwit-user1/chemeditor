/**
 * 테이블
 * @author GOONO
 * @since  2021
 * @version 1.0
 * @see
 * Copyright (C)  All right reserved.
*/
var coreTable = function($el, options, callback, callbackObj) {
	this.initialize($el, options, callback, callbackObj);
};

coreTable.prototype = {
	guid: coreCommon.genUUID(),
	$el: null,
	datePicker: null,
	emptyMessage: "No Data",

	totalNotify: "",
	totalRows: 0,
	//리스트 최대 출력갯수
	limit: 10,
	//현재선택페이지
	nowPageIndex: 1,
	//총페이지수
	totalPage: 1,
	//정렬
	sortId: '',
	sort: '',

	initRequest: false, //테이블 생성후 리스트 요청여부
	enableCheckAll: false,
	enableSearchDate: false,
	enableSearchText: false,
	enablePaging: false,
	enableHeaderSort: false,
	searchCombo: {},
	Headers: {},
	onPaging: null,
	//목록요청 콜백
	postCallBack: null,
	postCallBackObj: null,
	//달력 버튼명 및 설정 파라미터
	initToday: 0,
	
	selectPageMin : 10,
	selectPageMax : 100,
	selectPageStep : 10,
	selectPageText : '건',

	//private
	initialize: function($el, options, callback, callbackObj) {
		var self = this;
		this.$el = $el;
		this.postCallBack = callback;
		this.postCallBackObj = callbackObj;
		
		//옵션설정
		if (options) {
			if (options.initRequest) this.initRequest = options.initRequest;
			if (options.totalNotify) this.totalNotify = options.totalNotify;
			//if(options.pagingNotify)this.pagingNotify = options.pagingNotify;
			if (options.emptyMessage) this.emptyMessage = options.emptyMessage;

			if (options.enableCheckAll) this.enableCheckAll = options.enableCheckAll;
			if (options.enableSearchDate) this.enableSearchDate = options.enableSearchDate;
			if (options.enableSearchText) this.enableSearchText = options.enableSearchText;
			if (options.enablePaging) this.enablePaging = options.enablePaging;
			if (options.searchCombo) this.searchCombo = options.searchCombo;
			if (options.Headers) this.Headers = options.Headers;
			if (options.limit) this.limit = options.limit;
			if (options.enableHeaderSort) this.enableHeaderSort = options.enableHeaderSort;
			if (options.onPaging) this.onClickHeaderSort = options.onPaging;
			if (options.initToday) this.initToday = options.initToday;
			
			if (options.selectPageMin) this.selectPageMin = options.selectPageMin;
			if (options.selectPageMax) this.selectPageMax = options.selectPageMax;
			if (options.selectPageStep) this.selectPageStep = options.selectPageStep;
			if (options.selectPageText) this.selectPageText = options.selectPageText;
		}
		
		//테이블상단 검색영역 추가
		var divSearchBox = '<div class="search">';
		
		if (self.totalNotify) {
			divSearchBox += '<span id="totalNotify" class="total-notify"></span>';		
		}
		divSearchBox += '<div class="text-right"><div class="float-right core-table-top-right mb-2">';
		divSearchBox += '<div class="btn-group search-limit d-none ml-2">';
		divSearchBox += '<select class="btn btn-xs btn-default select-xs d-none" id="select_limit" name="select_limit">';
		for(var i = this.selectPageMin ; i <= this.selectPageMax ; i = (i+this.selectPageStep) ) {
			divSearchBox += '<option value="'+ i +'" >'+ i + this.selectPageText + '</option>';
		}
		divSearchBox += '</select>';
		divSearchBox += '</div>';
		divSearchBox += '</div>';
		divSearchBox += '</div></div>';
		$(divSearchBox).insertBefore(self.$el.find(".core-table-div"));

		if (self.totalNotify) {
			self.totalNotify = "Total : 0";
			self.setTotalNotify(self.totalNotify);
		}
		//self.setPagingNotify(self.pagingNotify);
		
		//기능설정
		self.setCheckAll(self.enableCheckAll);
		self.setSearchDate(self.enableSearchDate);
		self.setSearchText(self.enableSearchText);
		self.setPaging(self.enablePaging);

		if (self.enableSearchDate || self.enableSearchText) {
			//검색버튼 추가여부
			var divSearchBtn = "<div class='btn-group search-button'>";
			divSearchBtn += "<span class='input-group-btn'>";
			divSearchBtn += "<button type='submit' name='search' id='search_btn' class='btn btn-flat'><i class='fa fa-search'></i></button>";
			divSearchBtn += "</span>";
			divSearchBtn += "</div>";
			$(divSearchBtn).insertBefore(self.$el.find(".search-limit"));
		}

		//검색 콤보 설정
		$.each(self.searchCombo, function(key, value) {
			self.addSearchCombo(key, value);
		});
		self.selectSearchCombo(0);

		//검색문자 input필드 엔터시 검색실행
		self.$el.find("#search_text").keydown(function(event) {
			if (event.keyCode == 13 && !this.checkKeyEvent) {
				this.checkKeyEvent = true;
				self.search(event);
			}
		}).keyup(function(e) {
			this.checkKeyEvent = false;
		});

		//검색버튼 클릭이벤트 연결
		self.$el.find("#search_btn").on("click", function(event) {
			self.search(event);
		});

		//전체선택 클릭이벤트 연결
		if (self.enableCheckAll == true) {
			self.$el.find("#btnCheckAll").on("click", function(event) {
				self.checkAll(event);
			});
		}

		//테이블 헤더 설정
		$.each(self.Headers, function(key, value) {
			self.addHeader(value.id, value.title, value.width, value.sort);
		});

		//결과 없음 메시지 출력
		self.setEmptyRow(self.Headers.length);

		//------------------------------------------------------------------
		//html로딩완료후 초기화 작업할수있도록 설정
		if (self.initRequest) {
			if (typeof self.postCallBack === "function") {
				setTimeout(function() {
					self.postCallBack.apply(self.postCallBackObj);
				}, 100);

			} else {
				alert("JSTable.js 사용되는 조회 콜백함수가 정의되지않았습니다.");
			}
		}

	},
	//private
	setEmptyRow: function(colspan) {
		if (this.enableCheckAll == true) {
			colspan = colspan + 1; //체크박스 컬럼추가
		}
		var tr = "<tr class='text-nowrap emptymessage'>";
		tr += "<td class='text-center' colspan='" + colspan + "' >" + this.emptyMessage + "</td>";
		tr += "</tr>";
		this.$el.find(".table > tbody").append(tr);
	},
	//public 페이징 설정 및 항목추가
	getTotalPage: function() {
		return this.totalPage;
	},
	//public
	setTotalPage: function(rows) {
		this.$el.find(".pagination").empty();

		if (rows > 0) {
			var self = this;
			this.totalPage = Math.ceil(rows / this.limit);

			this.$el.find(".pagination").append("<li id='pagination_prev' class='paginate_button'><a href='#'><i class='fa fa-chevron-left' ></i></a></li>");

			var viewPage = 10;
			var startPage = (this.nowPageIndex - 1);

			if ((startPage % viewPage) < viewPage) {
				startPage = startPage - (startPage % viewPage);
			}

			var endPage = startPage + viewPage;

			if (endPage >= this.totalPage) {
				startPage = this.totalPage - viewPage;
				if (startPage < 0) {
					startPage = 0;
				}
				endPage = this.totalPage;
			}

			//for( var i = 0 ; i < this.totalPage ; i++ ){
			for (var i = startPage; i < endPage; i++) {
				var idx = i + 1;
				var li = "<li id='pagination_" + idx + "' class='paginate_button";
				if (idx == this.nowPageIndex) {
					li += " active";
				}
				li += "'>";
				li += "<a href='#' >";
				li += idx;
				li += "</a>";
				li += "</li>";

				this.$el.find(".pagination").append(li);

				this.$el.find("#pagination_" + idx).on("click", function(event) {
					var id = $(this).attr("id").replace("pagination_", "");
					self.onClickPaging(id);
				});
			}

			this.$el.find(".pagination").append("<li id='pagination_next' class='paginate_button'><a href='#'><i class='fa fa-chevron-right' ></i>  </a></li>");

			this.$el.find("#pagination_prev").on("click", function(event) {
				var idx = parseInt(parseInt(self.nowPageIndex) - 1);
				if (idx <= 0) {
					idx = 1;
				}
				if (self.nowPageIndex != idx)
					self.onClickPaging(idx);
			});

			this.$el.find("#pagination_next").on("click", function(event) {
				var idx = parseInt(parseInt(self.nowPageIndex) + 1);
				if (idx >= self.totalPage) {
					idx = self.totalPage;
				}
				if (self.nowPageIndex != idx)
					self.onClickPaging(idx);
			});
		}
		this.setTotalNotify("Total : " + rows);
		this.totalRows = rows;
		/*if( this.totalPage  == 0 ){
			this.setPagingNotify(  "0 / 0" );
		}else{
			this.setPagingNotify( this.nowPageIndex + " / " + this.totalPage );
		}*/
	},
	//public 응답받은 페이징 설정
	//{"fromDate":null,"searchText":"","searchId":"userNm","offset":"15","sortId":"","toDate":null,"nowPageIndex":"2","limit":"15","sort":""}
	setPagingMap: function(pagingMap) {
		this.nowPageIndex = pagingMap.nowPageIndex;
		this.$el.find("#search_text").val(pagingMap.searchText);
		this.$el.find("#search_column").val(pagingMap.searchId);
		if (pagingMap.fromDate != null && pagingMap.toDate != null) {
			this.$el.find('#search_date').val(pagingMap.fromDate + " ~ " + pagingMap.toDate);
		}
	},
	//private 페이징 클릭시
	onClickPaging: function(idx) {
		this.nowPageIndex = parseInt(idx);
		this.$el.find(".pagination .active").removeClass("active");
		this.$el.find("#pagination_" + idx).addClass("active");
		if (typeof this.postCallBack === "function") {
			this.postCallBack.apply(this.postCallBackObj);
		} else {
			alert("JSTable.js 사용되는 조회 콜백함수가 정의되지않았습니다.");
		}

	},
	//public 검색 선택정보
	getSearchObject: function() {
		var postData = {};
		if (this.enableSearchDate && this.datePicker != null) {
			postData.fromDate = this.datePicker.getBeginDate();
			postData.toDate = this.datePicker.getEndDate()
		}
		if (this.enableSearchText) {
			postData.searchId = this.$el.find("#search_column option:selected").val();
			postData.searchText = this.$el.find("#search_text").val();
		}
		if (this.enablePaging) {
			postData.limit = this.limit;
			postData.offset = this.limit * (this.nowPageIndex - 1);
			postData.nowPageIndex = this.nowPageIndex;
		}
		if (this.enableHeaderSort) {
			postData.sortId = this.sortId;
			postData.sort = this.sort;
		}
		return postData;
	},
	//private 테이블 전체선택 추가여부
	setCheckAll: function(flag) {
		var tr = "<tr class='text-nowrap'>";
		if (flag == true) {
			tr += "<th style='width:5px;' class='text-center'>";
			tr += "<input type='checkbox' id='btnCheckAll' name='btnCheckAll' class='cursor-pointer'>";
			tr += "</th>";
		}
		tr += "</tr>";
		this.$el.find(".table > thead").append(tr);
	},
	//private 날짜 검색 사용여부
	setSearchDate: function(flag) {
		if (!flag) return;
		if (flag != true)
			return;

		var div = '<div class="search-date-group d-inline"><div class="btn-group">';
		div += '<div class="input-group">';
		div += '<div class="input-group-prepend">';
		div += '<span class="input-group-text"><i class="far fa-calendar-alt"></i></span>';
		div += '</div>';
		div += '<input type="text" id="'+ this.guid +'_datepicker_begin" class="form-control form-control-sm input-xs search-date cursor-pointer" readonly="readonly">';
		div += '</div>';
		div += '</div>';
		div += '<span class="date-dash pl-1 pr-1">~</span>';
		div += '<div class="btn-group">';
		div += '<div class="input-group">';
		div += '<div class="input-group-prepend">';
		div += '<span class="input-group-text"><i class="far fa-calendar-alt"></i></span>';
		div += '</div>';
		div += '<input type="text" id="'+ this.guid +'_datepicker_end" class="form-control form-control-sm input-xs search-date cursor-pointer" readonly="readonly">';
		div += '</div>';
		div += '</div>';
		div += '<a href="#" id="'+ this.guid +'_datepicker_clear"><i class="fa fa-eraser btn-eraser"></i></a>';
		div += '</div>';
		$(div).insertBefore(this.$el.find(".search-limit"));

		//날자선택 연결
		this.datePicker = this.$el.find('.search').coreDateRangePicker({
			  beginInputId: this.guid +'_datepicker_begin'
			, endInputId: this.guid +'_datepicker_end'
			, clearId: this.guid + '_datepicker_clear'
			, initToday: this.initToday

		});
	},
	//private 문자열 검색 사용여부
	setSearchText: function(flag) {
		if (!flag) return;
		if (flag != true)
			return;


		var div = "<div class='search-text-group d-inline'><div class='btn-group search-text pl-2 ml-2'>";
		div += "<select class='btn btn-xs btn-default select-xs' id='search_column' name='search_column'>";
		div += "</select>";
		div += "<div class='input-group'>";
		div += "<input type='text' name='q' class='form-control' id='search_text' placeholder='Search' >";
		div += "</div>";
		div += "</div>";
		div += "</div>";
		$(div).insertBefore(this.$el.find(".search-limit"));
	},
	//private 페이징 사용여부
	setPaging: function(flag) {
		if (!flag) return;
		if (flag != true)
			return;
		
		//페이징 추가
		var pagingBox = [];
		pagingBox.push('<div class="paging-box">');
		pagingBox.push('<div class="float-right">');
		pagingBox.push('<ul class="pagination pagination-xs"></ul>');
		pagingBox.push('</div>');
		pagingBox.push('</div>');
		this.$el.find(".core-table-div").append(pagingBox.join(''));
		
		this.$el.find(".search-limit").removeClass("d-none");
		this.$el.find("#select_limit").removeClass("d-none");

		var self = this;
		//검색버튼 클릭이벤트 연결
		this.$el.find("#select_limit").on("change", function(event) {
			//alert( $(this).find(":selected").val());
			self.limit = $(this).find(":selected").val();
			if (typeof self.postCallBack === "function") {
				self.postCallBack.apply(self.postCallBackObj);
			}
		});
		this.$el.find("#select_limit").val(this.limit);
	},
	//private
	setTotalNotify: function(msg) {
		this.$el.find("#totalNotify").text(msg);
	},
	//setPagingNotify :function(msg){
	//	this.$el.find("#pagingNotify").text(msg);
	//},
	//private 검색
	search: function(event) {
		this.nowPageIndex = 1;
		if (typeof this.postCallBack === "function") {
			this.postCallBack.apply(this.postCallBackObj);
		} else {
			alert("JSTable.js 사용되는 조회 콜백함수가 정의되지않았습니다.");
		}
	},
	//순번
	getNo: function(idx) {
		var no = 0;
		if (this.enablePaging) {
			var offset = this.limit * (this.nowPageIndex - 1);
			//console.debug(offset);
			no = this.totalRows - offset - idx;
			//totalPage
			//postData.limit  = this.limit;
			//postData.offset = this.limit * (this.nowPageIndex - 1);
			//postData.nowPageIndex = this.nowPageIndex;			
			//${pagination.totalRecordCount - (pagination.recordCountPerPage * (pagination.currentPageNo - 1)) - status.count + 1}
		} else {
			no = (this.totalRows - idx);
		}
		return no;
	},
	//public 체크박스 전체 선택 및 해제
	checkAll: function(event) {
		var checked = this.$el.find("#btnCheckAll").is(":checked");
		var checkbox = this.$el.find("table > tbody input[type=checkbox]:not(:disabled)");
		if (checked) {
			checkbox.prop("checked", true).trigger("change");

		} else {
			checkbox.prop("checked", false).trigger("change");
		}
	},
	unCheckAll: function() {
		this.$el.find("table > tbody input[type=checkbox]:not(:disabled)").each(function() {			
			 $(this).prop("checked", false);		
		});
	},
	toggleCheckBox : function(trId){			
		this.$el.find("table > tbody input[type=checkbox]:not(:disabled)").each(function() {			
			var dataTrId = $(this).attr('data-trId');			
			if(dataTrId == trId){
				$(this).trigger('click');
				return false;  
			}			
		});
	},
	//private 체크박스 선택 수 확인및 전체선택 체크박스 처리
	getCheckedRowCount: function() {
		var checkbox = this.$el.find("table > tbody input[type=checkbox]:checked:not(:disabled)");
		var listCheckBoxCount = this.$el.find("table > tbody input[type=checkbox]:not(:disabled)").length;
		if (checkbox) {
			//console.debug(checkbox.length);
			//console.debug(listCheckBoxCount);
			if (checkbox.length == 0 || listCheckBoxCount > checkbox.length) {
				this.$el.find("#btnCheckAll").prop("checked", false);
			}
			else if (listCheckBoxCount == checkbox.length) {
				this.$el.find("#btnCheckAll").prop("checked", true);
			}
			return checkbox.length;
		}
		this.$el.find("#btnCheckAll").prop("checked", false);
		return 0;
	},
	//public 체크박스 선택 데이터 리스트(값1,값2)
	getCheckedRowValue: function() {
		var i = 0;
		var ids = "";
		this.$el.find("table > tbody input[type=checkbox]:checked:not(:disabled)").each(function() {
			if (i == 0) {
				ids = $(this).val();
			} else {
				ids += "," + $(this).val();
			}
			i++;
		});
		return ids;
	},
	//public
	getCheckedRowData: function() {
		var self = this;
		var rowData = [];
		this.$el.find("table > tbody input[type=checkbox]:checked:not(:disabled)").each(function() {
			var trId = $(this).attr("data-trId");

			var tr = self.$el.find("#" + trId);
			var row = self.decStringToJson(tr.attr("enc-data"));
			if (row.trId) {
				//기본정보가아니므로 삭제(서버전달불필요)
				delete row.trId;
			}
			rowData.push(row);
		});
		return rowData;
	},
	//public
	getRowData: function() {
		var self = this;
		var rowData = [];
		this.$el.find("table > tbody > tr").each(function() {
			var row = self.decStringToJson($(this).attr("enc-data"));
			rowData.push(row);
		});
		return rowData;
	},
	getRowCount: function() {
		var cnt = this.$el.find("table > tbody > tr").length;
		if (cnt < 0)
			return cnt;

		if (this.$el.find(".table > tbody").find(".emptymessage").length > 0) {
			return parseInt(cnt) - 1;
		}
		return parseInt(cnt);
	},
	//private 검색 콤보 데이터 설정
	addSearchCombo: function(value, text) {
		this.$el.find("#search_column").append("<option value='" + value + "'>" + text + "</option>");
	},
	//private
	selectSearchCombo: function(index) {
		this.$el.find("#search_column").find("option:eq(" + index + ")").prop("selected", true);
	},
	//private 헤더설정 (정렬 사용여부는 this.enableHeaderSort , 헤더별 사용여부는 sort)
	addHeader: function(id, title, width, sort) {
		var th = "<th id='header_sort_" + id + "' style='width:";
		th += width + ";";

		if (this.enableHeaderSort == true && sort == true) {
			th += "cursor: pointer;";
		}

		th += "' class='text-center'>";
		th += title;
		if (this.enableHeaderSort == true && sort == true) {
			th += "<i class='fas fa-sort' ></i>";
		}
		th += "</th>";
		this.$el.find(".table > thead > tr").append(th);

		//이벤트연결
		var self = this;
		if (this.enableHeaderSort == true && sort == true) {
			self.$el.find("#header_sort_" + id).on("click", function(event) {
				self.onClickHeaderSort(id);
			});
		}
	},
	//private 헤더 선택시 정렬
	onClickHeaderSort: function(id) {
		this.sortId = id;
		if (this.$el.find("#header_sort_" + id).find(".fas").hasClass("fa-sort-up")) {
			this.$el.find(".table > thead > tr .fas").removeClass("fa-sort-down").removeClass("fa-sort-up");
			this.$el.find("#header_sort_" + id).find(".fas").addClass("fa-sort-down");
			this.sort = "DESC";
		} else {
			this.$el.find(".table > thead > tr .fas").removeClass("fa-sort-down").removeClass("fa-sort-up");
			this.$el.find("#header_sort_" + id).find(".fas").addClass("fa-sort-up");
			this.sort = "ASC";
		}
		if (typeof this.postCallBack === "function") {
			this.postCallBack.apply(this.postCallBackObj);
		} else {
			alert("JSTable.js 사용되는 조회 콜백함수가 정의되지않았습니다.");
		}
	},
	getHeaderTitles: function() {
		 var ids = '';
		this.$el.find('table > thead th').each(function() {
			
			if($(this).text() == '') return;
			
			if (ids == '') {
				ids = $(this).text();
			} else {
				ids += ',' + $(this).text();
			}
		});
		return ids;
	},
	//public
	addRow: function(row, upId) {

		//empty  메시지 제거
		this.$el.find(".table > tbody").find(".emptymessage").remove();

		var self = this;
		var oldTr = this.$el.find("#" + $(row).attr('id'));

		if (oldTr.attr("enc-data") === undefined) {
			if (upId == null || upId == undefined) {
				self.$el.find(".table > tbody").append(row);
			} else {
				if (self.$el.find(".table > tbody").find("#" + upId).length == 0) {
					self.$el.find(".table > tbody").append(row);
				} else {
					if (self.$el.find(".table > tbody").find("." + upId + ":last").length == 0) {
						self.$el.find(".table > tbody").find("#" + upId).after(row);
					} else {
						self.$el.find(".table > tbody").find("." + upId + ":last").after(row);
					}
				}
			}

		} else {
			//기존 Row 변경s
			oldTr.replaceWith(row);
			oldTr.hide().fadeIn('slow');
		}

		//클릭이벤트연결
		self.$el.find("#" + $(row).attr('id')).on("click", function(event) {
			self.onClick(self.decStringToJson($(this).attr("enc-data")));
		});

		this.getCheckedRowCount();
	},
	//public
	removeRow: function(trId,cbFunc) {
		var self = this;
		var oldTr = this.$el.find("#" + trId);
		//if (oldTr.attr("enc-data") === undefined) {

		//} else {
			//기존 Row 삭제
			oldTr.fadeOut('slow', function() {
				$(this).remove();
				self.getCheckedRowCount();
				if (self.getRowCount() == 0) {
					self.empty(true);
				}
				if (typeof cbFunc === "function") {
					cbFunc();
				}
			});
		//}
	},
	removeRows: function(trIds,cbFunc) {
		var self = this;
		for(var i = 0 ; i < trIds.length ; i++){
			var trId = trIds[i]; 
			var oldTr = this.$el.find("#" + trId);
			//기존 Row 삭제
			oldTr.fadeOut('slow', function() {
				$(this).remove();
				self.getCheckedRowCount();
				if (self.getRowCount() == 0) {
					self.empty(true);
				}
			});
		}
		if (typeof cbFunc === "function") {
			cbFunc();
		}
	},
	getRow : function(trId) {				
		return this.$el.find("#" + trId);
	},
	//public 테이블내 동일 이름 존재여부 확인
	isRowByPath: function(path) {
		var self = this;
		var result = false;
		var rows = this.$el.find(".table > tbody > tr");
		$.map(rows, function(row) {

			var rowJSdata = $(row).attr("enc-data");
			// 로우가 없는 경우
			if (rowJSdata == undefined) {
				result = false;
			} else {

				var data = self.decStringToJson($(row).attr("enc-data"));
				if (data.path == path) {
					result = true;
					return;
				}
			}
		});
		return result;
	},
	//private 문자열 -> Json 객체로 변환(복호화처리)
	decStringToJson: function(data) {
		return coreCrypto.decJson(data, this.guid);
	},

	//public Json -> 문자열 변환(암호화처리)
	encJsonToString: function(data) {
		return coreCrypto.encJson(data, this.guid);
	},

	//public 데이터 및 테이블 목록 초기화
	empty: function(flag) {
		this.$el.find(".table > tbody").empty();
		this.setEmptyRow(this.Headers.length);
		this.getCheckedRowCount();
		if (flag == true) {			
			this.clearValue();
		}
	},
	showLoading: function() {
		this.$el.find(".table").addClass("loading");
	},
	hideLoading: function() {
		var self = this;
		setTimeout(function() {
			self.$el.find(".table").removeClass("loading");
		}, 200);

	},
	//private 클릭 이벤트
	onClick: function(row) {
		//console.debug(row);
	},
	//private 데이터 초기화
	clearValue: function() {
		this.$el.find("input[type=text]").val('');
		this.$el.find("input[type=number]").val('');
		this.$el.find("input[type=checkbox]").attr('checked', false);
		this.$el.find(".table > thead > tr .fas").removeClass("fa-sort-down").removeClass("fa-sort-up").addClass("fa-sort");
		this.$el.find(".pagination").empty();
		this.setTotalNotify("Total : 0");
		this.totalRows = 0;
		//this.$el.find("select[name=search_column]").val("");
		this.selectSearchCombo(0);
		this.totalPage = 1,
			this.nowPageIndex = 1;
		this.sortId = '';
		this.sort = '';

		if (this.datePicker != null)
			this.datePicker.clear();

	},
	initHeader: function(Headers) {
		var self = this;
		self.Headers = Headers;
		self.reInit();
		$.each(self.Headers, function(key, value) {
			self.addHeader(value.id, value.title, value.width, value.sort);
		});

		self.setEmptyRow(self.Headers.length);
	},
	//private 테이블 재초기화 함수
	reInit: function() {
		this.$el.find(".table > thead > tr").empty();
		this.$el.find(".table > tbody").empty();
		this.clearValue();
	},
	destory : function(){
		var self = this;
		this.$el.find(".table > thead > tr").remove();
		this.$el.find(".table > tbody > tr").remove();
		this.clearValue();
	},

};

