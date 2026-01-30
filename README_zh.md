# 强制思源黑体 Chrome 扩展

这是一个轻量级的 Chrome 扩展，旨在强制网页使用**思源黑体**，替换掉如宋体等默认字体。

## 功能特点
- 强制替换所有网页元素的字体。
- 优先使用思源黑体及其他高质量无衬线字体。
- 在 `document_start` 阶段注入样式，确保页面加载时即应用。
- **排除名单**：可以轻松排除特定网站（如 Google Docs 或 GitHub），以保持其原始设计。

## 如何排除特定网站
如果您发现某些网站的布局因字体更改而出现问题，可以将它们的 URL 添加到 `manifest.json` 中的 `exclude_matches` 字段：

```json
"exclude_matches": [
  "https://example.com/*",
  "https://*.another-site.org/*"
]
```

## 如何安装
1. 下载或克隆本仓库。
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`。
3. 开启右上角的“**开发者模式**”。
4. 点击“**加载已解压的扩展程序**”，选择包含本扩展的目录。
5. 刷新网页即可生效。

## 许可证
MIT
