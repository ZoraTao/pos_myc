<template>
<section class=" content_box">
    <div class="am-bg-white cashier_box">
        <ul class="cashier_tab">
            <li v-for="item in tabs" :key="item.value" :class="{'on':item.checked}" @click="changeTab(item)">{{item.value}}</li>
        </ul>
        <ul class="clearfix cashier_top">
            <li class="fn-left">
                <span class="member">零售单号&nbsp;:&nbsp;</span>
                <input type="text" class="cashier_input"  v-model="searchForm.orderNo"/>
            </li>
            <li class="fn-left">
                <span class="member">会员&nbsp;:&nbsp;</span>
                <input type="text" class="cashier_input" v-model="searchForm.name"/>
            </li>

            <li class="fn-left">
                <button class="find_btn" @click="nub=1;getOrderList()">查询</button>
            </li>
        </ul>
        <div class="content am-bg-white" v-if="srcNum==='1'">

          <div class="orders">
            <table class="orders_table">
              <thead>
              <tr>
                <th width="">商品编码</th>
                <th width="">商品名称</th>
                <th width="">有效期</th>
                <th width="">批号</th>
                <th width="">批次码</th>
                <th width="">出货仓库</th>
                <th width="">库存</th>
                <th width="">购买数量</th>
                <th width="">已出库数量</th>
                <th width="120px">本次取件数量</th>
                <th width="100px"></th>
                <th width=""></th>
              </tr>
              </thead>

              <tbody class="orders_tbody" v-for="order in orderTempList" :key="order.orderId">
              <tr class="order_header">
                <td colspan="12">
                  <div class=" fn-left">
                    <span class="am-bg-blue icon"  v-show="order.orderType=='1'">定</span>
                    <span class="order_id">{{order.orderNo}}</span>
                    <span class="msg">&nbsp; &nbsp;会员： <strong>{{order.name}}</strong>&nbsp;&nbsp;{{order.telphone}}</span>
                  </div>
                  <div class=" fn-right">
                    <span class="msg">销售&nbsp;&nbsp;</span>
                    <span class="msg">{{order.userName}}：&nbsp;&nbsp;{{order.orderTime}}</span>
                  </div>

                </td>
              </tr>
              <tr v-for="(list,index) in order.orderItems" :key="list.name" :class="{'opacity50':list.status=='6'}">
                <td>{{list.itemNo}}</td>
                <td>{{list.itemName||'商品名'}}</td>
                <td></td>
                <td></td>
                <td></td>
                <td>{{list.warehouseName}}</td>
                <td></td>
                <td>{{parseInt(list.quantity)}}</td>
                <td></td>
                <td v-if="list.status!='6'">
                  <input class="pickInput" type="number" min="0" value="1" :disabled="!list.checked" v-model="list.getProNum"/>&nbsp;&nbsp;&nbsp;
                </td>
                <td v-else>
                  <span >{{list.receiveTime}}</span>
                </td>
                <td v-if="list.status!='6'">
                  <el-checkbox v-model="list.checked" @change="allChecked(order,list)"></el-checkbox>
                </td>
                <td v-else>
                  <span>已取</span>
                </td>
                <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td">
                  <el-button type="primary" @click="getPro(order,list)">取件</el-button>
                </td>
              </tr>
              <div class="gekai"> </div>
              </tbody>
            </table>
          </div>
        </div>
        <div class="content am_bg_white" v-if="srcNum==='2'">
            <div class="orders">
            <el-table
                :data="orderTempList"
                size="small"
                align="left"
                style="width: 100%;margin-bottom:10px;">
                <el-table-column
                label="订单号"
                width="400">
                <template slot-scope="scope">
                    <!-- <span v-if="scope.row.statusCode=='3'" class="am-bg-blue icon">定</span>
                    <span v-if="scope.row.statusCode=='4'" class="am-bg-orange icon">欠</span>
                    <span v-if="scope.row.statusCode=='10'" class="am-bg-red icon">退</span>
                    <span class="order_id"> <a href="javascript:;">{{scope.row.orderNo}}</a></span>
                    <span v-if="scope.row.source=='0'" class="sign_blue">本店签批</span>
                    <span v-else class="sign_orange">跨店签批</span> -->
                    <span class="order_id"> <a href="javascript:;">{{scope.row.orderNo}}</a></span>
                </template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="会员姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="telphone"
                label="会员手机号">
                </el-table-column>
                <el-table-column
                prop="moneyPaid"
                label="金额">
                <template slot-scope="scope">
                    <span class="am-ft-bold">{{scope.row.moneyAmount}}</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="orderTime"
                width="160"
                label="下单时间">
                </el-table-column>
                <el-table-column
                prop="shopName"
                label="销售门店">
                </el-table-column>
                <el-table-column
                prop="statusName"
                label="状态">
                <template slot-scope="scope">
                    <span
                    :class="{'am-ft-aa': scope.row.statusCode==='3'||scope.row.statusCode==='6','am-ft-orange':scope.row.statusCode==='4'||scope.row.statusCode==='5','am-ft-red': scope.row.statusCode==='10'}">{{scope.row.statusName}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <span class="am-ft-blue" @click="toOrderDetail(scope.row)">查看详情</span>
                </template>
                </el-table-column>
            </el-table>
            </div>
        </div>
        <el-pagination
        class="am-ft-right"
        background
        layout="prev, pager, next"
        :page-size="15"
        :total="count"
        @current-change="getOrderList"
        :current-page.sync="nub">
        </el-pagination>
    </div>
    <el-dialog custom-class="noheader" title="" :visible.sync="showModal">
        <div class="modal-content print-frame">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/print.png" />
            <span>该订单已完成收银，开始打印取货单...</span>
        </div>
    </el-dialog>
</section>
</template>

<script>

export default {
  name: 'PickUpList',
  data () {
    return {
        showModal:false,
        nub: 1,
        size: 15,
        count:0,
        searchForm: {
            orderNo: "",
            name: "",
            status:""
        },
        orderTempList: [],
        srcNum:'1',
        tabs:[{
            'value':'取件',
            'checked':true,
            'srcNum':'1',
            'status':"57"
        },
        {
            'value':'全部',
            'checked':false,
            'srcNum':'2',
            'status':"6,57"
        }],
        data : [
        {
            'id'    : '20170909000000001',
            'name'   : '张三',
            'telephone'    : 15757179646,
            'price':'860.60',
            'time': '2017-12-14 12:26:26',
            'salesStore':  '毛源昌建国北路店',
            'status': '代收银',
            "type":"1"
        }]
    }
  },
  methods:{
    allChecked(order,list){
        if(order.isFirst!=false){
            order.orderItems.forEach(function(element){
                element.getProNum=element.quantity
                if(element.checked!=list.checked){
                    element.checked=true;
                }
            })
        order.isFirst=false;
        }else{
            console.log(list)
            console.log(list.checked)
        }
    },
    toOrderDetail(data){
      let _this = this;
      _this.$router.push({path:'/cashier/orderDetail',query:{orderId:data.orderId}})
    },
    getPro:function(value){
        var _this=this;
        var jsonObject={
            orderId:value.orderId,
            orderItemsList:[]
        };
        value.orderItems.forEach(function(element){
            if(element.status!='6'){
                if(element.checked){
                    jsonObject.orderItemsList.push({
                        orderItemId:element.orderItemId,
                        pickupQuantity:element.getProNum
                    })
                }else{
                    jsonObject.orderItemsList.push({
                        orderItemId:element.orderItemId,
                        pickupQuantity:'0'
                    })
                }
            }
        })
        _this.$axios({
            url: "http://myc.qineasy.cn/pos-api/orderTemp/updatePickupStatus",
            method: "post",
            params: {
              jsonObject: jsonObject,
              keyParams: {
                weChat: true,
                userId: JSON.parse(localStorage.getItem("userData")).userId,
                orgId: JSON.parse(localStorage.getItem("userData")).orgId,
              }
            }
          })
          .then(function(res) {
            if(res.data.code == 1){
                _this.showModal=true;
                setTimeout(() => {
                    _this.showModal=false;
                    _this.getOrderList();
                }, 1000);
            }else{
               _this.$message({
                showClose: true,
                message: '请求数据失败，请联系管理员',
                type: 'error'
              })
            }
          })
          .catch(function(error) {
            console.info(error);
          });
    },
    changeTab:function(item){
        this.srcNum=item.srcNum;
        this.tabs.forEach(function(element){
            element.checked=false;
            if(element==item){
                element.checked=true;
            }
        })
        this.getOrderList();
    },
    showModalMiddle:function(){
        this.showCashier=true;
    },
    //获取列表
    getOrderList: function() {
      var _this = this;
      let status;
      _this.tabs.forEach(function(element){
          if(element.checked==true){
            _this.searchForm.status = element.status;
          }
      })
      setTimeout(() => {
        _this.$axios({
            url: "http://myc.qineasy.cn/pos-api/orderTemp/getOrderTempList",
            method: "post",
            params: {
              jsonObject: {
                orderNo: _this.searchForm.orderNo,
                name: _this.searchForm.name,
                status:_this.searchForm.status,
                nub: _this.nub == 1 ? 0 : (_this.nub - 1) * _this.size,
                size: _this.size
              },
              keyParams: {
                weChat: true
              }
            }
          })
          .then(function(res) {
            if(res.data.code == 1){
              _this.count = res.data.data.count;
              _this.orderTempList = [];
              res.data.data.orderTempList.forEach(function(element){
                  element.orderItems.forEach(function(ele){
                      ele.checked=false
                  })
              })
              _this.orderTempList = res.data.data.orderTempList;
            }else{
               _this.$message({
                showClose: true,
                message: '请求数据失败，请联系管理员',
                type: 'error'
              })
            }
          })
          .catch(function(error) {
            console.info(error);
          });
      }, 100);
    }
  },
  created:function(){
      this.getOrderList();
  },
  components:{
  }
}
</script>

<style scoped lang="scss">
@import "../../../../reset";
.content_box{
    height: calc(100% - 100px);
}
.cashier_box {
    width: 100%;
    height: 100%;
}

.cashier_tab {
    height: 40px;
    width: 100%;
    background: #f4f4f4;
}

.cashier_tab li {
    width: 95px;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    font-weight: bold;
    float: left;
    text-align: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
    /* box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.05); */
}

.cashier_tab li.on {
    background: #fff;
    color: #00AFE4;
}

.content {
    width: 100%;
    height: calc(100% - 70px);
    min-width: 360px;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #fff;
}

.cashier_input {
    background: #F8F8F8;
    border: 1px solid #E1E1E1;
    padding: 2px 10px;
    height: 30px;
}

.cashier_top {
    height: 70px;
    padding-top: 20px;
}

.cashier_top li {
    margin-left: 30px;
}

.find_btn {
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 28px;
    border: 1px solid #00AFE4;
    border-radius: 4px;
    color: #00AFE4;
    text-align: center;
    background: #fff;
}

.orders {
    padding: 9px;
}

.orders_table {
    width: 100%;
}

.orders_table thead tr {
    height: 40px;
}

.orders_table thead tr th {
    background: #F4F4F4;
    font-weight: bold;
    color: #555555;
    text-align: center;
    font-size: 12px;
    padding: 0 2px;
    line-height: 40px;
    border-bottom: 10px solid #fff;
    white-space: nowrap;
}

.orders_table tr td {
    padding: 11px;
    text-align: center;
    font-size: 13px;
    color: #333333;
    letter-spacing: 0;
}

.orders_table tr td:nth-child(1) {
    text-align: left;
}
.orders_table tr td:nth-child(2) {
    text-align: left;
}

.orders_table tr td:nth-child(6) {
    min-width: 90px;
}

.orders_table tr td:nth-child(8) {
    min-width: 55px;
}

.orders_table tr td:nth-child(9) {
    min-width: 65px;
}

.orders_table tr td:nth-child(10) {
    min-width: 190px;
}

.orders_tbody .order_header {
    background: #B3E3F6 !important;
    border-top: none;
    border-bottom: none;
    text-align: left;
}

.orders_table .order_header .order_id {
    font-size: 16px;
    color: #555555;
    letter-spacing: 0;
    font-weight: bold;
}

.icon {
    padding: 2px 5px;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
}

.order_header .msg {
    font-size: 12px;
    color: #555555;
}

.orders_tbody tr {
    /* display: inline-block; */
    height: 40px;
    line-height: 18px;
    border: 1px solid #E1E1E1;
}

.orders_tbody tr:nth-child(2n-1) {
    background: rgba(246, 246, 246, 0.50);
}

.orders_tbody .rowspan_td {
    border: 1px solid #E1E1E1;
    font-size: 12px;
    line-height: 24px;
}

.orders_tbody .rowspan_td button {
    font-size: 14px;
    font-weight: bold;
}

.orders_tbody .rowspan_td div {
    color: #666666;
}

.orders_tbody .rowspan_td strong {
    color: #000;
}

.orders_tbody .rowspan_td .priceAll {
    font-weight: bold;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
}

.gekai {
    height: 15px;
    width: 100%;
}


/* 全部 */


.opacity50 {
    opacity: 0.5 !important;
}

.pickInput {
    background: #F8F8F8;
    border: 1px solid #00AFE4;
    width: 69px;
    height: 26px;
    text-align: center;
    padding: 0 5px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}

.print-frame {
    padding: 40px 0;
    font-size: 14px;
    color: #666666;
    width: 400px;
    text-align: center;
    margin: 0 auto;
}

.print-frame img {
    margin-left: 20px;
    margin-right: 10px;
    vertical-align: middle;
}

.print-frame span {
    font-size: 14px;
    color: #666666;
}
</style>
