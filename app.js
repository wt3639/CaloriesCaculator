//app.js
App({
  globalData: {
    userInfo: null,
    sysInfo: null,
    rpx2px: null,
    openid: null,
  },
  openid:null,
  onLaunch: function () {

    // 登录
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
              this.openid = res.data
              if (this.openidReadyCallback) {
                this.openidReadyCallback(res)
              }
              console.log(res.data)
           
            
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
            
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
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
