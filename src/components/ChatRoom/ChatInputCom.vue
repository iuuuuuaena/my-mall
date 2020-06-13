<template>
    <div  class = "chat-input">
       <textarea name="text" id="input-text" v-model="msg"></textarea>
      
       <button class="input-button" @click="send(msg)" >发送</button>
    </div>
</template>



<script>
export default {
    props:[],
    data:function(){
        return{
           msg:""
        }
    },
    methods:{
        send:function(){
            this.$emit('send', this.msg)
        },
       
    }
}
</script>


<style scoped>

    .input-button{
        border-radius:10px;
        width:100px;
        height:40px;
        background-color: rgb(233, 170, 54);
        position: relative;;
        top:-100px;
        left:450px;
    }
    #input-text{
        width:100%;
        height:100%;
    }
    
</style>