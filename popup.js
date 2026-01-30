document.addEventListener('DOMContentLoaded', async () => {
  const statusDiv = document.getElementById('status');
  const toggleBtn = document.getElementById('toggleBtn');

  // 获取当前活动标签页
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.url) return;

  const url = new URL(tab.url);
  const hostname = url.hostname;

  // 从 storage 中获取排除名单
  const { excludedDomains = [] } = await chrome.storage.sync.get('excludedDomains');
  const isExcluded = excludedDomains.includes(hostname);

  updateUI(isExcluded, hostname);

  toggleBtn.addEventListener('click', async () => {
    const { excludedDomains = [] } = await chrome.storage.sync.get('excludedDomains');
    let newList;

    if (isExcluded) {
      newList = excludedDomains.filter(d => d !== hostname);
    } else {
      newList = [...excludedDomains, hostname];
    }

    await chrome.storage.sync.set({ excludedDomains: newList });
    window.close(); // 关闭弹出框
    chrome.tabs.reload(tab.id); // 刷新页面使更改生效
  });

  function updateUI(excluded, host) {
    if (excluded) {
      statusDiv.textContent = `当前网站 (${host}) 已排除`;
      toggleBtn.textContent = '从排除名单中移除';
      toggleBtn.classList.add('remove');
    } else {
      statusDiv.textContent = `当前网站 (${host}) 已启用`;
      toggleBtn.textContent = '添加到排除名单';
      toggleBtn.classList.remove('remove');
    }
  }
});
