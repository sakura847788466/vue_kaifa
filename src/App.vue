<template>
  <div id="app">
    <Header :onLogin="onLogin"
            :onRegister="onRegister" />
    <keep-alive>
      <router-view :onLogin="onLogin" />
    </keep-alive>
    <transition name="fade">
      <Login v-if="login"
             :closeLogin="closeLogin"
             :onRegister="onRegister" />
    </transition>
    <transition name="fade">
      <Register v-if="register"
                :closeLogin="closeLogin"
                :onLogin="onLogin" />
    </transition>
    <Footer :onLogin="onLogin"
            :onRegister="onRegister" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { getWxLogin, getCookie, setCookie } from './util/tool'
import Header from './page/Header/Header'
import Login from './components/Login/Login'
import Register from "./components/Register/Register";
import Footer from "./components/Footer/Footer"
import { wxLogin } from "./api";

export default {
  name: 'App',
  mounted () {

    this.$nextTick(() => {
      const wx = getWxLogin()
      if (wx) {

        wxLogin({ code: wx.code, state: wx.state })
          .then(res => {
            let appid = res.data
            this.saveUserInfo(appid)
            setCookie('appid', appid, 1)
            window.location.href = wx.url
          })
          .catch(res => {
            console.log(res);
          })
      } else {
        const appid = getCookie('appid')
        if (appid) {
          this.saveUserInfo(appid)
        }
      }
    })
  },
  data () {
    return {
      login: false,
      register: false
    }
  },
  methods: {
    ...mapActions(['saveUserInfo']),
    onLogin () {
      this.login = true
    },
    onRegister () {
      this.register = true
    },
    closeLogin () {
      this.login = false
      this.register = false
    }
  },
  components: {
    Register,
    Login,
    Header,
    Footer
  }
}
</script>

<style>
#app {
  margin: 0 auto;
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}

input[type="checkbox"] {
  margin: 0;
}
</style>
