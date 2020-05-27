<template>
  <div>
    <div class="verification">
      <div class="v-1">
        <div class="v-title">
          <span>添加手机号</span>
          <span class="v-close" title="关闭" @click="closeIsMobile">&Chi;</span>
        </div>
        <div class="v-tip">
          为了您的账号安全，进行敏感操作前须先添加手机号验证身份。
        </div>
        <div class="v-body">
          <div class="v-phone-item">
            <span>手机号</span>
            <div>
              <input type="text" placeholder="请输入手机号" maxlength="11" v-model="newPhone">
              <!--<div class="v-code-tip"></div>-->
            </div>
          </div>
          <div class="v-phone-item">
            <span>验证码</span>
            <div>
              <input type="text" placeholder="6位验证码"  maxlength="6" v-model="code">
              <!--<div class="v-code-tip"></div>-->
            </div>

            <div class="v-getCode" @click.prevent="checkGetCode">
              {{computedTime>0?`已发送(${computedTime}s)`:'获取验证码'}}
            </div>
          </div>
          <div class="handle" @keyup.enter="phoneConfirm">
            <span class="v-btn v-off" @click="closeIsMobile">取消</span>
            <span class="v-btn v-on" @click="phoneConfirm">确认</span>
          </div>
        </div>
      </div>
    </div>
    <MyModal/>
    <Tost v-if="isShowTost" :tost="tost"/>
  </div>

</template>

<script>
  import {mapState,mapActions} from 'vuex'

  import {checkMobile, getSendSMS, updataMobile} from '../../api'
  import {verificationCode, verificationPhone} from '../../util/verification'
  import MyModal from '../MyModal/MyModal'
  import Tost from '../Tost/Tost'

  export default {
    name: "IsMobile",
    data() {
      return {
        code: '',//验证手机号的验证码
        newPhone: '',//新手机号
        isShowTost: false,
        tost: {},
        intervalId: '',
        computedTime: 0,

      }
    },
    methods: {
      ...mapActions(['saveUserInfo']),
      //获取验证码
      async checkGetCode() {
        const p = verificationPhone(this.newPhone)
        if (p) {
          this.controlTost(p, false)
          return
        }
        const phoneInfo = {
          "templateId": "143707",
          "autograph": "得实云打印",
          "params": ["账号验证"],
          "phone": this.newPhone
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


      //修改手机号
      async phoneConfirm() {
        const {newPhone, code} = this
        const p = verificationPhone(newPhone)
        const c = verificationCode(code)
        if (p) {//验证手机号
          this.controlTost(p, false)
          return
        }
        if (c) {//验证验证码
          this.controlTost(c, false)
          return
        }
        //验证验证码是否正确
        const checkCode = {
          mobile: newPhone,
          verifcationCode: code
        }
        const data = {
          username: this.userInfo.username,
          mobile: newPhone
        }
        try {
          const result = await checkMobile(checkCode)
          if (result.code == 0) {
            updataMobile(data)
              .then(res => {
                this.saveUserInfo(this.userInfo.appid)
                this.controlTost('添加成功', true)
                setTimeout(()=>{
                  this.closeIsMobile()
                },1500)
              })
              .catch(res => {
                this.controlTost('添加失败', false)
              })
          }
        } catch (e) {
          this.controlTost('验证码错误', false)
        }


        //停止计时
        if (this.computedTime) {
          this.computedTime = 0
          clearInterval(this.intervalId)
          this.intervalId = 0
        }
      },


      controlTost(msg, type) {
        this.tost = {msg, type}
        this.isShowTost = true
        setTimeout(() => {
          this.isShowTost = false
        }, 1500);
      }
    },

    components: {
      MyModal,
      Tost
    }
    ,
    computed: {
      ...mapState(['userInfo']),

    }
    ,
    props: {
      closeIsMobile: Function
    }
  }
</script>

<style scoped>
  /*用户修改*/
  .verification {
    z-index: 10;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    padding: 25px;
    width: 550px;
    height: 282px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  }

  .verification .v-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 25px;
  }

  .verification .v-close {
    margin-right: 10px;
    font-size: 18px;
    color: #888888;
    cursor: pointer;
  }

  .v-close:hover {
    transition: .3s;
    padding: 1px;
    background-color: #dddddd;
  }

  .v-tip {
    margin-top: 18px;
    padding: 10px 0;
    font-size: 14px;
    color: #888888;
    border: 1px solid #0b9eff;
    background-color: #e5f0ff;
    text-align: center;
  }

  .verification > .v-body {
    margin-top: 14px;
  }

  .v-body > .v-phone-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 18px;
    height: 35px;
    font-size: 14px;
  }

  .v-body > .v-phone-item > span, .v-info-item span {
    width: 80px;
    color: #888888;
  }

  .v-body input {
    height: 24px;
  }

  .v-code, .v-code2 {
    width: 80px;
    padding: 0 10px;
    font-size: 14px;
  }

  .v-code-tip, .v-code-tip2 {
    margin-top: 8px;
    font-size: 12px;
    color: #E1504A;
  }

  .v-phone-item > .v-getCode, .v-phone-item > .v-getCode2 {
    display: inline-block;
    margin-left: 12px;
    padding: 0 10px;
    height: 28px;
    width: 80px;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    background-color: #006eff;
    color: #ffffff;
    cursor: pointer;
  }

  .handle {
    margin-top: 24px;
    text-align: center;
  }

  .v-btn {
    padding: 8px 15px;
    color: #bbbbbb;
    font-size: 12px;
    border: 1px solid #dddddd;
    cursor: pointer;
    transition: .3s;
  }

  .v-on {
    color: #ffffff;
    background-color: #006eff;
  }

  .v-on:hover {
    background-color: #1a7dff;
  }

  .v-off {
    color: #000000;
  }

  .v-off:hover {
    background-color: #f5f5f5;
  }


</style>
