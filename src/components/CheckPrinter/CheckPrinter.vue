<template>
  <div class="list">
    <div class="list-item">
      <p class="chunk"><span>*</span><i>dsAppid</i>
        <input type="text" placeholder="" v-model="checkPrinterData.dsAppid" maxlength="39">
        <samp class="tip-info"> 用户唯一标识 <span class="ds_appid-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span>*</span><i>dsToken</i>
        <input type="text" placeholder="" v-model="checkPrinterData.dsToken" maxlength="32">
        <samp class="tip-info"> token值(访问令牌) <span class="secret-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span>*</span><i>dsNumber</i>
        <input type="text" placeholder="" v-model="checkPrinterData.dsNumber" maxlength="16">
        <samp class="tip-info"> 打印机编号 <span class="secret-warn-tip"></span></samp>
      </p>
    </div>
    <div class="confirm ripple" @click="getCheckPrinter">检查问题</div>
    <Loading v-if="loading"/>
    <Dialog v-if="dialog" :msg="msg" :closeDialog="closeDialog"/>
  </div>
</template>

<script>
  import {checkPrinter} from '../../api'
  import {validateCheckPrinter} from '../../util/verification'
  import Loading from '../../components/Loading/Loading'
  import Dialog from '../../components/Dialog/Dialog'
  export default {
    name: "CheckPrinter",
    mounted() {

    },
    data() {
      return {
        checkPrinterData:{
          dsNumber:'',
          dsAppid:'',
          dsToken:''
        },
        dialog: false,
        loading: false,
        msg:''
      }
    },
    methods: {
      getCheckPrinter(){
        //验证参数
        const v = validateCheckPrinter(this.checkPrinterData)
        if (v) {
          if (this.checkPrinterData.dsAppid.length!==39){
            this.msg = v
            this.dialog = true
            return
          }

        }
        this.loading = true
        checkPrinter(this.checkPrinterData)
          .then(res=>{
            this.loading = false
            const result = {
              data: res.data,
              status: '成功',
              apiName: '获取设备状态',
              url: 'https://open.dascomyun.com/api/v1.1/checkPrinter'
            }
            this.toggleCheckResult(true, result)
          })
          .catch(res=>{
            this.loading = false
            const result = {
              data: res.data,
              status: '失败',
              apiName: '获取设备状态',
              url: 'https://open.dascomyun.com/api/v1.1/checkPrinter'
            }
            this.toggleCheckResult(true, result)
            console.log(res);
          })
      },
      closeDialog() {
        this.dialog = false
      }
    },
    props: {
      toggleCheckResult: Function
    },
    components: {
      Loading,
      Dialog
    }
  }
</script>

<style scoped>
  .list {
    margin-top: 30px;
    flex-direction: row;
    margin-bottom: 26px;
    width: 770px;
    height: 110px;
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

  .list-item i {
    display: inline-block;
    font-style: normal;
    width: 85px;
  }

  .list-item samp {
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
