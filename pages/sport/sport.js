var id = null;
var editFlag = false;
var actionIndex = null;
var actHisList = [];
var sportHis = {
  date: null,
  planName: null,
  complete: []
}
var timer
var actLineArray = []
const reas = []
const weis = []

for (let i = 0; i <= 30; i++) {
  reas.push(i)
}

for (let i = 0; i <= 300; i += 2.5) {
  weis.push(i)
}



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
      actLine.name = planList.actionList[i].name;
      actLine.repeats = planList.actionList[i].repeats;
      actLine.sets = planList.actionList[i].sets;
      actLine.weight = planList.actionList[i].weight;
      actLineArray.push(actLine)
    }
    console.log(actLineArray)
    this.setData({
      actionList: actLineArray,
      planName: planList.name,
    })
    sportHis.date = new Date().toLocaleString();
    sportHis.planName = planList.name;
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

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
    clearTimeout(timer);
    console.log(e)
    var actionHistory = {
      name: null,
      repeats: null,
      weight: null,
      setnum: null,
    };
    var setNum = this.data.setnum
    actionHistory.name = this.data.actionName;
    actionHistory.repeats = this.data.repeats
    actionHistory.weight = this.data.weight;
    actionHistory.setnum = this.data.setnum;
    actHisList.push(actionHistory)
    console.log(setNum);
    console.log(this.data.sets);
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
    clearTimeout(timer);
    Countdown(this);
  },

  restComplete: function () {
    this.setData({
      formHide: false,
    })
    clearTimeout(timer);
  },

  completePlan: function () {
    sportHis.complete = actHisList;
    var sportHisList = wx.getStorageSync("sportHistory") || [];
    sportHisList.push(sportHis);
    wx.setStorageSync("sportHistory", sportHisList)
    let hisStr = JSON.stringify(sportHis.complete)
    wx.navigateTo({
      url: '../workresult/workresult?date=' + sportHis.date + "&planName=" + sportHis.planName + "&complete=" + hisStr,
    })
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
    console.log(this.data.actionList)
    clearTimeout(timer);
  },

  startAction(e) {
    var actionList = this.data.actionList;
    var action = actionList[e.currentTarget.dataset.index]
    if (action.hide != true) {
      console.log(e);
      actionIndex = e.currentTarget.dataset.index
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
    }

  }

})

function Countdown(that) {
  var count = that.data.count;
  if (count % 60 == 0 && count != 0) {
    wx.vibrateLong({
      success: console.log("vibrate")
    })
  }
  console.log(count);
  count++;
  timer = setTimeout(function () {
    that.setData({
      count: count
    });
    Countdown(that);
  }, 1000);
};
