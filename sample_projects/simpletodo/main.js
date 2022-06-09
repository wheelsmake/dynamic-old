var dy = new Dynamic();
function add(){
    dy.template.render({
        tuID: "todo",
        insertAfter: true,
        element: dy.e("#field"),
        slots:{
            "todo-content": dy.e("#content").value ?  dy.e("#content").value : undefined
        }
    });
}
function switchState(){
    
}