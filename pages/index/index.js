// index.js
Page({
  data: {
    isConnected: true,
    stats: {
      totalAssets: 5000,
      availableAssets: 3000,
      monthlyBorrowed: 12,
      pendingReturn: 3,
      goodConditionRate: '98%'
    }
  },

  onLoad() {
    this.checkSystemStatus();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 0
      });
    }
  },

  // 检查系统状态
  checkSystemStatus() {
    // 这里可以添加实际的系统状态检查逻辑
    this.setData({
      isConnected: true
    });
  },

  // 处理操作点击
  onActionTap(e) {
    const type = e.currentTarget.dataset.type;
    const actions = {
      borrow: () => {
        wx.navigateTo({ url: '/pages/borrow/borrow' });
      },
      return: () => {
        wx.navigateTo({ url: '/pages/return/return' });
      },
      transfer: () => {
        wx.navigateTo({ url: '/pages/transfer/transfer' });
      },
      maintain: () => {
        wx.navigateTo({ url: '/pages/maintain/maintain' });
      }
    };

    if (actions[type]) {
      actions[type]();
    }
  },

  // 查看全部
  onViewAll() {
    wx.navigateTo({
      url: '/pages/records/records'
    });
  }
})
