import { myRequest } from '../../../utils/request'
const app = getApp()

Page({
  data: {
    nickname: '',
    mobile: '',
  },
  onLoad(){
    this.setData({
      nickname: app.globalData.userInfo.nickname,
      mobile: app.globalData.userInfo.Mobile,
    })
  },
  // 提交表单
  formSubmit(e){
    console.log('表单：', e)
    if(!this.data.nickname){
      wx.showToast({
        title: '昵称必填',
        icon: 'none',
        mask: true,
      })
      return
    }
    else if(!this.data.mobile){
      wx.showToast({
        title: '手机必填',
        icon: 'none',
        mask: true,
      })
      return
    }
    this.editUser()
  },
  // 新增/编辑 联系人
  editUser(){
    let _obj = {
      nickname: this.data.nickname,
      mobile: this.data.mobile,
    }
    console.log('提交的数据：', _obj)
    // console.log('新增的数据JSON：', JSON.stringify(_obj))
    myRequest('editUser', _obj).then(res => {
      // console.log('新增联系人：', res)
      wx.showToast({
        title: '保存成功',
        icon: 'none',
        mask: true,
        success: ()=>{
          app.globalData.userInfo.nickname = this.data.nickname
          app.globalData.userInfo.Mobile = this.data.mobile
          setTimeout(()=>{
            wx.switchTab({
              url: `/pages/my/my`
            })
          },1000)
        }
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
})
