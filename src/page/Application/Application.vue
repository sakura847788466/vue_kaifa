<template>
  <div>
    <div class="page" v-if="userInfo.appid">
      <Interface/>
      <BindPrint/>
    </div>
    <transition name="fade">
      <Error-page v-if="!userInfo.appid" :onLogin="onLogin"/>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import ErrorPage from '../../components/ErrorPage/ErrorPage'
  import Interface from '../../components/Interface/Interface'
  import BindPrint from "../../components/BindPrint/BindPrint";

  export default {
    name: "Application",
    methods: {},
    computed: {
      ...mapState(['userInfo'])
    },
    components: {
      BindPrint,
      ErrorPage,
      Interface
    },
    props: {
      onLogin: Function,
    }
  }
</script>

<style scoped>
  .page {
    box-sizing: border-box;
    margin: 20px auto;
    padding: 30px;
    width: 1200px;
    min-height: 700px;
    border-radius: 20px;
    background-color: #FAFAFA;
  }
</style>
