<template>
  <div class="user-info">
    <div>
      <div class="col-md-6 person-info-agileits-w3layouts">
        <h3 class="w3_head w3_head1">
          个人信息
          <span>总交易金额:{{userInfo.all_deal_amount}}</span>
        </h3>
        <el-form ref="form" :model="userInfo" label-width="80px">
          <el-form-item label="你的昵称">
            <el-input v-model="userInfo.user_nickname"></el-input>
          </el-form-item>
          <el-form-item label="你的性别">
            <el-select v-model="userInfo.user_gender" placeholder="你的性别">
              <el-option label="男" value="0"></el-option>
              <el-option label="女" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个人爱好">
            <el-input type="textarea" v-model="userInfo.user_hobby"></el-input>
          </el-form-item>
          <el-form-item label="你的账号">
            <el-input v-model="userInfo.user_account"></el-input>
          </el-form-item>
          <el-form-item label="你的密码">
            <el-input type="password" v-model="userInfo.user_password"></el-input>
          </el-form-item>
          <el-form-item label="你的邮箱">
            <el-input v-model="userInfo.user_email"></el-input>
          </el-form-item>
          <el-form-item label="你的QQ">
            <el-input v-model="userInfo.user_qq"></el-input>
          </el-form-item>

          <el-form-item label="银行卡">
            <el-input v-model="userInfo.user_card"></el-input>
          </el-form-item>

          <el-form-item label="交易金额">
            <el-input v-model="userInfo.all_deal_amount"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onChange">更新信息</el-button>
          </el-form-item>
          
        </el-form>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: this.$store.state.loginStatus.user_icon,
      userInfo: {
        user_nickname: "",
        user_account: "",
        user_password:"",
        user_age: 0,
        user_gender:0,
        user_hobby:"",
        user_qq: 0,
        user_email: "",
        user_card: 0,
        all_deal_amount:0,
      }
    };
  },
  methods: {
    onChange() {
      this.$axios({
        url: "/api/updateInfo",
        methods: "get",
        params: this.userInfo
      }).then(res => {
        console.log(res);
        if (res.data.code == 1015) {
          this.$message.success("更新信息成功!");
        } else if (res.data.code == 1016) {
          this.$message.error("更新信息失败!");
        }else{
           this.$message.error("其他未知错误!");
        }
      });
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
          //判断查找相对应的值
          if (arr2[0] == "user_nickname") {
            this.userInfo.user_nickname = arr2[1];
          } else if (arr2[0] == "user_account") {
            this.userInfo.user_account = arr2[1];
          } else if (arr2[0] == "user_password") {
            this.userInfo.user_password = arr2[1];
          } else if (arr2[0] == "user_age") {
            this.userInfo.user_age = arr2[1];
          } else if (arr2[0] == "user_gender") {
            this.userInfo.user_gender = arr2[1];
          } else if (arr2[0] == "user_qq") {
            this.userInfo.user_qq = arr2[1];
          } else if (arr2[0] == "user_email") {
            this.userInfo.user_email = arr2[1];
          } else if (arr2[0] == "user_card") {
            this.userInfo.user_card = arr2[1];
          } else if (arr2[0] == "all_deal_amount") {
            this.userInfo.all_deal_amount= arr2[1];
          } else if (arr2[0] == "user_icon") {
            this.userInfo.user_icon = arr2[1];
          } else if (arr2[0] == "user_hobby") {
            this.userInfo.user_hobby = arr2[1];
          }
        }
      }
    },
    // 获取该账号用户的所有交易金额
    getAllCount(){
      this.$axios({
        url:"/api/calculte",
        methods:"get",
        params:{
          user_account: this.userInfo.user_account
        }
      }).then(res=>{
        // if(res.data.)
        console.log(res);
        
        this.userInfo.all_deal_amount = res.data.data
      })
    }
  },
  created() {
    this.$store.state.loginStatus.user_account = this.userInfo.user_account;
  },
  computed: {
    // //  用户登录的的数据
    // userInfo() {
    //   return this.$store.state.loginStatus;
    // }
  },
  mounted() {
    this.getCookie();
    this.getAllCount();
  }
};
</script>
<style scoped>
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

.user-info {
  float: right;
  background-color: #fff;
  width: 980px;

  box-shadow: 0 0 5px 5px rgb(red, rgb(7, 7, 7), blue);
  border-radius: 10px;
  border: 1px solid rgb(209, 208, 208);
}

ul {
  margin: 0 auto;
}

ul li {
  display: block;
  height: 30px;
  font-size: 20px;
  font: bold;
  width: 70%;
  margin: 0 auto;
}

li img {
  width: 100px;
  height: 100px;
  border: 1px 1px solid rgb(48, 47, 47);
  padding: 10px 10px;
  box-shadow: 1px 5px 5px rgb(48, 47, 47);
}

#img-li {
  height: 200px;
}
.w3_head {
  text-align: center;
  color: #303030;
  margin: 0 0 1em;
  font-size: 2.5em;
  letter-spacing: 2px;
  text-transform: capitalize;
}
h3.w3_head.w3_head1 span {
  font-size: 13px;
  display: block;
  letter-spacing: 4px;
  margin-top: 5px;
  text-transform: uppercase;
  color: #ecb731;
}
</style>