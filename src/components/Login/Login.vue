<template>
  <div>
    <div class="login">
      <div class="left">
        <div class="img"></div>
      </div>

      <!--登录-->
      <div class="right" v-if="forgetPassword">
        <div v-if="wxShow">
          <div class="right-box" @keyup.enter="goLogin">
            <p class="title">用户登录</p>
            <div class="item">
              <span class="icon icon-username"></span>
              <input type="text" placeholder="请输入用户名" v-model="username">
            </div>
            <div class="item">
              <span class="icon icon-password"></span>
              <input type="password" placeholder="请输入登录密码" v-model="password">
            </div>
            <div class="btn" @click.stop="goLogin">登 录</div>
            <div class="info">
              <div class="info-register"><span>没有账号</span><span class="info-color" @click="goToRegister">立即注册</span>
              </div>
              <div class="info-color" @click="forgetPassword=!forgetPassword">重置密码</div>
            </div>
          </div>
          <div class="other-login" title="微信登录" @click.prevent="wxLogin()">
            <img src="../../../static/Img/wechat.e0ff124.svg" alt="微信logo">
          </div>
        </div>
        <div v-else>

          <wxlogin style="margin-left: 25px" :href="wx.href" :state="wx.state" :appid="wx.appid" :scope="wx.scope"
                   :redirect_uri="wx.redirect_uri"></wxlogin>
          <div class="wxbtn" @click="wxShow=!wxShow">返回</div>
        </div>
      </div>

      <!--忘记密码-->
      <div class="right" v-else>
        <div class="right-box">
          <p class="title">重置密码</p>
          <!-- <div class="forget">
             <p :style="forget.state==1?'color:dodgerblue':'color:#666'">
               <span class="forget_icon" :class="forget.state==1?'on':'forget_icon'">1</span>
               确认账号
             </p>
             <span class="forget_line"></span>
             <p :style="forget.state==2?'color:dodgerblue':'color:#666'">
               <span class="forget_icon" :class="forget.state==2?'on':'forget_icon'">2</span>
               重置密码
             </p>
             <span class="forget_line"></span>
             <p :style="forget.state==3?'color:dodgerblue':'color:#666'">
               <span class="forget_icon" :class="forget.state==3?'on':'forget_icon'">3</span>
               重置成功
             </p>
           </div>-->
          <!--   <div v-if="forget.state==1">
               <div class="item">
                 <span class="icon icon-phone"></span>
                 <input type="tel" placeholder="请输入绑定的手机号" v-model="forget.phone" maxlength="11">
               </div>
               <div class="btn" @click.stop="venPhone">确认</div>
             </div>-->

          <div class="item">
            <span class="icon icon-username"></span>
            <input type="text" placeholder="请输入重置的用户名" v-model="forget.username">
          </div>
          <div class="item">
            <span class="icon icon-phone"></span>
            <input type="tel" placeholder="请输入绑定的手机号" v-model="forget.phone" maxlength="11">
          </div>
          <div class="item">
            <span class="icon icon-password"></span>
            <input type="password" placeholder="请输入新密码" v-model="forget.password" maxlength="20"
                   ref="forgetPassword1">
          </div>
          <div class="item">
            <span class="icon icon-password"></span>
            <input type="password" placeholder="请输入确认密码" v-model="forget.password2" maxlength="20"
                   ref="forgetPassword2">
          </div>
          <div class="item">
            <span class="icon icon-email"></span>
            <input type="text" placeholder="请输入6位验证码" v-model="forget.code" maxlength="6" ref="forgetCode">
            <span class="getCode" @click="checkGetCode">
              {{computedTime>0?`${computedTime}s`:'验证码'}}
            </span>
          </div>
          <div class="btn" @click.stop="handleForget">立即重置</div>

          <!--<div v-if="forget.state==3">
            <div class="item">
              <span class="icon icon-phone"></span>
              <input type="tel" placeholder="请输入绑定的手机号" v-model="forget.phone" maxlength="11">
            </div>
            <div class="btn" @click.stop="venPhone">确认</div>
          </div>-->
          <div class="info" style="border: 0">
            <!--->
            <div class="info-color" @click="forgetPassword=!forgetPassword">返回登录</div>
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
  import {mapActions} from 'vuex'
  import {checkMobile, getSendSMS, haveMobile, login, updataPassword, wxGetConfig} from '../../api'

  import {validateGetRegister, validateLogin, validateRegister} from '../../util/verification'
  import wxlogin from 'vue-wxlogin';
  import MyModal from '../MyModal/MyModal'
  import Tost from '../Tost/Tost'
  import {getWxLogin, setCookie} from "../../util/tool";

  export default {
    name: "Login",

    data() {
      return {
        username: '',
        password: '',
        tost: {},
        isShowTost: false,
        wx: {
          self_redirect: true,
          id: "login_container",
          appid: "",
          scope: "",
          redirect_uri: "",
          state: "",
          style: "black",
        },
        wxShow: true,//是否进行微信登录
        forgetPassword: true,//忘记密码
        forget: {
          username: '',
          phone: '',
          password2: '',
          password: '',
          code: ''
        },
        computedTime: 0,//获取验证码时间
      }
    },
    methods: {
      ...mapActions(['saveUserInfo']),

      goLogin() {
        const {username, password} = this
        const msg = validateLogin(this)
        if (msg) {
          console.log(msg)
          this.controlTost(msg, false)
          return
        }
        login(username, password)
          .then(res => {
            let appid = res.appid
            this.saveUserInfo(appid)
            this.$router.push('/application')
            setCookie('appid', appid, 1)
            this.controlTost('登录成功', true)
            this.closeLogin()
          })
          .catch(res => {
            this.controlTost(res.data, false)
          })
      },

      goToRegister() {
        this.closeLogin()
        this.onRegister()
      },

      wxLogin() {
        wxGetConfig()
          .then(res => {
            const result = res.data
            this.wx.appid = result.appid
            this.wx.redirect_uri = result.redirect_uri
            this.wx.scope = result.scope
            this.wx.state = result.state
            this.wxShow = !this.wxShow
            window.addEventListener('hashchange',function(event){
              console.log('监视微信登录')
              window.location.reload()
            })
          })
          .catch(res => {
            this.controlTost(res, false)
          })
      },

      controlTost(data, type) {
        this.tost.msg = data
        this.tost.type = type
        this.isShowTost = true
        setTimeout(() => {
          this.isShowTost = false
        }, 1500)
      },

      //获取验证码
      async checkGetCode() {
        let {phone} = this.forget
        const phoneInfo = {
          "templateId": "143707",
          "autograph": "得实云打印",
          "params": ["账号注册"],
          phone
        }
        const msg = validateGetRegister(this.forget)
        if (msg) {
          this.controlTost(msg, false)
          return
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
            }
          } catch (e) {
            this.controlTost('验证次数已用完', false)
          }

        }
      },

      //重置密码
      async handleForget() {
        let {phone, username, password,code} = this.forget
        const msg = validateRegister(this.forget)
        if (msg) {
          this.controlTost(msg, false)
          return
        }
        const checkCode = {//验证code是否正确
          mobile: phone,
          verifcationCode: code
        }
        const data = {//修改密码参数
          username,
          password
        }

        try {
          const result = await checkMobile(checkCode)
          if (result.code == 0) {
            updataPassword(data)
              .then(() => {
                this.controlTost('密码重置成功', true)
                this.forget = {}
                this.forgetPassword = !this.forgetPassword
              })
              .catch(() => {
                this.controlTost('密码重置失败', false)
              })
          }
        } catch (e) {
          this.controlTost('验证码错误', false)
        }




      }
    },
    components: {
      MyModal,
      Tost,
      wxlogin
    },
    props: {
      closeLogin: Function,
      onRegister: Function,
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
    background: url("./img/login_bg.png");
  }

  .right .right-box {
    padding: 40px 0 0 40px;
    /*border-bottom: 1px solid #ddd;*/
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

  .icon-password {
    background-image: url("./img/password.png");
    background-size: 100% 100%;
  }

  .btn {
    margin-top: 30px;
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
    margin-top: 18px;
    padding-bottom: 18px;
    width: 85%;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
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

  /*其他登录样式2019-07-26 czr*/

  .other-login {
    display: flex;
    justify-content: center;
    margin-top: 18px;

  }

  .other-login > img {
    padding: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #f5f5f5;
    cursor: pointer;
  }

  .wxbtn {
    position: absolute;
    top: 0px;
    right: 0px;
    width: 50px;
    height: 47px;
    color: white;
    background-color: dodgerblue;
    font-size: 14px;
    line-height: 47px;
    text-align: center;
    cursor: pointer;

  }

  .wxbtn:hover {
    background-color: #209ae6;
  }

  /*忘记密码*/

  .forget {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 12px;
  }

  .forget_icon {
    display: inline-block;
    margin-right: 5px;
    width: 15px;
    height: 15px;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #666;
  }

  .forget_line {
    margin: 0 8px;
    width: 20px;
    height: 1px;
    background-color: #666;
  }

  .on {
    border: 1px solid dodgerblue;
    color: dodgerblue;
  }

  .icon-phone {
    background-image: url("./img/Mobile-phone.png");
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
</style>
