import * as echarts from '../../ec-canvas/echarts';
import { myRequest } from '../../utils/request'
const app = getApp()

let chart_1, chart_2, chart_3, chart_4, chart_5, chart_6

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 0,
    tabNav: ['销售视角', '产品视角', '区域视角'],
    startDate1: '未选择',
    endDate1: '未选择',
    startDate2: '未选择',
    endDate2: '未选择',
    startDate3: '未选择',
    endDate3: '未选择',
    startDate4: '未选择',
    endDate4: '未选择',
    startDate5: '未选择',
    endDate5: '未选择',
    startDate6: '未选择',
    endDate6: '未选择',
    ecChart_1: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_1 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        canvas.setChart(chart_1);
        let _page = getCurrentPages()
        _page[_page.length-1].getChart_1(true)
        return chart_1;
      }
    },
    ecChart_2: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_2 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        canvas.setChart(chart_2);
        chart_2.showLoading();
        let _page = getCurrentPages()
        _page[_page.length-1].getChart_2(true)
        return chart_2;
      }
    },
    ecChart_3: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_3 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        canvas.setChart(chart_3);
        chart_3.showLoading();
        let _page = getCurrentPages()
        _page[_page.length-1].getChart_3(true)
        return chart_3;
      }
    },
    ecChart_4: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_4 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        canvas.setChart(chart_4);
        chart_4.showLoading();
        let _page = getCurrentPages()
        _page[_page.length-1].getChart_4(true)
        return chart_4;
      }
    },
    ecChart_5: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_5 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        canvas.setChart(chart_5);
        chart_5.showLoading();
        let _page = getCurrentPages()
        _page[_page.length-1].getChart_5(true)
        return chart_5;
      }
    },
    ecChart_6: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_6 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        canvas.setChart(chart_6);
        chart_6.showLoading();
        let _page = getCurrentPages()
        _page[_page.length-1].getChart_6(true)
        return chart_6;
      }
    },
  },
  onLoad() {
    wx.hideTabBar({}) //未授权隐藏tabbar
    if (wx.getStorageSync('canUseUserInfo')) {
      this.userInfoReadyCallback()
    }
  },
  bindDateChange(e) {
    console.log(`${e.target.dataset.datatap}改变：`, e.detail.value)
    this.setData({
      [e.target.dataset.datatap]: e.detail.value
    })
    let _index = e.target.dataset.datatap.slice(-1)
    // 如果结束时间大于开始时间 且不为"未选择" 请求接口
    let _start = this.data[`startDate${_index}`]
    let _end = this.data[`endDate${_index}`]
    if(_start!=='未选择' && _end!=='未选择' && _start<_end){
      this[`getChart_${_index}`]()
    }
  },
  // 重置日期选择
  resetData(e){
    let _index = e.currentTarget.dataset.index
    this.setData({
      [`startDate${_index}`]: '未选择',
      [`endDate${_index}`]: '未选择',
    },()=>{
      this[`getChart_${_index}`](true)
    })
  },
  // 切换tab
  tabSelect(e) {
    // console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    wx.pageScrollTo({
      scrollTop: 0
    })
  },
  // wx.login后开始执行
  userInfoReadyCallback() {
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      success: res => {
        console.log('getUserInfo返回', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.userInfo = res.userInfo
        this.regUser()
      }
    })
  },
  //注册新用户
  regUser() {
    let _obj = {
      userid: wx.getStorageSync('openid'),
      nickname: app.globalData.userInfo.nickName
    }
    console.log('注册新用户参数：', _obj)
    myRequest('regUser', _obj).then(res => {
      console.log('注册用户：', res)
      wx.setStorageSync('token', res.token)
      this.getUserInfo()
    }).catch(err => {
      console.log('注册返回：', err)
      if (err === "不提示") {
        this.getToken()
      }
    })
  },
  getToken(openid = wx.getStorageSync('openid')) {
    let _obj = { userid: openid }
    myRequest('getToken', _obj).then(res => {
      console.log('老用户获取token：', res)
      wx.setStorageSync('token', res.token)
      this.getUserInfo()
    })
  },
  // 获取用户信息
  getUserInfo() {
    myRequest('getUserInfo', null).then(res => {
      app.globalData.userInfo = Object.assign({}, res[0], app.globalData.userInfo)
      console.log('获取用户信息：', app.globalData.userInfo)
      wx.showTabBar({})
      // 请求关系列表
      !wx.getStorageSync('RelationInfo') && this.getRelationInfo()
      // 过期提示
      if (!app.globalData.userInfo.IsAble) {
        wx.showToast({
          title: 'vip已过期，请联系管理员',
          icon: 'none',
          success: ()=>{
            wx.reLaunch({
              url: `/pages/vip/vip`
            })
          }
        })
      } 
      // 一个周提示到期
      else if ( 60 * 60 * 24 * 7 * 1000 > (Date.parse(app.globalData.userInfo.ExpiresDate) - Date.now()) ){
        wx.showToast({
          title: 'vip有效期不足一周',
          icon: 'none',
        })
      }
    })
  },
  // 获取关系标签
  getRelationInfo() {
    myRequest('getRelationInfo', null).then(res => {
      console.log('关系标签：', res)
      wx.setStorageSync('RelationInfo', res.reverse())
    })
  },
  // 销售视图接触点分值图表
  getChart_1(flag) { //flag传true则时间传""
    let {startDate1,endDate1} = this.data
    let _obj = {
      Datestart: flag ? '' : startDate1,
      Dateend: flag ? '' : endDate1,
    }
    myRequest('getContactPoint_S', _obj).then(res => {
      console.log('getContactPoint_S：', res)
      getChartOption_1(res)
    })
  },
  // 销售视图接触类型分析图表
  getChart_2(flag) {
    let {startDate2,endDate2} = this.data
    let _obj = {
      Datestart: flag ? '' : startDate2,
      Dateend: flag ? '' : endDate2,
    }
    myRequest('getContactWay_S', _obj).then(res => {
      console.log('getContactWay_S：', res)
      getChartOption_2(res)
    })
  },
  // 销售视图接触点分值在标签上分布图表
  getChart_3(flag) {
    let {startDate3,endDate3} = this.data
    let _obj = {
      Datestart: flag ? '' : startDate3,
      Dateend: flag ? '' : endDate3,
    }
    myRequest('getContactPointInRelation_S', _obj).then(res => {
      console.log('getContactPointInRelation_S：', res)
      getChartOption_3(res)
    })
  },
  // 销售视图客户总分值图表
  getChart_4(flag) {
    let {startDate4,endDate4} = this.data
    let _obj = {
      Datestart: flag ? '' : startDate4,
      Dateend: flag ? '' : endDate4,
    }
    myRequest('getCustomPonint_S', _obj).then(res => {
      console.log('getCustomPonint_S：', res)
      getChartOption_4(res)
    })
  },
  // 销售视图标签客户数量图表
  getChart_5(flag) {
    let {startDate5,endDate5} = this.data
    let _obj = {
      Datestart: flag ? '' : startDate5,
      Dateend: flag ? '' : endDate5,
    }
    myRequest('getCustomInRelation_S', _obj).then(res => {
      console.log('getCustomInRelation_S：', res)
      getChartOption_5(res)
    })
  },
  // 销售视图标签客户数量与结构图表
  getChart_6(flag) {
    let {startDate6,endDate6} = this.data
    let _obj = {
      Datestart: flag ? '' : startDate6,
      Dateend: flag ? '' : endDate6,
    }
    myRequest('getCountCustomInRelation_S', _obj).then(res => {
      console.log('getCountCustomInRelation_S：', res)
      getChartOption_6(res)
    })
  },
})

