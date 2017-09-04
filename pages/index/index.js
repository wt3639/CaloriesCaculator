//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    sex: [
      { name: 'male', value: '男', checked: 'true' },
      { name: 'female', value: '女' },
    ],
    array: ['静坐/无运动', '1~2次运动/周', '3~5次运动/周', '6~7次运动/周', '专业运动员/劳力工作者'],
    objectArray: [
      {
        id: 0,
        name: '静坐/无运动'
      },
      {
        id: 1,
        name: '1~2次运动/周'
      },
      {
        id: 2,
        name: '3~5次运动/周'
      },
      {
        id: 3,
        name: '6~7次运动/周'
      },
      {
        id: 4,
        name: '专业运动员/劳力工作者'
      }
    ],
    index: '0',
    goals: [
      { name: 'muscle', value: '增肌', checked: 'true' },
      { name: 'fat', value: '减脂' },
    ],
    height:'',
    weight:'',
    age:'',
    aerobic:'',
    energy:'',
    hasUserInfo: false,
  },

  bindHelp: function () {
    wx.showModal({
      title: '提示',
      content: '热量过剩：增肌时每日摄入的热量应大于每日消耗的热量，建议在200-500kcal之间，太多的过剩热量会增长过多脂肪\n热量缺口：减脂时每日需要摄入的热量应小于每日消耗的热量，建议在500-1000kcal之间,对应每周可减少约1-2斤的脂肪，热量缺口太大会导致基础代谢率降低或肌肉分解过多',
      showCancel:false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  bindSportHelp: function () {
    wx.showModal({
      title: '提示',
      content: '此项统计的是无法计算确切热量消耗的运动频次，如无氧运动等，有确切消耗的运动不包括在内，请填在有氧消耗项',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  bindAerobicHelp: function () {
    wx.showModal({
      title: '提示',
      content: '每日有氧运动的确切消耗热量，如跑步的消耗热量(kcal)=体重(kg)*距离(km)等，若没有可填0',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  radioChange: function (e) {
    console.log('radio发生change事件,携带value值为', e.detail.value)
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },


  formSubmit: function (e) {
    if (e.detail.value.height.length == 0 || e.detail.value.height < 0
      || e.detail.value.weight.length == 0 || e.detail.value.weight < 0
      || e.detail.value.age.length == 0 || e.detail.value.age < 0
      || e.detail.value.aerobic.length == 0 || e.detail.value.aerobic < 0
      || e.detail.value.energy.length == 0 || e.detail.value.energy < 0) {
      wx.showToast({
        title: '请正确填入表单',
        icon: 'success',
        duration: 2000
      })
    } else {
      var objData = e.detail.value;
      // 同步方式存储表单数据
      wx.setStorageSync('info', objData)
      var si;
      switch (e.detail.value.sportIndex) {
        case '0': si = 1.2; break
        case '1': si = 1.375; break
        case '2': si = 1.55; break
        case '3': si = 1.725; break
        case '4': si = 1.9; break
      }
      console.log(app.openid)
      wx.request({
        url: 'https://www.tomwoo.tk/CounterWebApp/calory/getjson',
        data: {
          openid: app.globalData.openid,
          nickname: app.globalData.userInfo.nickName,
          height: e.detail.value.height,
          weight: e.detail.value.weight,
          age: e.detail.value.age,
          aerobic: e.detail.value.aerobic,
          energy: e.detail.value.energy,
          sex: e.detail.value.sex ,
          goals: e.detail.value.goal,
          sportindex: si,
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
        }
      })

     

      wx.navigateTo({
        url: '../result/result?height=' + e.detail.value.height + '&weight=' + e.detail.value.weight + '&age=' + e.detail.value.age + '&aerobic=' + e.detail.value.aerobic + '&energy=' + e.detail.value.energy
        + '&sex=' + e.detail.value.sex + '&goal=' + e.detail.value.goal + "&sportIndex=" + e.detail.value.sportIndex 
      }),
        console.log(e.detail.value)
    }

  },
  formReset: function () {
  
    console.log('form发生了reset事件')
  },

  onLoad: function () {
    if(!app.globalData.openid){
      app.openidReadyCallback = res => {
        app.globalData.openid = res.data;
      }
    }
    if (app.globalData.userInfo) {
      this.setData({
        hasUserInfo: true
      })
  
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          hasUserInfo: true
        })
      }
    }

    try {
      var info = wx.getStorageSync('info')
      if (info) {
       this.setData({
         height:info.height,
         weight:info.weight,
         age:info.age,
         index:info.sportIndex,
         aerobic:info.aerobic,
         energy:info.energy,
         })
         if(info.sex=='female'){
           this.setData({
             sex: [
               { name: 'male', value: '男'  },
               { name: 'female', value: '女', checked: 'true'},
             ],
           })
         }
         if(info.goal=='fat'){
           this.setData({ goals: [
             { name: 'muscle', value: '增肌' },
             { name: 'fat', value: '减脂', checked: 'true' },
           ],
           })
         }
      }
    } catch (e) {
      // Do something when catch error
    }
    
    console.log('onLoad')
  },

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      hasUserInfo: true
    })
  }
})
