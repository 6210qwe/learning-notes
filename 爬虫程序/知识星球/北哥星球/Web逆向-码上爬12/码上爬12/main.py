import hashlib

input_str = "fu/api/problem-detail/12/data/?page=21751347133390"
hash_result = hashlib.sha1(input_str.encode()).hexdigest()
print(hash_result)  # 输出: 9d92578971d018c9bc8a6e521aed517aaeaa3f6e
print(len('9d92578971d018c9bc8a6e521aed517aaeaa3f6e'))