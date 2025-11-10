const v8 = require("v8");
const vm = require("vm");

// 允许使用 V8 内置函数（需启用 --allow-natives-syntax 标志）
v8.setFlagsFromString("--allow-natives-syntax");
// 创建不可检测对象
let undetectable = vm.runInThisContext("%GetUndetectable()");
// 恢复标志禁用（可选）

v8.setFlagsFromString("--no-allow-natives-syntax");

// 测试对象行为
function HTMLAllCollection() {
    return undetectable;
}

Object.defineProperties(HTMLAllCollection.prototype, {
    [Symbol.toStringTag]: { value: "HTMLAllCollection", configurable: true }
});

undetectable.__proto__ = HTMLAllCollection.prototype;
const document = {};
document.all = new HTMLAllCollection();
const length = 3;
for (let i = 0; i < length; i++) {
    document.all[i] = "1";
}

document.all.length = length;
console.log(typeof document.all);
console.log(document.all);
console.log(document.all.length);
console.log(document.all !== undefined);
console.log(document.all == undefined);
console.log('length' in document.all);
