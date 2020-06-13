<template>
  <div id="chat">
    <!-- 定义了一个聊天的组件 -->
    <!-- <h1>{{msg}}</h1> -->
    <div class="content">
      <chat-com :choosed ="toChatComValue"></chat-com>
      <user-list-com :userlist="userlist" @chooseuser="chooseuser"></user-list-com>
    </div>

  </div>
</template>

<script>

import chatCom from '@/components/ChatRoom/ChatCom.vue'
import userListCom from '@/components/ChatRoom/UserListCom.vue'

export default {
  components: {
    chatCom,userListCom
  },
  data(){
    return {
      msg:'',
      userlist:[
        {
          name:"纱雾",
          image:require("@/assets/img/1.jpg")
        },
        {
          name:"和泉",
          image:require("@/assets/img/3.jpg")
        },
        {
          name:"tom",
          image:require("@/assets/img/2.jpg")
        },
        {
          name:"jarry",
          image:require("@/assets/img/4.jpg")
        }
      ],
      toChatComValue:{
          name:"tom",
          image:require("@/assets/img/1.jpg")
        }
      
    }
   
  },
  methods:{
    chooseuser:function(index){
        this.toChatComValue = this.userlist[index]
    }
  }
}
</script>

<style scoped>
*{
  margin:0;
  padding:0;
}
#chat {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.content{
  margin: 50px auto;
  width:800px;
  height:500px;
   /* box-shadow: 10 10 rgb(96, 115, 139); */
  border-radius: 1px;

  background-color: rgb(204, 204, 204);
  display: flex;
 
}

</style>
