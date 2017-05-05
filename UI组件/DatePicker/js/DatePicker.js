;(function() {
  var DatePicker = {};

  DatePicker.getMonthData = function(year, month) {
    // result中的每个元素为当前月份的日期
    var retult = [];    

    // 当月的第一天
    var firstDay = new Date(year, month - 1, 1);
    // 当月第一天是星期几
    var firstDayWeekDay = firstDay.getDay();
    // 上月的最后一天
    var lastDayOfLastMonth = new Date(year, month - 1, 0);
    // 上月最后一天的日期
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

    var preMonthDayCount = firstDayWeekDay - 1;
    // 当月最后天
    var lastDay = new Date(year, month, 0);
    // 当月最后天的日期
    var lastDate = lastDay.getDate();
    
    if (!year || !month) {
      var today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }

    if (firstDayWeekDay === 0) firstDayWeekDay = 7;

    // 通过循环，获取当月的每一天
    // 通常一月4周以上，所以平衡算取6周的数据
    for (var i = 0; i < 7 * 6; i++) {
      // 当月的日期的越界处理
      var date = i + 1 - preMonthDayCount;
      // 正常的显示日期
      var showDate = date;
      var thisMonth = month;
      
      if (date <= 0) { // 上月的情况处理
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
      } else if (date > lastDate) { // 下一月的情况处理
        thisMonth = month + 1;
        showDate = showDate - lastDate;

      }
      // 对thisMonth进行处理
      if (thisMonth === 0) { // 上一年的12月
        thisMonth = 12;
      }
      if (thisMonth === 13) { // 下一年的1月
        thisMonth = 1;
      }

      retult.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      });
    }

    return retult;
  }

  window.DatePicker = DatePicker;
})()