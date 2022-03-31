//如果在HTML文档完成前加载执行脚本，此时DOM不完整，所以应该让函数在网页加载完毕后立即执行
//网页加载完会触发onload事件，让这个事件与window对象相关联
//如果使用两个window.onload = func 则只有最后一个绑定的函数会被实际执行
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();//新函数追加到现有指令末尾
        }
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nestSibling);
    }
}
//在现有元素后插入一个新元素。nestSibling，目标元素的下一个元素。

addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);

//把现有的window.onload事件处理函数的值存入变量oldonload。
//如果在这个处理函数上还没有绑定任何函数，就像平时那样把新函数添加给它。
//如果在这个处理函数上已经绑定了一些函数，就把新函数追加到现有指令的末尾。
//共享onload事件，弹性最佳方案，为以后的拓展做准备工作。
//只有一个参数：在页面加载完毕时执行的函数的名字。


// window.onload = prepareGallery;
//让函数在网页加载完毕之后立刻执行
// 多个函数时使用function()匿名函数。在需要绑定的函数不是很多的场合，这是最简单的解决方案。


function prepareGallery() {
    if (!document.getElementsByTagName) return false;//检查点
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    //links与其说是数组，说他是节点列表（node list）更准确
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return !showPic(this);
        }
    }
    // function()，匿名函数，在代码执行时创建函数的方法。
    // onclick被指定为这个匿名函数，函数的所有语句在链接被点击时执行。
}

function showPic(which_pic) {
    if (!document.getElementById("placeholder")) return false;
    var source = which_pic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src", source);
    if (document.getElementById("description")) {
        if (which_pic.getAttribute("title")){
            var text = which_pic.getAttribute("title");
        } else {
            var text = "你好";
        }
        // var text = which_pic.getAttribute("title") ? which_pic.getAttribute("title") : "";
        //三元操作符：variable = condition(条件句) ? if true : if false
        var description = document.getElementById("description");
        // alert(description.firstChild.nodeValue);
        if (description.firstChild.nodeType == 3) {
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}

// function countBodyChildren(){
//     var body_element = document.getElementsByTagName("body")[0];
//     alert(body_element.nodeType);
// }
// window.onload = countBodyChildren;


function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "image/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description")
    var desctest = document.createTextNode("Choose an image.")
    description.appendChild(desctest);
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}
//动态的创建placeholder和description。既然这个图片和文字只为showpic服务，
//把结构和行为分开。这些元素只为了让DOM处理，那用DOM创建是最合适的。