<template>
    <div  class = "userlist">
        <h1>用户列表</h1>
        <ul>
            <li v-for='(item,index) in userlist' :key="index"  @click="chooseuser(index)"> 
                <button> <h3>{{item.name}}</h3><img :src ="item.image"></button>
            </li>
        </ul>
    </div>
</template>


<script>
export default{
    props:['userlist'],
    data:function(){
        return {

        }
    },
    methods:{
        chooseuser:function(index){
            this.$emit("chooseuser",index)
        }
    }
}
</script>


// 如果只让style ，css只在我这个文件里使用，可以在style的属性上加上 scoped
<style scoped>
    .userlist{
        background: skyblue;
        width:200px;
        margin:0 auto;
    
    }
    .userlist ul li{
        display:flex;
    }
    .userlist ul li img{
        width:80px;
        height: 80px;
        margin:0 auto;
        
    }
     .userlist ul li button{
         font-size: 30px;
         line-height: 80px;
         text-align: center;
         width:100%;
          display:flex;
          background-color: rgb(25, 136, 228);
          border-radius: 10px;
          border:1px solid rgb(25, 136, 228);
          margin:5px 5px;
     }
</style>