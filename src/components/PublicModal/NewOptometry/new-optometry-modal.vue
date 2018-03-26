<template>
<div class="newOptometry pb10">
    <div class="textCenter newOptometryBody">
        <div class="newOptometryPhone">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="手机号:" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="姓名:">
                    <span class="nopText">张三</span>
                </el-form-item>
                <el-form-item label="会员卡号:">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="性别:">
                    <span class="nopText">女</span>
                </el-form-item>
                <el-form-item label="出生年月:">
                    <span class="nopText">2017-09-21</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="newOptometryOptician">
            <label class="mgr10">配镜处方：</label>
            <el-checkbox>远用</el-checkbox>
            <el-checkbox>近用</el-checkbox>
            <el-checkbox>渐进</el-checkbox>
            <el-checkbox>隐形</el-checkbox>
        </div>
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
                            <tr class="">
                                <td class="w50 ft_bold">L</td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90 glass_table_2x" rowspan="2"><el-input></el-input></td>
                            </tr>
                            <tr class="">
                                <td class="w50 ft_bold">R</td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li>
        </ul>

        <div class="newOptometryOptician">
                <label>检查数据：</label>
        </div>            
        <ul class="glass_combination_table">
            <li class="clearfix combination_table_list">
                <ul>
                    <li class="fn-left msg_left">旧镜</li>
                    <li class="fn-left glass_table_770">
                        <div class="labelInput">
                            <label>R</label><el-input style="width:80px"></el-input>
                        </div>
                        <div class="labelInput">
                            <label>L</label><el-input style="width:80px"></el-input>
                        </div>   
                        <div class="labelInput">
                            <label>PD</label><el-input style="width:80px"></el-input>
                        </div>                            
                    </li>
                </ul>
            </li>
            <li class="clearfix combination_table_list">
                <ul>
                    <li class="fn-left msg_left breakMsg">眼部<br/>健康</li>
                    <li class="fn-left glass_table_770">
                        <div class="labelInput">
                            <label>上下眼睑：</label><el-input style="width:80px"></el-input>
                        </div>
                        <div class="labelInput">
                            <label>角膜：</label><el-input style="width:80px"></el-input>
                        </div>   
                        <div class="labelInput">
                            <label>结膜：</label><el-input style="width:80px"></el-input>
                        </div>      
                        <div class="labelInput">
                            <label>泪液：</label><el-input style="width:80px"></el-input>
                        </div>    
                        <div class="labelInput">
                            <label>其他：</label><el-input style="width:80px"></el-input>
                        </div>                            
                    </li>
                </ul>
            </li>
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
                            <tr class="">
                                <td class="w50 ft_bold">L</td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90 glass_table_2x" rowspan="2"><el-input></el-input></td>
                            </tr>
                            <tr class="">
                                <td class="w50 ft_bold">R</td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li>
            <li class="clearfix combination_table_list pt10">
                <ul>
                    <li class="fn-left  msg_left">检影</li>
                    <li class="fn-left glass_table_770">
                        <table>
                            <tr class="">
                                <td class="w50 ft_bold">L</td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90 glass_table_2x" rowspan="2"><el-input></el-input></td>
                            </tr>
                            <tr class="">
                                <td class="w50 ft_bold">R</td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                                <td class="w90"><el-input></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li>
            <li class="clearfix combination_table_list">
                <ul>
                    <li class="fn-left glass_table_770">
                        <div class="labelInput mgl30">
                            <label>WORTH4：</label><el-input></el-input>
                        </div>
                        <div class="labelInput mgl30">
                            <label>立体视：</label><el-input></el-input>
                        </div>   
                        <div class="labelInput mgl30">
                            <label>NAR/PRA：</label><el-input></el-input>
                        </div>                            
                    </li>
                </ul>
            </li>
        </ul>    
        <ul class="optometryMemo">
            <li class="fn-left ft_bold">验光备注：</li>
            <li class="fn-left glass_table_770">
                <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"></el-input>
            </li>
        </ul>           
        <ul class="optometryMemo">
            <li class="fn-left glass_table_770">
                <div class="labelInput lineHeightAuto">
                    <label class="mgr10">验光来源：</label>
                    <el-select style="width:120px" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="labelInput lineHeightAuto mgl30">
                    <label class="mgr10">验光师：</label>
                    <el-select style="width:120px" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>   
                <div class="labelInput lineHeightAuto mgl30">
                    <label class="mgr10">验光日期 :</label>
                    <el-date-picker
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>                           
            </li>
        </ul>   
    </div>
</div>
</template>

<script>

export default {
  name: 'NewOptometryModal',
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
    padding: 15px;
    font-size: 12px;
    .newOptometryPhone{
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
                    width: 80px;
                }
            }
        }
        overflow: hidden;
        padding: 10px 0;
        border-bottom: 1px dashed #d8d8d8;
        line-height: 29px;
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
    .newOptometryOptician{
        padding: 14px 10px;
        text-align: left;
        label{
            margin: 0;
        }
        .el-checkbox{
            margin-right: 10px;
        }
    }
    .optometryMemo{
        overflow: hidden;
        padding-top: 14px;
        li:first-child{
            font-size: 12px;
            color: #666666;
            margin-top: 2px;
        }
    }
}   

.glass_combination_table {
    border: 1px solid #E1E1E1;
}

.glass_table_head {
    width: 850px;
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
    .el-input {
        width: 70px;
    }
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
    background: rgba(246, 246, 246, 0.50);
}

.border_bottom {
    border-bottom: 1px solid #EFEFEF;
}

.border_left {
    border-left: 1px solid #EFEFEF;
    border-bottom: 1px solid #D2D2D2;
}

.msg_left {
    width: 80px !important;
    height: 82px;
    line-height: 82px;
    text-align: right;
    padding-right: 22px;
}

.combination_table_list {
    background: #fff;
    // margin-top: 13px;
    &:last-child{
        padding-bottom: 20px;
    }
}

.labelInput{
    float: left;    
    line-height: 82px;
    height: 82px;
    label{
        min-width: 50px;
    }
    .el-input{
        width: 110px;;
        padding:0; 
    }
}
.lineHeightAuto{
    line-height: 1 !important;
    height: auto !important;
}

.breakMsg{
    line-height: 20px;
    text-align: right;
    padding-right: 22px;
    margin-top: 20px;
    height: auto;
}

.wid80 {
    width: 80px !important;
}

.glass_old {
    height: 40px;
    margin-top: 24px;
}

.glass_old .data_li,
.eye_healthy .data_li {
    float: left;
    padding: 0 20px;
    color: #333333;
}

.eye_healthy {
    height: 40px;
}

.glass_old .data_li span,
.eye_healthy .data_li span {
    color: #666666;
    padding: 0 5px;
}

.over_scroll {
    overflow: auto;
}

.combination_footer {
    margin: 10px 0 10px 80px;
    height: 40px;
    line-height: 40px;
}

.combination_footer li {
    padding: 0 20px;
    font-size: 12px;
    color: #333333;
}

.combination_footer li span {
    color: #666666;
    padding: 0 5px;
}

.optometry_remarks {
    line-height: 20px;
}

.optometry_remarks_text {
    width: 670px;
    line-height: 20px;
    color: #333333;
    padding: 0 3px;
}

.optometry_origin,
.optometrist {
    color: #666666;
    line-height: 20px;
    margin-right: 30px;
}

.optometry_origin span,
.optometrist span {
    color: #333333;
    line-height: 20px;
    padding: 0 3px;
}
.glass_table_2x{
    input{
        padding: 35px 0;
        text-align: center;
    }
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
</style>
