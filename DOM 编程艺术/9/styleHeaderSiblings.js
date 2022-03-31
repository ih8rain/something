function styleHeaderSiblings(tag, theclass){
    if (!document.getElementsByTagName) false;
    var headers = document.getElementsByTagName(tag);
    var elem;
    for(i =0 ; i<headers.length; i++){
        elem = getNextElement(headers[i].nextSibling);
        // elem.style.fontWeight = "bold";
        // elem.style.fontSize = "1.2em";
        // elem.className = "intro"; //替换class属性而不是追加
        addClass(elem, theclass);//与直接设置样式的区别在于现在是通过CSS而不是DOM去设置样式。
    }
}

function getNextElement (node){
    if(node.nodeType == 1){
        return node;
    }
    if(node.nextSibling){
        return getNextElement(node.nextSibling);
    }
    return null;
}

//如果原来有一个classname，在后面追加。只要有选择，就应选择更新className属性，而不是直接更新style对象的有关属性。
function addClass (element, value){
    if(element.className == null){
        element.className == value;
    } else{
        newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

addLoadEvent(function(){
    styleHeaderSiblings("h1", "intro");//把函数抽象为通用函数。
});
