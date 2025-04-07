// index.js
Page({
  data: {
    showAiChat: false
  },

  onLoad() {},

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 0
      });
    }
  },

  // 打开AI助手对话框
  onTapAssistant() {
    this.setData({
      showAiChat: true
    });
  },

  // 关闭AI助手对话框
  onCloseAiChat() {
    this.setData({
      showAiChat: false
    });
  }
})
