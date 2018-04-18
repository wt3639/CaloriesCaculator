var id=null;
var editFlag=false;
var actionIndex=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput:true,
    actionList:[],
    planName:null,
    actionName:null,
    repeats:null,
    weight:null,
    sets:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var planList = wx.getStorageSync("planList")[options.actionId];
    id = options.actionId;
    console.log(planList)
    this.setData({
      actionList:planList.actionList,
      planName:planList.name,
    })
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
  addAction:function(){
    this.setData({
      hiddenmodalput:false,
    })
  },
nameInputOver:function(e){

},

  formSubmit:function(e){
    console.log(e)
  this.setData({
    hiddenmodalput: true,
  })
  var action={
    name:null,
    repeats:null,
    weight:null,
    sets:null,
  };
  action.name = e.detail.value.name;
  action.repeats = e.detail.value.repeats;
  action.weight = e.detail.value.weight;
  action.sets = e.detail.value.sets;
  var actionList = this.data.actionList;
  console.log(action)
  if(editFlag==true){
    actionList.splice(actionIndex,1,action)
    editFlag=false;
  }else{
    actionList.push(action);
  }
  this.setData({
    actionList : actionList,
    actionName: null,
    repeats: null,
    weight: null,
    sets: null,
  })
},
  actionConfirm:function(){
    this.setData({
      hiddenmodalput: true,
      actionName: null,
      repeats: null,
      weight: null,
      sets: null,
    })
  },
  planSubmit:function(e){
    var planList = wx.getStorageSync("planList")||[];
    var plan={
      name:null,
    };
    plan.name = e.detail.value.planName;
    plan.actionList = this.data.actionList;
    console.log(plan)
    if(id==null){
      planList.push(plan)
    }else{
      planList.splice(id,1,plan)
    }
   
    wx.setStorageSync("planList", planList);
    wx.navigateBack({
      url: '../workout/workout',
    })
  },

  deleteAction:function(e){
    var actionList = this.data.actionList;
    actionList.splice(e.target.dataset.index,1)
    this.setData({
      actionList:actionList,
    })
  },
  editAction(e){
    var actionList = this.data.actionList;
    var action = actionList[e.target.dataset.index]
    editFlag = true;
    actionIndex = e.target.dataset.index
    this.setData({
      hiddenmodalput: false,
      actionName: action.name,
      repeats: action.repeats,
      weight: action.weight,
      sets: action.sets,
    })
  }

})