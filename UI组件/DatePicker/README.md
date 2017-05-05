## 日期对象

* new Date(year, **month-1**, date)
* 月份需要减1
* 越界自动进（退）位

API:
getFullYear()
getMonth()
getYear()
getDay()

当月第一天 new Date(year, month-1, 1)
当月最后一天 new Date(year, month, 0)