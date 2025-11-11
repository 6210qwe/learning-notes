function string_hex(js_code) {

    function string_to_hex(str) {
        // 遍历字符串
        let hex_str = ''
        for (let i = 0; i < str.length; i++) {
            // 获取字符串的unicode编码
            let hex = str.charCodeAt(i).toString(16);
            hex_str += "\\x" + ("00" + hex).slice(-2);
        }
        return hex_str
    }

    let ast_code = parse(js_code)
    traverse(ast_code, {
        StringLiteral: function (path) {
            if (path.node.extra.raw.length >= 1) {
                let _ = path.node.extra.raw[0]
                path.node.extra.raw = _ + string_to_hex(path.node.value) + _
            }
        }
    })
    return generator(ast_code).code
}

module.exports  = string_hex