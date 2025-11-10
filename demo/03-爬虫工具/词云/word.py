import warnings
# 忽略 jieba 中关于 pkg_resources 的警告
warnings.filterwarnings("ignore", message="pkg_resources is deprecated as an API.*")
import jieba
from wordcloud import WordCloud
import matplotlib
matplotlib.use('TkAgg')  # 更换为 TkAgg 后端
import matplotlib.pyplot as plt  # 这行必须在上面一行之后

# 1. 准备文本（可以是本地文件读取，这里用示例文本）
text = """
词云是一种数据可视化技术，用于展示文本中出现频率较高的词语。
通过词云，我们可以直观地看到哪些词语在文本中更重要。
处理中文时需要先分词，否则词云会把每个字当作独立词语。
Python的wordcloud库和jieba库可以方便地生成中文词云。
"""

# 2. 中文分词（将句子拆成词语）
cut_text = " ".join(jieba.cut(text))  # 用空格连接分词结果，符合词云输入格式

# 3. 配置词云参数
wc = WordCloud(
    font_path="simhei.ttf",  # 指定中文字体（避免中文乱码，需本地有该字体文件）
    background_color="white",  # 背景色
    width=800,
    height=600,
    max_words=30,  # 最多显示的词语数量
    max_font_size=100  # 最大字体大小
)

# 4. 生成词云
wordcloud = wc.generate(cut_text)

# 5. 显示词云
plt.figure(figsize=(10, 8))
plt.imshow(wordcloud)
plt.axis("off")  # 隐藏坐标轴
plt.show()

# 6. 保存词云图片（可选）
wordcloud.to_file("wordcloud_result.png")
