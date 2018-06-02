<template>
<div class="textCenter newOptometryBody reprint">
    <div class="newOptometryPhone" v-if="!orderIdFromServerAfter">
        <div class="fn-left">
            <span class="am-ft-red mgr5">*</span>
            <label>手机号:</label>
            <el-input v-model="telphone" @keyup.native.enter="searchTelphone()"></el-input>
            <!-- <nz-input [ngModel]=""></nz-input> -->
        </div>
        <!-- <div class="fn-left">
            <label>零售单号:</label><nz-input [ngModel]=""></nz-input>
        </div> -->
        <div class="fn-left">
            <label>零售单号:</label>
            <el-select v-model="orderId" placeholder="请选择" class="selectOrder" @change="searchOrderDetail()">
                <el-option v-for="item in selectOrder"
                :key="item.orderId"
                :label="item.orderId"
                :value="item.orderId">
                        <span style="float:left;">{{ item.orderId }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ (item.createTime).substring(0,10) }}</span>
                </el-option>
            </el-select>
        </div>
        <div class="fn-left" v-if="orderDetail">
            <label>姓名:</label><span class="nopText">{{orderDetail.name}}</span>
        </div>
        <div class="fn-left"  v-if="orderDetail">
            <label>会员卡号:</label><span class="nopText">{{orderDetail.memberId}}</span>
        </div>
        
    </div>
             
    <div class="reprintContent" id='print' ref="printDiv" v-if="orderDetail">
        <div class="reprintBasicInfo">
            <div class=""><span>产品名称：装配眼镜(定配眼镜)</span></div>
            <div class=""><span>检验合格</span></div>
            <div class=""><span>生产日期：年月日</span></div>
        </div>
        <div class="reprintEwm">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/ewm.png"/>
        </div>
        <div class="reprintShopNameTime">
            <h2>{{orderDetail.shopName}}</h2>
            <p>配镜日期：<span>{{(orderDetail.createTime).substring(0,10)}}</span></p>
            <p>取镜日期：<span>{{(orderDetail.glassesTime).substring(0,10)}}</span></p>
            <h3>{{orderDetail.orderId}}</h3>
        </div>
        <div class="reprintMemberInfo">
            <p>姓名：<span>{{memberInfo.name}}</span></p>
            <p>性别：<span>{{memberInfo.sex=='M'?'男':'女'}}</span></p>
            <p>生日：<span>{{memberInfo.birthday}}</span></p>
            <p>手机：<span>{{memberInfo.telphone}}</span></p>
            <p>地址：<span>{{memberInfo.address}}</span></p>
        </div>
        <div class="prescriptionTable" v-if="optometryData!=null&&optometryData.length>=0">
            <el-table
            size="small"
            :data="optometryData"
            align="center"
            :span-method="objectSpanMethod"
            style="width: 100%">
                <el-table-column
                    align="center"
                    label="处方内容">
                    <template slot-scope="scope">
                            {{scope.$index%2?'':scope.row.key == 0?'远用':'近用'}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="LR">
                     <template slot-scope="scope">
                            {{(optometryData[parseInt(scope.$index/2)].value[scope.$index%2].leftRight)=='0'?'L':'R'}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="SPH">
                     <template slot-scope="scope">
                            {{optometryData[parseInt(scope.$index/2)].value[scope.$index%2].sph}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="CYL"
                    align="center"
                    label="CYL">
                     <template slot-scope="scope">
                            {{optometryData[parseInt(scope.$index/2)].value[scope.$index%2].cyl}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="AX"
                    align="center"
                    label="AX">
                     <template slot-scope="scope">
                            {{optometryData[parseInt(scope.$index/2)].value[scope.$index%2].ax}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="DPD"
                    align="center"
                    label="DPD">
                     <template slot-scope="scope">
                            {{optometryData[parseInt(scope.$index/2)].value[scope.$index%2].dpd}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="NPD"
                    align="center"
                    label="NPD">
                     <template slot-scope="scope">
                            {{optometryData[parseInt(scope.$index/2)].value[scope.$index%2].npd}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="HPD"
                    align="center"
                    label="HPD">
                     <template slot-scope="scope">
                            {{optometryData[parseInt(scope.$index/2)].value[scope.$index%2].hpd}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="ADD"
                    align="center"
                    label="ADD">
                     <template slot-scope="scope">
                            {{optometryData[parseInt(scope.$index/2)].value[scope.$index%2].add}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="receiptsInfo">
            <p>手工单：<span></span></p>
            <p>验光单：<span>{{orderDetail.prescriptionsId}}</span></p>
            <p>卡号：<span></span></p>
            <!-- <p>远瞳距：<span>{{optometryData[0].value[0].pd}} {{optometryData[0].value[1].pd}}</span></p>
            <p>近瞳距：<span>{{optometryData[1].value[0].pd}} {{optometryData[1].value[1].pd}}</span></p> -->
        </div>
        <div class="receiptsSalesTable">
            <el-table
            size="small"
            :data="orderList"
            align="center"
            style="width: 100%">
                <el-table-column
                    prop="itemName"
                    width="500px"
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    align="center"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="listPrice"
                    align="center"
                    label="原单价">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="折扣">
                    <template slot-scope="scope">{{(scope.row.discountRate*10).toFixed(2)}}</template>
                </el-table-column>
                <el-table-column
                    prop="money"
                    align="center"
                    label="实售单价">
                </el-table-column>
            </el-table>
        </div>
        <div class="receiptsRemark">
            <p>销售备注：<span>{{orderDetail.saleMemo}}</span></p>
        </div>
        <div class="receiptsRemark">
            <p>验光备注：<span>{{orderDetail.specialMemo}}</span></p>
        </div>
        <div class="receiptsRemark">
            <p>加工备注：<span>{{orderDetail.processMemo}}</span></p>
        </div>
        <div class="receiptsOtherRemark">
            <p>其他费用：<span>{{orderDetail.extraMoney}}</span></p>
            <p>配镜金额：<span></span></p>
            <p>实收金额：<span>{{orderDetail.moneyAmount}}</span></p>
            <p>欠款金额：<span>{{(orderDetail.moneyAmount - orderDetail.moneyPaid).toFixed(2)}}</span></p>
        </div>
        <div class="receiptsCompanyInfo">
            <p class="receiptsCompanySales">验光：<span>{{optometrist}}</span></p>
            <p class="receiptsCompanySales">顾问：<span>{{createUserName}}</span></p>
            <p class="receiptsCompanySales">签批：<span></span></p>
            <p class="receiptsCompanySales">收银：<span></span></p>
            <p class="receiptsCompanySales">检验：<span></span></p>
            <p class="receiptsCompany30days">请在30日内开发票</p>
            <p class="receiptsCompanySales">门店电话：<span>5079334</span></p>
            <p class="receiptsCompanySales">生产商：<span>{{orderDetail.shopName}}</span></p>
            <p class="receiptsCompanySales">生产地址：<span>杭州市上城区南山路新民村3号</span></p>
            <p class="receiptsCompanySales">联系电话：<span>0571-2888555</span></p>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'ReprintModal',
  data () {
    return { 
        data:[
            
        ],
        optometryData:null,
        optometrist:'',
        createUserName:'',
        optometryDataArr:[{
            prescription:"远用",
            lr:"L",
            SPH:"＋1.75",
            CYL:"＋1.75",
            AX:"",
            VA:"",
            DPD:"0.4",
            NPD:"32",
            HPD:"",
            ADD:""
        },{
            prescription:"远用",
            lr:"R",
            SPH:"＋1.75",
            CYL:"＋1.75",
            AX:"",
            VA:"",
            DPD:"0.4",
            NPD:"32",
            HPD:"",
            ADD:""
        }],
        memberInfo:{},
        telphone:'',
        selectOrder:[],
        memberId:'',
        orderDetail:null,
        orderId:'',
        prescriptions:null,
        orderList:null,
        eyes:null,
        data2:[
            {
                suggest    : '右镜片：毛源昌1.55非球面防辐射远+1.50',
                num   : '1',
                originalCost   : '134.00',
                discount    : '10.0',
                realSale:'134.00'
            }
        ]
    }
  },
  props:{
      orderIdFromServerAfter:{
          type:String,
            default:null
      }
  },
  methods:{
      searchTelphone(){
          const _this =this;
          _this.$myAjax({
              url:'pos-api/orderTemp/getOrderTempList',
              data:{
                telphone:_this.telphone
              },success:function(res){
                  console.log(res)
                  if(res.code == 1){
                      _this.selectOrder = res.data.orderTempList;
                  }
              },error:function(err){
                  console.log(err)
              }
          })
      },
      searchOrgAttr(){
          const _this =this ;
          _this.$myAjax({
              url:"pos-api/shopBy/getShopByList",
              data:{
                //   shopId:
              },success:function(res){

              },error:function(err){

              }
          })
      },
      print(){
        const _this = this;
        var docStr = document.getElementById('print');
                console.log(docStr)
        var newWindow = window.open("打印窗口","_blank");
        newWindow.document.write(docStr.innerHTML);
        newWindow.document.close();
        newWindow.print();
        newWindow.close();
        // document.body.innerHTML = docStr;
        // var oldstr = document.body.innerHTML;
        // window.print()
        // document.body.innerHTML = oldstr
        // return false
        // _this.$print({
        //   printable: 'print',
        //   type: 'html',
        //   // 继承原来的所有样式
        //   targetStyles: ['*']
        // })
      },
      searchMember(memberId){
          const _this = this;
              _this.$myAjax({
                url: "member-api/member/getMemberListByBoYang",
                data: {
                  memberId: memberId,
                  size: 5,
                  nub: 0
                },
                success: function(res) {
                  if (res.code == 1) {
                    // _this.getMemberInfo(res.data.memberList[0], true);
                    if(res.data.memberList.length>0){
                        _this.memberInfo = res.data.memberList[0];
                    }else{
                        _this.$message({
                            showClose: true,
                            message: "没有查找到该会员",
                            type: "warning"
                        });
                    }
                  } else {
                    _this.$message({
                      showClose: true,
                      message: "会员信息获取失败",
                      type: "error"
                    });
                  }
                },
                error: function(err) {
                    console.log(err)
                   _this.$message({
                    type:'error',
                    message:err,
                    showClose:true
                  })
                }
              });
      },
      getPrescriptions(id) {
      const _this = this;
      _this.$myAjax({
        url:'pos-api/prescriptions/getPrescriptions',
        data:{
            prescriptionId: id || this.optometryId
        },
        success:function(res){
          if(res.code == 1&& res.data.eyes.length > 0){
             console.log("取验光单信息", res.data);
             _this.optometryData = res.data.eyes;
             _this.createUserName = res.data.prescriptions.createUserName;
             _this.optometrist = res.data.prescriptions.optometrist;
            //  _this.includeOptometry();
          }else{
            _this.$message({
              type:'warning',
              message:res.msg,
              showClose:true})
           }
        },error:function(err){
          console.error(err)
           _this.$message({
            type:'error',
             message:err,
            showClose:true
          })
        }
      });
    },
      searchOrderDetail(orderId){
          const _this  = this;
          _this.$myAjax({
              url:'pos-api/orderTemp/getOrderTemp',
              data:{
                  orderId:_this.orderId||orderId
              },
              success:function(res){
                  if(res.code == 1){
                    console.log(res.data)
                    _this.orderDetail = res.data.ordertemp;
                    _this.orderList = res.data.orderItemsList;
                    _this.memberId = res.data.ordertemp.memberId;
                    _this.searchMember(res.data.ordertemp.memberId)
                    if(res.data.ordertemp.prescriptionsId){
                        _this.getPrescriptions(res.data.ordertemp.prescriptionsId)
                    }
                  }else{
                      _this.$message({
                        showClose: true,
                        message: res.msg,
                        type: "error"
                        });
                  }
              },error:function(err){
                  console.log(err)
                  _this.$message({
                    showClose: true,
                    message: err,
                    type: "error"
                    });
              }
          })
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../reset.scss';
.newOptometryBody{
        min-height:520px;
}
.reprint{
    .el-dialog__body {
    }
    .el-checkbox__label {
        font-size: 12px;
    }
    .el-table th {
        background: #fff !important;
    }
    label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: 700;
    }
    
    .newOptometryPhone{
        overflow: hidden;
        border-bottom: 1px solid #d8d8d8;
        line-height: 29px;
        background: #F8F8F8;
        padding: 10px 24px;
        div{
            margin-right: 10px;
        }
        span,label,.el-input{
            float: left;
        }
        label{
            margin: 0;
            font-size: 12px;
            color: #666666;
            font-weight: 400;
            &:not(:nth-of-type(1)){
                margin-left: 30px;
            }
        }
        .el-input{
            width: 100px;
        }
        .nopText{
            float: left;
            color: #333333;
            margin-left: 5px;
            font-weight: 400;
            font-size: 12px;
        }
    }
    .reprint{
        .packageDetailButtonGroup{ 
            padding: 10px;
            background: #EEEEEE;
            button{
                border-radius: 4px;
                width: 90px;
                &:last-child{
                    background: #00AFE4;
                    border: none;
                }
            }
        }
        .ant-modal-footer{
            background: #eee;
        }
        .reprintContent{
            padding: 0 24px 16px 24px;
            min-height: 500px;
            .reprintBasicInfo{
                font-size: 12px;
                overflow: hidden;
                div{
                    line-height: 30px;
                    width: 40%;
                    overflow: hidden;
                    &:first-child{
                        width: 30%;
                        text-align: left;
                    }
                    &:not(:last-child){
                        float: left;
                    }
                    &:last-child{
                        float: right;
                        width: 30%;
                        text-align: right;
                    }
                }
            }
            .reprintEwm{
                width: 100%;
                text-align: right;
                img{
                    margin-right: 40px;
                }
            }
            .reprintShopNameTime{
                overflow: hidden;
                line-height: 30px;
                font-size: 12px;
                h2{
                    float: left;
                    width: 30%;
                    text-align: left;
                    font-size: 24px;
                    color: #333;
                    font-weight: 400;
                }
                p{
                    width: 20%;
                    float: left;
                    text-align: center;
                }
                h3{
                    float: right;
                    width: 30%;
                    text-align: right;
                    font-size: 20px;
                    color: #333333;
                }
            }
            .reprintMemberInfo{
                font-size: 12px;
                margin-top: 3px;
                p{
                    float: left;
                    margin-right: 50px;
                    color: #666666;
                    span{
                        color: #333333;
                    }
                }
            }
            .prescriptionTable{
                overflow: hidden;
                width: 100%;
                padding-top: 15px;
                th{
                    padding: 4px 8px;
                    border-top: 1px solid #AAAAAA;
                    border-bottom: 1px solid #AAAAAA;
                    font-weight: bold;
                }
                td{
                    padding: 6px 8px;
                }
                .el-table{
                    border-bottom: 1px solid #AAAAAA;
                }
                .borderLeftAAA{
                    border-left: 1px solid #AAAAAA;
                }
            }
            .receiptsInfo{
                height: 25px;
                line-height: 25px;
                border-bottom: 1px solid #AAAAAA;
                font-size: 12px;
                p{
                    float: left;
                    width: 23%;
                    text-align: left;
                    span{
                        display: inline-block;
                    }
                    &:nth-of-type(n+3){
                        width: 18%;
                    }
                }
            }
            .receiptsSalesTable{
                .el-table{
                    padding-top: 20px;
                    border-bottom: 1px solid #AAAAAA;
                }
                th{
                    border-bottom: 1px solid #AAAAAA;
                    padding: 8px 8px;
                    &:not(:first-child){
                        text-align: center;
                    }
                }
                td{
                    padding: 8px 8px;
                    &:not(:first-child){
                        text-align: center;
                    }
                }
            }
            .receiptsRemark{
                width: 100%;
                overflow: hidden;
                text-align: left;
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #AAAAAA;
                p{
                    font-size: 12px;
                    color: #666666;
                    padding-left: 8px;
                    span{
                        color: #333333;
                    }
                }
            }
            .receiptsOtherRemark{
                width: 100%;
                overflow: hidden;
                text-align: left;
                height: 35px;
                line-height: 35px;
                border-bottom: 1px solid #AAAAAA;
                p{
                    font-size: 12px;
                    color: #666666;
                    float: left;
                    margin-right: 35px;
                    padding-left: 8px;
                    span{
                        font-size: 16px;
                        color: #111111;
                        font-weight: 500;
                    }
                }
            }
            .receiptsCompanyInfo{
                overflow: hidden;
                line-height: 30px;
                padding-left: 8px;
                .receiptsCompanySales{
                    float: left;
                    font-size: 12px;
                    color: #666666;
                    margin-right: 15px;
                    span{
                        color: #333333;
                    }
                }
                .receiptsCompany30days{
                    float: left;
                    margin-left: 100px;
                    margin-right: 15px;
                }
            }
        }
    }   
}

</style>
