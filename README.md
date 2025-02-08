# Docsify Sidebar Plugin

这是一款超级便捷、超级实用、简单且优雅的生成_sidebar.md的方案。作者可以专注于内容创作、一键生成内容目录。

1. 开源MIT。
2. 灵活、轻便、简单、美观。
3. 不仅可以一次性生成多级目录，还可以追加更新目录。
4. 为导航添加了有趣的emoji图标。

# 维护计划

* [X] 完成基本功能
* [X] 完成测试和优化
* [ ] 重构为docsify插件
* [ ] 增加灵活性，如部分配置参数允许在index.html中自定义

# 使用说明

要使用该脚本，可以按照以下步骤操作：

1. 确保你已经安装了 Node.js。
2. 打开终端或命令提示符。
3. 导航到包含 docsify-sidebar-plugin.js 文件的目录。
4. 运行以下命令来执行脚本，并传递一个相对路径参数：
   `node docsify-sidebar-plugin.js <relative-path>`

   例如，如果你想要生成 _sidebar.md 文件的目录是 docs，你可以运行：

   `node docsify-sidebar-plugin.js docs`

确保在运行脚本之前，目标目录中有一些 Markdown 文件和子目录，以便脚本能够生成内容。

> 提示：目前版本(V 1.0))通过获取脚本位置作为根目录，命令行输入参数为相对路径。所以建议将文件放在docsify的根目录下(与index.html同级)。

# 示例Demo

## 执行

```powershell
...
PS F:\Docsify> cd .\docs\
PS F:\Docsify\docs> node docsify-sidebar-plugin.js /zh-cn/home2
》》_sidebar.md path: F:\Docsify\docs\zh-cn\home2\_sidebar.md
》》README.md Write succeeded: F:\Docsify\docs\zh-cn\home2
》》README.md Write succeeded: F:\Docsify\docs\zh-cn\home2\mc
》》_sidebar.md Append succeeded
PS F:\Docsify\docs>
```

## 效果

![1738997873436](image/README/1738997873436.png)

# 参与开发维护说明

可以使用任意编程工具，但需要注意无需修改mini.js，可以通关脚本直接生成新的文件

```shell
terser docsify-sidebar-plugin.js -o docsify-sidebar-plugin.min.js
```
