<template>
  <section class=" content_box">
    <div class="am_bg_white cashier_box">
      <ul class="cashier_tab">
        <li v-for="item of tabs" :key="item.value" :class="{'on':item.isActived}" v-on:click="changeTab(item)">
          {{item.value}}
        </li>
      </ul>
      <!--search-->
      <div class="search-top">
        <ul class="clearfix cashier_top">
          <li class="fn-left">
            <span class="member">零售单号&nbsp;:&nbsp;</span>
            <input type="text" class="cashier_input"/>
          </li>
          <li class="fn-left">
            <span class="member">会员&nbsp;:&nbsp;</span>
            <input type="text" class="cashier_input"/>
          </li>
          <li class="fn-left">
            <span class="member fixd5Iblock">订单类型&nbsp;:&nbsp;</span>
            <!-- <nz-select style="width: 60px;" [(ngModel)]="single" [nzSize]="size">
                <nz-option *ngFor="let option of options" [nzLabel]="option.label" [nzValue]="option.value" [nzDisabled]="option.disabled">
                </nz-option>
            </nz-select> -->
          </li>
          <li class="fn-left">
            <span class="member fixd5Iblock">零售时间&nbsp;:&nbsp;</span>
            <!-- <nz-datepicker [(ngModel)]="_date_start" [nzSize]="'large'" [nzPlaceHolder]="'2018-02-06'"></nz-datepicker> -->
            <span class="fixd5Iblock">-</span>
            <!-- <nz-datepicker [(ngModel)]="_date_end" [nzSize]="'large'" [nzPlaceHolder]="'2018-02-06'"></nz-datepicker> -->
          </li>
          <li class="fn-left">
            <button class="find_btn">查询</button>
          </li>
        </ul>
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

            <tbody class="orders_tbody">
            <tr class="order_header">
              <td colspan="9">
                <div class=" fn-left">
                  <span class="am-bg-blue icon">定</span>
                  <span class="order_id">20170909000000001</span>
                  <span class="msg">&nbsp; &nbsp;会员： <strong>张三</strong>&nbsp;&nbsp;15757489764</span>
                </div>
                <div class=" fn-right">
                  <span class="msg">销售&nbsp;&nbsp;</span>
                  <span class="msg">王二：&nbsp;&nbsp;2017-12-22 22:10:09</span>
                </div>

              </td>
            </tr>
            <tr>
              <td>BH00003</td>
              <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
              <td>1</td>
              <td>230.00</td>
              <td><strong>134.00</strong></td>
              <td>天一恒泰店</td>
              <td rowspan="5" class="rowspan_td order_price">
                <div class="order_price_box">
                  <div class="priceAll am-ft-22">1299.00</div>
                  <div>商品合计：<strong>1389.00</strong></div>
                  <div>卡券：<strong>-20</strong></div>
                  <div>折扣：<strong>-50</strong></div>
                  <div>活动：<strong>-20</strong></div>
                </div>

              </td>
              <td rowspan="5" class="rowspan_td">
                <div class="am-ft-orange">代收银</div>
                <div class="look_d" v-on:click="goDetail('1')">查看详情</div>
              </td>
              <td rowspan="5" class="rowspan_td">
                <div class="am-ft-orange priceAll am-ft-22 mgb10">1299.00</div>
                <div class="button">
                  <el-button type="primary" v-on:click="showModalMiddle()">收银</el-button>
                </div>
                <div class="am-ft-blue">重新开单</div>
                <div class="am-ft-gray9">关闭订单</div>

              </td>
            </tr>
            <tr>
              <td>BH00003</td>
              <td>
                <p class="td_msg">左镜片：<span class=" am-ft-blue">定做 DZ12340001</span> - 柱镜0.5 球镜0.5 下加光0.3 </p>
                <p class="td_msg">定做需求：需求内容</p>
              </td>
              <td>1</td>
              <td>230.00</td>
              <td><strong>134.00</strong></td>
              <td>天一恒泰店</td>
            </tr>
            <tr>
              <td>BH00003</td>
              <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
              <td>1</td>
              <td>230.00</td>
              <td><strong>134.00</strong></td>
              <td>天一恒泰店</td>
            </tr>
            <tr>
              <td>BH00003</td>
              <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
              <td>1</td>
              <td>230.00</td>
              <td><strong>134.00</strong></td>
              <td>天一恒泰店</td>
            </tr>
            <tr>
              <td>BH00003</td>
              <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
              <td>1</td>
              <td>230.00</td>
              <td><strong>134.00</strong></td>
              <td>天一恒泰店</td>
            </tr>
            <div class="gekai"></div>
            </tbody>
          </table>
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
            <tbody class="orders_tbody" v-for="(order, index) in orderTempList">
            <tr class="order_header">
              <td colspan="9">
                <div class=" fn-left">
                  <span v-if="order.status=='3'" class="am-bg-blue icon">定</span>
                  <span v-if="order.status=='4'" class="am-bg-orange icon">欠</span>
                  <span class="order_id">{{order.orderNo}}</span>
                  <span v-if="order.source=='0'" class="sign_blue">本店签批</span>
                  <span v-else class="sign_orange">跨店签批</span>
                  <span class="msg">&nbsp; &nbsp;会员： <strong>{{order.name}}</strong>&nbsp;&nbsp;{{order.telphone}}</span>
                </div>
                <div class=" fn-right">
                  <span class="msg">销售：&nbsp;</span>
                  <span class="msg">--&nbsp;&nbsp;&nbsp;{{order.orderTime}}</span>
                </div>
              </td>
            </tr>
            <tr v-for="(list,index) in order.orderItems">
              <td>BH00003</td>
              <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
              <td>1</td>
              <td>230.00</td>
              <td><strong>134.00</strong></td>
              <td>天一恒泰店</td>
              <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td order_price">
                <div class="order_price_box">
                  <div class="priceAll">1299.00</div>
                  <div>商品合计 :<strong>1389.00</strong></div>
                  <div>卡券：<strong>-20</strong></div>
                  <div>折扣：<strong>-50</strong></div>
                  <div>活动：<strong>-20</strong></div>
                  <div class=" am-ft-16">已收:<strong>566.00</strong></div>
                </div>
              </td>
              <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td">
                <div class="am-ft-orange">欠还款</div>
                <div class="look_d" v-on:click="goDetail('1')">查看详情</div>
              </td>
              <td v-if="index==0" :rowspan="order.orderItems.length" class="rowspan_td">
                <div class="am-ft-orange priceAll">1299.00</div>
                <div class="button">
                  <el-button type="primary" v-on:click="showModalMiddle()">收银</el-button>
                </div>
              </td>
            </tr>
            <div class="gekai"></div>
            </tbody>

            <!--<tbody class="orders_tbody">-->
            <!--<tr class="order_header">-->
              <!--<td colspan="9">-->
                <!--<div class=" fn-left">-->
                  <!--<span class="order_id">20170909000000001</span>-->
                  <!--<span class="sign_blue">本店签批</span>-->
                  <!--<span class="msg">&nbsp; &nbsp;会员： <strong>张三</strong>&nbsp;&nbsp;15757489764</span>-->
                <!--</div>-->
                <!--<div class=" fn-right">-->
                  <!--<span class="msg">销售&nbsp;&nbsp;</span>-->
                  <!--<span class="msg">王二：&nbsp;&nbsp;2017-12-22 22:10:09</span>-->
                <!--</div>-->

              <!--</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td>BH00003</td>-->
              <!--<td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>-->
              <!--<td>1</td>-->
              <!--<td>230.00</td>-->
              <!--<td><strong>134.00</strong></td>-->
              <!--<td>天一恒泰店</td>-->
              <!--<td rowspan="3" class="rowspan_td order_price">-->
                <!--<div class="order_price_box">-->
                  <!--<div class="priceAll">1299.00</div>-->
                  <!--<div>商品合计 :<strong>1389.00</strong></div>-->
                  <!--<div>卡券：<strong>-20</strong></div>-->
                  <!--<div>折扣：<strong>-50</strong></div>-->
                  <!--<div>活动：<strong>-20</strong></div>-->
                  <!--<div class=" am-ft-16">已收：<strong>566.00</strong></div>-->
                <!--</div>-->

              <!--</td>-->
              <!--<td rowspan="3" class="rowspan_td">-->
                <!--<div class="am-ft-orange">欠还款</div>-->
                <!--<div class="look_d" v-on:click="goDetail('1')">查看详情</div>-->
              <!--</td>-->
              <!--<td rowspan="3" class="rowspan_td">-->
                <!--<div class="am-ft-orange priceAll">1299.00</div>-->
                <!--<div class="button">-->
                  <!--<el-button type="primary" v-on:click="showModalMiddle()">收银</el-button>-->
                <!--</div>-->
              <!--</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td>BH00003</td>-->
              <!--<td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>-->
              <!--<td>1</td>-->
              <!--<td>230.00</td>-->
              <!--<td><strong>134.00</strong></td>-->
              <!--<td>天一恒泰店</td>-->

            <!--</tr>-->
            <!--<tr>-->
              <!--<td>BH00003</td>-->
              <!--<td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>-->
              <!--<td>1</td>-->
              <!--<td>230.00</td>-->
              <!--<td><strong>134.00</strong></td>-->
              <!--<td>天一恒泰店</td>-->
            <!--</tr>-->
            <!--<div class="gekai"></div>-->
            <!--</tbody>-->
          </table>
        </div>
      </div>

      <!-- 全部 -->
      <div class="content am_bg_white" v-if="srcNum==='3'">
        <div class="orders">
          <el-table
            :data="data"
            size="small"
            align="left"
            style="width: 100%;margin-bottom:10px;">
            <el-table-column
              prop="id"
              label="订单号"
              width="400">
              <template slot-scope="scope">
                <span class=" am-bg-blue icon">定</span>
                <span class=" am-bg-orange icon">欠</span>
                <span class=" am-bg-red icon">退</span>
                <span class="order_id">  <a>{{scope.row.id}}</a></span>
                <span class="sign_orange">跨店签批</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="会员姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="telephone"
              label="会员手机号">
            </el-table-column>
            <el-table-column
              prop="price"
              label="金额">
              <template slot-scope="scope">
                <span class="am-ft-bold">{{scope.row.price}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="time"
              label="下单时间">
            </el-table-column>
            <el-table-column
              prop="salesStore"
              label="销售门店">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
              <template slot-scope="scope">
                <span
                  :class="{'am-ft-aa': scope.row.type==='1','am-ft-orange':scope.row.type==='2','am-ft-red': scope.row.type==='3'}">{{scope.row.status}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <span class="am-ft-blue" @click="showCashier = true"><a>查看详情</a></span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="am-ft-right"
            background
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="收银" :visible.sync="showCashier">
      <CashierModal></CashierModal>
    </el-dialog>
    <el-dialog custom-class="noheader" title="" :visible.sync="showCashier">
      <div class="modal-content print-frame">
        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/print.png"/>
        <span>该订单已完成收银，开始打印取货单...</span>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import CashierModal from '../CashierModal/cashier-modal.vue'

  export default {
    name: 'CashierList',
    data() {
      return {
        showCashier: false,
        srcNum: '2',
        orderTempList: {},
        tabs: [{
          'value': '收银',
          'isActived': true,
          'srcNum': '1'
        },
          {
            'value': '欠还款',
            'isActived': false,
            'srcNum': '2'
          },
          {
            'value': '全部',
            'isActived': false,
            'srcNum': '3'
          }],
        data: [{
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
    created(){
      this.getOrderList();
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
      },
      showModalMiddle: function () {
        this.showCashier = true;
      },
      //获取列表
      getOrderList: function () {
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/orderTemp/getOrderTempList',
          method: 'post',
          params: {
            jsonObject: {},
            keyParams: {
              weChat: true
            }
          }
        })
        .then(function (response) {
          console.info(response.data.data.orderTempList)
          that.orderTempList = response.data.data.orderTempList;
        })
        .catch(function (error) {
          console.info(error)
        })
      }
    },
    components: {
      CashierModal
    }
  }
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
    background: #FFF4E5 !important;
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
    border: 1px solid #E1E1E1;
  }

  .orders_tbody tr:nth-child(2n-1) {
    background: rgba(246, 246, 246, 0.50);
  }

  .orders_tbody .rowspan_td {
    border: 1px solid #E1E1E1;
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
  }

  .gekai {
    height: 15px;
    width: 100%;
  }

  .look_d {
    cursor: pointer;
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
    background: rgba(246, 246, 246, 0.50);
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
</style>
