
// 定义一个字符串拆分规则

function number_split(js_code) {
    function generateRandomEquation(target, limit) {

        let randomNumber = getRandomInt(1, limit)
        let operations = ['+', '-', '*'];// 可用的运算符
        let operation = operations[getRandomInt(0, operations.length - 1)];
        let newResult;
        let currentResult = getRandomInt(1, limit)
        if (operation === '+') {
            newResult = currentResult + randomNumber;
        } else if (operation === '-') {
            newResult = currentResult - randomNumber;
        } else if (operation === '*') {
            newResult = currentResult * randomNumber;
        }
        // 补齐为目标结果
        let completion = target - newResult

        let express
        if (completion >= 0) {
            express = `${currentResult}${operation}${randomNumber}+${target - newResult}`
        } else {
            express = `${currentResult}${operation}${randomNumber}${target - newResult}`
        }
        return parse(express).program.body[0]
    }

    // 生成给定范围内的随机整数
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let ast_code = parse(js_code)

    let nodes_to_replace = [];
    traverse(ast_code, {
        NumericLiteral: function (path) {
            nodes_to_replace.push(path)
        }
    })
    nodes_to_replace.forEach((path) => {
        path.replaceWith(generateRandomEquation(path.node.value, 10))
    })

    return generator(ast_code).code

}

module.exports = number_split;