Page({
  data: {
    searchValue: '',
    currentFilter: 'all',
    currentDate: '',
    totalAssets: 0,
    availableAssets: 0,
    borrowedAssets: 0,
    maintenanceAssets: 0,
    assetsList: []
  },

  onLoad() {
    this.setCurrentDate();
    this.fetchAssetsList();
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

  // 获取资产列表数据
  fetchAssetsList() {
    wx.request({
      url: 'http://localhost:8080/xiaoyuanzichan/shangpin/listAll',
      method: 'GET',
      success: (res) => {
        if (res.data.code === 0) {
          // 对数据进行倒序排列
          const sortedList = res.data.data.sort((a, b) => b.id - a.id);
          this.setData({
            assetsList: sortedList
          });
          // 更新资产统计数据
          this.updateAssetsStats(sortedList);
        } else {
          wx.showToast({
            title: '获取数据失败',
            icon: 'error'
          });
        }
      },
      fail: (err) => {
        console.error('请求失败：', err);
        wx.showToast({
          title: '网络错误',
          icon: 'error'
        });
      }
    });
  },

  // 更新资产统计数据
  updateAssetsStats(list) {
    const stats = {
      total: list.length,
      available: 0,
      borrowed: 0,
      maintenance: 0
    };

    list.forEach(item => {
      if (item.shangpinTypes === 1) {
        stats.available++;
      } else if (item.shangpinTypes === 2) {
        stats.borrowed++;
      } else {
        stats.maintenance++;
      }
    });

    this.setData({
      totalAssets: stats.total,
      availableAssets: stats.available,
      borrowedAssets: stats.borrowed,
      maintenanceAssets: stats.maintenance
    });
  },

  // 刷新数据
  onRefresh() {
    wx.showLoading({
      title: '刷新中...',
    });
    this.fetchAssetsList();
    wx.hideLoading();
    wx.showToast({
      title: '刷新成功',
      icon: 'success'
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
    const keyword = this.data.searchValue.trim();
    if (!keyword) {
      this.fetchAssetsList();
      return;
    }
    
    const filteredList = this.data.assetsList.filter(item => 
      item.shangpinName.includes(keyword) || 
      item.shangpinUuidNumber.includes(keyword)
    );
    
    this.setData({
      assetsList: filteredList
    });
  },

  // 筛选切换
  onFilterTap(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      currentFilter: type
    });
    
    if (type === 'all') {
      this.fetchAssetsList();
      return;
    }
    
    const typeMap = {
      'available': 1,
      'borrowed': 2,
      'maintenance': 3
    };
    
    const filteredList = this.data.assetsList.filter(item => 
      item.shangpinTypes === typeMap[type]
    );
    
    this.setData({
      assetsList: filteredList
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