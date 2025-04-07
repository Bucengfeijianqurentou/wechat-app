Page({
  data: {
    // 页面的初始数据
  },

  onLoad: function () {
    // 延长显示时间到3秒，并检查登录状态
    setTimeout(() => {
      const app = getApp();
      if (app.checkLogin()) {
        // 已登录，跳转到首页
        wx.switchTab({
          url: '/pages/index/index'
        });
      } else {
        // 未登录，跳转到登录页
        wx.redirectTo({
          url: '/pages/login/login'
        });
      }
    }, 3000); // 延长到3秒
  }
}) 