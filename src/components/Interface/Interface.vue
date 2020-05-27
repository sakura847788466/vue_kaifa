<template>
  <div>
    <div class="list">
      <div class="list-item gongsi">
        <p><span class="information">用户信息</span><span class="tag"
                style="font-size: 16px;">{{tag}}</span><span @click="onAlterUserInfo"
                style="margin-left: 3rem;color: #0095ff;font-size: 14px">绑定/修改手机号</span>
        </p>

        <div class="list-site">
          <p class="company">
            <span>用户名称： </span>
            {{userInfo.username}}
          </p>
        </div>
      </div>
      <div class="list-item ds-apid"
           v-if="userInfo.mobile!==null">
        <div class="list-site">
          <p class="appId"><span onselectstart="return false;"
                  unselectable="on">dsAppid：</span>{{userInfo.appid}}
            <a style="cursor:pointer; float: right;"
               class="copy"
               @click.stop="CopySecret(userInfo.appid)">复制</a>
          </p>
        </div>
      </div>
      <div class="list-item miyao"
           v-if="userInfo.mobile!==null">
        <div class="list-site">
          <p class="secret-key"
             @click="showSecret"><span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;钥：</span>{{InfoClick(userInfo.secret)}}
            <samp @click.stop="onRestartPage">
              <span class="restart"></span>
              <a href="#">修改</a>
            </samp>
            <a style="cursor:pointer; float: right;margin-right: 10px"
               class="copy"
               @click.stop="CopySecret(userInfo.secret)">复制</a>
          </p>
        </div>
      </div>
      <div class="list-item time">
        <div class="list-site">
          <p class="zcTime"><span>注册时间：</span>{{userInfo.registTime}}</p>
        </div>
      </div>
      <div class="list-item time">
        <div class="list-site">
          <p><span>回调地址：</span>{{returnURL}}
            <samp @click="changeURL">
              <span class="restart"></span>
              <a>修改</a></samp>
          </p>
        </div>
      </div>
      <div class="list-item token"
           v-if="userInfo.mobile!==null">
        <div class="list-site">
          <p class="appId"><span onselectstart="return false;"
                  unselectable="on">访问令牌：</span>{{this.token}}
            <samp>
              <span style="padding-right: 0"
                    v-if="timeShow">
                <a href="#"
                   ref="data">{{this.data}}</a>
              </span>
              <el-button @click="GetToken"
                         style="margin-top: -10px;"
                         size="mini"
                         type="primary"
                         v-if="!timeShow">获取</el-button>
            </samp>
            <a style="cursor:pointer; float: right;margin-right: 10px"
               class="copy"
               @click.stop="CopySecret(token)">复制</a>
          </p>
        </div>
      </div>
    </div>
    <transition name="fade">
      <RestartPage v-if="restartPage"
                   :closeRestartPage="closeRestartPage" />
      <LoginOut v-if="loginOut"
                :closeLoginOut="closeLoginOut" />
      <AlterUserInfo v-if="alterUserInfo"
                     :closeAlterUserInfo="closeAlterUserInfo" />
      <IsMobile v-if="isMobile"
                :closeIsMobile="closeIsMobile" />
    </transition>
    <Dialog v-if="dialog"
            :msg="msg"
            :closeDialog="closeDialog" />
  </div>

</template>

<script>
import { changeUrl, getReturnUrl, getToken, getSandBox, openSandBox } from "../../api";
import { mapState, mapActions } from 'vuex'
import RestartPage from '../RestartPage/RestartPage'
import Dialog from '../Dialog/Dialog'
import AlterUserInfo from '../AlterUserInfo/AlterUserInfo'
import IsMobile from "../IsMobile/IsMobile"
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

