var dy = new Dynamic("#app");
dy.sourceDN({
    name: "aa",
    fetch(){
        return "Hello world";
    }
});
dy.sourceDN("aa").connect("ab");