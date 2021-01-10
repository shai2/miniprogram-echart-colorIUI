import * as echarts from '../../ec-canvas/echarts';
import { myRequest } from '../../utils/request'
const app = getApp()

let chart_1, chart_2, chart_3, chart_4, chart_5, chart_6, chart_7, chart_8, chart_9, chart_10, chart_11, chart_12
// tab2里是 7(和6同一套)，8(和1同一套)，9(和4同一套) 多了productids字段
// tab3里是 10(和6同一套)，11(和1同一套)，12(和4同一套) 多了areaids字段
Page({
  data: {
    app: app,
    showCharts: false,
    searchText: "", //tab3搜索框文字
    CityList: [], //所有城市
    CityShow: [], //展示在tab3上边
    ProductList: [], //产品列表
    ProductIds: [],
    ProductIdsShow: [],
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur: 0,
    tabNav: ["销售视角", "产品视角", "区域视角"],
    startDate1: "未选择",
    endDate1: "未选择",
    startDate2: "未选择",
    endDate2: "未选择",
    startDate3: "未选择",
    endDate3: "未选择",
    startDate4: "未选择",
    endDate4: "未选择",
    startDate5: "未选择",
    endDate5: "未选择",
    startDate6: "未选择",
    endDate6: "未选择",
    startDate7: "未选择",
    endDate7: "未选择",
    startDate8: "未选择",
    endDate8: "未选择",
    startDate9: "未选择",
    endDate9: "未选择",
    startDate10: "未选择",
    endDate10: "未选择",
    startDate11: "未选择",
    endDate11: "未选择",
    startDate12: "未选择",
    endDate12: "未选择",
    ecChart_1: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        console.log(99999);
        chart_1 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(11111,canvas, width, height, dpr)
        canvas.setChart(chart_1);
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_1(true);
        return chart_1;
      },
    },
    ecChart_2: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_2 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(22222,canvas, width, height, dpr)
        canvas.setChart(chart_2);
        chart_2.showLoading();
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_2(true);
        return chart_2;
      },
    },
    ecChart_3: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_3 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(33333,canvas, width, height, dpr)
        canvas.setChart(chart_3);
        chart_3.showLoading();
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_3(true);
        return chart_3;
      },
    },
    ecChart_4: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_4 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(44444,canvas, width, height, dpr)
        canvas.setChart(chart_4);
        chart_4.showLoading();
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_4(true);
        return chart_4;
      },
    },
    ecChart_5: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_5 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(55555,canvas, width, height, dpr)
        canvas.setChart(chart_5);
        chart_5.showLoading();
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_5(true);
        return chart_5;
      },
    },
    ecChart_6: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_6 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(66666,canvas, width, height, dpr)
        canvas.setChart(chart_6);
        chart_6.showLoading();
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_6(true);
        return chart_6;
      },
    },
    ecChart_7: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_7 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(77777,canvas, width, height, dpr)
        canvas.setChart(chart_7);
        chart_7.showLoading();
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_7(true);
        return chart_7;
      },
    },
    ecChart_8: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_8 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(88888,canvas, width, height, dpr)
        canvas.setChart(chart_8);
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_8(true);
        return chart_8;
      },
    },
    ecChart_9: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_9 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(99999,canvas, width, height, dpr)
        canvas.setChart(chart_9);
        chart_9.showLoading();
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_9(true);
        return chart_9;
      },
    },
    ecChart_10: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_10 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(1010101010,canvas, width, height, dpr)
        canvas.setChart(chart_10);
        chart_10.showLoading();
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_10(true);
        return chart_10;
      },
    },
    ecChart_11: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_11 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(1111111111,canvas, width, height, dpr)
        canvas.setChart(chart_11);
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_11(true);
        return chart_11;
      },
    },
    ecChart_12: {
      disableTouch: true,
      onInit(canvas, width, height, dpr) {
        chart_12 = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr,
        });
        // console.log(1212121212,canvas, width, height, dpr)
        canvas.setChart(chart_12);
        chart_12.showLoading();
        let _page = getCurrentPages();
        _page[_page.length - 1].getChart_12(true);
        return chart_12;
      },
    },
  },
  onShow() {
    if (!app.globalData.userInfo) {
      this.userInfoReadyCallback();
    } else {
      this.setData({ showCharts: true });
    }
  },
  onLoad() {
    if (wx.getStorageSync("canUseUserInfo")) {
      this.getProductList();
      this.getAddJson();
      this.userInfoReadyCallback();
    } else {
      wx.hideTabBar({}); //未授权隐藏tabbar
      wx.switchTab({
        url: `/pages/my/my`,
      });
    }
  },
  // 产品多选
  checkboxChange(e) {
    let _val = e.detail.value;
    // console.log(_val, typeof (_val))
    let _ProductIdsShow = _val.map((e) => {
      let _item = this.data.ProductList.find((m) => {
        return m.Id == e;
      });
      _item.checked = true;
      return _item.ProductName;
    });
    this.setData({
      ProductIds: _val,
      ProductIdsShow: _ProductIdsShow,
    });
  },
  // 城市多选
  checkboxChangeCity(e) {
    let _val = e.detail.value;
    console.log(_val, typeof _val);
    let _CityShow = _val.map((e) => {
      let _item = this.data.CityList.find((m) => {
        return m.CityName == e;
      });
      _item.checked = true;
      return _item.CityName;
    });
    this.setData({
      CityShow: _CityShow,
    });
  },
  // 输入input
  changeSearch(e) {
    this.setData({
      searchText: e.detail.value,
    });
  },
  // 清空搜索
  clearSearch() {
    let _CityList = this.data.CityList.map((e) => {
      e.show = true;
      return e;
    });
    this.setData({
      CityList: _CityList,
      searchText: "",
    });
  },
  // 搜索城市
  search() {
    if (!this.data.searchText.trim().length) return;
    let _CityList = this.data.CityList.map((e) => {
      if (e.CityName.includes(this.data.searchText)) {
        e.show = true;
      } else {
        e.show = false;
      }
      return e;
    });
    // console.log(2222,_CityList)
    this.setData({ CityList: _CityList });
  },
  // 弹窗
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
    });
  },
  hideModalTab2(e) {
    this.setData({
      modalName: null,
    });
    this.getChart_7();
    this.getChart_8();
    this.getChart_9();
  },
  hideModalTab3() {
    this.setData({
      modalName: null,
    });
    this.getChart_10();
    this.getChart_11();
    this.getChart_12();
  },
  // 删除某个产品后执行echart
  delProduct(e) {
    // 把删除的那项的check置为false 反勾选
    let _ProductList = this.data.ProductList.map((m) => {
      let _id = this.data.ProductIds[e.target.dataset.index];
      if (m.Id == _id) {
        m.checked = false;
      }
      return m;
    });
    // 更新请求接口的数据和show的数据
    let _arr = this.data.ProductIds.concat([]);
    _arr.splice(e.target.dataset.index, 1);
    let _arrShow = this.data.ProductIdsShow.concat([]);
    _arrShow.splice(e.target.dataset.index, 1);
    // 重渲染
    this.setData(
      {
        ProductIds: _arr,
        ProductIdsShow: _arrShow,
        ProductList: _ProductList,
      },
      () => {
        this.getChart_7();
        this.getChart_8();
        this.getChart_9();
      }
    );
  },
  // 删除某个城市后执行echart
  delCity(e) {
    // 把删除的那项的check置为false 反勾选
    let _CityList = this.data.CityList.map((m) => {
      let _CityName = this.data.CityShow[e.target.dataset.index];
      if (m.CityName == _CityName) {
        m.checked = false;
      }
      return m;
    });
    // 更新请求接口的数据和show的数据
    let _arr = this.data.ProductIds.concat([]);
    _arr.splice(e.target.dataset.index, 1);
    let _arrShow = this.data.CityShow.concat([]);
    _arrShow.splice(e.target.dataset.index, 1);
    // 重渲染
    this.setData(
      {
        CityShow: _arrShow,
        CityList: _CityList,
      },
      () => {
        this.getChart_10();
        this.getChart_11();
        this.getChart_12();
      }
    );
  },
  // 日期变更
  bindDateChange(e) {
    console.log(`${e.target.dataset.datatap}改变：`, e.detail.value);
    this.setData({
      [e.target.dataset.datatap]: e.detail.value,
    });
    let _index = e.target.dataset.datatap.slice(9);
    console.log(e.target.dataset.datatap, `更改第${_index}张图`);
    // 如果结束时间大于开始时间 且不为"未选择" 请求接口
    let _start = this.data[`startDate${_index}`];
    let _end = this.data[`endDate${_index}`];

    if (
      // 除了3、6图表
      (_start !== "未选择" && _end !== "未选择" && _start < _end) ||
      // 3,6图表
      ["3", "6", "7", "10"].includes(_index)
    ) {
      this[`getChart_${_index}`]();
    } else if (_start >= _end) {
      wx.showToast({
        title: "请选择正确的起止时间",
        icon: "none",
      });
    }
  },
  // 重置日期选择
  resetData(e) {
    let _index = e.currentTarget.dataset.index;
    this.setData(
      {
        [`startDate${_index}`]: "未选择",
        [`endDate${_index}`]: "未选择",
      },
      () => {
        this[`getChart_${_index}`](true);
      }
    );
  },
  // 切换tab
  tabSelect(e) {
    // console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
    });
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
  // wx.login后开始执行
  userInfoReadyCallback() {
    if (!wx.getStorageSync('canUseUserInfo')) return
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      success: (res) => {
        console.log("getUserInfo返回", res.userInfo);
        app.globalData.userInfo = res.userInfo;
        this.setData({showCharts: true})
      },
    });
  },
  getToken(openid = wx.getStorageSync("openid")) {
    let _obj = { userid: openid };
    myRequest("getToken", _obj).then((res) => {
      console.log("老用户获取token：", res);
      wx.setStorageSync("token", res.token);
      this.getUserInfo();
    });
  },
  // 获取用户信息
  getUserInfo() {
    myRequest("getUserInfo", null).then((res) => {
      app.globalData.userInfo = Object.assign(
        {},
        res[0],
        app.globalData.userInfo
      );
      console.log("获取用户信息：", app.globalData.userInfo);
      wx.showTabBar({});
      // 过期提示
      if (!app.globalData.userInfo.IsAble) {
        wx.showToast({
          title: "vip已过期，请联系管理员",
          icon: "none",
          success: () => {
            setTimeout(() => {
              wx.reLaunch({
                url: `/pages/vip/vip`,
              });
            }, 500);
          },
        });
      }
      // 一个周提示到期
      else if (
        60 * 60 * 24 * 7 * 1000 >
        Date.parse(app.globalData.userInfo.ExpiresDate) - Date.now()
      ) {
        wx.showToast({
          title: "vip有效期不足一周",
          icon: "none",
        });
      }
    });
  },
  // 获取所有城市
  getAddJson() {
    myRequest("getAddJson", null).then((res) => {
      // console.log('获取所有城市', res[1].City)
      let _CityList = res[1].City.map((e) => {
        e.show = true;
        return e;
      });
      this.setData({
        CityList: _CityList,
      });
    });
  },
  // 获取我的产品列表
  getProductList() {
    let _obj = {
      pagesize: 9999,
    };
    myRequest("getProductList", _obj).then((res) => {
      let _ProductList = res.rows.map((e) => e);
      console.log("产品列表：", _ProductList);
      this.setData({
        ProductList: _ProductList,
      });
    });
  },
  // 销售视图接触点分值图表
  getChart_1(flag) {
    //flag传true则时间传""
    let { startDate1, endDate1 } = this.data;
    let _obj = {
      Datestart: flag ? "" : startDate1,
      Dateend: flag ? "" : endDate1,
    };
    myRequest("getContactPoint_S", _obj).then((res) => {
      console.log("getContactPoint_S：", res);
      getChartOption_1(res);
    });
  },
  // 销售视图接触类型分析图表
  getChart_2(flag) {
    let { startDate2, endDate2 } = this.data;
    let _obj = {
      Datestart: flag ? "" : startDate2,
      Dateend: flag ? "" : endDate2,
    };
    myRequest("getContactWay_S", _obj).then((res) => {
      console.log("getContactWay_S：", res);
      getChartOption_2(res);
    });
  },
  // 销售视图接触点分值在标签上分布图表
  getChart_3(flag) {
    let { startDate3 } = this.data;
    let _obj = {
      Date: flag ? "" : startDate3,
    };
    myRequest("getContactPointInRelation_S", _obj).then((res) => {
      console.log("getContactPointInRelation_S：", res);
      getChartOption_3(res);
    });
  },
  // 销售视图客户总分值图表
  getChart_4(flag) {
    let { startDate4, endDate4 } = this.data;
    let _obj = {
      Datestart: flag ? "" : startDate4,
      Dateend: flag ? "" : endDate4,
    };
    myRequest("getCustomPonint_S", _obj).then((res) => {
      console.log("getCustomPonint_S：", res);
      getChartOption_4(res);
    });
  },
  // 销售视图标签客户数量图表
  getChart_5(flag) {
    let { startDate5, endDate5 } = this.data;
    let _obj = {
      Datestart: flag ? "" : startDate5,
      Dateend: flag ? "" : endDate5,
    };
    myRequest("getCustomInRelation_S", _obj).then((res) => {
      console.log("getCustomInRelation_S：", res);
      getChartOption_5(res);
    });
  },
  // 销售视图标签客户数量与结构图表（销售视角）
  getChart_6(flag) {
    let { startDate6 } = this.data;
    let _obj = {
      Date: flag ? "" : startDate6,
    };
    myRequest("getCountCustomInRelation_S", _obj).then((res) => {
      console.log("getCountCustomInRelation_S：", res);
      getChartOption_6(res);
    });
  },
  // 销售视图标签客户数量与结构图表（产品视角）
  getChart_7(flag) {
    let { startDate7 } = this.data;
    let _obj = {
      Date: flag ? "" : startDate7 === "未选择" ? "" : startDate7,
      productids: this.data.ProductIds.join(","),
    };
    myRequest("getCountCustomInRelation_S", _obj).then((res) => {
      console.log("getCountCustomInRelation_S：", res);
      getChartOption_7(res);
    });
  },
  // 销售视图接触点分值图表（产品视角）
  getChart_8(flag) {
    //flag传true则时间传""
    let { startDate8, endDate8 } = this.data;
    let _obj = {
      Datestart: flag ? "" : startDate8 === "未选择" ? "" : startDate8,
      Dateend: flag ? "" : endDate8 === "未选择" ? "" : endDate8,
      productids: this.data.ProductIds.join(","),
    };
    myRequest("getContactPoint_S", _obj).then((res) => {
      console.log("getContactPoint_S：", res);
      getChartOption_8(res);
    });
  },
  // 销售视图客户总分值图表（产品视角）
  getChart_9(flag) {
    let { startDate9, endDate9 } = this.data;
    let _obj = {
      Datestart: flag ? "" : startDate9 === "未选择" ? "" : startDate9,
      Dateend: flag ? "" : endDate9 === "未选择" ? "" : endDate9,
      productids: this.data.ProductIds.join(","),
    };
    myRequest("getCustomPonint_S", _obj).then((res) => {
      console.log("getCustomPonint_S：", res);
      getChartOption_9(res);
    });
  },
  // 销售视图标签客户数量与结构图表（区域视角）
  getChart_10(flag) {
    let { startDate10 } = this.data;
    let _obj = {
      Date: flag ? "" : startDate10 === "未选择" ? "" : startDate10,
      areaids: this.data.CityShow.join(","),
    };
    // console.log(11111,_obj)
    myRequest("getCountCustomInRelation_S", _obj).then((res) => {
      console.log("getCountCustomInRelation_S：", res);
      getChartOption_10(res);
    });
  },
  // 销售视图接触点分值图表（区域视角）
  getChart_11(flag) {
    //flag传true则时间传""
    let { startDate11, endDate11 } = this.data;
    let _obj = {
      Datestart: flag ? "" : startDate11 === "未选择" ? "" : startDate11,
      Dateend: flag ? "" : endDate11 === "未选择" ? "" : endDate11,
      areaids: this.data.CityShow.join(","),
    };
    myRequest("getContactPoint_S", _obj).then((res) => {
      console.log("getContactPoint_S：", res);
      getChartOption_11(res);
    });
  },
  // 销售视图客户总分值图表（区域视角）
  getChart_12(flag) {
    let { startDate12, endDate12 } = this.data;
    let _obj = {
      Datestart: flag ? "" : startDate12 === "未选择" ? "" : startDate12,
      Dateend: flag ? "" : endDate12 === "未选择" ? "" : endDate12,
      areaids: this.data.CityShow.join(","),
    };
    myRequest("getCustomPonint_S", _obj).then((res) => {
      console.log("getCustomPonint_S：", res);
      getChartOption_12(res);
    });
  },
});

