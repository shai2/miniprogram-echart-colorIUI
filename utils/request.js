import { AesEncrypt, AesDecrypt } from './util'

export function myRequest(url, data, method = 'POST') {
  let baseUrl = `https://kam.mindofsales.com/api/api.ashx/`
  // 重新拼接参数
  data = {
    appId: 'wxe908b5b423fd1eab',
    method: url,
    token: wx.getStorageSync('openid'),
    params: AesEncrypt(JSON.stringify(data)) // aes加密
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl,
      method,
      header:{
        // 'content-type':'application/x-www-form-urlencoded',
      },
      data,
      success: res => {
        // console.log(res) 
        // code==97为token过期
        if(res.data.res_code === '97'){
          getToken()
        } else if (res.data.res_code !== '00') {
          let _err = res.data.res_msg
          wx.showToast({
            title: _err,
            icon: 'none'
          })
          console.log('接口错误', _err)
          reject(_err||"暂无错误信息")
        } else {
          // console.log('接口返回data',res.data.res_datas)
          resolve(JSON.parse(AesDecrypt(res.data.res_datas)))
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showToast({
          title: `${url}接口异常,稍后再试`,
          icon: 'none',
          mask: true
        })
      }
    })
  })
}

// token过期使用
function getToken(openid = wx.getStorageSync('openid')){
  let _obj = { userid: openid }
  myRequest('getToken', _obj, 'GET').then(res => {
    // console.log('重新获取token：',res)
    let _currentPage = getCurrentPages()[0]
    console.log('触发重新获取token',_currentPage)
    _currentPage.onLoad() //手动执行token过期那一页的onLoad
  })
}
