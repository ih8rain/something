function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    } else{
        parent.insertBefore(newElement,targetElement.nestSibling);
    }
}
//在现有元素后插入一个新元素。nestSibling，目标元素的下一个元素。