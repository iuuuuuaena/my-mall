<template>
<!-- 每一个商品item  -->
  <div class="item">
    <div>
      <!-- 商品照片 -->
      <div class="item-img">
        <img :alt="item.goods_name" :src="'http://121.89.208.41:8080'+item.goods_image" style="opacity: 1;" />
      </div>
      <!--  商品名称-->
      <h6>{{item.goods_name}}</h6>
      <h3>{{item.goods_name}}</h3>
      <!-- 遍历颜色 -->
      <div class="params-colors">
        <div>
          <h3>来自{{item.user_nickname}}发布</h3>
        </div>
        <!-- <ul class="colors-list">
          <li :key="index" v-for="(sku,index) in item.sku_info">
            <a
              href="javascript:;"
              @click="tableData(index)"
              :data-index="index"
              :title="sku.spec_json.show_name"
              :class="{'active':index==itemIndex}"
            >
              <img :src="'http://img01.smartisanos.cn/'+ sku.spec_json.image +'/20X20.jpg'" />
            </a>
          </li>
        </ul> -->
      </div>
      <!-- 加入购物车 -->

      <!-- [{
  "goods_id":0,
  "goods_name":"",
  "user_nickname":"",
  "user_account": "111111",
  "goods_price": 100,
  "goods_image": "/asserts/img/a103e79d-e115-43ec-9905-0eff268f42bb.jpg",
  "goods_info": "臭豆腐配腐乳，你看这汉堡做滴行不行",
  "goods_tag": "foods",
  "is_deal": 1
}] -->
      <div class="item-btns clearfix">
        <span class="item-gray-btn">
          <router-link :to="{name: 'Item', query: {itemId:item.goods_id}}">查看详情</router-link>
        </span>
        <span @click="addCarPanelHandle(item)" class="item-blue-btn">加入购物车</span>
      </div>
      <!-- 金钱 -->
      <div class="item-price clearfix">
        <i>¥</i>
        <span>{{item.goods_price}}</span>
      </div>

      <div class="discount-icon">false</div>
      <!-- 路由目录 -->
      <div class="item-cover">
        <!-- 根据商品id跳到对应的界面 -->
        <router-link :to="{name: 'Item', query: {itemId:item.goods_id}}"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品索引
      itemIndex: 0
    };
  },
  props: {
    // 父组件传入的item
    item: {
      type: Object
    }
  },
  computed: {
    ball() {
      return this.$store.state.ball;
    }
  },
  methods: {
    addCarPanelHandle(item) {
      if (!this.ball.show) {
        let data = [item, 1];
        this.$store.commit("addCarPanelData", data);
      }
    },
    tableData(index) {
      this.itemIndex = index;
    }
  }
};
</script>

<style>
.sku-box .item {
  position: relative;
  float: left;
  border-right: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  width: 25%;
  height: 429px;
  background: #fff;
  box-sizing: border-box;
}
.sku-box .item:hover {
  box-shadow: 0 0 38px rgba(0, 0, 0, 0.08) inset;
  transition: all 0.15s ease;
}
.sku-box .item .item-img img {
  display: block;
  width: 206px;
  height: 206px;
  margin: 50px auto 10px;
}
.sku-box .item h3,
.sku-box .item h6 {
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sku-box .item h6 {
  line-height: 1.2;
  font-size: 16px;
  color: #424242;
  margin: 0 auto;
  padding: 0 14px;
}
.sku-box .item h3 {
  line-height: 1.2;
  font-size: 12px;
  color: #d0d0d0;
  margin: 8px auto 14px;
}
.sku-box .item .params-colors {
  margin-top: 23px;
  text-align: center;
}
.sku-box .item .colors-list {
  display: inline-block;
  overflow: hidden;
}
.sku-box .item .colors-list li {
  float: left;
  margin: 0 5px;
}
.sku-box .item .colors-list > li a {
  width: 8px;
  height: 8px;
  border: 1px solid #e5e5e5;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  padding: 2px;
  display: block;
}
.sku-box .item .colors-list > li a.active {
  box-shadow: inset 0 0 0 1px #b2b2b2;
  border-color: #b2b2b2;
}
.sku-box .item .colors-list > li img {
  width: inherit;
  height: inherit;
  border-radius: 50%;
  display: block;
}
.sku-box .item .item-btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 29px;
  text-align: center;
  opacity: 0;
  z-index: 10;
}
.sku-box .item:hover .item-btns {
  opacity: 1;
  transition: all 0.2s ease-in;
}
.sku-box .item .item-btns .item-blue-btn,
.sku-box .item .item-btns .item-disabled-btn,
.sku-box .item .item-btns .item-gray-btn,
.sku-box .item .item-btns .item-green-btn {
  display: inline-block;
  box-sizing: border-box;
  width: 100px;
  height: 30px;
  font-size: 12px;
  line-height: 28px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 200;
  transition: all 0.1s ease;
}
.sku-box .item .item-btns .item-gray-btn {
  border: 1px solid #d5d5d5;
  color: #646464;
}
.sku-box .item .item-btns .item-gray-btn a {
  display: block;
  color: #a1a1a1;
}
.sku-box .item .item-btns .item-gray-btn:hover {
  background-image: linear-gradient(#f6f6f6, #ededed);
}
.sku-box .item .item-btns .item-blue-btn {
  background-color: #5c85e5;
  background-image: linear-gradient(#779ae9, #5078df);
  border: 1px solid #5c81e3;
  color: #fff;
  margin-left: 10px;
}
.sku-box .item .item-btns .item-blue-btn:hover {
  border: 1px solid #5374c8;
  background-color: #5074db;
  background-image: linear-gradient(#6e8ed5, #4769c2);
}
.sku-box .item .item-btns .item-blue-btn:active {
  border: 1px solid #3e61d7;
  background-color: #5c85e5;
  background-image: linear-gradient(#4d72de, #6189e6);
}
.sku-box .item .item-price {
  font-family: Arial;
  color: #c30a18;
  margin-top: 24px;
  text-align: center;
  opacity: 1;
}
.sku-box .item .item-price i {
  font-size: 16px;
}
.sku-box .item .item-price span {
  font-size: 18px;
  padding-left: 4px;
}
.sku-box .item:hover .item-price {
  opacity: 0;
  transition: all 0.1s ease-out;
}
.sku-box .item .discount-icon {
  display: none;
}
.sku-box .item .item-cover a {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 20;
  width: 100%;
  height: 310px;
}
</style>