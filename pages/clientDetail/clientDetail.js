import { myRequest } from '../../utils/request'

Page({
  data: {
    
  },
  onLoad(opt) {
    console.log('客户id：',opt.customId)
    this.getCustomInfo(opt.customId)
  },
  // 获取单一联系人信息
  getCustomInfo(customId){
    let _obj = { CustomId: customId }
    console.log('参数',_obj)
    myRequest('getCustomInfo', _obj).then(res => {
      console.log('客户数据：',res)
    })
  },
})
