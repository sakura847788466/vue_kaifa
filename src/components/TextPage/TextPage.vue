<template>
  <div class="page-right" id="page">
    <div class="page-item" v-show="msgId==='1.1'">
      <div class="page-header">
        <h2>1.1 开放平台接入指南</h2>
      </div>
      <ul>
        <li><h4>接入本平台，调用 API 必须遵循以下规则</h4>
          <ul class="inside">
            <li>请设置模块的服务器IP：111.230.176.155 或 域名：yun.dascomyun.cn</li>
          </ul>
        <li>

        <li>
          <h4>应用管理</h4>
        </li>
          <div class="text-center">
            <img src="./img/text1.png" alt="应用管理">
            <p>用户注册账号成功后系统会分配一个 dsAappid 和 secret</p>
          </div>
        </li>
      </ul>
      <ul>
        <li><h4>应用打印过程</h4></li>
        <li>
          <div class="text-center">
            <img src="./img/text2.png" alt="应用打印的流程图">
            <p>应用打印的流程图</p>
          </div>

        </li>
      </ul>
      <ul>
        <li><h4>获取访问令牌</h4></li>
        <li>
          <div class="text-center">
            <img src="./img/text3.png" alt="获取访问令牌">
            <p>两个参数必须填写</p>
          </div>
        </li>
      </ul>
      <ul>
        <li><h4>打印或预览</h4></li>
        <li>
          <div class="text-center">
            <img src="./img/text4.png" alt="打印或预览">
          </div>
        </li>
      </ul>
      <ul>
        <li><h4>透传打印</h4></li>
        <li>
          <div class="text-center">
            <img src="./img/text5.png" alt="透传打印">
            <p>接收已生成好的透传数据，直接打印</p>
          </div>
        </li>
      </ul>
      <div class="page-footer text-right">
        <span><a href="#" @click.prevent="next('1.2')">1.2. API调用协议说明</a></span>
      </div>
    </div>
    <div class="page-item" v-show="msgId==='1.2'">
      <div class="page-header">
        <h2>1.2 API 调用协议说明</h2>
      </div>
      <ul>
        <li><h4>接入本平台，调用 API 必须遵循以下规则</h4></li>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>传输方式</th>
            <th>提交方式</th>
            <th>数据格式</th>
            <th>字符编码</th>
            <th>加密算法</th>
          </tr>
          </thead>
          <tbody>
          <tr class="text-center">
            <td>采用 HTTP、HTTPS 传输</td>
            <td>
              采用POST或GET方法 提交，根据具体接口来 定
            </td>
            <td>提交数据格式详见具体接 口示例、返回数据为 JSON 格式
            </td>
            <td>
              统一采用 UTF-8 字符编 码
            </td>
            <td>目前只支 持 MD5</td>
          </tr>
          </tbody>
        </table>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('1.1')">1.1. API接入指南</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('1.3')">1.3. API参数规定说明</a>
          </span>
      </div>
    </div>
    <div class="page-item" v-show="msgId==='1.3'">
      <div class="page-header">
        <h2>1.3 API参数规定说明</h2>
      </div>
      <ul>
        <li><h4>接入本平台，调用 API 必须遵循以下规则</h4></li>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>用户 appid</th>
            <th>用户访问令牌值</th>
            <th>设备编号</th>
          </tr>
          </thead>
          <tbody>
          <tr class="text-center">
            <td>
              统一使用 dsAppid 参数表示
            </td>
            <td>
              统一使用 dsToken 参数表示
            </td>
            <td>
              统一使用 dsNumber 参数表示
            </td>
          </tr>
          </tbody>
        </table>
        <li>如有不同，请跟具体的接口一致</li>
      </ul>

      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('1.2')">1.2. API调用协议说明</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('1.4')">1.4. 获取访问令牌</a>
          </span>
      </div>
    </div>
    <div class="page-item" v-show="msgId==='1.4'">
      <div class="page-header">
        <h2>1.4 接入开放平台扫码功能说明</h2>
      </div>
      <ul>
        <li><h4>接入本平台，调用 API 必须遵循以下规则</h4>
          <ul class="inside">
            <li>请把设备绑定在账号下 <samp @click="hrefReturn">链接</samp></li>
            <li>请设置回调地址 <samp @click="hrefReturn">链接</samp></li>
            <li>回调地址一律使用post请求，接收Json格式的参数</li>
            <li>回调地址接收到的返回值：
              <pre>
{
        <span>"number"</span>: <span>"xxxx"</span>,
        <span>"scandata"</span>:<span>"xxxx"</span>,
        <span>"type"</span>:<span>"1"</span>
}
            </pre>
            </li>
          </ul>
        </li>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>参数</th>
            <th>数据类型</th>
            <th>说明</th>
          </tr>
          </thead>
          <tbody>
          <tr class="">
            <td>
              number
            </td>
            <td>
              String
            </td>
            <td>
              设备号
            </td>
          </tr> <tr class="">
            <td>
              scandata
            </td>
            <td>
              String
            </td>
            <td>
              扫码数据/称数据
            </td>
          </tr>
          <tr class="">
            <td>
              type
            </td>
            <td>
              String
            </td>
            <td>
              获取到的数据类型：0为扫码数据，1为称数据
            </td>
          </tr>
          </tbody>
        </table>
        <li><h4>回调地址设置返回参数</h4></li>
        <ul class="inside">
          <li>回调地址接口设置指定的返回参数，可直接打印</li>
        </ul>
        <pre>
#<span> fileType为url_pdf</span>
{
  <span>"fileType"</span>:<span>"url_pdf"</span>,
  <span>"printData"</span>:<span>"https://www.dascomyun.cn/Openapi_Web/fapiao.pdf"</span>,
  <span>"voice"</span>:<span>"xxx"</span>
}

