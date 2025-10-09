# 工具学习笔记

这是一个用于记录各种工具基础使用方法的学习笔记项目。通过GitHub进行版本控制和备份，确保学习资料不会丢失。

## 📁 项目结构

```
tools-learning-notes/
├── README.md                 # 项目说明文档
├── .gitignore               # Git忽略文件
├── 01-编程语言/              # 编程语言相关
│   ├── Python/
│   │   ├── 基础语法/
│   │   ├── 标准库/
│   │   ├── 第三方库/
│   │   │   ├── Web开发/
│   │   │   ├── 数据处理/
│   │   │   ├── 机器学习/
│   │   │   └── 爬虫工具/
│   │   ├── 框架/
│   │   │   ├── Django/
│   │   │   ├── Flask/
│   │   │   └── FastAPI/
│   │   └── 工具/
│   │       ├── pip/
│   │       ├── virtualenv/
│   │       └── poetry/
│   ├── JavaScript/
│   │   ├── ES6+/
│   │   ├── Node.js/
│   │   ├── 框架/
│   │   │   ├── React/
│   │   │   ├── Vue/
│   │   │   └── Angular/
│   │   └── 工具/
│   │       ├── npm/
│   │       ├── yarn/
│   │       └── webpack/
│   ├── Java/
│   │   ├── 基础语法/
│   │   ├── Spring框架/
│   │   ├── Maven/
│   │   └── Gradle/
│   ├── Go/
│   │   ├── 基础语法/
│   │   ├── 标准库/
│   │   └── 第三方库/
│   ├── C-C++/
│   ├── Rust/
│   ├── TypeScript/
│   └── 其他语言/
├── 02-开发工具/              # 开发环境工具
│   ├── 版本控制/
│   │   ├── Git/
│   │   ├── SVN/
│   │   └── Mercurial/
│   ├── 编辑器/
│   │   ├── VS-Code/
│   │   ├── Vim/
│   │   ├── Emacs/
│   │   └── Sublime-Text/
│   ├── IDE/
│   │   ├── IntelliJ-IDEA/
│   │   ├── PyCharm/
│   │   ├── Eclipse/
│   │   └── Visual-Studio/
│   ├── 终端工具/
│   │   ├── PowerShell/
│   │   ├── Bash/
│   │   ├── Zsh/
│   │   └── CMD/
│   ├── 包管理/
│   │   ├── npm/
│   │   ├── pip/
│   │   ├── brew/
│   │   └── apt/
│   └── 构建工具/
│       ├── Make/
│       ├── CMake/
│       └── Gradle/
├── 03-数据库/                # 数据库相关
│   ├── 关系型数据库/
│   │   ├── MySQL/
│   │   ├── PostgreSQL/
│   │   ├── SQLite/
│   │   └── Oracle/
│   ├── NoSQL数据库/
│   │   ├── MongoDB/
│   │   ├── Redis/
│   │   ├── Cassandra/
│   │   └── Elasticsearch/
│   ├── 数据库工具/
│   │   ├── phpMyAdmin/
│   │   ├── DBeaver/
│   │   └── Navicat/
│   └── ORM框架/
│       ├── SQLAlchemy/
│       ├── Hibernate/
│       └── Sequelize/
├── 04-Web开发/               # Web开发相关
│   ├── 前端框架/
│   │   ├── React/
│   │   ├── Vue/
│   │   ├── Angular/
│   │   └── Svelte/
│   ├── CSS框架/
│   │   ├── Bootstrap/
│   │   ├── Tailwind-CSS/
│   │   └── Material-UI/
│   ├── 构建工具/
│   │   ├── Webpack/
│   │   ├── Vite/
│   │   ├── Rollup/
│   │   └── Parcel/
│   ├── 后端框架/
│   │   ├── Express/
│   │   ├── Koa/
│   │   ├── NestJS/
│   │   └── Next.js/
│   └── 测试工具/
│       ├── Jest/
│       ├── Cypress/
│       └── Selenium/
├── 05-爬虫与数据采集/         # 爬虫相关
│   ├── Python爬虫/
│   │   ├── Requests/
│   │   ├── BeautifulSoup/
│   │   ├── Scrapy/
│   │   ├── Selenium/
│   │   └── Playwright/
│   ├── 数据处理/
│   │   ├── Pandas/
│   │   ├── NumPy/
│   │   ├── OpenCV/
│   │   └── Pillow/
│   ├── 反爬技术/
│   │   ├── 代理池/
│   │   ├── 验证码识别/
│   │   └── 浏览器指纹/
│   └── 数据存储/
│       ├── CSV/
│       ├── JSON/
│       └── XML/
├── 06-容器与虚拟化/           # 容器技术
│   ├── Docker/
│   ├── Kubernetes/
│   ├── Podman/
│   └── Vagrant/
├── 07-云服务与部署/           # 云服务平台
│   ├── AWS/
│   │   ├── EC2/
│   │   ├── S3/
│   │   ├── Lambda/
│   │   └── RDS/
│   ├── 阿里云/
│   │   ├── ECS/
│   │   ├── OSS/
│   │   └── RDS/
│   ├── 腾讯云/
│   ├── Azure/
│   ├── 部署工具/
│   │   ├── Nginx/
│   │   ├── Apache/
│   │   ├── PM2/
│   │   └── Supervisor/
│   └── CI/CD/
│       ├── GitHub-Actions/
│       ├── Jenkins/
│       ├── GitLab-CI/
│       └── Travis-CI/
├── 08-系统运维/               # 系统管理
│   ├── Linux/
│   │   ├── Ubuntu/
│   │   ├── CentOS/
│   │   └── Arch/
│   ├── Windows/
│   ├── 监控工具/
│   │   ├── Prometheus/
│   │   ├── Grafana/
│   │   └── Zabbix/
│   ├── 日志管理/
│   │   ├── ELK-Stack/
│   │   └── Fluentd/
│   └── 安全工具/
│       ├── SSL证书/
│       ├── 防火墙/
│       └── 加密工具/
├── 09-网络与协议/             # 网络相关
│   ├── HTTP-HTTPS/
│   ├── TCP-UDP/
│   ├── WebSocket/
│   ├── gRPC/
│   ├── REST-API/
│   └── GraphQL/
├── 10-测试与质量保证/         # 测试相关
│   ├── 单元测试/
│   │   ├── pytest/
│   │   ├── Jest/
│   │   └── JUnit/
│   ├── 集成测试/
│   ├── 性能测试/
│   │   ├── JMeter/
│   │   └── LoadRunner/
│   └── 代码质量/
│       ├── SonarQube/
│       ├── ESLint/
│       └── Prettier/
├── 11-机器学习与AI/           # AI相关
│   ├── Python库/
│   │   ├── TensorFlow/
│   │   ├── PyTorch/
│   │   ├── Scikit-learn/
│   │   └── Keras/
│   ├── 数据处理/
│   │   ├── Pandas/
│   │   ├── NumPy/
│   │   └── Matplotlib/
│   ├── 深度学习框架/
│   └── AI工具/
│       ├── Jupyter/
│       ├── Colab/
│       └── Kaggle/
├── 12-移动开发/               # 移动应用开发
│   ├── Android/
│   │   ├── Java/
│   │   ├── Kotlin/
│   │   └── Flutter/
│   ├── iOS/
│   │   ├── Swift/
│   │   ├── Objective-C/
│   │   └── React-Native/
│   └── 跨平台/
│       ├── Flutter/
│       ├── React-Native/
│       └── Xamarin/
├── 13-桌面应用开发/           # 桌面应用
│   ├── Electron/
│   ├── Qt/
│   ├── Tkinter/
│   └── WPF/
├── 14-游戏开发/               # 游戏开发
│   ├── Unity/
│   ├── Unreal-Engine/
│   ├── Godot/
│   └── Pygame/
├── 15-区块链与加密货币/       # 区块链
│   ├── Bitcoin/
│   ├── Ethereum/
│   ├── Solidity/
│   └── Web3/
├── 16-安全与加密/             # 安全相关
│   ├── 加密算法/
│   ├── 安全协议/
│   ├── 渗透测试/
│   └── 安全工具/
├── 17-办公与效率工具/         # 办公软件
│   ├── Office/
│   ├── Google-Workspace/
│   ├── Notion/
│   ├── Obsidian/
│   └── Markdown/
├── 18-设计工具/               # 设计相关
│   ├── Photoshop/
│   ├── Figma/
│   ├── Sketch/
│   └── Canva/
├── 19-音视频处理/             # 多媒体
│   ├── FFmpeg/
│   ├── OpenCV/
│   ├── Audacity/
│   └── Blender/
├── 20-硬件与物联网/           # 硬件开发
│   ├── Arduino/
│   ├── Raspberry-Pi/
│   ├── ESP32/
│   └── 传感器/
├── 21-其他工具/               # 其他实用工具
│   ├── 文件处理/
│   ├── 文本处理/
│   ├── 系统工具/
│   └── 网络工具/
└── templates/               # 笔记模板
    ├── 工具学习模板.md
    ├── 命令速查模板.md
    ├── API文档模板.md
    └── 项目总结模板.md
```

