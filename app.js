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
      success: loginRes => {
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  console.log(res.userInfo)
                  this.globalData.userInfo = res.userInfo
                  this.getWechatOpenId(loginRes.code)
                  
                }
              })
            }
          }
        })
      }
    })
    
  },
  // 发送 res.code临时登录凭证 到后台换取 openId
  getWechatOpenId(code){
    let _obj = { code: code }
    myRequest('getWechatOpenId', _obj).then(res => {
      console.log('openid',res.openid)
      wx.setStorageSync('openid',res.openid)
      this.regUser()
    })
  },
  //注册新用户
  regUser(){
    let _obj = {
      userid: wx.getStorageSync('openid'),
      nickname: this.globalData.userInfo.nickName
    }
    console.log('注册新用户参数：',_obj)
    myRequest('regUser', _obj).then(res => {
      console.log('注册用户：', res)
      wx.setStorageSync('token',res.token)
      this.getUserInfo()
    }).catch(err=>{
      console.log('注册返回：',err)
      if(err==="不提示"){
        this.getToken()
      }
    })
  },
  getToken(openid = wx.getStorageSync('openid')){
    let _obj = { userid: openid }
    myRequest('getToken', _obj).then(res => {
      console.log('老用户获取token：',res)
      wx.setStorageSync('token',res.token)
      this.getUserInfo()
    })
  },
  // 获取用户信息
  getUserInfo(){
    myRequest('getUserInfo', null).then(res => {
      this.globalData.userInfo = Object.assign({},res[0],this.globalData.userInfo)
      console.log('获取用户信息：', this.globalData.userInfo)
      // 由于 getUserInfo 是网络请求，会在 Page.onLoad 之后返回,加入 callback延迟调用
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(res)
      }
      !wx.getStorageSync('RelationInfo')&&this.getRelationInfo()
    })
  },
  // 获取关系标签
  getRelationInfo(){
    myRequest('getRelationInfo', null).then(res => {
      console.log('关系标签：',res)
      wx.setStorageSync('RelationInfo', res.reverse())
    })
  },
  globalData: {
    userInfo: {
      nickName:'',
      avatarUrl:'',
    },
  },
})