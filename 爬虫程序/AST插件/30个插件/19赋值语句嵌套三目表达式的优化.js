#插件更新  赋值语句嵌套三目表达式的优化

/*******************************************************
处理前:
 _0x4ae6ff = _0x41bc28 ? 4957228979 : 650037875;

处理后:

_0x41bc28 ? _0x4ae6ff = 4957228979 : _0x4ae6ff = 650037875;

*******************************************************/

const TransConditionOfAssignment =
{
	ConditionalExpression(path)
	{
		let {parentPath,node} = path;
		let {test, consequent, alternate} = node;
    if (parentPath.isAssignmentExpression({"right":node}))
    {
    	let {operator, left} = parentPath.node;

    	consequent = types.AssignmentExpression(operator, left, consequent);
      alternate =  types.AssignmentExpression(operator, left, alternate);
      parentPath.replaceWith(types.conditionalExpression(test, consequent, alternate));
    }
 },
}

traverse(ast, TransConditionOfAssignment);