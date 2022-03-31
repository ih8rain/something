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

function addClass(element, value) {
    if (element.className == null) {
        element.className == value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function highLightPage(){
    //检查要使用的DOM方法的代码，另外要检查各种元素是否存在。
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    //取得导航链接，然后遍历循环
    var headers = document.getElementsByTagName("header");
    if(headers.length==0) return false;
    var navs = headers[0].getElementsByTagName("nav")
    if(navs.length==0) return false;
    var links = navs[0].getElementsByTagName("a");
    var linkurl;
    for(var i =0; i<links.length; i++){
        linkurl = links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl) != -1){
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linktext);
        }
        // window.location.href获取当前页面的 url
        // string.indexOf(substring)，在字符串中寻找子字符串的位置。
        // 如果没有匹配到，indexOf 方法将返回-1。返回其他值，表示有匹配。
    }
}

function moveElement(elementId, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementId)) false;
    var elem = document.getElementById(elementId);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos) / 10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x) / 10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos) / 10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil((ypos - final_y) / 10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementId + "', " + final_x + "," + final_y + ", " + interval + ")";//外面单引号，里面就是双引号。
    elem.movement = setTimeout(repeat, interval);
    //把 movement 从一个全局变量改变为 elem 元素的属性。javascript 允许为元素创建属性。
}

// home
function prepareSlideshow(){
    //把幻灯片放在 intro 后面
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var frame = document.createElement("img");
    frame.setAttribute("id", "frame");
    frame.setAttribute("alt", " ");
    frame.setAttribute("src", "images/frame.gif");
    slideshow.appendChild(frame);
    var preview = document.createElement("img");
    preview.setAttribute("id", "preview");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("src", "./images/slideshow.gif");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);
    var links = document.getElementsByTagName("a");
    var destination;
    for(var i = 0; i<links.length; i++){
        links[i].onmouseover = function (){
            destination = this.getAttribute("href");
            if(destination.indexOf("index.html") != -1){
                moveElement("preview", 0, 0, 5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview", -150, 0, 5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview", -300, 0, 5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview", -450, 0, 5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview", -600, 0, 5);
            }
        }

    }
}

