<template>
  <div>
    <div class="img">
      <div class="guanbi" @click="close"></div>
      <img class="img-responsive" :src="printViewData"/>
    </div>
    <MyModal/>
  </div>

</template>

<script>
  import MyModal from "../MyModal/MyModal";
  export default {
    name: "Img",
    components: {MyModal},
    methods:{
      close(){
        this.closeImg()
      }
    },
    props:{
      printViewData:String,
      closeImg:Function
    }
  }
</script>

<style scoped>
  .img {
    z-index: 10;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 500px;
    height: 900px;
    padding: 50px;
    background: rgb(190, 190, 190);
    border-radius: 20px;
    transform: rotate(90deg);
  }
  .guanbi {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 20px;
    height: 20px;
    background: url("../../assets/close.png") no-repeat;
    background-size: 100% 100%;
    /*transform: rotate(90deg);*/
    cursor: pointer;
  }

  .img > img {
    width: 500px;
    height: 900px;
    /*transform: rotate(90deg);*/
  }
</style>
