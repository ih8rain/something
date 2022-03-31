window.onload = function () {
    var para = document.createElement("p");
    var testdiv = document.getElementById("testdiv");
    testdiv.appendChild(para);
    var txt1 = document.createTextNode("This is ");
    para.appendChild(txt1);
    var emphasis = document.createElement("em");
    para.appendChild(emphasis);
    var txt2 = document.createTextNode("my");
    emphasis.appendChild(txt2);
    var txt3 = document.createTextNode(" contents.");
    para.appendChild(txt3);
}

