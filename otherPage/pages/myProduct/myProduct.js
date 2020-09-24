import { myRequest } from '../../../utils/request'
const app = getApp()

Page({
  data: {
    productname: '',//新增的名字
    editProductname: '',//编辑中的名字
    productList:[],
    showInput:false,
    modalName:'',
    deleteId:'',
  },
  onLoad(){
    this.getProductList()
  },
  // 控制input显示
  changeInputShow(e){
    // 如果是开始添加，就取消编辑中
    if(e.target.dataset.control){
      this.endEdit()
    }
    this.setData({
      showInput: e.target.dataset.control
    })
  },
  // 取消编辑 隐藏input
  endEdit(e){
    this.data.productList.map((e,i)=>{
      e.isEdit = false
      return e
    })
    this.setData({
      productList:this.data.productList
    })
  },
  // 开始编辑 显示input
  startEdit(e){
    //关闭下边的添加区域
    this.setData({
      showInput: false
    })
    // 控制遍历中的显示
    let _index = e.target.dataset.index
    this.data.productList.map((e,i)=>{
      if(i === _index){
        e.isEdit = true
      }else{
        e.isEdit = false
      }
      return e
    })
    this.setData({
      productList:this.data.productList
    })
  },
  // 确定编辑
  editProduct(e){
    let _index = e.target.dataset.index
    let _obj = {
      productname: this.data.editProductname,
      productid: this.data.productList[_index].Id,
    }
    myRequest('editProduct', _obj).then(res => {
      this.setData({
        showInput: false,
        productname: null,
      })
      this.getProductList()
    })
  },
  // 获取我的产品列表
  getProductList(){
    let _obj = {
      pagesize: 9999
    }
    myRequest('getProductList', _obj).then(res => {
      let _productList = res.rows.map(e=>{
        e.isEdit = false
        return e
      })
      console.log('产品列表：', _productList)
      this.setData({
        productList: _productList
      })
    })
  },
  // 新增
  addProduct(){
    let _obj = {
      productname: this.data.productname
    }
    console.log('提交的数据：', _obj)
    // console.log('新增的数据JSON：', JSON.stringify(_obj))
    myRequest('addProduct', _obj).then(res => {
      this.setData({
        showInput: false,
        productname: null,
      })
      this.getProductList()
    })
  },
  // 删除产品
  delProduct(){
    let _obj = {
      productid: this.data.deleteId
    }
    myRequest('delProduct', _obj).then(res => {
      this.getProductList()
      this.closeModal()
    })
  },
  // 输入input
  changeInput(e){
    // console.log('改变：', e.target.dataset.type, e.detail.value)
    this.setData({
      [e.target.dataset.type]: e.detail.value
    })
  },
  // 打开询问弹窗
  showDeleteModal(e){
    this.setData({
      modalName: e.currentTarget.dataset.target,
      deleteId: e.target.dataset.id
    })
  },
  // 关闭弹窗
  closeModal(){
    this.setData({
      modalName: '',
      deleteId: '',
    })
  },
})
