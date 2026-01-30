(async function() {
  const hostname = window.location.hostname;
  
  // 从 storage 中获取白名单列表 (allowedDomains)
  const { allowedDomains = [] } = await chrome.storage.sync.get('allowedDomains');
  
  // 只有在白名单中的网站才会注入字体
  if (!allowedDomains.includes(hostname)) {
    console.log('[强制思源黑体] 当前网站不在白名单中，默认不启用字体替换。');
    return;
  }

  // 注入样式
  const style = document.createElement('style');
  style.textContent = `
    html, body, body * {
      font-family: "Source Han Sans SC", "Source Han Sans", "Noto Sans CJK SC", "Noto Sans SC", "思源黑体", "PingFang SC", "Microsoft YaHei", sans-serif !important;
    }
    input, textarea, select, button {
      font-family: "Source Han Sans SC", "Source Han Sans", "Noto Sans CJK SC", "Noto Sans SC", "思源黑体", "PingFang SC", "Microsoft YaHei", sans-serif !important;
    }
  `;
  
  // 尽可能早地插入样式
  if (document.documentElement) {
    document.documentElement.appendChild(style);
  } else {
    const observer = new MutationObserver(() => {
      if (document.documentElement) {
        document.documentElement.appendChild(style);
        observer.disconnect();
      }
    });
    observer.observe(document, { childList: true, subtree: true });
  }
})();
