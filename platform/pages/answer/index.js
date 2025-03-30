//answer.js
var util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    motto: '知乎--微信小程序版',
    userInfo: {},
    result: [],
    content: '<div><h1>标题</h1><p>这是一个段落。</p></div>'
  },
  //事件处理函数
  toQuestion: function() {
    wx.navigateTo({
      url: '../question/index'
    })
  },
  onLoad: function (options) {
    console.log('onLoad');
    console.log(options);
    wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'getAnswerPage',
          id: Number(options.id)
        },
        success: res => {
          console.log(res.result.dataList);
          if (res.result.dataList.length === 0) {
            console.log("not found");
            // this.setData({
            //   feed: [],
            //   feed_length: 0,
            // //   isLoading: false
            // });
          } else {
            this.setData({
              result: res.result.dataList,
            });
            console.log("end search; search result:");
            this.getAnswerContentFromServer();
          }
        },
        fail: err => {
          console.error('搜索失败：', err);
        //   this.setData({ isLoading: false });
        }
      });

    // var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })

  },
  getAnswerContentFromServer: function() {
    // 这里可以使用 wx.request 或 wx.cloud.callFunction 从服务器获取数据
    // 以下是模拟数据
    // var mockRichText = '<p>这是一段 <strong>粗体</strong> 文字，还有 <span style="color: red;">红色</span> 文字。</p><img src="../../images/1444983318907-_DSC1826.jpg" />';
    var mockRichText = this.data.result[0].data[0].answer_ctnt;
    console.log(mockRichText)
    this.setData({
      content: mockRichText
    });
  },
  tapName: function(event){
    console.log(event)
  }
})
