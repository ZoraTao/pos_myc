<template>
  <section class=" content_box">
    <div class="am-bg-white cashier_box">
      <ul class="cashier_tab">
        <li v-for="item in tabs" :key="item.value" :class="{'on':item.isActived}" @click="changeTab(item)">
          {{item.value}}
        </li>
      </ul>
      <ul class="clearfix cashier_top">
        <li class="fn-left">
          <span class="member">零售单号&nbsp;:&nbsp;</span>
          <input type="text" class="cashier_input" v-model="searchForm.orderNo"/>
        </li>
        <li class="fn-left">
          <span class="member">会员&nbsp;:&nbsp;</span>
          <input type="text" class="cashier_input" v-model="searchForm.name"/>
        </li>
        <li class="fn-left">
          <span class="member">订单类型&nbsp;:&nbsp;</span>
            <el-select prop="adr.district" v-model="searchForm.orderType" placeholder="请选择"
                        style="width:120px;">
              <el-option label="普通订单" value="1"></el-option>
              <el-option label="定做单" value="2"></el-option>
            </el-select>
        </li>
        <li class="fn-left">
          <span class="member">零售时间&nbsp;:&nbsp;</span>
          <el-date-picker
            style="width:130px"
            type="date"
            v-model="searchForm.saleTimeStart"
            placeholder="选择日期">
          </el-date-picker>
          <span>-</span>
          <el-date-picker
            style="width:130px"
            type="date"
            v-model="searchForm.saleTimeEnd"
            placeholder="选择日期">
          </el-date-picker>
        </li>

        <li class="fn-left">
          <button class="find_btn" @click="nub=0;getOrderList()">查询</button>
        </li>
      </ul>
      <!-- 代发货 -->
      <div class="content am-bg-white" v-if="srcNum==='1'||srcNum==='2'">
        <div class="orders">
          <table class="orders_table">
            <thead>
            <tr>
              <th width="230px">商品编码</th>
              <th width="400px">商品名称</th>
              <th width="">数量</th>
              <th width="">原单价</th>
              <th width="">实售单价</th>
              <th width="">出货仓库</th>
              <!-- <th width="">取件时间</th> -->
              <th width="">订单金额</th>
              <th width="">订单状态</th>
              <th width="">操作</th>
            </tr>
            </thead>
            <tbody class="orders_tbody" v-for="order in orderTempList" :key="order.orderId">
            <tr class="order_header">
              <!-- <td colspan="10"> -->
              <td colspan="9">
                <div class=" img_b" style="position: absolute;top:0;left:0;" v-show="order.orderType=='1'"><img
                  src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/ding_icon.png"/></div>
                <div class=" fn-left">
                  <span class="order_id mgl30">{{order.orderNo}}</span>
                  <span class="msg">&nbsp; &nbsp;会员： <strong>{{order.name}}</strong>&nbsp;&nbsp;{{order.telphone}}</span>
                </div>
                <div class=" fn-right">
                  <span class="msg">销售&nbsp;&nbsp;</span>
                  <span class="msg">{{order.userName}}：&nbsp;&nbsp;{{order.orderTime}}</span>
                </div>

              </td>
            </tr>
            <tr v-for="(list,index) in order.orderItems" :key="list.name">
              <td>{{list.itemNo}}</td>
              <td>{{list.itemName||'商品名'}}</td>
              <td>{{parseInt(list.quantity)}}</td>
              <td>{{parseFloat(list.price)||'商品原单价'}}</td>
              <td><span class="ft_bold">{{parseFloat(list.money)}}</span></td>
              <td>{{order.shopName}}</td>
              <!-- <td>{{order.receiveTime}}</td> -->
              <td  v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td order_price">
                <div class="order_price_box">
                  <div class="priceAll">{{parseFloat(order.moneyAmount).toFixed(2)}}</div>
                  <div>商品合计：<strong>{{parseFloat(order.moneyProduct).toFixed(2)}}</strong></div>
                  <div v-show="parseFloat(order.couponMoney)!=0">卡券：<strong>{{parseFloat(order.couponMoney)>0?parseFloat(order.couponMoney).toFixed(2):'0.00'}}</strong></div>
                  <div v-show="order.discountMoney>0">折扣：<strong>{{order.discountMoney}}</strong></div>
                  <div v-show="parseFloat(order.activityMoney)!=0">活动：<strong>{{parseFloat(order.activityMoney)>0?parseFloat(order.activityMoney).toFixed(2):'0.00'}}</strong></div>
                </div>

              </td>
              <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td">
                <div class="am-ft-gray9"  v-if="srcNum==='1'">已完成</div>
                <div class="am-ft-gray9"  v-if="srcNum==='2'">退货</div>
                <div class="look_d" @click="toOrderDetail(order)">查看详情</div>
              </td>
              <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td">
                <div class="look_d am-ft-gray9">换货</div>
                <div class="look_d am-ft-gray9">申请退货</div>
                <div class="look_d am-ft-gray9">补打销售单</div>
              </td>

            </tr>
            <div class="gekai"></div>
            </tbody>
          </table>
        </div>
      </div>
      <div class="content am_bg_white" v-if="srcNum==='3'">
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
  </section>
