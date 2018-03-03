// 写一个页面canvas标签，把它固定到页面顶部
let canvas = document.querySelector('#walkingDog')
// 设置页面宽度为100%
canvas.width = window.innerWidth
canvas.height = 200

// 有画步了，接着把图片加载下来 准备0-8.png 9张图

// let img = new Imamge()
// img.onload = function() {
//   beginDraw(img)
// }

// img.src = '../img/0.png'

class DogAnimation {
  constructor(canvas) {
    canvas.width = window.innerWidth
    canvas.height = 200
    // 存放加载后狗的图片
    this.odgPictures = []
    // 图片目录
    this.RES_PATH = '../img'
    this.IMG_COUNT = 8
    this.start()
  }

  async start() {
    // 等待资源加载完
    await this.loadResources()
    
    // 给下一帧注册一个函数
    // 我们使用了bind(this) 它的作用是
    window.requestAnimationFrame(this.walk.bind(this))
  }

  walk() {
    // 绘制狗的图片


    
    // 继续给下一帧注册一个函数
    window.requestAnimationFrame(this.walk.bind(this))
    
  }

  /**
   * 这段加载图片的代码借助了Promise，把每张图片的加载都当作一个Promise的任务，
   * 统一放到一个数组里面，然后再借助Promise.all就知道所有的任务都完成了。
   * 这样就拿到了所有已onload的img对象，然后就可以拿来画了。
   */
  loadResources() {
    // 把狗的图片放到dogPictures数组里，在loadResources里进行加载
    let imagesPath = []
    // 准备图片的src
    for (let i = 0; i <= this.IMG_COUNT; i++) {
      imagesPath.push(`${this.RES_PATH}/${i}.png`)
    }

    let works = []
    imagesPath.forEach(imgPath => {
      // 图片加载完之后触发promise的resolve
      works.push(new Promise(resolve => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.src = imgPath
      }))
    })

    return new Promise((resolve, reject) => {
      // 借助Promise.all知道了所有图片都加载好了
      Promise.all(works).then(dogPictures => {
        this.dogPictures = dogPicures
        resolve()
      })
    })
    // 这里再套一个Promise是为了让调用者能够知道处理好了
  } 
}

let canvas = document.querySelector('#walkingDog')
let dogAnimation = new DogAnimation(canvas)
dogAnimation.start()
