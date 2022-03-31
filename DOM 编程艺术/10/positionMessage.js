function positionMessage() {
    if (!document.getElementById) return false;
    if (!document.getElementById("message")) false;
    var elem = document.getElementById("message");
    elem.style.position = "absolute";
    elem.style.top = "100px";
    elem.style.left = "50px";
    moveElement("message", 250, 25, 20);//抽象函数，用参数变量代替硬编码常数。
}

addLoadEvent(positionMessage);