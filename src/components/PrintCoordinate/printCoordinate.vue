<template>
  <div class="list" ref="list">
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
      <p class="chunk"><span></span><i>dsNumber</i>
        <input type="text" placeholder="" v-model="dsNumber" maxlength="16">
        <samp class="tip-info"> 打印设备编号 <span class="secret-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span></span><i>paperX</i>
        <input type="number" placeholder="" v-model="paperX" max="2000">
        <samp class="tip-info"> 打印起始点坐标：X坐标 <span class="secret-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span></span><i>paperY</i>
        <input type="number" placeholder="" v-model="paperY" max="2000">
        <samp class="tip-info"> 打印起始点坐标：Y坐标 <span class="secret-warn-tip"></span></samp>
      </p>
    </div>
    <div class="list-item">
      <p class="chunk"><span>*</span><i>point</i>
        <input type="text" v-model="list.x" style="width: 40px" maxlength="4" placeholder="X" @input="isRealNum(0)">
        =
        <input type="text" v-model="list.y" style="width: 40px" maxlength="4" placeholder="Y" @input="isRealNum(1)">
        <input type="text" style="width: 100px" placeholder="内容" v-model="list.text">
        <button class="btn" @click="add">+</button>
        <samp class="tip-info">自定义的点坐标列表，x坐标，y坐标传入的点坐标单位为英寸<span class="ds_token-warn-tip"></span></samp>

      </p>
    </div>
    <div class="list-item" v-for="(item,key) in point" >
      <p class="chunk" ><span></span><i></i>
        <input type="text" :value="item.x" style="width: 40px" maxlength="4" placeholder="X" @input="isRealNum(0)">
        =
        <input type="text" :value="item.y" style="width: 40px" maxlength="4" placeholder="Y" @input="isRealNum(1)">
        <input type="text"  :value="item.text" style="width: 100px" placeholder="请输入打印内容">
        <button class="btn" @click="del(key)">-</button>
      </p>
    </div>
    <div class="confirm ripple" @click="GetDelayPrintTask">检查问题</div>
    <Loading v-if="loading"/>
    <Dialog v-if="dialog" :msg="msg" :closeDialog="closeDialog"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import {printCoordinate} from '../../api'
  import {validateViceControl,validateNumber} from '../../util/verification'
  import Loading from '../../components/Loading/Loading'
  import Dialog from '../../components/Dialog/Dialog'

  export default {
    name: "printCoordinate",
    data() {
      return {
        dsAppid: '',
        number:'',
        dsNumber: "",
        dsToken: '',
        paperX: 0,
        paperY: 0,
        point: [],
        list: {
          x: 0,
          y: 0,
          text: ''
        },
        dialog: false,
        loading: false,
        msg: '',

      }
    },
    methods: {
      GetDelayPrintTask() {
        this.paperX=Number(this.paperX)
        this.paperY=Number(this.paperY)
        const {dsAppid, dsToken, point,dsNumber,paperX,paperY} = this
        const data = {
          dsAppid,
          dsToken
        }
        let mes = {
          dsNumber,
          point,
          paperX,
          paperY
        }
        const v = validateViceControl(data)
        const s=validateNumber(dsNumber)
        if (v&&dsNumber==='') {
          if (dsAppid.length!==39){
            this.msg = v
            this.dialog = true
            return
          }
        }else if(v&&dsNumber!==''){
          if (dsAppid.length!==39){
            this.msg = s
            this.dialog = true
            return
          }
        }
        if (dsAppid && dsToken) {
          this.loading = true
          if (mes.dsNumber===''){
            delete mes.dsNumber
          }else{
            mes.dsNumber=mes.dsNumber.split(",")
          }
           // mes.point=JSON.stringify(mes.point)
          printCoordinate(dsAppid, dsToken, JSON.stringify(mes)).then(res => {
            // console.log(res)
            const result = {
              data: res.data,
              status: '成功',
              apiName: '自定义点坐标打印',
              url: 'https://open.dascomyun.com/api/v1.1/printCoordinate'
            }
            this.loading = false
            // // sessionStorage.setItem('token',res.data.accessToken)
            // // this.saveGetToken(res.data.accessToken)
            this.toggleCheckResult(true, result)
          }).catch(err => {
            const result = {
              data: err.data,
              status: '失败',
              apiName: '自定义点坐标打印',
              url: 'https://open.dascomyun.com/api/v1.1/printCoordinate'
            }
            setTimeout(() => {
              this.loading = false
              this.toggleCheckResult(true, result)
            }, 3000)

          })
        }
      },
      closeDialog() {
        this.dialog = false
      },
      listH() {
        console.log(this.$refs.list.children.length)
        let val=this.$refs.list.children.length
        this.$refs.list.style.height = val * 34 + 'px'
      },
      isRealNum(val) {
        let v = /^\+?[1-9][0-9]*$/
        if (val === 0) {
          if (!v.test(this.list.x)) {
            this.list.x = ''
          }
        } else if (val === 1) {
          if (!v.test(this.list.y)) {
            this.list.y = ''
          }
        }
      },
      add() {
        console.log(this.list)
        this.listH()
        if (this.list.x !== '' && this.list.y !== '' && this.list.text !== '') {
          console.log(this.list)
          this.list.x=Number(this.list.x)
          this.list.y=Number(this.list.y)
          this.point.push(this.list)
          this.list={
            x:'',
            y:'',
            text:''
          }
        }
      },
      del(val){
        this.point.splice(val,1)
        console.log(this.$refs.list.children.length)
        this.listH()
      }
    },
    props: {
      toggleCheckResult: Function
    },
    computed: {
      ...mapState(['userInfo'])
    },
    components: {
      Dialog,
      Loading
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .list {
    margin-top: 30px;
    flex-direction: row;
    margin-bottom:50px;
    width: 770px;
    height: 210px;
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
    display: block;
    float: left;
    font-style: normal;
    width: 85px;
    height: 26px;
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
    display: block;
    width: 20px;
    height: 34px;
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

  .btn {
    height: 21px;
    width: 21px;
    border-radius: 4px;
    /*outline: none;*/
    border: 1px solid #0b9eff;
    background-color: #0b9eff;
    color: white;
  }
</style>
