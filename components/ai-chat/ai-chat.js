Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  data: {
    inputValue: '',
    messages: [],
    showPresetQuestions: true,
    presetQuestions: [
      '如何申请资产借用？',
      '资产借用的期限是多久？',
      '如何查看我的借用记录？',
      '如何申请资产维修？'
    ],
    isTyping: false
  },

  lifetimes: {
    attached() {
      // 组件加载时显示欢迎消息
      this.showWelcomeMessage();
    }
  },

  methods: {
    showWelcomeMessage() {
      const welcomeMessage = "您好！我是区块链资产管理平台的AI助手。我可以帮您解答关于资产管理的各种问题，包括资产借用、归还、维修等。您可以直接点击下方的常见问题，或者输入您的具体问题。";
      this.simulateTyping(welcomeMessage);
    },

    onClose() {
      this.setData({ show: false });
      this.triggerEvent('close');
    },

    onInputChange(e) {
      this.setData({
        inputValue: e.detail
      });
    },

    onQuestionTap(e) {
      const question = e.currentTarget.dataset.question;
      this.handleUserMessage(question);
    },

    onSend() {
      const { inputValue } = this.data;
      if (!inputValue.trim()) return;
      
      this.handleUserMessage(inputValue);
      this.setData({ inputValue: '' });
    },

    handleUserMessage(message) {
      // 添加用户消息
      this.addMessage('user', message);
      
      // 隐藏预设问题
      this.setData({ showPresetQuestions: false });

      // 根据问题生成回答
      const answer = this.generateAnswer(message);
      this.simulateTyping(answer);
    },

    addMessage(type, content) {
      const messages = this.data.messages.concat({
        type,
        content,
        isTyping: false
      });
      this.setData({ messages });
      this.scrollToBottom();
    },

    simulateTyping(message) {
      // 添加一条空消息，显示输入中状态
      const messages = this.data.messages.concat({
        type: 'ai',
        content: '',
        isTyping: true
      });
      this.setData({ messages });
      this.scrollToBottom();

      // 模拟打字效果
      let currentText = '';
      const chars = message.split('');
      let index = 0;

      const timer = setInterval(() => {
        if (index >= chars.length) {
          clearInterval(timer);
          // 更新最后一条消息，移除打字状态
          const messages = this.data.messages;
          messages[messages.length - 1] = {
            type: 'ai',
            content: currentText,
            isTyping: false
          };
          this.setData({ messages });
          return;
        }

        currentText += chars[index];
        const messages = this.data.messages;
        messages[messages.length - 1] = {
          type: 'ai',
          content: currentText,
          isTyping: true
        };
        this.setData({ messages });
        this.scrollToBottom();
        index++;
      }, 50);
    },

    scrollToBottom() {
      wx.nextTick(() => {
        const query = this.createSelectorQuery();
        query.select('.chat-content').boundingClientRect();
        query.selectViewport().scrollOffset();
        query.exec(res => {
          if (res[0] && res[1]) {
            wx.pageScrollTo({
              scrollTop: res[0].bottom,
              duration: 300
            });
          }
        });
      });
    },

    generateAnswer(question) {
      // 简单的问答逻辑
      const answers = {
        '如何申请资产借用？': '申请资产借用的步骤如下：\n1. 在首页点击"申请借用"按钮\n2. 选择需要借用的资产\n3. 填写借用原因和预计归还时间\n4. 提交申请等待审核\n\n您也可以通过扫描资产二维码直接发起借用申请。',
        '资产借用的期限是多久？': '一般情况下，资产借用期限为：\n1. 普通设备：最长7天\n2. 特殊设备：最长30天\n3. 临时使用：24小时内\n\n如需延长借用时间，请在到期前提交延期申请。',
        '如何查看我的借用记录？': '查看借用记录有两种方式：\n1. 在首页点击"我的"->"借用记录"\n2. 在资产页面筛选"已借用"状态\n\n系统会显示您的历史借用记录、当前借用状态和即将到期的提醒。',
        '如何申请资产维修？': '申请资产维修的流程是：\n1. 在资产详情页点击"申请维修"\n2. 填写故障描述和图片\n3. 提交维修申请\n4. 等待维修人员处理\n\n紧急情况可以直接联系管理员。'
      };

      // 默认回答
      let answer = '抱歉，我暂时无法理解您的问题。您可以换个方式描述，或者查看以下常见问题：\n1. 如何申请资产借用？\n2. 资产借用期限是多久？\n3. 如何查看借用记录？';

      // 检查是否有匹配的预设答案
      for (const key in answers) {
        if (question.includes(key)) {
          answer = answers[key];
          break;
        }
      }

      return answer;
    }
  }
}) 