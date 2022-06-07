var dy = new Dynamic();
function re(){
    dy.template.register({
        tuID: "ljm-12914",
        element: dy.e("#template1").children[0]
    });
}
function a(){
    dy.template.update({
        tuID: "ljm-12914",
        element: dy.e("#template1").children[0]
    });
}
function b(){
    dy.template.update({
        tuID: "ljm-12914",
        element: dy.e("#template2").children[0]
    });
}
function r(){
    dy.template.render({
        tuID: "ljm-12914",
        element: dy.e("#test"),
        append: true
    });
}
function d(){
    console.log(dy.template.delete("ljm-12914"));
}