

// 定义一个字符串拆分规则

function string_split(js_code) {
    function split_string(str, parts) {
        if (str.length < parts) {
            parts = str.length
        }
        let result = [];
        let remainingStr = str;

        for (let i = parts; i > 1; i--) {
            let partSize = Math.floor(Math.random() * (remainingStr.length - i + 1)) + 1;
            result.push(remainingStr.slice(0, partSize));
            remainingStr = remainingStr.slice(partSize);
        }
        result.push(remainingStr); // 将剩余的字符串放入最后一部分
        return result;
    }

    function creat_binary_expression(stringArray) {
        let expression = types.stringLiteral(stringArray[0])
        for (let i = 1; i < stringArray.length; i++) {
            expression = types.binaryExpression("+", expression, types.stringLiteral(stringArray[i]))
        }
        return expression
    }

    let ast_code = parse(js_code)

    let nodes_to_replace = [];
    traverse(ast_code, {
        StringLiteral: function (path) {
            if(path.key !== "key"){
                nodes_to_replace.push(path)
            }
        }
    })
    nodes_to_replace.forEach((path) => {
        path.replaceWith(creat_binary_expression(split_string(path.node.value, 4)))
    })

    return generator(ast_code).code

}

module.exports = string_split;