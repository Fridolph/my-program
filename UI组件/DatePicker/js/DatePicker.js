;(function() {
  
  let datepicker = {};

  datepicker.getMonthData = function(year, month) {
    // 定义一个空数组用于存储日期数
    let result = [];

    if (!year || !month) {
      // 如果没有传入年份和月份，则新声明一个today对象并获取到当前年份及对应月份
      var today = new Date();      // 2017-5-8
      year = today.getFullYear();  // 2017
      month = today.getMonth() + 1;  // 4 月份从0算， 这里+1  所以为5
    }

    // 获取到当月的第一天
    var firstDay = new Date(year, month - 1, 1);
    // 获取当月第一天是星期几
    var firstDayWeekDay = firstDay.getDay();

    if (firstDayWeekDay === 0) { 
      // 将周日赋值为7
      firstDayWeekDay === 7;
    }

    year = firstDay.getFullYear();
    month = firstDay.getMonth() + 1;

    // 上月的最后一天
    var lastDayOfLastMonth = new Date(year, month - 1, 0);
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

    // 在日历的第一行需要显示多少个少月的日期
    var preMonthDayCount = firstDayWeekDay - 1;

    // 当月的最后一天
    var lastDay = new Date(year, month, 0);
    // 当月最后一天的日期
    var lastDate = lastDay.getDate();

    // 一周7天，2月可能只有给4行，相反31天的月份可能出现6行
    for (var i = 0; i < 7*6; i++) { 
      // 当前是哪一天
      var date = i + 1 - preMonthDayCount;
      // 用来显示的天数
      var showDate = date;
      // thisMonth赋值为当月
      var thisMonth = month;
      
      if (date <= 0) { // 上一月
        thisMonth = month - 1;
        showDate = lastDateOfLastMonth + date;
      } else if (date > lastDate) { // 下一月
        thisMonth = month + 1;
        showDate = showDate - lastDate;
      }

      // 月份为0则为上一年的12月
      if (thisMonth === 0) thisMonth = 12;
      // 月份为13则为下一年的1月
      if (thisMonth === 13) thisMonth = 1;

      result.push({
        month: thisMonth,
        date: date,
        showDate: showDate
      })
    }

    return {
      year,
      month,
      days: result
    };
  }

  window.datepicker = datepicker;

})();