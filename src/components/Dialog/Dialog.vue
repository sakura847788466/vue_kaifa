<template>
  <div>
    <div class="dialog">
      <div class="d-header">
        <p>操作失败</p>
        <span></span>
      </div>
      <p class="d-content">{{msg}}</p>
      <div class="d-affirm">
        <span class="d-btn d-on" @click="close">确认</span>
      </div>
    </div>
    <MyModal/>
  </div>
</template>

<script>
  import MyModal from '../MyModal/MyModal'

  export default {
    name: "Dialog",
    components: {MyModal},
    methods: {
      close() {
        this.closeDialog()
      }
    },
    props: {
      msg: String,
      closeDialog: Function
    },
    components:{
      MyModal
    }
  }
</script>

<style scoped>
  .dialog {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 500px;
    height: 150px;
    /*border: 1px solid #666666;*/
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  }

  .dialog > .d-header {
    margin-left: 24px;
    padding-top: 5px;
    line-height: 40px;
    font-size: 18px;
    font-weight: 500;
    color: #333333;
  }

  .dialog > .d-content {
    margin-left: 24px;
    line-height: 50px;
    font-size: 14px;
    font-weight: 500;
    color: #666666;
  }

  .dialog > .d-affirm {
    margin-top: 14px;
    text-align: right;
  }

  .d-affirm > .d-btn {
    display: inline-block;
    padding: 8px 15px;
    font-size: 14px;
    cursor: pointer;
    color: #2196f3;
  }

  .d-btn:hover {
    background-color: rgba(34, 151, 244, 0.1);
  }

  .d-affirm > .d-on {
    margin-right: 18px;
  }

</style>
