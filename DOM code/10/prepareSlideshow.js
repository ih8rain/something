function prepareSlideshow(){
    //确保浏览器支持 DOM 方法
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    //确保元素存在
    if(!document.getElementById("linklist")) return false;
    // if(!document.getElementById("slideshow")) return false;
    // if(!document.getElementById("preview"));
    //创建div元素
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    //创建img元素
    var preview = document.createElement("img");
    preview.setAttribute("id", "preview");
    preview.setAttribute("alt", "building blocks of web design");
    preview.setAttribute("src", "topics.gif");
    //将img元素放入div元素
    slideshow.appendChild(preview);
    var list = document.getElementById("linklist");
    insertAfter(slideshow, list);
    //为图片应用样式
    // var preview = document.getElementById("preview");
    //取得列表中的所有链接
    // var list = document.getElementById("linklist");
    var links = list.getElementsByTagName("a");
    //为 mouseover 事件添加动画效果
    links[0].onmouseover = function (){
        moveElement("preview", -100, 0, 10);
    }
    links[1].onmouseover = function () {
        moveElement("preview", -200, 0, 10);
    }
    links[2].onmouseover = function () {
        moveElement("preview", -300, 0, 10);
    }
}

addLoadEvent(prepareSlideshow);