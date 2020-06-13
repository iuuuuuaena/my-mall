<template>
  <div class="account-content">
    <div class="account-order">
      <div class="gray-box">
        <div class="title columns-title pre-title">
          <h2>我的订单</h2>
          <div class="gray-btn-menu sort-status-menu">
            <span class="label">
              <i class="arrow"></i> 全部状态
            </span>
            <ul class="menu-list">
              <li class="selected">
                <a href="javascript:;">全部状态</a>
              </li>
              <li class>
                <a href="javascript:;">未完成</a>
              </li>
              <li class>
                <a href="javascript:;">已完成</a>
              </li>
              <li class>
                <a href="javascript:;">已关闭</a>
              </li>
            </ul>
          </div>
          <div class="gray-btn-menu sort-time-menu -gray-btn-menu-on">
            <span class="label">
              <i class="arrow"></i> 最近三个月
            </span>
            <ul class="menu-list">
              <li class="selected">
                <a href="javascript:;">最近三个月</a>
              </li>
              <li class>
                <a href="javascript:;">今年内</a>
              </li>
              <li class>
                <a href="javascript:;">2016年</a>
              </li>
              <li class>
                <a href="javascript:;">2015年</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="js-list-inner">
          <div
            class="box-inner order-cart order-list-cart clear"
            v-for="(order,index) in orderData"
            :key="index"
          >
            <div class="gray-sub-title cart-title">
              <span class="date">{{order.iDate}}</span>
              <span class="order-id">
                订单号：
                <a href="javascript:;">{{order.orderId}}</a>
              </span>
              <span class="order-detail">
                <router-link :to="{name: 'Payment', query: {orderId:order.orderId}}">查看详情&gt;</router-link>
              </span>
              <span class="sub-total">应付总额</span>
              <span class="operation">商品操作</span>
              <span class="num">数量</span>
              <span class="price">单价</span>
            </div>
            <div class="cart">
              <div class="cart-items clear" v-for="(item,index) in order.goodsData" :key="index">
                <div class="prod-info clear">
                  <div class="items-thumb">
                    <a href="javascript:;" target="_blank">
                      <img
                        :src="'http://121.89.208.41:8080'+item.goods_image+'?x-oss-process=image/resize,w_80/quality,Q_100/format,webp'"
                      />
                    </a>
                  </div>
                  <div class="items-params clear">
                    <div class="name vh-center">
                      <a
                        href="javascript:;"
                        target="_blank"
                        :title="item.goods_name+'（'+item.goods_name+'）'"
                      >{{item.goods_name}}（{{item.goods_name}}）</a>
                    </div>
                    <div class="detail"></div>
                  </div>
                  <div class="operation">
                    <div class="operation-list"></div>
                  </div>
                  <div class="num">{{item.count}}</div>
                  <div class="price">¥ {{item.goods_price}}.00</div>
                </div>
              </div>
            </div>
            <div class="prod-operation">
              <div class="total">¥ {{order.price+order.freight}}.00</div>
              <div class="status">
                <router-link
                  :to="{name: 'Payment', query: {orderId:order.orderId}}"
                  class="blue-small-btn js-payment-order"
                  v-if="order.isPay"
                >现在付款</router-link>
                <span v-else>已完成</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      theOrder: {
        order_id: "",
        order_data: "",
        goods_data: {},
        order_price: 0,
        order_freight: 0
      },
      userInfo: {
        user_name: "",
        user_account: ""
      },
      allOrder: []
    };
  },
  computed: {
    orderData() {
      return this.$store.state.orderData;
    }
  },
  methods: {
    //读取cookie
    getCookie() {
      //读取cookie
      //读取cookie
      // console.log("获取cookie");
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        // console.log(arr);
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          if (arr2[0] == "user_name") {
            // console.log(arr2[1]);
            this.userInfo.user_name = arr2[1];
          } else if (arr2[0] == "user_account") {
            // console.log(arr2[1]);
            this.userInfo.user_account = arr2[1];
          }
        }
      }
    },
    getGoods(id) {
      this.$axios({
        url: "/api/orderById",
        methods: "get",
        params: {
          id: id
        }
      }).then(res => {
        // console.log("这里是所有的商品信息");
        // console.log(res);
        this.theOrder.goods_data = res.data;
      });
    }
  },
  //   在页面加载之前，获取url里的数据
  mounted() {
    this.getCookie();
    // http://localhost:8081/order?charset=utf-8&out_trade_no=1591840494183&method=alipay.trade.page.pay.return&total_amount=100.00&sign=REIpCWXyEFmJ8cjsozXkDcfd9o5QlQ%2B4b5qY9Nat27NkIKxy2YKhNSRlzQnsqfH1gV8fDvFYMxDbDdxphyA8jWwdexCeykBbxN1ARs8azAiraxV5sUlhYcy53m17obfLjaaGvd3Eo3TEwxKOkHiMMMaT1qjap4bswDq0zlMQdxLFXYnDPoVlcu2AKcpD%2BWdOrpI9Q5eaVBFL5Tw%2FMlQoSkYyTiCCRrZEjBUhkzeYbYnlJUZ8kDO%2F7rjPQVdjpAN9YJhP8Rlthg91dWpUHnKyiDaeTSOBj8ecNxNOO11qXaVOgoAAlPfkHhc%2FU%2BYadnNIl6rLtS2ogj9Oc99rFEuntw%3D%3D&trade_no=2020061122001499810501113034&auth_app_id=2016102800774655&version=1.0&app_id=2016102800774655&sign_type=RSA2&seller_id=2088102181358531&timestamp=2020-06-11%2009%3A55%3A18
    // console.log(this.$route.query.out_trade_no);
    // console.log(this.$route.query.total_amount);
    // console.log(this.$route.query.timestamp);
    // console.log(this.$route.query.seller_id);

    // this.theOrder.order_id = this.$route.query.out_trade_no;
    // this.theOrder.order_price = this.$route.query.total_amount;
    // this.theOrder.order_data = this.$route.query.timestamp;
    // // 查询订单所有的商品
    // this.getGoods(this.theOrder.order_id);
    // console.log("这是orderData");
    // console.log(this.$store.state.orderData);
    //

    // console.log("在订单界面，这个user-accoun为：");
    this.$store.state.loginStatus.user_account = this.userInfo.user_account;
    // console.log(this.$store.state.loginStatus.user_account);
    this.$axios({
      url: "/api/getOrderByAccount",
      methods: "get",
      params: {
        user_account: this.$store.state.loginStatus.user_account
      }
    }).then(res => {
      // console.log("上搜索大所多撒");
      // console.log(res);
      // this.allOrder = res.data
      // this.$store.state.orderData = res.data;
      res.data.forEach((order, index) => {
        // console.log(this.$store.state.orderData[index].goodsData);
        var x = {};
        x.orderId = order.order_id;
        x.iDate = order.order_date;
        // 存放传回来的goods信息的
        var d = [];
        this.$axios({
          url: "/api/findAllGoodsOfOrder",
          methods: "get",
          params: {
            order_id: order.order_id
          }
        }).then(res => {
          // console.log(res);
          if (res.data.code == 613) {
            res.data.data.forEach((good, i) => {
              var e = {};
              e.goods_name = res.data.data[i].goods_name;
              e.goods_price = res.data.data[i].goods_price;
              e.goods_image = res.data.data[i].goods_image;
              e.count = res.data.data[i].goods_number;
              d.push(e);
            });
          } else {
            this.$message.error("其他错误！！！");
          }
        });
        // console.log(d);
        x.goodsData = d;
        x.price = order.order_price;
        x.freight = 0;
        // this.$store.state.orderData[index].goodsData = {
        //    goods_name: order.order_info,
        //     goods_image: order.order_info,
        //     goods_parice:order.order_price,
        //     count:1

        // }
        this.$store.state.orderData.push(x);
      });
    });
  }
};
</script>

