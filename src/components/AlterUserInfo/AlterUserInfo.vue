<template>
  <div>
    <div class="verification">
      <div class="v-1" v-if="v1">
        <div class="v-title">
          <span>身份验证</span>
          <span class="v-close" title="关闭" @click="closeAlterUserInfo">&Chi;</span>
        </div>
        <div class="v-tip">
          为了您的账号安全，进行敏感操作前须先验证身份。
        </div>
        <div class="v-body">
          <div class="v-phone-item">
            <span>验证方式</span>
            <div>手机验证</div>
          </div>
          <div class="v-phone-item">
            <span>手机号码</span>
            <div class="v-phoneNum">
              {{convertPhone}}
            </div>
            <div class="v-phone-alter">手机号不可用？</div>
          </div>
          <div class="v-phone-item">
            <span>验证码</span>
            <div>
              <input type="text" placeholder="6位验证码" class="v-code" maxlength="6" v-model="code">
              <div class="v-code-tip"></div>
            </div>

            <div class="v-getCode" @click.prevent="checkGetCode">
              {{computedTime>0?`已发送(${computedTime}s)`:'获取验证码'}}
            </div>
          </div>
          <div class="handle" @keyup.enter="checkConfirm">
            <span class="v-btn v-off" @click="closeAlterUserInfo">取消</span>
            <span class="v-btn v-on" @click="checkConfirm">确认</span>
          </div>
        </div>
      </div>
      <div class="v-2" v-if="v2">
        <div class="v-title">
          <span>信息更改</span>
          <span class="v-close" title="关闭" @click="closeAlterUserInfo">&Chi;</span>
        </div>
        <div class="v-tip">
          在这里你可以更换手机号和密码
        </div>
        <transition name="fade">
          <div class="v-body " v-if="isSwitch">
            <div class="v-phone-item">
              <span>操作方式</span>
              <div>更换手机号</div>
              <div class="switch" title="更换密码" @click="onSwitch"></div>
            </div>
            <div class="v-phone-item">
              <span>新手机号码</span>
              <input type="text" class="new-phone" maxlength="11" v-model="newPhone">
            </div>
            <div class="v-phone-item">
              <span>验证码</span>
              <input type="text" placeholder="6位验证码" class="v-code2" maxlength="6" v-model="phoneCode">
              <div class="v-getCode2 ripple" @click="phoneGetCode">
                {{computedTime>0?`已发送(${computedTime}s)`:'获取验证码'}}
              </div>
            </div>
            <div class="handle">
              <span class="v-btn v-off" @click="closeAlterUserInfo">取消</span>
              <span class="v-btn v-on" @click="phoneConfirm">确认</span>
            </div>
          </div>
          <div class="v-body " v-if="!isSwitch">
            <div class="v-phone-item">
              <span>操作方式</span>
              <div>更改密码</div>
              <div class="switch" title="更改手机号" @click="onSwitch"></div>
            </div>
            <div class="v-phone-item">
              <span>密码</span>
              <input type="password" class="pass" maxlength="16" v-model="pass">
            </div>
            <div class="v-phone-item">
              <p>密码为8~16位数字和字母组成</p>
            </div>
            <div class="handle">
              <span class="v-btn v-off" @click="closeAlterUserInfo">取消</span>
              <span class="v-btn v-on" @click="passConfirm">确认</span>
            </div>
          </div>
        </transition>

      </div>
    </div>
    <MyModal/>
    <Tost v-if="isShowTost" :tost="tost"/>
  </div>

</template>

