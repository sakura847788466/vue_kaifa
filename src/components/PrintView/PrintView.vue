<template>
  <div class="list">
    <div class="list-item">
      <p class="chunk"><span>*</span><i>dsAppid</i>
        <input type="text"
               v-model="dsAppid"
               placeholder=""
               maxlength="39">
        <samp class="tip-info"><span class="ds_appid-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span></span><i>dsNumber</i>
        <input type="text"
               v-model="dsNumber"
               placeholder=""
               maxlength="16">
        <samp class="tip-info"><span class="ds_number-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item"
         style="position: relative">
      <p class="chunk"><span>*</span><i>printData</i>
        <input type="text"
               class="data"
               v-model="printName"
               placeholder="">
        <samp class="tip-info"><span class="printData-warn-tip"></span>
        </samp>
        <input type="file"
               class="file"
               ref="file"
               @change="uploader($event)"
               accept=".jpeg,.png,.pdf">
        <em class="file-btn">选择文件</em>
      </p>
    </div>

    <div class="list-item">
      <p class="chunk"><span>*</span><i>token</i>
        <input type="text"
               v-model="myToken"
               maxlength="32">
        <samp class="tip-info">token值 （访问令牌）<span class="ds_token-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span></span><i>threshold</i>
        <input type="text"
               maxlength="3"
               v-model="print.threshold"
               placeholder="">
        <samp>打印阀值（可不填写，默认为178，最佳效果(90—255）<span class="ds_token-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span></span><i>imageAlgorithm</i>
        <samp class="radioBtn">
          <label style="cursor: pointer;"
                 title="sharpen">
            <input type="radio"
                   name="imageType"
                   value="sharpen"
                   v-model="print.imageAlgorithm">锐化
          </label>
          <label style="margin-left: 10px;cursor: pointer;"
                 title="errordiffusion">
            <input type="radio"
                   name="imageType"
                   value="errordiffusion"
                   v-model="print.imageAlgorithm"> 误差扩散
          </label>
          <label style="margin-left: 10px;cursor: pointer;"
                 title="binarization">
            <input type="radio"
                   name="imageType"
                   value="binarization"
                   v-model="print.imageAlgorithm">
            黑白阈值
          </label>
        </samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span></span><i>concentration</i>
        <input type="text"
               maxlength="2"
               v-model="print.concentration"
               placeholder="">
        <samp class="tip-info">打印浓度，不填入使用系统默认值,范围值（1-30）<span class="ds_token-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span></span><i>paperWidth</i>
        <input type="text"
               v-model.number="cm"
               style="width: 90px"
               maxlength="4"
               @input="handleCm('inch')"
               placeholder="请输入cm">
        =
        <input type="text"
               v-model.number="inch"
               style="width: 90px"
               maxlength="4"
               @input="handleCm('cm')"
               placeholder="请输入英寸">
        <samp class="tip-info">厘米与英寸自动转换,纸宽大小<span class="ds_token-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item listItem">
      <p class="chunk"
         @click="toggleOption"><span></span><i>action</i>
        <input type="text"
               class="option1"
               v-model="print.action"
               disabled>
        <samp class="tip-info">打印(print) 或 预览(preview)</samp>
      </p>
      <div class="option"
           name="print"
           :style="{height:height+'px'}">
        <div class="onPrint"
             @click="switchOption('print')">print</div>
        <div class="printView"
             @click="switchOption('preview')">preview</div>
      </div>
      <div class="sanjiao"></div>
    </div>
    <div class="confirm ripple"><span @click="printView">检查问题</span></div>
    <Loading v-if="loading" />
    <Img v-if="Img"
         :printViewData="printViewData"
         :closeImg="closeImg" />
    <Dialog v-if="dialog"
            :msg="msg"
            :closeDialog="closeDialog" />
  </div>
</template>

<script>
import { printView } from '../../api'
import { validatePrintView } from '../../util/verification'
import MyModal from '../../components/MyModal/MyModal'
import Img from '../../components/Img/Img'
import Loading from '../../components/Loading/Loading'
import Dialog from '../../components/Dialog/Dialog'
import { strip } from "../../util/tool";

export default {
  name: "PrintView",
  data () {
    return {
      toggle: true,
      height: 0,
      myToken: '',
      printName: '',
      dsAppid: '',
      dsNumber: '',
      print: {
        printData: '',
        fileType: '',
        action: 'print',
        threshold: '',
        imageAlgorithm: 'sharpen',
        concentration: '',
        paperWidth: '',//纸宽大小
      },
      printViewData: '',
      Img: false,
      loading: false,
      dialog: false,
      msg: '',
      cm: '',//纸宽厘米
      inch: '',//纸宽英寸
      num: ''
    }
  },
  methods: {

    //点击显示打印或预览选项
    toggleOption () {
      if (this.toggle) {
        this.height = 41
        this.toggle = !this.toggle
      } else {
        this.height = 0
        this.toggle = !this.toggle
      }
    },
    //点击接口项切换对应的组件
    switchOption (action) {
      this.print.action = action
      this.height = 0
      this.toggle = true
    },
    //上传文件
    uploader ($event) {
      const file = $event.target.files[0]
      this.printName = file.name//显示文件名称
      if (file.type === 'application/pdf') {
        this.print.fileType = 'pdf'
      } else if (file.type === 'image/png' || file.type === 'image/jpeg') {
        this.print.fileType = 'photo'
      } else {
        this.printName = ''
        this.msg = '文件类型不正确，请选择.pdf,.png,.jpg,.jpeg,.jp2文件'
        this.dialog = true
        return
      }
      let reader = new FileReader();
      reader.onload = ($event) => {
        let result = $event.target.result
        result = result.split(';')
        result = result[1].split(',')
        this.print.printData = result[1]
        // console.log(this.print.printData);
      }
      reader.readAsDataURL(file);
    },

    //打印或者预览
    printView () {
      const data = {
        dsAppid: this.dsAppid,
        dsToken: this.myToken,
        dsNumber: this.dsNumber,
        print: this.print,
        printName: this.printName
      }
      const v = validatePrintView(data)
      if (v) {
        if (this.dsAppid.length !== 39) {
          this.msg = v
          this.dialog = true
          return
        }
      }
      const code = data.printName.indexOf('http')
      if (code == 0) {
        data.print.fileType = 'url_pdf'
        data.print.printType = 'url'
        data.print.printData = data.printName

      }


      if (this.dsNumber) {
        data.print.dsNumber = [this.dsNumber]
      } else {
        data.print.dsNumber = []
      }
      this.loading = true//显示loading
      data.print.paperWidth = this.inch//纸宽进行赋值

      if (data.print.action === 'print') {//打印的
        printView(data.dsAppid, data.dsToken, data.print)
          .then(res => {
            const result = {
              data: res.data,
              status: '成功',
              apiName: 'API 打印或预览',
              url: 'https://www.dascomyun.cn/20_openapi/v1.1/eInvoicePrint'
            }
            this.loading = false
            this.toggleCheckResult(true, result)
          })
          .catch(res => {
            const result = {
              data: res.data,
              status: '失败',
              apiName: 'API 打印或预览',
              url: 'https://www.dascomyun.cn/20_openapi/v1.1/eInvoicePrint'
            }
            this.loading = false
            this.toggleCheckResult(true, result)
          })
      } else {//预览的
        printView(data.dsAppid, data.dsToken, data.print)
          .then(res => {
            const result = {
              data: '预览成功',
              status: '成功',
              apiName: 'API 打印或预览',
              url: 'https://www.dascomyun.cn/20_openapi/v1.1/eInvoicePrint'
            }
            this.Img = true
            this.loading = false
            this.printViewData = res.data
            this.toggleCheckResult(true, result)
          })
          .catch(res => {
            const result = {
              data: res.data,
              status: '失败',
              apiName: 'API 打印或预览',
              url: 'https://www.dascomyun.cn/20_openapi/v1.1/eInvoicePrint'
            }
            setTimeout(() => {
              this.loading = false
              this.toggleCheckResult(true, result)
            }, 3000)
          })
      }
    },

    //检查是否url打印
    closeImg () {
      this.myModal = false
      this.Img = false
      this.printViewData = ''
    },
    closeDialog () {
      this.dialog = false
    },

    //单位转换
    handleCm (type) {
      if (type == 'cm') {
        this.cm = strip(this.inch * 2.54)
      } else {
        this.inch = strip(this.cm / 2.54)
      }
      if (this.inch == '' || this.cm == '') {
        this.cm = ''
        this.inch = ''
      }
    }
  },

  components: {
    MyModal,
    Img,
    Loading,
    Dialog
  },
  props: {
    toggleCheckResult: Function,
  },

}
</script>

<style scoped>
.list {
  margin-top: 30px;
  padding-top: 5px;
  flex-direction: row;
  width: 770px;
  height: auto;
  background: #fafafa;
}

.list-item {
  font-size: 20px;
}

.listItem {
  position: relative;
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
  width: 125px;
}

.list-item samp {
  font-size: 12px;
}

.list-item samp label {
  font-size: 14px;
}

.chunk {
  color: #666666;
  font-size: 14px;
  line-height: 34px;
}

.chunk > span {
  display: inline-block;
  width: 7px;
  margin-left: 20px;
  margin-right: 10px;
  color: rgba(216, 15, 15, 0.68);
}

input[type="text"] {
  box-sizing: border-box;
  width: 200px;
  height: 20px;
  outline: none;
}

.file-btn {
  display: block;
}

.list-item .file-btn,
.file {
  position: absolute;
  left: 375px;
  top: 5px;
  width: 100px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 24px;
  font-size: 14px;
  color: #ffffff;
  background-color: #0b9eff;
  cursor: pointer;
}

.option1 {
  background: white;
  border: 1px solid #cecece;
  text-align: center;
}

.radioBtn {
  color: #333333;
  font-size: 14px;
}

.print-btn {
  margin-top: 80px;
}

.printView {
  border-bottom: 2px solid #e0e0e0;
}

.file {
  opacity: 0;
  z-index: 2;
}

.option {
  box-sizing: border-box;
  z-index: 2;
  display: block;
  overflow: hidden;
  position: absolute;
  top: 6px;
  left: 166px;
  height: auto;
  width: 200px;
  border: 1px solid #e0e0e0;
  border-top: 1px solid #fafafa;
  background-color: #ffffff;
  transition: 0.3s;
}

.option div {
  font-size: 14px;
  line-height: 20px;
  color: #666666;
  text-align: center;
  border-bottom: 1px solid #cccccc;
  cursor: pointer;
}

.option div:hover {
  background-color: #f5f5f5;
}

.confirm {
  width: 100%;
  background: white;
  border-top: 1px solid transparent;
}

.confirm span {
  display: block;
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

.sanjiao {
  z-index: 5;
  position: absolute;
  width: 10px;
  height: 8px;
  top: 12px;
  left: 345px;
  transition: 0.3s;
  background: url("./img/pull.png") no-repeat;
  cursor: pointer;
}
</style>
