function stripeTables(){
    if(!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    var odd, rows;
    for(var i=0; i<tables.length; i++){
        odd = false;
        rows= tables[i].getElementsByTagName("tr");
        for(var j=0; j<rows.length; j++){
            if(odd == true){
                // rows[j].style.backgroundColor="#ffc";
                addClass(rows[j], "odd");//通过class来处理
                odd = false;
            }else{
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

addLoadEvent(stripeTables);

//尽量使用css来改变样式