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

我们使用了一个 bind(this)，它的作用是让 walk 函数的执行上下文还是指向当前类的实例。

现在怎么让狗动起来呢？最简单的我们可以每隔 0.1s 就画一帧，这样就会连起来，形成一个动画，为此我们需要记录上一次画的时间，然后判断当前时间与上一次的时间是否大于 0.1s，如果是的话就画下一帧，否则什么也不用干。因为上文提过，1s 最多有 60 帧，每一帧间隔 1s / 60 = 16.67ms。如下代码所示，先在 constructor 添加几个变量，包括一个记录上一帧时间的变量：

```js
constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    // 记录上一帧的时间
    this.lastWalkingTime = Date.now();
    // 记录当前画的图片索引
    this.keyFrameIndex = -1;
    this.start();
}
```

然后在 walk 函数里面进行绘制，在画的时候每次画都取下张图片，即下一帧的图片，不断循环：

```js
walk() {
  // 绘制狗的图片，每过100ms就画一张
  let now = Date.now();
  if (now - this.lastWalkingTime > 100) {
      // 先清掉上一次画的内容
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // 获取下一张图片的索引
      let keyFrameIndex = ++this.keyFrameIndex % this.IMG_COUNT;
      let img = this.dogPictures[keyFrameIndex + 1];
                      // img, sx, sy, swidth, sheight
      this.ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight,
              // dx = 20, dy, dwidth, dheight
              20, 20, 186, 162);
      this.lastWalkingTime = now;
  }
  // 继续给下一帧注册一个函数
  window.requestAnimationFrame(this.walk.bind(this));
}
```

这样我们就有了一只在原地踏步的小狗：

![](https://pic2.zhimg.com/v2-4915ba110ba27c9434fd041baefd5940_b.jpg)

3. 让小狗往前走

上面在 drawImage 的传参固定 dx = 20，如果不断加大这个 dx，那么它就往前走了。为此在构造函数里面添加一个变量记录当前的位移，并设置小狗的速度：

```js
constructor(canvas) {
    // 小狗的速度
    this.dogSpeed = 0.1;
    // 小狗当前的位移
    this.currentX = 0;
}
```

然后在 walk 函数里面计算当前累加的位移：

```js
// 计算位移 = 时间 * 速度
let distance = (now - this.lastWalkingTime) * this.dogSpeed
this.currentX += distance
this.ctx.drawImage(
  img,
  0,
  0,
  img.naturalWidth,
  img.naturalHeight,
  // dx, dy, dwidth, dheight
  this.currentX,
  20,
  186,
  162
)
```

但是这样我们发现小狗走起路来一卡一卡的，不是很连贯：

这个是因为每 0.1s 画一帧，帧率只有 10fps，所以一走起来就不太行了。方法一是让它走慢点，这样可以减缓，但是如果想保持速度甚至提高速度的话，我们得想办法优化一下。

4. 算法优化

考虑到狗的控制参数比较集中，把它们写到一个 dog 的 Object 里面

```js
constructor (canvas) {
  this.dog = {
      // 一步10px
      stepDistance: 10,
      // 狗的速度
      speed: 0.15,
      // 鼠标的x坐标
      mouseX: -1
  };
}
```

主要有两个参数，一个是狗的速度另一个是每一步走的位移，然后计算距离方式变成：

```js
let now = Date.now(); 
let distance = (now - this.lastWalkingTime) * this.dog.speed;
if (distance < this.dog.stepDistance) {
    window.requestAnimationFrame(this.walk.bind(this));
    return;
}
```

每一步至少走10px，如果小于这个数的话就不走了。通过每步的位移和速度这两个参数可以很方便地控制狗走的快慢和帧率，例如把stepDistance改小点，speed提高就会走得比较频繁，能提高帧率，上面设置的帧率是14 fps. 不过帧率低的根本原因还是在于小狗走路的图片较少。

5. 走到鼠标的位置停下

给小狗添加一个停留的位置，包括往前走和往后走的，因为一个是鼠标在图片前面，一个是鼠标在图片的后面，需要区分：

```js
this.dog = {
    // 往前走停留的位置
    frontStopX: -1,
    // 往回走停留的位置,
    backStopX: window.innerWidth,
};
```

然后添加一个记录鼠标位置的函数，主要是监听mousemove事件：

```js
async start () {
    await this.loadResources();
    this.pictureWidth = this.dogPictures[0].naturalWidth / 2;
    this.recordMousePosition();
    window.requestAnimationFrame(this.walk.bind(this));
}
// 记录鼠标位置
recordMousePosition() {
    window.addEventListener("mousemove", event => {
        // 如果没减掉图片的宽度，小狗就跑到鼠标后面去了，因为图片的宽度还要占去空间
        this.dog.frontStopX = event.clientX - this.pictureWidth;
        this.dog.backStopX = event.clientX;
    });
}
```

然后在walk函数里面用一个变量stopWalking表示小狗是否停下来，和一个direct表示小狗的方向：

```js
this.keyFrameIndex = ++this.keyFrameIndex % this.IMG_COUNT;
let direct = -1,
    stopWalking = false;
// 如果鼠标在狗的前面则往前走
if (this.dog.frontStopX > this.dog.mouseX) {
    direct = 1; 
} 
// 如果鼠标在狗的后面则往回走
else if (this.dog.backStopX < this.dog.mouseX) {
    direct = -1;
}
// 如果鼠标在狗在位置
else {
    stopWalking = true;
    // 如果停住的话用0.png（后面还会加1）
    this.keyFrameIndex = -1;
}
```

如果小狗没有停，计算位置的时候乘以direct：

```js
// 计算位置
if (!stopWalking) {
    this.dog.mouseX += this.dog.stepDistance * direct;
}
```

如果小狗停了，则mouseX还是上次的值。

鼠标停留在小狗位置的那段代码可以做个优化，如果鼠标在小狗中间的右边，则方向调整为正，否则为负：

```js
// 如果鼠标在狗在位置
else {
    stopWalking = true;
    // 如果鼠标在小狗图片中间的右边，则direct为正，否则为负
    direct = this.dog.backStopX - this.dog.mouseX 
                    > this.pictureWidth / 2 ? 1 : -1; 
    this.keyFrameIndex = -1;
}
```

这样鼠标在小狗左右来回移动时，小狗会转头。

得到小狗的位置和方向之后就是画上去，正方向的还好，反方向的由于没图片，我们通过canvas的翻转flip进行绘制，如下代码所示：

```js
ctx.save();
if (direct === -1) {
    // 左右翻转绘制
    ctx.scale(direct, 1);
}
let img = this.dogPictures[this.keyFrameIndex + 1];
let drawX = 0;
// 左右翻转绘制的位置需要计算一下
drawX = this.dog.mouseX * direct -  
            (direct === -1 ? this.pictureWidth : 0);
ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight,
                drawX, 20, 186, 162);  
ctx.restore();
```

这样基本上就完成了，最后一个问题是小狗初始化位置的摆放，如果你要把它摆在右边的话，那需要把它的方向反转一下，摆在最左边也需要。不然你会发现小狗摆在左边，但它的头朝左了，需要转一下放在右边。