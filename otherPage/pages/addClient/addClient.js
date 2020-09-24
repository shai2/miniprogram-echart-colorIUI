import { myRequest } from '../../../utils/request'
const app = getApp()

Page({
  data: {
    productList: [],//产品列表
    GenderPicker: ['未知', '男', '女'],
    RelationTagPicker:[],
    ProvincePicker: [],
    CityPicker: [],
    AreaPicker: [],
    actionType: '添加',
    isEdit: false,
    // 以下是form字段
    CustomName: '',
    Gender: null,
    Birthday: '',
    Province: '',
    City: '',
    Area: '',
    Telephone: '',
    ContactWay: '',
    CompanyName: '',
    Job: '',
    RelationTag: null,
    // Relationship: '',
    ProductIds: [],//选中的列表
    from: null,//从哪个页面跳转来的
  },
  onLoad(opt) {
    this.getProductList()
    this.getProvince()
    this.setData({
      RelationTagPicker: wx.getStorageSync('RelationInfo'),
      from: opt.from
    })
    // 带customId是编辑
    if(opt.customId){
      console.log('这是编辑')
      wx.setNavigationBarTitle({
        title: '编辑客户',
      })
      this.setData({
        actionType:'修改',
        isEdit: true,
        editId: opt.customId,
      })
      this.getCustomInfo(opt.customId)
    }
  },
  // 获取单一联系人信息
  getCustomInfo(customId){
    let _obj = { CustomId: customId }
    // console.log('参数',_obj)
    myRequest('getCustomInfo', _obj).then(res => {
      // 格式化数据
      console.log('客户数据：',res[0])
      this.setData({
        CustomName: res[0].CustomName,
        Gender: res[0].Gender,
        Birthday: res[0].Birthday.split(' ')[0],
        Province: res[0].Province,
        City: res[0].City,
        Area: res[0].Area,
        Telephone: res[0].Mobile,
        ContactWay: res[0].ContactWay,
        CompanyName: res[0].CompanyName,
        Job: res[0].Job,
        RelationTag: res[0].Relation*1-1, //RelationTag是index，接口比数组picker的value大1，减1回显
        // Relationship: res[0].Relationship,
        ProductIds: res[0].ProductIds,
      })
      // 处理checkbox回显
      console.log('相关产品：',res[0].ProductIds)
      let _checkedArr = res[0].ProductIds.split(',')
      let _productList = this.data.productList.map((e)=>{
        if(_checkedArr.includes(e.Id+'')){
          e.checked = true
        }
        return e
      })
      this.setData({
        productList: _productList
      })
    })
  },
  // 选择日期
  DateChange(e) {
    this.setData({
      Birthday: e.detail.value
    })
  },
  // 提交表单
  formSubmit(e){
    // console.log('表单：', e)
    if(!this.data.CustomName){
      wx.showToast({
        title: '客户姓名必填',
        icon: 'none',
        mask: true,
      })
      return
    }
    else if(this.data.Gender==null){
      wx.showToast({
        title: '性别必填',
        icon: 'none',
        mask: true,
      })
      return
    }
    this.addCustom()
  },
  // 新增/编辑 联系人
  addCustom(){
    let _obj = {
      CustomName: this.data.CustomName,
      Gender: this.data.Gender,
      Birthday: this.data.Birthday,
      Province: this.data.Province,
      City: this.data.City,
      Area: this.data.Area,
      Telephone: this.data.Telephone,
      ContactWay: this.data.ContactWay,
      CompanyName: this.data.CompanyName,
      Job: this.data.Job,
      RelationTag: this.data.RelationTag&&this.data.RelationTagPicker[this.data.RelationTag].RelationId||1,//不填默认给1，门外关系
      // Relationship: this.data.Relationship,
      ProductIds: this.data.ProductIds+'',
    }
    // 编辑需要联系人id 传null接口报错
    if(this.data.isEdit){
      _obj = Object.assign(_obj,{ CustomId: this.data.editId })
    }
    console.log('新增的数据：', _obj)
    // console.log('新增的数据JSON：', JSON.stringify(_obj))
    myRequest(this.data.isEdit?'editCustom':'addCustom', _obj).then(res => {
      // console.log('新增联系人：', res)
      wx.showToast({
        title: '成功',
        icon: 'none',
        mask: true,
        success: ()=>{
          wx.setStorageSync('needRefreshClient',true)//设置flag
          // 添加成功后调转到联系人列表页
          setTimeout(()=>{
            if(this.data.isEdit){
              wx.redirectTo({
                url: `otherPage/pages/clientDetail/clientDetail?customId=${this.data.editId}`
              })
            }
            else if(this.data.from=='customList'){
              wx.switchTab({
                url: `/pages/client/client`
              })
            }
            else{
              wx.switchTab({
                url: `/pages/my/my`
              })
            }
          },1500)
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
  // pick选择
  PickerChange(e) {
    let _type = e.target.dataset.type
    // 改变性别
    if(_type==='Gender'){
      console.log(_type,e.detail.value)
      this.setData({
        [_type]: e.detail.value
      })
    }
    // 改变关系
    else if(_type==='RelationTag'){
      console.log(_type,e.detail.value)
      this.setData({
        [_type]: e.detail.value
      })
    }
    // 改变省市区
    else if(['Province','City','Area'].includes(_type)){
      console.log(this.data[_type+'PickerOrigin'][e.detail.value][_type+'Name'])
      // 如果选择没变，不更新
      if(this.data[_type+'PickerOrigin'][e.detail.value][_type+'Name']===this.data[_type]){
        return 
      }
      // 选择变了
      this.setData({
        [_type]: this.data[_type+'Picker'][e.detail.value]
      })
      // picker变成的value
      let _Code = this.data[_type+'PickerOrigin'][e.detail.value][_type+'Code']
      // 变更省，请求市。清空市区
      if(_type==='Province'){
        this.getCity(_Code)
        this.setData({
          City: '',
          Area: '',
        })
      }
      // 变更市，请求区，清空区
      else if(_type==='City'){
        this.getArea(_Code)
        this.setData({
          Area: '',
        })
      }
    }
  },
  // 获取省
  getProvince(){
    myRequest('getProvince', null).then(res => {
      console.log('获取省', res)
      this.setData({
        ProvincePicker: res.map(e=>e.ProvinceName),
        ProvincePickerOrigin: res
      })
      this.getCity(res[0].ProvinceCode) //默认给第一个北京
    })
  },
  // 获取市
  getCity(ProvinceCode){
    myRequest('getCity', {ProvinceCode}).then(res => {
      console.log('获取市', res)
      this.setData({
        CityPicker: res.map(e=>e.CityName),
        CityPickerOrigin: res
      })
      this.getArea(res[0].CityCode) //默认给第一个
    })
  },
  // 获取区
  getArea(CityCode){
    myRequest('getArea', {CityCode}).then(res => {
      console.log('获取区', res)
      this.setData({
        AreaPicker: res.map(e=>e.AreaName),
        AreaPickerOrigin: res
      })
    })
  },
  // 获取我的产品列表
  getProductList(){
    let _obj = {
      pagesize: 9999
    }
    myRequest('getProductList', _obj).then(res => {
      let _productList = res.rows.map(e=>e)
      console.log('产品列表：', _productList)
      this.setData({
        productList: _productList
      })
    })
  },
  checkboxChange(e){
    let _val = e.detail.value
    console.log(_val,typeof(_val))
    this.setData({
      ProductIds: _val
    })
  },
})
