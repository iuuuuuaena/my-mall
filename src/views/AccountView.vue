<template>
  <!-- 把个人界面左侧抽象成一个组件 -->
  <div id="main">
    <div class="content clear">
      <div class="account-wrapper">
        <div class="account-sidebar">
          <div class="avatar gray-box clear">
            <div class="js-account-sidebar-info">
              <!-- <el-form>
                <el-form-item>
                  <el-upload
                    class="avatar-uploader"
                    action="http://admin.jxdgogogo.xyz:8080/mUpload/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :limit="1"
                    ref="upload"
              >-->
              <!--  v-if="!imageUrl"   -->
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
              <img id="icon" :src="'http://121.89.208.41:8080'+this.userInfo.user_icon" />
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
            </div>
            <div class="box-inner">
              <ul class="account-nav">
                <router-link :to="{name: 'UserInfo'}" tag="li" activeClass="current">
                  <a>个人信息</a>
                </router-link>
                <router-link :to="{name: 'Account'}" exact tag="li" activeClass="current">
                  <a>我的订单</a>
                </router-link>
                <router-link :to="{name: 'Address'}" tag="li" activeClass="current">
                  <a>收货地址</a>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
        <!-- 这里显示 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      userInfo: {
        user_icon: "",
        user_account: ""
      }
      // imageUrl:'http://121.89.208.41:8080'+this.userInfo.user_icon
    };
  },
  methods: {
     changeImage(data) {
      this.$axios({
        url: "/api/changeImage",
        methods: "get",
        params: {
          user_account: this.userInfo.user_account,
          new_image: data
        }
      }).then(res => {
        // console.log(res);
        if (res.data.code == 1013){
          this.$message.error("头像上传失败")
        }else if(res.data.code == 1014){
           this.$message.success("头像上传成功")
        }else{
          this.$message.error("其他未知错误，可能是网络原因！")
        }
      });
    },
    //   成功之后
    handleAvatarSuccess(res, file) {
      this.imageUrl =
        "http://121.89.208.41:8080/root/my-management-img/" +
        URL.createObjectURL(file.raw);
    },
    // 在图片上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    uploadImg() {
      var formData = new FormData($("#form2")[0]);
      var newImagePath = ""
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
          $("#icon").attr(
            "src",
            "http://121.89.208.41:8080/asserts" + data.path
          );
          if (data.path != null) {
            newImagePath = "/asserts"+data.path
          }

          // $("#icon").attr("value", "http://121.89.208.41:8080" + data.path);
          // alert("success: " + data);
          this.$message.success("成功")
        },
        error: function(arg1, arg2, arg3) {
          // console.log(arg1 + "--" + arg2 + "--" + arg3);
        }
      });
      this.changeImage(newImagePath)
    },
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
          if (arr2[0] == "user_icon") {
            // console.log(arr2[1]);
            this.userInfo.user_icon = arr2[1];
          } else if (arr2[0] == "user_account") {
            // console.log(arr2[1]);
            this.userInfo.user_account = arr2[1];
          }
        }
      }
    },
   
  },
  mounted() {
    this.getCookie();
  }
};
</script>

<style>
.content {
  clear: both;
  width: 1220px;
  min-height: 600px;
  padding: 0 0 25px;
  margin: 0 auto;
}
.account-wrapper {
  position: relative;
  min-height: 550px;
}
.account-sidebar {
  position: absolute;
  left: 0;
  top: 0;
  width: 210px;
}
.gray-box,
.gray-btn-menu-on:hover {
  background: #fff;
}
.gray-box {
  overflow: hidden;
  border: 1px solid #d1d1d1;
  border-color: rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}
.account-sidebar .avatar {
  padding-top: 20px;
  margin: 0 0 20px;
  border-radius: 10px;
  text-align: center;
}
.account-sidebar .avatar img {
  width: 168px;
  height: 168px;
  display: inline-block;
}
.account-sidebar .account-nav {
  padding-top: 15px;
}
.account-sidebar .account-nav li {
  position: relative;
  height: 48px;
  border-top: 1px solid #ebebeb;
  line-height: 48px;
}
.account-sidebar .account-nav .current {
  border: none;
}
.account-sidebar .account-nav a {
  display: block;
  height: 48px;
  padding: 0 30px;
  color: #666;
  -moz-transition: none;
  -webkit-transition: none;
  transition: none;
}
.account-sidebar .account-nav .current a,
.account-sidebar .account-nav a:hover {
  position: relative;
  top: -1px;
  z-index: 1;
  height: 50px;
  background-color: #98afee;
  line-height: 50px;
  color: #fff;
}
.account-content {
  margin-left: 230px;
}
.gray-box .title {
  height: 60px;
  padding: 0 10px 0 28px;
  background: #f5f5f5;
  background: linear-gradient(#fff, #f5f5f5);
  border-bottom: 1px solid #dcdcdc;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 1px 7px rgba(0, 0, 0, 0.06);
  line-height: 60px;
  color: #646464;
}
.gray-box .pre-title {
  position: relative;
  z-index: 2;
}
.gray-box .title h2 {
  font-size: 18px;
  font-weight: 400;
  color: #626262;
}
</style>
