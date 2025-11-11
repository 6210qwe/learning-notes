#插件更新

三目表达式 ConditionalExpression 转 if 语句 IfStatement

/************************************************************************

3 === this.Cn ? this.Yz = 256 : 23 === this.Cn ? this.$V ? this.Yz = 480 : this.Yz = 512 : this.$V ? this.Yz = 960 : this.Yz = 1024;

===>

if (3 === this.Cn) {
  this.Yz = 256;
} else {
  if (23 === this.Cn) {
    if (this.$V) {
      this.Yz = 480;
    } else {
      this.Yz = 512;
    }
  } else {
    if (this.$V) {
      this.Yz = 960;
    } else {
      this.Yz = 1024;
    }
  }
}

************************************************************************/

方法一:

const ConditionalToIf =
{
    ConditionalExpression(path) {
        let {parentPath,node} = path;
        let { test, consequent, alternate } = node;
        if (parentPath.isExpressionStatement({"expression":node})) {
            if (!types.isExpressionStatement(consequent)) {
                consequent = types.BlockStatement([types.ExpressionStatement(consequent)]);
            }
            if (!types.isExpressionStatement(alternate)) {
                alternate = types.BlockStatement([types.ExpressionStatement(alternate)]);
            }
            parentPath.replaceWith(types.IfStatement(test, consequent, alternate));
        }
    }
}

traverse(ast,ConditionalToIf);

方法二:

const template      = require("@babel/template").default;

let ifNODETEP = template(`if(A){B;}else{C;}`);
const ConditionToIf = {
	ConditionalExpression: {
		exit(path){
			let {test, consequent, alternate} = path.node;
			let ifStateNode = ifNODETEP({"A":test,"B":consequent,"C":alternate});
			path.replaceWithMultiple(ifStateNode);
			path.skip();
  }
 },
}

traverse(ast, ConditionToIf);

未处理 逗号表达式，需要用另外的插件来处理。

原插件:

#插件更新#条件表达式转if语...

简单点，写代码的方式简单的。如果报错，请及时跟我反馈。谢谢。