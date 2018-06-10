//app.js

App({
  globalData: {
    userInfo: null,
    sysInfo: null,
    rpx2px: null,
    openid: null,
    userHistory:null,
  },
  onLaunch: function () {
    var that = this
    // 登录
    var uid = wx.getStorageSync('userid')
    if (uid) {
      that.globalData.openid = uid;
    } else {
      wx.login({
        success: res => {
          wx.request({
            url: 'https://www.tomwoo.tk/CounterWebApp/calory/getOpenid',
            data: {
              ucode: res.code,
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              that.globalData.openid = res.data
              wx.setStorageSync('userid', res.data)
              if (that.openidReadyCallback) {
                that.openidReadyCallback(res)
              }
              console.log(res.data)
            }
          })
        }
      })
    }
    var userinfo = wx.getStorageSync("userinfo")
    if (!userinfo) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.log('get authorize')
            }
          })
        }
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            that.globalData.userInfo = res.userInfo
            wx.setStorageSync("userinfo", res.userInfo)
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (that.userInfoReadyCallback) {
              that.userInfoReadyCallback(res)
            }
          }
        })
      }
    })
    }else{
      that.globalData.userInfo = userinfo;
    }

    wx.request({
      url: 'https://www.tomwoo.tk/CounterWebApp/calory/getAd',
      data: {
        id: Math.floor(Math.random() * 5 + 1)
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data['updateFlag'] == true) {
          wx.setStorageSync('adText', res.data['text'])
        }
      }
    })

  

    var res = wx.getSystemInfoSync();
    this.globalData.sysInfo = res;
    var width = res.windowWidth;
    this.globalData.rpx2px = width / 750;

  },

  rpxTopx: function (rpx) {
    return rpx * this.globalData.rpx2px;
  },




})
