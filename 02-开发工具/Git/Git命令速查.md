# Git 命令速查表

## Git 命令速查表

### 基本信息
- **工具**: Git
- **版本**: 2.x
- **更新日期**: 2024-01-01

## 📋 常用命令

### 基础命令
| 命令 | 说明 | 示例 |
|------|------|------|
| `git init` | 初始化仓库 | `git init` |
| `git clone` | 克隆仓库 | `git clone <url>` |
| `git status` | 查看状态 | `git status` |
| `git add` | 添加文件 | `git add file.txt` |
| `git commit` | 提交更改 | `git commit -m "message"` |
| `git push` | 推送到远程 | `git push origin main` |
| `git pull` | 拉取更新 | `git pull origin main` |

### 分支操作
| 命令 | 说明 | 示例 |
|------|------|------|
| `git branch` | 查看分支 | `git branch` |
| `git checkout` | 切换分支 | `git checkout branch-name` |
| `git merge` | 合并分支 | `git merge branch-name` |
| `git branch -d` | 删除分支 | `git branch -d branch-name` |

### 查看历史
| 命令 | 说明 | 示例 |
|------|------|------|
| `git log` | 查看提交历史 | `git log` |
| `git log --oneline` | 单行显示历史 | `git log --oneline` |
| `git diff` | 查看差异 | `git diff` |
| `git show` | 查看提交详情 | `git show <commit-hash>` |

## 🔧 参数说明

### 常用参数
| 参数 | 长参数 | 说明 | 示例 |
|------|--------|------|------|
| `-m` | `--message` | 提交信息 | `git commit -m "message"` |
| `-a` | `--all` | 自动添加已修改文件 | `git commit -a -m "message"` |
| `-v` | `--verbose` | 详细输出 | `git status -v` |
| `-f` | `--force` | 强制操作 | `git push -f` |

## 💡 实用技巧

### 技巧1: 撤销更改
```bash
# 撤销工作区更改
git checkout -- <file>

# 撤销暂存区更改
git reset HEAD <file>

# 撤销最后一次提交
git reset --soft HEAD~1
```

**说明**: 根据不同情况选择合适的撤销方法

### 技巧2: 暂存更改
```bash
# 暂存当前更改
git stash

# 查看暂存列表
git stash list

# 恢复暂存
git stash pop
```

**说明**: 临时保存工作区更改，方便切换分支

### 技巧3: 修改提交信息
```bash
# 修改最后一次提交信息
git commit --amend -m "new message"

# 修改最后一次提交内容
git add <file>
git commit --amend --no-edit
```

**说明**: 修改最近的提交而不创建新提交

## 🚨 错误处理

### 常见错误
| 错误信息 | 原因 | 解决方案 |
|----------|------|----------|
| `fatal: not a git repository` | 不在Git仓库中 | 使用 `git init` 或 `git clone` |
| `error: pathspec 'branch' did not match` | 分支不存在 | 检查分支名或创建分支 |
| `merge conflict` | 合并冲突 | 手动解决冲突后提交 |

## 📚 快速参考

### 安装
```bash
# Windows
# 下载 Git for Windows

# macOS
brew install git

# Ubuntu/Debian
sudo apt-get install git
```

### 配置
```bash
# 设置用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 设置默认编辑器
git config --global core.editor "code --wait"
```

### 常用别名
```bash
# 设置别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
```

## 🔗 相关链接

- [Git官方文档](https://git-scm.com/doc)
- [Pro Git Book](https://git-scm.com/book)
- [GitHub Guides](https://guides.github.com/)

---

**最后更新**: 2024-01-01
**维护者**: 学习笔记
