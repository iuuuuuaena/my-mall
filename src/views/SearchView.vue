<template>
  <div class="main-div">
    <div class="tag">
      <svg :width="width" :height="height" @mousemove="listener($event)">
        <a :key="index" rel="external nofollow" v-for="(tag,index) in tags">
          <text
            :x="tag.x"
            :y="tag.y"
            :font-size="20 * (600/(600-tag.z))"
            :fill-opacity="((400+tag.z)/600)"
            @click="s(tag.text)"
          >{{tag.text}}</text>
        </a>
      </svg>
    </div>
    <div class="input-search">
      <el-input placeholder="请输入模糊查询的内容" v-model="input" class="input-with-select">
        <!-- <el-select slot="prepend" placeholder="请选择查询" v-model="choose" @click="getItem(item.value)">
          <el-option
            :label="item.label"
            v-for="(item) in choose"
            :key="item.value"
            :value="item.value"
          ></el-option>
          <el-option label="商品ID" value="2"></el-option>
          <el-option label="商品描述信息" value="3"></el-option>
        </el-select> -->
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
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
  components: {
    ShopItemCom
  },
  data() {
    return {
      // 搜索框
      input: "",
      width: 500, //svg宽度
      height: 500, //svg高度
      tagsNum: 20, //标签数量
      RADIUS: 200, //球的半径
      speedX: Math.PI / 360, //球一帧绕x轴旋转的角度
      speedY: Math.PI / 360, //球-帧绕y轴旋转的角度
      //  https://www.jb51.net/article/168688.htm
      tags: [],
      goodsList: [],
      checked: 1,
      choose: [
        {
          label: "商品名称",
          value: 1
        },
        {
          label: "商品标签",
          value: 2
        }
      ],
      getValue: 0,
      getLabel: ""
    };
  },
  computed: {
    CX() {
      //球心x坐标
      return this.width / 2;
    },
    CY() {
      //球心y坐标
      return this.height / 2;
    }
  },
  //   初始化标签数据：
//   created() {
//     // //初始化标签位置
//     // let tags = [];
//     // for (let i = 0; i < this.tagsNum; i++) {
//     //   let tag = {};
//     //   let k = -1 + (2 * (i + 1) - 1) / this.tagsNum;
//     //   let a = Math.acos(k);
//     //   let b = a * Math.sqrt(this.tagsNum * Math.PI); //计算标签相对于球心的角度

//     //   tag.x = this.CX + this.RADIUS * Math.sin(a) * Math.cos(b); //根据标签角度求出标签的x,y,z坐标
//     //   tag.y = this.CY + this.RADIUS * Math.sin(a) * Math.sin(b);
//     //   tag.z = this.RADIUS * Math.cos(a);
//     //   //   tag.href = thi; //给标签添加链接
//     //   tags.push(tag);
//     // }
//     // this.tags = tags; //让vue替我们完成视图更新
//   },
  methods: {
      setActive(data) {
      this.checked = data;
    },
    //   点击一个图标，就在搜索框上加上
    s(data) {
      this.input = data;
      this.getValue = 2;
      this.getLabel = data
    },
    getItem(val) {
      //传进来的val是select组件选中的value值，也就是一个fruitEnName
      var obj = {};
      obj = this.choose.find(item=> {
        return item.value === val;
      });
      //obj 就是被选中的那个对象，也就能拿到label值了。
      console.log(obj.value); //label值
      console.log(val); //value值
      this.getValue = val;
      this.getLabel = obj.value;
    },
    getO(){

    },
    showAllTag() {
      this.$axios({
        url: "/api/showAllTag",
        methods: "get"
      }).then(res => {
        console.log("所有标签");
        console.log(res);
        let tags = [];
        res.data.forEach((value, index) => {
            // 如果标签为空就跳过
          if (value == null) {
            return;
          }
          let tag = {};
          let k = -1 + (2 * (index + 1) - 1) / res.data.length;
          let a = Math.acos(k);
          let b = a * Math.sqrt(res.data.length * Math.PI); //计算标签相对于球心的角度
          tag.text = value;
          tag.x = 250 + 200 * Math.sin(a) * Math.cos(b); //根据标签角度求出标签的x,y,z坐标
          tag.y = 250 + 200 * Math.sin(a) * Math.sin(b);
          tag.z = 200 * Math.cos(a);
          //   tag.href = thi; //给标签添加链接
          tags.push(tag);
        });
        // tags = Array.from(new Set(tags));
        this.tags = tags;
      });
    },
    search() {
      if (this.getValue == 1 || this.getValue == 0) {
        //   this.$message.success(this.select);
        this.$axios({
          url: "/api/goodsName",
          methods: "get",
          params: {
            name: this.input
          }
        }).then(res => {
          console.log(res);
          this.goodsList = res.data;
        });
      } else {
        this.$axios({
          url: "/api/goodsByTag",
          methods: "get",
          params: {
            goods_tag: this.getLabel
          }
        }).then(res => {
          console.log(res);
          this.goodsList = res.data;
        });
      }
    },
    rotateX(angleX) {
      var cos = Math.cos(angleX);
      var sin = Math.sin(angleX);
      for (let tag of this.tags) {
        var y1 = (tag.y - this.CY) * cos - tag.z * sin + this.CY;
        var z1 = tag.z * cos + (tag.y - this.CY) * sin;
        tag.y = y1;
        tag.z = z1;
      }
    },
    rotateY(angleY) {
      var cos = Math.cos(angleY);
      var sin = Math.sin(angleY);
      for (let tag of this.tags) {
        var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
        var z1 = tag.z * cos + (tag.x - this.CX) * sin;
        tag.x = x1;
        tag.z = z1;
      }
    },
    listener(event) {
      //响应鼠标移动
      var x = event.clientX - this.CX;
      var y = event.clientY - this.CY;
      this.speedX =
        x * 0.0001 > 0
          ? Math.min(this.RADIUS * 0.00001, x * 0.0001)
          : Math.max(-this.RADIUS * 0.00001, x * 0.0001);
      this.speedY =
        y * 0.0001 > 0
          ? Math.min(this.RADIUS * 0.00001, y * 0.0001)
          : Math.max(-this.RADIUS * 0.00002, y * 0.0001);
    }
  },

  mounted() {
     //使球开始旋转
    setInterval(() => {
      this.rotateX(this.speedX);
      this.rotateY(this.speedY);
    }, 17);
    // 显示所有标签
    this.showAllTag();
   
  }
};
</script>


<style scoped>
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

.main-div {
  width: 1200px;
  margin: 0 auto;
}

.input-search {
  width: 600px;
  margin: 0 auto;
}

.tag {
  width: 600px;
  margin: 0 auto;
}
</style>