//index.js
//获取应用实例
var app = getApp()
var userInfo = {}
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
    getProt: '2200',
    energyText: '热量过剩',
    height: '',
    weight: '',
    age: '',
    aerobic: '',
    energy: '300',
    advice: '建议:200~500'
  },

  bindHelp: function () {
    wx.showModal({
      title: '提示',
      content: '热量过剩：增肌时每日摄入的热量应大于每日消耗的热量，建议在200-500kcal之间，太多的过剩热量会增长过多脂肪\n热量缺口：减脂时每日需要摄入的热量应小于每日消耗的热量，建议在500-1000kcal之间,对应每周可减少约1-2斤的脂肪，热量缺口太大会导致基础代谢率降低或肌肉分解过多',
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

  bindGoalHelp: function () {
    wx.showModal({
      title: '提示',
      content: '选择目的后，会根据目的自动生成热量过剩/缺口以及每kg体重摄入蛋白质的推荐值，可根据自己的实际情况修改',
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

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  goalChange: function (e) {
    console.log('radio发送选择改变，携带值为', e.detail.value)
    if (e.detail.value == 'muscle') {
      this.setData({
        getProt: 2200,
        energy: 300,
        energyText: '热量过剩',
        advice: '建议:200~500',
      })
    } else {
      this.setData({
        getProt: 2750,
        energy: 800,
        energyText: '热量缺口',
        advice: '建议:500~1000'
      })
    }
  },

  bindProtChange: function (e) {
    console.log('slider发送选择改变，携带值为', e.detail.value)
    this.setData({
      prot: e.detail.value
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
          sex: e.detail.value.sex,
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
        + '&sex=' + e.detail.value.sex + '&goal=' + e.detail.value.goal + "&sportIndex=" + e.detail.value.sportIndex + "&getProt=" + e.detail.value.getProt
      }),
        console.log(e.detail.value)
    }

  },
  formReset: function () {

    console.log('form发生了reset事件')
  },

  onLoad: function () {
    if (!app.globalData.openid) {
      app.openidReadyCallback = res => {
        app.globalData.openid = res.data;
        wx.setStorageSync('userid', res.data);
      }
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
      userInfo = app.globalData.userInfo;
      console.log(userInfo);
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
        })
        userInfo = res.userInfo;
        console.log(userInfo);
      }
    }
    try {
      var info = wx.getStorageSync('info')
      if (info) {
        this.setData({
          getProt: info.getProt,
          height: info.height,
          weight: info.weight,
          age: info.age,
          index: info.sportIndex,
          aerobic: info.aerobic,
          energy: info.energy,
        })
        if (info.sex == 'female') {
          this.setData({
            sex: [
              { name: 'male', value: '男' },
              { name: 'female', value: '女', checked: 'true' },
            ],
          })
        }
        if (info.goal == 'fat') {
          this.setData({
            goals: [
              { name: 'muscle', value: '增肌' },
              { name: 'fat', value: '减脂', checked: 'true' },
            ],
            energyText: '热量缺口',
            advice: '建议:500~1000'
          })
        }
      }
    } catch (e) {
      // Do something when catch error
    }
   
    console.log('onLoad')
  },


  onShareAppMessage: function (res) {
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '热量摄入计算器',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})
