<template>
<div class="newOptometry">
    <div class="textCenter newOptometryBody">
        <div class="newOptometryPhone">
            <div class="complainsMemberInfo">
                <div class="cmInfoItem">
                    <label>投诉人：</label>
                    <p>张三三</p>
                    <p>男</p>
                </div>
                <div class="cmInfoItem">
                    <label>手机 :</label>
                    <p>16601010101</p>
                </div>
                <div class="cmInfoItem">
                    <label>联系地址 :</label>
                    <p>浙江省杭州市西湖区文二西路111111号</p>
                </div>
                <div class="cmInfoItem fn-right">
                    <label>投诉类型：</label>
                    <p>上门投诉</p>
                </div>
                <div class="cmInfoItem fn-right">
                    <label>投诉日期 :</label>
                    <p>20171206</p>
                </div>
                <div class="cmInfoItem">
                    <label>投诉说明：</label>
                    <p><b class="am-ft-black">该会员态度强硬，需要尽快处理，有处理结果后马上打电话告知</b></p>
                </div>
                <div class="cmInfoItem fn-right">
                    <label>接待人员：</label>
                    <p>王二</p>
                </div>
            </div>
        </div>
        <h5 class="complainsNum">零售单号：LSD000000001</h5>
        <div class="grayTable">
            <el-table
                :data="data"
                size="small"
                style="width: 100%">
                <el-table-column
                    prop="memberCard"
                    align="left"
                    label="商品名称"
                    width="500">
                </el-table-column>
                <el-table-column
                    prop="memberName"
                    align="center"
                    label="数量">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="phone"
                    label="原单价">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="age"
                    label="折扣">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="sex"
                    label="实售单价">
                </el-table-column>
            </el-table>
        </div>
       <div class="complaintsType">
           <h5>请填写对应投诉的处理意见</h5>
       </div>
        <div class="whiteTable">
            <el-table
                :data="data"
                size="small"
                style="width: 100%">
                <el-table-column
                    prop="memberCard"
                    align="left"
                    label="投诉类别"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="memberName"
                    align="center"
                    label="负责人"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    align="center"
                    label="原因"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="age"
                    align="center"
                    label="处理意见"
                    width="450">
                    <template slot-scope="scope">
                        <el-input class="w100" v-model="scope.row.age" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <ul class="optometryMemo">
            <li class="fn-left">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item class="labelInput mgb0" label="处理人员：" prop="name">
                        <el-select style="width:120px" v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                        <el-form-item class="labelInput mgb0" label="处理日期：">
                        <el-date-picker
                        type="date"
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>                    
                </el-form>
            </li>
        </ul>   
    </div>
</div>
</template>

<script>

export default {
  name: 'ComplainsBillModal',
  data () {
    return { 
        options: [],
        value: '',
        ruleForm: {
          name: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入', trigger: 'blur' }
          ]
        },
        tabs : [
            {
            name: '1',
            label:'搜索结果'
            },
            {
            name: '2',
            label:'最近验光会员'
            }
        ],
        activeName: '1',
        data:[
            {
                memberCard:'0012345',
                memberName:'张三',
                phone:'15383465790',
                sex:'男',
                age:'12',
                time:'2017-10-12 12:34:55'
            },
            {
                memberCard:'0012345',
                memberName:'张三',
                phone:'15383465790',
                sex:'男',
                age:'12',
                time:'2017-10-12 12:34:55'
            }
        ]
    }
  },
  methods:{
  }
}
</script>

