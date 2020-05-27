//验证dsAppid的格式

//转换手机号格式
export const conversionPhone = (phone) => {
  let mobile = phone.slice(0, 4) + '*****' + phone.substr(-2, 4)
  return mobile
}

//把绑定的打印机进行处理
export const conversionBindPrint = (data) => {
  return data.map(item => ({
    number: item,
    type: false
  })).reverse()
}


//多选解绑number

export const conversionUnBindNumber = (data) => {
  let device_id = ''
  let arr = data.filter(item => {
    return item.type
  })
  if (!arr.length == 0) {
    for (let i = 0; i < arr.length; i++) {
      device_id = device_id + arr[i].number + '#'
    }
  } else {
    return false
  }
  return device_id = device_id.substring(0, device_id.lastIndexOf('#'))

}

//多条绑定number

export const conversionBindNumber = (data, length) => {
  //分割字符串
  let handleNumber = ''
  let noArrNumber = []
  let allNumber = data.split('#')
  let rep = /^(?=.*[A-F])(?=.*\d)[A-F\d]{16}$/
  if (!data) {
    return {
      type: false,
      msg: `请输入绑定number`
    }
  }
  if (allNumber.length > length) {
    return {
      type: false,
      msg: `绑定数超出`
    }
  }
  allNumber.forEach(item => {
    if (rep.test(item)) {
      item = item + '#'
      handleNumber += item
    } else {
      noArrNumber.unshift({ number: item.trim() })
    }

  })
  //去除最后一个#号
  handleNumber = handleNumber.substring(0, handleNumber.lastIndexOf('#'))

  return {
    type: true,
    success: handleNumber,
    error: noArrNumber
  }
}


//微信验证参数
export const getWxLogin = () => {
  const href = window.location.href
  const url = href.split('/wxApplication?')
  try {
    let result = url[1]
    result = result.split('&')
    let code = result[0]
    let state = result[1]
    code = code.split('=')
    state = state.split('=')
    code = code[1]
    state = state[1]
    return {
      code, state, url: url[0]
    }
  } catch (e) {
    return false
  }
}

//设置cookie
export const setCookie = (cname, cvalue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

//获取cookie
export const getCookie = (cname) => {
  const name = cname + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}
export const strip = (num, precision = 5) => {
  return + parseFloat(num.toPrecision(precision));
}
