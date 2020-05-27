<template>
  <div>
    <div class="item success" v-if="tost.type">
      <div class="msg"><span class="icon success-icon"></span>
        <p>{{tost.msg}}</p></div>
    </div>
    <div class="item fail" v-else>
      <div class="msg"><span class="icon fail-icon"></span>
        <p>{{tost.msg}}</p></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Tost",
    props: {
      tost: Object
    }
  }
</script>

<style scoped>
  .item{
    position: fixed;
    z-index: 10;
    top: 20px;
    left: 0;
    right: 0;
    margin: auto;
    width: 300px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    border-radius: 4px;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  }
  .success{
    background-color: #c1ffdf;
    color: #4caf50;
  }
  .fail {

    background-color: #ffd9d9;
    color: #ff4d4d;

  }

  .msg {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .icon{
    display: inline-block;
    margin: 0 10px;
    width: 14px;
    height: 14px;
  }
  .success-icon{
    background: url("./img/success.png");
    background-size: 100% 100%;
  }
  .fail-icon {
    background: url("./img/close.png");
    background-size: 100% 100%;
  }
</style>
