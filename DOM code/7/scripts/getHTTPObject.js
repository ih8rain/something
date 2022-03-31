function getHTTPObject(){
    if(typeof XMLHttpRequest == "undefined")
        XMLHttpRequest = function() {
        try {return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
        catch (e) {}
        try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
        catch (e) { }
        try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) { }
        return false;
        //针对不同版本的IE浏览器的XMLHTTP对象。
    }
    return new XMLHttpRequest();
}
//通过对象检测技术检测了XMLHttpRequest，最终返回false或者一个新的XMLHttpRequest(或XMLHTTP)对象