## 🎯 使用说明

1. **添加新工具笔记**：
   - 在对应分类目录下创建新的文件夹
   - 使用 `templates/` 中的模板作为基础
   - 按照模板格式填写工具的基本信息和使用方法

2. **更新现有笔记**：
   - 直接在对应的markdown文件中编辑
   - 保持格式一致性
   - 及时提交到Git仓库

3. **查找资料**：
   - 使用GitHub的搜索功能
   - 查看目录结构快速定位
   - 利用README文件了解项目结构

## 📝 笔记规范

- 使用Markdown格式编写
- 包含工具的基本介绍、安装方法、常用命令/API
- 提供实际使用示例
- 记录常见问题和解决方案
- 定期更新和补充内容

## 🔄 版本控制

- 每次学习新工具或更新现有笔记时，及时提交到Git
- 使用有意义的提交信息
- 定期推送到远程仓库进行备份

## 📚 学习计划

- [ ] Python基础语法和常用库
- [ ] Git版本控制基础
- [ ] Docker容器化技术
- [ ] 爬虫工具使用
- [ ] 数据处理和分析
- [ ] 云服务部署
- [ ] Web开发框架
- [ ] 数据库操作
- [ ] 系统运维技能
- [ ] 机器学习基础

---

**开始您的学习之旅吧！** 🚀