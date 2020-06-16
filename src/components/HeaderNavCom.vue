<template>
  <div id="header">
    <div class="nav-global">
      <div class="container">
        <h1 class="nav-logo">
          <router-link to="/"></router-link>
          <a href="javascript:;"></a>
        </h1>
        <ul class="nav-aside">
          <li class="nav-user">
            <router-link to="/account">个人中心</router-link>
            <!--active-->
            <!--  个人 信息 -->
            <div class="nav-user-wrapper">
              <div class="nav-user-list">
                <dl class="nav-user-avatar">
                  <dd>
                    <span class="ng-scope"><img :src="'http://121.89.208.41:8080'+this.$store.state.loginStatus.user_icon" alt=""></span>
                  </dd>
                  <dt class="ng-binding">用户：{{this.$store.state.loginStatus.user_account}}</dt>
                </dl>
                <ul>
                  <!-- 各种操作 -->
                  <li class="order">
                    <router-link to="/order" exact>我的订单</router-link>
                  </li>
                  <li class="support">
                    <a href="http://www.jxdgogogo.xyz">售后服务</a>
                  </li>

                  <li class="information">
                    <router-link to="/account" exact>账户资料</router-link>
                  </li>
                  <li class="address">
                    <router-link to="/address">收货地址</router-link>
                  </li>
                  <li class="logout">
                    <a href="javascript:;" @click="logout">退出</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <!--active-->
          <!-- 购物车组件 -->
          <car-panel-com class="nav-cart"></car-panel-com>
        </ul>
        <ul class="nav-list">
          <li>
            <router-link to="/">模糊商城主页</router-link>
          </li>
          <li>
            <router-link to="/search">搜索商品</router-link>
          </li>
          
          <li>
            <router-link to="/publish">发布商品</router-link>
          </li>

          <li>
            <router-link to="/chat">群聊</router-link>
          </li>
          <li>
            <a href="http://www.jxdgogogo.xyz">联系管理员</a>
          </li>
          <li>
            <router-link v-show="this.$store.state.isLogin" to="/Login">去登录</router-link>
          </li>
          <li>
            <router-link v-show="this.$store.state.isLogin" to="/Register">去注册</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="nav-sub">
      <div class="nav-sub-wrapper">
        <div class="container">
          <ul class="nav-list">
            <li>
              <router-link to="/" exact tag="li" activeClass="active">
                <a>商品首页</a>
              </router-link>
            </li>
            <li>
              <router-link to="/all" exact tag="li" activeClass="active">
                <a>全部商品</a>
              </router-link>
            </li>
            <router-link to="/shop" exact tag="li" activeClass="active">
              <a>最新上架</a>
            </router-link>
            <li>
              <!-- <a href="javascript:;">电子产品</a> -->
            </li>
            <!-- <li>
              <a href="javascript:;">日常用品</a>
            </li>
            <li>
              <a href="javascript:;">衣服箱子</a>
            </li>
            <li>
              <a href="javascript:;">户外用品</a>
            </li>
            <li>
              <a href="javascript:;">水产干货</a>
            </li>
            <li>
              <a href="javascript:;">售后服务</a>
            </li>-->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//  导入购物车弹出框组件
import CarPanelCom from "@/components/CarPanelCom.vue";
export default {
  components: {
    CarPanelCom
  },
  methods: {
    logout() {
      this.$axios({
        url: "/api/u/logout",
        methods: "get"
      }).then(res => {
        console.log("已经退出登录");
        console.log(res);
        if (res.data.code == 1011) {
          this.$message.success("退出成功");
        } else {
          this.$message.error("未知错误");
        }
      });
      this.$store.state.isLogin = true;
      this.$router.push({ name: "Login" });
      this.isLogin = true;
      this.$store.state.loginStatus = {};
    },//读取cookie
    getCookie: function() {
      //读取cookie
      //读取cookie
      // console.log("获取cookie");
  
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        // console.log(arr);
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "user_account") {
            this.ruleForm.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "user_image") {
            this.ruleForm.password = arr2[1];
          }
        }
      }
    },
  },
  data() {
    return {
      isLogin: this.$store.state.isLogin
    };
  },
  mounted(){
    // this.getCookie()
  }
};
</script>

<style lang="less" scoped>
.ng-scope img{
  width:50px;
  height:50px;
  border-radius:25px;
}
</style>
