<template>
  <div class="login-div">
    <div class="form-div">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item class="head-form">
          <h1>注册</h1>
        </el-form-item>
        <el-form-item label="设置账号" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设置密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="设置邮箱" prop="email" inline>
          <el-input v-model="ruleForm.email"></el-input>
          <el-button type="primary" @click="getCode" plain>获取验证码</el-button>
            <el-col :span="8">
          <el-input v-model="ruleForm.code" v-if="showCodeInput" placeholder="输入验证码"></el-input>
           </el-col>
        </el-form-item>
        <el-form-item label="登录状态" prop="delivery">
          <el-switch v-model="ruleForm.isloginkeeping"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" plain>登录</el-button>
          <el-button @click="resetForm('ruleForm')" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="login">
      <div class="head-form">
        <h3>请登录</h3>
      </div>
      <div class="item-form">
        <span>账号：</span>
        <input
          type="text"
          class="form-item-v3"
          name="username"
          v-model="userLoginInfo.username"
          id="username"
        />
      </div>
      <div class="item-form">
        <span>邮箱：</span>
        <input
          type="text"
          class="form-item-v3"
          name="email"
          v-model="userLoginInfo.email"
          id="email"
        />
      </div>
      <div class="item-form">
        <span>密码：</span>
        <input
          type="text"
          class="form-item-v3"
          name="password"
          v-model="userLoginInfo.passowrd"
          id="password"
        />
      </div>
      <div class="item-form">
        <p>是否保存登录状态</p>
        <input
          type="checkbox"
          name="isloginkeeping"
          id="isloginkeeping"
          v-model="userLoginInfo.isloginkeeping"
        />
        <button @click="getCode" id="get-code-btn">获取验证码</button>
      </div>
      <div style="height:50px"></div>
      <div class="item-form center">
        <button @click="getCode" id="login-btn">登录</button>
      </div>
    </div>-->
  </div>
</template>

<script>
// 引入封装好的http请求包

export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        // if (value.indexOf("@") == -1) {
        //   callback(new Error("请输入正确的邮箱格式"));
        // }
      }, 1000);
    };
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error("账号不能为空"));
      }
    };
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (value.length > 6) {
        callback(new Error("验证码长度不正确"));
      } else {
        callback();
      }
    };
    return {
      //   // 登录表单数据
      //   RegisterInfo: {
      //     username: this.ruleForm.username,
      //     password: this.ruleForm.password,
      //     email: this.ruleForm.email,
      //     isloginkeeping: this.ruleForm.isloginkeeping
      //   },

      //   emailCheck: {
      //     email: this.userLoginInfo.email,
      //     code: ""
      //   },

      ruleForm: {
        username: "",
        password: "",
        checkPass: "",
        email: "waniiu@126.com",
        isloginkeeping: "",
        code: 0
      },
      rules: {
        username: [{ validator: validateAccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      },
      showCodeInput: false
    };
  },
  methods: {
    //   发送验证码
    getCode() {
      console.log(this.ruleForm.email);
      this.$axios({
        url: "/api/email/getCode",
        methods: "get",
        params: {
          email: this.ruleForm.email
        }
      }).then(res => {
        if (res.data.code == 1003) {
          this.$message.error("邮件已被注册！");
        } else  if(res.data.code == 7002){
          this.$message.success("邮件发送成功");
          this.showCodeInput = true;
        }else{
          this.$message.error("邮件发送失败");
        }
      });
    },
    // 验证验证码和发送登录请求
    submitForm(formName) {
      // 验证码验证码
      this.$axios({
        url: "/api/email/checkCode",
        methods: "get",
        params: {
          email: this.ruleForm.email,
          code: this.ruleForm.code
        }
      }).then(res => {
        if (res.status == 200) {
          this.$message.success("验证码正确！");
        } else {
          this.$message.error("验证码错误！请重新输入！");
          return;
        }
      });

    //  注册
    this.$axios({
        url:"/api/u/register",
        methods:'get',
        params:{
            username:this.ruleForm.username,
            password:this.ruleForm.password,
            email:this.ruleForm.email
        }
    }).then(res=>{
  
        if (res.status == 200){
              this.$message.success("注册成功！");
        }else{
              this.$message.error("注册失败，！");
              return
        }
    })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
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
