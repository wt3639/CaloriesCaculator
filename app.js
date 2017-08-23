//app.js
App({
  onLaunch: function() {
 
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        
        else{
          wx.authorize({
            scope: 'scope.userInfo',
            success:res => {
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })
    
  },

  rpxTopx: function(rpx){
    var sysinfo = wx.getSystemInfoSync();
    if (sysinfo) {
      this.globalData.sysinfo = sysinfo;
      var width = sysinfo.windowWidth;
      this.globalData.px2rpx = 750 / width;
      this.globalData.rpx2px = width / 750;
      return rpx * width / 750;
    }  
      
  },

  bmiToX: function (BMITemp) {
    var bmi = parseFloat(BMITemp);
    if (bmi < 18.5) {
      var x = 10 + 160 / 18.5 * bmi
    }
    if (bmi >= 18.5 && bmi < 24) {
      var x = 170 + 160 / 5.5 * (bmi - 18.5)
    }
    if (bmi >= 24 && bmi < 27) {
      var x = 330 + 160 / 3 * (bmi - 24)
    }
    if (bmi >= 27) {
      var x = 490 + 160 / 13 * (bmi - 27)
    }
    if (bmi >= 40) {
      var x = 650
    }
    return x;
  },

  globalData: {
    userInfo: null,
    px2rpx:null,
    rpx2px:null,
  }
})
