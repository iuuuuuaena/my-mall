<template>
  <!-- 发布商品的页面 -->
  <div class="publish-goods">
    <!-- 表单 -->
    <div class="publish-center">
      <el-form :model="goodsData" :rules="rules">
        <!-- 表单项 -->
        <el-form-item label="商品名" prop="good_name">
          <el-input v-model="goodsData.goods_name"></el-input>
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item label="商品信息" prop="goods_info">
          <el-input
            type="textarea"
            v-model="goodsData.goods_info"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入商品具体描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品照片上传">
          <img id="icon" v-if="isShow" :src="'http://121.89.208.41:8080'+goodsData.goods_image" />
          <input name="file" form="form2" type="file" class="form-control" />
          <input
            class="btn btn-sm btn-success"
            form="form2"
            id="fileBtn"
            value="上传"
            type="button"
            @click="uploadImg()"
          />
          <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          <!-- </el-upload>
                </el-form-item>
              </el-form>
          -->
          <form id="form2" method="post" enctype="multipart/form-data"></form>
          <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>-->
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item label="商品价格">
          <el-input label-width="100px" v-model="goodsData.goods_price" placeholder="请输入商品价格"></el-input>
        </el-form-item>

        <!-- 表单项 -->
        <el-form-item label="商品标签">
          <el-input v-model="goodsData.goods_tag" placeholder="商品标签"></el-input>
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

import FileUploadCom from "@/components/FileUploadCom";
export default {
  data() {
    const goodsNameValidator = (rule, value, callback) => {
      if (value.length > 3) {
        callback();
      } else {
        callback(new Error("商品名长度大于2"));
      }
    };
    return {
      // 是否显示图片
      isShow: false,
      // 商品的数据
      goodsData: {
        user_nickname: "",
        user_account: "",
        goods_name: "",
        goods_price: 0,
        goods_image: "",
        goods_info: "",
        goods_tag: "",
        id_deal: 0
      },
      rules: {
        goods_name: [
          // blur  :退出就会提示
          // change ：一改变就会提示
          { required: true, trigger: "change", message: "不能为不可识别内容" },
          { validator: goodsNameValidator, trigger: "change" }
        ]
      },
      // 文件的
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    
    onSubmit() {
      console.log(this.goodsData);
      this.$axios({
        url: "/api/publishGood",
        methods: "get",
        params: this.goodsData
      }).then(res => {
        if (res.data.code == 606) {
          this.$message.success("商品上传成功");
        }else{
           this.$message.error("商品上传失败");
        }
      });
    },
    uploadImg() {
      var formData = new FormData($("#form2")[0]);
      var newImagePath = "";
      var x = false;
      $.ajax({
        async: false,
        cache: false,
        type: "post",
        data: formData,
        url: "/api/dUpload",
        dataType: "json",
        contentType: false, //必须
        processData: false, //必须
        success: function(data) {
          // console.log("上传文件成功:" + data);
          // console.log(data);

          // $("#icon").attr(
          //   "src",
          //   "http://121.89.208.41:8080/asserts" + data.path
          // );
          if (data.path != null) {
            newImagePath = "/asserts" + data.path;
            x = true;
          }
          // $("#icon").attr("value", "http://121.89.208.41:8080" + data.path);
          // alert("success: " + data);
        },
        error: function(arg1, arg2, arg3) {
          // console.log(arg1 + "--" + arg2 + "--" + arg3);

          x = false;
        }
      });
      if (x == true) {
        this.isShow = true;
        this.$message.success("图片上传成功");
      } else {
        this.$message.error("图片上传错误，请联系管理员");
      }
      this.goodsData.goods_image = newImagePath;

      // this.changeImage(newImagePath);
    },
    getCookie() {
      //读取cookie
      //读取cookie
      // console.log("获取cookie");
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        // console.log(arr);
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          if (arr2[0] == "user_nickname") {
            // console.log(arr2[1]);
            this.goodsData.user_nickname = arr2[1];
          } else if (arr2[0] == "user_account") {
            // console.log(arr2[1]);
            this.goodsData.user_account = arr2[1];
          }
        }
      }
    }
  },
  components: {
    FileUploadCom
  },
  mounted() {
    this.getCookie();
  }
};
</script>

<style lang="less"  scoped>
.clearfix:after {
  /*添加一个内容*/
  content: "";
  /*转换为一个块元素*/
  display: block;
  /*清除两侧的浮动*/
  clear: both;
}
/* 总div */
.publish-goods {
  position: absulate;
  width: 1200px;
  left: 50%;
  margin: 0 auto;
  background: rgb(255, 255, 255);
  padding: 0 10px;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.publish-center {
  width: 80%;
  margin: 0 auto;
}
.ccccc {
  height: 200px;
}
.each-input {
  height: 100px;
  /* text-align: center; */
  line-height: 100px;
  margin: 0 30px;
}
.each-input span {
  font-size: 15px;
}

.input-css {
  margin: 5px 5px;
  background-color: rgb(184, 177, 177);
  height: 55px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  border-radius: 15px;
  padding: 0 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
}

.goods-info {
  height: 200px;
}
/* 每一个表单项 的div属性*/
.module-form-row {
  position: relative;
  padding-bottom: 10px;
  margin: 0 auto;
}

.form-item-v3 {
  position: relative;
  height: 46px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 7px;
  box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
    -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
  line-height: 46px;
  font-size: 18px;
  opacity: 0.618;
  transition: opacity 0.3s ease;
}
form-item-v3:after {
  position: absolute;
  right: 13px;
  top: 50%;
  z-index: 11;
  height: 26px;
  padding: 0 10px;
  margin-top: -13px;
  background: #d16d62;
  border-radius: 4px;
  line-height: 26px;
  font-size: 12px;
  color: #fff;
  visibility: hidden;
  content: "手机号格式错误";
  opacity: 0;
  transition: all 0.3s ease-in;
}
.image {
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>