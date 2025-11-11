from sentence_transformers import SentenceTransformer
from pymilvus import connections, Collection

# 准备查询向量
model = SentenceTransformer('all-MiniLM-L6-v2')
query_text = "查询示例文本"
query_vector = model.encode(query_text).tolist()

# 连接到 Milvus 服务
connections.connect(
    alias="default",
    host='localhost',
    port='19530'
)

# 加载集合
collection_name = "text_collection"
collection = Collection(name=collection_name)

# 定义索引参数
index = {
    "index_type": "IVF_FLAT",
    "metric_type": "L2",
    "params": {"nlist": 128}
}

# 创建索引
collection.create_index(field_name="text_vector", index_params=index)

# 加载索引到内存
collection.load()

# 定义搜索参数
search_params = {
    "metric_type": "L2",
    "params": {"nprobe": 10}
}

# 执行查询
results = collection.search(
    data=[query_vector],
    anns_field="text_vector",
    param=search_params,
    limit=10,
    output_fields=["id"]
)

# 处理查询结果
for hits in results:
    for hit in hits:
        print(f"ID: {hit.id}, 距离: {hit.distance}")