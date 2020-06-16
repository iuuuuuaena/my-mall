<template>
	<div id="main">
		<div class="sku-box store-content">
			<div class="sort-option">
				<ul class="line clear">
					<li><a href="javascript:;" :class="{'active':checked == 1}" @click="setActive(1)">综合排序</a></li>
					<li><a href="javascript:;" :class="{'active':checked == 2}" @click="setActive(2)">销量排序</a></li>
					<li><a href="javascript:;" :class="{'active':checked == 3}" @click="setActive(3)">价格低到高</a></li>
					<li><a href="javascript:;" :class="{'active':checked == 4}" @click="setActive(4)">价格高到低</a></li>
				</ul>
			</div>
			<div class="gray-box">
				<div class="item-box">
          <!-- 遍历小组件，把所有商品显示出来 -->
					<shop-item-com :key="item.goods_id" v-for="(item) in goodsList" :item="item"></shop-item-com>
				</div>
			</div>
		</div>
    <!-- 引入提示商品已经达到最大购买数量 -->
    <prompt-com v-if="maxCount"></prompt-com>
    <login-prompt-com v-if="isLogin"></login-prompt-com>
	</div>
</template>


<script>
import goodData from '@/lib/newGoodsData'
import ShopItemCom from '@/components/ShopItemCom.vue'
import PromptCom from '@/components/PromptCom.vue'
import LoginPromptCom from '@/components/LoginPromptCom.vue'
export default {
  data () {
    return {
      goodsList:[],  // 商品数据
      checked:1 , // 商品四个排序标签的状态

    }
  },
  components: {
    'shop-item-com':ShopItemCom,
    'prompt-com':PromptCom,
    'login-prompt-com':LoginPromptCom
  },
  computed: {
    // 是否到最大数量
    maxCount () {
      return this.$store.state.maxOff
    },
    // 是否登录
    isLogin(){
       return !this.$store.state.isLogin
    }
  },
  methods: {
    setActive(index){
      this.checked = index
    }, 
    getGoodsList() {
      this.$axios({
        url: "/api/goodsList",
        methods:'post',
      }).then(res => {
        console.log(res);
        if(res.status == 200){
          this.$store.state.goodsList = res.data
           this.goodsList = res.data
        }
      });
    }
  },
  watch:{
  //  检测商品排序选中的状态
    'checked'(){
      if(this.checked == 2){

      }else if(this.checked == 3){

      }else if(this.checked == 4){
    
      }
     
    }
  },
  mounted() {
    this.getGoodsList();
  }
}
</script>

<style>
.sku-box{
    position: relative;
}
.sort-option{
    border-top: 1px solid #D8D8D8;
    color: #999;
}
.sort-option ul{
    height: 60px;
    line-height: 60px;
}
.sort-option li{
    position: relative;
    float: left;
    padding-left: 42px;
}
.sort-option li:first-child{
	padding-left: 9px;
}
.sort-option li:before{
	content: ' ';
    display: block;
    position: absolute;
    left: 20px;
    top: 50%;
    width: 2px;
    height: 2px;
    margin-top: -1px;
    background: #C7C7C7;
}
.sort-option li:first-child:before{
	display: none;
}
.sort-option a{
	display: block;
    font-size: 12px;
    color: #999;
}
.sort-option a.active, .sort-option a:hover{
    color: #5683EA;
}
.gray-box{
	overflow: hidden;
    background: #fff;
    border-radius: 8px;
    border: 1px solid #dcdcdc;
    border-color: rgba(0,0,0,.14);
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
}
.sku-box .item-box{
	clear: both;
    overflow: hidden;
    margin: 0 -1px -1px -1px;
}

</style>
