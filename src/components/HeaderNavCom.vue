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
                    <span class="ng-scope"></span>
                  </dd>
                  <dt class="ng-binding">+86 138****9453</dt>
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
            <router-link to="/Login">去登录</router-link>
          </li>
          <li>
            <router-link to="/Register">去注册</router-link>
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
  },methods:{
    logout(){

    }
  }
};
</script>
