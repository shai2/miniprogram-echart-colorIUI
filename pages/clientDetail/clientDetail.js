import { myRequest } from '../../utils/request'
import { formatTime } from '../../utils/util'

Page({
  data: {
    productList: [],//产品列表 从本地取
    customInfo:{},
    GenderPicker: ['未知', '男', '女'],
    rows:[],
    contactList:[],
  },
  onLoad(opt) {
    console.log('客户id：',opt.customId)
    this.setData({
      productList: wx.getStorageSync('productList'),
      contactList: wx.getStorageSync('contactList'),
      customId: opt.customId,
    })
    this.getCustomInfo(this.data.customId)
    this.getContactList(this.data.customId)
  },
  onShow(){
    if(wx.getStorageSync('needRefreshContact')){
      this.getContactList(this.data.customId)
      wx.removeStorageSync('needRefreshContact')
    }//设置flag
  },
  toClientEdit(){
    wx.navigateTo({
      url: `/pages/addClient/addClient?customId=${this.data.customId}`
    })
  },
  // 获取单一联系人接触
  getContactList(customId){
    let _obj = {
      CustomId: customId,
      pagesize: 9999,
    }
    // 注：需要接口按照日期降序返回
    myRequest('getContactList', _obj).then(res => {
      console.log('接触点数据：',res.rows)
      let _formatObj = {}
      // 按照日期格式化 todo:日期可以格式化成"今天 今天"
      res.rows.forEach((e,i)=>{
        // 加字段 是否是当天，是否显示编辑和删除
        if(e.ContactDate.split(' ')[0] == formatTime().split(' ')[0]){
          e.showContactEdit = true
        }else{
          e.showContactEdit = false
        }
        
        let _day = e.ContactDate.split(' ')[0]
        if(!_formatObj[_day]){
          _formatObj[_day] = []
        }
        _formatObj[_day].push(e)
      })
      let _formatArr = []
      for(let e in _formatObj){
        _formatArr.push(_formatObj[e])
      }
      this.setData({
        rows: _formatArr
      })
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
      }).map(e=>{
        if(e){
          return e.ProductName
        }
      }).join(',')
  
      console.log('客户数据：',res[0])
      this.setData({
        customInfo: res[0]
      })
    })
  },
  // 去添加接触
  toAddContact(e){
    wx.navigateTo({
      url: `/pages/addContact/addContact?customId=${this.data.customInfo.Id}&relation=${this.data.customInfo.Relation}`
    })
  },
  // 编辑触点详情
  toEditContact(e){
    // console.log('要编辑的', e.target.dataset.item)
    wx.setStorageSync('editItem',e.target.dataset.item)
    
    wx.navigateTo({
      url: `/pages/addContact/addContact?customId=${this.data.customInfo.Id}&contactId=${e.target.dataset.id}&relation=${this.data.customInfo.Relation}`
    })
  },
  // 删除客户 支持多个 格式：1,2,3
  delCustom(){
    myRequest('delCustom', {customids: this.data.customInfo.Id}).then(res => {
      wx.setStorageSync('needRefreshClient',true)//设置flag
      wx.switchTab({
        url: `/pages/client/client`
      })
    })
  },
  // 删除接触点
  delContact(){
    myRequest('delContact', {ContactIds: this.data.contactIds}).then(res => {
      this.getContactList(this.data.customId)
      this.closeModal()
    })
  },
  // 打开询问弹窗
  showDeleteModal(e){
    this.setData({
      modalName: e.currentTarget.dataset.target,
      contactIds: e.target.dataset.id
    })
  },
  // 关闭弹窗
  closeModal(){
    this.setData({
      modalName: '',
      contactIds: '',
    })
  },
})
