// appid：wxe908b5b423fd1eab，appsecret：2R7MD82GPgqdT446brh2VHb4wDcI1Daw
import { myRequest } from '/utils/request'
import { AesEncrypt, AesDecrypt } from '/utils/util'

// 设置全局默认分享
!function () {
  var _Page = Page
  Page = function (pageConfig) {
    let newConfig = Object.assign(pageConfig, {
      onShareAppMessage: function () {
        return {
          title: '默认分享标题',
          path: `pages/chart/chart`,
          // imageUrl:'默认分享图片',
        };
      }
    });
    _Page(newConfig);
  };
}();

App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        this.getOpenid(res.code)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 发送 res.code临时登录凭证 到后台换取 openId, sessionKey, unionId
  getOpenid(code){
    // 要加密的参数
    let _obj = { code: code }
    // aes加密
    let _aesString = AesEncrypt(JSON.stringify(_obj))
    // console.log('aes加密', _aesString)
    // 接口参数
    var params = {
      method: 'getWechatOpenId',
      params: _aesString
    };

    myRequest('/', params, 'GET').then(res => {
      this.globalData.openid = res.openid
      // console.log(this.globalData)
      this.getToken(res.openid)
    })
  },
  getToken(openid){
    // 要加密的参数
    let _obj = { userid: openid }
    // aes加密
    let _aesString = AesEncrypt(JSON.stringify(_obj))
    // 接口参数
    var params = {
      method: 'getToken',
      params: _aesString,
    };
    
    myRequest('/', params, 'GET').then(res => {
      console.log(1111,res)
  
    })
  },
  globalData: {
    openid: null,
  },
})