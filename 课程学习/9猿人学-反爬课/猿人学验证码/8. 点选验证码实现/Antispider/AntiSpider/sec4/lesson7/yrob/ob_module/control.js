function control(js_code) {

// 生成从 1 到 n 的随机数组的函数
    function generateRandomArray(n) {
        let array = Array.from({length: n}, (_, i) => i + 1);

        // 使用 Fisher-Yates 算法随机打乱数组
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

// 数组打散函数
    function shuffleArray(arr) {
        return arr.sort(function () {
            return Math.random() - 0.5
        })
    }


    let ast = parse(js_code)

// 遍历 AST，移除 "use strict" 指令
    traverse(ast, {
        Directive(path) {
            if (path.node.value.value === "use strict") {
                path.remove(); // 移除 "use strict" 指令
            }
        }
    });


    let nodes_to_replace = [];

    traverse(ast, {
        BlockStatement: {
            exit: function (path) {
                nodes_to_replace.push(path)
            }
        }
    })


    function random_number(used_control_array) {
        let array_length = used_control_array.length
        while (1) {
            let number = parseInt(Math.random() * array_length + array_length)
            if (used_control_array.indexOf(number) === -1) {
                return number
            }
        }
    }


    function CaseJsCodeProduct(test_number, js_code) {
        return `case ${test_number}:{
    ${js_code}
    }
    `
    }


    function IfStatementCaseProduct(
        path_body_array = path_body_array,
        control_index_array_if = control_index_array_if,
        control_var_name = control_var_name,
        control_index_array = control_index_array,
        index = index
    ) {
        let string_cases_array = []
        // 我们要生成三个case代码
        // 提取 if 和 else里面的代码
        let consequent_path = path_body_array[index].get("consequent")
        let alternate_path = path_body_array[index].get("alternate")

        let consequent_path_js_code
        if (consequent_path.get("body").length) {
            consequent_path_js_code = `${consequent_path.get("body").map(statement => statement.toString()).join('\n')}`
        } else {
            consequent_path_js_code = `${consequent_path.toString()}`
        }

        // consequent_path_js_code = consequent_path.get("body").length?
        //     `${consequent_path.get("body").map(statement => statement.toString()).join('\n')}`:
        //     `${consequent_path.toString()}`

        let alternate_path_js_code
        if (alternate_path.node && alternate_path.get("body").length) {
            alternate_path_js_code = alternate_path.node && `${alternate_path.get("body").map(statement => statement.toString()).join('\n')}`
        } else {
            alternate_path_js_code = alternate_path.node && `${alternate_path.toString()}`
        }

        path_body_array[index].get("consequent").remove()
        path_body_array[index].get("alternate").remove()

        let control_index_random_number = random_number(control_index_array_if)
        control_index_array_if.push(control_index_random_number)
        let control_change_code_if = `${control_var_name} += ${control_index_random_number}`
        let control_index_if_ast = types.blockStatement([parse(`${control_change_code_if}`).program.body[0], types.breakStatement()])
        path_body_array[index].node.consequent = control_index_if_ast

        let control_change_code_case_if
        if (control_index_array[index + 1]) {
            let control_change_code_case_if_number = control_index_array[index + 1] - (control_index_array[index] + control_index_random_number)
            control_change_code_case_if = `${control_var_name} += ${control_change_code_case_if_number}`
        } else {
            control_change_code_case_if = ""
        }

        // 生成case 1 判断体 case ?:
        // code, break
        let case_js_code_if_product = `
        ${consequent_path_js_code};
        ${control_change_code_case_if};break;`
        let case_js_code_if = CaseJsCodeProduct(control_index_array[index] + control_index_random_number, case_js_code_if_product)
        string_cases_array.push(case_js_code_if)

        // 判断else:
        if (alternate_path.node) {
            control_index_random_number = random_number(control_index_array_if)
            control_index_array_if.push(control_index_random_number)
            let control_change_code_else = `${control_var_name} += ${control_index_random_number}`
            let control_index_else_ast = types.blockStatement([parse(`${control_change_code_else}`).program.body[0], types.breakStatement()])
            path_body_array[index].node.alternate = control_index_else_ast

            let control_change_code_case_else
            if (control_index_array[index + 1]) {
                let control_change_code_case_else_number = control_index_array[index + 1] - (control_index_array[index] + control_index_random_number)
                control_change_code_case_else = `${control_var_name} += ${control_change_code_case_else_number}`
            } else {
                control_change_code_case_else = ""
            }
            let case_js_code_else_product = `${alternate_path_js_code};
                                         ${control_change_code_case_else};break;`
            let case_js_code_else = CaseJsCodeProduct(control_index_array[index] + control_index_random_number, case_js_code_else_product)
            string_cases_array.push(case_js_code_else)
        }

        let control_change_code
        if (!alternate_path.node && control_index_array[index + 1]) {
            control_change_code = control_index_array[index + 1] - control_index_array[index]
            control_change_code = `${control_var_name} += ${control_change_code};break`
        } else {
            control_change_code = ""
        }

        let case_js_code_product = `${path_body_array[index].toString()};
                                ${control_change_code};`
        let case_js_code = CaseJsCodeProduct(control_index_array[index], case_js_code_product)
        string_cases_array.push(case_js_code)
        return string_cases_array
    }


    function CaseProduct(
        path_body_array = path_body_array,
        control_var_name = control_var_name,
        control_index_array = control_index_array,
        index = index
    ) {
        let string_cases_array = []
        let control_change_code = ""
        if (index !== path_body_array.length - 1) {
            control_change_code = `${control_var_name} += ${control_index_array[index + 1] - control_index_array[index]};`
        }
        let case_js_code = `
            case ${control_index_array[index]}:{
                ${path_body_array[index].toString()}
                ${control_change_code}
                break;
            }`
        string_cases_array.push(case_js_code)
        return string_cases_array
    }

    let control_number = 1
    nodes_to_replace.forEach((path) => {
        let path_body_array = path.get('body')
        if (path_body_array.length > 3) {
            let control_for_loop_name = "$for_loop_" + control_number
            let control_var_name = "$control_" + control_number++
            // 随机创造一个长度为 path_body_array.length 的随机数组 数组里面，存在每一个不同的元素[2, 3, 1, 4, 5]
            let for_loop_number = path_body_array.length
            let control_index_array = generateRandomArray(path_body_array.length)
            let control_index_array_if = structuredClone(control_index_array)
            let string_cases_array = []
            for (let index = 0; index < path_body_array.length; index++) {
                // 需要进行判断，接下来要处理的代码，是不是一个if块儿
                if (path_body_array[index].isIfStatement()) {
                    for_loop_number++
                    let cases_array = IfStatementCaseProduct(path_body_array, control_index_array_if, control_var_name, control_index_array, index)
                    string_cases_array = string_cases_array.concat(cases_array)
                } else {
                    let cases_array = CaseProduct(path_body_array, control_var_name, control_index_array, index)
                    string_cases_array = string_cases_array.concat(cases_array)
                }
            }
            let control_js_code = `switch (${control_var_name}){${shuffleArray(string_cases_array).join("\n")}}`
            let for_loop_code = `for (let ${control_for_loop_name} = 0; ${control_for_loop_name} < ${for_loop_number}; ${control_for_loop_name}++) {${control_js_code}}`
            let init_string = `let ${control_var_name} = ` + control_index_array[0]
            path.node.body = [parse(init_string).program.body[0], parse(for_loop_code, {allowReturnOutsideFunction: true}).program.body[0]]
        }
    })
    return generator(ast).code
}

module.exports = control