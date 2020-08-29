const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    iconList: [{
      icon: 'cardboardfill',
      color: 'red',
      // badge: 120,
      name: '新增客户',
      url: 'addClient/addClient'
    }, {
      icon: 'recordfill',
      color: 'orange',
      badge: 1,
      name: '我的信息',
      url: 'editMyInfo/editMyInfo'
    }, {
      icon: 'picfill',
      color: 'yellow',
      badge: 0,
      name: '我的产品',
      url: 'myProduct/myProduct'
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
    }
  },
  getUserInfo(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 点击icon-item跳转
  toUrl(e){
    wx.navigateTo({
      url: '/pages/'+e.currentTarget.dataset.url
    })
  }
})
