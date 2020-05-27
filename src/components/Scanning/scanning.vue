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
        <input type="text" placeholder="" v-model="dsNumber" maxlength="32">
        <samp class="tip-info"> 设备编号 <span class="secret-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span>*</span><i>scanData</i>
        <input type="text" placeholder="请输入" v-model="scanData">
        <samp class="tip-info"> 扫描数据 <span class="secret-warn-tip"></span></samp>
      </p>
    </div>
      <div style="width: 100%;background-color: white;padding: 5px">
        <div class="confirm ripple" @click="GetDelayPrintTask">检查问题</div>
      </div>
      <Loading v-if="loading"/>
      <Dialog v-if="dialog" :msg="msg" :closeDialog="closeDialog"/>
    <h3>扫描结果 <span>请先绑定打印机再进行扫描调试！</span>
      <el-button style="float: right;margin-top: 10px" size="small" @click="clear">清空</el-button>
    </h3>
    <div  class="list-item" style="
    overflow-x:  scroll;">
      <p style="font-size: 14px;padding: 4px 0px" v-for="item in ScanningMes">{{item}}</p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Loading from '../Loading/Loading'
  import Dialog from '../Dialog/Dialog'
  import {validateGetDelayPrintTask} from '../../util/verification'
  import {sendScan} from '../../api'
  export default {
    name: "scanning",
    data() {
      return {
        dsNumber: '',
        dsToken: '',
        dsAppid: '',
        dialog: false,
        loading: false,
        scanData: '',
        ScanningMes: [],
        path: 'ws://192.168.11.2:10020/OpenapiWebSocket/',
      }
    },
    methods: {
      init: function () {
        if (typeof(WebSocket) === "undefined") {
          alert("您的浏览器不支持socket")
        } else {
          // 实例化socket
          this.socket = new WebSocket(this.path + this.userInfo.appid)
          // 监听socket连接
          this.socket.onopen = this.open
          // 监听socket错误信息
          this.socket.onerror = this.error
          // 监听socket消息
          this.socket.onmessage = this.getMessage
        }
      },
      open: function () {
        console.log("socket连接成功")
      },
      error: function () {
        console.log("连接错误")
      },
      getMessage: function (msg) {
        this.ScanningMes.push(msg.data)
        // console.log(msg.data, this.ScanningMes)
      },
      send: function () {
        this.socket.send(params)
      },
      close: function () {
        console.log("socket已经关闭")
      },
      clear() {
        this.ScanningMes = []
      },
      GetDelayPrintTask(){
        const {dsAppid, dsToken,dsNumber,scanData} = this
        const data = {
          dsAppid,
          dsToken,
          dsNumber
        }
        const data2={
          dsNumber,
          scanData
        }
        const v = validateGetDelayPrintTask(data)
        if (v) {
          if (dsAppid.length!==39){
            this.msg = v
            this.dialog = true
            return
          }
        }
        if (dsAppid&&dsToken&&dsNumber&&dsToken){
            this.loading=true
            sendScan(dsAppid,dsToken,data2)
              .then(res=>{
                this.loading=false
                  if(res.data==='发送成功'){
                    return this.$message({
                      message: res.data,
                      type: 'success'
                    })
                  }
              }).catch(err=>{
              this.loading=false
              return this.$message.error(err);
              })
            }
        }
    },
    mounted() {
      this.init()
    },
    destroyed() {
      // 销毁监听
      this.socket.onclose = this.close
    },
    computed: {
      ...mapState(['userInfo'])
    },
    components:{
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
    padding-left: 20px;
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

  .list > h3 {
    line-height: 50px;
    background-color: white;
  }

  .list > h3 > span {
    font-size: 12px;
    color: #666;
    margin-left: 2em;
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
