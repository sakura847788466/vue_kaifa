//验证是否为空


export const validatePrintView = (data) => {
  let msg = ''
  const {dsAppid, dsToken, dsNumber, printName} = data
  msg = validate('dsAppid', dsAppid)
  if (msg) {
    return msg
  }
  msg = ven.notNumber(dsNumber)
  if (msg) {
    return msg
  }
  if (!dsToken.trim()) {
    msg = 'dsToken不能为空'
    return msg
  }else if(dsToken.length<32){
    msg = 'dsToken不能小于32位'
    return msg
  }else if (!printName.trim()) {
    msg = 'printData不能为空'
    return msg
  }

  return msg = ''
}

//打印结果验证函数
export const validateCheckPrinter = (data) => {
  let msg = ''
  const {dsAppid, dsToken, dsNumber} = data
  msg = validate('dsAppid', dsAppid)
  if (msg) {
    return msg
  }
  if (!dsToken.trim()) {
    msg = 'dsToken不能为空'
    return msg
  }else if(dsToken.length<32){
    msg = 'dsToken不能小于32位'
    return msg
  }
  msg = ven.printNumber(dsNumber)
  if (msg) {
    return msg
  }

  return msg
}

export const validatePenetrate = (data) => {
  let msg = ''
  const {dsAppid, dsToken, dsNumber, tarnparent} = data

  msg = validate('dsAppid', dsAppid)
  if (msg) {
    return msg
  }
  msg = ven.notNumber(dsNumber)
  if (msg) {
    return msg
  }
  if (!dsToken.trim()) {
    msg = 'dsToken不能为空'
    return msg
  }else if(dsToken.length<32){
    msg = 'dsToken不能小于32位'
    return msg
  }

  if (tarnparent.dataType == 'base64') {
    if (!tarnparent.printData.trim()) {
      msg = 'printData不能为空'
      return msg
    }
  } else {
    if (!tarnparent.printData[0].trim()) {
      msg = 'printData不能为空'
      return msg
    }
  }


  return msg = ''
}

export const validateGetToken = (data) => {
  const {dsAppid, secret} = data
  let msg = validate('dsAppid', dsAppid)
  if (msg) {
    return msg
  }
  return validate('secret', secret)

}
export const validateGetDelayPrintTask = (data) => {
  const {dsAppid,dsToken ,dsNumber} = data
  let msg = validate('dsAppid', dsAppid)
  let msg2= validate('dsToken', dsToken)
  let msg3 =ven.printNumber(dsNumber)
  if (msg) {
    return msg
  }else if(msg2){
    return msg2
  }else if(msg3){
    return msg3
  }

}
export const validateViceControl = (data) => {
  const {dsAppid,dsToken} = data
  let msg = validate('dsAppid', dsAppid)
  let msg2= validate('dsToken', dsToken)
  if (msg) {
    return msg
  }else if(msg2){
    return msg2
  }

}
export const validateGetPrintResult = (data) => {
  const {dsAppid,dsToken ,dascomId} = data
  let msg = validate('dsAppid', dsAppid)
  let msg2= validate('dsToken', dsToken)
  let msg3 =ven.dascomId(dascomId)
  if (msg) {
    return msg
  }else if(msg2){
    return msg2
  }else if(msg3){
    return msg3
  }
}

export const validateLogin = (data) => {
  const {username, password} = data
  let msg = ven.username(username)
  if (msg) {
    return msg
  }
  return ven.password(password)
}

export const validateNumber=(number)=>{
  let msg = ven.printNumber(number)
  if (msg){
    return msg
  }else {
    return msg='dsNumber号格式有误'
  }
  return msg
}
export const validateRegister = (data) => {
  const {username, password, phone, password2, code} = data
  let usernameMsg = ven.username(username)
  let passwordMsg = ven.password(password)
  let password2Msg = ven.password2(password, password2)
  let phoneMsg = ven.phone(phone)
  let codeMsg = ven.code(code)

  if (usernameMsg) {
    return usernameMsg
  } else if (phoneMsg) {
    return phoneMsg
  } else if (passwordMsg) {
    return passwordMsg
  } else if (password2Msg) {
    return password2Msg
  } else if (codeMsg) {
    return codeMsg
  }

}

