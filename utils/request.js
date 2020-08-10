export function myRequest(url, data, method = 'POST') {
  let baseUrl = `https://${wx.getStorageSync('env')}openmch.yimifudao.com.cn`
  // let baseUrl = `https://sit02-openmch.yimifudao.com.cn`

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      // header:{'content-type':'application/x-www-form-urlencoded'},
      data,
      success: res => {
        if (res.data.code !== '000000') {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          console.log('接口错误', res)
          reject(res.data)
        } else {
          resolve(res.data)
          // console.log('接口返回',res)
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