// echart图表配置
function getChartOption_1(data) {
  console.log('========> getChartOption_1')
  var names1 = [];
  var values1 = [];
  var list1 = data["viewContactPoint"]
  for (var i = 0; i < list1.length; i++) {
    names1.push(list1[i].name);
    values1.push(list1[i].num);
  }
  chart_1.hideLoading();
  console.log('========> getChartOption_111')
  chart_1.setOption({
    title: {
      text: '接触点分值统计（按日）',
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: names1
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: values1,
      type: 'bar',
    }]
  });

}

function getChartOption_2(data) {
  console.log('========> getChartOption_2')
  var list2 = data["viewContactWay"]
  var names2 = [];
  var values_v1 = [];
  var values_v2 = [];
  var values_v3 = [];
  var values_v4 = [];
  for (var i = 0; i < list2.length; i++) {
    names2.push(list2[i].name);
    values_v1.push(list2[i].v1);
    values_v2.push(list2[i].v2);
    values_v3.push(list2[i].v3);
    values_v4.push(list2[i].v4);
  }
  chart_2.hideLoading();
  console.log('========> getChartOption_222')
  chart_2.setOption({
    title: {
      text: '接触类型分析（按日）',
    },
    legend: {
      orient: 'horizontal', // 'vertical'
      x: 'center', // 'center' | 'left' | {number},
      y: 'bottom', // 'center' | 'bottom' | {number}
      data: ['线上非实时互动', '线上实时互动', '线下多边互动', '线下双边互动']
    },
    grid:{
      bottom:'25%',//距离下边距
    },
    tooltip: {},
    xAxis: [
      {
        type: 'category',
        data: names2
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '线上非实时互动',
        type: 'bar',
        stack: '总量',
        data: values_v1
      },
      {
        name: '线上实时互动',
        type: 'bar',
        stack: '总量',
        data: values_v2
      },
      {
        name: '线下多边互动',
        type: 'bar',
        stack: '总量',
        data: values_v3
      },
      {
        name: '线下双边互动',
        type: 'bar',
        stack: '总量',
        data: values_v4
      }
    ]
  });
}

