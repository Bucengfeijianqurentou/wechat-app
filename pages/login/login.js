Page({
  data: {
    username: '',
    password: '',
    loading: false
  },

  // 用户名输入
  onUsernameChange(e) {
    this.setData({
      username: e.detail
    });
  },

  // 密码输入
  onPasswordChange(e) {
    this.setData({
      password: e.detail
    });
  },

  // 登录操作
  onLogin() {
    const { username, password } = this.data;
    
    if (!username || !password) {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      });
      return;
    }

    this.setData({ loading: true });

    wx.request({
      url: 'http://localhost:8080/xiaoyuanzichan/yonghu/login',
      method: 'GET',
      data: {
        username,
        password
      },
      success: (res) => {
        console.log('登录响应:', res.data); // 添加日志
        if (res.data.code === 0) {
          // 登录成功，保存用户信息
          wx.setStorageSync('userId', res.data.userId);
          wx.setStorageSync('username', res.data.username);
          wx.setStorageSync('role', res.data.role);
          
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          });

          // 延迟跳转，确保 Toast 显示完成
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            });
          }, 2000);
        } else {
          wx.showToast({
            title: res.data.msg || '登录失败',
            icon: 'error'
          });
        }
      },
      fail: (err) => {
        console.error('登录请求失败:', err); // 添加错误日志
        wx.showToast({
          title: '网络连接失败',
          icon: 'error'
        });
      },
      complete: () => {
        this.setData({ loading: false });
      }
    });
  }
}); 