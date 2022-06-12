var dy = new Dynamic();
function aaa(){
    dy.template.render({
        tuID: "manyslots",
        element: dy.e("#test"),
        slots:{
            "1":"1号的变量",
            "3":"<span style='color:red;'>我不应该是红色的！</span>",
            "4":"<span style='color:red;'>我应该是红色的！</span>",
            "2":undefined
        },
        append: true
    });
}
function bbb(){
    const a = document.createElement("manyslots");
    a.innerHTML = `
        <slot name='3'><span style='color:red;'>我不应该是红色的！</span></slot>
        <slot name='1'>1号的变量</slot>
        <slot name='5'>我不应该出现在任何地方。</slot>
        <slot>我不应该出现在任何地方。</slot>
        <p>我不应该出现在任何地方。</p>
        <slot name='4'><span style='color:red;'>我应该是红色的！</span></slot>
    `;
    dy.e("#test").append(a);
}
const a24 = 0;