<template>
  <div class="page">
    <div class="page-left">
      <div class="list">
        <div class="list-item-menu"><p class="catalogue">目录</p></div>
        <div class="list-menu-item" v-for="(item,index) in list">
          <div class="list-title click1" @click="toggleList(index)">
            <span style="font-size: 8px;" class="glyphicon glyphicon-chevron-down"></span>
            {{item.title}}
          </div>
          <div v-show="item.isShow" class="list-item-menu-msg" >
            <div class="list-item" v-for="(msg ,i) in item.listMenu" :key="i" :class="{on:isCurrent(msg.id)}" @click="toggleMsgList(msg.id)">
              {{msg.title}}
            </div>
          </div>
        </div>
      </div>
    </div>


    <TextPage :msgId="msgId" :next="next"/>

  </div>
</template>

<script>
  import list from '../../data/list'
  import TextPage from "../../components/TextPage/TextPage";

  export default {
    name: "ApiText",
    components: {TextPage},
    mounted() {
      this.list = list
        //console.log(list)
    },
    data() {
      return {
        list: [],
        index: null,
        msgId:"1.1"
      }
    },
    methods: {

      //点击目录的第一级别
      toggleList(index) {
        this.msgId = index+1+'.1'
        // this.index = index
        this.list[index].isShow = !this.list[index].isShow
          //console.log(this.msgId)
      },

      toggleMsgList(id){
        this.msgId = id

      },
      //根据ID判断第二级别的目录点击后目录为光亮
      isCurrent(id) {
        if (this.msgId === id) {
          return true
        }
      },

      next(msgId){
        this.index = null
        this.msgId = msgId
        console.log(document.documentElement.scrollTop);
        document.documentElement.scrollTop = 0
        // window.screenTop = 0
      },
    }
  }
</script>

<style scoped>
  /*主体内容样式*/
  .page {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    margin: 20px auto;
    width: 1200px;
    min-height: 700px;
    border-radius: 20px;
    background-color: #FAFAFA;
  }

  /*目录开始*/
  .page-left {
    text-align: center;
    width: 280px;
  }

  .list {
    width: 250px;
    border-right: 1px solid #e0e0e0;
    text-align: left;
    color: #666666;
  }

  .list-title, .list-item-menu {
    padding: 20px 0 10px 40px;
    cursor: pointer;
    font-size: 18px;
    border-bottom: 1px solid #e0e6ed;
  }

  .list-title:hover{
    background-color: #f1f1f1;
  }

  .list-item-menu {
    cursor: initial;
    padding: 20px 0 10px 25px;
  }

  .list-item-menu > .catalogue {
    font-size: 20px;
    font-weight: normal;
    margin-bottom: 0;
  }

  .list-item {
    padding: 20px 0 10px 70px;
    font-weight: normal;
    cursor: pointer;
    font-size: 14px;
    border-bottom: 1px solid #e0e6ed;
  }

  .list-item:hover{
    background-color: #f5f5f5;
  }
  .on {
    background-color: #0b9eff;
    color: white;
  }
  .on:hover{
    background-color: #0b9eff;
  }
  /*目录结束*/

</style>
