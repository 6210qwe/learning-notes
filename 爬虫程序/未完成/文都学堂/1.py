a = {
    "0": 158,
    "1": 203,
    "2": 46,
    "3": 31,
    "4": 54,
    "5": 195,
    "6": 230,
    "7": 143,
    "8": 110,
    "9": 65,
    "10": 25,
    "11": 161,
    "12": 175,
    "13": 14,
    "14": 202,
    "15": 36
}

# 使用列表推导式将字典中的值转换为字节
byte_array = bytes([a[str(i)] for i in range(len(a))])
print(byte_array)

# b'\x9e\xcb.\x1f6\xc3\xe6\x8fnA\x19\xa1\xaf\x0e\xca$'
# b'\x9e\xcb.\x1f6\xc3\xe6\x8fnA\x19\xa1\xaf\x0e\xca$'