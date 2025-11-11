#插件更新

条件表达式转if语句，支持嵌套的条件表达式，及子节点包含逗号表达式的情况

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

const ConditionToIf = {
	ConditionalExpression: {
		exit(path){
			let {test, consequent, alternate} = path.node;
			if (types.isSequenceExpression(consequent))
			{
				let expressions = consequent.expressions;
				let retBody = [];
				for(let expression of expressions)
				{
					retBody.push(types.ExpressionStatement(expression));
				}
				consequent = types.BlockStatement(retBody);
			}
			else
			{
				consequent = types.ExpressionStatement(consequent);
				consequent = types.BlockStatement([consequent]);
			}
			if (types.isSequenceExpression(alternate))
			{
				let expressions = alternate.expressions;
				let retBody = [];
				for(let expression of expressions)
				{
					retBody.push(types.ExpressionStatement(expression));
				}
				alternate = types.BlockStatement(retBody);
			}
			else
			{
				alternate = types.ExpressionStatement(alternate);
				alternate = types.BlockStatement([alternate]);
			}
			let ifStateNode = types.IfStatement(test,consequent,alternate);
			path.replaceWithMultiple(ifStateNode);
			path.skip();
  }
 },
}

traverse(ast, ConditionToIf);

注意，如果报错，需要先运行  TransCondition 插件。
