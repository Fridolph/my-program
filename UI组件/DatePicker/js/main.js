;(function() {
  
  var datepicker = window.datepicker;
  var monthData;
  var $wrapper;

  datepicker.buildUi = function(year, month) {
    
    monthData = datepicker.getMonthData(year, month);

    let html = `
      <div class="ui-datepicker-header">
        <a href="javascript:;" class="ui-datepicker-btn ui-datepicker-btn-prev">&lt;</a>
        <a href="javascript:;" class="ui-datepicker-btn ui-datepicker-btn-next">&gt;</a>
        <span class="ui-datepicker-curr-month">${monthData.year}-${monthData.month}</span>
      </div>
      <div class="ui-datepicker-body">
        <table>
          <thead>
            <tr>
              <th>日</th>
              <th>一</th>
              <th>二</th>
              <th>三</th>
              <th>四</th>
              <th>五</th>
              <th>六</th>
            </tr>
          </thead>
          <tbody>
    `;

    for (var i = 0; i < monthData.days.length; i++) {
      var date = monthData.days[i];

      if (i % 7 === 0) { // 每一周的第一天
        html += '<tr>';
      }

      // 渲染中间的日期
      html += `<td data-date=${date.date}>${date.showDate}</td>`;

      if (i % 7 === 6) { // 每一周的最后一天
        html += '</tr>';
      }
    }

    html += `   
          </tbody>
        </table>
      </div>
    `;

    return html;
  }



  datepicker.render = function(direction) {

    var year, month;
    
    if (monthData) {
      year = monthData.year; 
      month = monthData.month;
    }

    if (direction === 'prev') month--;
    if (direction === 'next') month++;

    var html = datepicker.buildUi(year, month);

    if (!$wrapper) {
      $wrapper = document.createElement('div');
      document.body.appendChild($wrapper);
      $wrapper.className = 'ui-datepicker-wrapper';
    } 

    $wrapper.innerHTML = html;
  }

  datepicker.init = function(input) {     

    datepicker.render();    

    var $input = document.querySelector(input);
    var isOpen = false;  // 定义初始布尔值控制显隐

    $input.addEventListener('click', function() {
      if (isOpen) {
        $wrapper.classList.remove('ui-datepicker-wrapper-show');
        isOpen = false;
      } else {
        $wrapper.classList.add('ui-datepicker-wrapper-show');

        var left = $input.offsetLeft;
        var top = $input.offsetTop;
        var height = $input.offsetHeight;

        $wrapper.style.top = top + height + 4 + 'px';
        $wrapper.style.left = left + 'px';

        
        isOpen = true;
      }
    }, false);

    // 若只在点击元素上绑定事件，随着元素销毁只会绑定一次之后不会生效
    // 故在容器元素上绑定
    $wrapper.addEventListener('click', function(e) {
      var $target = e.target;
      
      if(!$target.classList.contains('ui-datepicker-btn')) {
        return;
      }

      if($target.classList.contains('ui-datepicker-btn-prev')) { // 上一月
        datepicker.render('prev');
      }

      if($target.classList.contains('ui-datepicker-btn-next')) { // 下一月
        datepicker.render('next');
      }

    }, false)

    // 绑定点击事件可以选择具体日期
    $wrapper.addEventListener('click', function(e) {
      var $target = e.target;

      if ($target.tagName.toLowerCase() !== 'td') return;

      var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

      $input.value = format(date);

      // 得到日期后将选择框关闭
      $wrapper.classList.remove('ui-datepicker-wrapper-show');
      isOpen = false;

    }, false);
  }

  function format(date) {
    var ret = '';

    var padding = function(num) {
      if (num <= 9) {
        return '0' + num;
      }
      return num;
    }

    ret += date.getFullYear() + '-';
    ret += padding(date.getMonth() + 1) + '-';
    ret += padding(date.getDate());

    return ret;
  }

})();