<template>
  <div class="login-container ">
    <img :src="LoginBg" class="login-video" />
    <div class="login-box">
      <el-form
        class="login-form"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">登陆</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container svg-container_login">
            <i class="el-icon-user"></i>
          </span>
          <el-input
            name="username"
            clearable
            type="text"
            v-model="loginForm.username"
            placeholder="请输入正确的用户名!"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="el-icon-lock"></i>
          </span>
          <el-input
            name="password"
            clearable
            :type="passwordType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            placeholder="请输入密码!"
          />
          <span class="show-pwd" @click="showPwd"> </span>
        </el-form-item>
        <div class="notise">
          <a @click="$router.push({ path: '/register' })">注册</a>
          <a @click="$router.push({ path: '/forget' })">忘记密码</a>
        </div>
        <el-button
          size="small"
          type="primary"
          class="btn-login"
          @click.native.prevent="handleLogin"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import LoginBg from '@/assets/bg.png'
export default {
  components: {},
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!(/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/).test(value)) {
      if (!isvalidUsername(value)) {
        // callback(new Error('请输入正确的手机号!'))
        callback(new Error('请输入正确的账号!'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 1) {
        callback(new Error('密码不能低于1位!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '1111111'
      },
      loginRules: {
        // username: [{
        //   required: true,
        //   trigger: 'blur',
        //   validator: validateUsername
        // }],
        password: [
          {
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }
        ]
      },
      passwordType: 'password',

      LoginBg: LoginBg
    }
  },

  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      //   let para = {
      //     username: this.loginForm.username,
      //     password: this.loginForm.password
      //   }
      //   this.logins(para).then(res => {
      //     Object.assign(para, res)
      //     this.$store.dispatch('LoginByUsername', para).then((res) => {
      //       console.log(2333);
      //       this.$router.push({
      //         path: '/'
      //       })
      //     }).catch(() => {
      //       console.log(663);
      //     })
      //   }).catch((err) => {
      //     this.$message.error(err);
      //   })

      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$router.push({ path: '/components' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    logins(param) {
      return this.$request.post('/api/login', {
        username: this.loginForm.username,
        password: this.loginForm.password
      })
    }
  },
  created() {}
}
</script>
<style type="text/stylus" lang="stylus">
$bg=#2d3a4b;
$light_gray= #eee;
$bg=#2d3a4b;
$dark_gray= #889aa4;
$light_gray=#eee;
$btn_bj= #0163ae;
$btn_hover= #0e3a88;
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        // -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  .login-video {
    object-fit: cover;
    margin: auto;
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    visibility: visible;
    width: 100%;
    height: 100%;
  }
  .login-box {
    padding: 0;
    background: rgba(0, 0, 0, 0.55);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .login-form {
      min-width: 400px;
      min-height: 400px;
      padding: 15px;
      margin: auto;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .btn-login {
        display: block;
        width: 100%;
        height: 47px;
        line-height: 47px;
        margin: 10px 0;
        padding: 0;
        background: $btn_bj;
        border: none;
        border-radius: 4px;
        color: #fff !important;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background: darken($btn_hover, 2%);
        }
      }
    }
  }
  .notise {
    font-size: 12px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    a {
      color: #27aac7;
      margin-left: 15px;
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
