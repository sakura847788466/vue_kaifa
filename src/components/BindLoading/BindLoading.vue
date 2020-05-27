<template>
    <div class="box">
      <span class="loading"></span>
      <span class="loading-text">加载中</span>
    </div>
</template>

<script>
  export default {
    name: "BindLoading"
  }
</script>

<style scoped>
  .box {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 50px;
    height: 50px;
  }

  .loading {
    width: 50px;
    height: 50px;
    display: inline-block;
    border: 5px solid #dddddd;
    border-left-color: #0b9eff;
    border-radius: 50%;
  }

  .loading-text {
    display: block;
    width: 60px;
    font-size: 14px;
    text-align: center;
    color: #666666;
  }

  .loading {
    animation: loading-animation 1.2s linear infinite;
  }

  @keyframes loading-animation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
