Page({
  data: {
    searchValue: '',
    currentFilter: 'all',
    currentDate: '',
    totalAssets: 0,
    availableAssets: 0,
    borrowedAssets: 0,
    maintenanceAssets: 0
  },

  onLoad() {
    this.setCurrentDate();
    this.getAssetsStats();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 1
      });
    }
  },

  // 设置当前日期
  setCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setData({
      currentDate: `${year}年${month}月${day}日`
    });
  },

  // 获取资产统计数据
  getAssetsStats() {
    // TODO: 实现获取资产统计数据的逻辑
    // 这里先使用模拟数据
    this.setData({
      totalAssets: 128,
      availableAssets: 89,
      borrowedAssets: 35,
      maintenanceAssets: 4
    });
  },

  // 搜索框输入变化
  onSearchChange(e) {
    this.setData({
      searchValue: e.detail
    });
  },

  // 搜索提交
  onSearch() {
    // TODO: 实现搜索逻辑
    wx.showToast({
      title: '搜索功能开发中',
      icon: 'none'
    });
  },

  // 筛选切换
  onFilterTap(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      currentFilter: type
    });
    // TODO: 实现筛选逻辑
  },

  // 刷新数据
  onRefresh() {
    wx.showToast({
      title: '刷新成功',
      icon: 'success'
    });
  },

  // 扫码操作
  onScanTap() {
    wx.scanCode({
      success: (res) => {
        console.log('扫码结果：', res);
        // TODO: 处理扫码结果
        wx.showToast({
          title: '扫码功能开发中',
          icon: 'none'
        });
      },
      fail: (err) => {
        console.error('扫码失败：', err);
        wx.showToast({
          title: '扫码失败',
          icon: 'error'
        });
      }
    });
  }
}); 