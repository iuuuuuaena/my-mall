<template>
  <!-- 发布商品的页面 -->
  <div class="publish-goods">
    <!-- 表单 -->
    <div class="publish-center">
      <el-form :model="PublishedGoodsData" :rules="rules">
        <!-- 表单项 -->
        <el-form-item label="商品名" prop="goods_name">
          <el-input v-model="PublishedGoodsData.goods_name"></el-input>
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item label="商品信息" prop="goods_info">
          <el-input
            type="textarea"
            v-model="PublishedGoodsData.goods_info"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入商品具体描述"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品照片上传">
          <el-upload
            action="http://121.89.208.41:8080/mUpload/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <!-- 表单项 -->
        <el-form-item label="商品价格">
          <el-input
            label-width="100px"
            v-model="PublishedGoodsData.goods_name"
            placeholder="请输入商品价格"
          ></el-input>
        </el-form-item>

        <!-- 表单项 -->
        <el-form-item label="商品标签">
          <el-select v-model="PublishedGoodsData.goods_tag" placeholder="商品标签">
            <el-option label="电子数码" value="电子数码"></el-option>
            <el-option label="服装首饰" value="服装首饰"></el-option>
            <el-option label="电子数码" value="电子数码"></el-option>
            <el-option label="服装首饰" value="服装首饰"></el-option>
            <el-option label="电子数码" value="电子数码"></el-option>
            <el-option label="服装首饰" value="服装首饰"></el-option>
            <el-option label="电子数码" value="电子数码"></el-option>
            <el-option label="服装首饰" value="服装首饰"></el-option>
            <el-option label="电子数码" value="电子数码"></el-option>
            <el-option label="服装首饰" value="服装首饰"></el-option>
          </el-select>
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
      // 商品的数据
      PublishedGoodsData: {
        user_nickname: "1231",
        user_account: "",
        goods_id: 0,
        goods_name: "",
        goods_price: 0,
        goods_image: "",
        goods_info: "",
        goods_tag: "",
        id_deal: 1
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
    // 发布商品
    publishGoods() {},
    onSubmit() {
      console.log(this.PublishedGoodsData);
    },
    // 文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  components: {
    FileUploadCom
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