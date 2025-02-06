# Docsify Sidebar Plugin

This is a plugin for Docsify that automatically generates a sidebar.

## Installation

Download the `docsify-sidebar-plugin.min.js` file from the [GitHub repository](https://github.com/aishangxuejie/docsify-sidebar-plugin.git).

要测试该脚本，可以按照以下步骤操作：

1. 确保你已经安装了 Node.js。
2. 打开终端或命令提示符。
3. 导航到包含 docsify-sidebar-plugin.js 文件的目录。
4. 运行以下命令来执行脚本，并传递一个相对路径参数：
   `node docsify-sidebar-plugin.js <relative-path>`

   例如，如果你想要生成 _sidebar.md 文件的目录是 docs，你可以运行：

   `node docsify-sidebar-plugin.js docs`

确保在运行脚本之前，目标目录中有一些 Markdown 文件和子目录，以便脚本能够生成内容。

# 提示

目前版本(V 1.0))通过获取脚本位置作为根目录，命令行输入参数为相对路径。

所以建议将文件放在docsify的根目录下(与index.html同级)。
