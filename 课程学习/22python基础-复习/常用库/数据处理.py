# python -m spacy download zh_core_web_sm
# 中型模型：python -m spacy download zh_core_web_md
# python -m spacy download zh_core_web_lg
# import spacy
# nlp = spacy.load("zh_core_web_sm")
# doc = nlp("苹果公司在2023年发布了新款手机")
# for ent in doc.ents:
#     print(ent.text, ent.label_)  # 输出：苹果公司 ORG；2023年 DATE
#
#
import spacy
import time

# 1. 测试模型加载时间
start_load = time.time()
nlp = spacy.load("zh_core_web_sm")  # 重点看这一步的耗时
end_load = time.time()
print(f"模型加载耗时：{end_load - start_load:.2f} 秒")

# 2. 测试句子处理时间（连续处理10个句子）
texts = ["苹果公司在2023年发布了新款手机"] * 10
start_process = time.time()
for text in texts:
    doc = nlp(text)
    for ent in doc.ents:
        print(ent.text, ent.label_)
        # pass  # 仅执行处理，不打印
end_process = time.time()
print(f"10个句子处理耗时：{end_process - start_process:.2f} 秒")