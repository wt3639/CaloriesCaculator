//result.js
const app = getApp()
Page({
  data: {
    // text:"这是一个页面" 
    BMI: '',
    total: '',
    need: '',
    prot: '',
    fat: '',
    cab: '',
    nickName:'',
    avatarUrl:'',
  },

  onLoad: function (options) {


    this.setData({
      BMI: options.basic,
      total: options.total,
      need: options.need,
      prot: options.prot,
      fat: options.fat,
      cab: options.cab,
      nickName: options.nickName,
      avatarUrl: options.avatarUrl,
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,

      })
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,

        })
      }
    }
  },

})

