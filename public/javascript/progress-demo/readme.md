# 知识点

通过加载状态事件制作进度条

document.onreadystatechange 页面加载状态改变时的事件

document.readyState 返回当前文档的状态

* uninitialized 还未开始载入
* loading 载入中
* interactive 已加载，文档与用户可以开始交互
* complete 载入完成


---

实时获取加载数据的进度条

相关知识点

建立图像对象： 图像对象名称 = new Image()

属性 border **complete** height

事件 onload onerror onkeydown onkeypress

src属性 一定要写到onload 的后面，否则程序在IE中会报错