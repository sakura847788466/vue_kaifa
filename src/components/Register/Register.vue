<template>
  <div>
    <div class="login">
      <div class="left">
        <div class="img"></div>
      </div>
      <div class="right">
        <div class="right-box" @keyup.enter="goLogin">
          <p class="title">用户注册</p>
          <div class="item">
            <span class="icon icon-username"></span>
            <input type="text" placeholder="请输入用户名" v-model="username" maxlength="16">
          </div>
          <div class="item">
            <span class="icon icon-phone"></span>
            <input type="tel" placeholder="请输入手机号" v-model="phone" maxlength="11">
          </div>
          <div class="item">
            <span class="icon icon-password"></span>
            <input type="password" placeholder="请输入密码" v-model="password" maxlength="20">
          </div>
          <div class="item">
            <span class="icon icon-password"></span>
            <input type="password" placeholder="请输入确认密码" v-model="password2" maxlength="20">
          </div>
          <div class="item">
            <span class="icon icon-email"></span>
            <input type="text" placeholder="请输入6位验证码" v-model="code" maxlength="6">
            <span class="getCode" @click="checkGetCode">
              {{computedTime>0?`${computedTime}s`:'验证码'}}
            </span>
          </div>
          <div class="btn" @click.stop="goRegister">注 册</div>
          <div class="info">
            <div class="info-register"><span>已有账号</span><span class="info-color" @click="goToLogin">立即登录</span></div>
          </div>
        </div>
      </div>
      <div class="wire"></div>
      <div class="close" @click="closeLogin"></div>
    </div>
    <MyModal/>
    <Tost v-if="isShowTost" :tost="tost"/>
  </div>
</template>

<script>


  import {getSendSMS, register} from '../../api'
  import {validateGetRegister, validateRegister} from '../../util/verification'
  import MyModal from '../MyModal/MyModal'
  import Tost from '../Tost/Tost'

  export default {
    name: "Register",
    data() {
      return {
        username: '',
        password: '',
        password2: '',
        code: '',
        phone: '',
        tost: {},
        isShowTost: false,
        computedTime: 0,//验证码到期时间
      }
    },
    methods: {
      //获取验证码
      async checkGetCode() {
        const {username, password, phone, password2} = this
        const msg = validateGetRegister({username, password, phone, password2})
        if (msg) {
          this.controlTost(msg, false)
          return
        }
        const phoneInfo = {
          "templateId": "143707",
          "autograph": "得实云打印",
          "params": ["账号注册"],
          phone
        }

        if (!this.computedTime) {
          this.computedTime = 30
          this.intervalId = setInterval(() => {
            this.computedTime--
            if (this.computedTime <= 0) {
              //停止计时
              clearInterval(this.intervalId)
            }
          }, 1000);
          try {
            //发送ajax(向指定手机号发送)
            const result = await getSendSMS(phoneInfo)
            if (result.code == 0) {
              // 显示提示
              this.controlTost('发送成功', true)
              // 停止计时
              // if (this.computedTime) {
              //   this.computedTime = 0
              //   clearInterval(this.intervalId)
              //   this.intervalId = undefined
              // }
            }
          } catch (e) {
            this.controlTost('验证次数已用完', false)
          }

        }
      },

      goRegister() {
        const {username, password, phone, code} = this
        const msg = validateRegister(this)
        if (msg) {
          this.controlTost(msg, false)
          return
        }
        const user = {
          "username": username,
          "password": password,
          "mobile": phone,
          "verifcationCode": code
        }
        register(user)
          .then(() => {
            this.controlTost('注册成功', true)
            setTimeout(()=>{
              this.closeLogin()
              this.onLogin()
            },1500)
          })
          .catch(res => {
            this.controlTost(res.data, false)
          })
      },

      //跳转到登录页面
      goToLogin(){
        this.closeLogin()
        this.onLogin()
      },

      controlTost(data, type) {
        this.tost.msg = data
        this.tost.type = type
        this.isShowTost = true
        setTimeout(() => {
          this.isShowTost = false
        }, 1500)
      }

    },
    components: {
      MyModal,
      Tost
    },
    props: {
      closeLogin: Function,
      onLogin:Function
    }
  }
</script>

<style scoped>
  .login {
    z-index: 10;
    position: absolute;
    display: flex;
    flex-direction: row;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 700px;
    height: 400px;
    color: #666666;
  }

  .left, .right {
    width: 50%;
    height: 100%;
    background-color: #fff;
  }

  .left > .img {
    width: 100%;
    height: 100%;
    background: url("./img/register_bg.png");
  }

  .right > .right-box {
    padding: 40px 0 0 40px;
  }

  .wire {
    position: absolute;
    top: -30px;
    right: 0;
    width: 1px;
    height: 30px;
    background-color: #e6e6e6;
  }

  .close {
    position: absolute;
    top: -60px;
    right: -14px;
    width: 32px;
    height: 32px;
    border-radius: 32px;
    background: url("./img/close.png");
    background-size: 100% 100%;
    cursor: pointer;

  }

  .title {
    margin-bottom: 18px;
    font-size: 20px;
  }

  .username {
    display: flex;
    flex-direction: row;
    margin-top: 18px;
    padding: 5px 0;
    width: 85%;
    border-bottom: 1px solid #CCCCCC;
  }

  .item {
    display: flex;
    align-items: center;
    width: 85%;
    padding: 3px 0;
    border-bottom: 1px solid #CCCCCC;
  }

  .icon {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }

  .icon-username {
    background-image: url("./img/account.png");
    background-size: 100% 100%;
  }

  .icon-phone {
    background-image: url("./img/Mobile-phone.png");
    background-size: 100% 100%;
  }

  .icon-password {
    background-image: url("./img/password.png");
    background-size: 100% 100%;
  }

  .icon-email {
    background-image: url("./img/email.png");
    background-size: 100% 100%;
  }

  .getCode {
    display: inline-block;
    width: 60px;
    height: 14px;
    padding: 5px 0;
    font-size: 13px;
    line-height: 14px;
    text-align: center;
    background-color: #338BFF;
    border-radius: 2px;
    color: #fff;
    cursor: pointer;
    transition: .3s;
  }

  .getCode:hover {
    background-color: #1a7dff;
  }

  .btn {
    margin-top: 18px;
    width: 85%;
    height: 35px;
    line-height: 38px;
    text-align: center;
    color: #ffffff;
    border-radius: 5px;
    background-color: #23aaff;
    cursor: pointer;
    transition: .3s;
  }

  .btn:hover {
    background-color: #209ae6;
  }

  .info {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    width: 85%;
    font-size: 14px;
  }

  .info-color {
    color: dodgerblue;
    cursor: pointer;
  }

  .info-color:hover {
    text-decoration: underline;
  }

  input {
    height: 30px;
    border: none;
    outline: none;
  }

</style>
