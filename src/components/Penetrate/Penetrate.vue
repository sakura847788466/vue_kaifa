<template>
  <div class="list">
    <div class="list-item">
      <p class="chunk"><span>*</span><i>dsAppid</i>
        <input type="text" placeholder="" v-model="dsAppid" maxlength="39">
        <samp class="tip-info"><span class="ds_appid-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span></span><i>dsNumber</i>
        <input type="text" placeholder="" v-model="dsNumber" maxlength="16">
        <samp class="tip-info">&nbsp;打印设备编号<span class="ds_number-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span>*</span><i>token</i>
        <input type="text" placeholder="" v-model="myToken" maxlength="32">
        <samp class="tip-info">&nbsp;token值 （访问令牌）<span class="ds_token-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span>*</span><i>dataType</i>
        <samp class="radioBtn">
          <label style="cursor: pointer;">
            <input type="radio" name="dataType" value="base64" v-model="dataType"> base64
          </label>
          <label style="margin-left: 10px;cursor: pointer;">
            <input type="radio" name="dataType" value="bytes" v-model="dataType"> bytes
          </label>
        </samp>
      </p>
    </div>
    <div class="base64Input ">
      <div class="penetrate">
        <p class="chunk"><span>*</span><i>data</i></p>
        <textarea class="base64Text" v-model="printData"></textarea>
        <samp class="tip-info" style="
          bottom: 128px;"><span class="ds_penetrate-warn-tip"></span></samp>
      </div>
      <div class="p-btn">
        <div class="confirm"
             style="margin-top: 30px;margin-bottom: 80px" @click="print">检查问题
        </div>
        <div class="confirm"
        style="margin-top: 30px;margin-bottom: 80px" @click="empty">清 空
        </div>
      </div>
    </div>
    <Loading v-if="loading"/>
    <Dialog v-if="dialog" :msg="msg" :closeDialog="closeDialog"/>
  </div>
</template>

<script>
  import {transparent} from '../../api'
  import {validatePenetrate} from '../../util/verification'
  import Dialog from '../../components/Dialog/Dialog'
  import Loading from '../../components/Loading/Loading'

  export default {
    name: "Penetrate",
    data() {
      return {
        dsNumber: '',
        dsAppid: '',
        myToken: '',
        printData: '',
        dialog: false,
        loading: false,
        dataType: 'base64',
        msg: ''
      }
    },
    methods: {
      //清空
      empty() {
        this.printData = ''
      },
      //打印
      print() {
        let data = {
          dsNumber: this.dsNumber,
          dsAppid: this.dsAppid,
          dsToken: this.myToken,
          tarnparent: {
            dataType: this.dataType,
            dsNumber: [this.dsNumber]
          }
        }
        if(this.dsNumber==''){
          data.tarnparent.dsNumber = []
        }
        if (this.dataType == "base64") {
          data.tarnparent.printData = this.printData
        } else {
          data.tarnparent.printData = this.printData.split(',')
        }

        const v = validatePenetrate(data)
        if (v) {
          if (this.dsAppid.length!==39){
            this.msg = v
            this.dialog = true
            return
          }
        }
        this.loading = true
        transparent(data)
          .then(res => {
            const result = {
              data: res.data,
              status: '成功',
              apiName: '透传打印',
              url: 'https://www.dascomyun.cn/20_openapi/v1.1/transparentPrinting'
            }
            this.loading = false
            this.toggleCheckResult(true, result)

          })
          .catch(res => {
            const result = {
              data: res.data,
              status: '失败',
              apiName: '透传打印',
              url: 'https://www.dascomyun.cn/20_openapi/v1.1/transparentPrinting'
            }
            setTimeout(() => {
              this.loading = false
              this.toggleCheckResult(true, result)
            }, 3000)

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
      Dialog,
      Loading
    }
  }
</script>

<style scoped>
  .list {
    width: 770px;
    height: 300px;
    background: #FAFAFA;
    flex-direction: row;
    margin-bottom: 15px;
    border-bottom: 1px solid transparent;
  }

  .list-item {
    display: flex;
    position: relative;
    flex-direction: row;
    -ms-flex-direction: row;
    font-size: 20px;
  }

  .tip-info {
    font-size: 14px;
    color: #666666;
  }

  .tip-info span {
    color: rgba(216, 15, 15, 0.68);
  }

  .chunk {
    color: #333333;
    font-size: 14px;
    line-height: 34px;
  }
  .list-item i,.chunk i{
    display: inline-block;
    font-style: normal;
    width: 85px;
  }
  .list-item samp{
    font-size: 12px;
  }
  .chunk > span {
    display: inline-block;
    width: 7px;
    margin-left: 20px;
    margin-right: 10px;
    color: rgba(216, 15, 15, 0.68);
  }

  input[type=text] {
    width: 200px;
    outline: none;
  }

  .confirm {
    width: 90px;
    height: 24px;
    font-size: 14px;
    line-height:24px;
    text-align: center;
    border-radius: 38px;
    color: #ffffff;
    background-color: #0b9eff;
    cursor: pointer;
  }

  /*透传打印*/
  .penetrate {
    display: flex;
    flex-direction: row;
    font-size: 20px;
  }

  .penetrate textarea {
    width: 520px;
    height: 140px;
    font-size: 14px;
    resize: none;
    outline: none;
  }

  .p-btn {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }

  .radioBtn {
    box-sizing: border-box;
    flex-grow: 1;
    height: 36px;
    color: #666666;
  }

</style>
