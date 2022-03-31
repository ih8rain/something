function displayAbbreviations (){
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    //取得所有缩略词
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;//abbr不存在，在返还false，函数结束
    var defs = new Array();//定义数组用来存储abbr数据
    //遍历所有缩略词
    for(var i = 0; i < abbreviations.length; i++){
        if(abbreviations[i].childNodes.length < 1 ) continue;
        var definition = abbreviations[i].getAttribute("title");
        var key = abbreviations[i].firstChild.nodeValue;
        defs[key] = definition;//缩略语作下标
    }
    //创建定义列表
    var dlist = document.createElement("dl");//“孤儿”，文档碎片
    //遍历定义
    for(key in defs){//对于defs关联数组里的每个键，把它的值赋给变量key，接下来可以把key当变量使用
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
    if (dlist.childNodes.length<1) return false;
    //创建标题
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    // document.getElementsByTagName("body")[0];
    // DOM Core的用法，引用第一个（也是仅有的一个）body标签
    //把标题添加到页面主体
    document.body.appendChild(header);
    //把定义列表添加到页面主体
    document.body.appendChild(dlist);
}

addLoadEvent(displayAbbreviations);//分别在两个脚本使用window.onload会出错，只会实现后一个
//window.onload = FirstFunction;
//window.onload = secondFunction;
//只实现后一个
// window.onload =function (){
//     FirstFunction();
//     secondFunction();
// }