function call2express(path)
{
  const {init,id} = path.node;
  const name = id.name;

  const params = init.params;
  if (params.length !== 2) return;
  let first_arg = params[0].name;
  let second_arg = params[1].name;

  const body = init.body;
  if (!body.body || body.body.length !== 1) return;

  let return_body = body.body[0];
  let argument = return_body.argument;
  if (!t.isReturnStatement(return_body) ||
      !t.isBinaryExpression(argument))
  {
    return;
  }

  let {left,right,operator} = argument;

  if (!t.isIdentifier(left, {name:first_arg}) ||
      !t.isIdentifier(right,{name:second_arg}))
  {
    return;
  }

  let scope = path.scope;
  traverse(scope.block,{
    CallExpression:function(_path) {
      let _node = _path.node;
      let args = _path.node.arguments;

      if (args.length === 2 && t.isIdentifier(_node.callee,{name:name}))
      {
        _path.replaceWith(t.BinaryExpression(operator, args[0], args[1]))
      }
    },
  })
}