<template>
  <div class="BindPrint">
    <div class="bind">
      <p class="title">绑定打印机编号</p>
      <div class="chunk">
        <div class="bind-text">
          打印机编号:<input type="text"
                 class="number-input"
                 maxlength="16"
                 v-model="printNumber" />
        </div>
        <div class="bind-btn"
             @click="oneBindPrint">绑定</div>
        <span class="bind-tip"
              v-if="bindNumberLength>0">还能绑定{{bindNumberLength}}条</span>
        <span class="bind-tip"
              v-else>绑定数已满</span>
      </div>
    </div>
    <div class="print-title">
      <div class="print-title-text">
        <span class="select-all"
              @click="allSelect">
          <i v-if="isAllSelect"
             class="select-on">&radic;</i>
        </span>
        打印机编号
        <span class="print-length"></span>
      </div>
      <div class="caozuo">操作</div>
    </div>
    <div class="print-body">
      <BindLoading v-if="loading" />
      <div class="print-body-item"
           v-for="(item,index) in arr"
           :key="index">
        <div class="num">
          <span class="select"
                @click="oneSelect(index)"><i v-if="item.type"
               class="select-on">&radic;</i></span>
          <span class="print-num">{{item.number}}</span>
        </div>
        <span class="unBind"
              @click="oneUnBind(index,item.number)">解绑</span>
      </div>
    </div>
    <div class="print-footer">
      <span class="all-bind"
            @click="allBindPrintClose">批量绑定</span>
      <span class="all-unbind"
            @click="allUnBind">选中解绑</span>
    </div>
    <AllBindPrint v-if="isAllBindPrint"
                  :allBindPrintClose="allBindPrintClose" />
    <Tost :tost="tost"
          v-if="isShowTost" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { bindPrinters, getPrintBinds, unBindPrinters } from '../../api'
import { verificationPrintNumber } from '../../util/verification'
import { conversionBindPrint, conversionUnBindNumber } from '../../util/tool'
import BindLoading from "../BindLoading/BindLoading";
import Tost from "../Tost/Tost";
import AllBindPrint from "../AllBindPrint/AllBindPrint";

export default {
  name: "BindPrint",
  mounted () {
    this.$nextTick(() => {
      this.app_id = this.userInfo.appid
      getPrintBinds(this.app_id)
        .then(res => {
          this.arr = conversionBindPrint(res.data)
          this.loading = false
        })
    })
  },
  data () {
    return {
      app_id: '',
      printNumber: '',
      arr: [],
      tost: {},
      loading: true,
      isShowTost: false,
      isAllSelect: false,
      isAllBindPrint: false
    }
  },
  methods: {
    //全选
    allSelect () {
      if (this.arr.length == 0) {
        this.controlTost('请先绑定number', false)
        return
      }
      if (!this.isAllSelect) {
        this.arr.forEach(item => {
          item.type = true
        })
        this.isAllSelect = !this.isAllSelect
      } else {
        this.arr.forEach(item => {
          item.type = false
        })
        this.isAllSelect = !this.isAllSelect
      }
    },
    //单选
    oneSelect (index) {
      const printItem = this.arr[index]
      if (printItem.type) {
        this.arr[index].type = false
      } else {
        this.arr[index].type = true
      }
    },
    //单个绑定打印机
    oneBindPrint () {
      const { printNumber, app_id } = this
      console.log(this)//ada
      if (this.bindNumberLength <= 0) {
        this.controlTost('绑定数超出', false)
        return
      }
      const msg = verificationPrintNumber(printNumber)
      if (!msg) {
        bindPrinters({ app_id, device_codes: printNumber })
          .then(res => {
            this.controlTost('绑定成功', true)
            // console.log(printNumber)
            // this.$stroe.commit()
            this.printNumber = ''
            // this.arr.unshift({number:printNumber,type:false})
            getPrintBinds(this.app_id)
              .then(res => {
                this.arr = conversionBindPrint(res.data)
              })
          })
          .catch(res => {
            this.controlTost('绑定失败', false)
          })
      } else {
        this.controlTost(msg, false)
      }
    },
    //单个解绑
    oneUnBind (index, device_id) {
      const app_id = this.app_id
      unBindPrinters({ app_id, device_id })
        .then(res => {
          this.controlTost(res.data, true)
          this.arr.splice(index, 1)
        })
        .catch(res => {
          console.log(res);
        })
    },
    //选中解绑
    allUnBind () {
      let device_id = conversionUnBindNumber(this.arr);
      const app_id = this.app_id
      if (device_id) {
        unBindPrinters({ app_id, device_id })
          .then(res => {
            this.arr = this.arr.filter(item => {
              return item.type === false
            })
            this.controlTost(res.data, true)
            this.isAllSelect = false
          })
          .catch(res => {
            console.log(res);
          })
      } else {
        this.controlTost('请选择要解绑的number', false)
      }
    },

    //开启批量
    //关闭批量绑定窗口
    allBindPrintClose () {
      this.isAllBindPrint = !this.isAllBindPrint
      getPrintBinds(this.app_id)
        .then(res => {
          this.arr = conversionBindPrint(res.data)
        })
    },
    //控制Tost
    controlTost (data, type) {
      this.tost.msg = data
      this.tost.type = type
      this.isShowTost = true
      setTimeout(() => {
        this.isShowTost = false
      }, 1500)
    }

  },
  computed: {
    ...mapState(['userInfo']),
    bindNumberLength () {
      return this.userInfo.permissionNumber - this.arr.length
    }
  },
  components: { AllBindPrint, Tost, BindLoading }
}
</script>