// about
function showSection(id){
    var sections = document.getElementsByTagName("section");
    for(var i =0; i<sections.length; i++){
        if(sections[i].getAttribute("id") !=id){
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

function prepareInterNav(){
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i=0; i<links.length; i++){
        var selectID = links[i].getAttribute("href").split("#")[1];
        // array = string.split(character); 以 # 分开，[0]前面是空字符，要的是第二个
        if(!document.getElementById(selectID)) continue;
        document.getElementById(selectID).style.display = "none";
        links[i].destination = selectID;
        links[i].onclick = function (){
            showSection(this.destination);
            return false;
        }
    }
}

//photos.html
function showPic(which_pic) {
    if (!document.getElementById("placeholder")) return false;
    var source = which_pic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src", source);
    if (document.getElementById("description")) {
        if (which_pic.getAttribute("title")) {
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

function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var desctest = document.createTextNode("Choose an image.")
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description")
    description.appendChild(desctest);
    var gallery = document.getElementById("imagegallery");
    insertAfter(description, gallery);
    insertAfter(placeholder, description);
}

//live.html
function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    var odd, rows;
    for (var i = 0; i < tables.length; i++) {
        odd = false;
        rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                // rows[j].style.backgroundColor="#ffc";
                addClass(rows[j], "odd");//通过class来处理
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

function addClass(element, value) {
    if (element.className == null) {
        element.className == value;
    } else {
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function highlightRows() {
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName = rows.className;
        rows[i].onmouseover = function () {
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function () {
            this.className = this.oldClassName;
        }
    }
}

function displayAbbreviations() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    //取得所有缩略词
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;//abbr不存在，在返还false，函数结束
    var defs = new Array();//定义数组用来存储abbr数据
    //遍历所有缩略词
    for (var i = 0; i < abbreviations.length; i++) {
        if (abbreviations[i].childNodes.length < 1) continue;
        var definition = abbreviations[i].getAttribute("title");
        var key = abbreviations[i].firstChild.nodeValue;
        defs[key] = definition;//缩略语作下标
    }
    //创建定义列表
    var dlist = document.createElement("dl");//“孤儿”，文档碎片
    //遍历定义
    for (key in defs) {//对于defs关联数组里的每个键，把它的值赋给变量key，接下来可以把key当变量使用
        var definition = defs[key];
        //创建定义标题
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        //创建定义描述
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        //把他们添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if (dlist.childNodes.length < 1) return false;
    //创建标题
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    // document.getElementsByTagName("body")[0];
    // DOM Core的用法，引用第一个（也是仅有的一个）body标签
    //把标题添加到页面主体
    // document.body.appendChild(header);
    // //把定义列表添加到页面主体
    // document.body.appendChild(dlist);
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}

//contact
// label 中的文字被点击时，关联的表单字段获得焦点。为不支持的浏览器写的
function focusLabels(){
    if (!document.getElementsByTagName) return false;
    var labels = document.getElementsByTagName("label");
    for (var i=0; i<labels.length; i++){
        if (!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function(){
            var id = this.getAttribute("for");
            if (!document.getElementById(id)) return false;
            var element = document.getElementById(id);
            element.focus();
        }
    }
}

// function test2(){
//     var test3 = document.getElementById("test1");
//     var test4 = test3[0].getAttribute("tip")         报错，getElementById 获得的不是数组。
//     test3.onclick = function(){
//         document.getElementById(test4).focus();
//     }
// }

//为不支持 placeholder 的浏览器写
// function restFields(whichform){
//     if(input.placeholder) return;
//     for (var i=0; i<whichform.length; i++){
//         var element = whichform.element[i];
//         if(element.type == "submit") continue;
//         var check = element.placeholder || element.getAttribute("placeholder");//不同浏览器对未知属性的实现方式有所不同，同时使用了 HTML DOM 的placeholder 属性和 DOM 的getAttribute("placeholder")方法。
//         if(!check) continue;
//         element.onfocus = function(){
//             var text = this.placeholder || this.getAttribute("placeholder");
//             if (this.value == text) {
//                 this.className = "";
//                 this.value = "";
//             }
//         }
//         element.onblur = function(){
//             if (this.value == ""){
//                 this.className = "placeholder";
//                 this.value = this.placeholder || this.getAttribute("placeholder");
//             }
//         }
//         element.onblur();// onblur在焦点移出表单时触发。在 onblur 事件定义后立即调用，以便在必要时应用占位符。
//     }
// }

// function prepareForms () {
//     for (var i=0; i<document.forms.length; i++){
//         var thisform = document.forms[i];
//         restFields(thisform);
//     }
// }

//表单验证，为没有原生特性的浏览器编写
// function isFilled(field){
//     if(field.value.replace(" ", "").length ==0) return false;
//     var placeholder = field.placeholder || field.getAttribute("placeholder");
//     return (field.value != placeholder);
// }

// function isEmail(field){
//     return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
// }

// function validateForm(whichform){
//     for (var i=0; i<whichform.element.length; i++){
//         var element = whichform.elements[i];
//         if (element.required == "required"){
//             if (!isFilled(element)) {
//                 alert("Please fill in the '+element.name+' field.");
//                 return false;
//             }
//         }
//         if (element.type == "email"){
//             if (!isEmail(element)){
//                 alert("The '+element.name+' field must be a valid email address.");
//                 return false;
//             }
//         }
//     }
//     return false;
// }

// function prepareForms () {
//     for (var i=0; i<document.forms.length; i++){
//         var thisform = document.forms[i];
//          restFields(thisform);
//         thisform.onsubmit = function(){
//             return validateForm(this);
//         }
//     }
// }

//提交表单
// function getHTTPObject() {
//     if (typeof XMLHttpRequest == "undefined")
//         XMLHttpRequest = function () {
//             try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
//             catch (e) { }
//             try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
//             catch (e) { }
//             try { return new ActiveXObject("Msxml2.XMLHTTP"); }
//             catch (e) { }
//             return false;
//             //针对不同版本的IE浏览器的XMLHTTP对象。
//         }
//     return new XMLHttpRequest();
// }
//通过对象检测技术检测了XMLHttpRequest，最终返回false或者一个新的XMLHttpRequest(或XMLHTTP)对象

function displayAjaxLoading (element){
    while (element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.setAttribute("src", "./images/loading.gif");
    content.setAttribute("alt", "Loading...");
    element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget){
    // 检查是否存在有效的 XMLHttpRequest 对象
    // var request = getHTTPObject();
    var request = new XMLHttpRequest();//IE9及以后都内置了XMLHttpRequest对象。
    if (!request) {return false};
    displayAjaxLoading(thetarget);
    //循环遍历表单中的字段，收集它们的名字和编码后的值，把结果保存在一个数组中
    var dataParts = [];
    var element;
    for(var i=0; i<whichform.elements.length; i++){
        element = whichform.elements[i];// form.elements.length, 获取表单中的元素个数
        dataParts[i] = element.name + "=" + encodeURIComponent(element.value);// encodeURIComponent 函数把值编码成URL安全的字符串。这个函数会把有歧义的字符转换成对应的ASCII码，如：+=？
    }
    var data = dataParts.join("&");// array.join(separator) 函数表示将数组中的字符串用&作为间隔合并成一个字符串，不会改变原数组
    //向原始表单的 action 属性指定的处理函数发送 POST 请求
    request.open("POST", whichform.getAttribute("action"), true);
    //在请求中添加头部
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = function (){
        if (request.readyState != XMLHttpRequest.DONE) return;
        // 先检测值为 4 的 readyState 属性，然后再验证状态码是不是200
        if(request.readyState == 4){
            if(request.status ==200 || request.status == 0){
                //match() 方法类似 indexOf() 和 lastIndexOf()，但它返回包含各种匹配结果的数组，而不是字符串的位置
                var matches = request.responseText.match("/<article>([\s\S]+)<\/article>/");
                if (matches != null && matches.length > 0){
                    thetarget.innerHTML = matches[1];
                    // matches 中的第一个元素是 responseText中与模式匹配的部分，包括<article>和</article>
                    // 因为模式中包含了一个捕获组（一对圆括号），matches 中的第二个元素是 responseText 中与捕获组的模式匹配的部分。
                } else {
                    thetarget.innerHTML = "<p>Oops, there was an error. Sorry.</p>"
                }
            }else{
                thetarget.innerHTML = "<p>" + request.statusText + "</p>";
            }
        }
    }
    // 发送请求，并返回 true，表示函数已经成功发送请求。
    request.send(data);
    return true;
}

function prepareForms () {
    for (var i=0; i<document.forms.length; i++){
        var thisform = document.forms[i];
        // restFields(thisform);
        thisform.onsubmit = function(){
            // if(!ValidateForm(this)) return false;
            var article = document.getElementsByTagName("article")[0];
            if (submitFormWithAjax(this, article)) return false;
            return true;
        }
    }
}


addLoadEvent(highLightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInterNav);
addLoadEvent(prepareGallery);
addLoadEvent(preparePlaceholder);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(stripeTables);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);
// addLoadEvent(test2);