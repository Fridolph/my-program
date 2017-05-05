;(function() {
  
  var DatePicker = window.DatePicker;

  DatePicker.buildUi = function(year, month) {
    
    var monthData = DatePicker.getMonthData(year, month);
    var html = `
      <div class="ui-datepicker-header">
        <a href="" class="ui-datepicker-btn ui-datepicker-btn-prev">&lt;</a>
        <a href="" class="ui-datepicker-btn ui-datepicker-btn-next">&gt;</a>
        <span class="ui-datepicker-curr-month">2016-12</span>
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

    for (var i = 0; i < monthData.length; i++) {
      var date = monthData[i];

      if (i % 7 === 0) { // 一周的第一天
        html += '<tr>';
      }

      // 渲染中间的日期
      html += `<td>${date.showDate}</td>`;

      if (i % 7 === 6) { // 一周的最后一天
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

  DatePicker.init = function($dom) {    
    var html = DatePicker.buildUi();
    $dom.innerHTML = html;
  }

})();