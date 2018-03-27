<template>
<div class="newOptometry pb10">
    <div class="textCenter newOptometryBody">
        <div class="newOptometryPhone">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="投诉人手机号:" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="零售单号:" class="fn-right">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>

       
        <ul class="optometryMemo">
            <li class="fn-left">
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
            <li class="fn-left">
                <div class="labelInput lineHeightAuto">
                    <label class="mgr10">验光来源：</label>
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="textarea">
                    </el-input>
                </div>
            </li>
        </ul>   
    </div>
</div>
</template>

<script>

export default {
  name: 'NewComplaintsModal',
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
    padding: 0 15px;
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
                    width: 100px;
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
        float: left;
    }
    .el-textarea{
        width: 110px;;
        float: left;
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
