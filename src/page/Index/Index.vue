<template>
  <div class="page">
    <div class="info">
      <p class="title">使用说明</p>
      <p>（1）选择合适的接口。</p>
      <p> （2）系统会生成该接口的参数表，您可以直接在文本框内填入对应的参数值。（红色星号表示该字段必填）</p>
      <p> （3）点击检查问题按钮，即可得到相应的调试信息。</p>
    </div>

    <p class="title list1">接 口 列 表</p>
    <div class="title-list">
      <div class="listBox">接口名称<input type="text"
               maxlength="20"
               class="api-name-val"
               v-model="optionTitle"
               disabled></div>
      <div class="title-option"
           :style="{height:height+'px'}"
           ref="opt">
        <div class="api-name1"
             @click="switchOption('token')">获取访问令牌</div>
        <div class="api-name1"
             @click="switchOption('checkPrinter')">获取设备状态</div>
        <div class="api-name2"
             @click="switchOption('print')">API 打印或预览</div>
        <div class="api-name1"
             @click="switchOption('unlimitedPrint')">无限制通用打印</div>
        <div class="api-name3"
             @click="switchOption('penetrate')">透传打印</div>
        <!--<div class="api-name1" @click="switchOption('expressPrint')">快递面单打印</div>-->
        <div class="api-name1"
             @click="switchOption('printCoordinate')">自定义点坐标打印</div>
        <div class="api-name1"
             @click="switchOption('getPrintResult')">查询打印结果</div>
        <div class="api-name1"
             @click="switchOption('getDelayPrintTask')">获取设备待打印任务</div>
        <!--<div class="api-name1" @click="switchOption('voiceContrsol')">语音控制</div>-->
        <div class="api-name1"
             @click="switchOption('scanning')">扫描调试</div>
      </div>
      <div class="sanjiao ripple"
           @click="toggleOption"></div>
    </div>
    <p class="title">参数列表:</p>
    <keep-alive>
      <GetToken v-if="type==='token'"
                :toggleCheckResult="toggleCheckResult" />
      <CheckPrinter v-if="type==='checkPrinter'"
                    :toggleCheckResult="toggleCheckResult" />
      <PrintView v-if="type==='print'"
                 :toggleCheckResult="toggleCheckResult" />
      <UnlimitedPrint v-if="type==='unlimitedPrint'"
                      :toggleCheckResult="toggleCheckResult" />
      <Penetrate v-if="type==='penetrate'"
                 :toggleCheckResult="toggleCheckResult" />
      <GetDelayPrintTask v-if="type==='getDelayPrintTask'"
                         :toggleCheckResult="toggleCheckResult" />
      <GetPrintResult v-if="type==='getPrintResult'"
                      :toggleCheckResult="toggleCheckResult" />
      <VoiceControl v-if="type==='voiceControl'"
                    :toggleCheckResult="toggleCheckResult" />
      <PrintCoordinate v-if="type==='printCoordinate'"
                       :toggleCheckResult="toggleCheckResult" />
      <Scanning v-if="type==='scanning'"
                :toggleCheckResult="toggleCheckResult" />
    </keep-alive>
    <transition name="fade">
      <CheckResult v-if="checkResult"
                   :closeCheckResult="closeCheckResult"
                   :result="result" />
    </transition>
  </div>
</template>

