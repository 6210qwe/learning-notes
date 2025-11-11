#插件更新  

二进制/八进制/十六进制数值及十六进制字符串，Unicode字符串还原插件:

const simplifyLiteral = {
  NumericLiteral({ node }) {
    if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
      node.extra = undefined;
    }
  },
  StringLiteral({ node }) {
    if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
      node.extra = undefined;
    }
  },
}

traverse(ast, simplifyLiteral);

注意，如果是非ASCII的Unicode字符串，需要配合generator 一起还原:

let { code } = generator(ast, opts = { jsescOption: { "minimal": true } });