//index.js
//获取应用实例
var app = getApp()
// 在页面中定义插屏广告
let interstitialAd = null
const db = wx.cloud.database({
  env: 'calories-webtest-efd9c7'
})
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
    advice: '建议:200~500',
    saveWeightChecked:false,
    helpHidden:true,
    opencloseHelp:'使用教程'
  },

//热量过剩 缺口栏目帮助按钮
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

  //运动频次 帮助
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

  //有氧运动帮助
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

//目的 帮助
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
//蛋白质变化事件响应
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

//目的 改变事件 响应
  goalChange: function (e) {
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
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
  chart: function (e) {
    wx.navigateTo({
      url: '../line/index'
    });
   
    },

//查看结果按钮响应
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
      wx.showLoading({
        title: '计算中',
      })

      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
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
      if(this.data.saveWeightChecked==true){
        db.collection('userinfo').add({
          // data 字段表示需新增的 JSON 数据
          data: {
              openid: null,
              nickname: null,
              height: e.detail.value.height,
              weight: e.detail.value.weight,
              age: e.detail.value.age,
              aerobic: e.detail.value.aerobic,
              energy: e.detail.value.energy,
              sex: e.detail.value.sex,
              goals: e.detail.value.goal,
              sportIndex: si,
            create_date: db.serverDate()
          },
          success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
          }
        })
        /*
        wx.request({
          url: 'https://www.tomwoo.tk/CounterWebApp/calory/getjson',
          method:'POST',
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
            sportIndex: si,
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
          }
        })*/
      }
     
      
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
      //console.log("hello"+app.globalData.userInfo)
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
    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-fc5a215752d1c879'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }

   
    console.log('onLoad')
  },

  onReady(res) {
    this.videoContext = wx.createVideoContext("helpvideo1")
    wx.preloadVideoAd("adunit-ec4e57a27f82b0b9")
  },

//勾选记录身体数据 响应函数
  saveWeight: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (e.detail.value == true) {
      this.setData({
        saveWeightChecked :true
      })
    } else {
      this.setData({
        saveWeightChecked : false
      })
    }

  },

//打赏按钮 响应函数
  support:function(res){
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ['cloud://calories-webtest-efd9c7.6361-calories-webtest-efd9c7-1254249941/WeChat Image_20200206210320.jpg'] // 需要预览的图片http链接列表
    })
    /*
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path: 'pages/apps/largess/detail?id=IVgrBWKrnrY%3D',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
        console.log("打开有赞")
      }
    })*/
  },
  
  //右上角 转发事件响应函数
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

  //教程视频隐藏显示按钮响应函数
  helpVideo:function(e){
    if(this.data.helpHidden == true){
      this.setData({
        helpHidden: false,
        opencloseHelp: '关闭教程'
      })
    }else{
      this.setData({
        helpHidden: true,
        opencloseHelp: '使用教程'
      })
    }
    
  }
})




