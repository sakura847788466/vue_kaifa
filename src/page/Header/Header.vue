<template>
  <div class="header">
    <div class="logo">
      <img class="login-img"
           src="./img/logo.png"
           alt="">
      <span class="logo-text">得实云开放平台</span>
    </div>
    <ul class="el-menu">
      <li class="glz">
        <a title="应用管理"
           :class="{in:isCurrent('/application')}"
           @click="goTo('/application')">
          <span>应用管理</span>
        </a>
      </li>
      <li class="print">
        <a title="接口调试"
           :class="{in:isCurrent('/index')||isCurrent('/')}"
           @click="goTo('/index')">
          <span>接口调试</span>
        </a>
      </li>

      <!-- <li class="print">
        <a title="沙箱环境"
           :class="{in:isCurrent('/sandbox')}"
           @click="goTo('/sandbox')">
          <span>沙箱环境</span>
        </a>
      </li> -->
      <!-- https://open.dascomyun.com/document/html/index.html -->
      <li class="text">
        <a title="文档中心"
           :class="{in:isCurrent('/document')}"
           @click="goTo('/document')"
           style="text-decoration: none"
           target="_blank">
          <span>文档中心</span>
        </a>
      </li>
      <div class="login"
           v-if="!userInfo.appid"><a class="ripple"
           @click="onLogin">登录</a></div>
      <div class="line"
           v-if="!userInfo.appid"></div>
      <div class="register"
           v-if="!userInfo.appid"><a class="ripple"
           @click="onRegister">注册</a></div>
      <div class="successfully"
           v-if="userInfo.appid">
        <p>
          <a class="ripple">您好：{{userInfo.username}}&nbsp;</a>
          <i></i>
        </p>
        <div class="hoverbox">
          <em></em>
          <div @click="onLoginOut"><a href="#">退出账号</a></div>
          <div @click="onAlterUserInfo"><a href="#">修改用户信息</a></div>
        </div>
      </div>
    </ul>
    <LoginOut v-if="loginOut"
              :closeLoginOut="closeLoginOut" />
    <AlterUserInfo v-if="alterUserInfo"
                   :closeAlterUserInfo="closeAlterUserInfo" />
    <IsMobile v-if="isMobile"
              :closeIsMobile="closeIsMobile" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LoginOut from '../../components/LoginOut/LoginOut'
import AlterUserInfo from '../../components/AlterUserInfo/AlterUserInfo'
import IsMobile from "../../components/IsMobile/IsMobile";

export default {
  name: "Header",
  data () {
    return {
      loginOut: false,//显示是否退出页面
      alterUserInfo: false,//显示修改用户信息页面
      isMobile: false,//显示添加手机号的,
    }
  },
  methods: {
    goTo (path) {
      this.$router.replace(path)
    },
    isCurrent (path) {
      return this.$route.path === path
    },
    onLoginOut () {
      this.loginOut = true;
    },
    closeLoginOut () {
      this.loginOut = false
    },
    onAlterUserInfo () {
      if (this.userInfo.mobile) {
        this.alterUserInfo = true
      } else {
        this.onIsMobile()
      }
    },
    closeAlterUserInfo () {
      this.alterUserInfo = false
    },
    //开启添加手机号
    onIsMobile () {
      this.isMobile = true
    },
    closeIsMobile () {
      this.isMobile = false
    },
  },
  computed: {
    ...mapState(['userInfo'])
  },
  props: {
    onLogin: Function,
    onRegister: Function
  },
  components: {
    IsMobile,
    LoginOut,
    AlterUserInfo,
  }
}
</script>

<style scoped>
/*头部样式*/
.header {
  display: flex;
  flex-direction: row;
  height: 186px;
  width: 1200px;
  margin: 0 auto;
}

.logo {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 186px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-image: linear-gradient(135deg, #62ccfe, #2e8eff);
}

.logo > .login-img {
  width: 68px;
  height: 68px;
}

.logo > .logo-text {
  margin-top: 26px;
  font-size: 20px;
  /*font-weight: bold;*/
  color: rgba(255, 255, 255, 1);
}

.el-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  height: 100px;
  width: 990px;
  background-color: #ffffff;
  /*flex-grow: 1;*/
}

.el-menu li:nth-child(1) {
  margin-left: 55px;
}

.el-menu > li {
  width: 120px;
}

.el-menu > li > a {
  display: block;
  width: 120px;
  height: 100px;
  line-height: 100px;
  font-size: 16px;
  text-align: center;
  color: #666;
  transition: 0.3s;
  cursor: pointer;
}

.el-menu > li > a:hover {
  color: #0095ff;
  background-color: #edf8ff;
}

a > span {
  padding-bottom: 12px;
}

a:hover span {
  border-bottom: 2px solid #0095ff;
}

/*登录*/
.login {
  /*display: none;*/
  margin-left: auto;
  margin-right: 14px;
}

/*新增开始*/
.successfully {
  margin-left: auto;
  margin-right: 80px;
  height: 100%;
  position: relative;
}

.successfully a {
  font-size: 14px;
  color: #0095ff;
}

.successfully p {
  line-height: 100px;
}

.hoverbox {
  position: absolute;
  top: 66px;
  right: -30px;
  width: 88px;
  height: 60px;
  border-radius: 4px;
  border: 1px solid #d0d0d0;
  background: white;
  display: none;
}

.successfully:hover .hoverbox {
  display: block;
}

.successfully em,
.successfully i {
  display: inline-block;
  width: 14px;
  height: 8px;
  background: url("./img/aa.png");
}

.successfully i {
  transform: rotateX(-180deg);
  margin-left: 10px;
}

.hoverbox em {
  position: absolute;
  top: -8px;
  left: 10px;
}

.hoverbox div {
  width: 100%;
  text-align: center;
}

.hoverbox a {
  color: #666666;
  font-size: 12px;
  line-height: 28px;
  text-align: center;
  text-decoration: none;
}

.hoverbox div:hover a {
  color: #0095ff;
}

/*新增结束*/
.line {
  width: 2px;
  height: 21px;
  background-color: #0095ff;
}

.login > a {
  font-size: 16px;
  color: #666;
  font-weight: 400;
  cursor: pointer;
}

.register {
  margin-left: 13px;
  margin-right: 29px;
}

.register > a {
  color: #666;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
}

/*登录结束*/
.in {
  color: #0095ff !important;
  background-color: #edf8ff;
}

.in > span {
  border-bottom: 2px solid #0095ff;
}

/*头部样式结束*/
</style>

