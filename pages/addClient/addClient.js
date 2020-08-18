import { myRequest } from '../../utils/request'

Page({
  data: {
    // region: [null, null, null],
    GenderPicker: ['未知', '男', '女'],
    ProvincePicker: [],
    CityPicker: [],
    AreaPicker: [],
    // multiArray: [ //当前联动的3列数据
    //   ['北京', '上海'],
    //   ['北京市1', '北京市2', '北京市3'],
    //   ['北京市1-区1', '北京市1-区2']
    // ],
    // multiIndex: [0, 0, 0], //选中列的index

    // 以下是form字段
    CustomName: '',
    Gender: '',
    Birthday: '',
    Province: '',
    City: '',
    Area: '',
    Telephone: '',
    ContactWay: '',
    CompanyName: '',
    Job: '',
    Relationship: '',
    ProductIds: '',
  },
  onLoad() {
    this.getProvince()
    
  },
  // 选择省份
  // RegionChange: function(e) {
  //   this.setData({
  //     region: e.detail.value
  //   })
  // },
  // 选择日期
  DateChange(e) {
    this.setData({
      Birthday: e.detail.value
    })
  },
  // 提交表单
  formSubmit(e){
    console.log(11111)
    console.log('表单：', e)
    if(!this.data.CustomName){
      wx.showToast({
        title: '客户姓名必填',
        icon: 'none',
        mask: true,
      })
      return
    }
    else if(!this.data.Gender){
      wx.showToast({
        title: '性别必填',
        icon: 'none',
        mask: true,
      })
      return
    }
    this.addCustom()
  },
  // 新增联系人
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
      Relationship: this.data.Relationship,
      ProductIds: this.data.ProductIds,
    }
    myRequest('addCustom', _obj).then(res => {
      // console.log('新增联系人：', res)
      wx.showToast({
        title: '添加成功',
        icon: 'none',
        mask: true,
        success: ()=>{
          // 添加成功后调转到联系人列表页
          setTimeout(()=>{
            wx.switchTab({
              url: `/pages/client/client`
            })
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
    // 改变性别 可能还有其他
    if(_type==='Gender'){
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
  // 多级联动
  // MultiChange(e) {
  //   this.setData({
  //     multiIndex: e.detail.value
  //   })
  // },
  // MultiColumnChange(e) {
  //   console.log(e.detail.column,e.detail.value)
  //   let data = {
  //     multiArray: this.data.multiArray,
  //     multiIndex: this.data.multiIndex
  //   };
  //   data.multiIndex[e.detail.column] = e.detail.value;
  //   switch (e.detail.column) {
  //     // 如果切一
  //     case 0:
  //       switch (data.multiIndex[0]) {
  //         case 0: //'北京'
  //           data.multiArray[1] = ['北京市1', '北京市2', '北京市3']
  //           data.multiArray[2] = ['北京市1-区1', '北京市1-区2']
  //           break;
  //         case 1: //'上海'
  //           data.multiArray[1] = ['上海市1', '上海市2', '上海市3'],
  //           data.multiArray[2] = ['上海市1-区1', '上海市1-区2']
  //           break;
  //       }
  //       data.multiIndex[1] = 0;
  //       data.multiIndex[2] = 0;
  //       break;
  //     // 如果切列二
  //     case 1:
  //       switch (data.multiIndex[0]) {
  //         case 0: //'北京'
  //           switch (data.multiIndex[1]) {
  //             case 0: //'北京市1'
  //               data.multiArray[2] = ['北京市1-区1', '北京市1-区2']
  //               break;
  //             case 1: //'北京市2'
  //               data.multiArray[2] = ['北京市2-区1', '北京市2-区2']
  //               break;
  //             case 2: //'北京市3'
  //               data.multiArray[2] = ['北京市3-区1', '北京市3-区2']
  //               break;
  //           }
  //           break;
  //         case 1: //'上海'
  //           switch (data.multiIndex[1]) {
  //             case 0:
  //               data.multiArray[2] = ['鲫鱼', '带鱼'];
  //               break;
  //             case 1:
  //               data.multiArray[2] = ['青蛙', '娃娃鱼'];
  //               break;
  //             case 2:
  //               data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
  //               break;
  //           }
  //           break;
  //       }
  //       data.multiIndex[2] = 0;
  //       break;
  //   }
  //   this.setData(data);
  // },
})
