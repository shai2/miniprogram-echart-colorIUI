const app = getApp()
const util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'olive',
      badge: 22,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'cyan',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }],
    gridCol:3,
  },
  onLoad() {
    if (app.globalData.userInfo.nickName) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //点头像
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
