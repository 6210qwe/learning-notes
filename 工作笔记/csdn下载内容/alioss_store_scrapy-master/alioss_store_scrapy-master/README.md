# Introduction

Add Aliyun-OSS file storage support in Scrapy, like S3FilesStore.

# Prerequisite

Install Aliyun OSS python sdk into you python envs, go to [official](https://docs.aliyun.com/?spm=5176.100057.3.4.NNu7cf#/pub/oss/sdk/sdk-download&python) to download

# How to use

- Put the code in pipeline.py into your own pipleline file
- Add variables as blow into you settings.py
  - IMAGES_STORE = 'alioss://dlimgs'    # image storage type, dlimgs is the name of your bucket which to store files
  - ALI_OSS_ACCESS_KEY_ID = 'your-access-key'     # access-key-id
  - ALI_OSS_ACCESS_KEY_SECRET = 'your-access-key-secret'    # access-key
  - ALI_OSS_ENDPOINT = 'your-oss-endpoint'   # oss endpoint, eg: oss-cn-beijing.aliyuncs.com
- Put CustomizedImagesPipeline class full path into ITEM_PIPELINES = {}, with a high priority
- Advise: you should set IMAGES_EXPIRES varibale in settings.py, which could avoid the nonsense downloading same images and accessing Aliyun OSS repeatly









### 简介

在 Scrapy 中添加阿里云对象存储服务（Aliyun OSS）文件存储支持，类似于 S3 文件存储（S3FilesStore）。

### 前提条件

将阿里云 OSS Python SDK 安装到你的 Python 环境中。请访问[官方网站](https://docs.aliyun.com/?spm=5176.100057.3.4.NNu7cf#/pub/oss/sdk/sdk-download&python)进行下载。

### 使用方法

- 将 `pipeline.py` 中的代码复制到你自己的管道文件中。

- 在

   

  ```
  settings.py
  ```

   

  文件中添加以下变量：

  - `IMAGES_STORE = 'alioss://dlimgs'` —— 图片存储类型，`dlimgs` 是你用于存储文件的存储桶名称。
  - `ALI_OSS_ACCESS_KEY_ID = 'your-access-key'` —— 访问密钥 ID。
  - `ALI_OSS_ACCESS_KEY_SECRET = 'your-access-key-secret'` —— 访问密钥。
  - `ALI_OSS_ENDPOINT = 'your-oss-endpoint'` —— OSS 端点，例如：`oss-cn-beijing.aliyuncs.com`。

- 将 `CustomizedImagesPipeline` 类的完整路径添加到 `ITEM_PIPELINES = {}` 中，并设置较高的优先级。

- 建议：你应该在 `settings.py` 文件中设置 `IMAGES_EXPIRES` 变量，这样可以避免重复下载相同的图片以及反复访问阿里云 OSS。
