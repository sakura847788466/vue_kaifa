/*
* 直接更新state的多个方法的对象
* */
import Vue from 'vue'

import {
  SET_TOKEN,
  USER_INFO,
  LOGIN_OUT
} from './mutations-type'


export  default {
  [SET_TOKEN](state,{token}){
    state.token = token
  },
  [USER_INFO](state,{userInfo}){
    state.userInfo = userInfo
  },
  [LOGIN_OUT](state){
    state.userInfo = {}
  },
}
