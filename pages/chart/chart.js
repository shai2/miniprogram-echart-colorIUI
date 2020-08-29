import * as echarts from '../../ec-canvas/echarts';
import { myRequest } from '../../utils/request'
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    TabCur:0,
    tabNav: ['销售视角', '产品视角', '区域视角','渠道视角'],
    ecBar: {
      disableTouch: true,
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(getBarOption());

        return barChart;
      }
    },
    ecLine: {
      disableTouch: true,
      onInit: function (canvas, width, height, dpr) {
        const lineChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(lineChart);
        lineChart.setOption(getLineOption());

        return lineChart;
      }
    }
  },
  onLoad() {
    wx.hideTabBar({}) //未授权隐藏tabbar
    if(wx.getStorageSync('canUseUserInfo')){
      this.userInfoReadyCallback()
    }
  },
  // 切换tab
  tabSelect(e) {
    // console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  // wx.login后开始执行
  userInfoReadyCallback(){
    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    wx.getUserInfo({
      success: res => {
        console.log('getUserInfo返回',res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.userInfo = res.userInfo
        this.getWechatOpenId(app.globalData.tempCode)
      }
    })
  },
  // 发送 res.code临时登录凭证 到后台换取 openId
  getWechatOpenId(code){
    let _obj = { code: code }
    myRequest('getWechatOpenId', _obj).then(res => {
      console.log('openid',res.openid)
      wx.setStorageSync('openid',res.openid)
      this.regUser()
    })
  },
  //注册新用户
  regUser(){
    let _obj = {
      userid: wx.getStorageSync('openid'),
      nickname: app.globalData.userInfo.nickName
    }
    console.log('注册新用户参数：',_obj)
    myRequest('regUser', _obj).then(res => {
      console.log('注册用户：', res)
      wx.setStorageSync('token',res.token)
      this.getUserInfo()
    }).catch(err=>{
      console.log('注册返回：',err)
      if(err==="不提示"){
        this.getToken()
      }
    })
  },
  getToken(openid = wx.getStorageSync('openid')){
    let _obj = { userid: openid }
    myRequest('getToken', _obj).then(res => {
      console.log('老用户获取token：',res)
      wx.setStorageSync('token',res.token)
      this.getUserInfo()
    })
  },
  // 获取用户信息
  getUserInfo(){
    myRequest('getUserInfo', null).then(res => {
      app.globalData.userInfo = Object.assign({},res[0],app.globalData.userInfo)
      console.log('获取用户信息：', app.globalData.userInfo)
      wx.showTabBar({})
      // 请求关系列表
      !wx.getStorageSync('RelationInfo')&&this.getRelationInfo()
      // 一个周提示到期
      if(60*60*24*7*1000>(Date.parse(app.globalData.userInfo.ExpiresDate)-Date.now())){
        wx.showToast({
          title:'vip有效期不足一周',
          icon: 'none',
        })
      }else if(Date.parse(app.globalData.userInfo.ExpiresDate)<Date.now()){
        wx.showToast({
          title:'vip已过期，请联系管理员',
          icon: 'none',
        })
      }
    })
  },
  // 获取关系标签
  getRelationInfo(){
    myRequest('getRelationInfo', null).then(res => {
      console.log('关系标签：',res)
      wx.setStorageSync('RelationInfo', res.reverse())
    })
  },
})

// echart图表配置
function getBarOption() {
  return {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310]
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220]
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110]
      }
    ]
  };
}

function getLineOption() {
  return {
    title: {
      text: '',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['A', 'B', 'C'],
      top: 0,
      left: 'center',
      z: 100
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      // show: false
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'line',
      smooth: true,
      data: [18, 36, 65, 30, 78, 40, 33]
    }, {
      name: 'B',
      type: 'line',
      smooth: true,
      data: [12, 50, 51, 35, 70, 30, 20]
    }, {
      name: 'C',
      type: 'line',
      smooth: true,
      data: [10, 30, 31, 50, 40, 20, 10]
    }]
  };
}
