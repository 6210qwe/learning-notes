import os


def add_gitkeep_to_empty_folders():
    # 遍历当前目录及其所有子目录
    for root, dirs, files in os.walk("."):
        # 跳过Git自身的目录（避免干扰）
        if ".git" in root:
            continue

        # 判断当前文件夹是否为空（无文件 + 无嵌套文件夹）
        if not dirs and not files:
            # 在空文件夹中创建.gitkeep文件
            gitkeep_path = os.path.join(root, ".gitkeep")
            with open(gitkeep_path, "w") as f:
                pass  # 创建空文件，无需内容
            print(f"已处理空文件夹：{root}")


if __name__ == "__main__":
    add_gitkeep_to_empty_folders()
    print("所有空文件夹已添加.gitkeep，可提交到Git了！")