<style lang="scss">
@import "../../../reset";
.ComplainsBill{
    .complainsNum{    
        margin-left: 12px;
        margin-bottom: 5px;
    }
    .w100{
        width: 100%;
    }
    .content_box{
        flex-direction: column;
    }
    .el-dialog__body {
        padding: 0;
    }
    .el-checkbox__label {
        font-size: 12px;
    }
    label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: 700;
    }
    .newOptometry{
        padding: 0;
        font-size: 12px;
        .newOptometryPhone{
            padding: 10px 15px;
            overflow: hidden;
            line-height: 29px;
            .el-form-item{
                float: left;
                margin: 0;
                height: 40px;
                line-height: 40px;
                font-size: 12px;
                .el-form-item__label{
                    margin-right: 10px;
                    width: auto !important;
                }
                .el-form-item__content{
                    margin-left: 0 !important;
                    float: left;
                    margin-right: 20px;
                    .el-input{
                        width: 100px;
                    }
                }
            }
            .complainsMemberInfo{
                overflow: hidden;
                .cmInfoItem{
                    float: left;
                    font-size: 12px;
                    color: #666666;
                    margin-right: 10px;
                    label{
                        float: left;
                        margin-right: 10px;
                    }
                    p{
                        float: left;
                        &:nth-of-type(2){
                            margin-left: 10px;
                        }
                    }
                }
            }
            label{
                margin-right: 10px;
            }
            span,label{
                float: left;
            }
            label{
                margin: 0;
                &:not(:nth-of-type(1)){
                    margin-left: 30px;
                }
            }
            .nopText{
                float: left;
                color: #333333;
                margin-left: 5px;
                font-size: 12px;
                line-height: 40px;
            }
        }
        .optometryMemo{
            padding: 15px;
            background: #fff;
            overflow: hidden;
            border-top: 1px solid #CCCCCC;
            li{
                width: 100%;
            }
            li:first-child{
                font-size: 12px;
                color: #666666;
                margin-top: 2px;
            }
        }
    }   
    .grayTable{
        .el-table__body-wrapper{
            max-height: 120px;
            overflow-y: auto;
        }
        .el-table--small td, .el-table--small th{
            padding: 4px 0;
        }
        .el-table--small th{
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            background: #EFEFEF !important;
            &:first-child{
                padding-left: 30px;
            }
        }
        .el-table--small td{
            background: #F8F8F8 !important;
            &:first-child{
                padding-left: 30px;
            }
        }
    }
    .whiteTable{
        margin: 0 30px;
        min-height: 300px;
        .el-table--small td, .el-table--small th{
            padding: 4px 0;
            background: #fff !important;
        }
        .el-table--small th{
            border-bottom: 1px solid #ccc;
        }
    }
    .labelInput{
        float: left;    
        line-height: 32px;
        label{
            min-width: 50px;
            float: left;
        }
        .el-textarea{
            width: calc(100% - 100px);
            float: left;
        }
        .el-input{
            width: 110px;;
            padding:0; 
        }
    }
    .complaintsType{
        h5{
            font-size: 12px;
            color: #666666;
            margin: 0 10px;
            font-weight: 400;
            text-align: left;
        }
        .ctBox{
            overflow: hidden;
            .ctLeft{
                width: 120px;
                float: left;
                .ctGroup{
                    text-align: center;
                    width: 120px;
                    height: 30px;
                    line-height: 30px;
                    margin-bottom: 10px;
                    p{
                        font-size: 14px;
                        color: #999999;
                        font-weight: bold;
                    }
                }
            }
            .ctRight{
                width: calc(100% - 120px);
                float: left;
                .ctGroup{
                    text-align: center;
                    float: left;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    .ctButton{
                        width: 120px;
                        height: 30px;
                        line-height: 30px;
                        background: #FFFFFF;
                        border: 1px solid #E1E1E1;
                        border-radius: 4px;
                    }
                }
            }
        }
        .labelInput{
            height: auto;
        }
    }

    .wid80 {
        width: 80px !important;
    }

    .over_scroll {
        overflow: auto;
    }

    .packageDetailButtonGroup{ 
        padding:20px 10px;
        background: #EEEEEE;
        text-align: right;
        button{
            border-radius: 4px;
            width: 90px;
            &:first-child{
                
            }
            &:last-child{
                background: #00AFE4;
                border: none;
                margin-right: 20px;
            }
        }
    }
}
</style>
