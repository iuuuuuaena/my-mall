<template>
    <div class="chat-view">
        <ul>
            <li v-for="(item,index) in allmsg" :key="index">
                <img :src ="item.image"><span class="word">{{item.name}}</span>
                <span class="wordBox"> {{item.msg}} </span>
               
            </li>
        </ul>

    </div>
</template>


<style scoped>
 .wordBox{
    background-color: rgb(132, 233, 211);
    height:30px;
    border-radius: 10px;
    position: relative;
    left:5px;

 }
 .word{
    position: relative;
    left:35px;
    top:-20px;
 }
 li img{
     height:30px;
     width:30px;
     border-radius: 50%;
     position:absolute;
     top:10px;
 }
.chat-view{
    overflow-y:scroll;
}

li{
    height:50px;
    line-height: 50px;
    position:relative;

}

</style>

<script>
export default {
    props:['allmsg']
}
</script>


