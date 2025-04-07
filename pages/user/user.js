// user.js
Page({
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: '',
      employeeId: ''
    },
    stats: {
      totalAssets: 0,
      borrowing: 0,
      overdue: 0,
      returned: 0
    }
  },

  onLoad() {
    this.getUserInfo();
    this.getStats();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        active: 2
      });
    }
  },

  // 获取用户信息
  getUserInfo() {
    // TODO: 实现获取用户信息的逻辑
    // 这里先使用模拟数据
    this.setData({
      userInfo: {
        avatarUrl: '',
        nickName: '张三',
        employeeId: 'EMP001'
      }
    });
  },

  // 获取统计数据
  getStats() {
    // TODO: 实现获取统计数据的逻辑
    // 这里先使用模拟数据
    this.setData({
      stats: {
        totalAssets: 12,
        borrowing: 3,
        overdue: 1,
        returned: 8
      }
    });
  },

  // 点击用户信息
  onTapUserInfo() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        this.setData({
          'userInfo.avatarUrl': res.userInfo.avatarUrl,
          'userInfo.nickName': res.userInfo.nickName
        });
      }
    });
  },

  // 处理功能点击
  onTapFunction(e) {
    const type = e.currentTarget.dataset.type;
    const routes = {
      scan: '/pages/scan/scan',
      return: '/pages/return/return',
      repair: '/pages/repair/repair',
      records: '/pages/records/records',
      myAssets: '/pages/my-assets/my-assets',
      borrow: '/pages/borrow/borrow',
      repairRecords: '/pages/repair-records/repair-records',
      reports: '/pages/reports/reports',
      profile: '/pages/profile/profile',
      notifications: '/pages/notifications/notifications',
      help: '/pages/help/help',
      about: '/pages/about/about'
    };

    if (routes[type]) {
      wx.navigateTo({
        url: routes[type]
      });
    }
  },

  // 退出登录
  onTapLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // TODO: 实现退出登录逻辑
          this.setData({
            userInfo: {
              avatarUrl: '',
              nickName: '',
              employeeId: ''
            },
            stats: {
              totalAssets: 0,
              borrowing: 0,
              overdue: 0,
              returned: 0
            }
          });
        }
      }
    });
  }
}); 