export default {
  name: "Interface",
  data () {
    return {
      restartPage: false,//显示是否更新密钥页面
      loginOut: false,//显示是否退出页面
      alterUserInfo: false,//显示修改用户信息页面
      isMobile: false,//显示添加手机号的
      returnURL: '',//回调地址
      show: false,
      time: "",
      timeShow: true,
      timeData: '',
      data: "",
      returnToken: '',
      msg: '',
      dialog: false,

    }
  },
  methods: {
    ...mapActions(['saveGetToken']),
    //开启密钥修改
    onRestartPage () {
      if (this.userInfo.mobile) {
        this.restartPage = true
      } else {
        this.onIsMobile()
      }
    },
    closeRestartPage () {
      this.restartPage = false
    },

    //开启用户信息修改
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
    changeURL () {//修改回调地址
      if (this.token === '') {
        return this.$message({
          message: '请先获取访问令牌再进行修改！',
          type: 'warning'
        })
      } else {
        this.$prompt('请输入回调地址', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /(http|https):\/\/([\w.]+\/?)\S*/,
          inputErrorMessage: '回调地址格式不正确',
        }).then(({ value }) => {
          if (value === this.returnURL) {
            return this.$message({
              message: '输入的回调地址与原地址一致！',
              type: 'warning'
            });
          }
          let dataVal = {};
          dataVal.returnUrl = value;
          changeUrl(this.userInfo.appid, this.token, dataVal)
            .then((res) => {
              console.log(res)
              if (res.code === 0) {
                this.returnURL = value
              } else {
                return this.$message.error(res.data);
              }
            })

        }).catch(() => {

        });
      }

    },
    getreturnUrl () {//获取回调地址
      getReturnUrl(this.userInfo.appid, this.token)
        .then(res => {
          this.returnURL = res.data
          // console.log(res)
        }).catch((err) => {
          console.log(err)
        })
    },
    showSecret () {
      this.show = !this.show
    },
    /**
     * @return {string}
     */
    InfoClick (val) {
      if (this.show) {
        return val
      } else {
        return "******************************"
      }
    },
    CopySecret (val) {
      let oInput = document.createElement("input");
      oInput.value = val;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      if (document.execCommand('Copy')) {
        this.$notify({
          title: '复制成功',
          type: 'success'
        });
      } else {
        this.$notify({
          title: '复制失败',
          type: 'error'
        });
      }
      oInput.className = "oInput";
      oInput.style.display = "none";
    },
    //获取token
    GetToken () {
      getToken(this.userInfo.appid, this.userInfo.secret)
        .then(res => {
          this.timeShow = true
          this.time = res.data.expiresIn
          // this.returnToken = res.data.accessToken
          this.saveGetToken(res.data.accessToken)
          this.getreturnUrl()
          this.Count()
          console.log(res, this.time)
        }).catch(err => {
          console.log(err)
        })
    },
    //倒计时
    Count () {
      let time = this.time
      this.timeData = setInterval(() => {
        time -= 1000
        if (time < 1000) {
          this.timeShow = false
          clearInterval(this.timeData);
        } else {
          let hours = parseInt(time / 1000 / 60 / 60);
          let minutes = parseInt((time - hours * 1000 * 60 * 60) / 1000 / 60);
          let seconds = parseInt((time - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000);
          // console.log(((hours > 9) ? hours : '0' + hours) + ":" + ((minutes > 9) ? minutes : '0' + minutes) + ":" + ((seconds > 9) ? seconds : '0' + seconds));
          this.data = ((hours > 9) ? hours : '0' + hours) + ":" + ((minutes > 9) ? minutes : '0' + minutes) + ":" + ((seconds > 9) ? seconds : '0' + seconds);
          // console.log(this.data)
        }
      }, 1000);
    },
    closeDialog () {
      this.dialog = false
    },

  },
  computed: {
    ...mapState(['userInfo', 'token']),
    tag () {
      const tag = this.userInfo.TheDiffrent
      if (tag == 'PES') {
        return '(个人版)'
      } else {
        return '(企业版)'
      }

    }
  },
  components: {
    IsMobile,
    RestartPage,
    AlterUserInfo,
    Dialog,
  },
  mounted () {
    this.GetToken()
  }
}
</script>

<style scoped>
/*.list {*/
/*display: flex;*/
/*flex-direction: row;*/
/*flex-wrap: wrap;*/
/*justify-content: space-between;*/
/*height: 330px;*/
/*}*/

.list .list-item {
  /*font-size: 24px;*/
  /*color: #0b9eff;*/
}

.list {
  font-size: 19px;
}

.list-item .list-site {
  /*margin-top: 45px;*/
  /*width: 375px;*/
  /*text-align: center;*/
}

.list .information {
  font-size: 19px;
  padding: 0;
}

/*.list-site p:nth-child(2) {*/
/*margin-top: 15px;*/
/*font-size: 18px;*/
/*color: #333333;*/
/*}*/
.list-item p {
  margin-bottom: 36px;
  width: 580px;
  font-size: 14px;
}

.list-item span {
  padding-left: 21px;
  padding-right: 40px;
}

.list-item samp {
  float: right;
}

.list-item a {
  text-decoration: none;
  color: rgba(0, 149, 255, 1);
}

.list-item .write,
.list-item .restart {
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url("./img/modify.png") no-repeat;
  cursor: pointer;
  vertical-align: middle;
  padding: 0;
}
</style>
