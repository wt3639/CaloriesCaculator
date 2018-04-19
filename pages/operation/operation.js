var id = null;
var editFlag = false;
var actionIndex = null;
const reas = []
const weis = []
const setArray = []
for (let i = 0; i <= 30; i++) {
  reas.push(i)
}

for (let i = 0; i <= 300; i += 2.5) {
  weis.push(i)
}

for (let i = 0; i <= 10; i++) {
  setArray.push(i)
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
    reas: reas,
    weis: weis,
    setArray:setArray,
    value: [1, 1, 1],
  },

  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      repeats: this.data.reas[val[0]],
      weight: this.data.weis[val[1]],
      sets: this.data.setArray[val[2]],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.actionId) {
      var planList = wx.getStorageSync("planList")[options.actionId];
      id = options.actionId;
      console.log(planList)
      this.setData({
        actionList: planList.actionList,
        planName: planList.name,
      })
    }else{
      id=null;
    }

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
      repeats: this.data.reas[12],
      weight: this.data.weis[20],
      sets: this.data.setArray[3],
      value:[12,20,3],
    })
  },
  nameInputOver: function (e) {

  },

  formSubmit: function (e) {
    console.log(e)
    this.setData({
      hiddenmodalput: true,
    })
    var action = {
      name: null,
      repeats: null,
      weight: null,
      sets: null,
    };
    action.name = e.detail.value.name;
    action.repeats = this.data.repeats;
    action.weight = this.data.weight;
    action.sets = this.data.sets;
    var actionList = this.data.actionList;
    console.log(action)
    if (editFlag == true) {
      actionList.splice(actionIndex, 1, action)
      editFlag = false;
    } else {
      actionList.push(action);
    }
    this.setData({
      actionList: actionList,
      actionName: null,
      repeats: null,
      weight: null,
      sets: null,
    })
  },
  actionConfirm: function () {
    this.setData({
      hiddenmodalput: true,
      actionName: null,
      repeats: null,
      weight: null,
      sets: null,
    })
  },
  planSubmit: function (e) {
    var planList = wx.getStorageSync("planList") || [];
    var plan = {
      name: null,
    };
    plan.name = e.detail.value.planName;
    plan.actionList = this.data.actionList;
    console.log(plan)
    if (id == null) {
      planList.push(plan)
    } else {
      planList.splice(id, 1, plan)
    }

    wx.setStorageSync("planList", planList);
    wx.navigateBack({
      url: '../workout/workout',
    })
  },

  deleteAction: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该动作',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var actionList = that.data.actionList;
          actionList.splice(e.currentTarget.dataset.index, 1)
          that.setData({
            actionList: actionList,
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
  },
  editAction(e) {
    var actionList = this.data.actionList;
    var action = actionList[e.currentTarget.dataset.index]
    editFlag = true;
    actionIndex = e.currentTarget.dataset.index
    this.setData({
      hiddenmodalput: false,
      actionName: action.name,
      repeats: action.repeats,
      weight: action.weight,
      sets: action.sets,
      value:[action.repeats,action.weight/2.5,action.sets],
    })
  }

})