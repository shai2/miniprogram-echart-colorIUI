const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
      name: '编辑信息',
      method: 'openEditModel',
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
          userInfo: app.globalData.userInfo,//res.userInfo不够
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
    if(e.currentTarget.dataset.url){
      wx.navigateTo({
        url: '/pages/'+e.currentTarget.dataset.url
      })
    }else{
      this[e.currentTarget.dataset.method]()
    }
  },
  // 打开编辑我的信息弹窗
  openEditModel(e){
    this.setData({
      modalName: 'editInfo'
    })
  },
  // 关闭弹窗
  closeModal(){
    this.setData({
      modalName: ''
    })
  },
  // 输入input
  changeInput(e){
    // console.log('改变：', e.target.dataset.type, e.detail.value)
    this.setData({
      [e.target.dataset.type]: e.detail.value
    })
  },
})
