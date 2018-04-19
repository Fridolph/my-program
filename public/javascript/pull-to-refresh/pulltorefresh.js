;(function(window) {
  const _defaults = {
    instructionsPullToRefresh: 'pull to refresh',
    instructionsReleaseRefresh: 'Release to refresh',
    instructionsRefreshing: 'refreshing',
    threshould: 60, // 下拉阀值 单位px
    onPull: () => location.reload()
  }

  let _pullLength = 0
  let _startLength = 0
  let _ptrEle = ''
  let _ptrTextEle = ''
  let _element = ''

  let pullToRefresh = {
    init(cfg) {
      Object.keys(_defaults).forEach(key => {
        cfg[key] = cfg[key] || _defaults[key]
      })
      _element = document.querySelector(cfg.targetElement)
      _ptrEle = document.querySelector(cfg.ptrElement)
      _preTextEle = document.querySelector(cfg.ptrTextElement)
      // init style
      _element.style['position'] = 'relative'
      _ptrEle.style['position'] = 'absolute'
      _ptrTextEle.innerText = cfg.instructionsPullToRefresh

      // blind event
      _element.addEventListener('touchstart', evt => {
        _startLength = evt.touches[0].pageY
        _element.style['transition'] = `transform 0s`
        _preTextEle.innerText = cfg.instructionsPullToRefresh
      })
      _element.addEventListener('touchmove', evt => {
        _pullLength = event.touches[0].pageY - _startLength
        if (_pullLength > 0) {
          pullElement(_element, _pullLength, cfg)
        }
      })
      _element.addEventListener('touchend', () => {
        if (_pullLength > cfg.threshold) {
          _preTextEle.innerText = cfg.instructionsRefreshing
          cfg.onPull()
          _pullLength = 0
        }
        _element.style['transition'] = 'transform 0.6s ease'
        _element.style['transform'] = 'translateY(0)'
      })
    }
  }

  let pullElement = (element, length, cfg) => {
    if (length < _ptrEle.offsetHeight) {
      element.style['transform'] = `translateY(${length}px)`
      if (length > cfg.threshold) {
        // release to fresh
        _ptrTextEle.innerText = cfg.instructionsReleaseToRefresh
      }
    }
  }
  
  window.pullToRefresh = pullToRefresh
})(window)