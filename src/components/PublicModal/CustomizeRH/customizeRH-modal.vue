<template>
<div id="customizeRH" class="clearfix modal-content-center">
    <div class="modal-content-left customizeRHBody">
        <h5>定做单号：DZ12340001</h5>
        <div class="customizeInputGroup fn-left">
            <label>球镜：</label>
                <el-select v-model="customContent.value1" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>
        <div class="customizeInputGroup fn-left">
            <label>柱镜：</label>
                <el-select v-model="customContent.value2" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>                            
        <div class="customizeInputGroup fn-left">
            <label>下加光：</label>
                <el-select v-model="customContent.value3" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>
    </div>
    <div class="customizeRHBody">
        <div class="customizeInputGroup textareaGroup fn-left">
            <label>定做需求：</label>
            <el-input
            type="textarea"
            :rows="5" 
            v-model="customContent.customMessage"
            placeholder="请输入内容"></el-input>
        </div>                               
    </div>                               
    <div class="customizeRHBody">
        <div class="customizeInputGroup fn-left">
            <label>原单价：</label>
            <el-input style="width:68px" v-model="customContent.price" placeholder=""></el-input>
        </div>                          
        <div class="customizeInputGroup fn-left">
            <label>数量：</label>
            <el-input style="width:40px" v-model="customContent.num" placeholder=""></el-input>
        </div>                          
        <div class="customizeInputGroup fn-left">
            <label>折扣：</label>
            <el-input style="width:40px" v-model="customContent.discount" placeholder=""></el-input>
        </div>                          
        <div class="customizeInputGroup fn-left">
            <label>实售单价：</label>
            <el-input style="width:68px" v-model="customContent.money" placeholder=""></el-input>
        </div>
    </div>
    
</div>
</template>

<script>

export default {
  name: 'CustomizeRHModal',
  data () {
    return { 
        options: 
        [
            {
            value: '-10.00',
            label: '-10.00',
            },
            {
            value: '-9.75',
            label: '-9.75',
            },
            {
            value: '-9.50',
            label: '-9.50',
            },
            {
            value: '-9.25',
            label: '-9.25',
            },
            {
            value: '-9.00',
            label: '-9.00',
            },
            {
            value: '-8.75',
            label: '-8.75',
            },
            {
            value: '-8.50',
            label: '-8.50',
            },
            {
            value: '-8.25',
            label: '-8.25',
            },
            {
            value: '-8.00',
            label: '-8.00',
            },
            {
            value: '-7.75',
            label: '-7.75',
            },
            {
            value: '-7.50',
            label: '-7.50',
            },
            {
            value: '-7.25',
            label: '-7.25',
            },
            {
            value: '-7.00',
            label: '-7.00',
            },
            {
            value: '-6.75',
            label: '-6.75',
            },
            {
            value: '-6.50',
            label: '-6.50',
            },
            {
            value: '-6.25',
            label: '-6.25',
            },
            {
            value: '-6.00',
            label: '-6.00',
            },{
            value: '-5.75',
            label: '-5.75',
            },{
            value: '-5.50',
            label: '-5.50',
            },{
            value: '-5.25',
            label: '-5.25',
            },{
            value: '-5.00',
            label: '-5.00',
            },{
            value: '-4.75',
            label: '-4.75',
            },{
            value: '-4.50',
            label: '-4.50',
            },{
            value: '-4.25',
            label: '-4.25',
            },{
            value: '-4.00',
            label: '-4.00',
            },{
            value: '-3.75',
            label: '-3.75',
            },{
            value: '-3.50',
            label: '-3.50',
            },{
            value: '-3.25',
            label: '-3.25',
            },{
            value: '-3.00',
            label: '-3.00',
            },{
            value: '-2.75',
            label: '-2.75',
            },{
            value: '-2.50',
            label: '-2.50',
            },{
            value: '-2.25',
            label: '-2.25',
            },{
            value: '-2.00',
            label: '-2.00',
            },{
            value: '-1.75',
            label: '-1.75',
            },{
            value: '-1.50',
            label: '-1.50',
            },{
            value: '-1.25',
            label: '-1.25',
            },{
            value: '-1.00',
            label: '-1.00',
            },{
            value: '-0.75',
            label: '-0.75',
            },{
            value: '-0.50',
            label: '-0.50',
            },{
            value: '-0.25',
            label: '-0.25',
            },
            {
            value: '-0.00',
            label: '-0.00',
            },
        ],
        customContent:{
            value1:"",
            value2:"",
            value3:"",
            customMessage:'',
            price:'',
            num:'',
            discount:'',
            money:''
        },
        data:[
            {
                shopid:'0012345',
                shopname:'毛源昌1.551非球面防辐射远+1.50',
                storehouse:'总仓库',
                inventory:'24',
                allocation:'20',
                price:'230.00'
            }
        ]
    }
  },
  methods:{

  },
  computed:{
  },
  mounted(){
  }
}
</script>

<style lang="scss">
.customizeRH{
    .el-table th {
        background: #fff !important;
    }

    .modal-content-center{
        padding: 15px 20px;
        overflow: hidden;
    }
    #customizeRH{
        .customizeRHBody{
            width: 100%;
            overflow: hidden;
            h5{
                font-weight: bold;
                font-size: 13px;
                color: #666666;
                margin-bottom: 15px;
            }
            .customizeInputGroup{
                font-size: 12px;
                color: #666666;
                margin-left: 10px;
                label{
                    width: 60px;
                    text-align: right;
                    display: inline-block;
                    margin-right: 10px;
                    font-weight: 400;
                }
                .el-select{
                    width: 100px;
                }
                .el-textarea{
                    width: calc(100% - 180px);
                }
            }
            .textareaGroup{
                width: 100%;
                margin: 10px;
                label{
                    vertical-align: top;
                }
            }
        }
        .customizeRHFooter{
            background: #F4F4F4;
            button{
                margin: 20px;
                padding: 0px 30px;
                background: #00AFE4;
                border-radius: 4px;
            }
        }
    }
}
</style>
