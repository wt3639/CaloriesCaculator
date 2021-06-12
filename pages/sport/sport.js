var id = null;
var editFlag = false;
var actionIndex = null;
var actHisList = [];
var sportHis = {
  date: null,
  planName: null,
  sumTime:null,
  complete: []
}
var timer
var actLineArray = []
const reas = []
const weis = []
var actionHistory = {
  name: null,
  done: [],
};

for (let i = 0; i <= 30; i++) {
  reas.push(i)
}

for (let i = 0; i <= 300; i += 2.5) {
  weis.push(i)
}
var worker=null;
var startTime;
var countStartTime;
var vibrateTimer;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    actionList: [],
    planName: null,
    actionName: null,
    repeats: null,
    weight: null,
    sets: null,
    setnum: null,
    formHide: false,
    count: 0,
    completePlanHide:true,
    reas: reas,
    weis: weis,
    value: [1, 1],
    planHide:false,
    beginPlanBtnHide:false,
  },

  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      repeats: this.data.reas[val[0]],
      weight: this.data.weis[val[1]],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    actHisList = [];
    var actLineArray = [];
    var planList = wx.getStorageSync("planList")[options.actionId];
    id = options.actionId;
    //console.log(planList)
    for (var i = 0; i < planList.actionList.length; i++) {
      var actLine = {
        name: null,
        repeats: null,
        sets: null,
        weight: null,
        hide: false,
        color:"black"
      }
      actLine.name = planList.actionList[i].actionName;
      actLine.repeats = planList.actionList[i].actionRepeat;
      actLine.sets = planList.actionList[i].actionSet;
      actLine.weight = planList.actionList[i].actionWeight;
      actLineArray.push(actLine)
    }
    console.log(actLineArray)
    this.setData({
      actionList: actLineArray,
      planName: planList.planName,
    })
    sportHis.date = new Date().toLocaleString();
    sportHis.planName = planList.planName;
    startTime= new Date().getTime();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //Countdown(this);
   // var that = this;
    //Countdown(that)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (worker) {
      worker.terminate();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  addAction: function () {
    this.setData({
      hiddenmodalput: false,
    })

  },
  nameInputOver: function (e) {

  },

  formSubmit: function (e) {
    //worker.terminate()
    console.log(e)
    var setNum = this.data.setnum;
    var doneSet = {
      repeats: null,
      weight: null,
    }
    doneSet.repeats = this.data.repeats
    doneSet.weight = this.data.weight;
    actionHistory.done.push(doneSet);
    if(setNum>=this.data.sets){
      this.setData({
        completePlanHide:false,
      })
      console.log(this.data.completePlanHide);
    }else{
      this.setData({
        completePlanHide: true,
      })
    }
    setNum++;
    this.setData({
      setnum: setNum,
      formHide: true,
      count: 0
    })
    if(worker){
      worker.terminate();
    }
    countStartTime = new Date().getTime();
    var that =this;
    timer = setInterval(function () {
      Countdown(that);
    }, 1000);
    //Countdown(this);
    // vibrateCountdown(this);
    // worker = wx.createWorker('workers/request/index.js') // 文件名指定 worker 的入口文件路径，绝对路径
    // worker.postMessage({
    //   obj: this
    // })
    // var that = this;
    // worker.onMessage(function (res) {
    //   var count = res.back;
    //   if (count % 60 == 0 && count != 0) {
    //     wx.vibrateLong({
    //       success: console.log("vibrate")
    //     })
    //   }
    //   that.setData({
    //     count: count
    //   });
    // })
  },

  restComplete: function () {
    this.setData({
      formHide: false,
    })
    // worker.terminate()
    clearTimeout(timer);
  },

  
  actionCancel: function () {
    this.setData({
      hiddenmodalput: true,
      actionName: null,
      repeats: null,
      weight: null,
      sets: null,
      count: 0,
      formHide: false,
    })
    // worker.terminate()
    clearTimeout(timer);
  },

  actionConfirm: function () {
    var tempActionList = this.data.actionList;
    tempActionList[actionIndex].hide = true;
    tempActionList[actionIndex].color = "lightgray";
    this.setData({
      hiddenmodalput: true,
      actionList: tempActionList,
      formHide: false,
    })
    console.log(actionHistory)
    actHisList.push(actionHistory);
    console.log(actHisList)
    // worker.terminate()
    clearTimeout(timer);
  },

  startAction(e) {
    var actionList = this.data.actionList;
    var action = actionList[e.currentTarget.dataset.index]
    if (action.hide != true) {
      console.log(e);
      actionIndex = e.currentTarget.dataset.index
      actionHistory = {
        name: null,
        done: [],
      };
      actionHistory.name = action.name;
      this.setData({
        completePlanHide: true,
        hiddenmodalput: false,
        actionName: action.name,
        repeats: action.repeats,
        weight: action.weight,
        sets: action.sets,
        setnum: 1,
        value: [action.repeats, action.weight / 2.5]
      })
      console.log(actionHistory)
    }

  },
  beginPlan(e) {
    var actionList = this.data.actionList;
    if(actionList!=null){
      var action = actionList[0]
      if (action.hide != true) {
        console.log(e);
        actionIndex = 0
        actionHistory = {
          name: null,
          done: [],
        };
        actionHistory.name = action.name;
        this.setData({
          completePlanHide: true,
          hiddenmodalput: false,
          actionName: action.name,
          repeats: action.repeats,
          weight: action.weight,
          sets: action.sets,
          setnum: 1,
          value: [action.repeats, action.weight / 2.5],
          beginPlanBtnHide: true,
        })
        console.log(actionHistory)

      }
    }
    

  },
  completePlan: function () {
    sportHis.complete = actHisList;
    var SumTime = new Date().getTime() - startTime;
    sportHis.sumTime = SumTime;
    var SumHour = parseInt(SumTime / 3600000);
    var SumMin = parseInt(SumTime % 3600000 / 60000);
    var SumSec = Math.round(SumTime % 60000 / 1000);
    var sumTimeStr = SumHour + "时" + SumMin + "分" + SumSec + "秒";
    console.log(sumTimeStr);
    var sportHisList = wx.getStorageSync("sportHistory") || [];
    sportHisList.push(sportHis);
    wx.setStorageSync("sportHistory", sportHisList)
    let hisStr = JSON.stringify(sportHis.complete)
    wx.redirectTo({
      url: '../workresult/workresult?date=' + sportHis.date + "&planName=" + sportHis.planName + "&complete=" + hisStr + "&sumTime=" + SumTime,
    })
  },

})

function Countdown(that) {
  var count = parseInt((new Date().getTime() - countStartTime)/1000);
  if (count % 60 == 0 && count != 0) {
    wx.vibrateLong({
      success: console.log("vibrate")
    })
  }
  console.log(count);
  that.setData({
    count: count
  });
  count++;

};

// function vibrateCountdown(that) {
//   wx.vibrateLong({
//     success: console.log("vibrate")
//   })
//   vibrateTimer = setTimeout(function () {
//     vibrateCountdown(that);
//   }, 60000);
 
// };
