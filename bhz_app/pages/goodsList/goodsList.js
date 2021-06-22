// pages/goodsList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    title:'',
    list:[],
    con:'',
    current:0,
  },
  getDetail(){
    let data = {id:this.data.id}
    app.ajax({
      url:app.globalData.baseUrl+'common/goods_detail',
      type:'get',
      data,
      success:res=>{
        //console.log(res,'------------')
        this.data.title = res.description;
        this.setData({list:res.photo,con:app.formatRichText(res.content)})
      }
    })
  },
  changeSwiper(e){
    let {current, source} = e.detail
    //console.log(source)
    if(source === 'autoplay' || source === 'touch') { 
    //根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
      this.setData({
        current: current
      })
    }
  },
  imgYu(e) {
    
    //图片预览
    wx.previewImage({
      current: e.currentTarget.dataset['src'],
      urls: this.data.list
    })
  },
  sendCode(){
    wx.previewImage({
      current:['https://demo2.yunmofo.cn/bhz_app/img/code.png?1'],
      urls:['https://demo2.yunmofo.cn/bhz_app/img/code.png?1']
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.formatRichText)
    //console.log(options,'-----')
    //this.data.id = options.id;
    this.setData({id:options.id})
    this.getDetail();
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
    let title = this.data.title,id = this.data.id;
    return {
        title: title,
        path: `/pages/goodsList/goodsList?id=${id}`

    }
  }
})