function getChartOption_3(data) {
  console.log('========> getChartOption_3')
  var list3 = data["viewContactPointInRelation"]
  var values_v5 = [];
  var values_v6 = [];
  values_v5.push(list3[0].v1);
  values_v5.push(list3[0].v2);
  values_v5.push(list3[0].v3);
  values_v5.push(list3[0].v4);
  values_v5.push(list3[0].v5);
  values_v5.push(list3[0].v6);
  values_v5.push(list3[0].v7);
  if (list3.length < 2) {
    values_v6.push(0);
    values_v6.push(0);
    values_v6.push(0);
    values_v6.push(0);
    values_v6.push(0);
    values_v6.push(0);
    values_v6.push(0);
  } else {
    values_v6.push(list3[1].v1);
    values_v6.push(list3[1].v2);
    values_v6.push(list3[1].v3);
    values_v6.push(list3[1].v4);
    values_v6.push(list3[1].v5);
    values_v6.push(list3[1].v6);
    values_v6.push(list3[1].v7);
  }
  chart_3.hideLoading();
  console.log('========> getChartOption_333')
  chart_3.setOption({
    title: {
      text: '接触点分值在标签上的分布对比（按日）',
      subtext: '未选择筛选日期时，历史数据为昨日'
    },
    legend: {
      orient: 'horizontal', // 'vertical'
      x: 'center', // 'center' | 'left' | {number},
      y: 'bottom', // 'center' | 'bottom' | {number}
      data: ['今日', '历史']
    },
    tooltip: {},
    xAxis: [
      {
        type: 'category',
        data: ['门外', '熟悉', '洞察', '利益关联', '深度合作', '主动联络', '反复主动'],
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '今日',
        type: 'bar',
        data: values_v5
      },
      {
        name: '历史',
        type: 'line',
        data: values_v6
      }
    ]
  });
}

function getChartOption_4(data) {
  console.log('========> getChartOption_4')
  var list4 = data["viewCustomPonint"]
  var names4 = [];
  var values4 = [];
  for (var i = 0; i < list4.length; i++) {
    names4.push(list4[i].name);
    values4.push(list4[i].num);
  }
  chart_4.hideLoading();
  console.log('========> getChartOption_444')
  chart_4.setOption({
    title: {
      text: '客户总分值统计（按周）',
      subtext: '客户数 x 客户标签值'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: names4
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: values4,
      type: 'bar',
    }]
  });
}

