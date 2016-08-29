/**
 * Created by wujincun on 2016/8/29.
 */
window.onload = function () {
    waterfall('main', 'box');
    var data = {
        'data':[{'src':'P_013.jpg'},{'src':'P_014.jpg'},{'src':'P_015.jpg'},{'src':'P_016.jpg'},{'src':'P_017.jpg'},{'src':'P_018.jpg'},{'src':'P_019.jpg'},]
    };
    window.onscroll = function () {
         if (checkScrollSlide) {
             var oParent = document.getElementById('main');
            //将数据块渲染到页面的尾部
             for(var i=0;i<data.data.length;i++){
                 var oBox = document.createElement('div');
                 oBox.className = 'box';
                 oParent.appendChild(oBox);
                 var oPic = document.createElement('div');
                 oPic.className = 'pic';
                 oBox.appendChild(oPic);
                 var oImg = document.createElement('img');
                 oImg.src = 'images/' + data.data[i].src;
                 oPic.appendChild(oImg)
             }
             waterfall('main', 'box');
         }
    }
};
function waterfall(parent, box) {
    //将main下的所有class名为box的元素取出
    var oParent = document.getElementById(parent);
    var oBoxes = getByClass(oParent, box);
    //计算整个页面显示的列数（页面宽/box的宽）
    var oBoxW = oBoxes[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW);
    //设置main的宽
    oParent.style.cssText = 'width:' + oBoxW * cols + 'px;margin:0 auto;'
    var hArr = [];//存放每一列高度的数组
    for (var i = 0; i < oBoxes.length; i++) {
        if (i < cols) {
            hArr.push(oBoxes[i].offsetHeight)
        } else {
            var minH = Math.min.apply(null, hArr);//因为Math.min不能用于数组，因此用apply
            var index = getMinHIndex(hArr, minH);
            oBoxes[i].style.position = 'absolute';
            oBoxes[i].style.top = minH + 'px';
            // oBoxes[i].style.left = oBoxW * index + 'px';
            oBoxes[i].style.left = oBoxes[index].offsetLeft + 'px';
            hArr[index] += oBoxes[i].offsetHeight;
        }
    }
}
//根据class获取元素,为了兼容ie9以下，用getElementsByTagName
function getByClass(parent, className) {
    var boxArr = [],//存储class为className的数组
        oElements = parent.getElementsByTagName('*');
    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == className) {
            boxArr.push(oElements[i])
        }
    }
    return boxArr;
}
function getMinHIndex(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
            return i
        }
    }
}
//监测是否具备加载数据块的条件
function checkScrollSlide() {
    var oParent = document.getElementById('main');
    var oBoxes = getByClass(oParent, 'box');
    var lastBoxH = oBoxes[oBoxes.length - 1].offsetTop + Math.floor(oBoxes[oBoxes.length - 1].offsetHeight / 2)
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //浏览时可视高度
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH < scrollTop + height) ? true : false;
}