// @ts-ignore
! function () {
  let s = 20

  function writeCode(prefix, code, fn) {
    let container = document.querySelector('#code')
    let styleTga = document.querySelector('#styleTag')
    let n = 0
    let id = setTimeout(function run() {
      n += 1
      container.innerHTML = code.substring(0, n)
      styleTga.innerHTML = code.substring(0, n)
      container.scrollTop = container.scrollHeight
      if (n < code.length) {
        id = setTimeout(run, s)
      } else {
        fn && fn.call()
      }

    }, s)
  }
  let code = `
/*首先,皮一下就很开心*/
 
    .preview {
      height: 100%;
      border: 1px solid white;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #F5EBA0;
    }

    .wrapper {
      width: 100%;
      height: 165px;
      position: relative;
      z-index: 1;
    }

    #chopper {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 500px;
      height: 300px;
    }
/*先画一个乔巴的头*/
    #chopper #head {
      margin: auto;
      position: relative;
      background-color: #bc8e3a;
      width: 250px;
      height: 236px;
      z-index: 10;
      border-radius: 50%;
    }
/*然后画眉毛*/
    #chopper #head .eyebrow,
    #chopper #head .eyebrow-right {
      border-bottom: 1px solid #333;
      transform: rotate(15deg);
      top: 98px;
      left: 50px;
      position: absolute;
      width: 32px;
      height: 10px;
    }

    #chopper #head .eyebrow-right {
      left: 170px;
      transform: rotate(-15deg);
    }
/*接下来眼睛*/
    #chopper #head .eye,
    #chopper #head .eye-right {
      top: 125px;
      left: 45px;
      position: absolute;
      background-color: black;
      width: 34px;
      height: 34px;
      z-index: 11;
      border-radius: 50%;
      box-shadow: white 0 0 0 5px, black 0 0 2px 5px;
    }

    #chopper #head .eye-right {
      left: 170px;
    }
/*蓝鼻子来啦*/
    #chopper #head .nose {
      top: 150px;
      left: 115px;
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 15px 12px 0 12px;
      border-color: #36c transparent;
    }
/*画一个夸张的嘴巴*/
    #chopper #head .mouth {
      top: 168px;
      left: 112px;
      position: absolute;
      background-color: #eb5555;
      width: 32px;
      height: 80px;
      z-index: 12;
      border-radius: 50%;
      border-radius: 5% 5% 50% 50%;
      box-shadow: #a00 0px 12px 3px 2px inset, #bc8e3a 0 1px 0 5px;
    }

    #chopper #head .cheek,
    #chopper #head .cheek-right {
      top: 160px;
      left: 92px;
      box-shadow: 0 2px 1px #930;
      position: absolute;
      background-color: #bc8e3a;
      width: 36px;
      height: 22px;
      z-index: 13;
      border-radius: 50%;
    }

    #chopper #head .cheek-right {
      left: 126px;
    }

    #chopper .ear,
    #chopper .ear-right {
      border: 28px;
      border-style: solid;
      border-color: transparent #aa8433 #aa8433 transparent;
      top: 55px;
      left: 92px;
      position: absolute;
      background-color: none;
      width: 0;
      height: 0;
      z-index: 9;
      border-radius: 50%;
    }

    #chopper .ear-right {
      left: 352px;
      border-color: transparent transparent #aa8433 #aa8433;
    }
/*开始画角了*/
    #chopper .deerhorn .dl_1,
    #chopper .deerhorn .dr_1 {
      position: absolute;
      background-color: #9c6630;
      width: 60px;
      height: 20px;
      z-index: 2;
      border-radius: 50%;
      top: 44px;
      left: 113px;
      border-radius: 25px;
    }

    #chopper .deerhorn .dl_2,
    #chopper .deerhorn .dr_2 {
      position: absolute;
      background-color: #9c6630;
      width: 20px;
      height: 80px;
      z-index: 1;
      border-radius: 50%;
      top: -20px;
      left: 108px;
      border-radius: 40%;
      box-shadow: #8c5530 8px -1px 0 3px, #7c4430 16px -1px 0 3px;
    }

    #chopper .deerhorn .dr_1 {
      top: 44px;
      left: 330px;
    }

    #chopper .deerhorn .dr_2 {
      top: -20px;
      left: 375px;
      box-shadow: #8c5530 -8px -1px 0 3px, #7c4430 -16px -1px 0 3px;
    }
/*最后画手手*/
    #chopper .foot {
      border-right: 30px solid #583712;
      border-top: 30px solid transparent;
      border-left: 30px solid #583712;
      border-bottom: 40px solid #583712;
      top: 155px;
      left: 110px;
      position: absolute;
      background-color: none;
      width: 0;
      height: 0;
      z-index: 20;
      border-radius: 50%;
    }
  /*大功告成，报告长官，over*/
     `
  $('.actions').on('click', 'a', function (e) {
    let $button = $(e.currentTarget)
    let speed = $button.attr('data-speed')
    $button.addClass('active').siblings('.active').removeClass('active')
    switch (speed) {
      case 'slow':
        s = 100
        break
      case 'middle':
        s = 50
        break
      case 'fast':
        s = 0
        break
    }
  })
  writeCode('', code)
}.call()