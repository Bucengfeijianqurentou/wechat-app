// app.js
App({
  onLaunch() {
    // 检查登录状态
    this.checkLogin();

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },

  checkLogin() {
    const userId = wx.getStorageSync('userId');
    const username = wx.getStorageSync('username');
    
    if (!userId || !username) {
      // 未登录，跳转到登录页
      wx.redirectTo({
        url: '/pages/login/login'
      });
    }
  }
})
