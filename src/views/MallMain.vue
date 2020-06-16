<template>
  <div class="main">
    <div>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(item,index) in myImage" :key="index">
          <h3>
            <img :src="'http://121.89.208.41:8080'+item.path" alt="#" />
          </h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="sku-box store-content">
      <div class="sort-option">
        <ul class="line clear">
          <li>
            <a href="javascript:;" :class="{'active':checked == 1}" @click="setActive(1)">综合排序</a>
          </li>
          <li>
            <a href="javascript:;" :class="{'active':checked == 2}" @click="setActive(2)">销量排序</a>
          </li>
          <li>
            <a href="javascript:;" :class="{'active':checked == 3}" @click="setActive(3)">价格低到高</a>
          </li>
          <li>
            <a href="javascript:;" :class="{'active':checked == 4}" @click="setActive(4)">价格高到低</a>
          </li>
        </ul>
      </div>

      <div class="gray-box">
        <div class="item-box">
          <!-- 遍历小组件，把所有商品显示出来 -->
          <shop-item-com :key="index" v-for="(item,index) in goodsList" :item="item"></shop-item-com>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import ShopItemCom from "@/components/ShopItemCom.vue";
export default {
  data() {
    return {
      // 商品列表
      goodsList: [],
      checked: 1,
      // 轮播图image
      myImage:this.$store.state.myImage,
    };
  },
  components: {
    ShopItemCom
  },
  methods: {
    setActive(data) {
      this.checked = data;
    },
    show() {
      alert(this.$store.state.imgList);
    },
    getImage() {
      this.$axios({
        url: "/api/getAllImage",
        methods: "get"
      }).then(res => {
        // console.log(res);
        if (res.status == 200) {
          this.$store.state.myImage = res.data
        }
      });
    },
    getGoodsList() {
      this.$axios({
        url: "/api/goodsList",
        methods: "post"
      }).then(res => {
        if (res.status == 200) {
          this.$store.state.goodsList = res.data;
          this.goodsList = res.data;
        }
      });
    }
  },
  watch: {
    //// 检测商品排序选中的状态
    checked() {
      if (this.checked == 2) {
      } else if (this.checked == 3) {
      } else if (this.checked == 4) {
      }
    }
  },
  mounted() {
    this.getGoodsList();
     this.getImage();
  }
};
</script>

<style>
.main {
  width: 1200px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.sku-box {
  position: relative;
}
.sort-option {
  border-top: 1px solid #d8d8d8;
  color: #999;
}
.sort-option ul {
  height: 60px;
  line-height: 60px;
}
.sort-option li {
  position: relative;
  float: left;
  padding-left: 42px;
}
.sort-option li:first-child {
  padding-left: 9px;
}
.sort-option li:before {
  content: " ";
  display: block;
  position: absolute;
  left: 20px;
  top: 50%;
  width: 2px;
  height: 2px;
  margin-top: -1px;
  background: #c7c7c7;
}
.sort-option li:first-child:before {
  display: none;
}
.sort-option a {
  display: block;
  font-size: 12px;
  color: #999;
}
.sort-option a.active,
.sort-option a:hover {
  color: #5683ea;
}
.gray-box {
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}
.sku-box .item-box {
  clear: both;
  overflow: hidden;
  margin: 0 -1px -1px -1px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.gray-box {
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}
.item-box {
  clear: both;
  overflow: hidden;
  margin: 0 -1px -1px -1px;
}
</style>