<style>
.account-order .gray-box {
  margin-bottom: 20px;
}
.gray-box .columns-title h2 {
  float: left;
}
.gray-btn-menu {
  display: inline-block;
  height: 36px;
  background: #f2f2f2;
  background: linear-gradient(#fff, #f5f5f5);
  border: 1px solid #dbdde2;
  border-radius: 4px;
  line-height: 36px;
  cursor: pointer;
  text-align: center;
  user-select: none;
}
.account-order .sort-status-menu {
  width: 112px;
}
.gray-box .title .gray-btn-menu,
.gray-box .title span.gray-normal-btn {
  margin: 10px 0 0 10px;
}
.gray-box .title .gray-btn-menu {
  overflow: visible;
  float: right;
}
.gray-btn-menu .label {
  position: relative;
  z-index: 1;
  display: block;
  padding: 0 13px 0 16px;
  text-align: left;
  color: #666;
}
.gray-box .title .gray-btn-menu .label {
  overflow: visible;
  float: none;
  margin-top: 0;
}
.gray-btn-menu .label .arrow {
  float: right;
  width: 10px;
  height: 7px;
  margin: 16px 0 0 6px;
  background: url(../../assets/img/btn-icon-new.png) -15px -571px no-repeat;
}
.gray-btn-menu .menu-list {
  display: none;
  position: absolute;
  right: -1px;
  top: -1px;
  width: 100%;
  padding: 38px 0 6px;
  background: #fff;
  border: 1px solid #dbdde2;
  border-radius: 4px;
  box-shadow: 0 1px 3px 0 #eee;
}
.gray-btn-menu-on .menu-list,
.white-btn-menu-on .menu-list {
  display: block;
}
.gray-btn-menu .menu-list li {
  height: 24px;
  line-height: 24px;
  padding: 0 3px 3px;
  text-align: left;
  font-size: 12px;
}
.gray-btn-menu .menu-list li a {
  display: block;
  padding: 0 15px;
  border-radius: 3px;
  color: #999;
}
.gray-btn-menu .menu-list li a:hover {
  background: #c7c7ca;
  color: #fff;
}
.gray-btn-menu .menu-list li.selected a {
  background: #8f9096;
  color: #fff;
  cursor: default;
}
.account-order .sort-time-menu {
  width: 118px;
}
.gray-btn-menu-on .label .arrow,
.white-btn-menu-on .label .arrow {
  margin-top: 15px;
  background-position: -15px -521px;
}
.gray-btn-menu-on,
.white-btn-menu-on {
  position: relative;
  z-index: 10;
  height: auto;
  background: #fff;
}
.gray-btn-menu-on {
  border: 1px solid #dbdde2;
}
.gray-box,
.gray-btn-menu-on:hover {
  background: #fff;
}
.gray-box .gray-sub-title {
  height: 38px;
  padding: 0 24px;
  background: #eee;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  line-height: 38px;
  font-size: 12px;
  color: #666;
}
.account-order .gray-box .box-inner:first-child .gray-sub-title {
  border-top: none;
}
.order-list-cart .cart-title span {
  float: right;
  text-align: center;
}
.order-list-cart .cart-title .operation,
.order-list-cart .cart-title .order-detail,
.order-list-cart .cart-title .sub-total {
  float: right;
}
.order-list-cart .cart-title .date,
.order-list-cart .cart-title .order-id {
  float: left;
  text-align: left;
}
.order-list-cart .cart-title .date {
  width: 108px;
  padding-left: 6px;
}
.order-list-cart .cart-title .order-detail {
  width: 82px;
  padding-left: 24px;
  text-align: center;
}
.order-list-cart .cart-title .sub-total {
  width: 102px;
  padding-right: 18px;
  border-left: 1px solid #dbdbdb;
  text-align: right;
}
.order-list-cart .cart-title .operation {
  width: 95px;
  height: 38px;
  padding-right: 23px;
}
.order-list-cart .cart-title .num {
  width: 70px;
}
.order-list-cart .cart-title .price {
  width: 85px;
  padding-right: 27px;
  text-align: right;
}
.gray-box .gray-sub-title a {
  color: #6989e0;
}
.order-list-cart .cart {
  float: left;
  width: 737px;
  padding: 0;
  border-right: 1px solid #ebebeb;
}
.order-cart .cart-items {
  position: relative;
  padding: 18px 0 28px;
  border-top: 1px solid #efefef;
}
.order-list-cart .cart-items {
  height: 110px;
  padding: 0;
}
.order-cart .cart-items:first-child {
  border-top: none;
}
.order-cart .prod-info {
  position: relative;
  margin-left: 138px;
}
.order-list-cart .prod-info {
  padding: 15px 0 15px 111px;
  margin-left: 0;
  position: relative;
}
.order-list-cart .items-thumb {
  position: absolute;
  left: 30px;
  top: 15px;
  width: 78px;
  height: 78px;
  border: 1px solid #ebebeb;
  border-radius: 3px;
}
.order-list-cart .items-thumb img {
  width: 78px;
  height: 78px;
}
.order-list-cart .items-params {
  float: left;
  height: 50px;
  padding: 15px 0;
  margin-left: 29px;
  border-bottom: none;
  line-height: 25px;
}
.order-cart .items-params .name {
  overflow: hidden;
  float: left;
  color: #666;
  width: 435px;
  height: 44px;
  text-align: left;
}
.order-list-cart .prod-info .name {
  float: none;
  width: 220px;
  height: 25px;
  line-height: 25px;
}
.order-list-cart .prod-info .vh-center {
  height: auto;
  line-height: 50px;
}
.hide-row,
.order-cart .items-params .name,
.support-cart .items-detail .detail {
  text-overflow: ellipsis;
  white-space: nowrap;
}
.order-list-cart .prod-info .num,
.order-list-cart .prod-info .operation,
.order-list-cart .prod-info .price,
.order-list-cart .prod-info .subtotal {
  float: right;
  line-height: 80px;
  text-align: center;
}
.order-list-cart .prod-info .operation {
  display: table;
  width: 95px;
  height: 80px;
  padding-right: 23px;
  line-height: 25px;
}
.order-list-cart .prod-info .num {
  width: 70px;
}
.order-list-cart .prod-info .price {
  width: 85px;
  padding-right: 27px;
  text-align: right;
}
.order-list-cart .prod-operation {
  float: right;
  display: table;
  height: 110px;
}
.order-list-cart .prod-operation .total {
  display: table-cell;
  padding-right: 18px;
  line-height: 14px;
  text-align: right;
  vertical-align: middle;
}
.order-list-cart .prod-operation .status {
  display: table-cell;
  width: 80px;
  padding: 0 24px;
  text-align: center;
  vertical-align: middle;
}
.blue-small-btn,
.orange-small-btn,
.white-gray-small-btn {
  display: inline-block;
  height: 30px;
  padding: 0 13px;
  border-radius: 4px;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}
.blue-small-btn {
  background: #6383c6;
  background: linear-gradient(#7ea3f5, #5a82f0);
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.1) inset,
    0 0 0 1px rgba(0, 0, 0, 0.2) inset, 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #fff;
}
.blue-small-btn:hover {
  box-shadow: 0 1px 1px #7696de inset, 0 0 2px #627dca inset,
    0 -2px 3px #5a77c7 inset, 0 0 100px rgba(48, 77, 147, 0.4) inset,
    0 0 0 1px rgba(0, 0, 0, 0.3) inset, 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #fff;
}
</style>
