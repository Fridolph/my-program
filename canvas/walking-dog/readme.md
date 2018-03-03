转自 [用 Canvas 画一只会跟着鼠标走的小狗](https://zhuanlan.zhihu.com/p/34139676?utm_source=qq&utm_medium=social)
作者： 李银城

以前经常看到这种效果：在网页右下角放一个人，然后他的眼珠会跟着鼠标转，效果如下

![](https://pic1.zhimg.com/v2-56f1320cd6b7e0d9017718b23877ff68_b.jpg)

这个例子来自于 CodePen，它是根据鼠标的位置设置两个眼球的 transform: rotate 属性做的效果。

这种跟着鼠标移动的小交互一般都比较好玩，所以我突然想到，能不能做一只会跟着鼠标走的小狗，最后的效果如下所示

![](https://pic3.zhimg.com/v2-448fc78f2ab5fe8e85bf94a88a0b5880_b.jpg)

我们一步步来实现这个效果。

1. 小狗走的动画小狗走的动画应该怎么实现呢？如果用一张 gif，然后根据鼠标的位置移动这张 gif，那么当鼠标停下来小狗不动的效果就做不了，因为 gif 一直在循环播放代码控制不了这个行为。所以这种简单方案是不可行的。

然后又想到之前用 CSS 的 animation 做过这种逐帧动画：

![](https://pic4.zhimg.com/v2-bedff50d1051c1707b82fcd26856f110_b.jpg)

所以就有思路了，小狗的动画也是使用逐帧的动画，并且用 JS 控制它的播放。

在网上搜罗了一番，还没有人做过类似的动画，不过找到了小狗的素材，这位老兄在教人怎么画行走的动物，刚好可以拿来当做我们的素材，把小狗抠出来：

![](https://pic1.zhimg.com/80/v2-ae3b60c28d5875b6467de460dd01af26_hd.jpg)

2. 画一只在原地踏步的小狗动画的第一步先让小狗原地踏步，即先让这个动画能播放起来，然后再做移动的动画。所谓逐帧动画就是每隔一小会就播放一帧，这样连起来就是在动了。

写一个 canvas 标签，然后把它固定到页面的底部：

```html
<canvas id="dog-walking" style="position:fixed;left:0;bottom:0"></canvas>
```

然后设置宽度为页面的 100%

```js
let canvas = document.querySelector('#dog-walking')
canvas.width = window.innerWidth
canvas.height = 200
```

这样我们就有一个画布了。接着要把图片画让去，先要把图片加载下来，上面我们准备了 9 张 png：0.png ~ 8.png，其中 0.png 是小狗停住不动的图片，1.png ~ 8.png 是小狗在走的图片。

在 JS 里面怎么加载图片呢，用新建一个 Image 实例的方式，如下代码所示：

```js
let img = new Image()
img.onload = function() {
  beginDraw(img)
}
img.src = 'dog/0.png'
```

由于图片比较多，我们用类的方式组织我们的代码，把数据当作类的属性，方便存取。如下代码所示：

```js
class DogAnimation {
  constructor(canvas) {
    canvas.width = window.innerWidth
    canvas.height = 200
    // 存放加载后狗的图片
    this.dogPictures = []
    // 图片目录
    this.RES_PATH = './dog'
    this.IMG_COUNT = 8
    this.start()
  }
  start() {
    this.loadResources()
  }
  loadResources() {}
}
let canvas = document.querySelector('#dog-walking')
let dogAnimation = new DogAnimation(canvas)
dogAnimation.start()
```

把狗的图片放到 dogPictures 数组里面，在 loadResources 里面进行加载，如下代码所示：

```js
// 加载图片
loadResources() {
    let imagesPath = [];
    // 准备图片的src
    for (let i = 0; i <= this.IMG_COUNT; i++) {
        imagesPath.push(`${this.RES_PATH}/${i}.png`);
    }

    let works = [];
    imagesPath.forEach(imgPath => {
        // 图片加载完之后触发Promise的resolve
        works.push(new Promise(resolve => {
            let img = new Image();
            img.onload = () => resolve(img);
            img.src = imgPath;
        }));
    });

    return new Promise(resolve => {
        // 借助Promise.all知道了所有图片都加载好了
        Promise.all(works).then(dogPictures => {
            this.dogPictures = dogPictures;
            resolve();
        });
    }); // 这里再套一个Promise是为了让调用者能够知道处理好了
}
```

这段加载图片的代码借助了 Promise，把每张图片的加载都当作一个 Promise 的任务，统一放到一个数组里面，然后再借助 Promise.all 就知道所有的任务都完成了。这样就拿到了所有已 onload 的 img 对象，然后就可以拿来画了。

在 start 函数里面添加一个画的函数 walk 的执行：

```js
async start() {
    // 等待资源加载完
    await this.loadResources();
    this.walk();
}
walk() {

}
```

实际上为了画逐帧动画，我们要使用 window.requestAnimationFrame，这个函数在浏览器画它自己的动画的下一帧之前会先调一下这个函数，理想情况下，1s 有 60 帧，即帧率为 60 fps。因为不管是播放视频还是浏览网页它们都是逐帧的，例如往下滚动网页的时候就是一个滚动的动画，所以浏览器本身也是在不断地在画动画，只是当你的网页停止不动时（且页面没有动画元素），它可能会降低帧率减少资源消耗。

所以代码改成这样：

```js
async start() {
    await this.loadResources();
    // 给下一帧注册一个函数
    window.requestAnimationFrame(this.walk.bind(this));
}
walk() {
    // 绘制狗的图片

    // 继续给下一帧注册一个函数
    window.requestAnimationFrame(this.walk.bind(this));
}
```