#<span> fileType为photo或pdf</span>
{
  <span>"fileType"</span>:<span>"photo"</span>,
  <span>"printData"</span>:<span>文件转base64数据</span>,
  <span>"voice"</span>:<span>"xxx"</span>
}

#<span> fileType为base64</span>
{
  <span>"fileType"</span>:<span>"base64"</span>,
  <span>"printData"</span>:<span>打印数据的base64格式</span>,
  <span>"voice"</span>:<span>"xxx"</span>
}
        </pre>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>参数</th>
              <th>数据类型</th>
              <th>说明</th>
            </tr>
          </thead>
          <tr class="">
            <td>fileType</td>
            <td>String</td>
            <td>打印文件类型：url_pdf,photo,pdf,base64(透传数据)</td>
          </tr>
          <tr class="">
            <td>printData</td>
            <td>String</td>
            <td>打印数据</td>
          </tr>
          <tr class="">
            <td>voice</td>
            <td>String</td>
            <td>语音数据：设备具有语音功能的才生效</td>
          </tr>
        </table>

        <li><h4>应用流程图</h4></li>
        <li>
          <img src="./img/text6.png" alt="">
        </li>
      </ul>

      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('1.3')">1.3. API调用协议说明</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('2.1')">2.1. 获取访问令牌</a>
          </span>
      </div>
    </div>
    <div class="page-item" v-show="msgId==='2.1'">
      <div class="page-header">
        <h2>2.1. 获取访问令牌</h2>
      </div>
      <ul>
        <li>
          <h4>简要描述</h4>
        </li>
        <li>
          获取令牌接口
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求地址</h4>
        </li>
        <li>
          https://open.dascomyun.com/api/v1.1/jsonWebTokens/getTokens
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求方式</h4>
        </li>
        <li>
          POST
        </li>
      </ul>

      <ul>
        <li><h4>请求头</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                Content-Type
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                值：application/json
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>参数</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                dsAppid
              </td>
              <td>
                是
              </td>
              <td>
                String（32）
              </td>
              <td>
                用户唯一标识
              </td>
            </tr>
            <tr class="text-center">
              <td>
                secret
              </td>
              <td>
                是
              </td>
              <td>
                String（32）
              </td>
              <td>
                密钥用来生成token
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>请求示例</h4></li>
        <li>
          <pre>
{
      <samp>"dsAppid":xxxx,
      "secret":xxxx</samp>
}
          </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回示例</h4></li>
        <li>成功</li>
        <li>
            <pre>
 {
                <samp style="color: #008626"> "code": 0,
                "data": {
                        "accessToken": "eb9d3de188f15b588273b02bc9bdc011",
                        "surplusCount": 1999,
                        "expiresIn": 7200000</samp>
                }
}
            </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回参数说明</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                code
              </td>
              <td>
                int
              </td>
              <td>
                返回码
              </td>
            </tr>
            <tr class="text-center">
              <td>
                data
              </td>
              <td>
                json
              </td>
              <td>
                返回信息
              </td>
            </tr>
            <tr class="text-center">
              <td>
                accessToken
              </td>
              <td>
                String（32）
              </td>
              <td>
                token值
              </td>
            </tr>
            <tr class="text-center">
              <td>
                surplusCount
              </td>
              <td>
                int
              </td>
              <td>
                剩余获取token的次数,每天获取次数上限为2000次
              </td>
            </tr>
            <tr class="text-center">
              <td>
                expiresIn
              </td>
              <td>
                Long
              </td>
              <td>
                token的存活时间，每个token的存活时间为7200000(2小时),单位为毫秒
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#page" @click.prevent="next('1.3')">1.3. API参数规定说明</a>
          </span>
        <span class="">
            <a href="#page" @click.prevent="next('2.2')">2.2. 电子发票打印预览</a>
          </span>
      </div>
    </div>
    <div class="page-item " v-show="msgId==='2.2'">
      <div class="page-header">
        <h2>2.2. 电子发票打印预览</h2>
      </div>
      <ul>
        <li>
          <h4>简要描述</h4>
        </li>
        <li>
          该接口仅提供打印或预览电子发票
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求地址</h4>
        </li>
        <li>
          https://open.dascomyun.com/api/v1.1/eInvoicePrint?dsAppid=xxx&dsToken=xxx
        </li>
      </ul>
      <ul>
        <li><h4>请求方式</h4></li>
        <li>
          POST
        </li>
      </ul>
      <ul>
        <li><h4>请求头</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                Content-Type
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                值为：application/json
              </td>
            </tr>

            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>参数</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                dsAppid
              </td>
              <td>
                是
              </td>
              <td>
                String（32）
              </td>
              <td>
                用户的appid号
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsToken
              </td>
              <td>
                是
              </td>
              <td>
                String（32）
              </td>
              <td>
                token值 （访问令牌）
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsNumber
              </td>
              <td>
                否
              </td>
              <td>
                List
              </td>
              <td>
                打印设备编号。如果未填入，系统会查询传入的dsAppid下的所有绑定并且在线的设备
              </td>
            </tr>
            <tr class="text-center">
              <td>
                fileType
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                数据类型分类：url_pdf、photo、pdf
              </td>
            </tr>
            <tr class="text-center">
              <td>
                printData
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                打印数据
              </td>
            </tr>
            <tr class="text-center">
              <td>
                concentration
              </td>
              <td>
                否
              </td>
              <td>
                Integer
              </td>
              <td>
                打印浓度，不填入使用系统默认值
              </td>
            </tr>
            <tr class="text-center">
              <td>
                imageAlgorithm
              </td>
              <td>
                否
              </td>
              <td>
                String
              </td>
              <td>
                图像算法:1、sharpen(默认):锐化 2、errordiffusion:误差扩散 3、binarization:黑白阈值
              </td>
            </tr>
            <tr class="text-center">
              <td>
                threshold
              </td>
              <td>
                否
              </td>
              <td>
                Integer
              </td>
              <td>
                打印阀值，不填写使用系统默认值，最佳效果(90—255）
              </td>
            </tr>
            <tr class="text-center">
              <td>
                paperWidth
              </td>
              <td>
                否
              </td>
              <td>
                double
              </td>
              <td>
                打印的纸宽。如果未填入，使用打印机默认参数
              </td>
            </tr>
            <tr class="text-center">
              <td>
                action
              </td>
              <td>
                否
              </td>
              <td>
                String
              </td>
              <td>
                接口功能，默认是打印(print)功能，打印预览(preview)功能可选
              </td>
            </tr>
            <tr>
              <td>paperX</td>
              <td>否</td>
              <td>Integer</td>
              <td>打印起始点坐标：X坐标，默认值为0，单位mm(毫米)</td>
            </tr>
            <tr>
              <td>paperY</td>
              <td>否</td>
              <td>Integer</td>
              <td>打印起始点坐标：Y坐标，默认值为0，单位mm(毫米)</td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>请求示例</h4></li>
        <li>
          <pre>
<span># printData为url_pdf</span>
{
          <samp>"dsNumber":["xxxx"],
          "fileType":"url_pdf",
          "printData":"https://www.dascomyun.cn/Openapi_Web/fapiao.pdf"
          </samp>
}

<span># printData为photo或pdf</span>
{
            <samp>"dsNumber":["xxxx"],
            "fileType":"photo",
            "printData":</samp>base64格式的字符串
}
{
            <samp>"dsNumber":["xxxx"],
            "fileType":"pdf",
            "printData":</samp>base64格式的字符串
}
          </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回示例</h4></li>
        <li>成功</li>
        <li>
            <pre>
{
           <samp>"code":0,
           "data":</samp> {
                   <samp>"dascomId": "20190726001053538501",
                   "result": "打印任务已创建"</samp>
            }
}
            </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回参数说明</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                code
              </td>
              <td>
                Integer
              </td>
              <td>
                返回码/错误码
              </td>
            </tr>
            <tr class="text-center">
              <td>
                data
              </td>
              <td>
                Json
              </td>
              <td>
                返回信息
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('2.1')">2.1. 获取访问令牌</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('2.3')">2.3. 获取设备状态接口</a>
          </span>
      </div>
    </div>
    <div class="page-item " v-show="msgId==='2.3'">
      <div class="page-header">
        <h2>2.3. 获取设备状态接口</h2>
      </div>
      <ul>
        <li>
          <h4>简要描述</h4>
        </li>
        <li>
          获取对应设备编号的当前打印状态
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求地址</h4>
        </li>
        <li>
          https://open.dascomyun.com/api/v1.1/checkPrinter?dsAppid=xxx&dsToken=xxx&dsNumber=xxx
        </li>
      </ul>
      <ul>
        <li><h4>请求方式</h4></li>
        <li>
          GET
        </li>
      </ul>
      <ul>
        <li><h4>参数</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                dsAppid
              </td>
              <td>
                是
              </td>
              <td>
                String（32）
              </td>
              <td>
                用户唯一标识
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsToken
              </td>
              <td>
                是
              </td>
              <td>
                string(32)
              </td>
              <td>
                token值(访问令牌)
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsNumber
              </td>
              <td>
                是
              </td>
              <td>
                string(16)
              </td>
              <td>
                打印设备编号
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>响应结果示例</h4></li>
        <li>成功</li>
        <li>
            <pre>{
    <samp>"code":0,
    "data":"设备可以正常使用"</samp>
}
或
{
    <samp>"code":0,
    "data":"设备正在使用中"</samp>
}
            </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回参数说明</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                code
              </td>
              <td>
                Integer
              </td>
              <td>
                返回码
              </td>
            </tr>
            <tr class="text-center">
              <td>
                data
              </td>
              <td>
                String
              </td>
              <td>
                显示打印机设备状态信息
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('2.2')">2.2. 电子发票打印预览</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('2.4')">2.4. 无限制通用打印</a>
          </span>
      </div>
    </div>
    <div class="page-item " v-show="msgId==='2.4'">
      <div class="page-header">
        <h2>2.4. 无限制通用打印</h2>
      </div>
      <ul>
        <li>
          <h4>简要描述</h4>
        </li>
        <li>
          该接口开放所有参数提供给可以自行修改
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求地址:</h4>
        </li>
        <li>
          https://open.dascomyun.com/api/v1.1/unlimitedPrint?dsAppid=xxxx&dsToken=xxxx
        </li>
      </ul>
      <ul>
        <li><h4>请求方式</h4></li>
        <li>
          POST
        </li>
      </ul>
      <ul>
        <li><h4>请求头</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                Content-Type
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                值：application/json
              </td>
            </tr>

            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>参数</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                dsAppid
              </td>
              <td>
                是
              </td>
              <td>
                String(32)
              </td>
              <td>
                用户的appid号
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsToken
              </td>
              <td>
                是
              </td>
              <td>
                String(32)
              </td>
              <td>
                token值 （访问令牌）
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsNumber
              </td>
              <td>
                否
              </td>
              <td>
                List
              </td>
              <td>
                打印设备编号。如果未填入，系统会查询传入的dsAppid下的所有绑定并且在线的设备
              </td>
            </tr>
            <tr class="text-center">
              <td>
                fileType
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                打印数据类型:url_pdf、photo、pdf、html_url、html_code
              </td>
            </tr>
            <tr class="text-center">
              <td>
                printData
              </td>
              <td>
                是
              </td>
              <td>
                Object
              </td>
              <td>
                打印数据
              </td>
            </tr>
            <tr class="text-center">
              <td>
                threshold
              </td>
              <td>
                否
              </td>
              <td>
                Integer
              </td>
              <td>
                打印阀值，不填写使用系统默认值 178，阀值范围(0—255）
              </td>
            </tr>
            <tr class="text-center">
              <td>
                paperWidth
              </td>
              <td>
                否
              </td>
              <td>
                double
              </td>
              <td>
                打印的纸宽。如果未填入，使用打印机默认参数
              </td>
            </tr>
            <tr class="text-center">
              <td>
                concentration
              </td>
              <td>
                否
              </td>
              <td>
                Integer
              </td>
              <td>
                打印浓度，不填入使用系统默认值
              </td>
            </tr>
            <tr class="text-center">
              <td>
                rotate
              </td>
              <td>
                否
              </td>
              <td>
                Double
              </td>
              <td>
                旋转角度
              </td>
            </tr>

            <tr class="text-center">
              <td>
                action
              </td>
              <td>
                否
              </td>
              <td>
                String
              </td>
              <td>
                接口功能，默认是打印(print)功能，打印预览(preview)功能可选
              </td>
            </tr>
            <tr class="text-center">
              <td>
                adaptation
              </td>
              <td>
                否
              </td>
              <td>
                Boolean
              </td>
              <td>
                是否自适应打印机，不填入系统默认值为false
              </td>
            </tr>
            <tr>
              <td>
                imageAlgorithm
              </td>
              <td>
                否
              </td>
              <td>
                String
              </td>
              <td>
                图像算法:1、sharpen(默认):锐化 2、errordiffusion:误差扩散 3、binarization:黑白阈值
              </td>
            </tr>
            <tr>
              <td>paperX</td>
              <td>否</td>
              <td>Integer</td>
              <td>打印起始点坐标：X坐标，默认值为0，单位mm(毫米)</td>
            </tr>
            <tr>
              <td>paperY</td>
              <td>否</td>
              <td>Integer</td>
              <td>打印起始点坐标：Y坐标，默认值为0，单位mm(毫米)</td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>请求示例</h4></li>

        <pre v-text><span># fileType为url_pdf</span>
{
    <samp>"dsNumber":["xxxxxxxxxxxxxxx"],
    "fileType":"url_pdf",
    "printData":"https://www.dascomyun.cn/Openapi_Web/fapiao.pdf"</samp>
}

<span># fileType为pdf或photo</span>
{
    <samp>"dsNumber":["xxxxxxxxxxxxxxx"],
    "fileType":"photo",
    "printData":</samp>base64字符串
}
{
    <samp>"dsNumber":["xxxxxxxxxxxxxxx"],
    "fileType":"pdf",
    "printData":</samp>base64字符串
}


<span># fileType为html_url</span>
{
    <samp>"dsNumber":["xxxxxxxxxxxxxxx"],
    "fileType":"html_url",
    "printData":"https://www.baidu.com"</samp>
}

<span># fileType为html_code</span>
{
    <samp v-text>"dsNumber":["xxxxxxxxxxxxxxx"],
    "fileType":"html_code",
    "printData":[
        "&lt;!DOCTYPE html>&lt;html>&lt;head>&lt;meta charset='UTF-8'>&lt;title>&lt;/title>&lt;/head>&lt;body>
      &lt;h1>第一页&lt;/h1>&lt;/body>&lt;/html>",
        "&lt;!DOCTYPE html>&lt;html>&lt;head>&lt;meta charset='UTF-8'>&lt;title>&lt;/title>&lt;/head>&lt;body>
      &lt;h1>第二页&lt;/h1>&lt;/body>&lt;/html>",
        "&lt;!DOCTYPE html>&lt;html>&lt;head>&lt;meta charset='UTF-8'>&lt;title>&lt;/title>&lt;/head>&lt;body>
      &lt;h1>第三页&lt;/h1>&lt;/body>&lt;/html>"
        ]</samp>
}
          </pre>
      </ul>
      <ul>
        <li><h4>返回示例</h4></li>
        <li>成功</li>
        <li>
            <pre>
{
    <samp>"code": 0,
    "data": {
        "dascomId": "20190726001053538501",
        "result": "打印任务已创建"
    }</samp>
}
            </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回参数说明</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                code
              </td>
              <td>
                Integer
              </td>
              <td>
                返回码/错误码
              </td>
            </tr>
            <tr class="text-center">
              <td>
                data
              </td>
              <td>
                Json
              </td>
              <td>
                返回信息
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('2.3')">2.3. 获取设备状态</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('2.5')">2.5. 透传数据打印</a>
          </span>
      </div>
    </div>
    <div class="page-item " v-show="msgId==='2.5'">
      <div class="page-header">
        <h2>2.5. 透传数据打印</h2>
      </div>
      <ul>
        <li>
          <h4>简要描述</h4>
        </li>
        <li>
          接收已生成好的透传数据，直接打印
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求地址</h4>
        </li>
        <li>
          https://open.dascomyun.com/api/v1.1/transparentPrinting?dsAppid=xxx&dsToken=xxx
        </li>
      </ul>
      <ul>
        <li><h4>请求方式</h4></li>
        <li>
          POST
        </li>
      </ul>
      <ul>
        <li><h4>请求头</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                Content-Type
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                值：application/json
              </td>
            </tr>

            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>请求参数</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                dsAppid
              </td>
              <td>
                是
              </td>
              <td>
                String（32）
              </td>
              <td>
                用户的appid号
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsToken
              </td>
              <td>
                是
              </td>
              <td>
                String(32)
              </td>
              <td>
                token值 （访问令牌）
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsNumber
              </td>
              <td>
                否
              </td>
              <td>
                List
              </td>
              <td>
                打印设备编号。如果未填入，系统会查询传入的dsAppid下的所有绑定并且在线的设备
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dataType
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                数据类型参数：base64或bytes
              </td>
            </tr>
            <tr class="text-center">
              <td>
                printData
              </td>
              <td>
                是
              </td>
              <td>
                Object
              </td>
              <td>
                打印数据
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>请求示例</h4></li>
        <pre>
<span># dataType为base64</span>
{
   <samp>"dsNumber":["xxxxxx"],
    "dataType":"base64",
    "printData":</samp>base64字符串
}
<span># dataType为betys</span>
{
    <samp>"dsNumber":["xxxxxx"],
    "dataType":"bytes",
    "printData":</samp> [xxx,xxx,xxx]     <span> //byte数组</span>
}
          </pre>
      </ul>
      <ul>
        <li><h4>返回示例</h4></li>
        <li>
            <pre>
{
    <samp>"code": 0,
    "data": {
          "dascomId": "20190726001053538501",
          "result": "打印任务已创建"
    }</samp>
 }
            </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回参数说明</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                code
              </td>
              <td>
                Integer
              </td>
              <td>
                返回码/错误码
              </td>
            </tr>
            <tr class="text-center">
              <td>
                data
              </td>
              <td>
                String
              </td>
              <td>
                返回信息
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('2.4')">2.4. 无限制通用打印</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('2.6')">2.6 快递面单打印</a>
          </span>
      </div>
    </div>
    <div class="page-item " v-show="msgId==='2.6'">
      <div class="page-header">
        <h2>2.6. 快递面单打印</h2>
      </div>
      <ul>
        <li>
          <h4>简要描述</h4>
        </li>
        <li>
          根据快递面单模板Id打印快递单信息
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求地址</h4>
        </li>
        <li>
          https://open.dascomyun.com/api/v1.1/expressPrint?dsAppid=xxx&dsToken=xxx
        </li>
      </ul>
      <ul>
        <li><h4>请求方式</h4></li>
        <li>
          POST
        </li>
      </ul>
      <ul>
        <li><h4>请求头</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                Content-Type
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                值：application/json
              </td>
            </tr>

            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>请求参数</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                dsAppid
              </td>
              <td>
                是
              </td>
              <td>
                String（32）
              </td>
              <td>
                用户的appid号
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsToken
              </td>
              <td>
                是
              </td>
              <td>
                String(32)
              </td>
              <td>
                token值 （访问令牌）
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsNumber
              </td>
              <td>
                否
              </td>
              <td>
                List
              </td>
              <td>
                打印设备编号。如果未填入，系统会查询传入的dsAppid下的所有绑定并且在线的设备
              </td>
            </tr>
            <tr class="text-center">
              <td>
                templateId
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                快递单模板Id
              </td>
            </tr>
            <tr class="text-center">
              <td>
                sender
              </td>
              <td>
                否
              </td>
              <td>
                String
              </td>
              <td>
                寄件人
              </td>
            </tr>
            <tr class="text-center">
              <td>
                senderAddress
              </td>
              <td>
                否
              </td>
              <td>
                String
              </td>
              <td>
                寄件人地址
              </td>
            </tr>
            <tr class="text-center">
              <td>
                senderPhone
              </td>
              <td>
                否
              </td>
              <td>
                String
              </td>
              <td>
                寄件人联系电话
              </td>
            </tr>
            <tr class="text-center">
              <td>
                senderCompany
              </td>
              <td>
                否
              </td>
              <td>
                String
              </td>
              <td>
                寄件人公司
              </td>
            </tr>
            <tr class="text-center">
              <td>
                consignee
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                收件人
              </td>
            </tr>
            <tr class="text-center">
              <td>
                consigneeAddress
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                收件人地址
              </td>
            </tr>
            <tr class="text-center">
              <td>
                consignessPhone
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                收件人联系电话
              </td>
            </tr>
            <tr class="text-center">
              <td>
                consignessCompany
              </td>
              <td>
                否
              </td>
              <td>
                String
              </td>
              <td>
                收件人公司
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>请求示例</h4></li>
        <pre>{
    <samp>"dsNumber":["xxxxxx"],
    "templateId":"SF_002",
    "sender":"lei",
    "senderAddress":"广东省广州市黄埔区得实大厦401",
    "senderPhone":"1234567890",
    "senderCompany":"dascom.co@guangzhou",
    "consignee":"chen",
    "consigneeAddress":"广东省江门市江海区金星路399号得实工业园区",
    "consignessPhone":"1236549870",
    "consignessCompany":"dasom.co@jiangmen"</samp>
}
          </pre>
      </ul>
      <ul>
        <li><h4>返回示例</h4></li>
        <li>
            <pre>{
    <samp>"code": 0,
    "data": {
        "dascomId": "20190726001053538501",
        "result": "打印任务已创建"
    }</samp>
}
            </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回参数说明</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                code
              </td>
              <td>
                Integer
              </td>
              <td>
                返回码/错误码
              </td>
            </tr>
            <tr class="text-center">
              <td>
                data
              </td>
              <td>
                String
              </td>
              <td>
                返回信息
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('2.5')">2.5. 透传数据打印</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('2.7')">2.7. 自定义坐标打印</a>
          </span>
      </div>
    </div>
    <div class="page-item " v-show="msgId==='2.7'">
      <div class="page-header">
        <h2>2.7. 自定义点坐标打印</h2>
      </div>
      <ul>
        <li>
          <h4>简要描述</h4>
        </li>
        <li>
          自定义点坐标打印
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求地址</h4>
        </li>
        <li>
          https://open.dascomyun.com/api/v1.1/printCoordinate?dsAppid=xxx&dsToken=xxx
        </li>
      </ul>
      <ul>
        <li><h4>请求方式</h4></li>
        <li>
          POST
        </li>
      </ul>
      <ul>
        <li><h4>请求头</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                Content-Type
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                值：application/json
              </td>
            </tr>

            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>请求参数</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                dsAppid
              </td>
              <td>
                是
              </td>
              <td>
                String（32）
              </td>
              <td>
                用户的appid号
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsToken
              </td>
              <td>
                是
              </td>
              <td>
                String(32)
              </td>
              <td>
                token值 （访问令牌）
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsNumber
              </td>
              <td>
                否
              </td>
              <td>
                List
              </td>
              <td>
                打印设备编号。如果未填入，系统会查询传入的dsAppid下的所有绑定并且在线的设备
              </td>
            </tr>
            <tr class="text-center">
              <td>
                point
              </td>
              <td>
                是
              </td>
              <td>
                List
              </td>
              <td>
                自定义的点坐标列表，x坐标，y坐标传入的点坐标单位为cm
              </td>
            </tr>
            <tr>
              <td>paperX</td>
              <td>否</td>
              <td>Integer</td>
              <td>打印起始点坐标：X坐标，默认值为0，单位mm(毫米)</td>
            </tr>
            <tr>
              <td>paperY</td>
              <td>否</td>
              <td>Integer</td>
              <td>打印起始点坐标：Y坐标，默认值为0，单位mm(毫米)</td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>请求示例</h4></li>
        <pre>{
    <samp>"dsNumber":["xxxxxx"],
    "point":[
        {"x":3.6,"y":3.5,"text":"这是一个测试点打印"},
        {"x":3.5,"y":6.5,"text":"https://www.baidu.com"},
        {"x":14.5,"y":5.5,"text":"https://www.dascomyun.cn/DASCOM-WEB/index.html"}
        ]</samp>
}
          </pre>
      </ul>
      <ul>
        <li><h4>返回示例</h4></li>
        <li>
            <pre>{
    <samp>"code": 0,
    "data": {
        "dascomId": "20190726001053538501",
        "result": "打印任务已创建"
    }</samp>
}
            </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回参数说明</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                code
              </td>
              <td>
                Integer
              </td>
              <td>
                返回码/错误码
              </td>
            </tr>
            <tr class="text-center">
              <td>
                data
              </td>
              <td>
                String
              </td>
              <td>
                返回信息
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('2.6')">2.6. 快递面单打印</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('2.8')">2.8. 查询打印结果</a>
          </span>
      </div>
    </div>
    <div class="page-item " v-show="msgId==='2.8'">
      <div class="page-header">
        <h2>2.8. 查询打印结果</h2>
      </div>
      <ul>
        <li>
          <h4>简要描述</h4>
        </li>
        <li>
          打印任务创建成功，通过任务Id查询打印结果
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求地址</h4>
        </li>
        <li>
          https://open.dascomyun.com/api/v1.1/getPrintResult?dsAppid=xxx&dsToken=xxx&dascomId=xxx
        </li>
      </ul>
      <ul>
        <li><h4>请求方式</h4></li>
        <li>
          GET
        </li>
      </ul>
      <ul>
        <li><h4>请求头</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                dsAppid
              </td>
              <td>
                是
              </td>
              <td>
                String(32)
              </td>
              <td>
                用户的appid号
              </td>
            </tr>
            <tr>
              <td>dsToken</td>
              <td>是</td>
              <td>String(32)</td>
              <td>token值 （访问令牌）</td>
            </tr>
            <tr>
              <td>dascomId</td>
              <td>是</td>
              <td>String（32）</td>
              <td>打印任务ID</td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>返回示例</h4></li>
        <li>
            <pre>{
    <samp>"code": 0,
    "data": [
        {
            "number": "005CBF7350021300",
            "message": "应打印：1张。成功打印：1张。"
        }
    ]</samp>
}
            </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回参数说明</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                code
              </td>
              <td>
                Integer
              </td>
              <td>
                返回码/错误码
              </td>
            </tr>
            <tr class="text-center">
              <td>
                data
              </td>
              <td>
                String
              </td>
              <td>
                返回信息
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('2.7')">2.7. 自定义点坐标打印</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('3.1')"> 3.1. 状态码表</a>
          </span>
      </div>
    </div>
    <div class="page-item " v-show="msgId==='2.9'">
      <div class="page-header">
        <h2>2.9. 绑定设备</h2>
      </div>
      <ul>
        <li>
          <h4>简要描述</h4>
        </li>
        <li>
          绑定设备到dsAppid下
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求地址</h4>
        </li>
        <li>
          https://open.dascomyun.com/api/v1.1/user/bindPrinters?dsAppid=xxx&dsToken=xxx
        </li>
      </ul>
      <ul>
        <li><h4>请求方式</h4></li>
        <li>
          POST
        </li>
      </ul>
      <ul>
        <li><h4>请求头</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                Content-Type
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                值为：application/json
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>参数</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                dsAppid
              </td>
              <td>
                是
              </td>
              <td>
                String(32)
              </td>
              <td>
                用户唯一标识
              </td>
            </tr>
            <tr>
              <td>dsToken</td>
              <td>是</td>
              <td>String(32)</td>
              <td>
                token值 （访问令牌）
              </td>
            </tr>

            <tr>
              <td>dsNumber</td>
              <td>是</td>
              <td>String</td>
              <td>
                打印机编号,传入值为设备编号,<br />
                例0000ABJJK,也可以传入多组数据,<br />
                组与组之间用#隔开,<br />
                例如:0000ABJJK#0000ABJJK#0000ABJJK
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>请求示例</h4></li>
        <li>

          <pre><samp># 绑定单台打印机</samp>
{
  <samp>"dsNumber":"0000ABJJK"</samp>
}</pre>
<pre><samp># 绑定多台打印机</samp>
{
  <samp>"dsNumber":"0000ABJJK#0000ABJJK#0000ABJJK"</samp>
}</pre>
        </li>
        <li><h4>返回示例</h4></li>
        <li>
            <pre>{
    <samp>"code": 0,
    "data": "成功"</samp>
}
            </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回参数说明</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                code
              </td>
              <td>
                int
              </td>
              <td>
                返回码
              </td>
            </tr>
            <tr class="text-center">
              <td>
                data
              </td>
              <td>
                String
              </td>
              <td>
                返回绑定失败的打印机信息
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('2.8')">2.8. 查询打印结果</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('2.10')"> 2.10. 创建更新回调地址</a>
          </span>
      </div>
    </div>


    <div class="page-item " v-show="msgId==='2.10'">
      <div class="page-header">
        <h2>2.10. 创建更新回调地址</h2>
      </div>
      <ul>
        <li>
          <h4>简要描述</h4>
        </li>
        <li>
          客户创建和和更新回调地址接口，以获取扫码数据和称数据
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求地址</h4>
        </li>
        <li>
          https://open.dascomyun.com/api/v1.1/user/setReturnUrl?dsAppid=xxx&dsToken=xxx
        </li>
      </ul>

      <ul>
        <li><h4>请求方式</h4></li>
        <li>
          POST
        </li>
      </ul>
      <ul>
        <li><h4>请求头</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                Content-Type
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                值为：application/json
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>参数：</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                dsAppid
              </td>
              <td>
                是
              </td>
              <td>
                String(32)
              </td>
              <td>
                用户唯一标识
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsToken
              </td>
              <td>
                是
              </td>
              <td>
                String(32)
              </td>
              <td>
                token值 （访问令牌）
              </td>
            </tr>
            <tr class="text-center">
              <td>
                returnUrl
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                回调地址
              </td>
            </tr>


            </tbody>
          </table>
        </li>
      </ul>
      <ul>
      <li><h4>请求示例</h4></li>
      <li>

            <pre>
<samp># Post请求体</samp>
{
      <samp>"returnUrl":"xxxx"</samp>
}
            </pre>
      </li>
    </ul>
      <ul>
        <li><h4>返回示例</h4></li>
        <li>成功：</li>
        <li>
            <pre>{
    <samp> "code": 0,
    "data": "成功"</samp>
}
            </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回参数说明</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                code
              </td>
              <td>
                int
              </td>
              <td>
                返回码
              </td>
            </tr>
            <tr class="text-center">
              <td>
                data
              </td>
              <td>
                String
              </td>
              <td>
                返回信息
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('2.9')">2.9. 通过打印机编号绑定打印机</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('2.11')"> 2.11. 语音控制</a>
          </span>
      </div>
    </div>

    <div class="page-item " v-show="msgId==='2.11'">
      <div class="page-header">
        <h2>2.11. 语音控制</h2>
      </div>
      <ul>
        <li>
          <h4>简要描述</h4>
        </li>
        <li>
          带有语音模块的设备调用，播放语音
        </li>
      </ul>
      <ul>
        <li>
          <h4>请求地址</h4>
        </li>
        <li>
          https://open.dascomyun.com/api/v1.1/voiceControl?dsAppid=xxx&dsToken=xxx
        </li>
      </ul>
      <ul>
        <li><h4>请求方式</h4></li>
        <li>
          POST
        </li>
      </ul>
      <ul>
        <li><h4>请求头</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                Content-Type
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                值为：application/json
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <ul>
        <li><h4>参数：</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>必选</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                dsAppid
              </td>
              <td>
                是
              </td>
              <td>
                String(32)
              </td>
              <td>
                用户唯一标识
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsToken
              </td>
              <td>
                是
              </td>
              <td>
                String(32)
              </td>
              <td>
                token值 （访问令牌）
              </td>
            </tr>
            <tr class="text-center">
              <td>
                dsNumber
              </td>
              <td>
                是
              </td>
              <td>
                String(16)
              </td>
              <td>
                带语音的设备编号
              </td>
            </tr>
            <tr class="text-center">
              <td>
                voice
              </td>
              <td>
                是
              </td>
              <td>
                String
              </td>
              <td>
                需要播放的内容
              </td>
            </tr>


            </tbody>
          </table>
        </li>
      </ul>
      <ul>
      <li><h4>请求示例</h4></li>
      <li>

            <pre>
<samp># Post请求体</samp>
{
      <samp>"dsNumber":"xxxx",
    "voice":"xxxx"</samp>
}
            </pre>
      </li>
    </ul>
      <ul>
        <li><h4>返回示例</h4></li>
        <li>成功：</li>
        <li>
            <pre>{
    <samp> "code": 0,
    "data": "成功"</samp>
}
            </pre>
        </li>
      </ul>
      <ul>
        <li><h4>返回参数说明</h4></li>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>参数名</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                code
              </td>
              <td>
                int
              </td>
              <td>
                返回码
              </td>
            </tr>
            <tr class="text-center">
              <td>
                data
              </td>
              <td>
                String
              </td>
              <td>
                返回信息
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('2.10')">2.10. 创建更新回调地址</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('3.1')"> 3.1. 状态码表</a>
          </span>
      </div>
    </div>



    <div class="page-item " v-show="msgId==='3.1'">
      <div class="page-header">
        <h2>3.1. 状态码表</h2>
      </div>
      <ul>
        <li>
          <table class="table table-bordered">
            <thead>
            <tr>
              <th>状态</th>
              <th>状态说明</th>
            </tr>
            </thead>
            <tbody>
            <tr class="text-center">
              <td>
                0
              </td>
              <td>
                成功
              </td>
            </tr>
            <tr class="text-center">
              <td>
                2000
              </td>
              <td>
                未知错误
              </td>
            </tr>
            <tr class="text-center">
              <td>
                2001
              </td>
              <td>
                参数错误
              </td>
            </tr>
            <tr class="text-center">
              <td>
                2002
              </td>
              <td>
                用户信息异常
              </td>
            </tr>
            <tr class="text-center">
              <td>
                2003
              </td>
              <td>
                请求头参数错误
              </td>
            </tr>
            <tr class="text-center">
              <td>
                2004
              </td>
              <td>
                请求微服务异常
              </td>
            </tr>
            <tr class="text-center">
              <td>
                2005
              </td>
              <td>
                文件错误
              </td>
            </tr>
            <tr class="text-center">
              <td>
                2006
              </td>
              <td>
                打印机设备异常
              </td>
            </tr>
            <tr class="text-center">
              <td>
                2007
              </td>
              <td>
                获取token异常
              </td>
            </tr>
            <tr class="text-center">
              <td>
                2008
              </td>
              <td>
                模板打印异常
              </td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('2.10')">2.10. 创建更新回调地址</a>
          </span>
        <span class="">
            <a href="#" @click.prevent="next('4.1')">更新信息</a>
          </span>
      </div>
    </div>
    <div class="page-item " v-show="msgId==='4.1'">
      <div class="page-header">
        <h2>更新信息</h2>
      </div>
      <ul>
        <li>每个 api 接口增加错误返回示例。</li>
      </ul>
      <div class="page-footer">
          <span>
            <a href="#" @click.prevent="next('3.1')">3.1. 状态码表</a>
          </span>
      </div>
    </div>
    <div class="page-item " v-show="msgId==='5.1'">
      <div class="page-header">
        <h2> SDK下载</h2>
      </div>
      <ul class="flex">
        <li>
          <div>
            <img src="./img/download.png" alt="">
          </div>
          <div>
            <h3>SDK下载</h3>
            <a href="https://open.dascomyun.com/package/Openapi_SDK_Java.rar ">JAVA版本</a>
          </div></li>
      </ul>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TextPage",
    mounted() {
      // this.pre = pre
    },
    data() {
      return {
        pre: '  "<!DOCTYPE html>\n' +
          '                  <html>\n' +
          '                    <head><meta charset=\'UTF-8\'><title></title></head>\n' +
          '                    <body>"<h1>第一页</h1>"</body>\n' +
          '                  </html>",\n' +
          '        "<!DOCTYPE html>\n' +
          '                  <html>\n' +
          '                    <head><meta charset=\'UTF-8\'><title></title></head>\n' +
          '                    <body><h1>第二页</h1></body>\n' +
          '                  </html>",\n' +
          '        "<!DOCTYPE html>\n' +
          '                  <html>\n' +
          '                    <head><meta charset=\'UTF-8\'><title></title></head>\n' +
          '                    <body><h1>第三页</h1></body>\n' +
          '                  </html>"'
      }
    },
    methods: {
        hrefReturn(){
            this.$router.replace('/application')
        }
    },
    props: {
      msgId: String,
      next: Function
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #337ab7;
    font-size: 14px;
  }

  a:hover {
    text-decoration: underline;
    color: #126ab3;
  }

  .page-right {
    flex-grow: 1;
    margin-left: 40px;
    padding-right: 40px;
  }

  .title {
    padding-bottom: 10px;
    text-align: center;
    /*border-bottom: 1px solid #e0e0e0;*/
  }

  .page-item {
    width: 731px;
    color: #666;
  }

  .page-header {
    margin: 40px 0 20px;
    padding-bottom: 10px;
    color: #48576a;
    border-bottom: 1px solid #e0e0e0;
  }

  .page-header > h2 {
    /*margin-top: 20px;*/
    font-size: 22px;
    /*line-height: 27.5px;*/
  }

  .page-header small {
    font-size: 16px;
  }

  .page-right ul {
    list-style: none;
    /*border-bottom: 1px solid #e0e0e0;*/
  }

  .page-right li {
    margin: 20px 0;
    /*letter-spacing:2px;*/
    line-height: 27px;
  }

  li > h4 {
    font-weight: bold;
    color: #333;
    font-size: 18px;
  }

  li div {
    width: 100%;
    text-align: center;
  }

  li div img {
    max-width: 750px;
    padding-bottom: 20px;
    text-align: center;
  }

  .text-center > p {
    color: #48576a;
  }

  .page-right .text-right {
    text-align: right;
  }

  .page-footer {
    position: relative;
    margin-right: 50px;
    margin-top: 30px;
    padding-bottom: 20px;
  }

  .page-footer span:nth-child(2) {
    position: absolute;
    right: 0;
  }

  /*表格样式开始*/

  .table {
    margin: 0 auto;
    width: 98%;
    border-collapse: collapse;
    border: 1px solid #ddd;
  }

  .table > thead > tr {
    height: 24px;
    line-height: 24px;
    /*background-color: #35B558;*/
  }

  .table td, .table th {
    box-sizing: border-box;
    padding: 8px;
    text-align: center;
    border: 1px solid #ddd;
    font-size: 14px;
  }

  .table th {
    color: #333;
    font-weight: 700;
  }

  /*表格样式结束*/
  /*pre样式开始*/
  pre {
    display: block;
    padding: 9.5px;
    margin: 0 0 10px;
    font-size: 13px;
    line-height: 1.42857143;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  samp {
    color: #008626
  }

  span {
    color: #880000;
  }
  pre span{
    color: #080;
  }
  .inside li{
    margin: 10px 40px;
    list-style: circle;
  }
  .inside li pre{
    margin: 20px 0;
  }
  .flex li{
    width: 150px;
    display: flex;

  }
</style>
