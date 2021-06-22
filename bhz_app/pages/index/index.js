//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navList:[
    ],
    selected:0,
    slideNav:false,
    sideNavList:[],
    sideSelected:0,
    page:1,
    size:21,
    count:0,
    conList:[]
  },
  //事件处理函数
  changeNav(e) {
    let selected = e.currentTarget.dataset['index'];
    if(selected === this.data.selected) return;
    this.data.page = 1;
    this.setData({selected,sideSelected:0,sideNavList:[],conList:[]})
    this.getSideTab();
  },
  changeSideNav(e){
    let sideSelected = e.currentTarget.dataset['index'];
    if(sideSelected === this.data.sideSelected) return;
    this.data.page = 1;
    this.setData({sideSelected,conList:[]})
    this.getCon();
  },
  openAll(){
    //console.log(this.data.slideNav)
    let slideNav = !this.data.slideNav;
    this.setData({slideNav});
  },
  onLoad: function () {
    this.getTabTop();
  },
  getTabTop(){
    //console.log(app.ajax)
    app.ajax({
      url:app.globalData.baseUrl+'common/goods_brand',
      type:'GET',
      success:res=>{
        //console.log(res,'-------')
        this.setData({navList:res||[]})
        this.getSideTab();
      },
      fail:err=>{
        console.log(err)
      }
    })
  },
  getSideTab(){
    let data = {
      id:this.data.navList[this.data.selected].id
    }
    //console.log(data)
    app.ajax({
      url:app.globalData.baseUrl+'common/goods_category',
      type:'get',
      data,
      success:res=>{
        //console.log(res,'sidetab')
        this.setData({sideNavList:res||[]})
        if(res) this.getCon();
      }
    })
  },
  getCon(){
    this.setData({searchLoading:true})
    let data = {
      id:this.data.sideNavList[this.data.sideSelected].id,
      page:this.data.page,
      limit:this.data.size,
    }
    //console.log(data);
    app.ajax({
      url:app.globalData.baseUrl+'common/goods_list',
      type:'get',
      data,
      success:res=>{
        //console.log(res,'内容')
        let conList = [...this.data.conList,...res.data]
        this.setData({conList,count:res.count})
      },
      complete:()=>{
        this.setData({searchLoading:false})
      }
    })
  },
  ScrollLower(e){
    //console.log(this.data.count,this.data.conList.length,'置地');
    if(this.data.conList.length >= this.data.count) return;
    this.data.page = this.data.page+1;
    this.getCon()
  },
  onShareAppMessage: function () {
  
  }
})
