<template>
  <div class="chat">
    <div class="user">
      <p>正在聊天:{{choosed.name}}</p>
      <img :src="choosed.image" />
    </div>
    <div class="chat-view">
      <chat-view-com :allmsg="allmsg"></chat-view-com>
    </div>
    <div class="chat-input">
      <chat-input-com @send="getSendInScreen"></chat-input-com>
    </div>
    <el-button class="input-button" type="info" @click="joinRoom">加入</el-button>
    <el-button class="input-button" type="info" @click="exitRoom">退出</el-button>
  </div>
</template>
<script>
import chatInputCom from "@/components/ChatRoom/ChatInputCom.vue";
import chatViewCom from "@/components/ChatRoom/ChatViewCom.vue";

export default {
  props: ["choosed"],
  data() {
    return {
      allmsg: [
        // {
        //     name:"",
        //     image:"",
        //     msg:""
        // }
      ],
      ws: null,
      url: "ws://" + window.location.host + "/Room/",
      content: "",
      message: "",
      username: ""
    };
  },
  components: {
    chatInputCom,
    chatViewCom
  },
  methods: {
    // 这里是前后端交互的加入房间的方法
    async joinRoom() {
      if (this.ws) {
        alert("你已经在聊天室");
        return;
      }
      let url = this.url;
      let username = this.choosed.name;
      // console.log(this.choosed.name);
      this.ws = new WebSocket("ws://121.89.208.41:8080/Room/" + username); // 后端的启动端口
      this.ws.onopen = this.webscoketonopen;
      this.ws.onmessage = this.webscoketonmessage;
      //发生错误触发
      this.ws.onerror = function() {
        // console.log("连接错误");
        this.$message.error("连接错误！");
      };
      //正常关闭触发
      this.ws.onclose = function() {
        // console.log("连接关闭");
        this.$message.success("连接关闭");
      };
    },
    getSendInScreen: function(val) {
      // console.log(this.allmsg);
      let arr = [
        {
          name: this.choosed.name,
          image: this.choosed.image,
          msg: val
        }
      ];
      arr.map((item, index) => {
        this.allmsg.push(
          Object.assign({}, item, {
            name: this.choosed.name,
            image: this.choosed.image,
            msg: val
          })
        );
      });

      // 为传入后盾做赋值
      this.message = val;
      if (!this.ws) {
        alert("你已经掉线，请重新加入");
        return;
      }
      if (this.ws.readyState === 1) {
        this.ws.send(this.message);
        this.message = "";
      } else {
        alert("发送失败");
      }
    },

    // 提示是否打开websocket
    webscoketonopen() {
      this.$message.success("与服务器成功建立连接！");
    },
    // 提示发送信息的方法
    webscoketonmessage(value) {
      // console.log(value);
      this.content += value.data + "\r\n";
    },
    // 退出房间
    exitRoom() {
      this.closeWebSocket();
    },
    closeWebSocket() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    },
    talking(content) {
      // console.log(content);
    }
  }
};
</script>
<style scoped>
.chat {
  width: 600px;
  height: 400px;
  background-color: rgb(208, 236, 175);
}
.chat img {
  width: 50px;
  height: 50px;
  border-radius: 50%;

  position: relative;
  top: -50px;
  right: -0px;
}
p {
  height: 50px;
  line-height: 50px;
  color: rgb(243, 248, 250);
  width: 50%;
}
.user {
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: rgb(53, 26, 150);
}
.chat-view {
  width: 100%;
  height: 360px;
  background: rgb(238, 182, 238);
}
.chat-input {
  width: 100%;
  height: 150px;
  background: rgb(216, 125, 186);
}
</style>

