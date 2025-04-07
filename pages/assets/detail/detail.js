Page({
  data: {
    asset: null,
    showHashSheet: false,
    hashActions: [
      {
        name: '复制交易哈希',
        color: '#1989fa'
      }
    ],
    statusMap: {
      1: '可借用',
      2: '已借出',
      3: '维修中',
      4: '可借用'
    },
    locationMap: {
      1: '信息楼',
      2: '保卫处',
      3: '教务处',
      4: '化工楼',
      5: '实验室'
    },
    typeMap: {
      1: '激光加工设备',
      2: '机器人设备',
      3: '服务器设备',
      4: '3D打印设备',
      5: '其他'
    }
  },

  onLoad(options) {
    if (options.asset) {
      try {
        const asset = JSON.parse(decodeURIComponent(options.asset));
        // 处理图片路径
        asset.shangpinPhoto = 'http://localhost:8080' + asset.shangpinPhoto;
        this.setData({ asset });
      } catch (error) {
        console.error('解析资产数据失败：', error);
        wx.showToast({
          title: '数据加载失败',
          icon: 'error'
        });
      }
    }
  },

  // 显示交易哈希操作面板
  showHashActions() {
    this.setData({ showHashSheet: true });
  },

  // 关闭交易哈希操作面板
  onHashSheetClose() {
    this.setData({ showHashSheet: false });
  },

  // 选择交易哈希操作
  onHashActionSelect(e) {
    const { name } = e.detail;
    if (name === '复制交易哈希') {
      this.copyHash();
    }
  },

  // 复制交易哈希
  copyHash() {
    if (this.data.asset && this.data.asset.transactionHash) {
      wx.setClipboardData({
        data: this.data.asset.transactionHash,
        success: () => {
          wx.showToast({
            title: '已复制',
            icon: 'success'
          });
          this.setData({ showHashSheet: false });
        }
      });
    }
  }
}); 