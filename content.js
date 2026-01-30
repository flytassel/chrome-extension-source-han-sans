(async function() {
  const hostname = window.location.hostname;
  
  // 从 storage 中检查是否在排除名单中
  const { excludedDomains = [] } = await chrome.storage.sync.get('excludedDomains');
  
  if (excludedDomains.includes(hostname)) {
    console.log('[强制思源黑体] 当前网站在排除名单中，跳过字体注入。');
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
