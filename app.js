// appid：wxe908b5b423fd1eab，appsecret：2R7MD82GPgqdT446brh2VHb4wDcI1Daw
import { myRequest } from '/utils/request'
import { AesEncrypt }  from '/utils/util'

// 设置全局默认分享
!function(){
  var _Page = Page
  Page = function (pageConfig) {
    let newConfig = Object.assign(pageConfig, {
      onShareAppMessage:function () {
        return {
          title:'默认分享标题',
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
        
        // 发送 res.code临时登录凭证 到后台换取 openId, sessionKey, unionId
        var params = {
          method: 'getWechatOpenId',
          appId: 'wxe908b5b423fd1eab',
        };
        // 要加密的参数
        let _obj = {
          code: res.code
        }
        // aes加密
        let _aesString = AesEncrypt(JSON.stringify(_obj))
        console.log('aes加密',_aesString)

        params.params = _aesString
        // 获取 OpenID
        myRequest('/', params,'GET').then(res => {
          console.log('获取openId', res)
        
        })
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
  globalData: {
    userInfo: null
  },
})