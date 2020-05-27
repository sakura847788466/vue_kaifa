<template>
  <div class="error-page">
    <div class="error-body">
      <div class="error-img"></div>
      <div class="error-text">抱歉，登录后才能查看喔！</div>
      <a class="error-btn" @click="login">立即登录</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ErrorPage",
    methods: {
      login() {
        this.onLogin()
      }
    },
    props: {
      onLogin: Function
    }
  }
</script>

<style scoped>
  /*用户没有登录显示 页面*/
  .error-page {
    margin: 20px auto;
    width: 1200px;
    height: 700px;
    border-radius: 20px;
    background-color: #FAFAFA;
  }

  .error-body {
    margin: 0 auto;
    padding-top: 156px;
  }

  .error-img {
    width: 276px;
    height: 206px;
    margin: 0 auto;
    background: url("./img/tip_chart.png") no-repeat;
    background-size: 100% 100%;
  }

  .error-text {
    margin-top: 14px;
    text-align: center;
    font-size: 16px;
    color: #666666;
  }

  .error-btn {
    display: block;
    margin: 20px auto 0;
    width: 130px;
    height: 32px;
    line-height: 34px;
    text-align: center;
    color: #fff;
    font-weight:400;
    border-radius: 16px;
    background-color: #0095FF;
    cursor: pointer;
  }
</style>