// echart图表配置
function getChartOption_1(data) {
  var list1 = data["viewContactPoint"].reverse()
  var names1 = [];
  var values1 = [];
  for (var i = 0; i < list1.length; i++) {
    names1.push(list1[i].name);
    values1.push(list1[i].num);
  }
  if (list1.length < 7) {
    for (var i = 0; i < 7 - list1.length; i++) {
      names1.unshift('No Data');
      values1.unshift(0);
    }
  }
  chart_1.hideLoading();
  chart_1.setOption({
    title: {
      text: '接触点分值统计（按日）',
    },
    color: '#396184',
    tooltip: {},
    xAxis: {
      type: 'category',
      data: names1,
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 10
      },
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
  var list2 = data["viewContactWay"].reverse()
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
  if (list2.length < 7) {
    for (var i = 0; i < 7 - list2.length; i++) {
      names2.unshift('No Data');
      values_v1.unshift(0);
      values_v2.unshift(0);
      values_v3.unshift(0);
      values_v4.unshift(0);
    }
  }
  chart_2.hideLoading();
  chart_2.setOption({
    title: {
      text: '接触类型分析（按日）',
    },
    color: ['#0f325c', '#396184', '#5187b5', '#bac7cf'],
    legend: {
      orient: 'horizontal', // 'vertical'
      x: 'center', // 'center' | 'left' | {number},
      y: 'bottom', // 'center' | 'bottom' | {number}
      data: ['线上非实时互动', '线上实时互动', '线下多边互动', '线下双边互动']
    },
    grid: {
      bottom: '30%',//距离下边距
    },
    tooltip: {},
    xAxis: [
      {
        type: 'category',
        data: names2,
        axisLabel: {
          interval: 0,
          rotate: 30,
          fontSize: 10
        },
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
  chart_3.setOption({
    title: {
      text: '接触点分值在标签上的分布对比（按日）',
      subtext: '未选择筛选日期时，历史数据为昨日'
    },
    color: ['#396184', '#5187b5'],
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
        axisLabel: {
          interval: 0,
          rotate: 30,
          fontSize: 10
        },
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
  var list4 = data["viewCustomPonint"].reverse()
  var names4 = [];
  var values4 = [];
  for (var i = 0; i < list4.length; i++) {
    names4.push(list4[i].name);
    values4.push(list4[i].num);
  }
  if (list4.length < 7) {
    for (var i = 0; i < 7 - list4.length; i++) {
      names4.unshift('No Data');
      values4.unshift(0);
    }
  }
  // console.log(names4, values4)
  chart_4.hideLoading();
  chart_4.setOption({
    title: {
      text: '客户总分值统计（按周）',
      subtext: '客户数 x 客户标签值'
    },
    color: '#396184',
    tooltip: {},
    xAxis: {
      type: 'category',
      data: names4,
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 10
      },
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
  var list5 = data["viewCustomInRelation"].reverse()
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
  if (list5.length < 7) {
    for (var i = 0; i < 7 - list5.length; i++) {
      names5.unshift('No Data');
      values_v9.unshift(0);
      values_v10.unshift(0);
      values_v11.unshift(0);
      values_v12.unshift(0);
      values_v13.unshift(0);
      values_v14.unshift(0);
      values_v15.unshift(0);
    }
  }
  chart_5.hideLoading();
  chart_5.setOption({
    title: {
      text: '不同标签客户的数量分析（按日）',
    },
    color: ['#11315b', '#2d4874', '#475f8e', '#6078a8', '#7a91c4', '#95ace0', '#afc6fb'],
    legend: {
      orient: 'horizontal', // 'vertical'
      x: 'center', // 'center' | 'left' | {number},
      y: 'bottom', // 'center' | 'bottom' | {number}
      data: ['门外', '熟悉', '洞察', '利益关联', '深度合作', '主动联络', '反复主动']
    },
    grid: {
      bottom: '30%',//距离下边距
    },
    tooltip: {},
    xAxis: [
      {
        type: 'category',
        data: names5,
        axisLabel: {
          interval: 0,
          rotate: 30,
          fontSize: 10
        },
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
  if (list6.length < 2) {
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
  } else {
    values_v8.push(list6[1].v1);
    values_v8.push(list6[1].v2);
    values_v8.push(list6[1].v3);
    values_v8.push(list6[1].v4);
    values_v8.push(list6[1].v5);
    values_v8.push(list6[1].v6);
    values_v8.push(list6[1].v7);
  }
  chart_6.hideLoading();
  chart_6.setOption({
    title: {
      text: '客户数量与结构（按周）',
      subtext: '未选择筛选日期时，历史数据为上周'
    },
    color: ['#396184', '#5187b5'],
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
        axisLabel: {
          interval: 0,
          rotate: 30,
          fontSize: 10
        },
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

function getChartOption_7(data) {
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
  if (list6.length < 2) {
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
  } else {
    values_v8.push(list6[1].v1);
    values_v8.push(list6[1].v2);
    values_v8.push(list6[1].v3);
    values_v8.push(list6[1].v4);
    values_v8.push(list6[1].v5);
    values_v8.push(list6[1].v6);
    values_v8.push(list6[1].v7);
  }
  chart_7 && chart_7.hideLoading();
  chart_7 && chart_7.setOption({
    title: {
      text: '客户数量与结构（按周）',
      subtext: '未选择筛选日期时，历史数据为上周'
    },
    color: ['#396184', '#5187b5'],
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
        axisLabel: {
          interval: 0,
          rotate: 30,
          fontSize: 10
        },
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

function getChartOption_8(data) {
  var list1 = data["viewContactPoint"].reverse()
  var names1 = [];
  var values1 = [];
  for (var i = 0; i < list1.length; i++) {
    names1.push(list1[i].name);
    values1.push(list1[i].num);
  }
  if (list1.length < 7) {
    for (var i = 0; i < 7 - list1.length; i++) {
      names1.unshift('No Data');
      values1.unshift(0);
    }
  }
  chart_8.hideLoading();
  chart_8.setOption({
    title: {
      text: '接触点分值统计（按日）',
    },
    color: '#396184',
    tooltip: {},
    xAxis: {
      type: 'category',
      data: names1,
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 10
      },
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

function getChartOption_9(data) {
  var list4 = data["viewCustomPonint"].reverse()
  var names4 = [];
  var values4 = [];
  for (var i = 0; i < list4.length; i++) {
    names4.push(list4[i].name);
    values4.push(list4[i].num);
  }
  if (list4.length < 7) {
    for (var i = 0; i < 7 - list4.length; i++) {
      names4.unshift('No Data');
      values4.unshift(0);
    }
  }
  // console.log(names4, values4)
  chart_9.hideLoading();
  chart_9.setOption({
    title: {
      text: '客户总分值统计（按周）',
      subtext: '客户数 x 客户标签值'
    },
    color: '#396184',
    tooltip: {},
    xAxis: {
      type: 'category',
      data: names4,
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 10
      },
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

function getChartOption_10(data) {
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
  if (list6.length < 2) {
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
    values_v8.push(0);
  } else {
    values_v8.push(list6[1].v1);
    values_v8.push(list6[1].v2);
    values_v8.push(list6[1].v3);
    values_v8.push(list6[1].v4);
    values_v8.push(list6[1].v5);
    values_v8.push(list6[1].v6);
    values_v8.push(list6[1].v7);
  }
  chart_10 && chart_10.hideLoading();
  chart_10 && chart_10.setOption({
    title: {
      text: '客户数量与结构（按周）',
      subtext: '未选择筛选日期时，历史数据为上周'
    },
    color: ['#396184', '#5187b5'],
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
        axisLabel: {
          interval: 0,
          rotate: 30,
          fontSize: 10
        },
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

function getChartOption_11(data) {
  var list1 = data["viewContactPoint"].reverse()
  var names1 = [];
  var values1 = [];
  for (var i = 0; i < list1.length; i++) {
    names1.push(list1[i].name);
    values1.push(list1[i].num);
  }
  if (list1.length < 7) {
    for (var i = 0; i < 7 - list1.length; i++) {
      names1.unshift('No Data');
      values1.unshift(0);
    }
  }
  chart_11.hideLoading();
  chart_11.setOption({
    title: {
      text: '接触点分值统计（按日）',
    },
    color: '#396184',
    tooltip: {},
    xAxis: {
      type: 'category',
      data: names1,
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 10
      },
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

function getChartOption_12(data) {
  var list4 = data["viewCustomPonint"].reverse()
  var names4 = [];
  var values4 = [];
  for (var i = 0; i < list4.length; i++) {
    names4.push(list4[i].name);
    values4.push(list4[i].num);
  }
  if (list4.length < 7) {
    for (var i = 0; i < 7 - list4.length; i++) {
      names4.unshift('No Data');
      values4.unshift(0);
    }
  }
  // console.log(names4, values4)
  chart_12.hideLoading();
  chart_12.setOption({
    title: {
      text: '客户总分值统计（按周）',
      subtext: '客户数 x 客户标签值'
    },
    color: '#396184',
    tooltip: {},
    xAxis: {
      type: 'category',
      data: names4,
      axisLabel: {
        interval: 0,
        rotate: 30,
        fontSize: 10
      },
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