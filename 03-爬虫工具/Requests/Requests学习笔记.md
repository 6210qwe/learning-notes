# Python Requests 学习笔记

## 📋 基本信息

- **工具名称**: Requests
- **版本**: 2.31.0
- **官方网站**: https://requests.readthedocs.io/
- **文档地址**: https://requests.readthedocs.io/en/latest/
- **学习日期**: 2024-01-01
- **难度等级**: ⭐⭐⭐ (1-5星)

## 🎯 工具简介

### 什么是 Requests？
Requests是一个优雅而简单的Python HTTP库，用于发送HTTP请求。

### 主要特性
- 简单易用的API
- 自动处理URL编码
- 支持HTTP/HTTPS
- 支持会话和Cookie

### 适用场景
- Web API调用
- 网页数据抓取
- 文件下载
- RESTful服务交互

## 🚀 安装与配置

### 安装方法
```bash
# 使用pip安装
pip install requests

# 使用conda安装
conda install requests
```

### 环境要求
- Python版本: 3.7+
- 依赖库: urllib3, certifi, charset-normalizer

## 📚 基础使用

### 基本语法
```python
import requests

# GET请求
response = requests.get('https://api.github.com')

# POST请求
response = requests.post('https://httpbin.org/post', data={'key': 'value'})
```

### 常用方法
| 方法 | 说明 | 示例 |
|------|------|------|
| get() | GET请求 | `requests.get(url)` |
| post() | POST请求 | `requests.post(url, data)` |
| put() | PUT请求 | `requests.put(url, data)` |
| delete() | DELETE请求 | `requests.delete(url)` |

## 💡 实用示例

### 示例1: 获取网页内容
```python
import requests

# 发送GET请求
response = requests.get('https://httpbin.org/get')

# 检查响应状态
print(f"状态码: {response.status_code}")

# 获取响应内容
print(f"响应内容: {response.text}")

# 获取JSON数据
if response.headers['content-type'] == 'application/json':
    data = response.json()
    print(f"JSON数据: {data}")
```

**说明**: 展示了如何发送GET请求并处理响应

### 示例2: 发送POST请求
```python
import requests

# 准备数据
data = {
    'username': 'testuser',
    'password': 'testpass'
}

# 发送POST请求
response = requests.post('https://httpbin.org/post', data=data)

# 处理响应
if response.status_code == 200:
    result = response.json()
    print(f"提交成功: {result}")
else:
    print(f"请求失败: {response.status_code}")
```

**说明**: 展示了如何发送POST请求并处理响应

## 🔧 高级功能

### 功能1: 请求头设置
```python
import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Authorization': 'Bearer your-token-here'
}

response = requests.get('https://api.example.com/data', headers=headers)
```

### 功能2: 会话管理
```python
import requests

# 创建会话
session = requests.Session()

# 设置通用参数
session.headers.update({'User-Agent': 'MyApp/1.0'})

# 使用会话发送请求
response1 = session.get('https://example.com/login')
response2 = session.get('https://example.com/dashboard')
```

## ❓ 常见问题

### Q: 如何处理SSL证书验证？
**A**: 使用 `verify=False` 参数（不推荐生产环境）
```python
response = requests.get('https://example.com', verify=False)
```

### Q: 如何设置请求超时？
**A**: 使用 `timeout` 参数
```python
response = requests.get('https://example.com', timeout=5)
```

## 📖 学习资源

### 官方文档
- [Requests官方文档](https://requests.readthedocs.io/)

### 推荐教程
- [Requests快速入门](https://requests.readthedocs.io/en/latest/user/quickstart/)

### 相关工具
- [urllib3](https://urllib3.readthedocs.io/)
- [httpx](https://www.python-httpx.org/)

## 📝 学习心得

### 优点
- API设计简洁直观
- 文档完善
- 社区活跃

### 缺点
- 同步库，不支持异步
- 某些高级功能需要额外配置

### 使用建议
- 合理设置超时时间
- 使用会话对象提高性能
- 注意异常处理

## 🔄 更新记录

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2024-01-01 | v1.0 | 初始版本 |

---

**学习状态**: ✅ 已完成

**下一步计划**: 
- [ ] 学习异步HTTP库httpx
- [ ] 学习请求重试机制
- [ ] 学习代理设置
