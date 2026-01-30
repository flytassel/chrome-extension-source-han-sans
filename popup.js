document.addEventListener('DOMContentLoaded', async () => {
  const statusDiv = document.getElementById('status');
  const toggleBtn = document.getElementById('toggleBtn');

  // 获取当前活动标签页
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url) return;

  const url = new URL(tab.url);
  const hostname = url.hostname;

  // 从 storage 中获取白名单列表 (allowedDomains)
  const { allowedDomains = [] } = await chrome.storage.sync.get('allowedDomains');
  const isAllowed = allowedDomains.includes(hostname);

  updateUI(isAllowed, hostname);

  toggleBtn.addEventListener('click', async () => {
    const { allowedDomains = [] } = await chrome.storage.sync.get('allowedDomains');
    let newList;

    if (isAllowed) {
      newList = allowedDomains.filter(d => d !== hostname);
    } else {
      newList = [...allowedDomains, hostname];
    }

    await chrome.storage.sync.set({ allowedDomains: newList });
    window.close(); // 关闭弹出框
    chrome.tabs.reload(tab.id); // 刷新页面使更改生效
  });

  function updateUI(allowed, host) {
    if (allowed) {
      statusDiv.textContent = `当前网站 (${host}) 已启用`;
      toggleBtn.textContent = '从白名单中移除 (禁用)';
      toggleBtn.classList.add('remove');
    } else {
      statusDiv.textContent = `当前网站 (${host}) 已禁用`;
      toggleBtn.textContent = '添加到白名单 (启用)';
      toggleBtn.classList.remove('remove');
    }
  }
});
