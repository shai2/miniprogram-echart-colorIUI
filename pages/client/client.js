import { myRequest } from '../../utils/request'
const app = getApp()

Page({
  data: {
    TabCur: 0, //左侧item高亮
    MainCur: 0, //找到的滑动位置id
    VerticalNavTop: 0,
    list: [],
    load: true,
    relationArr:[],
    customArr:[],
  },
  onLoad() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this.getCustomList()
  },
  onShow() {
    // 没有标签list 就获取一次
    !this.data.list.length && this.listInit()
    // 每次切换回来 有flag时 重新请求一次列表
    if(wx.getStorageSync('needRefresh')){
      this.getCustomList()
      wx.removeStorageSync('needRefresh')
    }
  },
  onReady() {
    wx.hideLoading()
  },
  // 左侧列表初始化，加字段
  listInit(){
    let _listOrigin = wx.getStorageSync('RelationInfo')
    let _list = []
    for (let i = 0; i < _listOrigin.length; i++) {
      _list[i] = {}
      _list[i].name = _listOrigin[i].RelationTag
      _list[i].id = i
    }
    this.setData({
      list: _list,
    })
  },
  // 点击左边
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  // 滑动右边同步左边
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  },
  // 获取联系人列表
  getCustomList(){
    myRequest('getCustomList', null, "GET").then(res => {
      console.log('获取联系人列表：', res)
      this.listInit()
      // console.log('res:',res)
      let _customArr = new Array(this.data.list.length).fill('')
      _customArr = _customArr.map(e=>[])
      res.forEach((e,i)=>{
        _customArr[e.RelationId].push(e)
      })
      this.setData({customArr:_customArr})
    })
  },
  // 查看详情
  toClientDetail(e){
    wx.navigateTo({
      url: `/pages/clientDetail/clientDetail?customId=${e.currentTarget.dataset.id}`
    })
  }
})