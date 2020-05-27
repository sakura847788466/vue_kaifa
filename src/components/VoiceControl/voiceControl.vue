<template>
  <div class="list">
    <div class="list-item">
      <p class="chunk"><span>*</span><i>dsAppid</i>
        <input type="text" placeholder="" v-model="dsAppid" maxlength="39">
        <samp class="tip-info"> 用户唯一标识 <span class="ds_appid-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span>*</span><i>dsToken</i>
        <input type="text" placeholder="" v-model="dsToken" maxlength="32">
        <samp class="tip-info"> 访问令牌 <span class="secret-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span>*</span><i>dsNumber</i>
        <input type="text" placeholder="" v-model="dsNumber" maxlength="16">
        <samp class="tip-info"> 带语音的设备编号 <span class="secret-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span>*</span><i style="display: block; float: left;margin-right: 5px">voice</i>
        <textarea placeholder="" v-model="voice" maxlength="16" style="min-width: 198px;min-height: 20px;max-width: 198px;margin-top: 5px"></textarea>
        <samp class="tip-info"> 播放内容 <span class="secret-warn-tip"></span></samp>
      </p>
    </div>
    <div class="confirm ripple" @click="GetDelayPrintTask">检查问题</div>
    <Loading v-if="loading"/>
    <Dialog  v-if="dialog" :msg="msg" :closeDialog="closeDialog"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import {voiceControl} from '../../api'
  import {validateGetDelayPrintTask} from '../../util/verification'
  import Loading from '../../components/Loading/Loading'
  import Dialog from '../../components/Dialog/Dialog'
  export default {
    name: "voiceControl",
    data() {
      return {
        dsAppid: '',
        dsNumber: '',
        dsToken:'',
        voice:'',
        dialog: false,
        loading: false,
        msg:'',

      }
    },
    methods:{
      GetDelayPrintTask(){
        const {dsAppid, dsToken,dsNumber,voice} = this
        const data = {
          dsAppid,
          dsToken,
          dsNumber,
        }
        let mes={
          dsNumber,
          voice
        }
        const v = validateGetDelayPrintTask(data)
        if (v) {
          this.msg = v
          this.dialog = true
          return
        }

        if (dsAppid && dsToken&&dsNumber) {
          this.loading = true
          console.log(mes)
          voiceControl(dsAppid, dsToken,mes).then(res => {
            console.log(res)
            const result = {
              data: res.data,
              status: '成功',
              apiName: '语音控制',
              url: 'https://open.dascomyun.com/api/v1.1/voiceSend'
            }
            this.loading = false
            // // sessionStorage.setItem('token',res.data.accessToken)
            // // this.saveGetToken(res.data.accessToken)
            this.toggleCheckResult(true, result)
          }).catch(err => {
            const result = {
              data: err.data,
              status: '失败',
              apiName: '语音控制',
              url: 'https://open.dascomyun.com/api/v1.1/voiceSend'
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
    computed:{
      ...mapState(['userInfo'])
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
    height: auto;
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
