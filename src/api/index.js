import ajax from './ajax'

const PRINT_URL = window.ApiUrl.PRINT_URL
const APP_URL = window.ApiUrl.APP_URL
const WX_URL = window.ApiUrl.WX_URL

console.log(PRINT_URL)

export const getToken = (dsAppid, secret) => ajax(PRINT_URL + 'jsonWebTokens/getTokens', { dsAppid, secret }, 'POST')//获取token
export const printView = (dsAppid, dsToken, print) => ajax(PRINT_URL +
  `eInvoicePrint?dsAppid=${dsAppid}&dsToken=${dsToken}`, print, 'POST')//打印和预览
export const UnlimitedPrint = (dsAppid, dsToken, print) => ajax(PRINT_URL +
  `unlimitedPrint?dsAppid=${dsAppid}&dsToken=${dsToken}`, print, 'POST')//打印和预览
export const transparent = (data) => ajax(PRINT_URL +
  `transparentPrinting?dsAppid=${data.dsAppid}&dsToken=${data.dsToken}`, data.tarnparent, 'POST')//透传打印

export const checkPrinter = (data) => ajax(PRINT_URL + 'checkPrinter', data)//获取设备状态

export const login = (username, password) => ajax(APP_URL + 'v2.0/account/login', { username, password }, 'POST')//登录
export const register = (data) => ajax(APP_URL + 'v2.0/account/userVos', data, 'POST')//注册
export const findUser = (appid) => ajax(APP_URL + 'FindUser', { appid }, 'POST')//获取用户信息
export const updataMobile = (data) => ajax(APP_URL + 'UpdataMobile', data, 'POST')//修改绑定手机
export const updataPassword = (data) => ajax(APP_URL + 'UpdataPassword', data, 'POST')//修改用户密码
export const getSendSMS = (data) => ajax(APP_URL + 'v2.0/account/sendSMS', data, 'POST')//验证码
export const checkMobile = (data) => ajax(APP_URL + 'CheckMobile', data, 'POST')//校验验证码
export const updateSecret = (appid) => ajax(APP_URL + 'updateSecret', { appid }, 'POST')//更新密钥
export const haveMobile = (mobile) => ajax(APP_URL + 'haveMobile', { mobile }, 'POST')//验证手机号是否已经注册


export const getPrintBinds = (app_id) => ajax(APP_URL + 'GetPrintBinds', { app_id }, 'POST')//获取绑定打印机
export const bindPrinters = ({ app_id, device_codes }) => ajax(APP_URL + 'BindPrinters', { app_id, device_codes }, 'POST')//添加打印机
export const unBindPrinters = ({ app_id, device_id }) => ajax(APP_URL + 'UnBindPrinters', { app_id, device_id }, 'POST')//解绑打印机

export const wxGetConfig = () => ajax(WX_URL + 'getConfig')
export const wxLogin = (data) => ajax(WX_URL + 'callBack', data)

export const changeUrl = (dsAppid, dsToken, data) => ajax(PRINT_URL + `user/setReturnUrl?dsAppid=${dsAppid}&dsToken=${dsToken}`, data, 'POST')//修改回调地址
export const getReturnUrl = (dsAppid, dsToken) => ajax(PRINT_URL + `user/getReturnUrl?dsAppid=${dsAppid}&dsToken=${dsToken}`)//获取回调地址

export const getDelayPrintTask = (dsAppid, dsToken, dsNumber) => ajax(PRINT_URL + `getDelayPrintTask?dsAppid=${dsAppid}&dsToken=${dsToken}&dsNumber=${dsNumber}`)//获取设备待打印任务
export const getPrintResult = (dsAppid, dsToken, dascomId) => ajax(PRINT_URL + `getPrintResult?dsAppid=${dsAppid}&dsToken=${dsToken}&dascomId=${dascomId}`)//查询打印结果
export const voiceControl = (dsAppid, dsToken, data) => ajax(PRINT_URL + `voiceSend?dsAppid=${dsAppid}&dsToken=${dsToken}`, data, 'POST')
export const printCoordinate = (dsAppid, dsToken, data) => ajax(PRINT_URL + `printCoordinate?dsAppid=${dsAppid}&dsToken=${dsToken}`, data, 'POST')
export const getSandBox = (dsAppid) => ajax(PRINT_URL + `user/getSandBox?dsAppid=${dsAppid}`)//获取沙箱环境
export const openSandBox = (dsAppid) => ajax(PRINT_URL + `user/openSandBox?dsAppid=${dsAppid}`)//开启沙箱环境
export const sendScan = (dsAppid, dsToken, data) => ajax(PRINT_URL + `user/sendScan?dsAppid=${dsAppid}&dsToken=${dsToken}`, data, 'POST')
