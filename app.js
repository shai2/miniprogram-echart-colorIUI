// appid：wxe908b5b423fd1eab，appsecret：2R7MD82GPgqdT446brh2VHb4wDcI1Daw
import { myRequest } from '/utils/request'

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
      success: loginRes => {
        this.globalData.tempCode = loginRes.code
        // 获取用户权限
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              wx.setStorageSync('canUseUserInfo',true)
            }else{
              wx.setStorageSync('canUseUserInfo',false)
            }
            // 由于 getUserInfo 是网络请求，会在 Page.onLoad 之后返回,加入 callback延迟调用
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback()
            }
          }
        })
      }
    })
    
  },
  globalData: {
    code:'',//wx.login的临时code
    userInfo: {
      nickName:'',
      avatarUrl:'',
    },
  },
})