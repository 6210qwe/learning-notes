// DOM 怎么补


// 1 // js中万物皆是对象 这就是就简单的 dom
document = {};

// 2. 设置原形
HTMLDocument = function HTMLDocument() {
    throw new Error('Something went wrong!'); //未找到该节点抛出异常
};
Document = function Document() {
    throw new Error('Something went wrong!'); //未找到该节点抛出异常
};
Node = function Node() {
    throw new Error('Something went wrong!'); //未找到该节点抛出异常
}

Object.setPrototypeOf(document, HTMLDocument.prototype);
Object.setPrototypeOf(HTMLDocument.prototype, Document.prototype);
Object.setPrototypeOf(Document.prototype, Node.prototype);
// 3. 原型上设置方法
// 需要注意只有在document.createElement下调用才能执行,其他情况是会报错的 怎么办?
Document.prototype.createElement = function createElement(tag_name) {
    if (this === document) {
        console.log(`成功创建了${tag_name}标签`);
        return `成功创建了${tag_name}标签`
    }
    throw new Error('Uncaught TypeError: Illegal invocationat <anonymous>:1:20'); //未找到该节点抛出异常

};
document.createElement("div"); // 成功调用
// HTMLDocument.prototype.createElement("div"); // 触发报错异常
// Document.prototype.createElement("div"); // 触发报错异常


// 4.上面是方法可以这么做 如果是属性呢?
// 用我们的cookie 和 ATTRIBUTE_NODE 来举例
Document.prototype.cookie = "123456";
Node.prototype.ATTRIBUTE_NODE = 2;

// 重写对象属性 实际上还是有问题 可以优化改善
set_proto_str = function set_proto_str(args) {
    for (let key in args) {
        // 判断是否为他的自有属性
        if (!args.hasOwnProperty(key)) {
            args[key] = args.__proto__[key]
            Object.defineProperty(args.__proto__, key, {
                get: function () {
                    var e = new Error();
                    e.name = "TypeError";
                    e.message = "Illegal constructor";
                    e.stack = "vM988:1 Uncaught TypeError: Illegal invocation \r\n at <anonymous>:1:19";
                    throw e;
                },
            });
        }
    }
}
set_proto_str(HTMLDocument.prototype)
set_proto_str(document)

// console.log(HTMLDocument.prototype.cookie) // 这里应该报错
// console.log(Document.prototype.cookie); // 这里应该报错
console.log(document.cookie)  // 成功调用
console.log(Node.prototype.ATTRIBUTE_NODE)  // 成功调用
// console.log(HTMLDocument.prototype.ATTRIBUTE_NODE)  // 这里应该报错
// console.log(Document.prototype.ATTRIBUTE_NODE)  // 这里应该报错
console.log(document.ATTRIBUTE_NODE)  // 成功调用