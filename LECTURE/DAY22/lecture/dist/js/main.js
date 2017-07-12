'use strict';

/*! main.js @ 2017, yamoo9.net */

// JSON //
// https://api.myjson.com/bins/f0etn

(function ($) {
  'use strict';

  if (!$.random) {
    $.random = function (n) {
      return Math.floor(Math.random() * n);
    };
  }
})(window.jQuery);

;(function (global, $) {
  'use strict';

  /** 모듈 내 지역 변수 */

  var $component = void 0,
      $lists = void 0,
      $labels = void 0,


  // 사용자 정의 옵션
  time = 300,
      // 트랜지션 시간(ms)
  is_multi_toggle = !true; // 멀티 토글 가능 여부

  /** 초기화 함수 */
  function init() {
    // 객체 참조
    $component = $('.ui-accordion');
    $lists = $component.find('.menu-list'); // .find() 인스턴스 메서드 사용
    $labels = $('.menu-label a', $component); // context 전달인자 사용
    // 이벤트 바인딩
    bind();
    // 초기 실행
    $lists.hide(); // 모든 리스트 감추기
    var n = $.random($labels.length);
    $labels.eq(n).trigger('click'); // 특정 레이블 활성화 클릭 실행
  }
  /** 이벤트 핸들링 */
  function bind() {
    $labels.on('click', is_multi_toggle ? toggleList : toggleSingleList);
  }
  /** 이벤트 핸들러 */
  function toggleList(e) {
    e.preventDefault(); // 기본 동작 차단
    var $this = $(e.target); // 클릭한 대상 jQuery화 참조
    var $list = $this.parent().next();
    // Toggle List & Label
    $list.toggle(time);
    $this.toggleClass('is-active');
  }
  function toggleSingleList(e) {
    e.preventDefault();
    var $this = $(e.target);
    var $list = $this.parent().next();
    var $actived = $labels.filter('.is-active');

    // 활성화된 레이블과
    // 사용자가 클릭한 레이블이 일치한다면
    // 함수를 종료하라.
    if ($actived.is($this)) {
      return;
    }

    // 제어 방법 1: 하나 하나 제어
    // is-active 클래스를 가진 <a> 요소에게서 해당 클래스를 제거한다.
    $actived.removeClass('is-active');
    // $lists 중 열린 리스트를 찾아 닫아준다. hide(time)
    $lists.filter(':visible').hide(time);
    // $this 객체에 is-active 클래스를 추가한다.
    $this.addClass('is-active');
    // $list 객체를 펼쳐준다. show(time)
    $list.show(time);

    // 제어 방법 2: toggleList 함수를 만들어 재사용
    // toggleList()를 실행하여 현재 열린 리스트와 활성화된 레이블을 비활성화 한다.
    // toggleList()를 실행하여 클릭한 레이블과 연결된 리스트를 펼쳐준다.
  }

  // 초기화 실행
  init();
})(window, window.jQuery);