<script>
import CheckResult from '../../components/CheckResult/CheckResult'
import GetToken from '../../components/GetToken/GetToken'
import CheckPrinter from '../../components/CheckPrinter/CheckPrinter'
import UnlimitedPrint from '../../components/UnlimitedPrint/UnlimitedPrint'
import PrintView from '../../components/PrintView/PrintView'
import Penetrate from '../../components/Penetrate/Penetrate'
import Scanning from "../../components/Scanning/scanning";
import GetDelayPrintTask from "../../components/GetDelayPrintTask/getDelayPrintTask"
import GetPrintResult from "../../components/GetPrintResult/getPrintResult"
import PrintCoordinate from "../../components/PrintCoordinate/printCoordinate"
import VoiceControl from "../../components/VoiceControl/voiceControl"
import { mapState } from 'vuex'
export default {
  name: "Index",
  data () {
    return {
      checkResult: false,
      result: {},
      type: 'token',
      height: 0,
      toggle: true,
      optionTitle: '获取访问令牌',
    }
  },
  methods: {
    toggleCheckResult (type, result) {
      this.checkResult = type
      this.result = result
    },
    closeCheckResult () {
      this.checkResult = false
      this.result = {}
    },
    //点击显示接口列表
    toggleOption () {
      // console.log(this.$refs.opt.children.length)
      if (this.toggle) {
        this.height = 20 * this.$refs.opt.children.length
        this.toggle = !this.toggle
      } else {
        this.height = 0
        this.toggle = !this.toggle
      }
    },

    //点击接口项切换对应的组件
    switchOption (option) {

      switch (option) {
        case 'token':
          this.optionTitle = '获取访问令牌'
          break
        case 'print':
          this.optionTitle = 'API 打印或预览'
          break
        case 'penetrate':
          this.optionTitle = '透传打印'
          break
        case 'checkPrinter':
          this.optionTitle = '获取设备状态'
          break
        case 'unlimitedPrint':
          this.optionTitle = '无限制通用打印'
          break
        case 'expressPrint':
          this.optionTitle = '快递面单打印'
          break
        case 'printCoordinate':
          this.optionTitle = '自定义点坐标打印'
          break
        case 'getPrintResult':
          this.optionTitle = '查询打印结果'
          break
        case 'scanning':
          this.optionTitle = '扫描调试'
          break
        case 'getDelayPrintTask':
          this.optionTitle = '获取设备待打印任务'
          break
        case 'voiceControl':
          this.optionTitle = '语音控制'
          break
        default:
          this.optionTitle = ''
          break
      }

      this.type = option
      this.height = 0
      this.toggle = true
      this.checkResult = false
    },

  },
  components: {
    CheckResult,
    GetToken,
    PrintView,
    Penetrate,
    CheckPrinter,
    UnlimitedPrint,
    Scanning,
    GetDelayPrintTask,
    GetPrintResult,
    PrintCoordinate,
    VoiceControl
  },
  computed: {
    ...mapState(['userInfo', 'token'])
  },
}
</script>

<style scoped>
.page {
  box-sizing: border-box;
  margin: 20px auto 20px;
  padding: 30px;
  width: 1200px;
  min-height: 700px;
  border-radius: 20px;
  background-color: #ffffff;
}

.info .title,
.title {
  margin-bottom: 20px;
  font-size: 18px;
  color: #333333;
}

.info p {
  margin-bottom: 15px;
  font-size: 16px;
  font-family: 黑体;
  color: #666666;
}
.list1 {
  padding-top: 20px;
}
.title-list {
  display: flex;
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  position: relative;
  flex-direction: row;
  -ms-flex-direction: row;
  margin-top: 30px;
  margin-bottom: 40px;
  font-size: 20px;
}

.title-option {
  box-sizing: border-box;
  z-index: 1;
  display: block;
  overflow: hidden;
  position: absolute;
  top: 7px;
  left: 126px;
  height: 0;
  width: 202px;
  border: 1px solid #cecece;
  border-top: 1px solid transparent;
  background-color: #ffffff;
  transition: 0.3s;
}

.title-option > div {
  z-index: 1;
  font-size: 14px;
  color: #666666;
  text-align: center;
  cursor: pointer;
  line-height: 20px;
}

.title-option > div:hover {
  background-color: #f5f5f5;
}

/*参数列表*/
/*公共样式*/

.listBox {
  width: 770px;
  height: 36px;
  background: #fafafa;
  line-height: 36px;
  font-size: 14px;
  padding-left: 20px;
  box-sizing: border-box;
  position: relative;
}
.chunk > span {
  float: left;
  margin-left: 20px;
  color: rgba(216, 15, 15, 0.68);
}
input[type="text"] {
  margin-left: 50px;
  width: 198px;
  text-align: center;
  background: white;
  border: 1px solid #cecece;
}

.sanjiao {
  z-index: 5;
  position: absolute;
  width: 10px;
  height: 8px;
  top: 12px;
  left: 300px;
  transition: 0.3s;
  background: url("./img/pull.png") no-repeat;
  cursor: pointer;
}
</style>
