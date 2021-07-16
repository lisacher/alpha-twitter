<template>
  
</template>

<script>
export default {
  name: 'ChatRoom',
  data() {
    return {
      text: '',
      onlineUser: [],
      latestMessage: []
    }
  },
  methods: {
    async getMessage() {
      try {
        // 一進聊天室先請求所有先前聊天訊息
      const { data } = await api
        this.latestMessage = {
          ...this.latestMessage,
          ...data
        } 
      }catch(error) {
        console.log(error);
      }
      
    },
    handleSubmit() {
      // 向socket 發出事件，傳送聊天訊息
      this.$socket.emit('clientSend', {
        message: this.text
      })
      // 確定送出成功
      // 存入事件
      this.saveMessage()
      // 清空輸入欄
      this.text = ''
    },
    async saveMessage() {
      try {
        // TODO: 請求存入訊息

      } catch(error) {
        console.log(error);
      }
    }
  },
  sockets: {
    connect() {
      console.log();
    },
    otherUserMessage(data) {
      console.log(`${data.User.name}: ${data.message}`);
      this.latestMessage.push(data)
    },
    myMessage(data) {
      console.log(`${data.User.name}: ${data.message}`);
      this.latestMessage.push(data)
    }
  }
}
</script>