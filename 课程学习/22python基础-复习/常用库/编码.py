import urllib.parse

# 要转换的字符串
original_str = "引流袋"
# 使用urllib.parse.quote进行URL编码，指定编码格式为GBK
encoded_str = urllib.parse.quote(original_str)
print(encoded_str)