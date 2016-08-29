/**
 * Created by wujincun on 2016/8/29.
 */
window.onload = function () {
    waterfall('main', 'box')
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
