<template>
  <div >
  <section class="content_box"  v-if="orderData!=null">
    <div class="orderHeader">
      <div  v-if="orderData.ordertemp.orderType == 1" style="float:left;">
        <div class="ding">
      </div>
      <span class="dingText">定</span>
      </div>
      
      <div class="orderTitle" >
          <span>零售单号：{{orderData.ordertemp.orderNo}}</span> <i v-show="false">已完成</i>
      </div>
      <div class="orderMemberdDetail">
          <div>
              <span>开单时间：<i>{{orderData.ordertemp.createTime}}</i></span>
              <span>销售部门：<i>{{orderData.ordertemp.shopName}}</i></span>
              <span>&nbsp;&nbsp;销售：<i>李四</i></span>
          </div>
          <div>
              <span>会员姓名：<i>{{orderData.ordertemp.name}}</i></span>
              <span>&nbsp;&nbsp;&nbsp;手机号：<i>{{orderData.ordertemp.telphone}}</i></span>
              <span>&nbsp;&nbsp;取件：<i>{{(orderData.ordertemp.glassesTime)}}</i></span>
          </div>
      </div>
    </div>
    <div class="orderShoppingDetail">
      <h3>商品信息</h3>
      <div class="table-box" v-cloak >
        <el-table 
        :data="orderData.orderItemsList"
        :row-class-name="tableRowClassName"
        :span-method="objectSpanMethod"
        align="left"
        size="small"
        border
        style="width: 100%;">
        <el-table-column
          prop="itemId"
          label="商品编码"
          width="120px">
        </el-table-column>
        <el-table-column
          prop="itemName"
          label="商品名称">
        </el-table-column>
        <el-table-column
          label="数量"
          width="120px">
          <template slot-scope="scope">
            <strong>{{ parseFloat(scope.row.quantity)}}</strong>
          </template>
        </el-table-column>
        <el-table-column
          label="原单价"
          width="120px">
          <template slot-scope="scope">
            <strong>{{ parseFloat(scope.row.price)||'--'}}</strong>
          </template>
        </el-table-column>
        <el-table-column
          label="实售单价"
          width="120px">
          <template slot-scope="scope">
            <strong>{{ parseFloat(scope.row.money)||'--'}}</strong>
          </template>
        </el-table-column>
        <el-table-column
          prop="warehouseName"
          label="出货仓库"
          width="120px">
        </el-table-column>
         <el-table-column
          prop="receiveTime"
          label="取件时间"
          width="200px">
        </el-table-column>
        <el-table-column
          label="订单金额"
          width="260px">
          <template slot-scope="scope">
            <strong class="am-ft-22 mgb15">合计：{{orderData.ordertemp.moneyAmount}}</strong>
            <p class="am-ft-12 am-text-normal" v-show="orderData.ordertemp.couponMoney>0">卡券 :<strong class="am-ft-13">－{{orderData.ordertemp.couponMoney}}</strong></p>
            <p class="am-ft-12 am-text-normal" v-show="orderData.ordertemp.discountMoney>0">折扣 :<strong class="am-ft-13">－{{orderData.ordertemp.discountMoney}}</strong></p>
            <p class="am-ft-12 am-text-normal" v-show="orderData.ordertemp.activityMoney>0">活动 :<strong class="am-ft-13">－{{orderData.ordertemp.activityMoney}}</strong></p>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <h3 v-if="orderData.prescription">验光信息</h3>
      <div class="optometry" v-cloak v-if="orderData.prescription">
        <div class="memberMessage">
          <span>ID : <i>{{orderData.prescription.prescriptions.prescriptionId}}</i></span>
          <span>验光日期 :<i>{{orderData.prescription.prescriptions.prescriptionTime}}</i></span><br>
          <span>手机号 : <i>{{orderData.prescription.prescriptions.mobile}}</i></span>
          <span>姓名 : <i>{{orderData.prescription.prescriptions.customerName}}</i></span>
          <span>会员卡号 : <i>{{orderData.prescription.member.memberCardNo}}</i></span>
          <span>性别 : <i>{{orderData.prescription.prescriptions.sex}}</i></span>
          <span>出生年月 : <i>{{orderData.prescription.member.birthday}}</i></span>
        </div>
        <div class="optometryTable">
          <ul class="glass_combination_table">
            <li class="clearfix combination_table_list">
              <ul class="glass_table_head">
                <li class="wid80"> &nbsp;&nbsp;</li>
                <li class="w50"> &nbsp;&nbsp;</li>
                <li class="w90">SPH</li>
                <li class="w90">CYL</li>
                <li class="w90">AX</li>
                <li class="w90">VA</li>
                <li class="w90">DPD</li>
                <li class="w90">NPD</li>
                <li class="w90">HPD</li>
                <li class="w90">ADD</li>
              </ul>
              <ul>
                <li class="fn-left  msg_left">远用</li>
                <li class="fn-left glass_table_770">
                  <table>
                    <tr class="border_bottom">
                      <td class="w50">R</td>
                      <td class="w90">{{far[0].sph}}</td>
                      <td class="w90">{{far[0].cyl}}</td>
                      <td class="w90">{{far[0].ax}}</td>
                      <td class="w90">{{far[0].va}}</td>
                      <td class="w90">{{far[0].dpd}}</td>
                      <td class="w90">{{far[0].npd}}</td>
                      <td class="w90">{{far[0].hpd}}</td>
                      <td class="w90 border_left" rowspan="2">11</td>
                    </tr>
                    <tr class="dis_bg">
                      <td class="w50">L</td>
                      <td class="w90">{{far[1].sph}}</td>
                      <td class="w90">{{far[1].cyl}}</td>
                      <td class="w90">{{far[1].ax}}</td>
                      <td class="w90">{{far[1].va}}</td>
                      <td class="w90">{{far[1].dpd}}</td>
                      <td class="w90">{{far[1].npd}}</td>
                      <td class="w90">{{far[1].hpd}}</td>
                    </tr>
                  </table>
                </li>
              </ul>
            </li>
            <li class="clearfix combination_table_list" >
              <ul>
                <li class="fn-left msg_left">近用</li>
                <li class="fn-left glass_table_770">
                  <table>
                    <tr class="border_bottom">
                      <td class="w50">R</td>
                      <td class="w90">{{near[0].sph}}</td>
                      <td class="w90">{{near[0].cyl}}</td>
                      <td class="w90">{{near[0].ax}}</td>
                      <td class="w90">{{near[0].va}}</td>
                      <td class="w90">{{near[0].dpd}}</td>
                      <td class="w90">{{near[0].npd}}</td>
                      <td class="w90">{{near[0].hpd}}</td>
                    </tr>
                    <tr class="dis_bg">
                      <td class="w50">L</td>
                      <td class="w90">{{near[1].sph}}</td>
                      <td class="w90">{{near[1].cyl}}</td>
                      <td class="w90">{{near[1].ax}}</td>
                      <td class="w90">{{near[1].va}}</td>
                      <td class="w90">{{near[1].dpd}}</td>
                      <td class="w90">{{near[1].npd}}</td>
                      <td class="w90">{{near[1].hpd}}</td>
                    </tr>
                  </table>
                </li>
              </ul>
            </li>
            <li class="clearfix combination_table_list">
              <ul>
                <li class="fn-left msg_left">隐形</li>
                <li class="fn-left glass_table_770">
                  <table>
                    <tr class="border_bottom">
                      <td class="w50">R</td>
                      <td class="w90">{{contact[0].sph}}</td>
                      <td class="w90">{{contact[0].cyl}}</td>
                      <td class="w90">{{contact[0].ax}}</td>
                      <td class="w90">{{contact[0].va}}</td>
                    </tr>
                    <tr class="dis_bg">
                      <td class="w50">L</td>
                      <td class="w90">{{contact[1].sph}}</td>
                      <td class="w90">{{contact[1].cyl}}</td>
                      <td class="w90">{{contact[1].ax}}</td>
                      <td class="w90">{{contact[1].va}}</td>
                    </tr>
                  </table>
                </li>
              </ul>
            </li>
            <li class="clearfix combination_table_list">
              <ul>
                <li class="fn-left  msg_left">渐进</li>
                <li class="fn-left glass_table_770">
                  <table>
                    <tr class="border_bottom">
                      <td class="w50">R</td>
                      <td class="w90">{{asymptotic[0].sph}}</td>
                    </tr>
                    <tr class="dis_bg">
                      <td class="w50">L</td>
                      <td class="w90">{{asymptotic[1].sph}}</td>
                    </tr>
                  </table>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
      
      <h3 v-if="orderData.orderLogList.length!=0">操作流转</h3>

      <div class="operation">
            <div class="operation_title">
              <span style="width:120px">
                操作内容
              </span>
              <span style="width:100px">
                操作人
              </span>
              <span style="width:200px">
                &nbsp;&nbsp;操作时间
              </span>
            </div>
            <div class="divBorder" ></div>
           <el-table
            :data="orderData.orderLogList"
            size="small"
            :show-header = false
            style="width: 100%;margin-left:26px;">
            <el-table-column
              prop="opreateTitle"
              label="操作内容"
              width="120">
            </el-table-column>
            <el-table-column
              prop="operator"
              label="操作人"
              width="100">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="操作时间"
              width="200px">
            </el-table-column>
          </el-table>
      </div>
      <h3>收银记录</h3>
      <div class="Cashier">
            <div class="Cashier_title">
              <span style="width:120px;text-indent:10px;">
                金额
              </span>
              <span style="width:100px">
                结算方式
              </span>
              <span style="width:100px;text-indent:20px;">
                操作人
              </span>
              <span style="width:150px;text-indent:30px;">
                时间
              </span>
            </div>
            <div class="divBorder" ></div>
            <el-table 
              :data="tableData"
              :show-header = false
              :span-method="objectSpanMethodOperation"
              align="left"
              size="small"
              style="width: 100%;margin-left:26px;">
              <el-table-column
                label="金额"
                width="100px">
                <template slot-scope="scope">
                  <strong>金额:{{ scope.row.money}}</strong>
                </template>
              </el-table-column>
              <el-table-column
                label="结算方式"
                width="100px">
                <template slot-scope="scope">
                  <ul>
                    <li v-for="item in scope.row.type" :key="item.in">
                        {{item.types}} {{item.moneys}}
                    </li>
                  </ul>
                </template>
              </el-table-column>
              <el-table-column
                prop="people"
                label="操作人"
                width="120px">
              </el-table-column>
              <el-table-column
                prop="time"
                label="时间"
                width="200px">
              </el-table-column>
            </el-table>
      </div>
      <h3>备注信息</h3>
      <div class="message">
          <div class="message_title">
              <span style="width:100px;text-indent:8px;">
                名称
              </span>
              <span style="width:300px;text-indent:8px;">
                备注内容
              </span>
            </div>
            <div class="divBorder" ></div>
            <el-table 
              :data="tableData"
              :show-header = false
              align="left"
              size="small"
              style="width: 100%;margin-left:26px;">
              <el-table-column
                label="名称"
                width="100px">
                <template slot-scope="scope">
                  <strong>销售备注</strong>
                </template>
              </el-table-column>
              <el-table-column
                label="备注内容"
                width="300px">
                <template slot-scope="scope">
                  <strong>备注备注备注备注备注</strong>
                </template>
              </el-table-column>
            </el-table>
      </div>
    </div>
  </section>      
  </div>