function getChartOption_5(data) {
  console.log('========> getChartOption_5')
  var list5 = data["viewCustomInRelation"]
  var names5 = [];
  var values_v9 = [];
  var values_v10 = [];
  var values_v11 = [];
  var values_v12 = [];
  var values_v13 = [];
  var values_v14 = [];
  var values_v15 = [];
  for (var i = 0; i < list5.length; i++) {
    names5.push(list5[i].name);
    values_v9.push(list5[i].v1);
    values_v10.push(list5[i].v2);
    values_v11.push(list5[i].v3);
    values_v12.push(list5[i].v4);
    values_v13.push(list5[i].v5);
    values_v14.push(list5[i].v6);
    values_v15.push(list5[i].v7);
  }
  chart_5.hideLoading();
  console.log('========> getChartOption_555')
  chart_5.setOption({
    title: {
      text: '不同标签客户的数量分析（按日）',
    },
    legend: {
      orient: 'horizontal', // 'vertical'
      x: 'center', // 'center' | 'left' | {number},
      y: 'bottom', // 'center' | 'bottom' | {number}
      data: ['门外', '熟悉', '洞察', '利益关联', '深度合作', '主动联络', '反复主动']
    },
    grid:{
      bottom:'25%',//距离下边距
    },
    tooltip: {},
    xAxis: [
      {
        type: 'category',
        data: names5
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '门外',
        type: 'bar',
        stack: '总量',
        data: values_v9
      },
      {
        name: '熟悉',
        type: 'bar',
        stack: '总量',
        data: values_v10
      },
      {
        name: '洞察',
        type: 'bar',
        stack: '总量',
        data: values_v11
      },
      {
        name: '利益关联',
        type: 'bar',
        stack: '总量',
        data: values_v12
      }
      ,
      {
        name: '深度合作',
        type: 'bar',
        stack: '总量',
        data: values_v13
      },
      {
        name: '主动联络',
        type: 'bar',
        stack: '总量',
        data: values_v14
      },
      {
        name: '反复主动',
        type: 'bar',
        stack: '总量',
        data: values_v15
      }
    ]
  });
}

function getChartOption_6(data) {
  console.log('========> getChartOption_6')
  var list6 = data["viewCountCustomInRelation"]
  var values_v7 = [];
  var values_v8 = [];
  values_v7.push(list6[0].v1);
  values_v7.push(list6[0].v2);
  values_v7.push(list6[0].v3);
  values_v7.push(list6[0].v4);
  values_v7.push(list6[0].v5);
  values_v7.push(list6[0].v6);
  values_v7.push(list6[0].v7);
  console.log('========> getChartOption_66')
  if (list6.length < 2) {
    console.log(1111)
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
  } else {
    console.log(2222)
    values_v8.push(list6[1].v1);
    values_v8.push(list6[1].v2);
    values_v8.push(list6[1].v3);
    values_v8.push(list6[1].v4);
    values_v8.push(list6[1].v5);
    values_v8.push(list6[1].v6);
    values_v8.push(list6[1].v7);
  }
  chart_6.hideLoading();
  console.log('========> getChartOption_666')
  chart_6.setOption({
    title: {
      text: '客户数量与结构（按周）',
      subtext: '未选择筛选日期时，历史数据为上周'
    },
    legend: {
      orient: 'horizontal', // 'vertical'
      x: 'center', // 'center' | 'left' | {number},
      y: 'bottom', // 'center' | 'bottom' | {number}
      data: ['本周', '历史']
    },
    tooltip: {},
    xAxis: [
      {
        type: 'category',
        data: ['门外', '熟悉', '洞察', '利益关联', '深度合作', '主动联络', '反复主动'],
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '本周',
        type: 'bar',
        data: values_v7
      },
      {
        name: '历史',
        type: 'line',
        data: values_v8
      }
    ]
  });
}