</template>

<script>

  export default {
    name: 'ServiceAfterList',
    data() {
      return {
        searchForm: {
          orderNo: "",
          name: "",
          orderType: "",
          saleTimeStart: "",
          saleTimeEnd: "",
        },
        orderTempList: [],
        nub: 1,
        size: 15,
        count: 0,
        showModal: false,
        srcNum: '1',
        tabs: [{
          'value': '已完成',
          'isActived': true,
          'srcNum': '1',
          'status':"6"
        },
        {
          'value': '退货',
          'isActived': false,
          'srcNum': '2',
          'status':"10"
        },
        {
          'value': '全部',
          'isActived': false,
          'srcNum': '3',
          'status':"6,10"
        }],
        data: [
          {
            'id': '20170909000000001',
            'name': '张三',
            'telephone': 15757179646,
            'price': '860.60',
            'time': '2017-12-14 12:26:26',
            'salesStore': '毛源昌建国北路店',
            'status': '代收银',
            "type": "1"
          }]
      }
    },
    methods: {
      changeTab: function (item) {
        this.srcNum = item.srcNum;
        this.tabs.forEach(function (element) {
          element.isActived = false;
          if (element == item) {
            element.isActived = true;
          }
        })
        this.getOrderList();
      },
      showModalMiddle: function () {
        this.showCashier = true;
      },
      toOrderDetail(data){
        let _this = this;
        _this.$router.push({path:'/cashier/orderDetail',query:{orderId:data.orderId}})
      },
      //获取列表
      getOrderList: function() {
        var _this = this;
        let status;
        _this.tabs.forEach(function(element){
            if(element.isActived==true){
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
                  saleTimeStart: _this.searchForm.saleTimeStart,
                  saleTimeEnd: _this.searchForm.saleTimeEnd,
                  status:_this.searchForm.status,
                  orderType:_this.searchForm.orderType,
                  nub: _this.nub == 1 ? 0 : (_this.nub - 1) * _this.size,
                  size: _this.size
                },
                keyParams: {
                  weChat: true
                }
              }
            })
            .then(function(res) {
              // console.info(res.data.data)
              if(res.data.code == 1){
                _this.count = res.data.data.count;
                _this.orderTempList = [];
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
    components: {}
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

  .cashier_list_top {
    height: 70px;
    width: 100%;
    padding: 18px 20px;
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
    position: relative;
  }

  .orders_table tr td:nth-child(1) {
    text-align: left;
  }

  .orders_table tr td:nth-child(2) {
    text-align: left;
  }

  .orders_tbody .order_header {
    background: #F4F4F4 !important;
    border: 0px;
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

  .look_d {
    cursor: pointer;
  }
  .look_d:hover{
    color: #00AFE4 !important;
  }
  .sign_orange {
    border: 1px solid #FF6600;
    border-radius: 0 10px 10px 0;
    padding: 0 15px 0 5px;
  }

  .sign_blue {
    border: 1px solid #00AFE4;
    border-radius: 0 10px 10px 0;
    padding: 0 15px 0 5px;
  }

  .order_price {
    max-width: 150px;
  }

  .order_price_box {
    margin: 0 auto;
    text-align: left;
    padding: 0 10px;
  }

  /* 全部 */
  .orderList_table tbody tr:nth-child(2n) {
    background: rgba(246, 246, 246, 0.50);
  }

  /* model */

  .model-bottom {
    border-top: none;
    background: #F1F1F1;
    width: 100%;
    height: 60px;
    padding: 14px 17px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    /*border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;*/
  }

  .footerBtn {
    width: 90px;
    height: 30px;
    border: none;
    font-size: 12px;
    color: #FFFFFF;
    background: #00AFE4;
    border-radius: 4px;
  }

  .footerBtnNo {
    width: 90px;
    height: 30px;
    border: 1px solid #C7C7C7;
    font-size: 12px;
    color: #666666;
    letter-spacing: 0;
    border-radius: 4px;
  }

  :host .ant-modal-body {
    padding: 20px 30px;
  }

  .saomaHead {
    height: 46px;
    line-height: 30px;
    width: 100%;
    border-bottom: 1px dashed #E1E1E1;
  }

  .saomaHead input,
  .saomaMsgBt {
    width: 130px;
    height: 30px;
    padding: 0 10px;
    font-size: 12px;
    background: #FFFFFF;
    border: 1px solid #E1E1E1;
  }

  .saomaHead .logistics_text {
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    font-weight: bold;
  }

  .saomaMsg {
    padding: 10px 0;
  }

  .saomaMsg > div {
    margin-top: 10px;
  }

  .checkoutBt {
    line-height: 30px;
  }
</style>
