Component({
  data: {
    active: 0
  },
  methods: {
    onChange(event) {
      const index = event.detail;
      const pages = ['/pages/index/index', '/pages/assets/assets', '/pages/user/user'];
      wx.switchTab({
        url: pages[index]
      });
      this.setData({ active: index });
    }
  }
}); 