// 左侧tab导航的数据渲染
axios
  .get('./json/bannerTab.json')
  .then(function (res) {
    tabListShow(res);
  })
  .catch(function (error) {
    console.log(error);
  });

// 插入HTML
function tabListShow(res) {
  var tabList = res.data.data;
  var str = '';
  for (let i = 0; i < tabList.length; i++) {
    str +=
      '<div class="left_item">' +
      tabList[i].name +
      '<svg class="xiangyou" aria-hidden="true"><use xlink:href="#icon-xiangyou1"></use></svg></div>';
  }
  document.getElementsByClassName('banner_left')[0].innerHTML = str;
}

/*   <<<——————————图片部分逻辑————————>>> */
axios
  .get('./json/bannerImg.json')
  .then(function (res) {
    showBannerImg(res);
  })
  .catch(function (error) {
    console.log(error);
  });

// 轮播图逻辑
function showBannerImg(res) {
  var imgList = res.data.data;
  var str = '';
  for (let i = 0; i < imgList.length; i++) {
    str +=
      '<img class="banner_rigt_img" src="' + imgList[i].url + '" alt="" />';
  }
  document.getElementsByClassName('imgs')[0].innerHTML = str;

  // 圆点的数据获取
  getDot();
  function getDot() {
    var dotLength = res.data.data.length;
    var str = '';
    for (let i = 0; i < dotLength; i++) {
      if (i === 0) {
        str += '<div class="banner_dot active"></div>';
      } else {
        str += '<div class="banner_dot"></div>';
      }
    }
    document.getElementsByClassName('dot_list')[0].innerHTML = str;
  }

  // 图片的展示设置
  var index = 0;
  var timer = null;
  var imgHtml = document.getElementsByClassName('banner_rigt_img');
  for (let i = 0; i < imgHtml.length; i++) {
    if (index === i) {
      imgHtml[i].style.opacity = 1;
    } else {
      imgHtml[i].style.opacity = 0;
    }
  }

  // 图片轮播
  imgAuto();
  function imgAuto() {
    timer = setInterval(function () {
      index++;
      imgShow();
    }, 1000);
  }

  // 更换图片
  function imgShow() {
    if (index < 0) {
      index = imgHtml.length - 1;
    }
    if (index > imgHtml.length - 1) {
      index = 0;
    }
    for (let i = 0; i < imgHtml.length; i++) {
      imgHtml[i].style.opacity = 0;
    }
    imgHtml[index].style.opacity = 1;
    dotStateChange();
  }

  // 圆点的选中状态切换
  function dotStateChange() {
    var banner_dot = document.getElementsByClassName('banner_dot');

    for (let i = 0; i < banner_dot.length; i++) {
      banner_dot[i].classList.remove('active');
    }
    banner_dot[index].classList.add('active');
  }

  // 上一张切换
  var xiangzuo_pre = document.getElementsByClassName('xiangzuo_pre')[0];
  xiangzuo_pre.onclick = function () {
    index--;
    imgShow();
  };

  // 下一张切换
  var xiangyou_next = document.getElementsByClassName('xiangyou_next')[0];
  xiangyou_next.onclick = function () {
    index++;
    imgShow();
  };

  // 圆点的点击切换
  var banner_dot = document.getElementsByClassName('banner_dot');
  for (let i = 0; i < banner_dot.length; i++) {
    banner_dot[i].onclick = function () {
      index = i;
      imgShow();
    };
  }

  // 上一张的鼠标交互
  xiangzuo_pre.addEventListener('mouseover', function () {
    clearInterval(timer);
  });
  xiangzuo_pre.addEventListener('mouseout', function () {
    imgAuto();
  });

  // 下一张的鼠标交互
  xiangyou_next.addEventListener('mouseover', function () {
    clearInterval(timer);
  });
  xiangyou_next.addEventListener('mouseout', function () {
    imgAuto();
  });
}
