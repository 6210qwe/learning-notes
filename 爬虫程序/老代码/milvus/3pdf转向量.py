import pdfplumber
from sentence_transformers import SentenceTransformer
from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection

# # 连接到 Milvus 服务
# connections.connect(
#     alias="default",
#     host='39.105.120.42',
#     port='19530'
# )

# 定义集合的字段
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
    FieldSchema(name="text", dtype=DataType.VARCHAR, max_length=65535),
    FieldSchema(name="embedding", dtype=DataType.FLOAT_VECTOR, dim=384)
]

# 创建集合的模式
schema = CollectionSchema(fields, "PDF text embeddings collection")

# 创建集合
collection_name = "pdf_text_embeddings"
collection = Collection(collection_name, schema)

# 加载预训练的文本向量化模型
model = SentenceTransformer('all-MiniLM-L6-v2')

def pdf_to_text(pdf_path):
    """
    将 PDF 文件转换为文本
    :param pdf_path: PDF 文件的路径
    :return: 提取的文本
    """
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text()
    return text

def text_to_vector(text):
    """
    将文本转换为向量
    :param text: 输入的文本
    :return: 文本的向量表示
    """
    return model.encode(text)

def insert_into_milvus(text, vector):
    """
    将文本和向量插入到 Milvus 中
    :param text: 输入的文本
    :param vector: 文本的向量表示
    """
    data = [
        [text],
        [vector]
    ]
    collection.insert(data)

if __name__ == "__main__":
    pdf_path = "CN106137483B.pdf"
    # 从 PDF 中提取文本
    text = pdf_to_text(pdf_path)
    print(text)
    # 将文本转换为向量
    vector = text_to_vector(text)
    print(vector)
    # 将文本和向量插入到 Milvus 中
    insert_into_milvus(text, vector)
    # 刷新集合以确保数据被持久化
    collection.flush()
    print("Data inserted successfully.")