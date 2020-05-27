<template>
  <div>
    <div class="restartPage">
      <div class="restart-title">修改用户密钥</div>
      <div class="restart-body">
        <div class="restart-item">
          <span>手机号：</span>
          <span class="restart-phone">{{mobile}}</span>
        </div>
        <div class="restart-item">
          <span>验证码：</span>
          <input type="text" class="restartCode" v-model="code" maxlength="6" placeholder="6位验证码">
          <span class="r-code ripple"
                @click.prevent="getCode"> {{computedTime>0?`已发送(${computedTime}s)`:'获取验证码'}}</span>
        </div>
      </div>
      <div class="restart-footer">
        <span class="restart-off" @click="closeRestartPage">取消</span>
        <span class="restart-on" @click="confirm">确定</span>
      </div>
    </div>
    <MyModal/>

    <Tost v-if="isShowTost" :tost="tost"/>

  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex'

  import {checkMobile, findUser, getSendSMS, updateSecret} from '../../api'
  import {conversionPhone} from '../../util/tool'
  import {verificationCode} from '../../util/verification'
  import MyModal from '../MyModal/MyModal'
  import Tost from '../Tost/Tost'

  export default {
    name: "RestartPage",
    data() {
      return {
        code: '',
        tost: {},
        isShowTost: false,
        computedTime: 0
      }
    },
    methods: {

      ...mapActions(['saveUserInfo']),
      //获取验证码
      async getCode() {
        const phoneInfo = {
          "templateId": "143707",
          "autograph": "得实云打印",
          "params": ["账号验证"],
          "phone": this.userInfo.mobile
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
          //发送ajax(向指定手机号发送)
          const result = await getSendSMS(phoneInfo)
          if (result.code == 0) {
            // 显示提示
            this.controlTost('发送成功', true)
            // 停止计时
            if (this.computeTime) {
              this.computeTime = 0
              clearInterval(this.intervalId)
              this.intervalId = undefined
            }
          }
        }

      },
      //修改密钥
      confirm() {
        const code = this.code
        const appid = this.userInfo.appid
        const msg = verificationCode(code)
        if (!msg) {
          //验证验证码是否正确
          const checkCode = {
            mobile: this.userInfo.mobile,
            verifcationCode: code
          }


          checkMobile(checkCode)
            .then(res => {
              updateSecret(appid)
                .then(res => {
                  this.saveUserInfo(appid)
                  this.controlTost('更新密钥成功', true)
                  setTimeout(()=>{
                    this.closeRestartPage()
                  },1500)
                })
                .catch(res => {
                  this.controlTost('更新密钥失败', false)
                })
            })
            .catch(res => {
              this.controlTost(res.data, false)
            });

          //停止计时
          if (this.computedTime) {
            this.computedTime = 0
            clearInterval(this.intervalId)
            this.intervalId = 0
          }
        } else {
          this.controlTost(msg, false)
          return
        }
      },
      //控制Tost
      controlTost(msg, type) {
        this.tost = {msg,type}
        this.isShowTost = true
        setTimeout(() => {
          this.isShowTost = false
        }, 1500);
      }
    },
    computed: {
      ...mapState(['userInfo']),
      mobile() {
        const value = conversionPhone(this.userInfo.mobile)
        return value
      }
    },
    components: {
      MyModal,
      Tost
    },

    props: {
      closeRestartPage: Function
    }
  }
</script>

<style scoped>
  .restartPage {
    z-index: 10;
    position: absolute;
    /*display: none;*/
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 25px;
    max-width: 600px;
    height: 200px;
    /*border: 1px solid #666666;*/
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  }

  .restart-title {
    font-size: 18px;
    color: #666666;
    margin-bottom: 18px;
  }

  .restart-body {
    margin-bottom: 36px;
  }

  .restart-item {
    display: flex;
    font-size: 16px;
    line-height: 28px;
    color: #666666;
    margin-bottom: 18px;
  }

  .restart-phone{
    font-size: 14px;
  }
  .restart-item > input {
    height: 24px;
  }

  .r-code {
    margin-left: 12px;
    padding: 0 10px;
    height: 30px;
    width: 80px;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    background-color: #006eff;
    color: #ffffff;
    cursor: pointer;
  }

  .restart-footer {
    text-align: center;
  }

  .restart-footer > span {
    box-sizing: border-box;
    padding: 8px 15px;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    cursor: pointer;
    transition: .3s;
  }

  .restart-off {
    color: #666666;
  }
  .restart-off:hover {
    background-color: #f5f5f5;
  }
  .restart-on {
    color: #ffffff;
    background-color: #006eff;
  }
  .restart-on:hover{
    background-color: #1a7dff;
  }
</style>
