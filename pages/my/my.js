const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    iconList: [{
      icon: 'friendaddfill',
      color: 'red',
      badge: 0,
      name: '新增客户',
      url: 'addClient/addClient'
    }, {
      icon: 'peoplefill',
      color: 'orange',
      badge: 0,
      name: '我的信息',
      url: 'editMyInfo/editMyInfo'
    }, {
      icon: 'newshotfill',
      color: 'yellow',
      badge: 0,
      name: '我的产品',
      url: 'myProduct/myProduct'
    }, 
    {
      icon: 'phone',
      color: 'olive',
      name: '联系我们',
      badge: 0,
      url: 'vip/vip'
    }
    // , {
    //   icon: 'upstagefill',
    //   color: 'cyan',
    // badge: 22,
    //   name: '暂无'
    // }, {
    //   icon: 'clothesfill',
    //   color: 'blue',
    //   badge: 0,
    //   name: '暂无'
    // }
    ],
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
  onShow(){
    if (app.globalData.userInfo.nickName) {
      this.setData({
        userInfo: app.globalData.userInfo
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
    if(['vip/vip'].includes(e.currentTarget.dataset.url)){
      wx.navigateTo({
        url: '/pages/'+e.currentTarget.dataset.url
      })
    }else{
      wx.navigateTo({
        url: '/otherPage/pages/'+e.currentTarget.dataset.url
      })
    }
  }
})
