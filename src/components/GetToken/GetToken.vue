<template>
  <div class="list">
    <div class="list-item">
      <p class="chunk"><span>*</span><i>dsAppid</i>
        <input type="text" placeholder="" v-model="dsAppid" maxlength="39">
        <samp class="tip-info"> 用户唯一标识 <span class="ds_appid-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span>*</span><i>secret</i>
        <input type="text" placeholder="" v-model="secret" maxlength="32">
        <samp class="tip-info"> 用户密钥 <span class="secret-warn-tip"></span></samp>
      </p>
    </div>
    <div class="confirm ripple" @click="getToken">检查问题</div>
    <Loading v-if="loading"/>
    <Dialog  v-if="dialog" :msg="msg" :closeDialog="closeDialog"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  import {getToken} from '../../api'
  import {validateGetToken} from '../../util/verification'
  import Loading from '../../components/Loading/Loading'
  import Dialog from '../../components/Dialog/Dialog'

  export default {
    name: "GetToken",
    data() {
      return {
        dsAppid: '',
        secret: '',
        dialog: false,
        loading: false,
        msg:''
      }
    },
    methods: {
      ...mapActions(['saveGetToken']),
      getToken() {
        const {dsAppid, secret} = this
        const data = {
          dsAppid,
          secret
        }
        const v = validateGetToken(data)
        if (v) {
          if (dsAppid.length!==39){
            this.msg = v
            this.dialog = true
            return
          }
        }

        if (dsAppid&& secret) {
          this.loading = true
          getToken(dsAppid, secret).then(res => {
            const result = {
              data: res.data.accessToken,
              status: '成功',
              apiName: '获取访问令牌',
              url: 'https://open.dascomyun.com/api/v1.1/jsonWebTokens/getTokens'
            }
            this.loading = false
            // sessionStorage.setItem('token',res.data.accessToken)
            this.saveGetToken(res.data.accessToken)
            this.toggleCheckResult(true, result)
          }).catch(err => {
            const result = {
              data: err.data,
              status: '失败',
              apiName: '获取访问令牌',
              url: 'https://open.dascomyun.com/api/v1.1/jsonWebTokens/getTokens'
            }
            setTimeout(()=>{
              this.loading = false
              this.toggleCheckResult(true, result)
            },3000)

          })

        }

      },
      closeDialog() {
        this.dialog = false
      }
    },
    props: {
      toggleCheckResult: Function
    },
    components: {
      Dialog,
      Loading
    }
  }
</script>

<style scoped>
  .list {
    margin-top: 30px;
    flex-direction: row;
    margin-bottom: 26px;
    width: 770px;
    height: 78px;
    background: #FAFAFA;
  }

  .list-item {
      font-size: 20px;
    }

  .tip-info {
    font-size: 14px;
    color: #666666;
  }

  .tip-info span {
    color: rgba(216, 15, 15, 0.68);
  }
  .list-item i{
    display: inline-block;
    font-style: normal;
    width: 85px;
  }
  .list-item samp{
    font-size: 12px;
  }
  .chunk {
    color: #333333;
    font-size: 14px;
    line-height: 34px;
  }

  .chunk > span {
    float: left;
    margin-left: 20px;
    margin-right: 10px;
    color: rgba(216, 15, 15, 0.68);
  }

  input[type=text] {
    width: 200px;
    height: 20px;
    outline: none;
  }

  .list-item .file-btn {
    position: absolute;
    right: 0;
    width: 100px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    border-radius: 34px;
    font-size: 16px;
    color: #ffffff;
    background-color: #0b9eff;
    cursor: pointer;
  }

  .confirm {
    width: 100px;
    height: 24px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    border-radius: 38px;
    color: #ffffff;
    background-color: #0b9eff;
    cursor: pointer;
    margin-top: 30px;
  }

</style>
