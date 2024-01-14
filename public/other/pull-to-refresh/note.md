这里主要针对移动端

* F5刷新有白屏，重复加载，浪费
* 下拉异步刷新提供更好地用户体验
* 不增加用户学习成本
* 与Native保持体验一致

已有轮子实现参考：

* pulltorefresh.js 
* [react-pull-to-refresh](https://github.com/bryaneaton13/react-pull-to-refresh)
* [iscroll](https://github.com/cubiq/iscroll)

自己来实现，步骤和思路：

1. 监听原生`touchstart`事件，记录滑动起始位置 `ev.touches[0].pageY`
2. 监听原生`touchmove`事件，记录最新滑动位置与其实位置`ev.touches[0].pageY`的像素差`pullLength`(若大于0则为向下拖动，此时将pullLength结果同步设置为目标元素translateY值，实现元素跟随手势向下移动。ps移动距离有上限)
3. 监听原生`touchend`事件，如果元素已在页面顶部，且下pullLength大于一个阀值(默认60px)则触发callback，并且将translateY的取值还原为0，恢复目标元素位置