<style scoped>
/*绑定打印机编号*/
.bind {
  margin-top: 20px;
}

.title {
  font-size: 20px;
  color: #333333;
}

.chunk {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
  height: 50px;
  background-color: #f4f4f4;
}

.bind-text {
  margin-left: 30px;
  color: #666666;
}

.bind-tip {
  margin-top: 12px;
  font-size: 12px;
  color: #1577ff;
}

.bind-btn {
  margin-left: 8px;
  margin-right: 12px;
  padding: 4px 8px;
  height: 20px;
  line-height: 22px;
  background-color: #0b9eff;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
.BindPrint {
  width: 770px;
}
.caozuo {
  margin-right: 60px;
  color: #666666;
}

.number-input {
  margin-left: 20px;
  height: 28px;
  width: 300px;
  font-size: 18px;
  color: #333333;
  border: 1px solid #e0e0e0;
}

.select,
.select-all {
  /*position: relative;*/
  display: inline-block;
  margin-right: 8px;
  width: 10px;
  height: 10px;
  border: 1px solid #0b9eff;
  cursor: pointer;
}

.select-on {
  display: inline-block;
  position: absolute;
  font-size: 12px;
  width: 100%;
  color: #0b9eff;
  font-style: normal;
}

.print-body-item {
  padding: 5px 0;
  /*font-size: 18px;*/
  color: #666666;
  /*text-align: center;*/
  /*border-bottom: 1px solid #cccccc;*/
}

.print-body-item:hover {
  background-color: #fafafa;
}

.print-body-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}

.print-body-item > .num {
  margin-left: 30px;
}

.select,
.select-all {
  position: relative;
  display: inline-block;
  margin-right: 8px;
  width: 10px;
  height: 10px;
  border: 1px solid #0b9eff;
  cursor: pointer;
}

.print-body-item > .unBind {
  margin-right: 50px;
  height: 20px;
  line-height: 20px;
  /*background-color: #0b9eff;*/
  border-radius: 4px;
  color: #0b9eff;
  cursor: pointer;
}

/*点击出现printInfo*/
.print-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /*margin-top: 20px;*/
  height: 50px;
  background-color: #f4f4f4;
}

.print-title-text {
  margin-left: 30px;
  color: #666666;
}

.print-length {
  font-size: 14px;
  color: #1577ff;
}

.print-body {
  /*position: relative;*/
  overflow-y: scroll;
  right: 0;
  height: 200px;
  /*border: 1px solid #e0e0e0;*/
  background-color: #f4f4f4;
}

.print-footer {
  /*position: relative;*/
  padding: 5px 0;
  height: 30px;
  text-align: right;
}

.print-footer > .all-unbind,
.print-footer > .all-bind {
  display: inline-block;
  margin-right: 50px;
  padding: 4px 8px;
  height: 20px;
  line-height: 22px;
  background-color: #0b9eff;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
.print-footer > .all-unbind {
  margin-right: 0;
}
</style>
