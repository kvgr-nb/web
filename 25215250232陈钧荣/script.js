// 轮播图核心功能实现

// 获取DOM元素：轮播图片、指示器圆点、切换按钮、轮播容器
const sliderImgs = document.querySelectorAll('.slider-img'); // 所有轮播图
const sliderDots = document.querySelectorAll('.dot'); // 所有指示器
const sliderBtns = document.querySelectorAll('.slider-btn'); // 左右按钮
const sliderWrapper = document.querySelector('.slider-wrapper'); // 轮播容器
let currentIndex = 0; // 当前轮播图索引（默认第1张）
let sliderInterval; // 自动轮播定时器

/**
 * 切换轮播图函数
 * @param {number} index - 目标轮播图索引
 */
function switchSlider(index) {
  // 1. 隐藏所有轮播图和指示器激活状态
  sliderImgs.forEach(img => {
    img.classList.remove('active'); // 移除active类（opacity:0）
  });
  sliderDots.forEach(dot => {
    dot.classList.remove('active'); // 移除active类（绿色背景）
  });
  // 2. 显示目标轮播图和激活对应指示器
  sliderImgs[index].classList.add('active'); // 添加active类（opacity:1）
  sliderDots[index].classList.add('active'); // 添加active类（绿色背景）
  // 3. 更新当前索引
  currentIndex = index;
}

/**
 * 启动自动轮播
 * 每隔3秒切换到下一张，循环播放
 */
function startAutoSlider() {
  sliderInterval = setInterval(() => {
    // 计算下一张索引：当前索引+1，超出长度则回到0（取余运算）
    currentIndex = (currentIndex + 1) % sliderImgs.length;
    switchSlider(currentIndex); // 切换到下一张
  }, 3000); // 3000ms = 3秒
}

/**
 * 停止自动轮播
 * 清除定时器，暂停自动切换
 */
function stopAutoSlider() {
  clearInterval(sliderInterval);
}

// 初始化：默认显示第1张，启动自动轮播
startAutoSlider();

/**
 * 指示器点击事件
 * 点击某个圆点，切换到对应轮播图
 */
sliderDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    switchSlider(index); // 切换到点击的圆点对应的轮播图
    stopAutoSlider(); // 暂停自动轮播
    startAutoSlider(); // 重新启动自动轮播（避免点击后加速）
  });
});

/**
 * 左右按钮点击事件
 * 左按钮：切换到上一张；右按钮：切换到下一张
 */
sliderBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('left')) {
      // 左按钮：上一张索引 = (当前索引-1 + 总长度) % 总长度（避免负数）
      currentIndex = (currentIndex - 1 + sliderImgs.length) % sliderImgs.length;
    } else {
      // 右按钮：下一张索引 = (当前索引+1) % 总长度
      currentIndex = (currentIndex + 1) % sliderImgs.length;
    }
    switchSlider(currentIndex); // 切换轮播图
    stopAutoSlider(); // 暂停自动轮播
    startAutoSlider(); // 重新启动
  });
});

/**
 * 鼠标悬停/离开轮播区时控制自动轮播
 * 悬停：停止自动轮播（方便用户查看）
 * 离开：重新启动自动轮播
 */
sliderWrapper.addEventListener('mouseenter', stopAutoSlider); // 鼠标进入
sliderWrapper.addEventListener('mouseleave', startAutoSlider); // 鼠标离开