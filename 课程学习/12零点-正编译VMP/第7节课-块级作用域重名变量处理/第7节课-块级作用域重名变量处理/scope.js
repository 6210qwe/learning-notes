function Scope(parentScope){
    this.data = {};
    if(parentScope){
        this.data.__proto__ = parentScope.data;
    }else{
        this.data.__proto__ = globalThis;
    }
}
Scope.prototype.load = function (name){  //获取变量的值
    return this.data[name];
}
Scope.prototype.store = function (name, value){  //赋值
    let data = this.data;
    while(!data.hasOwnProperty(name) && data !== globalThis){
        data = data.__proto__;
    }
    data[name] = value;
}
let scope = new Scope();