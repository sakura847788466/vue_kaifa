<template>
  <div>
    <div class="loading"></div>
    <MyModal/>
  </div>
</template>

<script>
  import MyModal from '../MyModal/MyModal'
  export default {
    name: "Loading",
    components:{
      MyModal
    }
  }
</script>

<style scoped>
  .loading {
    z-index: 11;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: url("../../assets/Loading.png") no-repeat;
    background-size: 100% 100%;
    width: 48px;
    height: 48px;
    animation: loading 1.2s linear infinite;
  }
  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
