<template>
  <div>
    <div class="all-bind-text">
      <p>
        <span class="title">批量绑定</span>
        <span class="noNumber" title="错误number" v-if="noNumber.length>0" @click="openNoNumber"></span>
        <span class="close" @click="allBindPrintClose" title="关闭">&Chi;</span>
      </p>
      <textarea class="textarea"
                placeholder="例如：006EBE7350027101#006EBE7350027102" v-model="allBindNumber"></textarea>
      <div class="btn-box">
        <span class="error-tip" v-if="length>0">还能绑定{{length}}条</span>
        <span class="error-tip" v-else>绑定数已满</span>
        <span class="empty" @click="empty">清 空</span>
        <span class="all-bind-btn" @click="affirm">确 定</span>
      </div>
      <p>批量绑定说明：</p>
      <ul>
        <li>1.打印机编号之间用<font color="red">#</font>隔开</li>
        <li>2.打印机编号由数字和大写英文字母组成的16位字符串</li>
      </ul>
    </div>
    <NoNumber v-if="isNoNumber" :noNumber="noNumber" :openNoNumber="openNoNumber"/>
    <MyModal/>
    <Tost v-if="isShowTost" :tost="tost"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import {bindPrinters, getPrintBinds} from '../../api'
  import {conversionBindNumber} from '../../util/tool'
  import MyModal from "../MyModal/MyModal";
  import Tost from "../Tost/Tost";
  import NoNumber from "../NoNumber/NoNumber";

  export default {
    name: "AllBindPrint",
    mounted() {
      this.app_id = this.userInfo.appid
      getPrintBinds(this.app_id)
        .then(res => {
          this.length = this.userInfo.permissionNumber - res.data.length
        })
    },
    data() {
      return {
        app_id: '',
        allBindNumber: '',
        length: '',
        tost: {},
        isShowTost: false,
        noNumber:[],
        isNoNumber:false
      }
    },
    methods: {
      empty() {
        this.allBindNumber = ''
      },
      openNoNumber(){
        this.isNoNumber = !this.isNoNumber
      },
      affirm() {
        const allBindNumber = conversionBindNumber(this.allBindNumber, this.length)
        const app_id = this.app_id
        if (allBindNumber.type) {
          bindPrinters({app_id, device_codes: allBindNumber.success})
            .then(res => {
              console.log(res);
              getPrintBinds(app_id)
                .then(res => {
                  this.length = this.userInfo.permissionNumber - res.data.length
                })
              this.controlTost('批量绑定成功', true)
              this.noNumber = allBindNumber.error
              // this.allBindPrintClose()
            })
            .catch(res => {
              this.noNumber = allBindNumber.error
              this.controlTost('绑定失败，请检查number', false)
            })
        } else {
          this.controlTost(allBindNumber.msg, false)
        }
      },
      //控制Tost
      controlTost(data, type) {
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
    },
    props: {
      allBindPrintClose: Function,
    },
    components: {NoNumber, Tost, MyModal},

  }
</script>

<style scoped>
  .all-bind-text {
    z-index: 10;
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    padding: 10px 20px;
    width: 500px;
    height: 380px;
    text-align: left;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  }

  .all-bind-text .close {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 20px;
    cursor: pointer;
    transition: .3s;
  }

  .close:hover {
    background-color: #dddddd;
  }
  .noNumber{
    position: absolute;
    display: inline-block;
    top: 12px;
    right: 50px;
    width: 10px;
    height: 10px;
    background-color: red;
    box-shadow: 1px 1px 1px red;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
    animation: noNumber linear 3s infinite;
  }
  .all-bind-text > .textarea {
    display: block;
    width: 90%;
    margin: 0 auto;
    margin-top: 10px;
    height: 200px;
    font-size: 20px;
    color: #666666;
    resize: none;
    outline: none;
  }

  .all-bind-text > .btn-box {
    display: flex;
    flex-direction: row;
    width: 90%;
    margin: 0 auto;
    margin-top: 8px;
  }

  .btn-box > .all-bind-btn, .btn-box > .empty {
    display: inline-block;
    margin-left: 20px;
    padding: 5px;
    width: 100px;
    color: #ffffff;
    cursor: pointer;
    font-size: 18px;
    text-align: center;
    background-color: #0b9eff;
  }

  .btn-box > .error-tip {
    display: block;
    width: 215px;
    font-size: 14px;
    color: #ff5a5a;
  }

  .all-bind-text > p, .all-bind-text > ul {
    width: 90%;
    margin: 0 auto;
    margin-top: 8px;
    text-align: left;
    color: #666666;
  }

  .all-bind-text li {
    margin-top: 8px;
    padding-left: 20px;
    font-size: 14px;
  }
  @keyframes noNumber {
    10%{
      box-shadow: 1px 1px 5px red;
    }
    20%{
      box-shadow: 1px 1px 1px #e61717;
    }
    30%{
      box-shadow: 1px 1px 5px red;
    }
    40%{
      box-shadow: 1px 1px 1px #e61717;
    }
    50%{
      box-shadow: 1px 1px 5px red;
    }
    60%{
      box-shadow: 1px 1px 1px #e61717;
    }
    70%{
      box-shadow: 1px 1px 5px red;
    }
    80%{
      box-shadow: 1px 1px 1px #e61717;
    }

    90%{
      box-shadow: 1px 1px 5px red;
    }
    100%{
      box-shadow: 1px 1px 5px #e61717;
    }
  }
</style>