<script>
  import {mapActions, mapState} from 'vuex'

  import {checkMobile, getSendSMS, haveMobile, updataMobile, updataPassword} from '../../api'
  import {conversionPhone} from '../../util/tool'
  import {verificationCode, verificationPassword, verificationPhone} from '../../util/verification'
  import MyModal from '../MyModal/MyModal'
  import Tost from '../Tost/Tost'

  export default {
    name: "AlterUserInfo",
    data() {
      return {
        v1: true,//显示初始的验证页面
        v2: false,//显示修改的页面
        code: '',//验证手机号的验证码
        newPhone: '',//新手机号
        phoneCode: '',//修改手机验证码
        passCode: '',//修改密码的验证码
        pass: '',
        tost: {},
        intervalId: '',
        computedTime: 0,
        isShowTost: false,
        isSwitch: true
      }
    },
    methods: {
      ...mapActions(['saveUserInfo']),
      //获取验证码
      async checkGetCode() {
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

      //验证手机号
      checkConfirm() {
        const code = this.code
        const codeInfo = verificationCode(this.code)
        if (!codeInfo) {
          //验证验证码是否正确
          const checkCode = {
            mobile: this.userInfo.mobile,
            verifcationCode: code
          }
          checkMobile(checkCode)
            .then(res => {
              this.controlTost('验证成功', true)
              this.v1 = false
              this.v2 = true
            })
            .catch(res => {
              this.controlTost(res.data, false)
            });
        } else {
          this.controlTost(codeInfo, false)
          return
        }

        //停止计时
        if (this.computedTime) {
          this.computedTime = 0
          clearInterval(this.intervalId)
          this.intervalId = 0
        }
      },

      //修改手机号
      async phoneConfirm() {
        const {newPhone, phoneCode} = this
        const p = verificationPhone(newPhone)
        const c = verificationCode(phoneCode)
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
          verifcationCode: phoneCode
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
                this.controlTost('修改成功', true)
                this.saveUserInfo(this.userInfo.appid)
              })
              .catch(res => {
                this.controlTost('修改失败', true)
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

      //获取修改手机号的验证码
      async phoneGetCode() {
        const newPhone = this.newPhone
        const p = verificationPhone(newPhone)
        if (!p) {
          const phoneInfo = {
            "templateId": "143707",
            "autograph": "得实云打印",
            "params": ["账号验证"],
            "phone": newPhone
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
            //验证手机号是否被绑定了
            haveMobile(newPhone)
              .then(res => {
                getSendSMS(phoneInfo)
                  .then(res => {
                    this.controlTost('发送成功', true)
                  })
                  .catch(res => {
                    if (res.code != 0) {
                      this.controlTost('验证码已用完', false)
                    } else {
                      this.controlTost('发送失败', false)
                    }

                  })
              })
              .catch(res => {
                this.controlTost('该手机号已注册', false)
              })

          }

        } else {
          this.controlTost(p, false)
        }

      },

      //修改密码
      passConfirm() {
        const password = this.pass
        const p = verificationPassword(password)
        if (!p) {
          const data = {
            username: this.userInfo.username,
            password
          }
          updataPassword(data)
            .then(res => {
              if (res.code == 0) {
                this.controlTost(res.data, true)
                this.pass = ''
              }
            })
            .catch(res => {
              this.controlTost(res.data, false)
            })
        } else {
          this.controlTost(p, false)
        }
      },
      //切换更改手机号和密码
      onSwitch() {
        this.isSwitch = !this.isSwitch
      },
      controlTost(msg, type) {
        this.tost = {msg, type}
        this.isShowTost = true
        setTimeout(() => {
          this.isShowTost = false
        }, 1500);
      }
    }
    ,
    components: {
      MyModal,
      Tost
    }
    ,
    computed: {
      ...mapState(['userInfo']),
      convertPhone() {
        const mobile = conversionPhone(this.userInfo.mobile)
        return mobile
      }
    }
    ,
    props: {
      closeAlterUserInfo: Function
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
    /*align-items: center;*/
    margin-top: 18px;
    height: 30px;
    font-size: 14px;
  }

  .v-phoneNum {
    width: 90px;
    border: none;
    background-color: #ffffff;
  }

  .v-body > .v-phone-item > span, .v-info-item span {
    width: 80px;
    color: #888888;
  }

  .v-phone-alter {
    margin-left: 8px;
    color: #1577ff;
    cursor: pointer;
    text-decoration: underline;
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

  /*v-info填写信息*/
  .v-trigger, .v-trigger2 {
    display: none;
    margin-top: 3px;
    margin-left: 8px;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    border-radius: 20px;
    background-color: #E1504A;
    color: #ffffff;
  }

  .verification .switch {
    margin-left: 8px;
    width: 18px;
    height: 18px;
    background: url("./img/switch.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
</style>
