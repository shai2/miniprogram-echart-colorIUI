import { myRequest } from '../../utils/request'
import { formatTime } from '../../utils/util'
const app = getApp()

Page({
  data: {
    ContactPicker: [],
    ContactPointPicker:[],
    customId:'',
    actionType: '添加',
    isEdit: false,
    ContactNote:'',//接触信息
    ContactWay:null,//接触方式
    ContactPoint:'',//接触评分
  },
  onLoad(opt) {
    this.setData({
      ContactPicker: wx.getStorageSync('contactList'),
      customId: opt.customId,
      contactId: opt.contactId
    })
    // 带contactId是编辑
    if(opt.contactId){
      console.log('这是编辑')
      let _picker =  wx.getStorageSync('contactList')
      // 回显
      let _editItem = wx.getStorageSync('editItem')
      wx.setNavigationBarTitle({
        title: '编辑接触',
      })
      this.setData({
        actionType:'修改',
        isEdit: true,
        ContactNote:_editItem.ContactNote,//接触信息
        ContactWay:_editItem.ContactWay*1,//接触方式
        ContactPointPicker:_picker[_editItem.ContactWay*1].children,
      },()=>{
        this.setData({
          ContactPoint: this.data.ContactPointPicker.findIndex(e=>{
            return e.point==_editItem.ContactPoint
          })
        })
      })
    }
  },
  // 提交表单
  formSubmit(e){
    console.log('表单：', e)
    if(!this.data.ContactNote){
      wx.showToast({
        title: '接触信息必填',
        icon: 'none',
        mask: true,
      })
      return
    }
    else if(!this.data.ContactWay){
      wx.showToast({
        title: '接触方式必填',
        icon: 'none',
        mask: true,
      })
      return
    }
    else if(!this.data.ContactPoint){
      wx.showToast({
        title: '接触评分必填',
        icon: 'none',
        mask: true,
      })
      return
    }
    this.addContact()
  },
  // 新增
  addContact(){
    let _ContactPoint = this.data.ContactPointPicker[this.data.ContactPoint].point
    let _obj = {
      customId: this.data.customId,
      ContactDate: formatTime(),
      ContactNote: this.data.ContactNote,
      ContactPoint: _ContactPoint,
      ContactWay: this.data.ContactWay,
    }
    // 编辑节点id 传null接口报错
    if(this.data.isEdit){
      _obj = Object.assign(_obj,{ contactId: this.data.contactId })
    }
    console.log('新增的数据：', _obj)
    // console.log('新增的数据JSON：', JSON.stringify(_obj))
    myRequest(this.data.isEdit?'editContact':'addContact', _obj).then(res => {
      wx.redirectTo({
        url: `/pages/clientDetail/clientDetail?customId=${this.data.customId}`
      })
    })
  },
  
  // 输入input
  changeInput(e){
    // console.log('改变：', e.target.dataset.type, e.detail.value)
    this.setData({
      [e.target.dataset.type]: e.detail.value
    })
  },
  // pick选择
  PickerChange(e) {
    let _type = e.target.dataset.type
    console.log(_type,e.detail.value)
    // 改变接触方式
    if(_type==='ContactWay'){
      console.log(3333, this.data.ContactPicker[e.detail.value*1].children)
      this.setData({
        [_type]: e.detail.value,
        ContactPointPicker: this.data.ContactPicker[e.detail.value*1].children,
        ContactPoint:null,
      })
    }
    else if(_type=='ContactPoint'){
      this.setData({
        [_type]: e.detail.value,
      })
    }
  },
})