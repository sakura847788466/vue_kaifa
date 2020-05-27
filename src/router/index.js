import Vue from 'vue'
import Router from 'vue-router'
import Index from '../page/Index/Index'
import ApiText from '../page/ApiText/ApiText'
import Application from '../page/Application/Application'
import Sandbox from '../page/Sandbox/sandbox'
import Document from '../page/Document/Document'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/application',
      name: 'Application',
      component: Application
    },
    {
      path: '/wxApplication',
      name: 'wxApplication',
      component: Application
    },
    {
      path: '/apiText',
      name: 'ApiText',
      component: ApiText
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox
    }, {
      path: '/document',
      name: 'Document',
      component: Document
    }
  ]
})
