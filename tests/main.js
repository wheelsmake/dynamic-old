/*var dy = new Dynamic("#app");
dy.sourceDN({
    name: "aa",
    fetch(){
        return "Hello world";
    },
    frequency: 0
});
dy.sourceDN("aa").connectTo("ab");
dy.transDN({
    name: "ac",
    update(data){
        return data.aa + data.ad;
    }
}).connectTo("ab"); //链式调用*/
var dy = new Dynamic("#app");