</template>

<script>
export default {
  data() {
    return {
      member:{},
      presc:{},
      orderItemsList:[],//商品详情
      ordertemp:{},//订单详情
      orderData: null,
      far: [], //远用
      subjective: [], //主观
      near: [], //近用
      skiascopy: [], // 检影
      asymptotic: [], // 渐近
      contact: [], // 隐形
      tableData2: [
        {
          nameNo: "BH00001",
          name: "左镜片：毛源昌1.55非球面防辐射远+1.50",
          num: 1,
          price: "2300.00",
          money: "134.00",
          address: "店面的的的",
          time: "2018-04-11 13:02:53"
        },
        {
          nameNo: "BH00001",
          name:
            "左镜片：毛源昌1.55非球面防辐射远+1.50左镜片：毛源昌1.55非球面防辐射远+1.50左镜片：毛源昌1.55非球面防辐射远+1.50",
          num: 1,
          price: "2300.00",
          money: "134.00",
          address: "店面的的的",
          time: "2018-04-11 13:02:53"
        },
        {
          nameNo: "BH00001",
          name: "左镜片：毛源昌1.55非球面防辐射远+1.50",
          num: 1,
          price: "2300.00",
          money: "134.00",
          address: "店面的的的",
          time: "2018-04-11 13:02:53"
        },
        {
          nameNo: "BH00001",
          name: "左镜片：毛源昌1.55非球面防辐射远+1.50",
          num: 1,
          price: "2300.00",
          money: "134.00",
          address: "店面的的的",
          time: "2018-04-11 13:02:53"
        }
      ],
      
      tableData: [
        {
          money: "1200.00",
          type: [{
            types:'支付宝',
            moneys:'300.00'
          }],
          time: "2018-04-11 17:07:02",
          people: '某某'
        },
       {
          money: "",
          type: [{
            types:'支付宝',
            moneys:'300.00'
          }],
          time: "2018-04-11 17:07:02",
          people: '某某'
        },
        {
          money: "",
          type: [{
            types:'支付宝',
            moneys:'300.00'
          }],
          time: "2018-04-11 17:07:02",
          people: '某某'
        },
        {
          money: "",
          type: [{
            types:'支付宝',
            moneys:'300.00'
          }],
          time: "2018-04-11 17:07:02",
          people: '某某'
        },
      ],
    };
  },
  methods: {
    
    eyesDate(data) {
      let _this = this;
      for (var i = 0; i < data.length; i++) {
        if (data[i].key == 0) {
          _this.skiascopy = data[i].value;
        } else if (data[i].key == 1) {
          _this.subjective = data[i].value;
        } else if (data[i].key == 2) {
          _this.far = data[i].value;
        } else if (data[i].key == 3) {
          _this.near = data[i].value;
        } else if (data[i].key == 4) {
          _this.asymptotic = data[i].value;
        } else if (data[i].key == 5) {
          _this.contact = data[i].value;
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 7 || columnIndex === 8 || columnIndex === 9) {
        if (rowIndex % this.tableData2.length === 0) {
          return {
            rowspan: this.tableData2.length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },objectSpanMethodOperation({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 2 || columnIndex === 3) {
        if (rowIndex % this.tableData2.length === 0) {
          return {
            rowspan: this.tableData2.length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "default-row";
      } else if (rowIndex % 2 == 1) {
        return "warning-row";
      }
      return "";
    },
    orderDetail(id) {
      let _this = this;
      _this
        .$axios({
          url: "http://myc.qineasy.cn/pos-api/orderTemp/getOrderTemp",
          method: "post",
          params: {
            jsonObject: {
              orderId: id
            },
            keyParams: {
              weChat: true
            }
          }
        })
        .then((res) => {
          if (res.data.code == 1) {
            if(res.data.data.prescription){
              _this.eyesDate(res.data.data.prescription.eyes);
            }
            _this.orderData = res.data.data;
            
          } else {
            _this.$message({
              showClose: true,
              message: "查询失败",
              type: "error"
            });
          }
        })
    }
  },
  created() {
    let _this = this;
    this.$nextTick(() => { 
      if (_this.$route.query.orderId) {
        let routerQueryofOrderId = _this.$route.query.orderId;
        _this.orderDetail(routerQueryofOrderId);
      }
     })
    
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "../../../reset";

.content_box {
  .orderHeader {
    width: 100%;
    background: #fff;
    overflow: hidden;
    position: relative;
    .ding{
      width: 1px;
      height: 1px;
      border-top: 20px solid orange;
      border-left: 20px solid orange;
      border-bottom: 20px solid transparent;
      border-right: 20px solid transparent;
    }
    .dingText{
        position: absolute;
        top:0px;
        left:5px;
        color:#fff;
        font-size:16px;
      }
    .orderTitle {
      margin-top: 14px;
      height: 45px;
      border-bottom: 2px #e1e1e1 solid;
      padding-left: 51px;
      span {
        display: inline-block;
        font-family: MicrosoftYaHei;
        font-size: 15px;
        color: #000000;
        letter-spacing: 0;
      }
      i {
        font-family: MicrosoftYaHei-Bold;
        font-size: 16px;
        color: #999999;
        letter-spacing: 0;
        display: inline-block;
        margin-left: 20px;
      }
    }
    .orderMemberdDetail {
      height: 79px;
      overflow: hidden;
      margin: 0 10px;
      padding-left: 20px;
      border-bottom: 2px #e1e1e1 solid;
      div {
        margin-top: 14px;
        span {
          display: inline-block;
          line-height: 14px;
          width: 240px;
          font-family: MicrosoftYaHei;
          font-size: 13px;
          color: #666666;
          letter-spacing: 0;
          i {
            font-family: MicrosoftYaHei;
            font-size: 13px;
            color: #333333;
            letter-spacing: 0;
          }
        }
      }
    }
  }
  .orderShoppingDetail {
    overflow: hidden;
    background: #fff;
    h3 {
      font-family: MicrosoftYaHei-Bold;
      margin-left: 20px;
      margin-top: 16px;
      font-size: 16px;
      color: #333333;
      letter-spacing: 0;
      margin-bottom: 15px;
    }
    .table-box {
      min-width: 1270px;
      width: calc(100% - 22px);
      margin-top: 15px;
      margin: 0 auto;
      thead {
        th {
        }
      }
    }
    .optometry {
      padding-left: 27px;
      .memberMessage {
        span {
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #666666;
          letter-spacing: 0;
          line-height: 30px;
          display: inline-block;
          margin-right: 40px;
        }
        i {
          font-family: MicrosoftYaHei;
          font-size: 12px;
          color: #333333;
          letter-spacing: 0;
        }
      }
    }

    .optometryTable {
      width: 852px;
      margin-top: 15px;
      border-top: 2px dashed #d8d8d8;
    }
    .glass_combination_table {
      width: 870px;
      border: none;
      /* height: 400px; */
    }
    
    .glass_table_head {
      width: 870px;
      height: 30px;
      line-height: 30px;
      font-weight: bold;
      text-align: center;
      font-size: 12px;
      color: #555555;
      letter-spacing: 0;
    }

    .glass_table_770 {
      width: 770px;
    }

    .glass_table_head li {
      float: left;
    }

    .glass_table_770 td {
      text-align: center;
    }

    .glass_table_770 table tr {
      height: 40px;
      line-height: 40px;
    }

    .glass_table_770 tr.dis_bg td {
      background: rgba(246, 246, 246, 0.5);
    }

    .glass_table_770 table {
      // border: 1px solid #d2d2d2;
    }
    .msg_left {
      width: 80px !important;
      height: 82px;
      line-height: 82px;
      text-align: right;
      padding-right: 22px;
      font-family: MicrosoftYaHei-Bold;
      font-weight: 600;
      font-size: 12px;
      color: #666666;
      letter-spacing: 0;
    }
    ul {
      margin-top: 10px;
    }
    .wid80 {
      width: 80px !important;
    }
    .operation {
      .operation_title {
        margin-left: 26px;
        span {
          display: inline-block;
          font-family: MicrosoftYaHei;
          font-size: 13px;
          color: #777777;
          letter-spacing: 0;
        }
      }
      
    }
    .message{
        padding-bottom: 50px;
        .message_title{
          margin-left: 26px;
        }
      span{
        font-family: MicrosoftYaHei;
          display: inline-block;
        font-size: 13px;
        color: #777777;
        letter-spacing: 0;
      }
      
    }
    .divBorder {
          height: 1px;
          background: #d8d8d8;
          margin-bottom: 10px;
          width: calc(100% - 52px);
          margin:0 auto;
          margin-top: 10px;
        }
    .Cashier{
      .Cashier_title{
        margin-left: 26px;
      }
      span{
        font-family: MicrosoftYaHei;
        font-size: 13px;
          display: inline-block;
        color: #777777;
        letter-spacing: 0;
      }
      .cell{
        text-align: left;
      }
    }
  }
}

</style>
<style>
[v-cloak] {
  display: none;
}
.el-table .warning-row {
  background: rgba(246, 246, 246, 0.5);
}
.el-table .default-row {
  background: #fff;
}
.el-table td,
.el-table th.is-leaf {
  border-color: rgba(246, 246, 246, 0.5) !important;
}
.el-table th {
  background-color: rgba(246, 246, 246, 0.5) !important;
  height: 40px;
  font-family: MicrosoftYaHei-Bold;
  font-size: 12px;
  color: #555555;
  letter-spacing: 0;
}
.el-table .el-table__row {
  overflow: hidden;
  clear: both;
  border-top: 1px solid #000 !important;
}
.optometry .cell ,.Cashier .cell,.table-box .cell{
  text-align: center;
}
.optometry .el-table::before ,.operation .el-table::before{
  width: 0 !important;
}

.el-table--border::after, .el-table--group::after, .el-table::before{
  width: 0 !important;
}
.operation .el-table_3_column_13 ,.optometry .el-table_3_column_13  {
  padding:0 !important;
  }
  .el-table_3_column_13 .cell{
  line-height: 16px !important;
  }
  .el-table--small td, .el-table--small th{
    padding: 0 !important;
  }
  .el-table_2_column_11  .cell{
    color: #666666;
  }
  .el-table_2_column_10  .cell,.el-table_2_column_9  .cell{
    color:#333;
  }
</style>
