<template>
  <div class="myModal">

  </div>
</template>

<script>
  export default {
    name: "MyModal"
  }
</script>

<style scoped>
  /*预览窗口*/
  .myModal {
    z-index: 9;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.5);
  }

</style>
