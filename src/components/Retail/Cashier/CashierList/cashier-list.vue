<template>
  <section class=" content_box">
    <div class="am_bg_white cashier_box">
      <ul class="cashier_tab">
        <li v-for="item of tabs" :key="item.value" :class="{'on':item.isActived}" v-on:click="changeTab(item);getOrderList(item.status,true)">
          {{item.value}}
        </li>
      </ul>
      <!--search-->
      <div class="search-top">
        <el-form :model="searchForm" ref="searchForm" status-icon label-width="75px">
        <ul class="clearfix cashier_top">
          <li class="fn-left">
            <el-form-item label="零售单号：" prop="orderNum">
              <el-input v-model="searchForm.orderNo" placeholder="请输入零售单号" style="min-width: 100px" @keyup.enter.native="getOrderList(status)"/>
            </el-form-item>
          </li>
          <li class="fn-left">
            <el-form-item label="会员：" >
              <!-- <el-autocomplete
                class="inline-input"
                v-model="state2"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
              ></el-autocomplete> 输入建议 -->
              <el-input v-model="searchForm.name" placeholder="请输入" @keyup.enter.native="getOrderList(status)"  style="min-width: 80px"></el-input>
            </el-form-item>
          </li>

          <li class="fn-left">
            <el-form-item label="订单类型：" prop="orderType">
              <el-select prop="adr.district" v-model="searchForm.orderType" placeholder="请选择"
                         style="width:120px;">
                <el-option label="普通订单" value="0"></el-option>
                <el-option label="定做单" value="1"></el-option>
              </el-select>
            </el-form-item>
          </li>
          <li class="fn-left">
            <el-form-item
              label="零售时间："
              prop="birthday">
              <div class="fn-line-block">
                <el-date-picker
                    :picker-options="pickerOptions0"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="开始日期"
                    v-model="searchForm.saleTimeStart"
                    style="width: 120px;"></el-date-picker>
              </div>
              <div class="fn-line-block am-ft-center">-</div>
              <div class="fn-line-block">
                <el-date-picker
                    :picker-options="pickerOptions0"
                    :default-value="defaultValue"
                    type="date"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="结束日期"
                    v-model="searchForm.saleTimeEnd"
                    style="width: 120px;"></el-date-picker>
              </div>
            </el-form-item>
          </li>
          <li class="fn-left">
            <el-button type="primary" plain class="find_btn" @click="getOrderList(status)">查询</el-button>
          </li>
        </ul>
        </el-form>
      </div>

      <!-- 代收银 -->
      <div class="content am_bg_white" v-if="srcNum==='1'">
        <div class="orders">
          <table class="orders_table">
            <thead>
            <tr>
              <th width="">商品编码</th>
              <th width="">商品名称</th>
              <th width="">数量</th>
              <th width="">原单价</th>
              <th width="">实售单价</th>
              <th width="">出货仓库</th>
              <th width="">订单金额</th>
              <th width="">订单状态</th>
              <th width="">操作</th>
            </tr>
            </thead>

            <tbody class="orders_tbody" v-loading="!orderTempList" v-for="order in orderTempList" :key="order.orderId">
            <tr class="order_header">
              <td colspan="9">
                <div class="fn-left">
                  <!-- <span v-if="order.statusCode=='3'" class="am-bg-blue icon">定</span>
                  <span v-if="order.statusCode=='4'" class="am-bg-orange icon">欠</span> -->
                  <span class="order_id">{{order.orderId}}</span>
                  <!-- <span v-if="order.source=='0'" class="sign_blue">本店签批</span> -->
                  <!-- <span v-else class="sign_orange">跨店签批</span> -->
                  <span class="msg">&nbsp; &nbsp;会员： <strong>{{order.name}}</strong>&nbsp;&nbsp;{{order.telphone != '18754923321' ? order.telphone:''}}</span>
                </div>
                <div class=" fn-right">
                  <span class="msg">销售&nbsp;&nbsp;</span>
                  <span class="msg">{{order.salesName}}&nbsp;&nbsp;&nbsp;{{order.orderTime}}</span>
                </div>
              </td>
            </tr>
            <tr v-for="(list,index) in order.orderItems" :key="list.name">
              <td>{{list.itemNo||'--'}}</td>
              <td>{{list.itemName}}<span class="customText" v-if="list.orderReceiptId">定做单号：{{list.orderReceiptId}}</span></td>
              <td>{{parseInt(list.quantity)||'--'}}</td>
              <td>{{parseFloat(list.price)||(list.productMold == '2'?'--':'0')}}</td>
              <td>
                <strong>{{parseFloat(list.money)||(list.productMold == '3'?parseFloat(order.extraMoney):(list.productMold == '2'?'--':'0'))}}</strong>
              </td>
              <td>{{order.shopName}}</td>
              <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td order_price">
                <div class="order_price_box">
                  <div  class="priceAll am-ft-22">{{parseFloat(order.moneyAmount).toFixed(2)}}</div>
                  <!-- <small v-if="order.roundOffFlag == '0' && typeof parseFloat(list.discountRate) == 'number' && parseFloat(list.discountRate) < 10 ">({{parseFloat(list.discountRate)}}折)</small> -->
                  <div>商品合计：
                    <strong>{{parseFloat(order.moneyProduct).toFixed(2)}}</strong>
                  </div>
                  <div v-show="order.couponMoney>0">卡券：<strong>-{{parseFloat(order.couponMoney)>0?parseFloat(order.couponMoney).toFixed(2):'0.00'}}</strong></div>
                  <div v-show="order.discountMoney>0">折扣：<strong>-{{order.discountMoney}}</strong></div>
                  <div v-show="order.activityMoney>0">活动：-<strong>{{parseFloat(order.activityMoney).toFixed(2)}}</strong></div>
                </div>
              </td>
              <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td">
                <div class="am-ft-orange">{{order.statusName == '记账' ? '待付款' : order.statusName}}</div>
                <div class="look_d" @click="toOrderDetail(order)">查看详情</div>
              </td>
              <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td">
                <div class="am-ft-orange priceAll am-ft-22 mgb10">{{(parseFloat(order.moneyAmount)-parseFloat(order.moneyPaid)).toFixed(2)}} </div>
                <div class="button">
                  <el-button type="primary" v-on:click="changePay(order)" >收银</el-button>
                </div>
               <a href="javascript:;" class="fn-block mgt5" @click="againOrder(false,order)">重新开单</a>
               <a href="javascript:;" class="am-ft-gray9 fn-block" @click="closeOrder(order,false)">关闭订单</a>
              </td>
            </tr>
            <div class="gekai"></div>
            </tbody>
          </table>
          <el-pagination
            class="am-ft-right"
            background
            layout="prev, pager, next"
            :page-size="5"
            :total="Number(count)"
            @current-change="getOrderList(3)"
            :current-page.sync="nub">
          </el-pagination>
        </div>
      </div>

      <!-- 欠还款 -->
      <div class="content am_bg_white" v-if="srcNum==='2'">
        <div class="orders">
          <table class="orders_table">
            <thead>
            <tr>
              <th>商品编码</th>
              <th>商品名称</th>
              <th>数量</th>
              <th>原单价</th>
              <th>实售单价</th>
              <th>出货仓库</th>
              <th>订单金额</th>
              <th>订单状态</th>
              <th>操作</th>
            </tr>
            </thead>
            <tbody class="orders_tbody" v-for="order in orderTempList" :key="order.orderId">
                <tr class="order_header">
                  <td colspan="9">
                    <div class="fn-left">
                      <!-- <span v-if="order.statusCode=='3'" class="am-bg-blue icon">定</span>
                      <span v-if="order.statusCode=='4'" class="am-bg-orange icon">欠</span> -->
                      <span class="order_id">{{order.orderNo}}</span>
                      <!-- <span v-if="order.source=='0'" class="sign_blue">本店签批</span> -->
                      <!-- <span v-else class="sign_orange">跨店签批</span> -->
                      <span class="msg">&nbsp; &nbsp;会员： <strong>{{order.name}}</strong>&nbsp;&nbsp;{{order.telphone != '18754923321' ? order.telphone:''}}</span>
                    </div>
                    <div class=" fn-right">
                      <span class="msg">销售：&nbsp;</span>
                      <span class="msg">{{order.salesName}}&nbsp;&nbsp;&nbsp;{{order.orderTime}}</span>
                    </div>
                  </td>
                </tr>
                <tr   v-for="(list,index) in order.orderItems" :key="list.name">
                  <td>{{list.itemNo||'--'}}</td>
                  <td>{{list.itemName||'商品名'}}</td>
                  <td>{{parseInt(list.quantity)||'1'}}</td>
                  <td>{{parseFloat(list.listPrice)||(list.productMold == '2'?'--':'0')}}</td>
                  <td>
                    <strong>{{parseFloat(list.money)||(list.productMold == '3'?parseFloat(order.extraMoney):(list.productMold == '2'?'--':'0'))}}</strong>
                  </td>
                  <td>{{order.shopName}}</td>
                  <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td order_price">
                    <div class="order_price_box">
                      <div class="priceAll">{{parseFloat(order.moneyAmount).toFixed(2)}}</div>
                        <!-- <small v-if="order.roundOffFlag == '0' && typeof parseFloat(list.discountRate) == 'number' && parseFloat(list.discountRate) < 10 ">({{parseFloat(list.discountRate)}}折)</small> -->
                      <div>商品合计：
                        <strong>{{parseFloat(order.moneyProduct).toFixed(2)}}</strong>
                        </div>
                      <div v-show="order.couponMoney>0">卡券：<strong>{{parseFloat(order.couponMoney)>0?parseFloat(order.couponMoney).toFixed(2):'0.00'}}</strong></div>
                  <div v-show="order.discountMoney>0">折扣：<strong>{{order.discountMoney}}</strong></div>
                  <div v-show="order.activityMoney>0">活动：<strong>{{parseFloat(order.activityMoney)>0?parseFloat(order.activityMoney).toFixed(2):'0.00'}}</strong></div>
                      <div class=" am-ft-16">已收:<strong>{{parseFloat(order.moneyPaid)>0?parseFloat(order.moneyPaid).toFixed(2):'0.00'}}</strong></div>
                    </div>
                  </td>
                  <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td">
                    <div class="am-ft-red">
                        {{order.statusName}}
                    </div>
                    <div class="look_d" @click="toOrderDetail(order)">查看详情</div>
                  </td>
                  <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td">
                    <div class="am-ft-orange priceAll">{{(parseFloat(order.moneyAmount)-parseFloat(order.moneyPaid)).toFixed(2)}}</div>
                    <div class="button">
                      <el-button type="primary" v-on:click="changePay(order)">收银</el-button>
                    </div>
                  </td>
                </tr>
                <div class="gekai"></div>
            </tbody>
          </table>
          <el-pagination
            class="am-ft-right"
            background
            layout="prev, pager, next"
            :page-size="5"
            :total="Number(count)"
            @current-change="getOrderList(4)"
            :current-page.sync="nub">
          </el-pagination>
        </div>
      </div>
      <!-- 关闭 -->
      <div class="content am_bg_white" v-if="srcNum==='4'">
        <div class="orders">
          <table class="orders_table">
            <thead>
            <tr>
              <th width="">商品编码</th>
              <th width="">商品名称</th>
              <th width="">数量</th>
              <th width="">原单价</th>
              <th width="">实售单价</th>
              <th width="">出货仓库</th>
              <th width="">订单金额</th>
              <th width="">订单状态</th>
            </tr>
            </thead>

            <tbody class="orders_tbody" v-loading="!orderTempList" v-for="order in orderTempList" :key="order.orderId">
            <tr class="order_header">
              <td colspan="9">
                <div class="fn-left">
                  <!-- <span v-if="order.statusCode=='3'" class="am-bg-blue icon">定</span>
                  <span v-if="order.statusCode=='4'" class="am-bg-orange icon">欠</span> -->
                  <span class="order_id">{{order.orderId}}</span>
                  <!-- <span v-if="order.source=='0'" class="sign_blue">本店签批</span> -->
                  <!-- <span v-else class="sign_orange">跨店签批</span> -->
                  <span class="msg">&nbsp; &nbsp;会员： <strong>{{order.name}}</strong>&nbsp;&nbsp;{{order.telphone}}</span>
                </div>
                <div class=" fn-right">
                  <span class="msg">销售&nbsp;&nbsp;</span>
                  <span class="msg">{{order.salesName}}&nbsp;&nbsp;&nbsp;{{order.orderTime}}</span>
                </div>
              </td>
            </tr>
            <tr v-for="(list,index) in order.orderItems" :key="list.name">
              <td>{{list.itemNo||'--'}}</td>
              <td>{{list.itemName}}<span class="customText" v-if="list.orderReceiptId">定做单号：{{list.orderReceiptId}}</span></td>
              <td>{{parseInt(list.quantity)||'--'}}</td>
              <td>{{parseFloat(list.listPrice)}}</td>
              <td>
                <strong  v-if="!order.extraMoney">{{parseFloat(list.money)?parseFloat(list.money):'0'}}</strong>
                <strong v-if="order.extraMoney">{{parseFloat(list.money)}}</strong>
              </td>
              <td>{{order.shopName}}</td>
              <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td order_price">
                <div class="order_price_box">
                  <div  class="priceAll am-ft-22">{{parseFloat(order.moneyAmount).toFixed(2)}}</div>
                  <!-- <small v-if="order.roundOffFlag == '0' && typeof parseFloat(list.discountRate) == 'number' && parseFloat(list.discountRate) < 10 ">({{parseFloat(list.discountRate)}}折)</small> -->
                  <div>商品合计：
                    <strong>{{parseFloat(order.moneyProduct).toFixed(2)}}</strong>
                  </div>
                  <div v-show="order.couponMoney>0">卡券：<strong>-{{parseFloat(order.couponMoney)>0?parseFloat(order.couponMoney).toFixed(2):'0.00'}}</strong></div>
                  <div v-show="order.discountMoney>0">折扣：<strong>-{{order.discountMoney}}</strong></div>
                  <div v-show="order.activityMoney>0">活动：-<strong>{{parseFloat(order.activityMoney).toFixed(2)}}</strong></div>
                </div>
              </td>
              <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td">
                <div class="am-ft-orange">{{order.statusName}}</div>
                <div class="look_d" @click="toOrderDetail(order)">查看详情</div>
              </td>

            </tr>
            <div class="gekai"></div>
            </tbody>
          </table>
          <el-pagination
            class="am-ft-right"
            background
            layout="prev, pager, next"
            :page-size="5"
            :total="Number(count)"
            @current-change="getOrderList(7)"
            :current-page.sync="nub">
          </el-pagination>
        </div>
      </div>

      <!-- 全部 -->
      <div class="content am_bg_white" v-if="srcNum==='3'">
        <div class="orders">
          <el-table
            :data="orderTempList"
            size="small"
            align="left"
            style="width: 100%;margin-bottom:10px;">
            <el-table-column
              label="订单号"
              width="200">
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
                <span class="am-ft-bold">{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderTime"
              label="下单时间"
              width="200px">
            </el-table-column>
            <el-table-column
              prop="shopName"
              label="销售门店"
              width="150px">
            </el-table-column>
            <el-table-column
              prop="statusName"
              label="状态">
              <template slot-scope="scope">
                <span
                  :class="{'am-ft-aa': scope.row.statusCode==='3'||scope.row.statusCode==='6','am-ft-orange':scope.row.statusCode==='4'||scope.row.statusCode==='5','am-ft-red': scope.row.statusCode==='10'}">{{scope.row.statusName=='记账'?'待付款':scope.row.statusName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <span class="am-ft-blue" @click="toOrderDetail(scope.row)">查看详情</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="am-ft-right"
            background
            layout="prev, pager, next"
            :page-size="15"
            :total="Number(count)"
            @current-change="getOrderList(tabs[3].status,true)"
            :current-page.sync="nub">
          </el-pagination>
        </div>
      </div>
    </div>

    <!--收银弹窗-->
    <el-dialog title="收银" :visible.sync="showCashier">
      <CashierModal :datas="payData" :status = "status" @closePayMoney="resetPage"></CashierModal>
    </el-dialog>
    <!--打印取货单弹窗-->
    <el-dialog custom-class="noheader" title="" :visible.sync="consoleCashier">
      <div class="modal-content print-frame">
        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/print.png"/>
        <span>该订单已完成收银，开始打印取货单...</span>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="RemoveOrder"
      width="500px">
      <span class="closeContent">你确定关闭订单吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RemoveOrder = false">取 消</el-button>
        <el-button type="danger" @click="closeOrder('1',true)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="againOrderBool"
      width="500px">
      <span class="closeContent">你确定重新开单吗(重新开单后，原有优惠折扣将失效，确认此订单将删除)</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="againOrderBool = false">取 消</el-button>
        <el-button type="danger" @click="againOrder(true)">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import CashierModal from "../CashierModal/cashier-modal.vue";
import {allDate} from '../../../../utils/date.js'

export default {
  name: "CashierList",
  data() {
    return {
      searchForm: {
        orderNo: "",
        name: "",
        orderType: "",
        saleTimeStart: "",
        saleTimeEnd: "",
      },
      RemoveOrder:false,
      nub: 1,
      againOrderData:null,
      status:'3',// 当前栏 3收银  4欠还  5全部
      size: 5,
      payData: "", //收银信息
      count: "",
      showCashier: false,
      closeOrderData:null,
      consoleCashier: false,
      initAllSearch:false,
      srcNum: "1",
      againOrderBool:false,
      orderTempList: [],
      tabs: [
        {
          value: "收银",
          isActived: true,
          srcNum: "1",
          status: "3"
        },
        {
          value: "欠还款",
          isActived: false,
          srcNum: "2",
          status: "4"
        },
        {
          value: "关闭",
          isActived: false,
          srcNum: "4",
          status: "7"
        },
        {
          value: "全部",
          isActived: false,
          srcNum: "3",
          status: "'3','4','51','7'"
        },

      ],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      defaultValue: allDate.TimeToDay()
    };
  },
  created() {
    this.getOrderList(3);
  },
  methods: {
    againOrder(bool,data){
      let _this = this;
      if(!bool){
        _this.againOrderBool = true;
        _this.againOrderData = data;
      }else{
        _this.againOrderBool = false;
        _this.$myAjax({//先核销该订单
          url:'pos-api/orderTemp/updateOrderTempStatus',
          data:{
            orderId:_this.againOrderData.orderId,
            status:'11'
          },
          success:function(res){
              if(res.code == 1){
                _this.$router.push({
                name:'billing'
              ,params:{datas:_this.againOrderData}})
              }else{
                _this.$message({
                  type:'error',
                  message:'重新开单失败',
                  showClose:true
                })
              }
          },error:function(err){
             _this.$message({
                  type:'error',
                  message:'网络连接失败',
                  showClose:true
                })
          }
        })
        //  _this.$router.push({
        //         name:'billing'
        //       ,params:{datas:_this.againOrderData}})
      }
    },
    closeOrder(data,bool){
        let _this = this;
      if(!bool){
      _this.RemoveOrder = true;
      this.closeOrderData = data;
      }else{
        this.RemoveOrder = false
        _this.$myAjax({
          url:'pos-api/orderTemp/updateOrderTempStatus',
          data:{
            orderId:_this.closeOrderData.orderId,
            status:'7'
          },
          success:function(res){
              if(res.code == 1){
                _this.$message({
                  type:'success',
                  message:'关闭订单成功',
                  showClose:true
                })
                _this.closeOrderData = ''
                _this.getOrderList(_this.status);
              }else{
                console.log(res)
                _this.$message({
                  type:'error',
                  message:'关闭订单失败',
                  showClose:true
                })
              }
          },error:function(err){

          }
        })
      }
    },
    //会员搜索
    serachMember(){

    },
    changeTab: function(item) {
      this.srcNum = item.srcNum;
      this.tabs.forEach(function(element) {
        element.isActived = false;
        if (element == item) {
          element.isActived = true;
        }
      });
    },
    resetPage(){
      // 重置列表
      this.showCashier=false;
      this.getOrderList(this.status)
    },
    changePay(data) {
      this.payData = data;
      this.showCashier = true;
    },
    //开启弹窗
    openDialog() {},
    //获取列表
    getOrderList(value,bool) {
      var _this = this;
      _this.status = value;
      let status = _this.status;
      if (value == "'3','4','51','7'"){
        if(!_this.initAllSearch){
          _this.orderTempList = [];
          _this.count = 0;
          _this.initAllSearch =  true;
          return
        }
        _this.size = 15;
        if(!bool){
          _this.orderTempList = [];
          _this.count = 0;
        }
      }
      if (value == 3 || value == 4 || value == 7) {
        status = value;
        value == 3 ?_this.status = 3 : (value == 7 ? _this.status =7:_this.status = 4);
        _this.size = 5;
        if(bool){
          _this.searchForm.orderNo = '';
          _this.searchForm.name = '';
          _this.searchForm.orderType = '';
          _this.searchForm.saleTimeStart = '';
          _this.searchForm.saleTimeEnd = '';
        }
      }
      setTimeout(() => {
        _this.$axios({
            url: "http://myc.qineasy.cn/pos-api/orderTemp/getOrderTempList",
            method: "post",
            params: {
              jsonObject: {
                orderNo: _this.searchForm.orderNo,
                searchCode: _this.searchForm.name,
                orderType: _this.searchForm.orderType,
                saleTimeStart: _this.searchForm.saleTimeStart,
                saleTimeEnd: _this.searchForm.saleTimeEnd,
                nub: _this.nub == 1 ? 0 : (_this.nub - 1) * _this.size,
                size: _this.size,
                status: status
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
    },
    toOrderDetail(data){
      let _this = this;
      console.log(data.orderId)
      _this.$router.push({path:'/cashier/orderDetail',query:{orderId:data.orderId}})
    },
    searchOrder(orderId){
      let _this = this;
      setTimeout(() => {
      this.$axios({
            url: "http://myc.qineasy.cn/pos-api/orderTemp/getOrderTempList",
            method: "post",
            params: {
              jsonObject: {
                orderNo: orderId,
              },
              keyParams: {
                weChat: true
              }
            }
          })
          .then(function(res) {
            if(res.data.code == 1){
              _this.changePay(res.data.data.orderTempList[0])
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
  mounted(){
    let _this = this;
    if(_this.$route.query.orderId){
      let routerQuery = _this.$route.query.orderId;
      _this.searchOrder(routerQuery)
    }
  },
  beforeDestroy () {
    // this.$bus.off('againOrder')
},
  components: {
    CashierModal
  },
  watch:{
  }
};
</script>

<style scoped lang="scss">
@import "../../../../reset";

.search-top {
  background-color: #ffffff;
  overflow: hidden;
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
  font-size: 15px;
  line-height: 40px;
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
  color: #00afe4;
}

.content {
  width: 100%;
  height: calc(100% - 70px);
  min-width: 360px;
  overflow-x: hidden;
  overflow-y: scroll;
  background: #fff;
}
.closeContent{
  text-align: center;
  padding: 40px 0;
  display: block;
}
.cashier_input {
  background: #f8f8f8;
  border: 1px solid #e1e1e1;
  padding: 2px 10px;
  height: 30px;
}

.cashier_top {
  height: 70px;
  padding-top: 20px;
}

.find_btn {
  margin: 7px 0 0 15px;
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
  background: #f4f4f4;
  font-weight: bold;
  color: #555555;
  text-align: center;
  font-size: 12px;
  padding: 0 2px;
  line-height: 40px;
  border-bottom: 10px solid #fff;
}

.orders_table tr td {
  padding: 11px;
  text-align: center;
  font-size: 13px;
  color: #333333;
  letter-spacing: 0;
}

.orders_table tr td:nth-child(2) {
  text-align: left;
}

.orders_table tr td:nth-child(2) .td_msg {
  max-width: 350px;
}

.orders_tbody .order_header {
  background: #fff4e5 !important;
  text-align: left;
  border-top: none;
  border-bottom: none;
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
  border: 1px solid #e1e1e1;
}

.orders_tbody tr:nth-child(2n-1) {
  background: rgba(246, 246, 246, 0.5);
}

.orders_tbody .rowspan_td {
  border: 1px solid #e1e1e1;
  font-size: 12px;
  line-height: 24px;
  &:not(:last-child) {
    border-right: none;
  }
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
  small {
    font-size: 12px;
  }
}

.gekai {
  height: 15px;
  width: 100%;
}

.look_d {
  cursor: pointer;
}

.sign_orange {
  border: 1px solid #ff6600;
  border-radius: 0 10px 10px 0;
  padding: 0 15px 0 5px;
}

.sign_blue {
  border: 1px solid #00afe4;
  border-radius: 0 10px 10px 0;
  padding: 0 15px 0 5px;
}

.order_price {
  max-width: 130px;
}

.order_price_box {
  margin: 0 auto;
  text-align: left;
  padding: 0 10px;
}

.fixd5Iblock {
  display: inline-block;
  margin-top: 5px;
}

/* 全部 */

.orderList_table tbody tr:nth-child(2n) {
  background: rgba(246, 246, 246, 0.5);
}

/*打印小票*/

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

.modal-content {
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.modal-body {
  padding: 0;
}

.height30 {
  line-height: 30px;
}
.customText{
  cursor: pointer;
  color:#00afe4;
}
</style>
