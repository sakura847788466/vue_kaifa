<template>
  <div class="all-bind-text">
    <p>
      <span class="title">错误编号</span>
      <span class="close" title="关闭" @click="openNoNumber">&Chi;</span>
    </p>
    <div class="table" cellpadding="1" cellspacing="1">
      <div class="tr" v-for="(item,index) in noNumber" :key="index">
        <span class="td">{{item.number}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NoNumber",
    props: {
      noNumber: Array,
      openNoNumber: Function
    }
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

  .all-bind-text > p {
    width: 90%;
    margin: 0 auto;
    margin-top: 8px;
    text-align: left;
    color: #666666;
  }

  .table {
    margin: 20px auto;
    width: 90%;
    min-height: 200px;
    border: 1px solid #ddd;
    background-color: #fff;
  }

  .tr{
    width: 100%;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #ddd;
  }
  .td{
    margin-left: 10px;
    font-size: 15px;
  }
</style>
