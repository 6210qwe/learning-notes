from bs4 import BeautifulSoup

soup = BeautifulSoup(html_text, 'html.parser')

# # 提取所有标签的 src 属性
src_contents = [tag.get('src') for tag in soup.find_all(src=True)]
print(src_contents)  # 输出: ['https://example.com/image.jpg', 'script.js']