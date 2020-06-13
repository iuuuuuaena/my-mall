<template>
  <div class="login-div">
    <div class="form-div">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item class="head-form">
          <h1>登录</h1>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录状态" prop="delivery">
          <el-switch v-model="ruleForm.isloginkeeping"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" plain>登录</el-button>
          <el-button @click="resetForm('ruleForm')" plain>重置</el-button>
          <el-button type="info" round plain>
            <router-link to="/Register">没有账号？去注册</router-link>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 账号验证
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      }
    };
    // 密码验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      // 登录数据
      userLoginInfo: {
        username: "",
        password: "",
        isloginkeeping: false
      },
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
        isloginkeeping: true
      },
      // 表单验证规则
      rules: {
        username: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    //  登录函数
    submitForm() {
      // console.log(this.ruleForm);
      // 发送登录请求
      this.$axios({
        url: "/api/u/login",
        method: "get",
        params: {
          // 登录的三个参数
          username: this.ruleForm.username,
          password: this.ruleForm.password,
          isloginkeeping: this.ruleForm.isloginkeeping
        }
      }).then(res => {
        // console.log(res);
        if (res == null) {
          this.$message.error("网络错误，或服务器未知错误！");
        }
        // 如果返回的code是1012表示成功
        if (res.data.code == 1012) {
          this.$message.success("登录成功！");
          this.$store.state.isLogin = true;
          this.$store.state.loginStatus.user_account = this.ruleForm.username;
          this.$store.state.loginStatus.user_password = this.ruleForm.password;
          // console.log("登录状态为:");

          // console.log(this.$store.state.loginStatus);
          this.getAllInfo(this.ruleForm.username);
        } else if (res.data.code == 1004) {
          this.$message.error("用户名和密码错误！");
        } else {
          this.$message.error("其他错误");
        }
      });
    },
    // 重置表单按钮函数
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getAllInfo(name) {
      // 发送登录请求
      this.$axios({
        url: "/api/getUserInfo/" + name,
        method: "get"
      }).then(res => {
        // 返回用户的所有信息
        // console.log("用户的所有信息为");
        // console.log(res);
        // 设置信息
        this.$store.state.loginStatus.user_nickname = res.data.user_nickname;
        this.$store.state.loginStatus.user_email = res.data.user_email;
        this.$store.state.loginStatus.user_icon = res.data.user_icon;
        this.$store.state.loginStatus.user_qq = res.data.user_qq;
        this.$store.state.loginStatus.user_card = res.data.user_card;
        this.$store.state.loginStatus.user_hobby = res.data.user_hobby;
        this.$store.state.loginStatus.user_age = res.data.user_age;
        this.$store.state.loginStatus.user_gender = res.data.user_gender;
         this.$store.state.loginStatus.all_deal_with = res.data.all_deal_with;
        // console.log("保存的状态为");
        // console.log(this.$store.state.loginStatus);
        // 保存到cookie
        // console.log("保存cookie");

        this.setCookie(res.data.user_nickname,this.ruleForm.username, this.ruleForm.password,res.data.user_email,res.data.user_icon,res.data.user_qq,res.data.user_card,res.data.user_age,res.data.user_hobby,res.data.user_gender,res.data.all_deal_with, 7);
      });
    },
    //设置cookie
    setCookie(
      nickname,
      name,
      pwd,
      email,
      icon,
      qq,
      card,
      age,
      hobby,
      gender,
      deal,
      exdays
    ) {
      // console.log("设置cookie的时间");

      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
       window.document.cookie =
        "user_nickname" + "=" + nickname + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "user_account" + "=" + name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "user_password" + "=" + pwd + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "user_age" + "=" + age + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "user_gender" +
        "=" +
        gender +
        ";path=/;expires=" +
        exdate.toGMTString();
      window.document.cookie =
        "user_qq" + "=" + qq + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "user_icon" + "=" + icon + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "user_email" + "=" + email + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "all_deal_with" +
        "=" +
        deal +
        ";path=/;expires=" +
        exdate.toGMTString();
      window.document.cookie =
        "user_email" + "=" + email + ";path=/;expires=" + exdate.toGMTString();
        // console.log( window.document.cookie);
    },
    //读取cookie
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
          } else if (arr2[0] == "user_password") {
            this.ruleForm.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    }
  },
  mounted() {
    this.getCookie();
  }
};
</script>
<style  scoped>
.login-div {
  width: 100%;
  height: 100%;
  width: 500px;
  margin: 0 auto;
}

.form-div {
  width: 500px;
  background-color: #fff;
  padding: 30px 30px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.login {
  width: 500px;
  height: 430px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 10%);
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px rgb(168, 168, 168);
}
.head-form {
  height: 60px;
}
.head-form h1 {
  margin: 0 auto;
  text-align: center;
  height: 60px;
  line-height: 60px;
  font-size: 25px;
}

.form-item-v3 {
  position: relative;
  height: 46px;
  width: 310px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 7px;
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.4) inset,
    -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
  line-height: 46px;
  font-size: 18px;
  opacity: 0.618;
  transition: opacity 0.3s ease;
  padding: 0 20px;
}

.item-form {
  margin: 0px 10px;
  padding: 10px 20px;
}
.item-form span {
  font-size: 20px;
  margin-right: 10px;
}

#get-code-btn {
  width: 100px;
  height: 30px;
  background-color: rgb(223, 220, 215);
  border-radius: 10px;
  box-shadow: 0 -5px 6px -4px rgba(0, 0, 0, 0.4) inset,
    -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
  float: right;
}

#get-code-btn:active {
  width: 100px;
  height: 30px;
  background-color: rgb(148, 141, 134);
}
#get-code-btn:hover {
  width: 100px;
  height: 30px;
  background-color: rgb(167, 162, 158);
}
#login-btn {
  font-size: 18px;
  width: 100%;
  height: 45px;
  border-radius: 10px;
  background-color: rgb(199, 196, 194);
  box-shadow: 0 2px -2px rgba(0, 0, 0, 0.4);
}
#login-btn:active {
  width: 100%;
  height: 45px;
  border-radius: 5px;
  background-color: rgb(173, 170, 168);
}
#login-btn:hover {
  width: 100%;
  height: 45px;
  border-radius: 10px;
  box-shadow: 0 -5px 6px -4px rgba(0, 0, 0, 0.4) inset,
    -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
  background-color: rgb(148, 153, 151);
}
.item-form p {
  position: absolute;
  left: 70px;
  top: 285px;
  font-size: 17px;
}

#isloginkeeping {
  position: absolute;
  left: 50px;
  top: 290px;
}
</style>
