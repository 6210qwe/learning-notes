# Git 学习笔记

## 📋 基本信息

- **工具名称**: Git
- **版本**: 2.x
- **官方网站**: https://git-scm.com/
- **文档地址**: https://git-scm.com/doc
- **学习日期**: 2024-01-01
- **难度等级**: ⭐⭐⭐⭐ (1-5星)

## 🎯 工具简介

### 什么是 Git？
Git是一个分布式版本控制系统，用于跟踪文件的变化，协调多人协作开发。

### 主要特性
- 分布式版本控制
- 快速性能
- 数据完整性
- 支持非线性开发

### 适用场景
- 代码版本管理
- 团队协作开发
- 项目备份
- 分支管理

## 🚀 安装与配置

### 安装方法
```bash
# Windows (使用Git for Windows)
# 下载并安装 https://git-scm.com/download/win

# macOS
brew install git

# Ubuntu/Debian
sudo apt-get install git
```

### 环境要求
- 操作系统: Windows/macOS/Linux
- 依赖软件: 无特殊要求
- 硬件要求: 最低配置即可

### 配置步骤
1. 设置用户信息
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

2. 设置默认编辑器
```bash
git config --global core.editor "code --wait"
```

## 📚 基础使用

### 基本命令
```bash
# 初始化仓库
git init

# 克隆仓库
git clone <url>

# 查看状态
git status

# 添加文件
git add <file>

# 提交更改
git commit -m "commit message"
```

### 常用参数
| 参数 | 说明 | 示例 |
|------|------|------|
| -m | 提交信息 | `git commit -m "message"` |
| -a | 自动添加已修改文件 | `git commit -a -m "message"` |
| --oneline | 单行显示日志 | `git log --oneline` |

## 💡 实用示例

### 示例1: 创建新项目
```bash
# 1. 创建项目目录
mkdir my-project
cd my-project

# 2. 初始化Git仓库
git init

# 3. 创建README文件
echo "# My Project" > README.md

# 4. 添加并提交
git add README.md
git commit -m "Initial commit"
```

**说明**: 这是创建新Git项目的基本流程

### 示例2: 分支管理
```bash
# 创建并切换到新分支
git checkout -b feature-branch

# 在新分支上工作
echo "New feature" >> feature.txt
git add feature.txt
git commit -m "Add new feature"

# 切换回主分支
git checkout main

# 合并分支
git merge feature-branch
```

**说明**: 展示了Git分支的基本使用方法

## 🔧 高级功能

### 功能1: 撤销更改
```bash
# 撤销工作区更改
git checkout -- <file>

# 撤销暂存区更改
git reset HEAD <file>

# 撤销最后一次提交
git reset --soft HEAD~1
```

### 功能2: 查看历史
```bash
# 查看提交历史
git log

# 查看文件变化
git diff

# 查看特定提交
git show <commit-hash>
```

## ❓ 常见问题

### Q: 如何撤销错误的提交？
**A**: 使用 `git reset --soft HEAD~1` 撤销最后一次提交但保留更改

### Q: 如何解决合并冲突？
**A**: 
1. 打开冲突文件
2. 手动解决冲突标记
3. 使用 `git add` 标记已解决
4. 完成合并 `git commit`

## 📖 学习资源

### 官方文档
- [Git官方文档](https://git-scm.com/doc)

### 推荐教程
- [Pro Git Book](https://git-scm.com/book)
- [GitHub Guides](https://guides.github.com/)

### 相关工具
- [GitHub](https://github.com/)
- [GitLab](https://gitlab.com/)

## 📝 学习心得

### 优点
- 强大的版本控制功能
- 优秀的分布式架构
- 丰富的命令行工具

### 缺点
- 学习曲线较陡峭
- 命令行操作较多

### 使用建议
- 经常提交，保持提交信息清晰
- 合理使用分支进行功能开发
- 定期推送到远程仓库

## 🔄 更新记录

| 日期 | 版本 | 更新内容 |
|------|------|----------|
| 2024-01-01 | v1.0 | 初始版本 |

---

**学习状态**: ✅ 已完成

**下一步计划**: 
- [ ] 学习Git高级功能
- [ ] 学习GitHub工作流
- [ ] 学习Git Hooks