export const validateGetRegister = (data) => {
  const {username, password, phone, password2} = data
  let usernameMsg = ven.username(username)
  let passwordMsg = ven.password(password)
  let password2Msg = ven.password2(password, password2)
  let phoneMsg = ven.phone(phone)

  if (usernameMsg) {
    return usernameMsg
  } else if (phoneMsg) {
    return phoneMsg
  } else if (passwordMsg) {
    return passwordMsg
  } else if (password2Msg) {
    return password2Msg
  }

}

function validate(type, data) {
  let msg = ''
  if (data.trim()) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/
    if (!(data.length == 32)) {
      msg = type + '为32位数据'
      return msg
    } else if (!reg.test(data)) {
      msg = type + '只能由数字和字母组成'
      return msg
    }
  } else {
    msg = type + '不能为空'
    return msg
  }
  return msg = ''
}


const ven = {
  username: function (username) {
    let msg = false
    let data = username.trim()
    let regex = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
    if (data) {
      if (data.length > 7) {
        if (!(regex.test(data))) {
          return msg = '用户名不能包含非法字符'
        }
      } else {
        return msg = '用户名长度不可以小于8'
      }
    } else {
      return msg = '请输入用户名'
    }
    return msg
  },
  password: function (password) {
    let msg = false
    let data = password.trim()
    let regex = /^[A-Za-z0-9]+$/
    if (data) {
      if (data.length > 7) {
        if (data.length > 20) {
          return msg = '密码长度不可以大于20'
        }
        if (!(regex.test(data))) {
          return msg = '密码不能包含非法字符'
        }
      } else {
        return msg = '密码长度不可以小于8'
      }
    } else {
      return msg = '请输入密码'
    }
    return msg
  },
  password2: function (password, password2) {
    let msg = false
    let data = password2.trim()
    let regex = /^[A-Za-z0-9]+$/
    if (data) {
      if (!(password == data)) {
        return msg = '两次密码不一致'
      }
      if (data.length > 7) {
        if (data.length > 20) {
          return msg = '密码长度不可以大于20'
        }
        if (!(regex.test(data))) {
          return msg = '密码不能包含非法字符'
        }
      } else {
        return msg = '密码长度不可以小于8'
      }
    } else {
      return msg = '请输入确认密码'
    }
    return msg
  },
  code: function (code) {
    let msg = false
    let data = code.trim()
    if (data) {
      const reg = /^\d{6}$/;
      if (!reg.test(data)) {
        return msg = '验证码格式有误'
      }
    } else {
      return msg = '请输入验证码'
    }
    return msg
  },
  phone: function (phone) {
    let msg = false
    if (phone) {
      const reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
      if (!reg.test(phone.trim())) {
        return msg = '手机号格式有误'
      }
    } else {
      return msg = '请输入手机号'
    }
    return msg
  },
  printNumber: function (data) {
    let msg = ''
    const rep = /^(?=.*[A-F])(?=.*\d)[A-F\d]{16}$/;
    if (data.trim()) {
      if (!rep.test(data)) {
        return msg = 'number号格式有误'
      }
    } else {
      return msg = '请输入number号'
    }
    return msg
  },
  //number可以为空的验证接口
  notNumber: function (data) {
    let msg = ''
    const rep = /^(?=.*[A-F])(?=.*\d)[A-F\d]{16}$/;
    if (data.trim()) {
      if (!rep.test(data)) {
        return msg = 'number号格式有误'
      }
    } else {
      return msg
    }
    return msg
  },
  //dascomId验证
  dascomId:function (data) {
    let msg=''
    const rep=/^[0-9]{20}$/
    if (data.trim()){
      if (!rep.test(data)){
        return msg='任务ID格式有误'
      }
    } else{
      return msg
    }
    return msg
  }
}

export const verificationCode = (code) => {
  let msg = ''
  if (code) {
    const reg = /^\d{6}$/;
    if (!reg.test(code.trim())) {
      return msg = '验证码格式有误'
    }
  } else {
    return msg = '请输入验证码'
  }
  return msg
}

export const verificationPhone = (phone) => {
  let msg = ''
  if (phone) {
    const reg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    if (!reg.test(phone.trim())) {
      return msg = '手机号格式有误'
    }
  } else {
    return msg = '请输入手机号'
  }
  return msg
}
/*
*
* @prams passworld 密码
* @return 密码的正确错误信息
* */
export const verificationPassword = (password) => {
  return ven.password(password)
}

export const verificationPrintNumber = (number) => {
  return ven.printNumber(number)
}
