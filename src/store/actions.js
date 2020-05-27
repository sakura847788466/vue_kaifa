/*
* 通过mutation间接更新state的多个方法的对象
* */

import {SET_TOKEN,USER_INFO,LOGIN_OUT} from './mutations-type'
import {findUser} from '../api'

export default {
  saveGetToken({commit}, token) {
    commit(SET_TOKEN, {token})
  },
  async saveUserInfo({commit},appid){
    const result = await findUser(appid)
    if(result.code==0){
      const userInfo = result.data
      commit(USER_INFO,{userInfo} )
    }
  },
  clearUserInfo({commit}){
    commit(LOGIN_OUT)
  }

}
