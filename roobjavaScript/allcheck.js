// var checkAll = false;
//     function allcheck() {
//         checkAll = !checkAll;//一次全 true， 一次全false；
//         let inputs = document.getElementsByName('checkbox')
//         for (var i = 0; i < inputs.length; i++) {
//             inputs[i].checked = checkAll
//         }
//     }

// var checkAll = false;
// function allcheck() {
//     let inputs = document.getElementsByName('checkbox');
//     var checkInt = 0;
//     for (var i = 0; i < inputs.length; i++) {
//         if (inputs[i].checked) {
//             checkInt += 1;
//         }
//     }
//     if (checkInt == inputs.length) {
//         checkAll = false;
//         for (var i = 0; i < inputs.length; i++) {
//             inputs[i].checked = checkAll
//         }
//     } else {
//         checkAll = true;
//         for (var i = 0; i < inputs.length; i++) {
//             inputs[i].checked = checkAll
//         }
//     }
// }

function allcheck() {
    var checkFlag = false;    //默认执行的操作是取消全选
    var inputs = document.getElementsByName('checkbox');
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].checked) {    //如果存在未勾选的状态则要做的是全选
            checkFlag = true;
            break;    //可加可不加，加了可能能减少遍历的时间，不加也不会对结果有影响
        }
    }
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = checkFlag;
    }
}