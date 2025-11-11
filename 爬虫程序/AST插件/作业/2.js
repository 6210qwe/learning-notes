将下面的代码进行合并:

var h = {};
k.aBjoq = "hello AST!";
k.wrOjg = function(P, Q) {
    return P | Q;
};
var k = h;


结果:

var h = {
    "aBjoq":"hello AST!",
    "wrOjg":function(P, Q) {
    return P | Q;
    },
}