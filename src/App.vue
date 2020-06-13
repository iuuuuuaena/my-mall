<template>
  <div id="app">
    <header-nav-com></header-nav-com>
    <!-- <el-button>el-button</el-button> -->
    <router-view></router-view>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
import HeaderNavCom from "@/components/HeaderNavCom.vue";

export default {
  name: "app",
  components: {
    HeaderNavCom
  },
  mounted() {
    window.addEventListener("unload", this.saveState);
  },
  methods: {
    saveState() {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    }
  }
};
</script>

<style>
</style>
