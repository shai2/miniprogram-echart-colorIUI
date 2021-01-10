const app = getApp()
import { myRequest } from "../../utils/request";

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    iconList: [
      {
        icon: "friendaddfill",
        color: "red",
        badge: 0,
        name: "新增客户",
        url: "addClient/addClient",
      },
      {
        icon: "peoplefill",
        color: "orange",
        badge: 0,
        name: "我的信息",
        url: "editMyInfo/editMyInfo",
      },
      {
        icon: "newshotfill",
        color: "yellow",
        badge: 0,
        name: "我的产品",
        url: "myProduct/myProduct",
      },
      {
        icon: "phone",
        color: "olive",
        name: "联系我们",
        badge: 0,
        url: "vip/vip",
      },
      // , {
      //   icon: 'upstagefill',
      //   color: 'cyan',
      // badge: 22,
      //   name: '暂无'
      // }, {
      //   icon: 'clothesfill',
      //   color: 'blue',
      //   badge: 0,
      //   name: '暂无'
      // }
    ],
    gridCol: 3,
    // canIUse: wx.canIUse("button.open-type.getUserInfo"),
  },
  // 不登录
  refuseLogin() {
    this.setData({
      hasUserInfo: true,
    });
    // wx.showTabBar({});
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      });
    }
  },
  onShow() {
    if (app.globalData.userInfo && !app.globalData.userInfo.ExpiresDate) {
      this.getUserInfoAjax();
    }
  },
  getUserInfo(e) {
    if (!e.detail.iv) {
      wx.showToast({
        title: "请授权登录",
        icon: "none",
      });
      return;
    }
    app.globalData.userInfo = e.detail.userInfo;
    console.log(6666, app.globalData.userInfo);
    this.getToken();
  },
  //注册新用户
  regUser() {
    let _obj = {
      userid: wx.getStorageSync("openid"),
      nickname: app.globalData.userInfo.nickName,
    };
    console.log("注册新用户参数：", _obj);
    myRequest("regUser", _obj)
      .then((res) => {
        console.log("注册用户：", res);
        wx.setStorageSync("token", res.token);
      })
      .catch((err) => {
        console.log("注册返回：", err);
        if (err === "不提示") {
          // this.getToken();
        }
      });
  },
  getToken(openid = wx.getStorageSync("openid")) {
    let _obj = { userid: openid };
    myRequest("getToken", _obj).then((res) => {
      wx.setStorageSync("token", res.token);
      wx.showTabBar({});
      this.getUserInfoAjax();
      this.regUser();
    });
  },
  // 获取用户信息
  getUserInfoAjax() {
    myRequest("getUserInfo", null).then((res) => {
      app.globalData.userInfo = Object.assign(
        {},
        res[0],
        app.globalData.userInfo
      );
      console.log("获取用户信息：", app.globalData.userInfo);
      this.setData({
        userInfo: app.globalData.userInfo,
      });
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
      this.onLoad();
    });
  },
  // 点击icon-item跳转
  toUrl(e) {
    if (["vip/vip"].includes(e.currentTarget.dataset.url)) {
      wx.navigateTo({
        url: "/pages/" + e.currentTarget.dataset.url,
      });
    } else {
      wx.navigateTo({
        url: "/otherPage/pages/" + e.currentTarget.dataset.url,
      });
    }
  },
});
