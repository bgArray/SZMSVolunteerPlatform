//index.js

var util = require('../../utils/util.js')
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0,
    keyword: '',
    searchResults: [],
    isLoading: false
  },
  //事件处理函数
  bindItemTap: function(e) {
    const item = e.currentTarget.dataset.item;
    // 根据需求修改跳转的页面和传递的参数
    console.log(encodeURIComponent(item));
    wx.navigateTo({
      url: `../answer/index?id=${encodeURIComponent(item)}`
    });
    console.log("tab")
  },
  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/index'
    })
    console.log("tab")
  },

  // 搜索
  onInputChange: function (e) {
    this.setData({
      keyword: e.detail.value
    });
  },
  onSearch: function () {
    console.log("start search");
    const keyword = this.data.keyword;
    if (keyword) {
      this.setData({ isLoading: true });
      console.log("key:" + keyword)
      wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'searcher',
          keyword: keyword
        },
        success: res => {
          console.log(res.result.dataList);
          if (res.result.dataList.length === 0) {
            console.log("not found");
            this.setData({
              feed: [],
              feed_length: 0,
              isLoading: false
            });
          } else {
            // 处理搜索结果，将每条结果添加到 feed 数组中
            const feed_new = [];
            res.result.dataList.forEach((item) => {
              if (item.data && item.data.length > 0) {
                feed_new.push(item.data[0]);
              }
            });
            this.setData({
              searchResults: res.result.dataList,
              feed: feed_new,
              feed_length: feed_new.length,
              isLoading: false
            });
            console.log("end search; search result:");
            console.log(feed_new);
            this.refresh_search();
          }
        },
        fail: err => {
          console.error('搜索失败：', err);
          this.setData({ isLoading: false });
        }
      });
    }
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getData();
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function(){wx.hideNavigationBarLoading();wx.stopPullDownRefresh();}, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function(){wx.hideNavigationBarLoading();that.nextLoad();}, 1000);
    console.log("lower")
  },

  getData: function(){
    var feed = this.data.feed;
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed:feed_data,
      feed_length: feed_data.length
    });
  },
  refresh: function(){
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = this.data.feed;
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function(){
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    },3000)
  },
  refresh_search: function(){
    var feed = this.data.feed;
    console.log("loaddata");
    var feed_data = feed;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function(){
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    },3000)
  },

  nextLoad: function(){
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    })
    var next = this.data.feed;
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function(){
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    },3000)
  },

  goToDetailPage: function(e) {
    const item = this.data.feed[e.currentTarget.dataset.idx];
    const id = item.answer_id;
    console.log("id:");
    console.log(id);
    // 根据需求修改跳转的页面和传递的参数
    console.log(encodeURIComponent(question));
    wx.navigateTo({
      url: `../answer/index?id=${id}`
    });
  }
})