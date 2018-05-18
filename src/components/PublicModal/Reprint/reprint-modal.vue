<template>
<div class="textCenter newOptometryBody reprint">
    <div class="newOptometryPhone">
        <div class="fn-left">
            <span class="am-ft-red mgr5">*</span>
            <label>手机号:</label>
            <!-- <nz-input [ngModel]=""></nz-input> -->
        </div>
        <!-- <div class="fn-left">
            <label>零售单号:</label><nz-input [ngModel]=""></nz-input>
        </div> -->
        <div class="fn-left">
            <label>性名:</label><span class="nopText">张三</span>
        </div>
        <div class="fn-left">
            <label>会员卡号:</label><span class="nopText">HY12340001</span>
        </div>
        <div class="fn-right">
            <label>零售单号:</label><span class="nopText">HY12340001</span>
        </div>
    </div>                   
    <div class="reprintContent">
        <div class="reprintBasicInfo">
            <div class=""><span>产品名称：装配眼镜(定配眼镜)</span></div>
            <div class=""><span>检验合格</span></div>
            <div class=""><span>生产日期：                年           月          日</span></div>
        </div>
        <div class="reprintEwm">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/ewm.png"/>
        </div>
        <div class="reprintShopNameTime">
            <h2>湖滨店</h2>
            <p>配镜日期：<span>2017-12-13</span></p>
            <p>取镜日期：<span>2017-12-13</span></p>
            <h3>R00031712130001</h3>
        </div>
        <div class="reprintMemberInfo">
            <p>姓名：<span>张三</span></p>
            <p>性别：<span>女</span></p>
            <p>生日：<span>2017-09-21</span></p>
            <p>手机：<span>13546574624</span></p>
            <p>地址：<span>杭州市西湖区文二西路11111号</span></p>
        </div>
        <div class="prescriptionTable">
            <el-table
            size="small"
            :data="data"
            align="center"
            :span-method="objectSpanMethod"
            style="width: 100%">
                <el-table-column
                    prop="prescription"
                    align="center"
                    label="处方内容">
                </el-table-column>
                <el-table-column
                    prop="lr"
                    align="center"
                    label="LR">
                </el-table-column>
                <el-table-column
                    prop="SPH"
                    align="center"
                    label="SPH">
                </el-table-column>
                <el-table-column
                    prop="CYL"
                    align="center"
                    label="CYL">
                </el-table-column>
                <el-table-column
                    prop="AX"
                    align="center"
                    label="AX">
                </el-table-column>
                <el-table-column
                    prop="DPD"
                    align="center"
                    label="DPD">
                </el-table-column>
                <el-table-column
                    prop="NPD"
                    align="center"
                    label="NPD">
                </el-table-column>
                <el-table-column
                    prop="HPD"
                    align="center"
                    label="HPD">
                </el-table-column>
                <el-table-column
                    prop="ADD"
                    align="center"
                    label="ADD">
                </el-table-column>
            </el-table>
        </div>
        <div class="receiptsInfo">
            <p>手工单：<span></span></p>
            <p>验光单：<span>OPT00011709280067</span></p>
            <p>卡号：<span></span></p>
            <p>远瞳距：<span>64</span></p>
            <p>远瞳距：<span></span></p>
        </div>
        <div class="receiptsSalesTable">
            <el-table
            size="small"
            :data="data2"
            align="center"
            style="width: 100%">
                <el-table-column
                    prop="suggest"
                    width="500px"
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    prop="num"
                    align="center"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="originalCost"
                    align="center"
                    label="原单价">
                </el-table-column>
                <el-table-column
                    prop="discount"
                    align="center"
                    label="折扣">
                </el-table-column>
                <el-table-column
                    prop="discount"
                    align="center"
                    label="实售单价">
                </el-table-column>
            </el-table>
        </div>
        <div class="receiptsRemark">
            <p>销售备注：<span>销售备注销售备注销售备注销售备注</span></p>
        </div>
        <div class="receiptsRemark">
            <p>验光备注：<span>验光备注内容验光备注内容验光备注内容验光备注内容</span></p>
        </div>
        <div class="receiptsRemark">
            <p>加工备注：<span>加工备注内容加工备注内容</span></p>
        </div>
        <div class="receiptsOtherRemark">
            <p>其他费用：<span>490.00</span></p>
            <p>配镜金额：<span>490.00</span></p>
            <p>实收金额：<span>490.00</span></p>
            <p>欠款金额：<span>490.00</span></p>
        </div>
        <div class="receiptsCompanyInfo">
            <p class="receiptsCompanySales">验光：<span>hz3036</span></p>
            <p class="receiptsCompanySales">顾问：<span>hz3066</span></p>
            <p class="receiptsCompanySales">签批：<span>hz3046</span></p>
            <p class="receiptsCompanySales">收银：<span>hz3046</span></p>
            <p class="receiptsCompanySales">检验：<span>hz3046</span></p>
            <p class="receiptsCompany30days">请在30日内开发票</p>
            <p class="receiptsCompanySales">门店电话：<span>5079334</span></p>
            <p class="receiptsCompanySales">生产商：<span>毛源昌眼镜有限公司</span></p>
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
        data:[{
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
  methods:{
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

<style lang="scss">
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
