import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

let store = new Vuex.Store({
  // 在state里面定义我们全局共享的数据
  // state唯一公共数据源
  // 组件中通过 this.$state.state.全局数据名称  来访问state中的数据
  state: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) : {
    goodsList: [],
    //  购物车初始数据为空
    carPanelData: [],
    //  收货信息
    receiveInfo: [{
      'name': '王某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际西6号楼319室',
      'default': true,
      'checked': true
    }, {
      'name': '李某某',
      'phone': '13811111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 110000,
      'province': '北京市',
      'cityId': 110100,
      'city': '市辖区',
      'countyId': 110106,
      'county': '海淀区',
      'add': '上地十街辉煌国际东6号楼350室',
      'default': false,
      'checked': false
    }],
    //  
    provisionalOrder: [],
    //  订单数据
    orderData: [],
    //  提示框的最大数量
    maxOff: false,
    //  购物车默认是否显示
    carShow: false,
    //  是否登录
    isLogin: true,
    //  登录状态
    loginStatus: {},
    //  
    ball: {
      show: false,
      el: null,
      img: ''
    },
    // 轮播图显示的图片
    formPage: "",
    myImage:[]
  },
  //  对state中的数据做处理，然后返回新的数据，不对state中的数据造成影响
  getters: {
    // 返回购物车的总数
    totleCount(state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        count += goods.count;
      })
      return count
    },
    // 返回购物车的总价格
    totlePrice(state) {
      let total = 0
      state.carPanelData.forEach((goods) => {
        total += goods.goods_price * goods.count
      })
      return total
    },
    // 选中的数量
    checkedCount(state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked)
          count += goods.count;
      })
      return count
    },
    // 选中的价格
    checkedPrice(state) {
      let total = 0
      state.carPanelData.forEach((goods) => {
        if (goods.checked)
          total += goods.goods_price * goods.count
      })
      return total
    },
    // 购物车中显示商品的数据
    checkedCarPanelData(state) {
      let checkedCarPanelData = []
      // 如果有被选中的，就push进去
      state.carPanelData.forEach((goods) => {
        if (goods.checked)
          checkedCarPanelData.push(goods);
      })
      return checkedCarPanelData
    },
    // getter里的只计算，不改变元数据
    // 这个是全选的判定
    allChecked(state) {
      let allChecked = true
      state.carPanelData.forEach((goods) => {
        // 遍历所有的商品，如果有没选中的，就不改变图片，
        if (!goods.checked) {
          allChecked = false
          return
        }
      })
      // 如果都选中了，就变成蓝色的按钮
      return allChecked
    },
    maxCount(state) {
      let maxOff = false
      state.carPanelData.forEach((goods) => {
        if (goods.count > goods.is_deal) {
          goods.count--
        }
      })
      return maxOff
    }
  },
  //  集中管理数据操作
  mutations: {
    // 加到购物车的数据
    addCarPanelData(state, data) {
      let bOff = true
      state.carPanelData.forEach((goods) => {
        if (goods.goods_id === data[0].goods_id) {
          goods.count += data[1]
          if (goods.count > goods.is_deal) {
            goods.count -= data[1]
            state.maxOff = true
            bOff = false
            return
          }
          state.ball.el = event.path[0]
          state.ball.show = true
          state.ball.img = data[0].goods_image
          bOff = false
          state.carShow = true
        }
      })
      if (bOff) {
        let goodsData = data[0]
        Vue.set(goodsData, 'count', data[1])
        Vue.set(goodsData, 'checked', true)
        // 加入购物车
        state.carPanelData.push(goodsData)
        //  显示购物车
        state.carShow = true
        state.ball.el = event.path[0]
        state.ball.show = true
        state.ball.img = data[0].goods_image
      }
    },
    plusCarPanelData(state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.goods_id === id) {
          if (goods.count === goods.id_deal) return
          goods.count++
          return
        }
      })
    },
    subCarPanelData(state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.goods_id === id) {
          if (goods.count === 1) return
          goods.count--
          return
        }
      })
    },
    // 删除购物车的数据
    delCarPanelData(state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.goods_id === id) {
          // 如果是这个id的话，就从购物车中删掉它
          state.carPanelData.splice(index, 1)
          return
        }
      })
    },
    // 选中和取消选中的操作， true = ！false
    checkGoods(state, id) {
      state.carPanelData.forEach((goods, index) => {
        if (goods.goods_id === id) {
          goods.checked = !goods.checked
        }
      })
    },
    // 全选按钮，全部选择购物车中的商品
    allGoodsCheck(state, checked) {
      // 如果是选中的
      if (checked) {
        // 就不选
        state.carPanelData.forEach((goods, index) => {
          goods.checked = false
        })
      } else {
        // 如果是不选中的，就让他选中
        state.carPanelData.forEach((goods, index) => {
          goods.checked = true
        })
      }
    },
    // 删除选中的商品
    delCheckGoods(state) {
      // 数量减一
      let i = state.carPanelData.length
      while (i--) {
        if (state.carPanelData[i].checked) {

          state.carPanelData.splice(i, 1)
        }
      }
    },
    // 提交订单
    submitOrder(state, data) {
      let i = state.carPanelData.length
      while (i--) {
        // 在购物车清零的时候上传
        if (state.carPanelData[i].checked) {
          console.log("在store的订单商品上传函数了");
          console.log(state.carPanelData[i])
          var id= state.carPanelData[i].goods_id
          console.log(id)
          var name= state.carPanelData[i].goods_name
          var image =  state.carPanelData[i].goods_image
          console.log(name)
          var number= state.carPanelData[i].count
          console.log(number)
          var price= state.carPanelData[i].goods_price
          console.log(price)
          // 上传每一件商品
          setTimeout(()=>{
            axios({
              url: "/api/saveOne",
              method: 'get',
              params: {
                order_id: data.orderId,
                user_account:state.loginStatus.user_account,
                goods_id: id,
                goods_name: name,
                goods_image: image,
                goods_number: number,
                goods_price: price,
              }
            }).then(res => {
              console.log("输出一下返回的结果");
              console.log(res)
            })
          },1000)
          state.carPanelData.splice(i, 1)
        }
      }
      // 在这个订单总数组开头添加一个订单
      state.orderData.unshift(data)
      // 遍历，把当前选择的收获信息，搞成默认的，记住上次的收获选项
      state.receiveInfo.forEach((receive) => {
        receive.checked = receive.default
      })

    },
    // 现在支付
    payNow(state, id) {
      setTimeout(() => {
        state.orderData.forEach((order, index) => {
          if (order.orderId === id) {
            order.isPay = false
            // 打开阿里支付页面
            axios({
              url: "/api/getPagePay",
              method: "get",
              params: {
                order_id: order.orderId,
                order_price: order.price,
                order_info: order.invoiceTitle
              }
            }).then(res => {
              console.log(1)
              console.log(res)
              console.log(2)
              console.log(res.data)
              console.log(3)
              if (res.status == 200) {
                console.log(4)
                order.isPay = true
                state.formPage = res.data.pay

                return
              } else {
                console.log(5)
                alert("订单支付失败")
                order.isPay = false
                return
              }

            })
            order.isPay = false
            return
          }
        })

      }, 1000)
    },
    // 显示提示框的函数
    alertPrompt(state) {
      state.maxOff = true
    },
    closePrompt(state) {
      state.maxOff = false
    },
    closeLogin(state) {
      state.isLogin = false
    },
    showCar(state) {
      state.carShow = true
    },
    hideCar(state) {
      state.carShow = false
    },
    // 检车是否默认地址 ，传入的是state对象和数据
    checkDefault(state, data) {
      state.receiveInfo.forEach((receive, index) => {
        // 如果传入的数据与遍历的一样，就设置为默认地址
        if (receive == data) {
          receive.default = true
          // state.receiveInfo.unshift(state.receiveInfo.splice(index,1)[0])
        } else {
          receive.default = false
        }
      })
    },
    checkOut(state, data) {
      state.provisionalOrder = data
    },
    // 提交修改地址的表单
    submitReceive(state, data) {
      // 如果是默认地址的话，就设置这两个参数为
      if (data[0].default) {
        state.receiveInfo.forEach((receive, index) => {
          receive.default = false
          receive.checked = false
        })
        //      state.receiveInfo.unshift(data)
        //      return
      }
      if (data[1] == null) {
        state.receiveInfo.push(data[0])
      } else {
        console.log(data[0])
        state.receiveInfo[data[1]] = data[0]
      }
    },

  },
  actions: {

  }
})

export default store
