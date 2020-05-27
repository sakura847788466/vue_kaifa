<template>
  <div>
    <div class="page" v-if="userInfo.appid">
      <SandInterface/>
    </div>
    <transition name="fade">
      <Error-page v-if="!userInfo.appid" :onLogin="onLogin"/>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import ErrorPage from '../../components/ErrorPage/ErrorPage'
  import SandInterface from '../../components/SandInterface/sandInterface'
  import BindPrint from "../../components/BindPrint/BindPrint";

  export default {
    name: "sandbox",
    methods: {},
    computed: {
      ...mapState(['userInfo'])
    },
    components: {
      BindPrint,
      ErrorPage,
      SandInterface
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
