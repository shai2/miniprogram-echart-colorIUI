import { AesEncrypt, AesDecrypt } from './util'
export function myRequest(url, data, method = 'POST') {
  let baseUrl = `https://kam.mindofsales.com/api/api.ashx`
  // let baseUrl = `https://sit02-openmch.yimifudao.com.cn`
  data = Object.assign( data, {appId: 'wxe908b5b423fd1eab'} )
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      header:{
        // 'content-type':'application/x-www-form-urlencoded',
      },
      data,
      success: res => {
        // console.log(res) 
        if (res.data.res_code !== '00') {
          let _err = AesDecrypt(res.data.res_msg)
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

// module.exports = {
//   myRequest
// }
