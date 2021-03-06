import { AesEncrypt, AesDecrypt } from './util'

export function myRequest(url, data, method = 'POST') {
  let baseUrl = `https://kam.mindofsales.com/api/api.ashx/`
  // 重新拼接参数
  data = Object.assign({
    appId: 'wxe908b5b423fd1eab',
    method: url,
    token: wx.getStorageSync('token'),
  }, data ? {
    params: AesEncrypt(JSON.stringify(data))// aes加密
  } : {})
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl,
      method,
      header:{
        // 'content-type':'application/x-www-form-urlencoded',
        'content-type':'application/json; charset=utf-8',
      },
      data,
      success: res => {
        // console.log(res) 
        if (res.data.res_code === "87") {
          wx.showToast({
            title: "vip已过期，请联系管理员",
            icon: "none",
            success: () => {
              setTimeout(() => {
                wx.reLaunch({
                  url: `/pages/vip/vip`,
                });
              }, 500);
            },
          });
        }
        // code==97为token过期
        else if(res.data.res_code === '97'){
          getToken()
        } else if (res.data.res_code !== '00') {
          let _err = res.data.res_msg
          if(_err==='已经存在此用户！'){
            // 不提示
            reject('不提示')
          }else{
            wx.showToast({
              title: _err,
              icon: 'none'
            })
            console.log(`${url}接口错误`, _err)
          }
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
        // console.log(555555,res.data.res_msg)
        resolve(res.data.res_msg)
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

