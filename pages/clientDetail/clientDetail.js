import { myRequest } from '../../utils/request'

Page({
  data: {
    productList: [],//产品列表 从本地取
    customInfo:{},
    GenderPicker: ['未知', '男', '女'],
  },
  onLoad(opt) {
    console.log('客户id：',opt.customId)
    this.getCustomInfo(opt.customId)
    this.setData({
      productList: wx.getStorageSync('productList')
    })
  },
  // 获取单一联系人信息
  getCustomInfo(customId){
    let _obj = { CustomId: customId }
    // console.log('参数',_obj)
    myRequest('getCustomInfo', _obj).then(res => {
      let _ProductIds = ''
      // 格式化数据
      // console.log('客户数据：',res[0])
      res[0].Gender = this.data.GenderPicker[res[0].Gender]
      res[0].Birthday = res[0].Birthday.split(' ')[0]
      res[0].RelationTag = res[0].RelationTag||'门外'
      //这个replace空格比较特殊，是复制的
      res[0].Address =  res[0].Province +
                        (res[0].City?'-':'') +
                        res[0].City +
                        (res[0].Area?'-':'') +
                        res[0].Area
      res[0].ProductIds = res[0].ProductIds.split(',').map(e=>{
        let _item = this.data.productList.find((m)=>{
          return m.Id == e
        })
        return _item
      }).map(e=>e.ProductName).join(',')
  
      console.log('客户数据：',res[0])
      this.setData({
        customInfo: res[0]
      })
    })
  },
  // 编辑详情
  toClientDetail(){
    wx.navigateTo({
      url: `/pages/addClient/addClient?customId=${this.data.customInfo.Id}`
    })
  },
  // 删除客户 支持多个 格式：1,2,3
  delCustom(){
    myRequest('delCustom', {customids: this.data.customInfo.Id}).then(res => {
      wx.setStorageSync('needRefresh',true)//设置flag
      wx.switchTab({
        url: `/pages/client/client`
      })
    })
  },
  // 打开询问弹窗
  showDeleteModal(e){
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 关闭弹窗
  closeModal(){
    this.setData({
      modalName: ''
    })
  },
})
